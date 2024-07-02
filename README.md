# browserslist-to-es-version

Convert [browserslist](https://github.com/browserslist/browserslist) query to ECMAScript version.

<p>
  <a href="https://npmjs.com/package/browserslist-to-es-version">
   <img src="https://img.shields.io/npm/v/browserslist-to-es-version?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p>

## Usage

Install:

```bash
npm add browserslist-to-es-version -D
```

Example:

```ts
import {browserslistToESVersion} from 'browserslist-to-es-version';

const esVersion = browserslistToESVersion([
  "chrome >= 87",
  "edge >= 88",
  "firefox >= 78",
  "safari >= 14",
]);

console.log(esVersion); // 2017
```

## Type

```ts
// Only supports ES5 ~ ES2018
type ESVersion = 5 | 2015 | 2016 | 2017 | 2018;

function browserslistToESVersion(browsers: string[]): ESVersion;
```

## License

[MIT](./LICENSE).
