export function deletePost() {
	const postId = localStorage.getItem("currentPost");
	// /social/posts/<id>
	fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
		method: "delete",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
		},
	})
		.then((response) => {
			if (response.ok) {
				console.log("Resource deleted successfully");
			} else {
				console.error("Delete failed with status:", response.status);
				alert("access Denied: You do not have permission to delete this post.");
			}
		})
		.catch((error) => console.error("Network error:", error));
}
