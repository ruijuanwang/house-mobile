import React,{ Component } from 'react'
// 导入组件
import { NavBar, Icon } from 'antd-mobile'; 
//  导入样式
import './citylist.scss'
import axios from 'axios'

export default class Citylist extends Component{
    componentDidMount(){
        // 调用获取城市的方法
        this.getCityList();
    }
    // 获取城市的数据的函数函数
    async getCityList(){
        // 调用接口 
        let res = await axios.get('http://api-haoke-dev.itheima.net/area/city?level=1')
        // 调用函数 传入获取的城市列表 
        // 会得到返回值 一个对象 我们解构出来
        let {citylist,cityindex} = this.formatCity(res.data.body)
        console.log('左侧新的城市列表对象',citylist);
        console.log('右侧单词数组',cityindex);
    }

    // 改造城市列表数据的函数
    formatCity(list){
        // list就是传来的城市列表数据 改造前的

        // 0: {label: "北京", value: "AREA|88cff55c-aaa4-e2e0", pinyin: "beijing", short: "bj"}
        // 1: {label: "安庆", value: "AREA|b4e8be1a-2de2-e039", pinyin: "anqing", short: "aq"}
        // 2: {label: "南宁", value: "AREA|2bc437ca-b3d2-5c3c", pinyin: "nanning", short: "nn"}
        // 3: {label: "长沙", value: "AREA|98b03413-6f84-c263", pinyin: "changsha", short: "cs"}
        // 获取来的数据 不是我们想要的格式 我们应该自己格式化：
        // {
        //   a:[a的城市1，a的城市2...],
        //   b:[b的城市1，b的城市2...],
        //     ...
        // }
        // 定义一个新的空对象 用来放我们改造的城市列表
        let citylist = {}
        // 我们应该循环数组的每一项  改成我们想要的格式
        list.forEach((item)=>{
            // 每一个城市 根据拼音 bj 首字母b判断  从索引0开始截取一位
             let word = item.short.substr(0,1) // 截取第一个单词
            // 判断对象的键有没有第一个单词 有就push进去数组  没有就赋值一个数组
            // 1.对象.属性 2.对象['属性']
            // 对象中没有属性的话就会返回undefined 
            // {b:[宝鸡，北海，北京]} 
            // 如果对象里面没有  我们就赋值 为数组，如果有 我们就追加到数组
            if(citylist[word]){
                // 说明有这个key 我们应该把这一项 push进去
                citylist[word].push(item)
            }else{
                // 说明没有数组，赋值给一个数组  并且把当前的item这一项加进去  否则就跳过了
                citylist[word]=[item]
            }
        })
        // 右侧的单词列表 她就是我们的城市列表中的键 和城市名对应
        // Object.keys(对象) // 返回一个数组列表，里面是对象的键名
        // 他没有排序，我们应该给他排序 数组.sort()
        let cityindex = Object.keys(citylist).sort();
        // 我们应该返回一个对象
        return {
            citylist,
            cityindex  // es6
        }
    // console.log('左侧新的城市列表对象',citylist);
    // console.log('右侧单词数组',cityindex);
    }

    render(){
        return <div className='citylist'>
            {/* 我是Citylist组件 */}
            {/* 1.顶部导航栏组件 NavBar */}
             <NavBar
             className='navbar'
             mode="light" // 导航栏的颜色 dark 蓝色 light白色
             icon={<Icon type="left" />} // 左侧图标 自带的
             onLeftClick={() =>
                //  点击左侧图标 触发事件 应该返回上一页
                // this.props.history.goBack()
                this.props.history.go(-1)
             }
            >城市选择</NavBar>

            {/* 2.内容 */}
            </div>
    }

}