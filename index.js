const express = require('express');
const app     = express();
const config  = require('./config.json');

app.use(require('./routes.js'));
app.use(express.static('./public'));
    
app.listen(config.port, console.log(`[AquaDL] Listening on port ${config.port}!`));