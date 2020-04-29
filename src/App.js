import React from 'react';
import { BrowserRouter as Router, Route,Link, Redirect } from 'react-router-dom'
import Home from './pages/Home' // 导入Home组件
import Citylist from './pages/Citylist' // 导入Citylist组件
import Map from './pages/Map' // 导入Map组件
 
class App extends React.Component{
  render(){
    // BrowserRouter 必须在最外层包裹一次
    return <Router>
    <div className="App">
      {/* 我是APP根组件 */}
      {/* 配置 / 默认地址 重定向 默认打开显示Index首页 */}
      <Route
      exact
      path='/'
      render={(props)=>{ // props参数 组件的 我们经常用的props 在这里没什么用
          // 重定向 重新跳转到首页 / 默认跳转首页
          return <Redirect to='/home/index'></Redirect>
        }}
      ></Route>
      {/* /home 是父路由组件 里面嵌套四个子路由 */}
      <Route path='/home' component={ Home }></Route>
      {/* 城市选择也是一个单独的页面 属于兄弟路由 同级写 */}
      <Route path='/citylist' component={ Citylist }></Route>
      {/* Map 地图找房组件 一级路由 */}
      <Route path='/map' component={ Map }></Route>
    </div>
    </Router>
  }
}



export default App;
