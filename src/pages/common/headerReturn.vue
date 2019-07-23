<template>
    <header class="header">
        <a href="javascript:history.back(-1);"></a>
        <span><slot></slot></span>   
    </header>
</template>

<script>
export default {
    
}
</script>
<style>
.header{
    position: fixed;
    height: 0.88rem;
    padding:0;
    left: 0;
    top: 0;
    right:0;
    background:#00c98c;
    text-align: center;
    line-height: 0.88rem;
    color:#fff;
    z-index: 999;
}

.header a {
    position:absolute;
    left:0.2rem;
    top:50%;
    transform: translate(0,-50%);
    height: 0.88rem;
    width: 0.6rem;
    background: url(http://m.bookschina.com/Content/images/returnbtnicon.png) no-repeat center;
    background-size: 0.2rem 0.35rem;
}
</style>
