document.querySelector<HTMLDivElement>("#app_login")!.innerHTML = `

<h1>Login</h1>
			<label for="email">Email:</label>
			<input type="email" id="email" placeholder="Enter your email" />

			<label for="password">Password:</label>
			<input type="password" id="password" placeholder="Enter your password" />

			<button id="loginBtn" type="button">Login</button>
			<p>Need an account? <a href="#" id="regBtn">Register</a></p>

`;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;

if (loginBtn) {
	loginBtn.addEventListener("click", () => {
		console.log("Login button clicked");
		// Get values from form inputs
		const email = (document.querySelector("#email") as HTMLInputElement).value;
		const password = (document.querySelector("#password") as HTMLInputElement).value;

		// Validate inputs
		if (!email || !password) {
			alert("Please fill in all fields");
			return;
		}

		fetch(`https://v2.api.noroff.dev/auth/login`, {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.log("Login POST Response:", json);
				if (json.data && json.data.accessToken) {
					// Store the token in local storage
					localStorage.setItem("authToken", json.data.accessToken);
					alert("Login successful!");
					// Update the UI
					const app = document.querySelector("#app");
					if (app) {
						app.innerHTML = "<h1>Login successful!</h1>";
						console.log("User is authenticated");
					}
				} else {
					alert("Login failed: Invalid response");
				}
			})
			.catch((error) => {
				console.error("Error making login POST request:", error);
				alert("Login failed: " + error.message);
			});
	});
}
const isAuthenticated = localStorage.getItem("authToken") !== null;
if (isAuthenticated) {
	console.log("User is authenticated");
	const app = document.querySelector("#app");
	if (app) {
		app.innerHTML = "<h1>Already logged in!</h1>";
	}
} else {
	console.log("User is not authenticated");
}
