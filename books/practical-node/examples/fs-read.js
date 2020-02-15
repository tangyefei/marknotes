const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, 
  '/data.txt'), 
  {encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(data)
  }
})