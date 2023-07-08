#!/usr/bin/env zx

const msg = process.env.MSG ? process.env.MSG.toLowerCase() : undefined;
if (!msg) process.exit(0);

const regex = /^v\=([0-9]+\.[0-9]+\.[0-9]+)$/i;

const v = msg.match(regex)?.[1];

if (!v) {
	console.log("no match for %s", msg);
	process.exit(0);
}

await $`
rm -rf node_modules/ .gitignore
npm install
git add .
git commit -m release
git tag -f v${v}
git push -fu origin v${v}
`;
