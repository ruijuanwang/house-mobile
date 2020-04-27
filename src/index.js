// 1.导入 react 两个核心包
import React from 'react';
import ReactDOM from 'react-dom';
import './utils/index.css' // 导入 默认样式
import 'antd-mobile/dist/antd-mobile.css'; //引入 antd-mobile组件库的 默认css样式

// 2.导入根组件
import App from './App'; 

// 3.渲染页面
ReactDOM.render(<App />,document.getElementById('root'));

