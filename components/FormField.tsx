import { View, Text } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "@/constants";
import { useState } from "react";

interface FormFieldProps {
	title: string;
	value: string;
	placeholder: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?:
		| "default"
		| "email-address"
		| "numeric"
		| "phone-pad"
		| "number-pad";
}

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}: FormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">{title}</Text>

			<View className="flex flex-row items-center w-full h-16 px-4 border-2 bg-black-100 rounded-2xl border-black-200 focus:border-secondary">
				<TextInput
					className="flex-1 text-base text-white font-psemibold"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7B7B8B"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
					{...props}
				/>

				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;