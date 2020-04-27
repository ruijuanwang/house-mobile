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

// 这个底部 一般不会大变化 数据比较死  写在组件外面 
const tabItems = [{
  title: '首页',
  icon: 'icon-ind',
  path: '/home/index'
},
{
  title: '找房',
  icon: 'icon-findHouse',
  path: '/home/houselist'
},
{
  title: '资讯',
  icon: 'icon-infom',
  path: '/home/news'
},
{
  title: '我的',
  icon: 'icon-my',
  path: '/home/profile'
}]

export default class Home extends Component{
    // state数据
  state = {
      selectedTab: '/home/index', // 用来控制 底部tab栏 选中高亮的 默认选中首页
      hidden: false
    };
    // 循环渲染的四个tabbarItem 封装为一个函数 
    renderItem(){
    // 函数要有返回值
     return  tabItems.map((item,index)=>{
                    // map函数要return
                    return <TabBar.Item
                        title={item.title} // 标题
                        key="Life"
                        icon={ // 未选中图标 阿里巴巴图标iconfont
                            <i className={`iconfont ${item.icon}`}></i> 
                        }
                        selectedIcon={ //选中图标
                            <i className={`iconfont ${item.icon}`}></i> 
                        }
                        // selected 控制当前点击的高亮 true高亮 false不高亮  
                        selected={this.state.selectedTab === item.path}
                        // badge={1} 表示右上角 红色数字等  类似未读消息  dot：红色圆点
                        // onPress 点击事件 相当于onClick
                        onPress={() => {
                            // 当点击当前的tab的时候 设置单词 控制高亮
                            // 设置一个有意义的单词 首页就叫 /home/index
                        this.setState({
                            selectedTab: item.path,
                        });
                        // 点击跳转 index主页 编程式导航
                        this.props.history.push(item.path)
                        }}
                    >
                    </TabBar.Item>
                }) 
    }

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
                 {/* 底部栏 一共有四项 除了path地址(包括选中高亮)、icon字体图标、title标题不一样，其他都一样 所以删掉三个 只留一个 用来循环 */}
                {/* 使用map循环 TabBar.Item 每一项  把tabItems这个数组循环*/}

                {/* react 经常把循环的大段代码 写在函数 调用 */}
                {/* 调用底部item循环的函数 */}
                { this.renderItem() }
   
         
            </TabBar>
  
 
</div>
    }

}