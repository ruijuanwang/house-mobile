import React,{ Component } from 'react'
// 导入组件
import { Toast } from 'antd-mobile'; 
import NavHeader from '../../components/NavHeader' // 导入导航栏组件

//  导入样式
import './citylist.scss'
import axios from 'axios'
import {getCurrentCity} from '../../utils/index.js' // 导入获取定位城市的方法
// 引入可视区渲染 react-virtualized 中的 List 组件
import {List, AutoSizer} from 'react-virtualized';

// 显示的列表数据
// const list = [
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   'Brian Vaughn',
//   // And so on...
// ];



export default class Citylist extends Component{
    // 创建ref
    listRef =React.createRef()
    state={
        citylist:{}, // 存入左侧城市列表的数据
        cityindex:[], // 存入右侧单词列表的数组
        activeIndex:0 // 右侧单词高亮显示 默认第一项
    }
    componentDidMount(){
        // 调用获取城市的方法
        this.getCityList();
    }
    // 获取城市的数据的函数函数
    async getCityList(){
        // 调用接口 
        let res = await axios.get('http://api-haoke-dev.itheima.net/area/city?level=1')
        // 调用函数 传入获取的城市列表 
        // 1. 会得到返回值 一个对象 我们解构出来
        let {citylist,cityindex} = this.formatCity(res.data.body)

        // 还差热门城市 和 定位城市
        // 2.热门城市  调用接口 获取数据
        let hotRes = await axios.get('http://api-haoke-dev.itheima.net/area/hot')
        // console.log('热门城市数据',hotRes); // 有四项 
        // 我们把res.data.body这个热门城市的数组，应该加到城市列表的对象里面  （hot就是key）
        citylist['hot']=hotRes.data.body // hot:[热门城市数组]
        // 右侧对应单词也要加到右侧单词数组中
        cityindex.unshift('hot') // 从前添加 [hot,a,b,c...]
        
        // 3.调用获取定位城市的函数  他是一个promise 所以要加await
        var dingwei = await getCurrentCity()
        // promise 遇到await  就会得到 resolve的值
        // console.log('我是定位城市',dingwei);
        // dingwei就是定位的当前的城市，我们应该加到 左侧对象城市列表 中和 右侧数组中 对应#
        citylist['#']=[dingwei] // dingwei是个对象 我们要求格式一致 单词:数组  所以要把他放入数组中
        cityindex.unshift('#') // 从前面添加到 右侧数组中 [#,hot,a,b,c...]
        //---- 现在拿到了数据应该赋值到 state中
        this.setState({
            citylist, // 左侧城市数据
            cityindex // 右侧单词数组
        })
        
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
    // -------------------
    // rowRenderer 是每条数据的渲染函数  每个数据 都会执行他 这个函数 是循环 每条数据都会执行的
    // 在里面可以写html 内容 
    // 写组件里面 把这个函数
    rowRenderer=({ // 改成箭头函数
    key, //唯一key
    index, // 索引 每条数据的索引
    isScrolling, // 是否正在滚动 true正在滚动  false没有滚动
    isVisible, // 是否可见 true看见了
    style, // style 每行div的 行内样式 他是组件控制的 我们必须写
    })=>{
        let word =this.state.cityindex[index] //通过索引拿到对应数组的单词  # hot A B C...
        let citys = this.state.citylist[word] // 通过单词拿到左侧对应的数组城市 ["北京","北海","宝鸡"]
    return (
        //   是返回的内容
        // 1.这个div就是左侧的单词城市 A ..B..
        <div className='city' key={key} style={style}>
            {/* A数组 对应应该是A的城市数组 */}
            {/*  格式化word 显示 调用函数 */}
            <div className='title'>{ this.formatWord(word) }</div>
            {/* 循环数组 citys 显示城市 */}
            {
             citys.map((item)=>{
                return <div 
                className='name'
                key={item.value}
                // 点击左侧 城市 只有北上广深 有房源 可以切换 其他的显示暂无房源
                onClick={()=>{
                    // 1.可以使用 if else 
                    // 2.使用数组
                    let hasHouse=['北京','上海','广州','深圳']
                    // hasHouse.idnexOf(城市) 不是北上广深 idnexOf就找不到 返回-1 找到返回索引
                    if(hasHouse.indexOf(item.label)!==-1){
                        // 说明是北上广深 切换城市 跳转主页
                        // 切换localstorage 本地存储的城市
                        localStorage.setItem('current-city',JSON.stringify(item))
                        // 跳转首页
                        this.props.history.push('/home/index')
                    }else{
                        // -1 说明不是北上广深 提示暂无房源
                        Toast.info('该城市暂无房源哦~',2)
                    }
                }}
                >
                {item.label} 
                </div>
            })
            }
        </div>
       
    );
    }
    // 计算行高的函数 每个div(B+北海,北京，宝鸡)的高度
    // 会传入一个参数 ({ index: number }): number 
    // 函数的参数是一个对象{} 里面的 index 要求是Number类型的   
    // 最后的:number 表示返回值要求也是Number类型的
    getHeight=({index})=>{
        // index 是每一项的索引
        // 1.通过 索引 拿到数组的 单词
        let word = this.state.cityindex[index]
        // 2.再通过 单词拿到对应 城市数组
        let citys = this.state.citylist[word]
        // 每一个大div的高度应该是 单词高度+所有城市数组的高度
        // 每个大div高度 = 36+城市个数*50
        // 返回值
        return 36+citys.length*50
    }
    // 格式化单词的函数 # 定位城市 hot 热门城市 其他 转化成大写
    formatWord=(word)=>{
        // 接收传来的参数word 
        switch(word){
            case '#':
                return '定位城市'
            case 'hot':
                return '热门城市'
            default:
                return word.toUpperCase() // 其他转换成大写
        }
    }
    // 循环渲染右侧数组的函数
    renderRightWord=()=>{
      return this.state.cityindex.map((item,index)=>{
            // 循环渲染右侧单词 生成li
            // item 就是 # hot a... 。其中hot 转成 '热' 其他改成大写 字母  判断简单的直接写三元
            // 默认第一个选中 高亮 
                return  <li className={ this.state.activeIndex===index?'active':''}  key={index}
                onClick={()=>{
                    // 点击右侧单词 让左侧List列表 滚动到对应单词
                    // List组件滚动到对应单词 只要list调用 scrollTop方法 并且传一个索引 
                    // List组件.scrollToRow(对应单词的索引)
                    this.listRef.current.scrollToRow(index) // 滚动到对应的索引
                }}
                >
                { item==='hot'? '热':item.toUpperCase() }
                </li>
            })
    }
    // 当List组件滚动的时候触发该函数
    // ({ overscanStartIndex: number, overscanStopIndex: number, startIndex: number, stopIndex: number }): void
    // 是一个函数 参数是一个对象 {} 对象里面有四个参数
    // 这四个参数都是number数字类型的   最后的:void 意思是不需要返回值
    onRowsRendered=({overscanStartIndex,overscanStopIndex,startIndex,stopIndex})=>{
        // console.log('滚动了啊');
        // startIndex 是左侧列表 滚动到 顶部的对应索引
        // 当单词滚动到顶部的时候 右侧对应的索引单词要高亮
        // activeIndex 是那个索引的数字 哪个高亮 正好可以控制
       if(this.state.activeIndex!==startIndex){ // 如果两次索引不一样 才去修改 如果一样 没必要修改 效率高
            this.setState({
            activeIndex:startIndex // 0 1 2 3...
        })  
       }     
    }



    render(){
        return <div className='citylist'>
            {/* 我是Citylist组件 */}
            {/* 1.顶部导航栏组件 NavBar 使用自己封装的组件 */}
           <NavHeader>城市选择</NavHeader>

            {/* 2.内容 List组件 可视区域渲染  */}
            {/* 可视区域的宽高度是动态渲染的 也就是除了导航栏剩下的就是我们要显示的区域
            它的宽高度我们需要使用 AutoSizer组件 包裹List组件 并使用他计算出来的height width 占满屏幕*/}
           <AutoSizer>
               {({width,height})=>(
                   <List
                    ref={this.listRef} 
                    scrollToAlignment='start' // 让列表滚动到索引对应的顶部
                    width={width} // 列表宽
                    height={height} // 列表高
                    rowCount={this.state.cityindex.length} // 列表数据的长度 总条数
                    rowHeight={this.getHeight} // 行高 1.可以是固定高度 2.可以是一个函数
                    rowRenderer={this.rowRenderer} // 每条数据的渲染函数
                    onRowsRendered={ this.onRowsRendered } // 当List列表滚动的时候执行该函数
                   />
               )}
            </AutoSizer>
             {/* 2.右侧单词显示布局
            使用固定定位  定位到右侧 */}
            <ul className='city-index'>
                {/* active类名代表选中状态   循环每一项数组单词 */}
                {/* 调用函数 */}
            { this.renderRightWord() }
            </ul>
            </div>
    }

}