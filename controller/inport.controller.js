const xlsx = require('node-xlsx')
const fs = require('fs')
const tool = require('../service/tool.service')

// GET显示主页
exports.getIndex = async (ctx, next) => {
    let data = await fs.readFileSync('./uploads/inport/inport.json')
    let json = JSON.parse(data)
    let th = json[0]
    let tb = new Array
    for (let i = 1; i < json.length; i++) {
        tb.push(json[i])
    }
    let succeed = ctx.cookies.get('todbs')
    ctx.render('import.html', {
        th,
        tb,
        succeed
    })
}
// POST上传excel
exports.postUpExcel = async (ctx, next) => {
    if (ctx.req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && ctx.req.file.mimetype !== 'application/vnd.ms-excel') {
        ctx.render('error.html', {
            errorinfo: '只能上传excel文件'
        })
    } else {
        let excel = xlsx.parse('./' + ctx.req.file.destination + '/' + ctx.req.file.filename);
        let exceldata = excel[0].data
        let json = JSON.stringify(exceldata)
        fs.writeFile('./uploads/inport/inport.json', json, function (err) {
            if (err) {
                console.log('存储失败')
            }
        })
        ctx.response.redirect('/import')
    }
}

// POST导入mongodb
exports.postToMongodb = async (ctx, next) => {
    let url = ctx.request.body.mongodburl
    let collection = ctx.request.body.collection
    let json = await fs.readFileSync('./uploads/inport/inport.json')
    let exceldata = JSON.parse(json)
    let data = new Array
    for (let i = 1; i < exceldata.length; i++) {
        let obj = {}
        for (let j = 0; j < exceldata[0].length; j++) {
            obj[exceldata[0][j]] = exceldata[i][j]
        }
        data.push(obj)
    }
    tool.InportDB(url, collection, data)
    ctx.cookies.set('todbs', true, {
        maxAge: 1000
    })
    ctx.response.redirect('/import');
}