import React, { Component } from 'react'
import Route from '@/router/index.js'
import routes from '@/router/router.config.js'
import '@/static/css/common.css'
import '@/static/font/iconfont.css'
class App extends Component {
    render() {
        return (
            <Route routes={routes}/>
        )
    }
}


export default App;