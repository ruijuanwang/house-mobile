// NavHeader 顶部导航栏组件

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom' // 路由

// 导入组件
import { NavBar, Icon } from 'antd-mobile';
// 导入组件样式
import './navheader.scss'
// 封装 NavHeader 顶部导航栏
class NavHeader extends Component {
  render() {
    return <NavBar
            className="navbar"
            mode="light" // dark 蓝色  light 白色
            icon={<Icon type="left" />} // 左箭头
            onLeftClick={() => { // 左箭头 点击
              // console.log('onLeftClick')
              // go(-1) 返回上一页
              this.props.history.go(-1)
            }}
          >
            {/* 名字不应该写死 
            this.props.children 组件标签之间的内容
             */}
            {this.props.children}
          </NavBar>
  }
}
// 1.封装的组件导入使用 history路由就没有了
// 正常路由打开的组件默认是有history路由操作的
// 注意：如果自己单独封装了一个组件 在导入使用history就没有了
// 解决方法 :当组件不能使用路由的时候 就用withRouter包裹 
export default withRouter(NavHeader) 
// withRouter(NavHeader) 就是react封装的高阶组件

