<template>
  <div class="home">
    <headerReturn>免费读好书</headerReturn>

    <!-- 轮播图 -->
    <home-swipe></home-swipe>

    <!-- 搜索 -->
    <mt-search v-model="ojbk" placeholder="请输入要搜索的关键字" style="height:9vh;" @keydown.13.native="gotoSearch"></mt-search>

    <!-- 追书热版 -->
    <div class="title" style="text-align:center;border-bottom:1px solid #ccc;line-height:0.8rem;">热榜推荐</div>
    <bookListItem :currentList="currentList"></bookListItem>
    <mt-button size="small" style="margin:0.2rem 0 1.5rem 0;width:100%" @click="more" type="primary">点击加载更多</mt-button>

  </div>
</template>

<script>
import headerReturn from './common/headerReturn.vue';
import homeSwipe from "./homeSwipe.vue";
import bookListItem from './common/bookListItem.vue';

export default {
  data() {
    return {
      ojbk:'',
      hotList:[],
      num:6,
    };
  },
  computed:{
    currentList(){
      return this.hotList.slice(0,this.num)
    }
  },
  created(){
    //追书热版
    this.$axios.get("/ojbk/ranking/54d42d92321052167dfb75e3").then((res)=>{
        this.hotList = res.data.ranking.books.map(item=>{
            item.cover = decodeURIComponent(item.cover.slice(7))
            return item;
        })
    })
  },
  methods:{
    more(){
      this.num = this.num + 6;
    },
    //搜索
    gotoSearch(){
      this.$router.push({name:'SearchList',query:{val:this.ojbk}})
    }
  },
  components: {
    homeSwipe,
    headerReturn,
    bookListItem
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}


.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-container img {
  width: 100%;
}
</style>