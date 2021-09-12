tl-banner
===

| Chrome | Firefox | Safari | Edge |               IE               |
| :----: | :-----: | :----: | :--: | :----------------------------: |
|   √    |    √    |   √    |  √   | `9`  √<br />`10` √<br />`11` √ |

> IE9下会无切换动画

> 还未在移动端进行过测试    
      
<br/>

## tl-banner 是干嘛的

`tl-banner`是一款基于vue2.0的banner轮播插件。

<br/>

## Feature:
* [√] 支持 banner 图片延迟加载
* [√] 宽高未固定大小时, 支持自适应大小
* [√] 支持轮播速度等相关自定义设置

<br/>

## 安装

1. npm
  推荐使用`npm`，这样可以跟随你的`webpack`配置去选择怎样打包。

  ```
  npm i -S tl-banner
  ```

<br/>

## 注册组件

1. 全局注册

   ```vue
   <template>
     <tl-banner></tl-banner>
   </template>
   <script>
    import Vue from 'vue'
    import TlBanner from 'tl-banner'
    Vue.use(TlBanner)
   </script>
   ```

2. 局部注册

   ```vue
   <template>
     <tl-banner></tl-banner>
   </template>
   <script>
     import { TlBanner } from 'tl-banner'
     export default {
         name: '',
         components: {TlBanner} //在组件内注册
     }
   </script>
   ```

<br/>

## 属性

### list
* 类型`Array`

* 默认值`[]`

  数据源。[{src:'http://xx.jpg'}]

### width
* 类型`[Number, String]`

* 默认值`100%`

  容器宽度，值为Number类型时，自带单位px

### height
* 类型`[Number, String]`

* 默认值`auto`

  容器高度，值为Number类型时，自带单位px。值为auto时则以 `imgSize` 设定的尺寸等比缩放计算高度。

### img-size
* 类型`Array`

* 默认值`[1920, 400]`

  图片原始尺寸，`height不为auto时无效`。在未设置高度时，以该尺寸等比缩放，作为容器高度

### speed
* 类型`Number`

* 默认值`500`

  切换速度, 单位ms

### auto-play
* 类型`[Number, Boolean]`

* 默认值`3000`

  是否开启自动切换。false可关闭；为Number时，以值作为切换等待时间, 单位ms；为true时(多余)，以默认值3000作为等待时间

### navigation
* 类型`Boolean`

* 默认值`true`

  是否显示左右切换按钮

### pageination
* 类型`Boolean`

* 默认值`true`

  是否显示分页器

### lazy-load
* 类型`Boolean`

* 默认值`true`

  是否开启图片延迟加载

<br/>

## 事件

### changed(index, data)

* 切换事件

* 参数`index`

  > 数据下标

* 参数`data`

  > 当前数据


### selected(data)

* 点击轮播项时触发

* 参数`data`

  > 当前点击选项数据


<br/>

## 更新日志:

* [ 1.0.1 ]  修复已知问题
* [ 1.0.0 ]  初版