/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
	verbose: true,
};

module.exports = config;

module.exports = async () => {
	return {
		verbose: true,
		testEnvironment: 'jsdom',
		setupFilesAfterEnv: ['./src/jest-setup.ts']
	};
};
