let router = require('koa-router')()
let index = require('../controller/index.controller')
let inport = require('../controller/inport.controller')
let Export = require('../controller/export.controller')
let tool = require('../service/tool.service')
// 主页路由
router.get('/', index.getIndex)
// 导入路由
router.get('/import', inport.getIndex)
router.post('/import/upexcel', tool.Inport.single('import'), inport.postUpExcel)
router.post('/import/tomongodb', inport.postToMongodb)
// 导出路由
router.get('/export', Export.getIndex)
router.post('/export/toexcel', Export.postToExcel)


module.exports = router