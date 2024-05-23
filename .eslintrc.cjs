module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'spellcheck',
    ],
    rules: {
        'no-console': 'off',
        'spellcheck/spell-checker': [
            'warn',
            {
                comments: true,
                strings: true,
                identifiers: false,
                lang: 'en_US',
                skipWords: [
                    'thead', 'tbody', 'tfooter', 'gempa', 'Tanggal', 'Jam', 'Magnitude', 'Kedalaman', 'Wilayah', 'setEarthquakes', 'earthquake', 'ProgressBar',
                ],
                skipIfMatch: [
                    'http://[^s]*',
                    '^[-\\w]+\\/[-\\w\\.]+$', // For MIME Types
                ],
                skipWordIfMatch: [
                    '^foobar.*$',
                ],
                minLength: 3,
            },
        ],
        'max-len': ['off'],
        'default-param-last': 'off',
    },
};
