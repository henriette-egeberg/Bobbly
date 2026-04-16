document.querySelector<HTMLDivElement>("#app_register")!.innerHTML = `

	<h1>Register</h1>
	<label for="name">Name:</label>
	<input type="text" id="name" placeholder="Enter your name">
	
	<label for="email">Email:</label>
	<input type="email" id="email" placeholder="Enter your email">
	
	<label for="password">Password:</label>
	<input type="password" id="password" placeholder="Enter your password">
	
	<button id="regBtn" type="button">Register</button>
	<p>Already have an account? <a href="#" id="loginBtnLink">Login</a></p>

`;

const regBtn = document.querySelector<HTMLButtonElement>("#regBtn");
if (!regBtn) {
	throw new Error("Register button not found after rendering the form.");
}

// Add an event listener to the button
regBtn.addEventListener("click", () => {
	console.log("Button clicked");
	// Get values from form inputs
	const name = (document.querySelector("#name") as HTMLInputElement).value;
	const email = (document.querySelector("#email") as HTMLInputElement).value;
	const password = (document.querySelector("#password") as HTMLInputElement).value;

	// Validate inputs
	if (!name || !email || !password) {
		alert("Please fill in all fields");
		return;
	}

	// Perform the POST request when the button is clicked
	fetch(`https://v2.api.noroff.dev/auth/register`, {
		method: "POST",
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((json) => {
			console.log("POST Response:", json);
			alert("Registration successful!");
		})
		.catch((error) => {
			console.error("Error making POST request:", error);
			alert("Registration failed: " + error.message);
		});
});

// login functionality
