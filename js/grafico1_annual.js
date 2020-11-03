var dadoReadyUSD = [];
document.addEventListener('DOMContentLoaded', function() {

    var valoratual = {};
    $.getJSON('https://api.cotacoes.uol.com/currency/intraday/list/?format=JSON&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&currency=1&', function(data2) {

        var dadoParsed = data2.docs;
        $("#valComUSD").text('R$ ' + dadoParsed[0].bidvalue);
        $("#valVenUSD").text('R$ ' + dadoParsed[0].askvalue);
        $("#valMaxUSD").text('R$ ' + dadoParsed[0].maxbid);
        $("#valMinUSD").text('R$ ' + dadoParsed[0].minbid);
        valoratual = dadoParsed[0];
    })

    $.getJSON('https://api.cotacoes.uol.com/currency/interday/list/years/?format=JSON&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&currency=1&', function(data) {


        var dadoParsed = data.docs;
        var valormax;
        // $("#valComUSD").text('R$ ' + dadoParsed[0].bidvalue);
        // $("#valVenUSD").text('R$ ' + dadoParsed[0].askvalue);
        // $("#valMaxUSD").text('R$ ' + dadoParsed[0].maxbid);
        // $("#valMinUSD").text('R$ ' + dadoParsed[0].minbid);

        (dadoParsed.length > 999 ? valormax = 999 : valormax = dadoParsed.length)
        for (let index = valormax - 1; index > -1; index--) {
            // for (let index = 0; index < valormax; index++) {
            // for (let index = 0; index < dadoParsed.length; index++) {
            var dataparsed = dadoParsed[index].date;
            var datapadrao = toTimestamp(toDateandTime(dataparsed)) - 10800000;
            var valorpadrao = dadoParsed[index].bidvalue;
            // console.log(datapadrao)

            // var datapadrao = dataparsed.slice(6, 8) + "/" + dataparsed.slice(4, 6) + "/" + dataparsed.slice(0, 4) + " " + dataparsed.slice(8, 10) + ":" + dataparsed.slice(10, 12) + ":" + dataparsed.slice(12, 14);
            dadoReadyUSD.push([datapadrao, valorpadrao])
        }
        dadoReadyUSD.push([toTimestamp(toDateandTime(valoratual.date)) - 10800000, valoratual.bidvalue]);


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