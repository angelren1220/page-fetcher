const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const file = args[1];

request(url, (error, response, content) => {
  if (error) {
    console.error(error);
  }

  fs.writeFile(file, content, err => {
    if (err) {
      console.error(err);
    } 

    fs.stat(file, (err, stats) => {
      if (err) {
        console.error(err);
      }
      
      stats.size;
      console.log(`Downloaded and saved ${stats.size} bytes to ${file}`);
    });
  });
});


