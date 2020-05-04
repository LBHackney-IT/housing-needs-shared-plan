module.exports = {
  moduleFileExtensions: [
    // "ts",
    // "tsx",
    'js'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  testMatch: ['**/*.test.js'],
  // globals: {
  //   "ts-jest": {
  //     useBabelrc: true,
  //     tsConfigFile: "jest.tsconfig.json"
  //   }
  // },
  coveragePathIgnorePatterns: ['/node_modules/']
  // setupTestFrameworkScriptFile: '<rootDir>/enzyme.js',
  // coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  // moduleNameMapper: {
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/__mocks__/mocks.js',
  //   '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js'
  // }
};
