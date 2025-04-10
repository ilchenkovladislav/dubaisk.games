import { getGameInfo } from "../utils";
const title = document.querySelector("#appHubAppName");

const url = window.location.href;
const { id } = getGameInfo(url);

fetch(`http://localhost:3000/online/${id}`)
	.then((response) => response.json())
	.then((data) => {
		console.log("Данные с сервера:", data);
		title.textContent = `Текущий онлайн: ${data.currentOnline}`;
	})
	.catch((err) => console.error("Ошибка запроса:", err));
