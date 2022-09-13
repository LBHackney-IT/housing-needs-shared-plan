module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  clearMocks: true,
  setupFiles: ['dotenv/config'],
  testMatch: ['<rootDir>/test/**/*.[jt]s?(x)', '<rootDir>/tests/**/*.[jt]s?(x)', '<rootDir>/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
   // '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^react(.*)$': '<rootDir>/node_modules/react$1'
  },
  moduleDirectories: ['node_modules', __dirname],
  testEnvironment: 'jsdom'
};
