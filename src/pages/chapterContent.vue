<template>
    <div>
        <headerReturn style="opacity:0.8;" v-show="show">{{this.$route.query.name}}</headerReturn>
        <!-- //内容 -->
        <div class="content" ref="cont">
            <p v-for="(item,idx) in contentList" :key="idx" style="text-indent:0.4rem;line-height:0.3rem;margin:0.2rem 0;font-size:0.25rem;">{{item}}。</p>
        </div>
        <div class="bottom" v-show="show">
            <ul style="display:flex;justify-content:space-around;">
                <li style="width:0.4rem;height:0.4rem;background:#f00;border-radius:50%;"></li>
                <li style="width:0.4rem;height:0.4rem;background:#0ff;border-radius:50%;"></li>
                <li style="width:0.4rem;height:0.4rem;background:#fff;border-radius:50%;"></li>
                <li style="width:0.4rem;height:0.4rem;background:#f0f;border-radius:50%;"></li>
                <li style="width:0.4rem;height:0.4rem;background:#ff0;border-radius:50%;"></li>
            </ul>
            <div style="display:flex;justify-content:space-around;color:#fff;line-height:0.6rem;margin-top:0.2rem;">
                <mt-button size="small">A-</mt-button>
                <mt-button size="small">A+</mt-button>
            </div>

            <div style="display:flex;justify-content:space-around;color:#fff;line-height:0.6rem;margin-top:0.2rem;">
                <mt-button size="small">上一章</mt-button>
                <span>目录</span>
                <mt-button size="small">下一章</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import headerReturn from "./common/headerReturn.vue";
import axios from 'axios'
export default {
    data(){
        return {
            contentList:[],
            show:true,
        }
    },
    created(){
        axios.get(
            //获取章节内容
            "/jb/chapter/" +
            this.$route.query.link
        )
        .then(res => {          
            this.contentList = res.data.chapter.cpContent.split('。');
            console.log(res)
        });

        window.addEventListener('click',()=>{
            this.show = !this.show
            if(!this.show){
                this.$refs.cont.style.marginTop = '-0.9rem';
            }
        })
    },
    methods:{
        
    },
    components:{
        headerReturn
    }
}
</script>
<style>
.bottom{
    position:fixed;
    bottom:0;
    height:2rem;
    z-index:100;
    left:0;
    right:0;
    background-color:rgba(0,0,0,.7);
}
.content{
    padding:0.2rem;
    background:#c4b395;
}
</style>

