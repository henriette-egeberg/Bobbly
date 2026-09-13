const appCreatePost = document.querySelector<HTMLDivElement>("#app_create_post");

if (!appCreatePost) {
	console.warn("Create post page not loaded: #app_create_post not found");
} else {
	appCreatePost.innerHTML = `
        <h1>Create Post</h1>

        <label for="title">Title:</label>
        <input type="text" id="title" placeholder="Post title" />

        <label for="content">Content: <span class="char_count">(max 200 characters)</span></label>
        <textarea id="content" class="content bio" maxlength="200" rows="5" cols="50"></textarea>

        <label for="media_url">Media URL:</label>
        <input type="text" id="media_url" />

        <label for="media_alt">Media Alt Text:</label>
        <input type="text" id="media_alt" />

        <button id="createBtn" type="button">Create Post</button>
        <p>Not Ready to share? <a href="#">Profile</a></p>
    `;

	const appCreatePostBtn = document.querySelector<HTMLButtonElement>("#createBtn");

	if (!appCreatePostBtn) {
		console.warn("Create post button not found");
	} else {
		appCreatePostBtn.addEventListener("click", async () => {
			const titleInput = document.querySelector<HTMLInputElement>("#title");
			const contentInput = document.querySelector<HTMLTextAreaElement>("#content");
			const mediaUrlInput = document.querySelector<HTMLInputElement>("#media_url");
			const mediaAltInput = document.querySelector<HTMLInputElement>("#media_alt");

			if (!titleInput || !contentInput || !mediaUrlInput || !mediaAltInput) {
				alert("A form field is missing. Please reload the page.");
				return;
			}

			const title = titleInput.value.trim();
			const content = contentInput.value.trim();
			const mediaUrl = mediaUrlInput.value.trim();
			const mediaAlt = mediaAltInput.value.trim();

			if (!title || !content) {
				alert("Please fill in title and content.");
				return;
			}

			if (mediaUrl && !/^https?:\/\/.+/i.test(mediaUrl)) {
				alert("Please enter a valid media URL.");
				return;
			}

			const token = localStorage.getItem("authToken");
			if (!token) {
				alert("You must be logged in to create a post.");
				return;
			}

			try {
				const response = await fetch("https://v2.api.noroff.dev/social/posts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${token}`,
						"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
					},
					body: JSON.stringify({
						title,
						body: content,
						media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || title } : undefined,
					}),
				});

				const json = await response.json().catch(() => ({}));

				if (!response.ok) {
					throw new Error(json?.errors?.[0]?.message ?? json?.message ?? `Request failed (${response.status})`);
				}

				console.log("Post created:", json);
				alert("Post Created successfully!");
			} catch (error) {
				console.error("Error creating post:", error);
				appCreatePost.innerHTML = `
                    <h1>Unable to create post</h1>
                    <p>There was a problem creating your post.</p>
                    <p>${error instanceof Error ? error.message : "Unknown error"}</p>
                `;
			}
		});
	}
}
