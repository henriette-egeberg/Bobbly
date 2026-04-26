import { deletePost } from "./delete";
const appPost = document.querySelector<HTMLDivElement>("#app_post");
const postId = localStorage.getItem("currentPost");
console.log("Current post ID from localStorage:", postId);

if (!appPost) {
	throw new Error("#app_post element not found");
}
// /social/posts/<id>
fetch(`https://v2.api.noroff.dev/social/posts/${postId}?_author=true`, {
	method: "get",
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
		 <button id="profileBtn" type="button">Profile</button>
		 <button id="deleteBtn" type="button">Delete</button>
     `;
		const profileBtn = document.querySelector("#profileBtn") as HTMLButtonElement;
		const deleteBtn = document.querySelector("#deleteBtn") as HTMLButtonElement;
		if (deleteBtn) {
			deleteBtn.addEventListener("click", () => {
				console.log("Delete button clicked");
				deletePost();
			});
		} else {
			console.error("Delete button not found");
			alert("Access Denied: You do not have permission to delete this post.");
		}
		if (profileBtn) {
			profileBtn.addEventListener("click", () => {
				console.log("Profile button clicked");
				window.location.href = "/post/user/index.html";
				localStorage.setItem("currentProfile", json.data.author.name);
			});
		} else {
			console.error("Profile button not found");
		}
	})

	.catch((error) => {
		console.error("Error making GET request:", error);
	});
