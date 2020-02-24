
export const getXAxis = (chartData) => {
    let xAxisName = chartData.columns[0]
    return chartData.rows.map(function (item){
        return item[xAxisName]
    })
}
export const getEveryYAxis = (yKey,chartData) =>  {
    return chartData.rows.map(item => {
        return item[yKey]
    })
}
export const getYAxis = (chartData) => {
    let yAxis = {}
    let yAxisKey = chartData.columns.slice(1)
    yAxisKey.forEach(item=>{
        yAxis[item] = getEveryYAxis(item,chartData)
    })
    return yAxis
}
export const setConcat = (object) => {
    let newArray = []
    for (let key in object){
        newArray.push(...object[key])
    }
    return newArray
}
export const setTwoYAxis = (yAxis,rightKey) => {
    let rightYAxis = {}
    rightKey.forEach(item => {
        rightYAxis[item] = yAxis[item]
        delete yAxis[item]
    })
    return {leftYAxis:yAxis,rightYAxis}
}
export const getStack = (chartSettings,chartData) => {
    let stack = {}
    for(let key in chartSettings.stack){
        stack[key] = []
        chartData.rows.forEach(item => {
            let count = 0
            chartSettings.stack[key].forEach(keyItem=>{
                count += item[keyItem]
            })
            stack[key].push(count)
        })
    }
    return stack
}
export const getStackName = (columnsKey,stack) => {
    let stackName = ''
    for(let key in stack){
        if(stack[key].includes(columnsKey)){
            stackName = key
            break
        }
    }
    return stackName
}
