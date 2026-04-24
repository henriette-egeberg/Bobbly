const edit = document.querySelector<HTMLDivElement>("#app_edit");
if (!edit) {
	throw new Error("#app_edit element not found");
}
/* ID is placeholder  */
fetch(`https://v2.api.noroff.dev/social/posts/10390`, {
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
		const title = json.data.title as string;
		const content = json.data.body as string;
		const media_url = json.data.media.url as string;
		const media_alt = json.data.media.alt as string;

		edit.innerHTML = `

			<h1>Edit Post</h1>

			<label for="name">Title:</label>
			<input type="text" id="title" placeholder="" value="${title}" />

			<label for="email">Content: <span class="char_count">(max 200 characters)</span></label>
			<textarea id="content" class="content bio" maxlength="200" rows="5" cols="50">${content}</textarea>

			<label for="media_url">Media URL:</label>
			<input type="text" id="media_url" value="${media_url}" />

			<label for="media_alt">Media Alt Text:</label>
			<input type="text" id="media_alt" value="${media_alt}" />

			<button id="editBtn" type="button">Create Post</button>
			<p>Not Ready to embrace the change? <a href="#">Profile</a></p>
`;

		// Attach event listener after HTML is rendered
		const editBtn = document.querySelector("#editBtn") as HTMLButtonElement;
		if (editBtn) {
			editBtn.addEventListener("click", () => {
				console.log("Edit button clicked");
				// Get values from form inputs
				const title = (document.querySelector("#title") as HTMLInputElement).value;
				const content = (document.querySelector("#content") as HTMLInputElement).value;
				const media_url = (document.querySelector("#media_url") as HTMLInputElement).value;
				const media_alt = (document.querySelector("#media_alt") as HTMLInputElement).value;

				// Validate inputs
				if (!title || !content || !media_url || !media_alt) {
					alert("Please fill in all fields.");
					return;
				}

				fetch(`https://v2.api.noroff.dev/social/posts/10390`, {
					method: "PUT",
					body: JSON.stringify({
						title: title,
						body: content,
						media: {
							url: media_url,
							alt: media_alt,
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
						alert("Post updated successfully!");
						// Update the UI or redirect as needed
					})
					.catch((error) => {
						console.error("Error making edit PUT request:", error);
						alert("Post update failed: " + error.message);
					});
			});
		}
	})
	.catch((error) => {
		console.error("Error making GET request:", error);
		edit.innerHTML = `
            <h1>Unable to load post</h1>
            <p>There was an error loading the post data. Please try again later.</p>
            <hr/>
            <br/><br/><br/>
            <h2>If problem persists, please contact support and provide the following error details:</h2>
            <p>Error details: ${error.message}</p>
  

`;
	});
