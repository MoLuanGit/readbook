<template>
  <div>
    <headerReturn>找好书</headerReturn>
    <categoryItem :data="nList" :title="'男生'" style="margin-top:0.2rem;" :type="'male'"></categoryItem>
    <categoryItem :data="nvList" :title="'女生'" :type="'female'"></categoryItem>
    <categoryItem :data="cList" :title="'出版'" :type="'press'" style="margin-bottom:0.9rem;"></categoryItem>
    
  </div>
</template>
<script>
import categoryItem from './categoryItem.vue'
import headerReturn from './common/headerReturn.vue';

export default {
  data() {
    return {
      cateList:[],
    };
  },
  computed: {
    nvList(){
      return this.cateList['female']
    },
    nList(){
      return this.cateList['male']
    },
    cList(){
      return this.cateList['press']
    }
  },
  methods: {
    
  },
  created(){
    //获取分类和子分类
    this.$axios.get("/ojbk/cats/lv2/statistics").then((res)=>{
      this.cateList = res.data
    })
  },
  components:{
    categoryItem,
    headerReturn
  }
}
</script>
<style>
.cate-title span{
  display:inline-block;
  vertical-align: middle;
  line-height: 0.4rem;
}
  .cate-title::before{
    display: inline-block;
    content:'';
    width:4px;
    background:green;
    height:0.4rem;
    margin:0rem 0.1rem 0 0.2rem;
    vertical-align: middle;
  }
  .cate-container{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align:center;
    margin-bottom:0.4rem;
  }
  .cate-item{
    width:28%;
    border:1px solid #00c98c;
    border-radius:20%;
    padding:0.1rem;
    margin:0.1rem;
    box-sizing: border-box;
  }
  .cate-name,.cate-num{
    font-size:0.22rem;
    font-weight: 700;
    color:#00c98c;
  }
</style>
