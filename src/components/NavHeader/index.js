// NavHeader 顶部导航栏组件

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom' // 路由
import PropTypes from 'prop-types' // 验证组件类型

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

// 2.组件封装验证类型：如果类型不对就报错 防止别人乱传参数
// a 下载prop-types包 并且引入
// b 组件.propTypes={参数名:验证类型}
// propTypes 是规定写法
NavHeader.propTypes={
    children:PropTypes.string // children是一个字符串类型
    // props后面的都可以验证 组件中间的children 或者父传子...
}

// 3.设置默认值 导出之前
// 如果没有传参数 我们应该设置一个默认值
// 组件.defaultPops={参数：默认值}
NavHeader.defaultProps={
    children:'默认导航标题'
}

export default withRouter(NavHeader) 
// withRouter(NavHeader) 就是react封装的高阶组件

