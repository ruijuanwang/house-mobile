import React,{ Component } from 'react'
import './map.scss' // 引入样式

let BMap = window.BMap // 使用地图函数要加 window. 来调用
export default class Map extends Component{
    componentDidMount(){
        // 在这里保证有dom元素有div盒子了
        this.initMap() // 调用函数
    }
    // 封装一个函数，用来初始化地图
    initMap(){
        // 1.创建地图实例 放到对应的div id为container
        var map = new BMap.Map('container')
        // 2.移动地图到中心点经纬度  (116.404,39.915) 默认北京天安门
        var point =new BMap.Point(116.404,39.915)
        // 3.缩放地图
        map.centerAndZoom(point,15) // 数字越大 地图就会放大 看到的就更精确 放大缩小
    }
    render(){
        return <div className='map'>
                {/* Map组件 */}
                <div id='container'></div>          
            </div>
    }
}