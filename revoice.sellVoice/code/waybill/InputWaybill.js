var console = require('console')
module.exports.function = function inputWaybill (deliveryDetailResult, waybillNumber, hanjin) {
  console.log(deliveryDetailResult,waybillNumber,hanjin)
  return {
    deliveryDetailResult:deliveryDetailResult,
    waybillNumber:waybillNumber,
    hanjin:hanjin
  }
}
