import { getCurrentTab, getGameInfo, getGameOnline } from "../utils";
const online = document.querySelector(".current-online");

function isValidPage(url) {
	const pattern = /^https:\/\/store\.steampowered\.com\/app\/\d+\/[^/]+\/?$/;
	return pattern.test(url);
}

document.addEventListener("DOMContentLoaded", async () => {
	const tab = await getCurrentTab();

	if (isValidPage(tab.url)) {
		const { id } = getGameInfo(tab.url);

		getGameOnline(id).then((gameOnline) => {
			online.textContent = gameOnline.currentOnline;
		});
	} else {
		online.textContent = "Это расширение работает только в магазине steam";
	}
});
