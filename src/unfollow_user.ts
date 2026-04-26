export function unfollowUser() {
	const currentProfile = localStorage.getItem("currentProfile");
	fetch(`https://v2.api.noroff.dev/social/profiles/${currentProfile}/unfollow`, {
		method: "put",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
		},
	})
		.then((response) => {
			if (response.ok) {
				alert("You have unfollowed this user.");
			} else {
				alert("you dont follow this user");
			}
		})
		.then((json) => {
			console.log(json);
			// Implement follow functionality here using the followers data
		});
}
