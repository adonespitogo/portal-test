
var random_mac = require('./random_mac.js')
var macaddress = require('macaddress');
var cmd  = require('./cmd.js')

if (process.env.NODE_ENV != 'production')
  cmd = async (command_str) => console.log(command_str)

module.exports = async () => {
  var ifaces = macaddress.networkInterfaces()
  for (i in ifaces) {
    if (ifaces.hasOwnProperty(i)) {
      var new_mac = random_mac()
      await cmd(`ip link set dev ${i} down`)
      await cmd(`ip link set dev ${i} address ${new_mac}`)
      await cmd(`ip link set dev ${i} up`)
    }
  }
}
