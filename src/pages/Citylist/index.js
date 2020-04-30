import React,{ Component } from 'react'
// 导入组件
import { NavBar, Icon } from 'antd-mobile'; 
//  导入样式
import './citylist.scss'

export default class Citylist extends Component{
    render(){
        return <div className='citylist'>
            {/* 我是Citylist组件 */}
            {/* 1.顶部导航栏组件 NavBar */}
             <NavBar
             className='navbar'
             mode="light" // 导航栏的颜色 dark 蓝色 light白色
             icon={<Icon type="left" />} // 左侧图标 自带的
             onLeftClick={() =>
                //  点击左侧图标 触发事件 应该返回上一页
                // this.props.history.goBack()
                this.props.history.go(-1)
             }
            >城市选择</NavBar>

            {/* 2.内容 */}
            </div>
    }

}