/*

 * For a detailed explanation regarding each configuration property and type check, visit:

 * https://jestjs.io/docs/configuration

 */

export default {
  // bail: true,

  preset: 'ts-jest',

  testEnvironment: 'node',

  // testMatch: ['**/__tests__/**/**/*.test.ts?(x)'],

  coveragePathIgnorePatterns: ['./src/infra/migrations/*']
};
