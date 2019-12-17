import React, { Component } from 'react'
import {List} from 'antd-mobile'
import axios from 'axios';
import style from './index.module.css';
const Item = List.Item;
const Brief = Item.Brief;
class Index extends Component {
    state = {
        list:[],
        pageid:1
    }
    render() {
        let {list} = this.state;
        return (
            <div className={style['wrap']} ref="scrollbox">
               <List className="my-list"> 
                    {
                        list.map(item=><Item
                            arrow="horizontal"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine
                            key={item.id}
                        >
                            {item.username} <Brief>平均成绩：{item.num}</Brief>
                        </Item>)   
                    }
                </List>
                <List>
                    <Item>Loading...</Item>
                </List>
            </div>
        )
    }
    componentDidMount(){
        this.myScroll();
        this.scrollLoad();
    }
    scrollLoad(){
        let {pageid,list} = this.state;
        axios.get('/api/list',{
            params:{
                pageid,
                limit:10,
            },
            headers:{
                authority:window.localStorage.getItem('token')
            }
        }).then(({data})=>{
           this.setState({
               list:list.concat(data.data.data)
           })
           this.refs.scrollbox.addEventListener('scroll',this.scrollEvent);
        })
    }
    myScroll(){
        let wrap = this.refs.scrollbox
        wrap.addEventListener('scroll',this.scrollEvent);
    }
    scrollEvent = (e)=>{
        let clientHeight = e.target.offsetHeight;
        let pageHeigth = e.target.children[0].offsetHeight;
        if(clientHeight + e.target.scrollTop > (pageHeigth - 30)){
            this.refs.scrollbox.removeEventListener('scroll',this.scrollEvent);
            this.setState({
                pageid:this.state.pageid+1
            },()=>{
                this.scrollLoad();
            });
        }
    }
}


export default Index;