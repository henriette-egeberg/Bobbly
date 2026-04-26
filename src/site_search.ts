const appSearch = document.querySelector<HTMLDivElement>("#app_posts");
if (!appSearch) {
	throw new Error("#app_posts element not found");
}

const searchBtn = document.querySelector<HTMLButtonElement>("form button");
searchBtn?.addEventListener("click", (event) => {
	event.preventDefault();

	const queryInput = document.querySelector<HTMLInputElement>("#site-search");
	const query = encodeURIComponent(queryInput?.value.trim() ?? "");

	const url = query.length > 0 ? `https://v2.api.noroff.dev/social/posts/search?q=${query}` : `https://v2.api.noroff.dev/social/posts`;

	fetch(url, {
		method: "get",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
		},
	})
		.then((response) => response.json())
		.then((json) => {
			const posts = json.data as Array<{
				title: string;
				body: string;
				id: string;
				tags: string[];
				media: { url: string } | null;
			}>;

			const postsHTML = posts
				.map(
					(post) => `
        <div class="grid_item">
          <img class="blog_posts_img" id="profile_pic_${post.id}" data-post-id="${post.id}"
            src="${post.media?.url ?? "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"}"
            alt="Post image unable to load" />
          <div class="about_post">
            <span class="when_posted">2 days ago</span>
            <h2 class="title">${post.title}</h2>
            <div class="intro">${post.body}</div>
            <div class="liked">Tags: ${post.tags.join(", ")}</div>
          </div>
        </div>
      `,
				)
				.join("");

			appSearch.innerHTML = `<div class="grid_container">${postsHTML}</div>`;

			posts.forEach((post) => {
				const profile_pic = document.querySelector(`#profile_pic_${post.id}`) as HTMLImageElement;
				if (profile_pic) {
					profile_pic.addEventListener("click", () => {
						localStorage.setItem("currentPost", post.id);
						window.location.href = "../post/index.html";
					});
				}
			});
		})
		.catch((error) => {
			console.error("Error making GET request:", error);
			appSearch.innerHTML = `
        <div class="grid_container">
          <div class="grid_item">
            <img class="blog_posts_img" src="" alt="" />
            <div class="about_post">
              <span class="when_posted">kan ikke laste inn</span>
              <h2 class="title">kan ikke laste inn</h2>
              <div class="intro">Kan ikke laste inn blogginnlegg for øyeblikket.</div>
              <div class="liked">ukjent</div>
            </div>
          </div>
        </div>
      `;
		});
});
