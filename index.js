const app = require('ibird').newApp();

// response
app.get('/', ctx => {
  ctx.body = `Hello ibird.`;
});

app.play();