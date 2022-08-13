export default {
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.ts', 'i18next.ts'],
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
