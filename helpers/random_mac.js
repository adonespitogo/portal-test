
const randomstring = require('randomstring')

module.exports = () => {
  var mac = []
  for (var i = 0; i < 6; i++) {
    mac.push(randomstring.generate({length: 2, charset: 'hex'}))
  }
  return mac.join(':')
}
