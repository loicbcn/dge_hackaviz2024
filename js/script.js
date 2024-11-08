let chart_evo;
let graph_prod_conso;
let chart_evo_init_w = 0;
let graph_prod_conso_init_w = 0;
let graph_prod_conso_init_h = 0;
$(function() {

    window.addEventListener("beforeprint", (event) => {
        chart_evo_init_w = $('#chart_evo').width();
        graph_prod_conso_init_w = $('#graph_prod_conso').width();
        graph_prod_conso_init_h = $('#graph_prod_conso').height();
        $('#graph_prod_conso').width('750px');
        $('#graph_prod_conso').height('500px');
        $('#chart_evo').width('750px');
        chart_evo.reflow(); 
        graph_prod_conso.reflow();
    });
    window.addEventListener("afterprint", (event) => {
        $('#chart_evo').width(chart_evo_init_w);
        $('#graph_prod_conso').width(graph_prod_conso_init_w);
        $('#graph_prod_conso').height(graph_prod_conso_init_h);
        chart_evo.reflow(); 
        graph_prod_conso.reflow();
    });

    // evo_prod_conso_ratio
    const categories = [2019,2020,2021,2022];

    const series = [
        {
            name : 'Urbain - Production',
            data: [],
            stack: 'Urbain',
            color:'rgba(228, 26, 28, 1)',
        }, {
            name : 'Urbain - Consommation',
            data: [],
            stack: 'Urbain',
            color:'rgba(228, 26, 28, 0.5)'
        }, {
            name : 'Rural périurbain - Production',
            data: [],
            stack : 'Rural périurbain',
            color: 'rgba(152, 78, 163, 1)'
        }, {
            name : 'Rural périurbain - Consommation',
            data: [],
            stack : 'Rural périurbain',
            color: 'rgba(152, 78, 163, 0.5)'
        }, {
            name : 'Rural autonome - Production',
            data: [],
            stack : 'Rural autonome',
            color:'rgba(77, 175, 74, 1)'
        }, {
            name : 'Rural autonome - Consommation',
            data: [],
            stack : 'Rural autonome',
            color:'rgba(77, 175, 74, 0.5)'
        }, {
            name : 'Ratio EnR - Urbain',
            type: 'line',
            //step: 'center',
            data: [],
            color:'rgba(228, 26, 28, 1)'
        }, {
            name : 'Ratio EnR - Rural périurbain',
            data: [],
            type: 'line',
            //step: 'center',
            color:'rgba(152, 78, 163, 1)'
        }, {
            name : 'Ratio EnR - Rural autonome',
            data: [],
            type: 'line',
            //step: 'center',
            color:'rgba(77, 175, 74, 1)'
        }, 
    ];

    let current;

    for ( let i in evo_prod_conso_ratio['prod']) {
        current = evo_prod_conso_ratio['prod'][i];
        for ( let s in series ) {
            if ( series[s]['stack'] == current['forme'] && series[s]['name'].indexOf('Production') > -1) {
                series[s]['data'].push(current['prod']);
                series[s]['threshold'] = 0;
                series[s]['yAxis'] = 0;
            }
        }
    } 

    current = null;
    for ( let i in evo_prod_conso_ratio['conso']) {
        current = evo_prod_conso_ratio['conso'][i];
        for ( let s in series ) {
            if ( series[s]['stack'] == current['forme'] && series[s]['name'].indexOf('Consommation') > -1) {
                series[s]['data'].push(current['conso']*-1);
                series[s]['threshold'] = 0;
                series[s]['yAxis'] = 1;
            }
        }
    }

    current = null;
    for ( let i in evo_prod_conso_ratio['ratio']) {
        current = evo_prod_conso_ratio['ratio'][i];
        for ( let s in series ) {
            if ( series[s]['name'] == 'Ratio EnR - ' + current['forme'] ) {
                series[s]['data'].push(current['ratio']);
                series[s]['threshold'] = 0;
                series[s]['yAxis'] = 2;
                series[s]['lineWidth'] = 1;
                series[s]['shadow'] = true;
                series[s]['marker'] = {
                    lineWidth: 2,
                    lineColor: series[s]['color'],
                    fillColor: 'white'
                }

            }
        }
    }

    chart_evo = Highcharts.chart('chart_evo', {
        chart: {
            type: 'column',
            alignThresholds: true,
            height: 400,
            animation: false
        },
        title: {
            text: undefined
        },
        responsive: {
            rules: [{
              condition: {
                maxWidth: 700
              },
              chartOptions: {
                chart:{
                    height: 900,
                },
                legend: {
                    layout: 'horizontal',
                    verticalAlign: 'top',
                    align: 'center'
                }
              }
            }]
        },
        xAxis: {
            categories: categories
        },
        yAxis: [
            {
                title: {
                    text: 'Production (GWh)',
                    align: 'high'
                }, 
                labels: {
                    formatter: function() {
                        result = this.value;
                        if ( result < 0 ) return '';
                        if (this.value > 1000000) { result = Math.floor(this.value / 1000000) + "M" }
                        else if (this.value > 1000) { result = Math.floor(this.value / 1000) + "k" }
                        
                        return result;
                    } 
                }
            }, {
                title: {
                    text: '<i style="color:orange" class="bi bi-exclamation-triangle-fill"></i> Consommation (GWh) <i style="color:orange" class="bi bi-exclamation-triangle-fill"></i>',
                    useHTML: true,
                    align: 'low'
                },  
                labels: {
                    formatter: function() {
                        result = this.value;
                        if ( result > 0 ) return '';
                        if (this.value < -1000000) { result = Math.floor(this.value / 1000000)*-1 + "M" }
                        else if (this.value < -1000) { result = Math.floor(this.value / 1000)*-1 + "k" }
                        
                        return result;
                    } 
                },
                opposite: true,
            }, {
                title: {
                    text: 'Ratio EnR (%)',
                    align: 'high'
                },
                labels: {
                    formatter: function() {
                        result = this.value;
                        if ( result < 0 ) return '';
                        return result + '%';
                    } 
                },
                opposite: true,
            }
        ],
        legend: {
            layout: 'horizontal',
            verticalAlign: 'bottom',
            align: 'left',
            itemStyle:{fontSize:'12px'}

        },
        credits: {
            enabled: true,
            text:'Source: ATMO Grand Est'
        },
        tooltip: {
            formatter: function() { 
                if ( this.point.series.name.indexOf('Ratio EnR') > -1 ) {
                    return this.point.series.name + ' ' + this.key  + ': <strong class="badge fs-6" style="background-color:' + this.color + '">' + this.y + ' %</strong>';
                } else {
                    return this.point.series.name + ' ' + this.key   + ': <strong class="badge fs-6" style="background-color:' + this.color + '">' + Highcharts.numberFormat(Math.abs(this.y), 2, '.') + ' GWh</strong>';
                }
            },
            useHTML: true,
        },
        plotOptions: {
            column: {
                borderRadius: '25%'
            }, 
            column: {
                stacking: 'normal'
            },
            series: {
                animation: false
            }
        },
        series: series
    });


});

$(function(){
    /* graph flux */
    let serieprod_conso = [];
    let total_prod = 0;
    let total_conso = 0;
    for (let i in prod_conso) {
        for (let j in prod_conso[i]) {
            if ( prod_conso[i][j]['typ'] == 'prod_1' ){
                total_prod += prod_conso[i][j]['weight'];
            }
            if ( prod_conso[i][j]['typ'] == 'conso_1' ){
                total_conso += prod_conso[i][j]['weight'];
            }
        }
    }

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



            let color = null;

            let percent=0;
            if ( typ == 'conso_1' ) {
                percent = Highcharts.numberFormat(weight*100 / total_conso, 2, '.');
            } else {
                percent = Highcharts.numberFormat(weight*100 / total_prod, 2, '.');
            }
            //if ( percent > 1 ){ 
            serieprod_conso.push([from, to, weight, color, percent]);
            //} else console.log(percent);
        }
    }

    graph_prod_conso = Highcharts.chart('graph_prod_conso', {

        chart: {
            backgroundColor: 'transparent',
            margin:[40,0,10,0],
            spacing: [0,0,0,0],
            animation: false,
            //inverted: true
        },
        credits: {
            enabled: true,
            text:'Source: ATMO Grand Est',
            position: {
                align:'left',
                x:10
            }
        },
        title: {
            text: undefined
        },

        tooltip:{
            positioner: function () {
                return { x: 5, y: 5 };
            },
            useHTML: true,
            formatter: function() {
                // console.log(this);
                let tmpl = '';
                if ( this.point.isNode === true ) { // Noeuds
                    if (this.point.level < 2 ) { // Noeuds prod
                        const prod_enr = getsumweight(this.point.linksFrom);
                        const percent_prod = Highcharts.numberFormat(prod_enr*100 / total_prod, 2, '.');
                        tmpl = `<div class="mt-1"><strong class="fs-6">${this.point.name}:</strong><hr class="my-1">
                        <table>
                        <tr>
                            <td>Production EnR:</td>
                            <td class="text-end ps-3"><strong class="badge fs-6" style="background-color:${this.point.color}">${percent_prod}%</strong></td>
                            <td class="text-end ps-3"><strong class="fs-6">${Highcharts.numberFormat(this.point.sum)}</strong> GWh</td>
                        </tr>
                        </table></div>`;
                        return tmpl;                    
                    } else if( this.point.level == 2 ) {  // noeuds prod / conso
                        const prod_enr = getsumweight(this.point.linksTo);
                        const percent_prod = Highcharts.numberFormat(prod_enr*100 / total_prod, 2, '.');
                        const conso_enr = getsumweight(this.point.linksFrom);
                        const percent_conso = Highcharts.numberFormat(conso_enr*100 / total_conso, 2, '.');
                        tmpl = `<div class="mt-1"><strong class="fs-6">${this.point.name}:</strong><hr class="my-1">
                        <table>
                        <tr>
                            <td>Production EnR:</td>
                            <td class="text-end ps-2"><strong class="badge fs-6" style="background-color:${this.point.color}">${percent_prod}%</strong></td>
                            <td class="text-end ps-2"><strong class="fs-6">${Highcharts.numberFormat(prod_enr)}</strong> GWh<br>
                            </td>
                        </tr>
                        <tr>
                            <td>Consommation:</td>
                            <td class="text-end ps-2"><strong class="badge fs-6" style="background-color:${this.point.color}">${percent_conso}%</strong></td>
                            <td class="text-end ps-2"><strong class="fs-6">${Highcharts.numberFormat(conso_enr)}</strong> GWh</td></tr>
                        </table></div>
                        `;
                        return tmpl; 
                    } else { // Noeuds conso
                        const conso_enr = getsumweight(this.point.linksTo);
                        const percent_conso = Highcharts.numberFormat(conso_enr*100 / total_conso, 2, '.');
                        tmpl = `<div class="mt-1"><strong class="fs-6">${this.point.name}:</strong><hr class="my-1">
                        <table>
                        <tr>
                            <td>Consommation:</td>
                            <td class="text-end ps-2"><strong class="badge fs-6" style="background-color:${this.point.color}">${percent_conso}%</strong></td>
                            <td class="text-end ps-2"><strong class="fs-6">${Highcharts.numberFormat(this.point.sum)}</strong> GWh</td>
                        </tr>
                        </table></div>`;
                        return tmpl;
                    }
                    
                } else { // Liens entre noeuds
                    let title = 'Production EnR';
                    if ( this.point.toNode.level == 3 ) {
                        title = 'Consommation';
                    }
                    tmpl = `<strong class="fs-6">${this.point.from}<span style="font-size:1.4rem; position:relative; top:2px;">⇝</span>
                    ${this.point.to}:</strong><hr>
                    <div style="display:flex; justify-content: flex-end;"><table>
                    <tr>
                        <td>${title}:</td>
                        <td class="text-end ps-3"><strong class="badge fs-6" style="background-color:${this.point.color}">${this.point.percent}%</strong></td>
                        <td class="text-end ps-3"><strong class="fs-6">${Highcharts.numberFormat(this.point.weight)}</strong> GWh</td>
                    </tr>
                    </table></div>`;
                    return tmpl;
                }
            },
        },
    
        series: [{
            keys: ['from', 'to', 'weight', 'color', 'percent'],
            nodePadding:30,
            animation: false,
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
                {id:'Autres énergies renouvelables (EnR)', color:'#2fd200'},
                {id:'Produits pétroliers', color:'#0f1b23'},
                {id:'Gaz Naturel', color:'#94f7f7'}
            ],
            data: serieprod_conso,
            type: 'sankey',
            name: 'Production d\'ENR et consommation d\'énergie par forme d\'EPCI'
        }]
    
    });
    

});

$(function(){

    const series = [{
        name: 'Urbain',
        id: 'urbain',
        color: 'rgba(228, 26, 28, .7)',
        data: [],
        marker: {
            symbol: 'square',
            radius: 3
        }
    },
    {
        name: 'Rural périurbain',
        id: 'rural_periurbain',
        color: 'rgba(152, 78, 163,.7)',
        data: [],
        marker: {
            symbol: 'square',
            radius: 3
        }
    },
    {
        name: 'Rural autonome',
        id: 'rural_autonome',
        color: 'rgba(77, 175, 74, .7)',
        data: [],
        marker: {
            symbol: 'square',
            radius: 3
        }
    }];

    pop_ratio.forEach(elm => {
        let idx = 0;
        if ( elm.forme == 'Rural périurbain' ) idx = 1;
        if ( elm.forme == 'Rural autonome' ) idx = 2;
        series[idx].data.push([elm.pmun_epci, elm.ratioenr, elm.siren_epci]);
        //temp.push();
    });
    
    const chart_pop_ratio = Highcharts.chart('pop_ratio', {
        chart: {
            type: 'scatter',
            zooming: {
                type: 'xy'
            }
        },
        credits: {
            enabled: true,
            text:'Source: ATMO Grand Est',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            title: {
                text: 'Population (hab.)'
            },
            labels: {
                format: '{value:,.0f}',
                rotation: -45
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            min:0,
        },
        yAxis: {
            opposite: false,
            title: {
                text: 'Ratio EnR'
            },
            labels: {
                format: '{value} %'
            },
            lineWidth: 1,
            tickWidth: 1,
            tickLength: 4,
            max:300
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
                animation: false
            },
            scatter: {
                marker: {
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                jitter: {
                    x: 0.005
                }
            }
        },
        tooltip: {
            useHTML:true,
            formatter: function() {
                const siren_epci = series[this.series.index]['data'][this.point.index][2];
                const epci = idx_epci[siren_epci];
                let tmpl = `
                <div class="text-end">
                    <strong class="badge fs-6" style="background-color:${this.color}">${this.series.name}</strong>
                </div>
                <table class="table mt-3">
                    <tr>
                        <th>EPCI</th>
                        <th>Siège</th>
                        <th>Pop.</th>
                        <th>Ratio EnR</th>
                    </tr>
                    <tr>
                        <td>${epci[0]}</td>
                        <td><small>${epci[1]}</small></td>
                        <td class="text-end">${Highcharts.numberFormat(this.point.x, 0)} hab.</td>
                        <td class="text-end">${this.point.y} %</td>
                    </tr>
                </table>`;
                return tmpl;
            }
            //pointFormat: 'Population: {point.x} hab <br/> Ratio EnR: {point.y} %'
        },
        series
    });

    const chart_pop_ratio_zoom = Highcharts.chart('pop_ratio_zoom', {
        chart: {
            type: 'scatter',
            zooming: {
                type: 'xy'
            }
        },
        credits: {
            enabled: true,
            text:'Source: ATMO Grand Est',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            title: {
                text: 'Population (hab.)'
            },
            labels: {
                format: '{value:,.0f}',
                rotation: -45
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            min:0,
            max: 125000
        },
        yAxis: {
            title: {
                text: 'Ratio EnR'
            },
            labels: {
                format: '{value} %'
            },
            lineWidth: 1,
            tickWidth: 1,
            tickLength: 4,
            max:100
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
                animation: false
            },
            scatter: {
                marker: {
                    radius: 2.5,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                jitter: {
                    x: 0.005
                }
            }
        },
        tooltip: {
            useHTML:true,
            formatter: function() {
                const siren_epci = series[this.series.index]['data'][this.point.index][2];
                const epci = idx_epci[siren_epci];
                let tmpl = `
                <div class="text-end">
                    <strong class="badge fs-6" style="background-color:${this.color}">${this.series.name}</strong>
                </div>
                <table class="table mt-3">
                    <tr>
                        <th>EPCI</th>
                        <th>Siège</th>
                        <th>Pop.</th>
                        <th>Ratio EnR</th>
                    </tr>
                    <tr>
                        <td>${epci[0]}</td>
                        <td><small>${epci[1]}</small></td>
                        <td class="text-end">${Highcharts.numberFormat(this.point.x, 0)} hab.</td>
                        <td class="text-end">${this.point.y} %</td>
                    </tr>
                </table>`;
                return tmpl;
            }
            //pointFormat: 'Population: {point.x} hab <br/> Ratio EnR: {point.y} %'
        },
        series
    });

});

function getsumweight(arr_weight){
    return arr_weight.reduce((accumulator, current) => accumulator + current.weight, 0);
}