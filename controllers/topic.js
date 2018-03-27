const topic=require('../models/topic')
const moment=require('moment')
exports.showCreate=(req,res)=>{
  res.render('topic/create.html',{
    user:req.session.user
  })
}

exports.create=(req,res)=>{
  const body=req.body
  body.userId=req.session.user.id
  body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss') // 话题的创建时间
  console.log(body)
  topic.create(body,(err,results)=>{
    if(err){
      return res.send({
        code:500,
        message:err.message
      })
    }
    res.send({
      code:200,
      message:'创建话题成功了'
    })
  })
}

exports.show=(req,res)=>{
  res.render('topic/show.html')
}

exports.showEdit=(req,res)=>{
  res.send('showEdit')
}

exports.edit=(req,res)=>{
  res.send('edit')
}

exports.delete=(req,res)=>{
  res.send('delete')
}
