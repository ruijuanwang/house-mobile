// 专门用来封装一些常用的函数
// es6中 export 可以导出多个 export default 可以导出一个
import axios from 'axios'
// 1.封装 定位当前城市的函数 并且导出使用
export let getCurrentCity=()=>{
    //使用百度 定位当前城市--ip定位  BMap.LocalCity
    var myCity = new window.BMap.LocalCity()
    // 里面就是 回调函数
    myCity.get(async (result)=>{
        var cityName = result.name;
        // alert("当前定位城市:"+cityName);// 北京市  定位的当前城市 在哪打开网站就是哪
        // cityName 是当前定位的城市名字 我们需要使用不同的地址获取城市id还有其他信息 有个接口 我们直接调用
        let dingwei =await axios.get(`http://api-haoke-dev.itheima.net/area/info?name=${cityName}`) // 传入当前定位地址
        console.log('定位',dingwei.data.body); // {label: "北京",value: "AREA|88cff55c-aaa4-e2e0"}
        
      })

}