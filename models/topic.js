const db=require('../controllers/db-helper')
// 获取所有话题列表
exports.findAll = callback =>{
    const mysql='select * from topics'
    db.query(mysql,(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })
}
// 插入一个话题
exports.create =(topic,callback) =>{
    const mysql='insert into topics set ?'
    db.query(mysql,topic,(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })
}
// 根据话题id更新内容
exports.updateById =(topic, callback) =>{
    const mysql='update topics set title=?,content=? where id=?'
    db.query(mysql,
        [
            topic.title,
            topic.content,
            topic.id
        ],
        (err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })
}
// 删除话题
exports.deleteById = (id,callback) =>{
    const mysql='delete from topics where id=?'
    db.query(mysql,[id],(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })
}