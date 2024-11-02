$(function(){

    let serieprod_conso = [];
    for (let i in prod_conso) {
        for (let j in prod_conso[i]) {
            let from = prod_conso[i][j]['from'];
            let to = prod_conso[i][j]['to'];
            let weight = prod_conso[i][j]['weight'];
            let typ = prod_conso[i][j]['typ'];
            
            // Traiter le cas des classes homonymes
            if ( typ == 'prod_1' && from == 'Electricité' ) {
                from = 'Prod. électricité';
            }
            /* if ( typ == 'prod_2' && from == 'Electricité' ) {
                from = 'Prod. électricité';
            } */         
            if ( to == 'Biogaz' ) {
                to = 'Prod. biogaz';
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

        tooltip:{
            useHTML: true,
            formatter: function() {
                let tmpl = '';
                if ( this.point.isNode === true ) { // Noeuds
                    if (this.point.level < 2 ) { // Noeuds prod
                        tmpl = `<strong>${this.point.name}:</strong><br><br>
                        Production EnR: <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.sum)}</strong> GWh`;
                        return tmpl;                    
                    } else if( this.point.level == 2 ) {  // noeuds prod / conso
                        const prod_enr = getsumweight(this.point.linksTo);
                        const conso_enr = getsumweight(this.point.linksFrom);
                        tmpl = `<strong>${this.point.name}:</strong>
                        <table>
                        <tr><td>Production EnR:</td><td style="text-align:right"><strong style="font-size:1.8rem;">${Highcharts.numberFormat(prod_enr)}</strong> GWh</td></tr>
                        <tr><td>Consommation EnR: </td><td style="text-align:right"><strong style="font-size:1.8rem;">${Highcharts.numberFormat(conso_enr)}</strong> GWh</td></tr>
                        </table>
                        `;
                        return tmpl; 
                    } else { // Noeuds conso
                        tmpl = `<strong>${this.point.name}:</strong><br><br>
                        Consommation EnR: <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.sum)}</strong> GWh`;
                        return tmpl;
                    }
                    
                } else { // Liens entre noeuds
                    console.log(this);
                    let title = 'Production EnR';
                    if ( this.point.toNode.level == 3 ) {
                        title = 'Consommation EnR';
                    }
                    tmpl = `${title}<br><strong>${this.point.from} <span style="font-size:2rem; position:relative; top:5px;">⇝</span>
                    ${this.point.to}:</strong><br>
                    <div style="text-align:right">
                        <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.weight)}</strong>GWh
                    </div>`;
                    return tmpl;
                }
            },
        },
    
        series: [{
            keys: ['from', 'to', 'weight', 'color'],
            nodes: [
                {id:'Rural autonome', color:'#4daf4a', width: 40, borderWidth: 2, borderColor: 'black'},
                {id:'Rural périurbain', color:'#984ea3', width: 40, borderWidth: 2, borderColor: 'black'},
                {id:'Urbain', color:'#e41a1c', width: 40, borderWidth: 2, borderColor: 'black'},
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


/* -- graph 1 
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

        tooltip:{
            useHTML: true,
            formatter: function() {
                let tmpl = '';
                if ( this.point.isNode === true ) { // Noeuds
                    if (this.point.level < 2 ) { // Noeuds prod
                        tmpl = `<strong>${this.point.name}:</strong><br><br>
                        Production EnR: <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.sum)}</strong> GWh`;
                        return tmpl;                    
                    } else if( this.point.level == 2 ) {  // noeuds prod / conso
                        const prod_enr = getsumweight(this.point.linksTo);
                        const conso_enr = getsumweight(this.point.linksFrom);
                        tmpl = `<strong>${this.point.name}:</strong>
                        <table>
                        <tr><td>Production EnR:</td><td style="text-align:right"><strong style="font-size:1.8rem;">${Highcharts.numberFormat(prod_enr)}</strong> GWh</td></tr>
                        <tr><td>Consommation EnR: </td><td style="text-align:right"><strong style="font-size:1.8rem;">${Highcharts.numberFormat(conso_enr)}</strong> GWh</td></tr>
                        </table>
                        `;
                        return tmpl; 
                    } else { // Noeuds conso
                        tmpl = `<strong>${this.point.name}:</strong><br><br>
                        Consommation EnR: <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.sum)}</strong> GWh`;
                        return tmpl;
                    }
                    
                } else { // Liens entre noeuds
                    console.log(this);
                    let title = 'Production EnR';
                    if ( this.point.toNode.level == 3 ) {
                        title = 'Consommation EnR';
                    }
                    tmpl = `${title}<br><strong>${this.point.from} <span style="font-size:2rem; position:relative; top:5px;">⇝</span>
                    ${this.point.to}:</strong><br>
                    <div style="text-align:right">
                        <strong style="font-size:1.8rem;">${Highcharts.numberFormat(this.point.weight)}</strong>GWh
                    </div>`;
                    return tmpl;
                }
            },
        },
    
        series: [{
            keys: ['from', 'to', 'weight', 'color'],
            nodes: [
                {id:'Rural autonome', color:'#4daf4a', width: 40, borderWidth: 2, borderColor: 'black'},
                {id:'Rural périurbain', color:'#984ea3', width: 40, borderWidth: 2, borderColor: 'black'},
                {id:'Urbain', color:'#e41a1c', width: 40, borderWidth: 2, borderColor: 'black'},
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
    

});*/

function getsumweight(arr_weight){
    return arr_weight.reduce((accumulator, current) => accumulator + current.weight, 0);
}