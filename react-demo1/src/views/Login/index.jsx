import React, { Component } from 'react'
import {InputItem ,Button ,Toast} from 'antd-mobile'
import axios from 'axios';
class Index extends Component {
    state = {
        username:'',
        password:'',
        disabled:true
    }
    render() {
        let {disabled,username,password} = this.state;
        return (
            <div>
                <InputItem
                    type="text"  
                    placeholder="请输入用户名"
                    onChange={this.checkLogin.bind(this,'username')}
                    value={username}
                />
                <InputItem
                    type="password"  
                    placeholder="请输入密码"
                    onChange={this.checkLogin.bind(this,'password')}
                    value={password}
                />
                <Button type="primary" disabled={disabled} onClick={this.login}>登陆</Button>
            </div>
        )
    }
    checkLogin(key,value){
        let {username,password,disabled} = this.state;
        if(username && password){
            disabled = false;
        }else{
            disabled = true;
        }
        this.setState({
            [key]:value,
            disabled
        })
    }
    login=()=>{
        let {username,password} = this.state;
        axios.post('/api/login',{
            username,
            password
        }).then(res=>{
            if(res.data.code === 1){
                window.localStorage.setItem('token',res.data.data.token);
                this.props.history.push('/home');
            }else{
                Toast.fail(res.data.msg)
            }
        })
    }
}


export default Index;