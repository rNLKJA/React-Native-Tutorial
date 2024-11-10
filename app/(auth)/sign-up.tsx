import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalContext";

const SignUp = () => {
	const { setUser, setIsLogged } = useGlobalContext();

	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const submit = async () => {
		if (form.username === "" || form.email === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields");
		}

		setSubmitting(true);
		try {
			const result = await createUser(form.email, form.password, form.username);
			setUser(result);
			setIsLogged(true);

			router.replace("/home");
		} catch (error: any) {
			Alert.alert("Error", error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full bg-primary">
			<ScrollView>
				<View
					className="flex justify-center w-full h-full px-4"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[34px]"
					/>

					<Text className="mt-10 text-2xl font-semibold text-white font-psemibold">
						Sign Up to Aora
					</Text>

					<FormField
						title="Username"
						value={form.username}
						placeholder="Enter your username"
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-10"
					/>

					<FormField
						title="Email"
						value={form.email}
						placeholder="Enter your email"
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						placeholder="Enter your password"
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<View className="flex flex-row justify-center gap-2 pt-5">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;