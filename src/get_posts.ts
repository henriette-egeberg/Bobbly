const appPosts = document.querySelector<HTMLDivElement>("#app_posts");
if (!appPosts) {
	throw new Error("#app_posts element not found");
}
// /social/posts/<id>
fetch(`https://v2.api.noroff.dev/social/posts`, {
	method: "get",
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVrcjk5IiwiZW1haWwiOiJoZW5rcmkwMjMxM0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc3Njc2OTg3NH0.sN_GHEz3a_lgxdk4iuZuTyoDUZeuT5pMocrzjQAMEfw",
		"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
	},
})
	.then((response) => response.json())
	.then((json) => {
		const posts = json.data as Array<{
			title: string;
			body: string;
			tags: string[];
			media: { url: string } | null;
		}>;
		console.log("Post data:", json.data);

		const postsHTML = posts
			.map(
				(post) => `
		<div class="grid_item">
		<img class="blog_posts_img" src="${post.media?.url ?? "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"}" alt="Post image unable to load" />
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

		appPosts.innerHTML = `<div class="grid_container">${postsHTML}</div>`;
	})
	.catch((error) => {
		console.error("Error making GET request:", error);
		appPosts.innerHTML = `

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
