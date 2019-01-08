function querySt(ji) { //ORIGINAL FROM https://stackoverflow.com/a/5422360
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) return ft[1];
    }
}

function initDone() { 
    let file = querySt('file');
    if (file === undefined) { 
        document.getElementById('text').innerText = "404: File not found!";
        document.getElementById("link").style.display = "none";
        return;
    }
    document.getElementById('link').setAttribute('href', `files/${file}`); 
}   

function postReq(url) {
  document.getElementById('link').classList.add('clicked');
  document.getElementById('link').classList.remove('link');
  axios.get(`download?url=${url}`).then(res => {
    window.location.href = `done.html?file=${res.file}`
  });
}

function changeDL() { document.getElementById('link').setAttribute('onclick', `javascript:(postReq('${document.getElementById('input').value}'))`); }