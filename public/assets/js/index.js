function querySt(ji) { //ORIGINAL FROM https://stackoverflow.com/a/5422360
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) return ft[1];
    }
}

function initDone() { document.getElementById('link').setAttribute('href', `files/${querySt('file')}`); }
function changeDL() { document.getElementById('link').setAttribute('href', `download?url=${document.getElementById('input').value}`); }