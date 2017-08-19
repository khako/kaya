const Nuxt = require('nuxt');
const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const options = require ('./nuxt.config.js');

const nuxt = new Nuxt.Nuxt(options);

let builder = new Nuxt.Builder(nuxt);
builder.nuxt.options.rootDir += '/client'
builder.nuxt.options.srcDir += '/client'

const promise = builder.build();

app.start = function() {
  app.use(nuxt.render);
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('\n\nWeb server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('\nBrowse your REST API at %s%s', baseUrl, explorerPath);
    }
  });

};

const server = __dirname + '/server';

boot(app, server, function(err) {
  if (err) throw err;
  if (require.main === module) {
    promise.then(() => {
      app.start();
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
});
