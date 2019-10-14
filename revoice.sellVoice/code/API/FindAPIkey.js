var console = require('console')
var http = require('http')
var config = require('config')
var apikeyFindURL = config.get('apikey.find')

findAPIkey = function($vivContext) { 

  let options = {
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'id': $vivContext.userId
    }
  }
  const findResult = http.getUrl(apikeyFindURL, options)   

  console.log("findResult : ", findResult)
  return findResult
}
module.exports.findAPIkey = findAPIkey