const core = require("@actions/core");
const tc = require("@actions/tool-cache");

async function setup() {
	core.startGroup("installing");
	const version = core.getInput("version");
	core.info(`${version}`);
	const tarball = await tc.downloadTool(
		`https://download-cdn.jetbrains.com/idea/ideaIC-${version}.tar.gz`,
	);
	core.info(`${tarball}`);
	const pathToIdea = await tc.extractTar(tarball);
	core.addPath(`${pathToIdea}/bin`);
	core.info(`${pathToIdea}/bin`);
	core.info(
		JSON.stringify(
			require("fs").readdirSync(pathToIdea, { recursive: true }),
			null,
			2,
		),
	);
	core.endGroup();
}

module.exports = setup;

setup().catch(core.setFailed);
