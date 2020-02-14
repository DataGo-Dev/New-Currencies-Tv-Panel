jsonvar = [
    [1518618600000, 167.37],
    [1518705000000, 172.99],
    [1518791400000, 172.43],
    [1519137000000, 171.85],
    [1519223400000, 171.07]
]

function toDateandTime(strDate) {
    return strDate.slice(4, 6) + "/" + strDate.slice(6, 8) + "/" + strDate.slice(0, 4) + " " + strDate.slice(8, 10) + ":" + strDate.slice(10, 12) + ":" + strDate.slice(12, 14);
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
}

var dadoReadyUSD = [];
document.addEventListener('DOMContentLoaded', function() {
    $.getJSON('https://api.cotacoes.uol.com/currency/interday/list/years/?format=JSON&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&currency=1&', function(data) {

        var dadoParsed = data.docs;
        var valormax;
        (dadoParsed.length > 1000 ? valormax = 1000 : valormax = dadoParsed.length)
        for (let index = valormax - 1; index > -1; index--) {
            // for (let index = 0; index < valormax; index++) {
            // for (let index = 0; index < dadoParsed.length; index++) {
            var dataparsed = dadoParsed[index].date;
            var datapadrao = toTimestamp(toDateandTime(dataparsed));
            var valorpadrao = dadoParsed[index].askvalue;
            // console.log(datapadrao)

            // var datapadrao = dataparsed.slice(6, 8) + "/" + dataparsed.slice(4, 6) + "/" + dataparsed.slice(0, 4) + " " + dataparsed.slice(8, 10) + ":" + dataparsed.slice(10, 12) + ":" + dataparsed.slice(12, 14);
            dadoReadyUSD.push([datapadrao, valorpadrao])
        }
        // for (let index2 = valormax - 1; index2 > -1; index2 = index2 - 1) {
        //     console.log(index2)
        // }


        //data is the JSON string

        // Highcharts.getJSON(jsonvariable, function(data) {
        Highcharts.stockChart('container', {
            rangeSelector: {
                selected: 1,
                enabled: true,
                buttons: [{
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }]
            },
            title: {
                text: 'VALOR DO DÓLAR COMERCIAL'
            },
            series: [{
                name: 'DÓLAR COMERCIAL',
                data: dadoReadyUSD,
                tooltip: {
                    valueDecimals: 4
                }
            }],
            data: [{
                    dateFormat: "dd/mm/YYYY"
                }]
                // });
        });
    });
});