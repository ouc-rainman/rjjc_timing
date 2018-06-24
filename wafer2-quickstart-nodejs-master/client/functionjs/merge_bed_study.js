var compareArray = require("./compareArray.js")
var merge_bed_study = function (result) {
  var BedTime = result['BedTime']
  var Study = result['Study']
  // console.log(BedTime,Study)
  for(var i = 0; i < BedTime.length; i++){
    BedTime[i]['StartTime'] = BedTime[i]['timestamp']
  }
  BedTime = BedTime.concat(Study)
  BedTime.sort(compareArray.compareArray('StartTime'))
  return BedTime
}

module.exports.merge_bed_study = merge_bed_study