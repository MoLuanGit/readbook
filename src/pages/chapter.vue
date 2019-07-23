<template>
    <div>
        <headerReturn>{{name}}</headerReturn>
        <div style="padding:0.1rem 0.2rem;color:#00c98c;">
            <span>{{'共'+chapters.length+'章'}}</span>
            <span style="float:right;" @click="toSort">{{sort}}</span>
        </div>
        <ul style="max-height:8.7rem;overflow:auto;">
            <li @click="gotoContent(item.link)" v-for="item in chapters" :key="item.title" style="border-bottom:1px solid #666;line-height:0.7rem;color:#666;font-size:0.22rem;">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>
<script>
import headerReturn from "./common/headerReturn.vue";
import { Promise } from 'q';
export default {
    data(){
        return {
            chapters:[],
            name:'',
            sort:'倒序',
        }
    },
    created(){
        this.name = this.$route.query.name
        

        new Promise((resolve,reject)=>{
            //先得到书的源id
            this.$axios
            .get(
                "/ojbk/btoc?view=summary&book=" +
                this.$route.query.id
            )
            .then(res => {
                console.log('源id',res.data[0]._id)
                resolve(res.data[0]._id)
            });
        }).then((res)=>{
            //根据源id获取书章节
            this.$axios
            .get(
                "/ojbk/atoc/"+res+"?view=chapters"
            )
            .then(res => {
                this.chapters = res.data.chapters;
            });
        })
    },
    methods:{
        toSort(){
            if(this.sort == "倒序"){
                
                this.chapters = this.chapters.reverse()
                this.sort = "正序"
                console.log('正',this.chapters)
            }else{
                this.chapters = this.chapters.reverse()
                this.sort = "倒序"
                console.log('到',this.chapters)

            }
        },
        gotoContent(link){
            this.$router.push({path:'/chapterContent',query:{
                link,
                name:this.name
            }})
        }
    },
    components:{
        headerReturn
    }
}
</script>
