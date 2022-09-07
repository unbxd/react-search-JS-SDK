module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],
    setupFiles: ['./jestSetup/unbxdAnalytics.js'],
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    // transform: {
    //     '\\.(js|jsx)?$': 'babel-jest'
    // },
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
     },

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec)).js?$",
    testMatch: ['**/?(*.)+(spec|test).js'],

    // Module file extensions for importing
    moduleFileExtensions: ['js', 'json'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // setupFiles before the tests are ran
    coveragePathIgnorePatterns: [
        "Loader.js"
    ],
    collectCoverage: true
};
