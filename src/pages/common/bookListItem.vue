<template>
<!-- 小说列表 -->
  <ul>
    <li v-for="item in currentList" :key="item._id" style="border-bottom:1px solid #ccc;" @click="goto(item._id)">
      <figure class="list-item">
        <img alt style="width:1rem;height:2rem;" v-lazy="item.cover" />
        <figcaption class="book-info">
          <h6>{{item.title}}</h6>
          <p style="font-size:0.22rem;line-height:0.4rem;">
            <span style="color:#ccc;">{{item.author}}</span>
            <span style="color:#00c98c;float:right;max-width:30%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">{{item.retentionRatio}}%读者存留</span>
          </p>
          <p>{{item.shortIntro}}</p>
        </figcaption>
        <figcaption class="right">
          <p>{{item.isSerial?'连载中':'完结'}}</p>
          <p v-if="item.minorCate && item.minorCate != ''">{{item.minorCate}}</p>
          <p>{{item.majorCate || item.cat}}</p>
          <p>
            <span>{{item.latelyFollower<1000?item.latelyFollower:Math.floor(item.latelyFollower/1000)+'k'}}</span>人气
          </p>
        </figcaption>
      </figure>
    </li>
    <!-- <li v-if="currentList.length==0" style="text-align:center;line-height:0.9rem;">暂时没有该类别的书</li> -->
  </ul>
</template>

<script>
export default {
  props: ['currentList'],
  data() {
    return {
      tempList:[],
    };
  },
  created(){
    
  },
  methods:{
    goto(id){
      this.$router.push({path:'/books/'+id})
    }
  }
};
</script>
<style scoped>

.list-item{
    display:flex;
    padding:0.2rem;
}
.list-item :nth-child(2){
    flex:5;
}
.book-info{
    padding: 0.1rem;
}
.book-info p:nth-last-child(1){
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height:0.45rem;
    font-size: 0.22rem;
}

.list-item .right{
    flex:2;
}
.list-item .right p{
    margin:0.1rem 0.1rem 0.1rem 0;
    border:1px solid #00c98c;
    text-align:center;
    border-radius:5px;
}
.list-item .right p:nth-child(2n-1){
    color:#00c98c;
}
.list-item .right p:nth-last-child(1) span{
    color:red;
}
.right p{
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
}
</style>
