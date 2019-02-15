const youtubedl             = require('youtube-dl');
const { createWriteStream } = require('fs');
const { randomBytes }       = require('crypto');
const config                = require('./config.json');

module.exports = (app) => {
app.get('/download', (req, res) => {
    console.log(`[AquaDL] Downloading ${req.query.url}...`);
    let video = youtubedl(req.query.url);
    let string = randomBytes(config.fileLength).toString('hex');
    video.pipe(createWriteStream(`public/files/${string}.webm`));
    video.on('error', (err) => { console.log(`[AquaDL] Error: ${err}`); });
    video.on('end', () => { 
        console.log(`[AquaDL] Finished! Saved to ${string}.webm`);
        res.send(`${string}.webm`); 
    });
});

app.get('/info', (req, res) => {
    youtubedl.getInfo(req.query.url, (err, info) => {
        if (err) return;
        res.json({title: info.title, desc: info.description, thumb: info.thumbnail});
    });
});
});
