// 专门用来封装一些常用的函数
// es6中 export 可以导出多个 export default 可以导出一个
import axios from 'axios'
// 1.封装 定位当前城市的函数  2根据获取来的城市名字，调用接口 获取城市id以及其他信息并且导出使用
// 2.每次调用函数 都去百度定位 百度地图调用 是有次数限制的  不能无限次调用它
// 每次都定位 效率不高 应该存在localstorage
// 我们应该 如果本地localstorage 里面 没有 就去百度定位城市 然后存入本地
       //  如果本地有  我们直接 去本地缓存localstorage取出定位的城市
      //  localstorage 存定位城市 后面拿出来用的效率高一点
      // 我们约定 定位城市的localstorage 名字叫做 current-city 
      // 获取 getItem('名字')   设置值 setItem('名字',字符串对象)

export let getCurrentCity=()=>{
  // 1.首先获取本地的定位城市  获取过来的是字符串格式的  应该转换对象格式
  let city = JSON.parse(localStorage.getItem('current-city'))
// 判断
if(!city){ // 说明没有本地缓存城市  我们应该去获取
      //使用百度 定位当前城市--ip定位  BMap.LocalCity
    var myCity = new window.BMap.LocalCity()
    // 里面就是 回调函数
    myCity.get(async (result)=>{
        var cityName = result.name;
        // alert("当前定位城市:"+cityName);// 北京市  定位的当前城市 在哪打开网站就是哪
        // cityName 是当前定位的城市名字 我们需要使用不同的地址获取城市id还有其他信息 有个接口 我们直接调用
        let dingwei =await axios.get(`http://api-haoke-dev.itheima.net/area/info?name=${cityName}`) // 传入当前定位地址
        // 我们获取完定位城市后 应该存到本地  存入对象字符串格式 dingwei.data.body对象格式的
        localStorage.setItem('current-city',JSON.stringify(dingwei.data.body))
        console.log('定位',dingwei.data.body); // {label: "北京",value: "AREA|88cff55c-aaa4-e2e0"}
        
      })
}else{ // 说明有本地缓存 直接返回本地定位城市
  return city
}

}