

// 查找
const db=require('../controllers/db-helper')
exports.findAll = callback => {
    const myStr='select * from users'
    db.query(mysql,(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })

}
// 通过email查找
exports.getByEmail=(email,callback)=>{
    const myStr='select * from users where email=?'
    db.query(myStr,[email],(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results[0])
    })
}
// 通过nickname查找
exports.getByNickname=(nickname,callback)=>{
    const myStr='select * from users where nickname=?'
    db.query(myStr,[nickname],(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results[0])
    })
}

// 添加到数据库
exports.create=(user,callback)=>{
    const myStr='insert into users set?'
    db.query(myStr,user,(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results)
    })
}