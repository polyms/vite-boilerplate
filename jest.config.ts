export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.ts(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.ts', 'i18next.ts', 'main.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.svg$': '<rootDir>/src/tests/svg.transformer.js',
    '\\.(css|scss)$': '<rootDir>/src/tests/file.transformer.js',
  },
};
