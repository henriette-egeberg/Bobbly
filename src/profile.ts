import { getUserPosts } from "./get_posts_user";
getUserPosts();
const authToken = localStorage.getItem("authToken");

const appProfile = document.querySelector<HTMLDivElement>("#app_profile");
if (!appProfile) {
	throw new Error("#app_profile element not found");
}

fetch(`https://v2.api.noroff.dev/social/profiles/hennie`, {
	method: "get",
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		Authorization: `Bearer ${authToken}`,
		"X-Noroff-API-Key": "c7e8fcc7-ada1-4eb6-96f6-b1a766d7cad2",
	},
})
	.then((response) => response.json())
	.then((json) => {
		const profile_name = json.data.name as string;
		const profile_img = json.data.avatar.url as string;
		let profile_bio = json.data.bio as string;
		if (profile_bio === null || profile_bio === undefined) {
			console.log("This user has not added a bio yet.");
			profile_bio = "This user has not added a bio yet.";
		}

		appProfile.innerHTML = `
	<div class="profile_header">
		<div class="grid_item">
			<img src="${profile_img}" class="profile_pic" alt="Profile Picture" />
			<span><h1>${profile_name}</h1>
			<div>@julian_curates</div></span>
		</div>
		<div class="grid_item">
			<button id="followBtn">Follow</button>
			<button id="editBtn">Edit</button>
		</div>
	</div>

	<div class="bio">
		<h3>
			${profile_bio}
		</h3>
	</div>
`;
	})
	.then(() => {
		const editBtn = document.querySelector("#editBtn") as HTMLButtonElement;
		const followBtn = document.querySelector("#followBtn") as HTMLButtonElement;
		if (followBtn) {
			followBtn.addEventListener("click", () => {
				console.log("Follow button clicked");
				// Implement follow functionality here
			});
		} else {
			console.error("Follow button not found");
		}
		if (editBtn) {
			editBtn.addEventListener("click", () => {
				console.log("Edit button clicked");
				window.location.href = "../profile/edit/index.html";
			});
		} else {
			console.error("Edit button not found");
		}
	})
	.catch((error) => {
		console.error("Error making GET request:", error);
		appProfile.innerHTML = `
<section class="profile_info">
	<div class="profile_header">
		<div class="grid_item">
			<img src="" class="profile_pic" alt="Profile Picture" />
			<span><h1>Profile name unavailable</h1>
			<div>@julian_curates</div></span>
		</div>
		<div class="grid_item">
			<button>Follow</button>
			<button id="editBtn">Edit</button>
		</div>
	</div>

	<div class="bio">
		<h3>Unable to load profile details right now.</h3>
	</div>
</section>
`;
	});
