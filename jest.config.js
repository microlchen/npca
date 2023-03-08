/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // [...]
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
