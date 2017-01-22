module.exports = {
    entry: './src/main.js',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    output: {
        //path: './dist',
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};