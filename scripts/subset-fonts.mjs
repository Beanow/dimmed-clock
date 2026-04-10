import subsetFont from "subset-font";
import {readFileSync, writeFileSync} from "fs";

// Characters used by the clock: digits, colon, slash, space, and ASCII letters
// for day/month names (e.g. "Monday, January 01 2025")
const CHARS =
	" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:,./";

const fonts = [
	{
		src: "assets/lato-thin.woff2",
		dest: "assets/lato-thin.min.woff2",
		format: "woff2",
	},
	{
		src: "assets/lato-thin.woff",
		dest: "assets/lato-thin.min.woff",
		format: "woff",
	},
	{
		src: "assets/roboto-regular.woff2",
		dest: "assets/roboto-regular.min.woff2",
		format: "woff2",
	},
	{
		src: "assets/roboto-regular.woff",
		dest: "assets/roboto-regular.min.woff",
		format: "woff",
	},
];

for (const {src, dest, format} of fonts) {
	const input = readFileSync(src);
	const output = await subsetFont(input, CHARS, {targetFormat: format});
	writeFileSync(dest, output);
	console.log(`${src}: ${input.byteLength} → ${output.byteLength} bytes`);
}
