var path = require('path')

module.exports = {
    mode:'development',
    entry:{
        map: './src/js/map.js',
        addImage: './src/js/addImage.js',
        showMap: './src/js/showMap.js',
        MapStart: './src/js/mapStart.js',
        ChangeState: './src/js/changeState.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('public/js')
    }
}