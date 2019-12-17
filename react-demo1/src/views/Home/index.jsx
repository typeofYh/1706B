import React, { Component } from 'react'
import homeStyle from './index.module.css';
import RouterView from '@/router/router.view'
import {getNavdata} from '@/router/home.config.js'
import {NavLink} from 'react-router-dom'
import { Toast } from 'antd-mobile'
import axios from 'axios';
class Index extends Component {
    render() {
        let {routes} = this.props;
        return (
            <div className={`wrapper ${homeStyle.home}`}>
                <header></header>
                <main>
                    <RouterView routes={routes} />
                </main>
                <footer>
                    {
                        getNavdata().map((item,key)=>{
                            return <NavLink to={item.path} key={key} activeClassName={homeStyle['active']}>
                                <i className={`iconfont icon-${item.icon}`}></i>
                                <span>{item.title}</span>
                            </NavLink>
                        })
                    }
                </footer>
            </div>
        )
    }
    componentDidMount(){
        axios.get('/api/getuserinfo',{
            headers:{
                authority:window.localStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            Toast.fail(error.response.data.msg,2,()=>{
                window.localStorage.removeItem('token');
                this.props.history.replace('/login');
            });
        })
    }
}


export default Index;