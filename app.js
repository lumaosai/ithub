const express=require('express')
const router=require('./router') 
const bodyParser=require('body-parser')


const app=express()
// 配置模板
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 公开资源
app.use('/public',express.static('./public/'))
app.use('/node_modules',express.static('./node_modules/'))

// 挂载路由
app.use(router)
app.listen(4000,()=>console.log('running...'))