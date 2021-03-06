import React,{ Component } from 'react'
import axios from 'axios' // 引入axios包
import { Carousel, WingBlank, Flex,Grid  } from 'antd-mobile'; // 导入走马灯组件
import './index.scss' // 引入样式
// 导入 图片 
import nav1 from  "../../assets/images/nav-1.png"
import nav2 from  "../../assets/images/nav-2.png"
import nav3 from  "../../assets/images/nav-3.png"
import nav4 from  "../../assets/images/nav-4.png"
// 导入定位城市的函数
import { getCurrentCity } from '../../utils/index.js'


// navs导航菜单 觉得 是比较死的 就写死数据了  也可以发送请求
// 导航菜单的数据
const navs = [{
  id: 0,
  img: nav1,
  title: '整租',
  path: '/home/houselist'
}, {
  id: 1,
  img: nav2,
  title: '合租',
  path: '/home/houselist'
}, {
  id: 2,
  img: nav3,
  title: '地图找房',
  path: '/map'
}, {
  id: 3,
  img: nav4,
  title: '去出租',
  path: '/rent/add'
}]

export default class Home extends Component{
 state = {
    swiperData: [], // 轮播图数据
    imgHeight: 176,
    isplay:false, // 控制轮播图是否自动播放 (应该会自动轮播，但是他不会自动播放，代码没错。原因就是 刚进来没优数据，自动轮播 没法判断怎么轮播 ，没有数据，所以我们应该等数据请求回来赋值到swiperData中才改为true，但是由于setState是异步的，所以要在第二个参数回调中，这时保证数据请求回来了，把isplsy自动播放改为true)
    groups:[], // 接收租房小组的数据
    news:[], // 接收最新资讯的数据
    cityname:'' // 显示当前定位的城市
  }
  async componentDidMount() {
    // 应该发送请求  获取轮播图数据
    this.getSwiper() // 调用函数
    this.getGroups() // 调用函数 获取租房小组数据
    this.getNews() // 调用函数 获取最新数据数据
    //使用百度 定位当前城市--ip定位  BMap.LocalCity
    //1. 直接调用我们封装好的函数 他是一个promis 所以要用await async
    let cityname = await getCurrentCity()
    // 2. 设置到state数据中 cityname是一个对象 里面的label是我们要的城市名
    this.setState({
      cityname:cityname.label
    })
    // var myCity = new window.BMap.LocalCity();
    // // 里面就是 回调函数
    // myCity.get((result)=>{
    //     var cityName = result.name;
    //     // alert("当前定位城市:"+cityName);// 北京市  定位的当前城市 在哪打开网站就是哪
    //     // 赋值
    //     this.setState({
    //       cityname:cityName
    //     })
    //   }); 
  }
  // 获取最新数据数据的函数
  async getNews(){
     // 发送请求
     const res = await axios.get("http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    //  console.log('最新资讯',res);
     if(res.data.status===200){
         this.setState({
             news:res.data.body // 赋值到state中
         })
     }     
    }
  // 租房小组 获取数据 调用接口
  async getGroups(){
      const res = await axios.get('http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    //   console.log("租房小组数据",res);
     if(res.data.status===200){
        //  状态码为200就是成功
          this.setState({
          groups:res.data.body // 赋值到state中
      })
     }   
  }
  // 调用接口获取轮播图数据的函数
  async getSwiper(){
     //调用接口
     var res = await axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    //  console.log(res);
     this.setState({
         swiperData:res.data.body  // 获取来赋值到state的轮播图数据中
     },()=>{
        // 这时保证轮播数据已经请求回来 把自动播放改为true
        this.setState({
            isplay:true
        })
     })    
  }
   // 循环轮播图 封装成函数
    renderSwiper(){
      return this.state.swiperData.map(val => (
                <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                                             // val.imgSrc 每张图片的src
                    src={`http://api-haoke-dev.itheima.net${val.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
            ))
    }
    // 循环4个导航菜单 封装成函数
    renderNavs(){
      return navs.map((item,index)=>{
                     return <Flex.Item
                      key={item.id}
                    //   点击跳转到对应的页面
                      onClick={()=>{
                          this.props.history.push(item.path)
                      }}
                      >
                         {/* 图片地址 */}
                        <img src={item.img} alt='' /> 
                        {/* 标题 */}
                        <p>{item.title}</p>
                        </Flex.Item>    
                 })
    }
    // 渲染 最新资讯 3个li
    renderNews(){
        return this.state.news.map((item,index)=>{
            return <li key={item.id}>
            <div className="imgBox">
                <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt=""/>
            </div>
            <div  className="news-text">
                <h4>{item.title}</h4>
                <p>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                </p>
            </div>
            </li>
        })
  }
    render(){
        return <div className='index'>
            {/* 我是首页组件 */}
            {/* 0.顶部搜索栏部分 */}
            <Flex className='searchBox'>
            <Flex className='searchLeft'>
                <div className='location'
                onClick={()=>{
                    // 点击跳转到城市列表页面
                    this.props.history.push('/citylist')
                }}
                >
                    {/* 定位的地址 不能写死 */}
                   <span>{this.state.cityname}</span>                   
                    <i className="iconfont icon-arrow" />
                </div>
                <div className='searchForm'>
                    <i className="iconfont icon-seach" />
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
            {/* 右侧地图图标 点击跳到 /map */}
            <i className="iconfont icon-map" 
              onClick={()=>{
                  this.props.history.push('/map') // 点击跳转地图
              }}
             />
        </Flex>
            {/* 1.轮播图 使用走马灯Carousel组件 */}
            {/* <WingBlank>  包裹在外层 表示两侧留白 我们不需要*/}
            <Carousel
            autoplay={this.state.isplay} // 是否自动播放 true
            infinite // 是否无限循环轮播
            >

            {/* 循环state中的轮播图片 */}
            {/* 1.调用循环轮播图的函数 */}
            { this.renderSwiper() }

            </Carousel>
            {/* 2.导航菜单栏 */}
            {/* 用Flex组件 外层Flex ，里面每一项使用 Flex.Item */}
             <Flex className='navs'>
                 {/* 循环4个导航菜单栏 */}
                 {/* 调用函数 */}
                 {this.renderNavs()}                                         
            </Flex>
            {/* 3.租房小组 */}
            <div className='group'>
                {/* 标题 */}
                <div className='group-title'>
                    <h3>租房小组</h3>
                    <span>更多</span>
                </div>
                {/* 四个盒子内容 使用九宫格组件 Grid */}
                <Grid 
                      data={this.state.groups} // data是要循环的数组
                      activeStyle={true} //activeStyle点击是否有灰色的 样式 false没有
                      columnNum={2} // columnNum列数 一行占几个 2 列
                      square={false} // square是否固定正方形 默认true 我们要矩形 false
                      hasLine={false} // hasLine默认有边框的我们不需要改为false
                      // renderItem 每个格子 都会执行一次这个函数 会把每个数据 传进去 是一个函数 里面可以写每个格子的 html样式
                      renderItem={(item,index)=>{ 
                        return <Flex className='grid-item' justify='between'>
                              {/* 左边两行文字 */}
                          <div className="desc">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                          </div>
                          {/* 右边图片 */}
                          <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt="" />
                          </Flex>
                      }}
                />
            </div>
            {/* 4.最新资讯 */}
             <div className="news">
            {/* 头 */}
            <h3>最新资讯</h3>
            {/* 列表 */}
            <ul>
                {/* 一个  循环news数组 生成三个li */}
                { this.renderNews() }
            </ul>
        </div>
           
        </div>
    }

}