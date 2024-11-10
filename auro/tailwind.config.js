/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./styles/**/*.{css}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {},
	},
	plugins: [],
};
