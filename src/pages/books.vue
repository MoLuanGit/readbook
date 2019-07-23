<template>
  <div>
    <headerReturn>读书使我快乐</headerReturn>

    <!-- //书信息 -->
    <div style="padding:0.2rem;display:flex;">
      <img :src="currentBook.cover" style="width:1.1rem;margin-right:0.2rem;" />
      <div>
        <h5>{{currentBook.title}}</h5>
        <div style="font-size:0.22rem;line-height:0.6rem;color:#666;">
          <span>{{currentBook.author}}</span>
          <span class="cat">{{currentBook.cat}}</span>
          <span>{{currentBook.wordCount>10000?Math.floor(currentBook.wordCount/10000)+"万字":currentBook.wordCount+"字"}}</span>
        </div>
        <div style="font-size:0.22rem;line-height:0.24rem;color:#666;">
          <span style="margin-right:0.1rem;">{{currentBook.isSerial?'连载中':'完结'}}</span>
          <span>{{currentBook.minorCateV2}}</span>
        </div>
      </div>
    </div>

    <!-- 两按钮 -->
    <div class="btn">
      <mt-button size="small" style="background:#fff;border:1px solid #00c98c;color:#00c98c;">加入书架</mt-button>
      <mt-button size="small" style="background:#00c98c;color:#fff;">立即阅读</mt-button>
    </div>

    <!-- 书籍状态 -->
    <div class="info1">
      <div>
        <p>追人气</p>
        <p>{{currentBook.latelyFollower>10000?Math.floor(currentBook.latelyFollower/10000)+"万":currentBook.latelyFollower}}</p>
      </div>
      <div>
        <p>读者留存率</p>
        <p>{{currentBook.retentionRatio}}</p>
      </div>
      <div>
        <p>日更新字数/天</p>
        <p>{{currentBook.serializeWordCount>1000?Math.floor(currentBook.serializeWordCount/1000)+"k":currentBook.serializeWordCount}}</p>
      </div>
    </div>

    <!-- 书介绍 -->
    <div
      style="padding:0.2rem;color:#666;font-size:0.22rem;text-indent:0.4rem;"
    >{{currentBook.longIntro}}</div>

    <div
      style="display:flex;justify-content:space-around;border-top:1px solid #666;border-bottom:1px solid #666;line-height:0.8rem;"
      @click="gotoChapter"
    >
      <span>目录</span>
      <span style="font-size:0.22rem;color:#666;">{{this.currentBook.updated | dated}}</span>
      <span style="font-size:0.22rem;color:#666;">{{currentBook.lastChapter}}</span>
    </div>

    <!-- 热评 -->
    <div class="hotP">
      <p>热评</p>
      <ul
        style="height:8rem;overflow:auto;max-width:100%;overflow-x:hidden;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li
          v-for="item in hotComment"
          :key="item._id"
          style="display:flex;margin:0.2rem 0;border-bottom:1px solid #666;"
        >
          <img :src="item.author.avatar" alt style="width:0.5rem;height:0.5rem;" />
          <div style="flex:1;margin-left:0.2rem;font-size:0.22rem;">
            <div style="display:flex;justify-content:space-between;color:#666;">
              <span>{{item.author.nickname}}</span>
              <span>{{item.created | dated}}</span>
            </div>
            <p
              style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:0.6rem;"
            >{{item.title}}</p>
            <p style="color:#666;margin-bottom:0.2rem;">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 同类推荐 -->
    <div style="margin-bottom:1rem;border-top:1px solid #666;padding-top:0.1rem;">
      <div style="font-size:0.28rem;line-height:0.5rem;padding-left:0.3rem;border-left:3px solid #195;margin-bottom:0.1rem;">      
        <span>同类推荐</span>
        <span style="float:right;margin-right:0.6rem;color:#195;" @click="gotoCate">更多</span>
      </div>
      <div style="display:flex;justify-content:space-around;flex-wrap:wrap;width:100vw;">
        <figure v-for="item in tuiList" :key="item._id" style="width:26%;"  @click="goto(item._id)">
          <img :src="item.cover" alt="" style="width:100%;">
          <figcaption style="text-align:center;line-height:0.6rem;color:#666;font-size:0.24rem;">{{item.title}}</figcaption>
        </figure>
      </div>
      
    </div>
  </div>
</template>
<script>
import headerReturn from "./common/headerReturn.vue";
import bookListItem from "./common/bookListItem.vue";
export default {
  data() {
    return {
      currentBook: {},
      hotComment: [],
      tuiList:[],
      limitNum: 10
    };
  },
  computed: {
    
  },
  //格式化时间的过滤器
  filters: {
    dated: function(value) {
      if (!value) return "";
      return (
        value
          .split("")
          .slice(0, 10)
          .join("") +
        "  " +
        value
          .split("")
          .slice(11, 16)
          .join("")
      );
    }
  },
  created() {
   
    new Promise((resolve,reject)=>{
       //书
      this.$axios.get("/ojbk/book/" + this.$route.params.id).then(res => {
        this.currentBook = res.data;
        this.currentBook.cover = decodeURIComponent(
          this.currentBook.cover.slice(7)
        );
        resolve();
      });
    }).then(()=>{
      //同类推荐
      this.$axios.get("/ojbk/book/by-categories?gender="+this.currentBook.gender[0]+"&type=hot&major="+this.currentBook.majorCate+"&minor="+this.currentBook.minorCate+"&start=0&limit=7").then((res)=>{           
          this.tuiList = res.data.books.map(item=>{
              item.cover = decodeURIComponent(item.cover.slice(7))
              return item;
          });
          this.tuiList = this.tuiList.filter(item=>item._id != this.$route.params.id).slice(0,6);
      })
    })

    //书评
    this.$axios
      .get(
        "/ojbk/post/review/best-by-book?book=" +
          this.$route.params.id +
          "&limit=" +
          this.limitNum
      )
      .then(res => {
        this.hotComment = res.data.reviews.map(item => {
          item.author.avatar =
            "http://statics.zhuishushenqi.com" + item.author.avatar;
          return item;
        });
      });
      
      
  },
  methods: {
    //加载更多评论
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.limitNum = this.limitNum + 10;
        this.$axios
          .get(
            "/ojbk/post/review/best-by-book?book=" +
              this.$route.params.id +
              "&limit=" +
              this.limitNum
          )
          .then(res => {
            this.hotComment = res.data.reviews.map(item => {
              item.author.avatar =
                "http://statics.zhuishushenqi.com" + item.author.avatar;
              return item;
            });
          });
        this.loading = false;
      }, 1000);
    },
    goto(id){
      this.$router.push({path:'/books/'+id})
      window.location.reload();
    },
    gotoCate(){
      this.$router.push({path:'/cateListBook',query:{
        name:this.currentBook.majorCate,
        gender:this.currentBook.gender[0]
      }})
    },
    gotoChapter(){
      this.$router.push({path:'/chapter',query:{
        id:this.currentBook._id,
        name:this.currentBook.title
      }})
    }
  },
  components: {
    headerReturn,
    bookListItem
  }
};
</script>
<style>
.cat {
  padding: 0 0.1rem;
  margin: 0 0.1rem;
  border-right: 1px solid #666;
  border-left: 1px solid #666;
}
.btn {
  display: flex;
  justify-content: space-around;
  padding: 0.1rem 0 0.3rem 0;
}
.info1 {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.info1 :nth-child(1) {
  color: #666;
}
.hotP {
  padding: 0.2rem;
  box-sizing: border-box;
}
.hotP > p {
  line-height: 0.5rem;
}
.hotP ul li:nth-last-child(1){
  border-bottom:none;
}
</style>
