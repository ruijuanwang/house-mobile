import React,{ Component } from 'react'
import { Route } from 'react-router-dom'
// 导入 antd-mobile组件库 中的 TabBar组件
import { TabBar } from 'antd-mobile'; 
// 四个子路由组件
import Index from '../Index' // 主页组件
import Houselist from '../Houselist' // 找房组件
import News from '../News' // 资讯组件
import Profile from '../Profile' // 我的组件
// 导入 home 的css样式
import './home.css'

export default class Home extends Component{
    // state数据
  state = {
      selectedTab: 'redTab',
      hidden: false
    };
    // 函数

    render(){
        return <div className='home'>
            {/* 我是home组件 */}
            {/* Home组件有四个子路由 挖坑 index首页 houselist找房 news资讯 profile我的 */}
            <Route path='/home/index' component={ Index } ></Route>
            <Route path='/home/houselist' component={ Houselist } ></Route>
            <Route path='/home/news' component={ News } ></Route>
            <Route path='/home/profile' component={ Profile } ></Route>
            {/* 在下面放底部tabbar标签栏组件 点击切换显示不同的路由组件页面 */}
            {/* 使用autd-mobile里面的标签栏组件 TabBar*/}
            {/* TabBar 是最外层的盒子 */}
            <TabBar
                unselectedTintColor="#bbb" // 未选中的文字颜色 
                tintColor="#21b97a" // 选中的文字颜色
                barTintColor="white" // 底部外层TabBar背景色
                hidden={this.state.hidden} // 是否隐藏TabBar标签 true 隐藏  false 不隐藏
                noRenderContent={ true } // 不渲染内容 true不渲染   false渲染  
             >
                 {/* TabBar.Item 每一项 */}
                <TabBar.Item
                    title="首页" // 标题
                    key="Life"
                    icon={ // 未选中图标 阿里巴巴图标iconfont
                        <i className='iconfont icon-ind'></i> 
                    }
                    selectedIcon={ //选中图标
                        <i className='iconfont icon-ind'></i> 
                    }
                    selected={this.state.selectedTab === 'blueTab'}
                    // badge={1} 表示右上角 红色数字等  类似未读消息  dot：红色圆点
                    // onPress 点击事件 相当于onClick
                    onPress={() => {
                    this.setState({
                        selectedTab: 'blueTab',
                    });
                    // 点击跳转 index主页 编程式导航
                    this.props.history.push('/home/index')
                    }}
                    data-seed="logId"
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <i className='iconfont icon-findHouse'></i> 
                    }
                    selectedIcon={
                        <i className='iconfont icon-findHouse'></i> 
                    }
                    title="找房"
                    key="Koubei"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                    this.setState({
                        selectedTab: 'redTab',
                    });
                    this.props.history.push('/home/houselist')

                    }}
                    data-seed="logId1"
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <i className='iconfont icon-infom'></i> 
                   
                    }
                    selectedIcon={
                        <i className='iconfont icon-infom'></i> 
                    
                    }
                    title="资讯"
                    key="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                    this.setState({
                        selectedTab: 'greenTab',
                    });
                    this.props.history.push('/home/news')

                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                icon={                        
                      <i className='iconfont icon-my'></i> 
                    }
                selectedIcon={
                        <i className='iconfont icon-my'></i> 
                }
                title="我的"
                key="my"
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={() => {
                this.setState({
                    selectedTab: 'yellowTab',
                });
                this.props.history.push('/home/profile')

                }}
            >
            </TabBar.Item>
            </TabBar>
  
 
</div>
    }

}