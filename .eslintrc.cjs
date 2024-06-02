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
                    'keydown', 'keyup', 'unmount', 'Seismo', 'Poppins', 'fff', 'Rina', 'Parlina', 'jpg', 'Malikus', 'Syafaadi', 'Nurfaza', 'jpeg', '100vh', '2xl', '60vh',
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
        'max-len': 'off',
        'default-param-last': 'off',
        'no-underscore-dangle': ['error', { allow: ['_map'] }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.test.js', '**/*.spec.js', '**/test/**'],
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
    },
};
