const kirbe  = require('kirbe');
const app    = new kirbe.Server();
const config = require('./config.json');

app.use(require('./routes.js'));
app.use(kirbe.static('./public'));
    
app.listen(config.port, console.log(`[AquaDL] Listening on port ${config.port}!`));
