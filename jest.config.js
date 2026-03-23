module.exports = {
  testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
  testTimeout: 60000,
  reporters: [
    'default',
    '<rootDir>/tests/jest-reporter.js',
  ],
};
