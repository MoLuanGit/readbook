<template>
    <div>
        <headerReturn></headerReturn>
        <div class="cate-type">
            <span v-for="(item,key,idx) in cateType" :key="idx" @click="changeType(key)" :class="{blueColor:key==type}">{{item}}</span>
        </div>
        <div class="cate-type">
            <span v-for="(item,key,idx) in mins" :key="idx" @click="changeMinor(item)" :class="{blueColor:item==minor}">{{item}}</span>
        </div>
        <bookListItem :currentList="currentList" style="margin-bottom:1.2rem;"></bookListItem>
    </div>
</template>
<script>
import headerReturn from './common/headerReturn.vue'
import bookListItem from './common/bookListItem.vue'
import { setTimeout } from 'timers';

export default {
    data(){
        return {
            cateType:{hot:"热门",new:"新书",reputation:"好评",over:"完结",monthly:"包月"},
            type:'hot',
            minor:'全部',
            //当前小说列表
            currentList:[],
            //总分类
            gender:'',
            //大分类
            name:'',
            //子分类列表
            mins:[],
        }
    },
    computed:{

    },
    created(){
        this.gender = this.$route.query.gender;
        this.name = this.$route.query.name;
        this.minor = this.minor=='全部'?'':this.minor

        //请求默认的分类
        this.$axios.get("/ojbk/book/by-categories?gender="+this.gender+"&type="+this.type+"&major="+this.name+"&minor="+this.minor+"&start=0&limit=20").then((res)=>{
            this.currentList = res.data.books.map(item=>{
                item.cover = decodeURIComponent(item.cover.slice(7))
                return item;
            });
        })
        this.minor = this.minor==''?'全部':this.minor
        //获取小分类
        this.$axios.get("/ojbk/cats/lv2").then((res)=>{
            let temp = res.data[this.gender].filter(item=>item.major==this.name)
            this.mins = ['全部',...temp[0].mins.slice(0,3)]
        })
    },
    methods:{
        changeType(type){
            this.type = type;
            clearTimeout(timer)
            let timer = setTimeout(()=>{
                //切换分类，重新发请求
                this.minor = this.minor=='全部'?'':this.minor
                this.$axios.get("/ojbk/book/by-categories?gender="+this.gender+"&type="+this.type+"&major="+this.name+"&minor="+this.minor+"&start=0&limit=20").then((res)=>{           
                    this.currentList = res.data.books.map(item=>{
                        item.cover = decodeURIComponent(item.cover.slice(7))
                        return item;
                    });
                })
                this.minor = this.minor==''?'全部':this.minor
            },100)
            
        },
        changeMinor(minor){
            this.minor = minor;
            clearTimeout(timer)
            let timer = setTimeout(()=>{
                //切换小分类，重新发请求
                this.minor = this.minor=='全部'?'':this.minor
                this.$axios.get("/ojbk/book/by-categories?gender="+this.gender+"&type="+this.type+"&major="+this.name+"&minor="+this.minor+"&start=0&limit=20").then((res)=>{           
                    this.currentList = res.data.books.map(item=>{
                        item.cover = decodeURIComponent(item.cover.slice(7))
                        return item;
                    });
                })
                this.minor = this.minor==''?'全部':this.minor
            },100)
        }
    },
    components:{
        headerReturn,
        bookListItem
    }
}
</script>
<style>
.cate-type{
    display:flex;
    justify-content: space-around;
    border-bottom:1px solid #ccc;
}
.cate-type span{
    flex:1;
    text-align: center;
    line-height: 0.8rem;
}
.blueColor{
    color:blue;
}

</style>
