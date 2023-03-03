/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: './',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
        '^@localtypes/(.*)$': '<rootDir>/src/types/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@middy)'],
    transform: {
        '^.+\\.c*[tj]sx?$': [
            'ts-jest',
            {
                babelConfig: true
            }
        ]
    }
};
