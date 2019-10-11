var console = require('console')
var http = require('http')
var config = require('config')
var apikeyCheckURL = config.get('apikey.check')

module.exports.function = function checkAPIkey (apikey, $vivContext) { 

  let options = {
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'id': $vivContext.userId,
      'apikey':apikey
    }
  }
  
  console.log("API 키 : ", apikey)
  console.log("고유 식별자 : " , $vivContext.userId)

  let apikeyCheck = http.getUrl(apikeyCheckURL, options)   
  if(apikeyCheck==-200){
    return {checkAPIkey: 'false'}
  }else{
    return {checkAPIkey: 'true'}
  }
}
