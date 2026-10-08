module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!(react-router|react-router-dom)/)'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
  testMatch: ['<rootDir>/src/**/*.test.jsx'],
};
