import React,{ Component } from 'react'
import './map.scss' // 引入样式
import NavHeader from '../../components/NavHeader'
// 导入局部样式   
import styles from './map.module.css'
// 引入定位城市
import { getCurrentCity } from '../../utils/index'
// 导入axios
import axios from 'axios'

let BMap = window.BMap // 使用地图函数要加 window. 来调用
export default class Map extends Component{
    componentDidMount(){
        // 在这里保证有dom元素有div盒子了
        this.initMap() // 调用函数
    }
    // 封装一个函数，用来初始化地图
    async initMap(){
       
        // 1.创建地图实例 放到对应的div id为container
        this.map = new BMap.Map('container')   
         //1.1 通过定位拿到城市名
        let dingwei = await getCurrentCity()
        console.log(dingwei);       
        // 1.2 通过百度地图的 地址解析 把城市转换成经纬度
        //  创建地址解析器实例     
        var myGeo = new BMap.Geocoder();      
        // 2移动地图到中心点经纬度
        myGeo.getPoint(dingwei.label,async (point)=>{  
            // point 城市名转换的 对应经纬度点    
            if (point) {  
                // 3.缩放地图    
                this.map.centerAndZoom(point, 11);  // 11市区  13 县镇  15小区街道  20家门口      
                this.map.addControl(new BMap.NavigationControl()); 
                 
                // 给地图添加控件  
                this.map.addControl(new BMap.ScaleControl()); // 右下角缩放控件
                this.map.addControl(new BMap.OverviewMapControl()); //比例尺    
                this.map.addControl(new BMap.MapTypeControl()); // 右下角的小地图 
                this.map.setCurrentCity("北京"); //地图三维卫星

                //---- 调用封装的函数 获取所有区的房子以及循环生成覆盖物
                // 传参数：1.dingwei.value
                // map涉及到两个函数要用：
                // 1.可以当做参数传进去 
                // 2.使用全局变量 定义在外面 
                // 3.赋值给this （this就是map组件）使用第三种(在组件里面统统使用this.map)
                this.renderOverlays(dingwei.value)                  
                
            }      
        }, 
        dingwei.label);




    // //    ------------------------------------------- /
    //     // 1.创建地图实例 放到对应的div id为container
    //     var map = new BMap.Map('container')
    //     // 2.移动地图到中心点经纬度  (116.404,39.915) 默认北京天安门
    //     // 在哪个城市 地图就是哪个城市的 不应该写死 北京--修改经纬度就可以
    //     var point =new BMap.Point(116.404,39.915)
    //     // 3.缩放地图
    //     // 11市区  13 县镇  15小区街道  20家门口
    //     map.centerAndZoom(point,11) // 数字越大 地图就会放大 看到的就更精确 放大缩小
    }
    // 函数 发送请求获取定位城市的所有区 的房子套数 以及 循环生成覆盖物
     renderOverlays= async (id)=>{
                        // --------发送请求获取当前定位城市 所有区的 房子套数
                // await async必须写在离他最近的函数前
                let res = await axios.get(`http://api-haoke-dev.itheima.net/area/map?id=${id}`) //传入定位城市的id
                // console.log(res);

                //  item每一项的数据:
                //  {  label: "白云"
                //     value: "AREA|8b5511b3-7699-f921"
                //     coord: {latitude: "23.17599", longitude: "113.261927"}
                //     count: 375
                //   } 
                // res获取来有12个区在地图上，应该循环生成12个圆形覆盖物
                res.data.body.forEach((item)=>{
                    // console.log('每一项区的数据',item);
                    // 以下就是 一个item  循环生成
                    // 通过res得到的经纬度 生成坐标点圆圈显示不同的位置--longitude 经度  latitude 纬度
                    var point = new BMap.Point(item.coord.longitude,item.coord.latitude); // 设置每一项经纬度
                    // 1.给地图添加一个最简单的文字覆盖物
                    // 总结：1.创建label div盒子 2.内容是 嘿嘿嘿 3.显示在对应的坐标上
                    var opts = {
                    position : point,    // 覆盖物显示的 经纬度坐标点
                    offset   : new BMap.Size(30, -30) // 设置文本偏移量 x y的位置
                    }
                    // 1.2 label 覆盖物 new BMap.Label("覆盖物内容", {})
                    // label 标签 类似一个div----1.里面可以写文本 2.也可以写div h1等 写类名样式
                    // 第一个参数 1.可以直接写div 内容 2.可以先写 '' 在调用 label.setContent(内容)
                    var label = new BMap.Label('' , opts);  // 创建label div 内容是第一个参数
                    // 覆盖物样式结构(圆形覆盖物):使用第二种写法 setContent(内容)
                    label.setContent( `
                    <div class="${styles.bubble}">
                        <p class="${styles.name}">${item.label}</p> 
                        <p>${item.count}套</p>
                    </div>
                    `)
                    // 1.3 label.setStyle({}) 给label div设置样式
                    label.setStyle({});
                    //--- 绑定点击 覆盖物的事件
                    label.addEventListener('click',()=>{
                        console.log('点击了覆盖物',item.label+'----'+item.value);                   
                    })
                    // 1.4 map.addOverlay(); 给地图添加一个覆盖物 显示在地图上
                    this.map.addOverlay(label);  
                        
                })
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