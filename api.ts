import axios from "axios";
import * as cheerio from "cheerio";

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
