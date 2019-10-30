
module.exports.function = function call (deliveryCheckResult, rootIndex) {

for(let i=0; i<deliveryCheckResult.length; i++){
  let consumerPhoneNumber = ""
  if(deliveryCheckResult[i].rootIndex == rootIndex.trim()){
    consumerPhoneNumber = deliveryCheckResult[i].consumerPhoneNumber.trim()
    break
  }
}
  return {consumerPhoneNumber:consumerPhoneNumber}
}
