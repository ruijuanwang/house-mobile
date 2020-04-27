import React,{ Component } from 'react'
import axios from 'axios' // 引入axios包
import { Carousel, WingBlank } from 'antd-mobile'; // 导入走马灯组件

export default class Home extends Component{
 state = {
    swiperData: [], // 轮播图数据
    imgHeight: 176,
    isplay:false // 控制轮播图是否自动播放 (应该会自动轮播，但是他不会自动播放，代码没错。原因就是 刚进来没优数据，自动轮播 没法判断怎么轮播 ，没有数据，所以我们应该等数据请求回来赋值到swiperData中才改为true，但是由于setState是异步的，所以要在第二个参数回调中，这时保证数据请求回来了，把isplsy自动播放改为true)
  }
  componentDidMount() {
    // 应该发送请求  获取轮播图数据
    this.getSwiper() // 调用函数
  }
  // 调用接口获取轮播图数据的函数
  async getSwiper(){
     //调用接口
     var res = await axios.get('http://api-haoke-dev.itheima.net/home/swiper')
     console.log(res);
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
    render(){
        return <div>
            {/* 我是首页组件 */}
            {/* 轮播图 使用走马灯Carousel组件 */}
            {/* <WingBlank>  包裹在外层 表示两侧留白 我们不需要*/}
            <Carousel
            autoplay={this.state.isplay} // 是否自动播放 true
            infinite // 是否无限循环轮播
            >

            {/* 循环state中的轮播图片 */}
            {/* 调用循环轮播图的函数 */}
            { this.renderSwiper() }

            </Carousel>
            </div>
    }

}