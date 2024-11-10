# React Native Tutorial

YouTube: [https://www.youtube.com/watch?v=ZBCUegTZF7M](https://www.youtube.com/watch?v=ZBCUegTZF7M)

## Installation Guide

**Documentations**:

- Expo React Native: [https://docs.expo.dev/](https://docs.expo.dev/)
- React Native: [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- React NativeWind: [https://reactnativewind.com/](https://reactnativewind.com/)

**Steps**:

1. Install Expo CLI: `npm install -g expo-cli`
2. Create new project: `npx create-expo-app@latest`
3. Install dependencies: `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`
4. Setup entry point: For the property `main`, use the `expo-router/entry` as its value in the package.json. The initial client file is `app/_layout.tsx`

   ```json
   {
   	"main": "expo-router/entry"
   }
   ```

5. Modify project configuration: Add a deep linking in `schema` in your `app.json` file.

   ```json
   {
   	"scheme": "your-app-scheme"
   }
   ```

6. Modify babel.configuration: Add the following to the `babel.config.js` file.

   ```js
   module.exports = function (api) {
   	api.cache(true);
   	return {
   		presets: ["babel-preset-expo"],
   	};
   };
   ```

7. Clear bundle cache: After updating the Babel config file, run the following command to clear the bundler cache: `npx expo start --clear`
# React-Native-Tutorial
