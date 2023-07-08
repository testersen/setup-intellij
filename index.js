const core = require("@actions/core");
const tc = require("@actions/tool-cache");

async function setup() {
	const version = core.getInput("version");
	core.info(`${version}`);
	const tarball = await tc.downloadTool(
		`https://download-cdn.jetbrains.com/idea/ideaIC-${version}.tar.gz`,
	);
	core.info(`${tarball}`);
	const pathToIdea = await tc.extractTar(tarball);
	core.addPath(`${pathToIdea}/bin`);
	core.info(`${pathToIdea}/bin`);
}

module.exports = setup;
