const kirbe  = require('kirbe');
const app    = new kirbe.Server();
const config = require('./config.json');
const routes = require('./routes.js');

routes(app);
kirbe.static('./public');
    
app.listen(config.port, console.log(`[AquaDL] Listening on port ${config.port}!`));
