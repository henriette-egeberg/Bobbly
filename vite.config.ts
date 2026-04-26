import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	base: "./",
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
				register: path.resolve(__dirname, "register/index.html"),
				login: path.resolve(__dirname, "login/index.html"),
				profile: path.resolve(__dirname, "profile/index.html"),
				profile_edit: path.resolve(__dirname, "profile/edit/index.html"),
				post: path.resolve(__dirname, "post/index.html"),
				post_create: path.resolve(__dirname, "post/create_post/index.html"),
				post_edit: path.resolve(__dirname, "post/edit_post/index.html"),
			},
		},
	},
});
