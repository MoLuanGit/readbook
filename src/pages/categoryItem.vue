<template>
    <div>
        <p class="cate-title"><span>{{title}}</span></p>
        <div class="cate-container">
            <div class="cate-item" v-for="item in data" :key="item.name" @click="gotoList(item.name)">
                <p class="cate-name">{{item.name}}</p>
                <P class="cate-num">{{item.bookCount}}本</P>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:[Object,Array],
        },
        title:{
            type:String
        },
        type:{
          type:String
        }
    },
    methods:{
      gotoList(name){
        this.$router.push({path:'/cateListBook',query:{
          name,
          gender:this.type
        }})
      }
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
