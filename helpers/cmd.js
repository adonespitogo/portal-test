
const child_process = require('child_process')

module.exports = async (command_str) => {

  command_str = command_str.trim().replace(/  +/g, ' '); // replace all duplicate spaces with single space
  console.log(`cmd: ${command_str}`)

  var args = command_str.split(' ')
  var cmd = args.splice(0, 1)

  return await new Promise((resolve, reject) => {
    var onError =  e => reject(e)

    try {
      var proc = spawn(cmd[0], args)
      proc.on('error', onError)
      proc.on('exit', code => {
        if (code === 0)
          resolve()
        else
          onError(new Error(`${command_str} exited with non-zero code: ${code}`))
      })
    } catch(e) {
      onError(e)
    }
  })

}
