const express = require('express');
const app = express();

const {PORT} = require('./config.json');
const proxy = require("http-proxy-middleware");

const allRouter = require('./api');
app.use(allRouter);

app.use(express.static('./'));

app.use('/ojbk/*', proxy({ 
    target: 'http://api.zhuishushenqi.com',
    changeOrigin: true,
    pathRewrite: {
        '^/ojbk': '/',
    },
}))
app.use('/jb/*', proxy({ 
    target: 'http://chapterup.zhuishushenqi.com',
    changeOrigin: true,
    pathRewrite: {
        '^/jb': '/',
    },
}))

app.listen(PORT,()=>{
    console.log("running ok");
})