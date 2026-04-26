export function followUser() {
	const currentProfile = localStorage.getItem("currentProfile");
	fetch(`https://v2.api.noroff.dev/social/profiles/${currentProfile}/follow`, {
		method: "put",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
		},
	})
		.then((response) => {
			if (response.ok) {
				console.log("Resource deleted successfully");
			} else {
				console.error("Delete failed with status:", response.status);
				alert("you already follow this user");
			}
		})
		.then((json) => {
			console.log(json);
			// Implement follow functionality here using the followers data
		});
}
