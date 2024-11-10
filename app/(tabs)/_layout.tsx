import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/icons";

const TabIcon = ({
	icon,
	color,
	name,
	focused,
}: {
	icon: any;
	color: string;
	name: string;
	focused: boolean;
}) => {
	return (
		<View
			className={`${
				focused ? "font-semibold to-blue-700" : "font-normal"
			} items-center justify-center`}
		>
			<Image
				source={icon}
				resizeMode="contain"
				className={`w-6 h-6 ${focused ? "tint-blue-500" : ""}`}
				tintColor={color}
			/>
			<Text
				className={`${focused ? "font-semibold" : "font-regular"}`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	const tabs = [
		{ name: "Home", icon: icons.home, route: "home" },
		{ name: "Bookmark", icon: icons.bookmark, route: "bookmark" },
		{ name: "Create", icon: icons.plus, route: "create" },
		{ name: "Profile", icon: icons.profile, route: "profile" },
	];

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#FFA001",
					tabBarInactiveTintColor: "#CDCDE0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 84,
					},
				}}
			>
				{tabs.map((tab) => (
					<Tabs.Screen
						key={tab.route}
						name={tab.route}
						options={{
							title: tab.name,
							headerShown: false,
							tabBarIcon: ({ color, focused }) => {
								return (
									<TabIcon
										icon={tab.icon}
										color={color}
										name={tab.route}
										focused={focused}
									/>
								);
							},
						}}
					/>
				))}
			</Tabs>
		</>
	);
};

export default TabsLayout;
