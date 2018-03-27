
const moment=require('moment')
const user=require('../models/user')
const md5=require('md5')
exports.showSignin=(req,res)=>{
  res.render('signin.html')
}

exports.signin=(req,res)=>{
  const body=req.body
  user.getByEmail(body.email,(err,user)=>{
    if(err){
      return res.send({
        code:500,
        message:err.message
      })
    }
    if(!user){
      return res.send({
        code:1,
        message:"用户不存在"
      })
    }
    if(md5(body.password) !== user.password){
      return res.send({
        code:2,
        message:'密码不正确'
      })
    }
    // shi使用session保存会话状态
    req.session.user=user

    res.send({
      code:200,
      message:'登录成功 '
    })
      
   

  })
}

exports.showSignup=(req,res)=>{
 
  res.render('signup.html')
}

exports.signup=(req,res)=>{


  // 获取表单数据
  const body=req.body
    //  console.log(body)
    // 链接数据库
   user.getByEmail(body.email,(err,results)=>{
    if(err){
      return res.send({
        code:500,
        message:err.message
      })
    }
    if(results){
      return res.send({
        code:1,
        message:"邮箱已被占用"
      })
    }

    user.getByNickname(body.nickname,(err,results)=>{
      if(err){
        return res.send({
          code:500,
          message:err.message
        })
      }
      if(results){
        return res.send({
          code:2,
          message:"昵称已被占用"
        })
      }
      body.password=md5(body.password)
      body.createdAt=moment().format('YYYY-MM-DD HH:mm:ss')
      user.create(body,(err,results)=>{
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
  delete req.session.user
  res.redirect('/signin')
}
