import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
import { Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";

export default function App() {
	return (
		<SafeAreaView className="flex-col items-center justify-center h-full bg-primary">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="flex-1 justify-center items-center w-full min-h-[85vh] px-8">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>

					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>

					<View className="relative mt-5">
						<Text className="text-3xl font-bold text-center text-white">
							Discover Endless Possibilities with{" "}
							<Text className="text-secondary-200">Aora</Text>
						</Text>

						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>

					<Text className="text-sm text-center text-gray-100 mt-7 font-regular ">
						Where creativity meets innovation: embark on a journey of limitless
						exploration with Aora
					</Text>

					<CustomButton
						title="Continue with Email"
						handlePress={() => router.push("/sign-in")}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}
