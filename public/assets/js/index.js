function querySt(ji) { //ORIGINAL FROM https://stackoverflow.com/a/5422360
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) return ft[1];
    }
}

function isEmpty(str) { return !str.replace(/\s+/, '').length; }

function initDone() {
    let file = querySt('file');
    if (file === undefined || file === 'undefined') {
        document.getElementById('text').innerText = "404: File not found!";
        document.getElementById("link").style.display = "none";
        return;
    }
    document.getElementById('link').setAttribute('href', `files/${file}`);
}

function postReq(url) {
    document.getElementById('link').classList.add('clicked');
    document.getElementById('link').classList.remove('link');
    axios.get(`download?url=${url}`).then(res => { window.location.href = `done.html?file=${res.data}`; });
}

function changeDL() {
    function isEmpty(str) { return !str.replace(/\s+/, '').length; }
    document.getElementById('text').innerText = 'Loading...'; 
    document.getElementById('img').src = 'assets/img/question.png';
    if (isEmpty(document.getElementById('input').value)) {
        document.getElementById('text').innerText = '';
        document.getElementById('img').src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
    axios.get(`info?url=${document.getElementById('input').value}`).then(res => { 
        document.getElementById('text').innerText = res.data.title; 
        document.getElementById('img').src = res.data.thumb; 
    });
    document.getElementById('link').setAttribute('onclick', `javascript:(postReq('${document.getElementById('input').value}'))`);
}
