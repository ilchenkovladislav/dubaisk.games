export async function getGameOnline(id) {
	try {
		const response = await fetch(`http://localhost:3000/online/${id}`);
		return await response.json();
	} catch (err) {
		console.error("Ошибка запроса:", err);
	}
}

export function getGameInfo(url) {
	const match = url.match(
		/https:\/\/store\.steampowered\.com\/app\/(\d+)\/([^/]+)\//,
	);

	const id = match[1];
	const name = match[2].replaceAll("_", " ");

	return { id, name };
}

export async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}
