// import {
//     ModifySourcePlugin,
//     ReplaceOperation
// } from 'modify-source-webpack-plugin';

// const modifySourceWebpackPlugin = require('modify-source-webpack-plugin');
// const ReplaceOperation = require('modify-source-webpack-plugin');
// const fs = require('fs');
const path = require('path');
const CreateFileWebpack = require('create-file-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PACKAGE = require('./package.json');

const DIST_FOLDER = 'build';
const SRC_FOLDER = 'src';
const DIST_PATH = path.resolve(__dirname, DIST_FOLDER);
const INDEX_PATH = path.resolve(__dirname, 'public', 'index.html');
// const INDEX_TS_PATH = path.resolve(__dirname, `${SRC_FOLDER}`, 'Index.ts');

// const appName = 'eterminal_0.1.5';
// const appName = `${PACKAGE.name}-${PACKAGE.version}`;
const appName = PACKAGE.name;
const devMode = isDevMode();

console.log(`Application version: ${PACKAGE.version}`);
console.log(`Current dir: ${__dirname}`);

module.exports = {
    entry: {
        // serviceWorker: './src/serviceWorker.ts',
        contentScript: './src/contentScript.ts',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {},
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(css)$/i,
                exclude: [/node_modules/, /test/],
                use: ['raw-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png|otf)$/,

                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './public/manifest.json', to: 'manifest.json' },
                // { from: './node_modules/medidok-screen-kbd/build/simple-keyboard.css', to: 'simple-keyboard.css' },
                { from: './icons', to: 'icons' },
                { from: './src/popup.html', to: 'popup.html' },
                { from: './update.xml', to: 'update.xml' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: './css/[id].css',
        }),
    ],

    resolve: {
        extensions: ['.hbs', '.tsx', '.ts', '.js'],
    },
};

function isDevMode() {
    const argv = process.argv || [];
    const modeArg = argv.find((arg) => arg.startsWith('--mode=development')) ? true : false;
    const modeIsDev = modeArg || process.env.NODE_ENV === 'development';

    return modeIsDev;
}
