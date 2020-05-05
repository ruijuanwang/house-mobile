// NavHeader 顶部导航栏组件

import React, { Component } from 'react'

// 导入组件
import { NavBar, Icon } from 'antd-mobile';
// 导入组件样式
import './navheader.scss'
// 封装 NavHeader 顶部导航栏
export default class NavHeader extends Component {
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
