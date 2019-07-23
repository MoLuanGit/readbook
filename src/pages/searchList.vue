<template>
    <div>
        <headerReturn>搜好书</headerReturn>
        <!-- 搜索 -->
        <mt-search v-model="ojbk" placeholder="请输入要搜索的关键字" style="height:9vh;" @keydown.13.native="gotoSearch"></mt-search>

        <bookListItem :currentList="currentList" style="margin-bottom:1.2rem;" v-if="currentList.length>0"></bookListItem>
        <div style="text-align:center;" v-else>没有该类型的数据</div>
    </div>
</template>
<script>
import headerReturn from './common/headerReturn.vue'
import bookListItem from './common/bookListItem.vue'
export default {
    data(){
        return {
            currentList:[],
            ojbk:'',
        }
    },
    created(){
         this.$axios.get("/ojbk/book/fuzzy-search?query="+this.$route.query.val).then((res)=>{         
            this.currentList = res.data.books.map(item=>{
                item.cover = decodeURIComponent(item.cover.slice(7))
                return item;
            });
        })
    },
    methods:{
        gotoSearch(){
            this.$axios.get("/ojbk/book/fuzzy-search?query="+this.ojbk).then((res)=>{             
                this.currentList = res.data.books.map(item=>{
                    item.cover = decodeURIComponent(item.cover.slice(7))
                    return item;
                });
            })
        }
    },
    components:{
        bookListItem,
        headerReturn
    }
}
</script>