import { assert, test } from '@rstest/core';
import { browserslistToESVersion } from '../dist/index.js';

test('should get ECMA version correctly', () => {
	assert.strictEqual(browserslistToESVersion(['iOS 8']), 5);
	assert.strictEqual(browserslistToESVersion(['ie >= 11']), 5);
	assert.strictEqual(browserslistToESVersion(['android >= 4.4']), 5);
	assert.strictEqual(browserslistToESVersion(['Chrome >= 33']), 5);
	assert.strictEqual(browserslistToESVersion(['Edge >= 12']), 5);
	assert.strictEqual(browserslistToESVersion(['Edge >= 15']), 2017);
	assert.strictEqual(browserslistToESVersion(['Chrome >= 53']), 2016);
	assert.strictEqual(browserslistToESVersion(['Chrome >= 63']), 2017);
	assert.strictEqual(browserslistToESVersion(['Chrome >= 67']), 2018);
	assert.strictEqual(browserslistToESVersion(['Chrome >= 73']), 2019);
	assert.strictEqual(browserslistToESVersion(['ie >= 11', 'Chrome >= 53']), 5);
	assert.strictEqual(
		browserslistToESVersion(['Edge >= 15', 'Chrome >= 53']),
		2016,
	);
	assert.strictEqual(
		browserslistToESVersion([
			'iOS >= 9',
			'Android >= 4.4',
			'last 2 versions',
			'> 0.2%',
			'not dead',
		]),
		5,
	);
	assert.strictEqual(
		browserslistToESVersion([
			'chrome >= 87',
			'edge >= 88',
			'firefox >= 78',
			'safari >= 14',
		]),
		2017,
	);
	assert.strictEqual(
		browserslistToESVersion([
			'last 1 chrome version',
			'last 1 firefox version',
			'last 1 safari version',
		]),
		2019,
	);
	assert.strictEqual(
		browserslistToESVersion([
			'iOS >= 10',
			'Chrome >= 51',
			'> 0.5%',
			'not dead',
			'not op_mini all',
		]),
		2015,
	);
	assert.strictEqual(browserslistToESVersion(['fully supports es6']), 2015);
	assert.strictEqual(
		browserslistToESVersion(['fully supports es6-module']),
		2017,
	);
	assert.strictEqual(browserslistToESVersion(['ie 11', 'baidu 7.12']), 5);
	assert.strictEqual(browserslistToESVersion(['ios_saf 11']), 2017);

	// https://github.com/browserslist/browserslist/issues/682
	assert.strictEqual(browserslistToESVersion(['and_ff >= 78']), 2019);
	assert.strictEqual(browserslistToESVersion(['and_chr >= 53']), 2019);
	assert.strictEqual(browserslistToESVersion(['ChromeAndroid >= 53']), 2019);
});
