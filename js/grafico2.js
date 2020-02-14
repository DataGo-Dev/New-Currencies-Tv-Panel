var dadoReadyEUR = [];
document.addEventListener('DOMContentLoaded', function() {
    $.getJSON('https://api.cotacoes.uol.com/currency/interday/list/years/?format=JSON&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&currency=5&', function(data) {

        var dadoParsed = data.docs;
        var valormax;
        $("#valComEUR").text(dadoParsed[0].bidvalue);
        $("#valVenEUR").text(dadoParsed[0].askvalue);
        $("#valMaxEUR").text(dadoParsed[0].maxbid);
        $("#valMinEUR").text(dadoParsed[0].minbid);

        (dadoParsed.length > 1000 ? valormax = 1000 : valormax = dadoParsed.length)
        for (let index = valormax - 1; index > -1; index--) {
            // for (let index = 0; index < valormax; index++) {
            // for (let index = 0; index < dadoParsed.length; index++) {
            var dataparsed = dadoParsed[index].date;
            var datapadrao = toTimestamp(toDateandTime(dataparsed));
            // var datapadrao = dataparsed.slice(6, 8) + "/" + dataparsed.slice(4, 6) + "/" + dataparsed.slice(0, 4) + " " + dataparsed.slice(8, 10) + ":" + dataparsed.slice(10, 12) + ":" + dataparsed.slice(12, 14);
            dadoReadyEUR.push([datapadrao, dadoParsed[index].askvalue])
        }
        // for (let index2 = valormax - 1; index2 > -1; index2 = index2 - 1) {
        //     console.log(index2)
        // }


        //data is the JSON string

        // Highcharts.getJSON(jsonvariable, function(data) {
        Highcharts.stockChart('container2', {
            rangeSelector: {
                selected: 1,
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
                text: 'VALOR DO EURO COMERCIAL'
            },
            series: [{
                    name: 'EURO COMERCIAL',
                    data: dadoReadyEUR,
                    tooltip: {
                        valueDecimals: 4
                    }
                }]
                // });
        });
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     var myChart = Highcharts.stockChart('container', {
//         rangeSelector: {
//             selected: 1
//         },

//         title: {
//             text: 'AAPL Stock Price'
//         },

//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }]
//     });
// });