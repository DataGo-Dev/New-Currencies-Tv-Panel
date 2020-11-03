function toDateandTime(strDate) {
    return strDate.slice(4, 6) + "/" + strDate.slice(6, 8) + "/" + strDate.slice(0, 4) + " " + strDate.slice(8, 10) + ":" + strDate.slice(10, 12) + ":" + strDate.slice(12, 14);
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
}

// FUNÇÃO PARA TRANFORMAR NUMEROS DE 1-9 EM 01-09;
function n(n) {
    return n > 9 ? "" + n : "0" + n;
}

function returnDateStart() {
    var now = new Date();
    return date = Date.parse([n(now.getMonth() + 1), n(now.getDate()), now.getFullYear()].join('/') + " 00:00:00");
}

function returnDateEnd() {
    var now = new Date();
    return date = Date.parse([n(now.getMonth() + 1), n(now.getDate()), now.getFullYear()].join('/') + " 23:59:59");
}