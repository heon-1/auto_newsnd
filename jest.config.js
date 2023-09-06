const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testMatch: ['**/*.spec.(ts|tsx)'],
    testTimeout: 100000000,
};

module.exports = config;
