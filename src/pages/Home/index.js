import React,{ Component } from 'react'
import { Route } from 'react-router-dom'
import Index from '../Index' // 主页组件
import Houselist from '../Houselist' // 找房组件
import News from '../News' // 资讯组件
import Profile from '../Profile' // 我的组件

export default class Home extends Component{
    render(){
        return <div>
            我是home组件
            {/* Home组件有四个子路由 挖坑 index首页 houselist找房 news资讯 profile我的 */}
            <Route path='/home/index' component={ Index } ></Route>
            <Route path='/home/houselist' component={ Houselist } ></Route>
            <Route path='/home/news' component={ News } ></Route>
            <Route path='/home/profile' component={ Profile } ></Route>
            </div>
    }

}