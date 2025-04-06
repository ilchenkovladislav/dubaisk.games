import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

export async function getGameOnline(id: number | string) {
	const { data } = await axios.get(`https://steamcharts.com/app/${id}`);
	const $ = cheerio.load(data);

	const [currentOnline, peakOnlineToday, allTimePeakOnline] =
		$(".app-stat .num").toArray();

	const [, avgPlayer, gain, gainPercent, peakPlayers] = $(
		".common-table tbody tr",
	)
		.first()
		.children()
		.toArray();

	return JSON.stringify({
		currentOnline: $(currentOnline).text(),
		peakOnlineToday: $(peakOnlineToday).text(),
		allTimePeakOnline: $(allTimePeakOnline).text(),
		avgPlayer: $(avgPlayer).text(),
		gain: $(gain).text(),
		gainPercent: $(gainPercent).text(),
		peakPlayers: $(peakPlayers).text(),
	});
}

function extractName(title: string): string {
	const networkPart = " по сети";

	const name = title.trim();
	if (name.endsWith(networkPart)) {
		return name.slice(0, name.length - networkPart.length);
	}

	return name;
}

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getOnlineFixGames() {
	const games = [];
	const maxPages = 5;

	for (let index = 1; index <= maxPages; index++) {
		const { data } = await axios.get(`https://online-fix.me/page/${index}`, {
			responseType: "arraybuffer",
		});

		const $ = cheerio.load(iconv.decode(data, "win1251"));

		const pageGames = $(".news .article")
			.toArray()
			.map((el) => {
				return {
					link: $(el).find(".big-link").attr("href"),
					name: extractName($(el).find(".title").text()),
				};
			});

		games.push(...pageGames);

		if (index < maxPages) {
			await delay(1000);
		}
	}

	return games;
}
