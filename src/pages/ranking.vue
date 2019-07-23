<template>
    <div>
        <headerReturn>排行榜</headerReturn>
        <mt-navbar v-model="selected">
            <mt-tab-item id="male">男生版</mt-tab-item>
            <mt-tab-item id="female">女生版</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" style="position:absolute;top:1.9rem;left:0;bottom:0.8rem;overflow: auto;">
            <mt-tab-container-item id="male">
                <mt-cell :class="{active:item.totalRank==maleTemp}" v-for="item in maleList" :title="item.shortTitle" :key="item._id" style="width:1.3rem;" @click.native="changeList(item.totalRank)"/>               
            </mt-tab-container-item>
            <mt-tab-container-item id="female">
                <mt-cell :class="{active:item.totalRank==femaleTemp}" v-for="item in femaleList" :title="item.shortTitle" :key="item._id" style="width:1.3rem;" @click.native="changeList(item.totalRank)"/>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="list">
            <bookListItem :currentList="currentList"></bookListItem>
        </div>
    </div>
</template>
<script>
import headerReturn from './common/headerReturn.vue'
import bookListItem from './common/bookListItem.vue'
export default {
    data(){
        return {
            maleList:[],
            femaleList:[],
            //默认男生榜
            selected:'male',
            //当前显示的列表
            currentList:[],
            //默认书单
            maleTemp:'564d8494fe996c25652644d2',
            femaleTemp:'564d85b6dd2bd1ec660ea8e2',
        }
    },
    created(){
        //榜单
        this.$axios.get("/ojbk/ranking/gender").then((res)=>{         
            this.maleList = res.data.male.filter(item=>{
                return item.hasOwnProperty('totalRank')
            })
            this.femaleList = res.data.female.filter(item=>{
                return item.hasOwnProperty('totalRank')
            })
            console.log(res)
        })

        //默认
        this.$axios.get("/ojbk/ranking/"+this.maleTemp).then((res)=>{      
            this.currentList = res.data.ranking.books.map(item=>{
                item.cover = decodeURIComponent(item.cover.slice(7))
                return item;
            });
        })
    },
    watch:{
        selected:function(val, oldVal) {
            clearTimeout(timer)
            let timer = setTimeout(()=>{
                let v = val=='male'?'564d8494fe996c25652644d2':'564d85b6dd2bd1ec660ea8e2';
                this.$axios.get("/ojbk/ranking/"+v).then((res)=>{      
                    this.currentList = res.data.ranking.books.map(item=>{
                        item.cover = decodeURIComponent(item.cover.slice(7))
                        return item;
                    });
                })
            },100)
        },
    },
    methods:{
        //切换列表
        changeList(id){
            this.selected=='male'?this.maleTemp=id:this.femaleTemp=id;
            clearTimeout(timer)
            let timer = setTimeout(()=>{
                this.$axios.get("/ojbk/ranking/"+id).then((res)=>{      
                    this.currentList = res.data.ranking.books.map(item=>{
                        item.cover = decodeURIComponent(item.cover.slice(7))
                        return item;
                    });
                })
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
.mint-navbar .mint-tab-item .mint-tab-item-label{
    font-size:0.5rem !important;
}
.is-selected{
    border:none !important;
}
.list{
    position:absolute;
    top:1.9rem;
    left:1.4rem;
    right:0rem;
    bottom:0.8rem;
    overflow: auto;
}
.active{
    color:blue;
}
</style>
