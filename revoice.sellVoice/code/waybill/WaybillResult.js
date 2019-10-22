var console = require('console')
module.exports.function = function waybill (deliveryDetailResult,courier,waybillNumber) {
  console.log(deliveryDetailResult,courier,waybillNumber)
  return {
    deliveryDetailResult:deliveryDetailResult,
    courier:courier,
    waybillNumber:waybillNumber
  }
}
