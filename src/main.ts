document.addEventListener("DOMContentLoaded", () => {
	const appRegister = document.querySelector<HTMLDivElement>("#app_register");
	if (!appRegister) {
		return;
	}

	appRegister.innerHTML = `
        <div class="rounded-2xl border border-fuchsia-500 bg-[#303030] p-6 shadow-xl">
            <h1 class="mb-6 text-3xl font-bold text-white">Register</h1>

            <label for="name" class="mb-2 block text-sm font-medium text-white">Name</label>
            <input
                id="name"
                type="text"
                required
                minlength="2"
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
            />

            <label for="email" class="mb-2 block text-sm font-medium text-white">Email</label>
            <input
                id="email"
                type="email"
                required
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
            />

            <label for="password" class="mb-2 block text-sm font-medium text-white">Password</label>
            <input
                id="password"
                type="password"
                required
                minlength="8"
                class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
            />

            <button
                id="regBtn"
                type="button"
                class="w-full rounded-md bg-fuchsia-600 px-4 py-3 font-medium text-white"
            >
                Register
            </button>

            <p class="mt-4 text-sm text-gray-300">
                Already have an account?
                <a href="../login/index.html" class="text-cyan-400 underline">Login</a>
            </p>
        </div>
    `;

	const regBtn = document.querySelector<HTMLButtonElement>("#regBtn");
	if (!regBtn) {
		return;
	}

	regBtn.addEventListener("click", async () => {
		const name = (document.querySelector<HTMLInputElement>("#name")?.value ?? "").trim();
		const email = (document.querySelector<HTMLInputElement>("#email")?.value ?? "").trim();
		const password = document.querySelector<HTMLInputElement>("#password")?.value ?? "";

		if (name.length < 2) {
			alert("Name must be at least 2 characters.");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			alert("Please enter a valid email.");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters.");
			return;
		}

		try {
			const response = await fetch("https://v2.api.noroff.dev/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data?.errors?.[0]?.message ?? "Registration failed");
			}

			alert("Registration successful!");
			window.location.href = "../login/index.html";
		} catch (error) {
			console.error(error);
			alert(error instanceof Error ? error.message : "Registration failed");
		}
	});
});
