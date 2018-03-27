const express=require('express')
const router=require('./router') 
const bodyParser=require('body-parser')
const session=require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'ithub'
  }
   
  const sessionStore = new MySQLStore(options)
  
const app=express()

  
// 配置session
app.use(session({
    key: 'session_cookie_name',
    secret: 'keyboard cat', // 加密规则私钥，用来保证不同的丰巢快递柜的密码规则都是不一样的，
    resave: false,
    saveUninitialized: true ,// 是否在初始化的时候就给客户端发送一个 Cookie
    store: sessionStore // 将 Session 数据存储到数据库中（默认是内存存储）
  }))
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