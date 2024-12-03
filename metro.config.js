/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/
 *
 * @format
 */

module.exports = {
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add extensions used in your project
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};
