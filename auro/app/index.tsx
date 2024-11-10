import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import "./global.css";

export default function App() {
	return (
		// <View style={styles.container}>
		<View className="items-center justify-center flex-1 bg-white">
			<Text>Auro</Text>
			<StatusBar style="auto" />
			<Link href="/profile" style={{ color: "blue" }}>
				Go to Profile
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
