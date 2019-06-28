const multer = require('koa-multer')
const mongoose = require('mongoose')

// 导入上传
exports.Inport = multer({
    storage: multer.diskStorage({
        destination: 'uploads/inport',
        async filename(ctx, file, cb) {
            const filenameArr = file.originalname.split('.')
            cb(null, 'inport.' + filenameArr[filenameArr.length - 1])
        }
    })
})

// 导入到数据库
exports.InportDB = function (url, collection, data) {
    const conn = mongoose.createConnection(url, {
        useNewUrlParser: true,
        autoIndex: false
    })
    const col = conn.collection(collection);
    for (let i = 0; i < data.length; i++) {
        col.save(data[i])
    }
}

// 数据库导出
exports.ExportDB = function (url, collection) {
    const conn = mongoose.createConnection(url, {
        useNewUrlParser: true,
        autoIndex: false
    })
    conn.collection(collection).find().toArray(function (err, res) {
        return res
    })
}