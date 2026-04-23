const edit = document.querySelector<HTMLDivElement>("#app_edit");
if (!edit) {
	throw new Error("#app_edit element not found");
}

fetch(`https://v2.api.noroff.dev/social/profiles/hennie`, {
	method: "get",
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVubmllIiwiZW1haWwiOiJ0ZXN0MjYwNUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc3Njg5ODEzOX0.Gqql11w3OBuaQd5Z1uG3mwNiItwtOdXzNSUH8EP9Eeo",
		"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
	},
})
	.then((response) => response.json())
	.then((json) => {
		const profile_name = json.data.name as string;
		const profile_img_alt = json.data.avatar.alt as string;
		const profile_img = json.data.avatar.url as string;
		const profile_banner_alt = json.data.banner.alt as string;
		const profile_banner = json.data.banner.url as string;
		let profile_bio = json.data.bio as string;
		let profile_bio_placeholder;
		if (profile_bio === null || profile_bio === undefined) {
			profile_bio_placeholder = "This user has not added a bio yet.";
			profile_bio = "";
		}

		edit.innerHTML = `
            <h1>Edit Profile</h1>

			<label for="name">Name:</label>
			<input type="text" id="name" placeholder="" value="${profile_name}" disabled />

			<label for="email">Bio: <span class="char_count">(max 160 characters)</span></label> 
			<textarea id="bio" class="bio" maxlength="160" rows="5" cols="50" placeholder="${profile_bio_placeholder}">${profile_bio}</textarea>

			<label for="avatar_url">Avatar URL:</label>
			<input type="text" id="avatar_url" placeholder="${profile_img}" value="${profile_img}" />

			<label for="avatar_alt">Avatar Alt Text:</label>
			<input type="text" id="avatar_alt" placeholder="${profile_img_alt}" value="${profile_img_alt}" />
			
            <label for="banner_url">Banner URL:</label>
			<input type="text" id="banner_url" placeholder="${profile_banner}" value="${profile_banner}" />

			<label for="banner_alt">Banner Alt Text:</label>
			<input type="text" id="banner_alt" placeholder="${profile_banner_alt}" value="${profile_banner_alt}" />

			<button id="editBtn" type="button">Update Profile</button>
			<p>Not Ready for Change? <a href="#" id="loginBtnLink">Profile</a></p>
`;

		// Attach event listener after HTML is rendered
		const editBtn = document.querySelector("#editBtn") as HTMLButtonElement;
		if (editBtn) {
			editBtn.addEventListener("click", () => {
				console.log("Edit button clicked");
				// Get values from form inputs
				const name = (document.querySelector("#name") as HTMLInputElement).value;
				const bio = (document.querySelector("#bio") as HTMLInputElement).value;
				const avatar_url = (document.querySelector("#avatar_url") as HTMLInputElement).value;
				const avatar_alt = (document.querySelector("#avatar_alt") as HTMLInputElement).value;
				const banner_url = (document.querySelector("#banner_url") as HTMLInputElement).value;
				const banner_alt = (document.querySelector("#banner_alt") as HTMLInputElement).value;

				fetch(`https://v2.api.noroff.dev/social/profiles/${name}`, {
					method: "PUT",
					body: JSON.stringify({
						bio: bio,
						avatar: {
							url: avatar_url,
							alt: avatar_alt,
						},
						banner: {
							url: banner_url,
							alt: banner_alt,
						},
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVubmllIiwiZW1haWwiOiJ0ZXN0MjYwNUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc3Njg5ODEzOX0.Gqql11w3OBuaQd5Z1uG3mwNiItwtOdXzNSUH8EP9Eeo",
						"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
					},
				})
					.then((response) => response.json())
					.then((json) => {
						console.log("Edit PUT Response:", json);
						alert("Profile updated successfully!");
						// Update the UI or redirect as needed
					})
					.catch((error) => {
						console.error("Error making edit PUT request:", error);
						alert("Profile update failed: " + error.message);
					});
			});
		}
	})
	.catch((error) => {
		console.error("Error making GET request:", error);
		edit.innerHTML = `
            <h1>Unable to load profile</h1>
            <p>There was an error loading the profile data. Please try again later.</p>
            <hr/>
            <br/><br/><br/>
            <h2>If problem persists, please contact support and provide the following error details:</h2>
            <p>Error details: ${error.message}</p>
  

`;
	});
