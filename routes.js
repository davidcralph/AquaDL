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
    video.on('error', (err) => { console.log(`[AquaDL] Error: ${err}`); });
    video.on('end', () => { 
        console.log(`[AquaDL] Finished! Saved to ${string}.webm`);
        res.send(`${string}.webm`); 
    });
});

router.get('/info', (req, res) => {
    youtubedl.getInfo(req.query.url, (err, info) => {
        if (err) return;

        console.log('id:', info.id);
        console.log('title:', info.title);
        console.log('url:', info.url);
        console.log('thumbnail:', info.thumbnail);
        console.log('description:', info.description);
        console.log('filename:', info._filename);
        console.log('format id:', info.format_id);

        res.json({title: info.title, desc: info.description, thumb: info.thumbnail});
    });
});

module.exports = router;