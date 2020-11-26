const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    entry: {
        ie: Path.resolve(__dirname, '../public/css/ie/index.scss'),
        core: Path.resolve(__dirname, '../public/css/core/index.scss'),
        theme: Path.resolve(__dirname, '../public/css/theme/index.scss'),
        'react-search-sdk': Path.resolve(__dirname, '../src/index.js')
    },
    mode: 'production',
    output: {
        path: Path.join(__dirname, '../public/dist'),
        filename: 'js/[name].js',
        sourceMapFilename: '[file].map',
        libraryTarget: 'commonjs2'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                coreStyles: {
                    name: 'core',
                    test: (m, c, entry = 'core') =>
                        m.constructor.name === 'CssModule' &&
                        recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                themeStyles: {
                    name: 'theme',
                    test: (m, c, entry = 'theme') =>
                        m.constructor.name === 'CssModule' &&
                        recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        usedExports: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            path: Path.resolve(__dirname, '../public'),
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new RemovePlugin({
            after: {
                root: './public/dist',
                include: [
                    'js/core.js',
                    'js/theme.js',
                    'css/react-search-sdk.css'
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '~': Path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-private-methods',
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    require.resolve('sass-loader')
                ]
            }
        ]
    },
    externals: {
        react: 'commonjs react'
    }
};
