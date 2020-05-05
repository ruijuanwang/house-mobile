import React,{ Component } from 'react'
import './map.scss' // 引入样式
import NavHeader from '../../components/NavHeader'
// 导入局部样式   
import styles from './map.module.css'

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
            // console.log(styles); // {news: "map_news__1mbE2"}=> styles是一个对象{news:react新取的唯一名字} 
        return <div className='map'>
            
            {/*局部样式 使用：className={styles.news} */}
            {/*styles.news=> class="map_news__1mbE2" 其实就是帮我们取一个新的名字。 */}
            {/* <div className={styles.news}>map啊啊啊</div> */}
                {/*1. 顶部导航组件 */}
                {/* children 组件标签之间的内容 */}
                 <NavHeader>地图找房</NavHeader>
                {/* Map组件 */}
                <div id='container'></div>          
            </div>
    }
}