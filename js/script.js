$(function(){

    let serieprod_conso = [];
    for (let i in prod_conso) {
        for (let j in prod_conso[i]) {
            serieprod_conso.push(prod_conso[i][j]);
        }
    }

    console.log(serieprod_conso);

    Highcharts.chart('container', {

        chart: {
            //inverted: true
        },
    
        title: {
            text: 'Highcharts Inverted Sankey Diagram'
        },
    
        series: [{
            keys: ['from', 'to', 'weight'],
            data: serieprod_conso,
            type: 'sankey',
            name: 'Sankey demo series'
        }]
    
    });
    

});