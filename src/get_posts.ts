const appPosts = document.querySelector<HTMLDivElement>("#app_posts");
if (!appPosts) {
	throw new Error("#app_posts element not found");
}

fetch(`https://v2.api.noroff.dev/social/posts`, {
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
		console.log("Post data:", json.data);

		const postsHTML = posts
			.map(
				(post) => `
		<div class="flex flex-col rounded-lg overflow-hidden shadow-lg">
			<img class="" id="profile_pic_${post.id}" data-post-id="${post.id}" src="${post.media ? post.media.url : "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"}" alt="Post image unable to load" />
			<div class="p-4">
				<span class="text-gray-500 text-sm">2 days ago</span>
				<h2 class="text-xl font-bold">${post.title}</h2>
				<div class="text-gray-700">${post.body}</div>
				<div class="text-gray-500">Tags: ${post.tags.join(", ")}</div>
			</div>
		</div>
		`,
			)
			.join("");

		appPosts.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${postsHTML}</div>`;
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
		appPosts.innerHTML = `
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="flex flex-col rounded-lg overflow-hidden shadow-lg">
				<img class="" src="" alt="" />
				<div class="p-4">
					<span class="text-gray-500 text-sm">kan ikke laste inn</span>
					<h2 class="text-xl font-bold">kan ikke laste inn</h2>
					<div class="text-gray-700">Kan ikke laste inn blogginnlegg for øyeblikket.</div>
					<div class="text-gray-500">ukjent</div>
				</div>
			</div>
		</div>
	`;
	});
