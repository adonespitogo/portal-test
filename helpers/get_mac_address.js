
var macaddress = require('macaddress');

module.exports = async () => {
  return await macaddress.one().toUpperCase()
}
