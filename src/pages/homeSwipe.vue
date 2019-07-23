<template>
  <!-- 轮播图 -->
  <mt-swipe :auto="4000" style="padding:0px;">
    <mt-swipe-item v-for="(item,idx) in imglist" :key="idx" @click.native="goto(item.link)">
      <img :src="item.img" alt />
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  data() {
    return {
      imglist: []
    };
  },
  created(){
    this.$axios.get("/ojbk/recommendPage/node/spread/575f74f27a4a60dc78a435a3?pl=ios").then((res)=>{
      this.imglist = res.data.data;
    })
  },
  methods:{
    //跳到书的详情页
    goto(link){
      this.$router.push({path:'/books/'+link})
    }
  }

};
</script>
<style>
/* 轮播图 */
.mint-swipe {
  height: 2.25rem;
}
.mint-swipe-item img {
  height: 2.25rem;
  width: 100%;
}
.mint-swipe-indicators {
  bottom: 0rem;
}
.mint-swipe-indicator {
  opacity: 1;
}
.mint-swipe-indicator.is-active {
  background: #f00;
  opacity: 1;
}
</style>
