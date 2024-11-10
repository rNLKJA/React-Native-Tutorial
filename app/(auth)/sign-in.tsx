//
import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import { images } from "../../constants";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Alert } from "react-native";
import { router } from "expo-router";
import { Dimensions } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";

const SignIn = () => {
	const { setUser, setIsLogged } = useGlobalContext();
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const submit = async () => {
		if (form.email === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields");
		}

		setSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLogged(true);

			Alert.alert("Success", "User signed in successfully");
			router.replace("/home");
		} catch (error) {
			Alert.alert(
				"Error",
				error instanceof Error ? error.message : "An unexpected error occurred"
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="flex justify-center bg-primary">
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View
					className="flex justify-center w-full h-full px-4"
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}
				>
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[34px] mb-4"
					/>

					<Text className="text-2xl text-white font-psemibold">
						Login to Aora
					</Text>

					<FormField
						title="Email"
						value={form.email}
						placeholder="Enter your email"
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7 w-full"
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						placeholder="Enter your password"
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7 w-full"
					/>

					<CustomButton
						title="Sign In"
						handlePress={submit}
						containerStyles="mt-7 w-full"
						isLoading={isSubmitting}
					/>

					<View className="flex flex-row justify-center gap-2 pt-5">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link
							href="/sign-up"
							className="text-lg font-psemibold text-secondary"
						>
							Signup
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
