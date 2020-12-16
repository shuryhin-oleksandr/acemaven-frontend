import {useState} from "react";


export const useChartsUtils = () => {
    const [chartInstance, setChartInstance] = useState<any>(null)
    const updateDataSet = (datasetIndex: number, newData: Array<number | undefined> | Array<number | string>): void => {
        if (chartInstance) {
            chartInstance.data.datasets[datasetIndex].data = newData;
            chartInstance.update();
        }
    }

    const updateLabels = (newLabels: Array<string>): void => {
        if (chartInstance) {
            chartInstance.data.labels = newLabels
            chartInstance.update();
        }
    }

    return {setChartInstance, updateDataSet, updateLabels}
}