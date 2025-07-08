import browserslist from 'browserslist';

export type ESVersion = 5 | 2015 | 2016 | 2017 | 2018 | 2019;

// The minimal version for [es2015, es2016, es2017, es2018, es2019]
const ES_VERSIONS_MAP: Record<string, number[]> = {
	chrome: [51, 52, 57, 64, 73],
	edge: [15, 15, 15, 79, 79],
	safari: [10, 10.3, 11, 16.4, 17],
	firefox: [54, 54, 54, 78, 78],
	opera: [38, 39, 44, 51, 60],
	samsung: [5, 6.2, 6.2, 8.2, 11.1],
};

const aliases: Record<string, string> = {
	ios_saf: 'safari',
	and_chr: 'chrome',
	and_ff: 'firefox',
};

const renameBrowser = (name: string) => {
	return aliases[name] || name;
};

export function browserslistToESVersion(browsers: string[]): ESVersion {
	const projectBrowsers = browserslist(browsers, {
		ignoreUnknownVersions: true,
	});

	let esVersion: ESVersion = 2019;

	for (const item of projectBrowsers) {
		const pairs = item.split(' ');

		// skip invalid item
		if (pairs.length < 2) {
			continue;
		}

		const browser = renameBrowser(pairs[0]);
		const version = Number(pairs[1].split('-')[0]);

		// ignore unknown version
		if (Number.isNaN(version)) {
			continue;
		}

		// IE / Android 4.x ~ 5.x only supports es5
		if (browser === 'ie' || (browser === 'android' && version < 6)) {
			esVersion = 5;
			break;
		}

		// skip unknown browsers
		const versions = ES_VERSIONS_MAP[browser];
		if (!versions) {
			continue;
		}

		if (version < versions[0]) {
			esVersion = Math.min(5, esVersion) as ESVersion;
		} else if (version < versions[1]) {
			esVersion = Math.min(2015, esVersion) as ESVersion;
		} else if (version < versions[2]) {
			esVersion = Math.min(2016, esVersion) as ESVersion;
		} else if (version < versions[3]) {
			esVersion = Math.min(2017, esVersion) as ESVersion;
		} else if (version < versions[4]) {
			esVersion = Math.min(2018, esVersion) as ESVersion;
		}
	}

	return esVersion;
}
