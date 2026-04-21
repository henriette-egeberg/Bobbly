const appPosts = document.querySelector<HTMLDivElement>("#app_posts");
if (!appPosts) {
	throw new Error("#app_posts element not found");
}
// /social/posts/<id>
fetch(`https://v2.api.noroff.dev/social/posts/10386`, {
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
	})
	.catch((error) => {
		console.error("Error making GET request:", error);
	});
