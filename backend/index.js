const resizer = require('node-image-resizer');

const setup = {
  all: {
    path: './resized-images/',
    quality: 80
  },
  versions: [{
    prefix: 'big_',
    width: 1024,
    height: 768
  },
    {
    prefix: 'medium_',
    width: 512,
    height: 256
  },
    {
    quality: 100,
    prefix: 'small_',
    width: 128,
    height: 64
  }]
};

//https://malcoded.com/posts/nodejs-image-resize-express-sharp/

(async () => {
  const imagine = await resizer('../images/poz.jpg', setup);
  console.log(imagine);
})();
