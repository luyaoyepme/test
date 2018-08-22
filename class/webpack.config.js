
var uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
    entry :{
       index: './src/js/index.js',
       info:'./src/js/info.js'
    },
    output:{
        filename:'[name].js',
        path:__dirname + '/out',
        publicPath:'http://localhost:8080/out'
    },
    module:{
        rules :[
            {test:/.js$/ ,use:['babel-loader']},
            {test:/.jpg|png|gif|svg|ttf|woff|eot$/,use:['url-loader']},
            {test:/.css$/,use:['style-loader','css-loader']}
        ]
    },
    plugins:[
        new uglifyjs
    ],
    mode:'development'

}