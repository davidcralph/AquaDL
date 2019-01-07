const { Router }            = require('express');
const router                = Router();
const youtubedl             = require('youtube-dl');
const { createWriteStream } = require('fs');
const { randomBytes }       = require('crypto');
const config                = require('./config.json');

router.get('/download', (req, res) => {
    console.log(`[AquaDL] Downloading ${req.query.url}...`);
    let video = youtubedl(req.query.url);
    let string = randomBytes(config.fileLength).toString('hex');
    video.pipe(createWriteStream(`public/files/${string}.webm`));
    video.on('end', () => { 
        console.log(`[AquaDL] Finished! Saved to ${string}.webm`);
        res.redirect(`/done.html?file=${string}.webm`); 
    });
});

module.exports = router;