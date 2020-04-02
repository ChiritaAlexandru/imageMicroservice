const fs = require('fs');

let directory = 'resized-images';
let dirBuf = Buffer.from(directory);
 // let files = fs.readdirSync(directory);
 // console.log(files);

fs.readdir(dirBuf, (err, files) => {
  if ( err ) {
    console.log(err.message);
  } else {
    console.log(files);
    fs.statSync('resized-images/big_poz.jpg', (er, stats)  => {
      if ( er ) {
        throw  er;
      } else {
        console.dir(stats.valueOf());
      }
    });
  }
});


