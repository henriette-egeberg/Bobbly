document.addEventListener("DOMContentLoaded", () => {
	const appLogin = document.querySelector<HTMLDivElement>("#app_login");
	if (!appLogin) {
		return;
	}

	appLogin.innerHTML = `
        <div class="mx-auto mt-16 max-w-md rounded-2xl bg-[#303030] p-6 shadow-xl">
            <h1 class="mb-6 text-3xl font-bold text-white">Login</h1>

            <label for="email" class="mb-2 block text-sm font-medium text-white">Email:</label>
            <input
                type="email"
                id="email"
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
                placeholder="Enter your email"
                required
            />

            <label for="password" class="mb-2 block text-sm font-medium text-white">Password:</label>
            <input
                type="password"
                id="password"
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
                placeholder="Enter your password"
                required
            />

            <button
                id="loginBtn"
                type="button"
                class="w-full rounded-md bg-fuchsia-600 px-4 py-3 font-medium text-white transition hover:bg-fuchsia-500"
            >
                Login
            </button>

            <p class="mt-4 text-sm text-gray-300">
                Need an account?
                <a href="../register/index.html" class="text-cyan-400 underline">Register</a>
            </p>
        </div>
    `;

	const regBtn = document.querySelector<HTMLButtonElement>("#reg_btn");
	if (regBtn) {
		regBtn.addEventListener("click", () => {
			window.location.href = "../register/index.html";
		});
	}

	const loginBtn = document.querySelector<HTMLButtonElement>("#loginBtn");
	if (!loginBtn) {
		return;
	}

	const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

	loginBtn.addEventListener("click", async () => {
		const email = (document.querySelector<HTMLInputElement>("#email")?.value ?? "").trim();
		const password = document.querySelector<HTMLInputElement>("#password")?.value ?? "";

		if (!email || !isValidEmail(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (!password || password.length < 8) {
			alert("Password must be at least 8 characters.");
			return;
		}

		try {
			const response = await fetch("https://v2.api.noroff.dev/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data?.errors?.[0]?.message ?? data?.message ?? `Login failed (${response.status})`);
			}

			const accessToken = data?.data?.accessToken ?? data?.accessToken;
			if (accessToken) {
				localStorage.setItem("authToken", accessToken);
			}

			alert("Login successful!");
			window.location.href = "../index.html";
		} catch (error) {
			console.error("Error making login request:", error);
			alert(`Login failed: ${error instanceof Error ? error.message : "Unknown error"}`);
		}
	});
});
