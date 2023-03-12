/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
        '^@localtypes/(.*)$': '<rootDir>/src/types/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@mocks/(.*)$': '<rootDir>/src/mocks/$1'
    }
};
