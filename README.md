<p align="center"><h1 align="center">
  snyk-api
</h1>

<p align="center">
  Snyk Node.js API client
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/snyk-api"><img src="https://badgen.net/npm/v/snyk-api" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/snyk-api"><img src="https://badgen.net/npm/license/snyk-api" alt="license"/></a>
  <a href="https://www.npmjs.org/package/snyk-api"><img src="https://badgen.net/npm/dt/snyk-api" alt="downloads"/></a>
  <a href="https://travis-ci.org/lirantal/snyk-api"><img src="https://badgen.net/travis/lirantal/snyk-api" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/snyk-api"><img src="https://badgen.net/codecov/c/github/lirantal/snyk-api" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/snyk-api"><img src="https://snyk.io/test/github/lirantal/snyk-api/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# About

snyk-api

Snyk Node.js API client

# Install

```bash
npm install --save snyk-api
```

# Usage

```js
/**
 * Import `Client` and instantiate it with an API token.
 * You can also import `Errors` to match against when
 * catching them
 */
const { Client } = require("snyk-api");
const snykApiToken = "1234";
const snykClient = new Client({
  token: snykApiToken,
});

/**
 * Get all reported issues across projects based on filters
 */
const res = await snykClient.issues.getAll({ filters });
```

# Examples

## Issues

Getting all issues based on specific filters:

```js
const { Client } = require("snyk-api");
const snykApiToken = "1234";
const snykClient = new Client({
  token: snykApiToken,
});

const filters = {
  date: {
    from: "2019-01-01",
    to: "2019-10-01",
  },
  orgs: ["a30b7399-4e0c-4f6e-ba84-b27e131db54c"],
  severity: ["high", "medium", "low"],
  types: ["vuln", "license"],
  languages: ["node", "ruby", "java", "scala", "python", "golang", "php", "dotnet"],
  ignored: false,
  patched: false,
  fixable: false,
  isFixed: false,
  isUpgradable: true,
  isPatchable: true,
};

const res = await snykClient.issues.getAll({ filters });
```

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**snyk-api** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
