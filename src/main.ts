document.addEventListener("DOMContentLoaded", () => {
	const appRegister = document.querySelector<HTMLDivElement>("#app_register");
	if (!appRegister) {
		return;
	}

	appRegister.innerHTML = `
        <div class="mx-auto mt-16 max-w-md rounded-2xl bg-[#303030] p-6 shadow-xl">
            <h1 class="mb-6 text-3xl font-bold text-white">Register</h1>

            <label for="name" class="mb-2 block text-sm font-medium text-white">Name:</label>
            <input
                type="text"
                id="name"
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
                placeholder="Enter your name"
                required
            />

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
                id="regBtn"
                type="button"
                class="w-full rounded-md bg-fuchsia-600 px-4 py-3 font-medium text-white transition hover:bg-fuchsia-500"
            >
                Register
            </button>

            <p class="mt-4 text-sm text-gray-300">
                Already have an account?
                <a href="../login/index.html" class="text-cyan-400 underline">Login</a>
            </p>
        </div>
    `;

	const loginBtn = document.querySelector<HTMLButtonElement>("#login_btn");
	if (loginBtn) {
		loginBtn.addEventListener("click", () => {
			window.location.href = "../login/index.html";
		});
	}

	const regBtn = document.querySelector<HTMLButtonElement>("#regBtn");
	if (!regBtn) {
		return;
	}

	const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

	regBtn.addEventListener("click", async () => {
		const name = (document.querySelector<HTMLInputElement>("#name")?.value ?? "").trim();
		const email = (document.querySelector<HTMLInputElement>("#email")?.value ?? "").trim();
		const password = document.querySelector<HTMLInputElement>("#password")?.value ?? "";

		if (!name || name.length < 2) {
			alert("Name must be at least 2 characters.");
			return;
		}

		if (!email || !isValidEmail(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (!password || password.length < 8) {
			alert("Password must be at least 8 characters.");
			return;
		}

		try {
			const response = await fetch("https://v2.api.noroff.dev/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data?.errors?.[0]?.message ?? data?.message ?? `Registration failed (${response.status})`);
			}

			alert("Registration successful!");
			window.location.href = "../login/index.html";
		} catch (error) {
			console.error("Error making POST request:", error);
			alert(`Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`);
		}
	});
});
