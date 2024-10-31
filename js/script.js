$(function(){

    let serieprod_conso = [];
    for (let i in prod_conso) {
        for (let j in prod_conso[i]) {
            let from = prod_conso[i][j]['from'];
            let to = prod_conso[i][j]['to'];
            let weight = prod_conso[i][j]['weight'];
            let typ = prod_conso[i][j]['typ'];
            
            // Traiter le cas des classes homonymes
            if ( typ == 'prod_1' && to == 'Electricité' ) {
                to = 'Prod. électricité';
            }
            if ( typ == 'prod_2' && from == 'Electricité' ) {
                from = 'Prod. électricité';
            }           
            if ( from == 'Biogaz' ) {
                from = 'Prod. biogaz';
            }

            // couleurs
            let color = null;
            if ( to == 'Rural autonome' ) {
                color = '#4daf4a';
            }
            if ( to == 'Rural périurbain' ) {
                color = '#984ea3';
            } 
            if ( to == 'Urbain' ) {
                color = '#e41a1c';
            } 

            serieprod_conso.push([from, to, weight, color]);
        }
    }
    console.log(serieprod_conso);

    Highcharts.chart('graph_prod_conso', {

        chart: {
            backgroundColor: 'transparent',
            margin:0,
            spacing: [0,0,0,0]
            //inverted: true
        },
    
        title: {
            text: undefined
        },

        xAxis: {
            plotBands: [{
                from: 0,
                to: 200,
                color: 'rgba(0,0,0,0.5)'
            }],
        },

        tooltip:{
            formatter: function() {
                if ( this.point.isNode === true ) {
                    console.log(this);
                    return Highcharts.numberFormat(this.point.sum) + ' GWh';                    
                } else {
                    console.log(this);
                    return Highcharts.numberFormat(this.point.weight) + ' GWh'; 
                }
            },
            /*pointFormat: '{point.name}: {point.sum:.2f} --',*/
        },
    
        series: [{
            keys: ['from', 'to', 'weight', 'color'],
            nodes: [
                {id:'Rural autonome', color:'#4daf4a', width: 40},
                {id:'Rural périurbain', color:'#984ea3', width: 40},
                {id:'Urbain', color:'#e41a1c', width: 40},
                {id:'Production d\'agrocarburants', color:'#006065'},
                {id:'Filière bois-énergie', color:'#ba7b3b'},
                {id:'Solaire photovoltaïque', color:'#f7c631'},
                {id:'Hydraulique renouvelable', color:'#0b5bb6'},
                {id:'Incinération déchets - part EnR', color:'#72637f'},
                {id:'Carburant ou combustible', color:'#004050'},
                {id:'Géothermie très haute énergie', color:'#fe6a35'},
                {id:'Géothermie profonde basse énergie', color:'#fe6a35'},
                {id:'PACs géothermiques', color:'#fe6a35'},
                {id:'Prod. électricité', color:'#2caffe'},
                {id:'Chaleur', color:'#fe6a35'},
                {id:'Electricité', color:'#2caffe'},
                {id:'Bois-énergie (EnR)', color:'#ba7b3b'},
            ],
            data: serieprod_conso,
            type: 'sankey',
            name: 'Production et consommation d\'ENR par forme d\'EPCI'
        }]
    
    });
    

});