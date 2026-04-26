const appPost = document.querySelector<HTMLDivElement>("#app_post");

if (!appPost) {
	throw new Error("#app_post element not found");
}
// /social/posts/<id>
fetch(`https://v2.api.noroff.dev/social/posts/10387`, {
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
		console.log("Post data:", json.data);
		const post = json.data as {
			title: string;
			body: string;
			tags: string[];
			media: { url: string } | null;
		};

		appPost.innerHTML = `
       <h1>${post.title}</h1>
         <img class="blog_post_img " src="${post.media?.url ?? "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"}" alt="Post image unable to load" />
         <p>${post.body}</p>
         <p>Tags: ${post.tags.join(", ")}</p>
     `;
	})

	.catch((error) => {
		console.error("Error making GET request:", error);
	});
