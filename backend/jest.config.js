// jest.config.js
module.exports = {
  preset: 'ts-jest',              // tells Jest to handle TypeScript
  testEnvironment: 'node',        // Node environment for backend
  testMatch: ['<rootDir>/test/**/*.test.ts'], // detect .ts test files
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',       // optional alias
  },
  // setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',      // ensure ts-jest transforms TS files
  },
  verbose: true,

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

};
