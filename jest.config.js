/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFiles:[
    'dotenv/config'
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: false,
  forceExit: true,
  testURL: "http://localhost/",
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
