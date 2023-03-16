const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);
const url = args[0];
const file = args[1];

if (fs.existsSync(file)) {
  let rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt(`${file} already exists! Overwrite it? (y/n)?`);
  rl.prompt();
  rl.on('line', (response) => {
    if (response === "n") 
    {
      process.exit();
    }
    rl.close();
    request(url, (error, response, content) => {
      if (error) {
        console.error("Invalid URL!");
        process.exit();
      }
    
      fs.writeFile(file, content, err => {
        if (err) {
          console.error("Invalid Path!");
          process.exit();
        }
    
        fs.stat(file, (err, stats) => {
          if (err) {
            console.error(err);
            process.exit();
          }
    
          stats.size;
          console.log(`Downloaded and saved ${stats.size} bytes to ${file}`);
        });
      });
    });
  });
}


