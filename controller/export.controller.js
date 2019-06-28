const MongoClient = require('mongodb').MongoClient
const xlsx = require('node-xlsx')
const fs = require('fs')

// get显示主页
exports.getIndex = async (ctx, next) => {
    ctx.render('export.html')
}

// POST导出excel
exports.postToExcel = async (ctx, next) => {
    let url = ctx.request.body.mongodburl
    let mdb = ctx.request.body.db
    let collection = ctx.request.body.collection
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        let dbo = db.db(mdb)
        dbo.collection(collection).find({}).toArray(function (err, result) {
            let data = []
            let h = []
            for (let i in result[0]) {
                h.push(i)
            }
            data.push(h)
            for (let i = 0; i < result.length; i++) {
                let f = []
                for (let j in result[i]) {
                    f.push(result[i][j])
                }
                data.push(f)
            }
            let excel = [{
                name: 'export',
                data: data
            }]
            let buffer = xlsx.build(excel)
            fs.writeFile('./uploads/export/export.xls', buffer, function (err) {
                if (err) {
                    console.log('导出失败')
                }
            })
            db.close()
        })
    })
    ctx.cookies.set('toexcel', true, {
        maxAge: 1000
    })
    ctx.response.redirect('/export')
}