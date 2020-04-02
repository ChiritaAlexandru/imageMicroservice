
const fs = require('fs');
const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const resizer = require('node-image-resizer');

const app = express();
app.use(cors({ origin: '*' }));
app.use( bodyParser.json() );

var  collectionImage = [];
var  collectionImageResized = [];

var imageWidth, imageHeight;

const setup = {
  all: {
    path: './resized-images/',
    quality: 80
  },
  versions: [{
    prefix: 'resized_',
    width: imageWidth,
    height: imageHeight
  }]
};


app.use( '/imagesResized',(req, res, next) => {
  let directory = './backend/resized-images';
  let dirBuf = Buffer.from(directory);
  // let files = fs.readdirSync(directory);
  // console.log(files);
  fs.readdir(dirBuf, (err, files) => {
    if ( err ) {
      console.log(err.message);
    } else {
      console.log(files);
      collectionImageResized.push(files);
    }
  });
  res.status(200).json({
    message:'Successfully message!',
    imagesResized :collectionImageResized
  });
});

// resized image
app.use( '/image', function (req, res) {
  var queryParameter = req.query;
  console.log('imagine '+queryParameter.imageName);
  imageWidth = queryParameter.width;
  imageHeight = queryParameter.height;
  console.log(imageWidth +' ' +imageHeight);
  (async () => {
    const imagine = await resizer('./images/'+queryParameter.imageName, setup);
  })();

  res.status(200).json({
    message:'resize image!',
    image : ""
  });
});

app.use( '/images',(req, res) => {
  res.status(200).json({
    message:'Successfully message!',
    images :collectionImage
  });
});


const storage = multer.diskStorage({
  destination: (require, file, callBack) => {
    callBack(null, 'images');
  },
  filename: (require, file, callBack) => {
    callBack(null, file.originalname);
  }
});

var upload = multer({storage: storage});


app.post('/file', upload.single('file'), (require,response, next) =>{
  const file = require.file;
  console.log(file);
  console.log('src '+ file.src);
  if(!file){
    const error = new Error("Please upload an image");
    error.httpStatusCode = 400;
    return next(error);
  }
  response.send(file);
  collectionImage.push({'originalName': file.originalname, 'encoding': file.encoding, 'mimetype': file.mimeType,
    'destination': file.destination, 'path': file.path});


});

module.exports = app;
