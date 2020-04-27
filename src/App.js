import React from 'react';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'
import Home from './pages/Home' // 导入Home组件
import Citylist from './pages/Citylist' // 导入Citylist组件
 
class App extends React.Component{
  render(){
    // BrowserRouter 必须在最外层包裹一次
    return <Router>
    <div>
      我是APP根组件
      {/* /home 是父路由组件 里面嵌套四个子路由 */}
      <Route path='/home' component={ Home }></Route>
      {/* 城市选择也是一个单独的页面 属于兄弟路由 同级写 */}
      <Route path='/citylist' component={ Citylist }></Route>
    </div>
    </Router>
  }
}



export default App;
