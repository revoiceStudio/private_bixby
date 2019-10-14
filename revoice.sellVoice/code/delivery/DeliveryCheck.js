var console = require('console')
var http = require('http')
var config = require('config')
var orderURL = config.get('order')
var findKey = require('API/FindAPIkey')
var getList = require('common/GetCheckList')

module.exports.function = function deliveryCheck ($vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  console.log(findResult)

  if(findResult == null || findResult ==[] || findResult.length==0){
    console.log("apikey 없음")
    return 0
  }
  const getListResult = getList.getCheckList(orderURL, findResult[0].apikey) 
  return getListResult  
}