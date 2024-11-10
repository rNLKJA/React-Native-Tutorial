import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { Stack } from "expo-router";

const RootLayout = () => {
	return (
		// <View style={styles.container}>
		// 	<Text>RootLayout</Text>
		// </View>
		// <>
		// 	<Text>Header</Text>
		// 	<Slot />
		// 	<Text>Footer</Text>
		// </>
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
};

export default RootLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
