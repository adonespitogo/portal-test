
var StressTest = require('./StressTest.js')

var server_host = 'localhost:3000'

var test = new StressTest(server_host)

test.start()
  .then(() => {
    console.log('done!')
  })
  .catch(e => {
    console.log(e)
  })
  .finally(() => {
    return test.close()
  })
