var console = require('console')
var detail = require('common/DetailResult')

module.exports.function = function inputCourier (deliveryCheckResult, rootIndex) {
  let detailResult
  if(rootIndex!=undefined){
    detailResult = detail.detailResult(deliveryCheckResult, rootIndex.trim()) 
    console.log(detailResult)
  } 
  return {
      deliveryCheckResult : deliveryCheckResult,
      deliveryDetailResult:detailResult,
      rootIndex:rootIndex
  }
}
