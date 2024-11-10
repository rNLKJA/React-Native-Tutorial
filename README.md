# React Native Tutorial

YouTube: [https://www.youtube.com/watch?v=ZBCUegTZF7M](https://www.youtube.com/watch?v=ZBCUegTZF7M)

## Installation Guide

**Documentations**:

- Expo React Native: [https://docs.expo.dev/](https://docs.expo.dev/)
- React Native: [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- React NativeWind: [https://reactnativewind.com/](https://reactnativewind.com/)

I'll provide an updated comprehensive guide for installing Expo SDK 51 with React Native, NativeWind v4, and TypeScript support using the new App Router structure.

Step 1: Install Node.js and npm

Make sure you have Node.js (version 18 or later recommended) installed: [https://nodejs.org/](https://nodejs.org/)

Step 2: Install Expo CLI

```bash
npm install -g expo-cli
```

Step 3: Create a new Expo project with TypeScript template

```bash
npx create-expo-app@latest MyExpoAppTS --template expo-template-blank-typescript@sdk-51
```

Step 4: Navigate to project directory

```bash
cd MyExpoAppTS
```

Step 5: Install necessary dependencies

```bash
# Install NativeWind and its dependencies
npm install nativewind@4
npm install --dev tailwindcss@3.3.2
npm install postcss@8.4.23

# Install TypeScript dependencies
npm install --dev @types/react @types/react-native typescript

# Install dependencies for app router
npm install expo-router@3
npm install expo-linking expo-constants expo-status-bar
```

Step 6: Configure Tailwind CSS
Create and configure `tailwind.config.js`:

```javascript
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

Step 7: Configure Babel
Update `babel.config.js`:

```javascript
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: ["nativewind/babel", require.resolve("expo-router/babel")],
	};
};
```

Step 8: Configure TypeScript
Update or create `tsconfig.json`:

```json
{
	"extends": "expo/tsconfig.base",
	"compilerOptions": {
		"strict": true,
		"baseUrl": ".",
		"paths": {
			"@/*": ["./*"]
		},
		"types": ["nativewind/types"]
	},
	"include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

Step 9: Create App Router Structure
Create the following directory structure:

```text
your-project/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── (tabs)/
│       ├── home.tsx
│       ├── profile.tsx
│       └── _layout.tsx
├── components/
├── assets/
└── src/
```

Step 10: Configure Entry Point

```json
{
	"expo": {
		"scheme": "your-app-scheme",
		"web": {
			"bundler": "metro"
		},
		"plugins": ["expo-router"],
		"experiments": {
			"typedRoutes": true,
			"tsconfigPaths": true
		}
	}
}
```

Step 11: Create Root Layout
Create `app/_layout.tsx`:

```typescript
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import "../global.css";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
```

Step 12: Create Tab Layout
Create `app/(tabs)/_layout.tsx`:

```typescript
import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <Home size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <User size={24} color={color} />,
				}}
			/>
		</Tabs>
	);
}
```

Step 13: Create Home Page
Create `app/(tabs)/home.tsx`:

```typescript
import { View, Text } from "react-native";
import { StyledComponent } from "nativewind";

export default function Home() {
	return (
		<StyledComponent
			component={View}
			className="flex-1 items-center justify-center bg-white"
		>
			<Text className="text-xl font-bold text-blue-600">Home Page</Text>
		</StyledComponent>
	);
}
```

Step 14: Create Profile Page
Create `app/(tabs)/profile.tsx`:

```typescript
import { View, Text } from "react-native";
import { StyledComponent } from "nativewind";

export default function Profile() {
	return (
		<StyledComponent
			component={View}
			className="flex-1 items-center justify-center bg-white"
		>
			<Text className="text-xl font-bold text-blue-600">Profile Page</Text>
		</StyledComponent>
	);
}
```

Step 15: Create global styles
Create `global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 16: Configure Metro bundler
Create `metro.config.js`:

```javascript
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
```

Step 17: Update package.json scripts
Update your `package.json` scripts:

```json
{
	"scripts": {
		"start": "expo start",
		"android": "expo start --android",
		"ios": "expo start --ios",
		"web": "expo start --web",
		"ts:check": "tsc"
	}
}
```

Step 18: Start the development server

```bash
npx expo start -c
```

Additional Configuration Tips:

1. Environment Types

Create `env.d.ts` in your project root:

    ```typescript
    /// <reference types="nativewind/types" />
    ```

2. Create a custom component example

   Create `components/Button.tsx`:

   ```typescript
   import { Text, TouchableOpacity } from "react-native";
   import { StyledComponent } from "nativewind";

   interface ButtonProps {
   	onPress: () => void;
   	title: string;
   }

   export default function Button({ onPress, title }: ButtonProps) {
   	return (
   		<StyledComponent
   			component={TouchableOpacity}
   			className="bg-blue-500 px-4 py-2 rounded-lg"
   			onPress={onPress}
   		>
   			<Text className="text-white font-semibold">{title}</Text>
   		</StyledComponent>
   	);
   }
   ```

Important Notes:

1. Make sure to handle deep linking properly for the app router:

   - iOS: Configure your `app.json` with the correct bundle identifier
   - Android: Configure your `app.json` with the correct package name

2. For TypeScript path aliases, you might want to create a `babel-plugin-module-resolver` configuration.

3. When using images or assets, place them in the `assets` folder and update your `app.json` to include them:

   ```json
   {
   	"expo": {
   		"assets": ["./assets/fonts/", "./assets/images/"]
   	}
   }
   ```

4. For better TypeScript support with routes, you can create route type definitions:

   ```typescript
   // app/types/navigation.ts
   export type RootStackParamList = {
   	"(tabs)": undefined;
   	modal: undefined;
   };

   export type TabStackParamList = {
   	home: undefined;
   	profile: undefined;
   };
   ```

This setup provides you with:

- TypeScript support
- App Router with type-safe navigation
- NativeWind v4 for styling
- Proper project structure
- Tab-based navigation
- Component organization

Remember to:

- Run `npx expo start --clear` if you encounter any caching issues
- Check the official documentation for [Expo Router](https://docs.expo.dev/router/introduction/), [NativeWind](https://www.nativewind.dev/), and [TypeScript](https://www.typescriptlang.org/docs/) for more detailed information
- Use the TypeScript compiler (`npm run ts:check`) regularly to catch type errors
- Consider adding ESLint and Prettier for code quality and formatting
