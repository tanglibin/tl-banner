<template>
    <div class="tl__banner" :style="{'height': boxHeight, 'width': typeof width == 'number' ? width+'px': width}" ref="box">
        <template v-if="navigation">
            <div class="tl__prevbtn" @click="go(-1)"></div>
            <div class="tl__nextbtn" @click="go(1)"></div>
        </template>

        <ul class="tl__banner__slide">
            <li class="tl__slideitem" v-for="(item, index) in bannerList" :key="index" :class="getClass(index)" :style="{'animation-duration': speed+'ms'}" @click="$emit('selected', item)">
                <img :class="{'tl__slide__img': Boolean(item.src)}" :src='item.src'>
            </li>
        </ul>

        <ul v-if="pageination" class="tl__pageination">
            <li class="tl__page_item" 
                v-for="(item, index) in list" 
                :key="index" 
                :class="{'tl__slide_active': index == showIndex}"
                @mouseover="to(index)"
                :style="{'width': 100 / list.length + '%'}">
            </li>
        </ul>
    </div>
</template>

<script>
import less from './banner.less';
export default {
    name: 'TlBanner',
    props: {
        list: { //数据
            type: Array,
            default(){
                return [];
            }
        },
        width: { //容器宽度，值为Number时，单位为px
            type: [Number, String],
            default: '100%'
        },
        height: {//容器高度，值为Number时，单位为px, 值为auto时则以imgSize设定的尺寸等比缩放计算高度
            type: [Number, String],
            default: 'auto'
        },
        imgSize: { //图片原始尺寸，height不为auto时无效。在未设置高度时，图片尚未加载完成，没有高度的情况下，以该尺寸等比缩放，规避页面布局抖动
            type: Array,
            default(){
                return [1920, 400]
            }
        },
        speed: {//切换速度, 单位ms
            type: Number,
            default: 500
        },
        autoPlay: { //自动切换，为Boolean时false关闭，true时以默认值3000作为切换等待时间； 为number时指定切换等待时间， 单位ms
            type: [Number, Boolean],
            default: 3000
        },
        navigation: { //是否显示左右切换按钮
            type: Boolean,
            default: true
        },
        pageination: { //分页器
            type: Boolean,
            default: true
        },
        lazyLoad: { //内容是否延迟加载
            type: Boolean,
            default: true
        },
    },
    data(){
        return {
            boxHeight: 0, //容器高度
            timeout: null, //延迟处理窗口大小改变事件定时器
            autoPlayInterval: null, //自动切换定时器

            showIndex: 0, //当前显示下标
            isRight: true, //是否由右向左滑动

            bannerList: [], //banner显示数据集
        }
    },
    watch: {
        /**数据集改变监听 */
        list(){
            this.bindData();
        },

        /**切换监听 */
        showIndex(idx){
            this.lazyLoad && this.$set(this.bannerList[idx], 'src', this.bannerList[idx].lazySrc);
            this.$emit('changed', idx, this.list[idx]);
        }
    },
    mounted(){
        // 初始容器高度
        const {width, height, autoPlay, setBoxHeight} = this;
        const autoHight = height == 'auto';
        autoHight ? setBoxHeight() : (this.boxHeight = typeof height == 'number' ? height+'px': height);

        // 高度自适应，并且宽度没写死的情况下，监听屏幕大小改变，动态设置容器高度值
        if(autoHight && /%/.test(width)){
            window.addEventListener("resize", this.setBoxHeight); 
        }

        // 数据绑定
        this.bindData();
        
        //自动切换状态下，鼠标悬停停止切换
        if(autoPlay){
            const dom = this.$refs.box;
            if(dom){
                dom.addEventListener('mouseover', this.mouseover);
                dom.addEventListener('mouseout', this.mouseout);
            }
        }
    },
    destroyed(){
        window.removeEventListener("resize", this.setBoxHeight);
        clearInterval(this.autoPlayInterval);
        clearTimeout(this.timeout);

        if(this.autoPlay){
            const dom = this.$refs.box;
            if(dom){
                dom.addEventListener('mouseover', this.mouseover);
                dom.addEventListener('mouseout', this.mouseout);
            }
        }
    },
    methods: {
        /** 数据绑定*/
        bindData(){
            // 数据处理
            this.formatList();
            // 自动切换处理
            this.$nextTick( ()=>{
                clearInterval(this.autoPlayInterval);
                this.showIndex = 0;
                if(this.autoPlay && this.list.length > 1){
                    this.handleAutoPlay();
                }
            });
        },

        /** 容器高度 */
        setBoxHeight(){
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout( () => {
                const {imgSize} = this;
                const boxWidth = this.$refs.box.clientWidth;
                this.boxHeight = boxWidth / (imgSize[0] / imgSize[1]) + 'px';
            }, 40)
        },

        /**数据处理 */
        formatList(){
            const {lazyLoad, list} = this;
            if(!lazyLoad){
                this.bannerList = list;
            }else{
                list.forEach((item, i) => {
                    let obj = Object.assign({lazySrc: item.src}, item);
                    if(i){
                        delete obj.src;
                    }
                    this.bannerList.push(obj);
                })
            }
        },

        /**选项滑动样式设置 */
        getClass(index){
            let {showIndex, isRight, list} = this;
            if(isRight){
                if(showIndex == index){
                    return 'tl__from_right';
                }
                let left = showIndex - 1;
                if(left < 0){
                    left = list.length - 1;
                }
                if(index == left){
                    return 'tl__to_left';
                }
            }else{
                if(showIndex == index){
                    return 'tl__from_left';
                }
                if(index == showIndex + 1){
                    return 'tl__to_right';
                }
            }
            return 'tl__hidden';
        },

        /**自动切换处理 */
        handleAutoPlay(){
            let {autoPlay, list} = this;
            this.autoPlayInterval = setInterval( ()=> {
                let index = this.showIndex + 1;
                if( index >= list.length){
                    index = 0;
                }
                this.showIndex = index;
                this.isRight = true;
            }, autoPlay === true ? 3000 : autoPlay);
        },

        /**鼠标进入，停止自动切换 */
        mouseover(){
            clearInterval(this.autoPlayInterval);
        },

        /**鼠标移出，开始自动切换 */
        mouseout(){
            this.handleAutoPlay();
        },

        /**左右切换按钮点击处理 */
        go(val){
            let {showIndex, list} = this;
            let index = showIndex + val;
            index = index <= -1 ? list.length -1 : index >= list.length ? 0 : index;
            this.isRight = val > 0;
            this.showIndex = index;
        },
        /**分页器鼠标悬停切换 */
        to(val){
            this.isRight = val > this.showIndex;
            this.showIndex = val;
        }
    }
};
</script>