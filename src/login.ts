document.addEventListener("DOMContentLoaded", () => {
	const appLogin = document.querySelector<HTMLDivElement>("#app_login");
	if (!appLogin) return;

	appLogin.innerHTML = `
    <div class="rounded-2xl border border-fuchsia-500 bg-[#303030] p-6 shadow-xl">
      <h1 class="mb-6 text-3xl font-bold text-white">Login</h1>

      <label for="email" class="mb-2 block text-sm font-medium text-white">Email</label>
      <input id="email" type="email" required class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400" />

      <label for="password" class="mb-2 block text-sm font-medium text-white">Password</label>
      <input id="password" type="password" required minlength="8" class="mb-4 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-white placeholder:text-gray-400" />

      <button id="loginBtn" type="button" class="w-full rounded-md bg-fuchsia-600 px-4 py-3 font-medium text-white">
        Login
      </button>

      <p class="mt-4 text-sm text-gray-300">
        Need an account?
        <a href="../register/index.html" class="text-cyan-400 underline">Register</a>
      </p>
    </div>
  `;

	const loginBtn = document.querySelector<HTMLButtonElement>("#loginBtn");
	if (!loginBtn) return;

	loginBtn.addEventListener("click", async () => {
		const email = (document.querySelector<HTMLInputElement>("#email")?.value ?? "").trim();
		const password = document.querySelector<HTMLInputElement>("#password")?.value ?? "";

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			alert("Please enter a valid email.");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters.");
			return;
		}

		try {
			const response = await fetch("https://v2.api.noroff.dev/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data?.errors?.[0]?.message ?? "Login failed");
			}

			const token = data?.data?.accessToken ?? data?.accessToken;
			if (token) localStorage.setItem("authToken", token);

			alert("Login successful!");
			window.location.href = "../index.html";
		} catch (error) {
			console.error(error);
			alert(error instanceof Error ? error.message : "Login failed");
		}
	});
});
