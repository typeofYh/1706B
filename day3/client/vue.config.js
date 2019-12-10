module.exports = {
    configureWebpack:{
        devServer:{
            proxy:{
                '/api':{
                    target:'http://localhost:3000',
                    pathRewrite:{
                        '^/api':''
                    }
                }
            }
        }
    }
}

///list 