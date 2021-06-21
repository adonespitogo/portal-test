
var macaddress = require('macaddress');

module.exports = async () => {
  var mac = await macaddress.one()
  return mac.toUpperCase()
}
