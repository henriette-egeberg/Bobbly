const appCreatePost = document.querySelector<HTMLDivElement>("#app_create_post");
if (!appCreatePost) {
	// handle missing element: throw, log, or return
	throw new Error("Element #app_create_post not found");
}
appCreatePost.innerHTML = `

     <h1>Create Post</h1>

			<label for="name">Title:</label>
			<input type="text" id="title" placeholder=""  />

			<label for="email">Content: <span class="char_count">(max 200 characters)</span></label>
			<textarea id="content" class="content bio" maxlength="200" rows="5" cols="50"></textarea>

			<label for="media_url">Media URL:</label>
			<input type="text" id="media_url" />

			<label for="media_alt">Media Alt Text:</label>
			<input type="text" id="media_alt" />

			<button id="createBtn" type="button">Create Post</button>
			<p>Not Ready to share? <a href="#">Profile</a></p>

`;
const appCreatePostBtn = document.querySelector("#createBtn") as HTMLButtonElement;

if (appCreatePostBtn) {
	appCreatePostBtn.addEventListener("click", () => {
		console.log("Create Post button clicked");
		// Get values from form inputs
		const title = (document.querySelector("#title") as HTMLInputElement).value;
		const content = (document.querySelector("#content") as HTMLInputElement).value;
		const media_url = (document.querySelector("#media_url") as HTMLInputElement).value;
		const media_alt = (document.querySelector("#media_alt") as HTMLInputElement).value;

		// Validate inputs
		if (!title || !content) {
			alert("Please fill in all fields");
			return;
		}

		fetch(`https://v2.api.noroff.dev/social/posts`, {
			method: "POST",
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
				console.log("Login POST Response:", json);
				if (json.data) {
					alert("Post Created successfully!");
				} else {
					alert("Post Creation failed: Invalid response");
				}
			})
			.catch((error) => {
				const appCreatePost = document.querySelector<HTMLDivElement>("#app_create_post");
				if (!appCreatePost) {
					// handle missing element: throw, log, or return
					throw new Error("Element #app_create_post not found");
				}
				console.error("Error making GET request:", error);
				appCreatePost.innerHTML = `
            <h1>Unable to load page</h1>
            <p>There was an error loading the create post page. Please try again later.</p>
            <hr/>
            <br/><br/><br/>
            <h2>If problem persists, please contact support and provide the following error details:</h2>
            <p>Error details: ${error.message}</p>
`;
			});
	});
}
