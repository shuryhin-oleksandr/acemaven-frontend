export const getExchangeChartConfig = (dates_labels: Array<string>, usd_rates: Array<number>, eur_rates: Array<number>,) => {

    return {
        type: 'line',
        data: {
            labels: dates_labels,
            datasets: [
                {
                    data: usd_rates,
                    borderColor: "#115b86",
                    //@ts-ignore
                    borderJoinStyle: "miter",
                    lineTension: 0.005,
                    pointBackgroundColor: '#115b86',
                    //pointHoverBackgroundColor: "#115b86",
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 2,
                    fill: false
                },
                {
                    data: eur_rates,
                    borderColor: "#00c5ff",
                    pointBackgroundColor: '#00c5ff',
                    //pointHoverBackgroundColor: "#00c5ff",
                    fill: false,
                    lineTension: 0.005,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 2,
                    borderJoinStyle: "miter",
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 20,
                    left: 10,
                    right: 10
                }
            },
            tooltips: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                titleFontFamily: 'Helvetica Bold, sans-serif',
                titleFontSize: 15,
                titleFontColor: 'rgba(255,255,255,.8)',
                titleMarginBottom: 4,
                bodyFontFamily: 'Helvetica Reg, sans-serif',
                bodyFontSize: 13,
                bodyFontColor: 'white',
                xPadding: 15,
                yPadding: 10,
                caretSize: 8,
                labelColor: 'inherit'
               /* callbacks: {
                    labelColor: function(tooltipItem: any, chart: any) {
                        return {
                            borderColor: commonSales ? 'rgb(255, 0, 0)' : 'white',
                            backgroundColor: commonSales ? 'white' : 'black'
                        };
                    }
            */},
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        max: 31,
                        min: 1,
                        //maxRotation: 500,
                        //maxTicksLimit: 600,
                        //suggestedMax: 500,
                        //suggestedMin: 50,
                        stepSize: 1,
                    },
                }],
                yAxes:[{
                    gridLines: {
                        offsetGridLines: false
                    },
                    stacked: false,

                }]
            },
            animation: {
                animateRotate: true,
                animateScale: true
            },

        }
    }
}