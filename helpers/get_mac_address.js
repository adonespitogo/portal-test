
var macaddress = require('macaddress');

module.exports = async () => {
  var mac = await macaddress.one()
  return mac
    .replace(/\:/g, '')
    .match(/.{1,2}/g)
    .join(':')
    .toUpperCase()
}
