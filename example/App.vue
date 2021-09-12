<template>
  <div>
    <tl-banner :list="bannerList" :img-size="[1920, 300]" @changed="changed" @selected="selected"></tl-banner>
  </div>
</template>

<script>
import TlBanner from '../src/index'
export default {
    components:{
      TlBanner
    },
    data(){
        return {
            bannerList: [
                {src: require('.//banner1.jpg')},
                {src: require('./banner2.jpg')},
                {src: require('./banner3.jpg')},
            ]
        }
    },
    methods: {
        changed(index, data){

        },
        selected(item){
            
        }
    }
}
</script>