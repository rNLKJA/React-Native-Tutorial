// @ts-nocheck
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
	Models,
} from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.rNLKJA.aora",
	projectId: "67305389001d7e96b45e",
	databaseId: "673054490017b6b5fe72",
	userCollectionId: "6730545d0006c6314edf",
	videoCollectionId: "6730547400260c6116de",
	storageId: "6730559f0037d13380d7",
} as const;

interface INewUser {
	accountId: string;
	email: string;
	username: string;
	avatar: URL;
}

interface IVideoPost {
	title: string;
	thumbnail: URL;
	video: URL;
	prompt: string;
	creator: string;
}

interface IVideoForm {
	thumbnail: File;
	video: File;
	title: string;
	prompt: string;
	userId: string;
}

const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(
	email: string,
	password: string,
	username: string
): Promise<Models.Document> {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument<INewUser>(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create user");
	}
}

// Sign In
export async function signIn(
	email: string,
	password: string
): Promise<Models.Session> {
	try {
		const session = await account.createEmailSession(email, password);

		return session;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to sign in");
	}
}

// Get Account
export async function getAccount(): Promise<
	Models.Account<Models.Preferences>
> {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get account");
	}
}

// Get Current User
export async function getCurrentUser(): Promise<Models.Document | null> {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

// Sign Out
export async function signOut(): Promise<{}> {
	try {
		const session = await account.deleteSession("current");

		return session;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to sign out");
	}
}

// Upload File
export async function uploadFile(
	file: File,
	type: "video" | "image"
): Promise<URL | undefined> {
	if (!file) return;

	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };

	try {
		const uploadedFile = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			asset
		);

		const fileUrl = await getFilePreview(uploadedFile.$id, type);
		return fileUrl;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to upload file");
	}
}

// Get File Preview
export async function getFilePreview(
	fileId: string,
	type: "video" | "image"
): Promise<URL> {
	let fileUrl: URL;

	try {
		if (type === "video") {
			fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
		} else if (type === "image") {
			fileUrl = storage.getFilePreview(
				appwriteConfig.storageId,
				fileId,
				2000,
				2000,
				"top",
				100
			);
		} else {
			throw new Error("Invalid file type");
		}

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get file preview");
	}
}

// Create Video Post
export async function createVideoPost(
	form: IVideoForm
): Promise<Models.Document> {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, "image"),
			uploadFile(form.video, "video"),
		]);

		const newPost = await databases.createDocument<IVideoPost>(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl!,
				video: videoUrl!,
				prompt: form.prompt,
				creator: form.userId,
			}
		);

		return newPost;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create video post");
	}
}

// Get all video Posts
export async function getAllPosts(): Promise<Models.Document[]> {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId
		);

		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get posts");
	}
}

// Get video posts created by user
export async function getUserPosts(userId: string): Promise<Models.Document[]> {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.equal("creator", userId)]
		);

		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get user posts");
	}
}

// Get video posts that matches search query
export async function searchPosts(query: string): Promise<Models.Document[]> {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.search("title", query)]
		);

		if (!posts) throw new Error("Something went wrong");

		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to search posts");
	}
}

// Get latest created video posts
export async function getLatestPosts(): Promise<Models.Document[]> {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(7)]
		);

		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to get latest posts");
	}
}
