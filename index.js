const fs = require('fs')
const readCow = (callback) => {
  fs.readFile('cow.txt', 'utf8', callback)
}
module.exports = {
  readCow
}
