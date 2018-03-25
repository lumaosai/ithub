var mysql = require('mysql');
const moment=require('moment')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'ithub'
});

exports.showSignin=(req,res)=>{
  res.render('siginin')
}

exports.signin=(req,res)=>{
  res.send('signin')
}

exports.showSignup=(req,res)=>{
  res.render('signup.html')
}

exports.signup=(req,res)=>{


  // 获取表单数据
  const body=req.body
    //  console.log(body)
    // 链接数据库
    const mysqlStr='SELECT * FROM `users` WHERE `email`=?'
    connection.query(mysqlStr,[body.email],(err,results)=>{
      if(err){
        return res.send({
          code:500,
          message:err.message
        })
      }
      if(results[0]){
        return res.send({
          code:1,
          message:"邮箱已被占用"
        })
      }
      connection.query('select * from users where nickname =?',[body.nickname],(err,results)=>{
        if(err){
          return res.send({
            code:500,
            message:err.message
          })
        }
        if(results[0]){
          return res.send({
            code:2,
            message:"昵称已被占用"
          })
        }
        body.createdAt=moment().format('YYYY-MM-DD HH:mm:ss')
    // 都没有错把数据添加到数据表中
    connection.query('insert into users set?',body,(err,results)=>{
      if(err){
        return res.send({
          code:500,
          message:err.message
        })
      }
      
        return res.send({
          code:200,
          message:'ok'
        })
    
    })
      })
     
    })
   
   
 
}

exports.signout=(req,res)=>{
  res.send('signout')
}
