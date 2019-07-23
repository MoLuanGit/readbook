import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../pages/home.vue'
import Ranking from '../pages/ranking.vue'
import Category from '../pages/category.vue'
import CateListBook from '../pages/cateListBook.vue'
import SearchList from '../pages/searchList.vue'
import Bookrack from '../pages/cart.vue'
import Books from '../pages/books.vue'
import Chapter from '../pages/chapter.vue'
import ChapterContent from '../pages/chapterContent.vue'
import store from '../vuex'

let router = new VueRouter({
    routes:[
        {
            name:'Home',
            path:'/home',
            // component:Home
            components:{
                default:Home,
            }
        },
        {
            name:'Category',
            path:'/category',
            component:Category,
        },
        {
            name:'CateListBook',
            path:'/cateListBook',
            component:CateListBook,
        },
        {
            name:'Bookrack',
            path:'/bookrack',
            component:Bookrack,
        },
        {
            name:'Ranking',
            path:'/ranking',
            component:Ranking,
        },
        {
            name:'Books',
            path:'/books/:id',
            component:Books
        },
        {
            name:'SearchList',
            path:'/searchList',
            component:SearchList
        },
        {
            name:'ChapterContent',
            path:'/chapterContent',
            component:ChapterContent
        },
        {
            name:'Chapter',
            path:'/chapter',
            component:Chapter
        },
        {
            path:'/',
            redirect:{name:'Home'}
        }
        
    ],
    scrollBehavior (to, from, savedPosition) {    
        if(savedPosition) {
            setTimeout(() => {
                window.scrollTo(savedPosition.x, savedPosition.y)
            }, 200)
        }      
    }
})
router.beforeEach((to, from, next) => { 
    
    //显示隐藏菜单
    if(to.matched[0].path == "/chapterContent"){
      store.commit('changeMenuShow',false)
    }else{
        store.commit('changeMenuShow',true)
    }
    next();
    
})

export default router;