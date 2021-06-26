/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const path = require('path')

module.exports = {
    assetsDir: '\@yourdlt',
    // Disables extract of CSS files
    css: {extract: false},
    // Disables module splitting
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        // iView fix for fonts
        module: {
            rules: [
                { test: /\.eot(\?.*)?$/, loader: 'url-loader?limit=10240&mimetype=application/vnd.ms-fontobject&name=' + path.join('\@yourdlt', 'fonts/[name].[hash:7].[ext]') },
                { test: /\.woff2(\?.*)?$/, loader: 'url-loader?limit=10240&mimetype=application/font-woff2&name=' + path.join('\@yourdlt', 'fonts/[name].[hash:7].[ext]') },
                { test: /\.woff(\?.*)?$/, loader: 'url-loader?limit=10240&mimetype=application/font-woff&name=' + path.join('\@yourdlt', 'fonts/[name].[hash:7].[ext]') },
                { test: /\.ttf(\?.*)?$/, loader: 'url-loader?limit=10240&mimetype=application/font-ttf&name=' + path.join('\@yourdlt', 'fonts/[name].[hash:7].[ext]') }
            ]
        }
    },
    // Enables templates in .vue files
    runtimeCompiler: true,
    // Keep filenames untouched during build
    filenameHashing: false
}
