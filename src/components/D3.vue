<template>
    <div>
        <div class="D3" style="width: 100%">

        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import * as D3Util from '../util/D3Util'
    export default {
        name: "D3",
        data(){
            return {
                margin : {
                    top: 20,
                    right: 60,
                    bottom: 40,
                    left: 60,
                },
                defaultColor : ['#38CCCB', '#0074D9', '#2FCC40', '#FEDC00', '#FF4036', 'lightgrey'],
                chartData : {
                    columns:['name','last','year1','year2','year3','year4','year5'],
                    rows:[
                        {
                            name : 'pengxc2',
                            last : 10000 ,
                            year1 : 16000,
                            year2: 8000,
                            year3 : 5000,
                            year4 : 2000,
                            year5 : 1000,
                        },
                        {
                            name : 'niuxf2',
                            last : 12000 ,
                            year1 : 14000,
                            year2: 4000,
                            year3 : 13000,
                            year4 : 2000,
                            year5 : 11000,
                        },
                        {
                            name : 'yangwei',
                            last : 11000 ,
                            year1 : 13000,
                            year2: 14000,
                            year3 : 3000,
                            year4 : 12000,
                            year5 : 1000,
                        },
                    ]

                },
                chartSettings:{
                    // axisSite:{right:['year1','year5']},
                    // dataOrder : { label: 'last', order: 'asc' },
                    stack : { money:['last','year2'] , year:['year3','year4'] }
                }
            }
        },
        mounted(){
            this.createBar()
            this.createPercentStack()
        },
        methods:{
            createBar(){
                let {
                    showLine,
                    axisSite,//指标所在的轴{right:['age','percent']}
                    legendName,
                    labelMap,//所显示指标的别名 {age:'年龄'}
                    dataOrder,//根据哪个指标排序 { label: 'age', order: 'asc' } asc升序 desc降序
                    stack,//堆叠 {money:['last','year']}   将last和year堆叠显示
                    color = this.defaultColor,
                    margin = this.margin,
                    maxSingleWidth = 38
                } = this.chartSettings
                let width = document.getElementsByClassName('D3')[0].offsetWidth
                let height = document.getElementsByClassName('D3')[0].offsetHeight || 400

                //是否排序
                if(dataOrder){
                    this.chartData.rows.sort((a,b)=>{
                        return a[dataOrder.label] - b[dataOrder.label]
                    })
                    this.chartData.rows = dataOrder.order === 'asc' ? this.chartData.rows : this.chartData.rows.reverse()
                }

                let getXValue = item => item[this.chartData.columns[0]]
                let scaleX = d3.scalePoint()
                    .domain(this.chartData.rows.map(getXValue))
                    .range([0, width - margin.left - margin.right])
                    .padding(0.5)
                let setScaleY = (yData) => {
                    return d3.scaleLinear()
                        .domain([0, yData])
                        .range([height - margin.top - margin.bottom, 0])
                }
                //设置Y轴比例尺
                let leftYAxis,rightYAxis
                let yAxis = D3Util.getYAxis(this.chartData)
                if(showLine){
                    showLine.forEach(item=>{
                        delete yAxis[item]
                    })
                }

                //如果有堆叠部分
                let yAxisStack = stack ? D3Util.getStack(this.chartSettings ,this.chartData) : {}
                let stackData = {} //堆叠部分需要叠加计算Y轴坐标
                for (let stackKey in yAxisStack){
                    stackData[stackKey] = []
                    yAxisStack[stackKey].forEach((item,index) => {
                        stackData[stackKey].push(0)
                    })
                }

                // if(axisSite) {
                //     let allYAxis = D3Util.setTwoYAxis(this.CedorUtils.deepCopy(yAxis),axisSite.right)
                //     leftYAxis = setScaleY(D3Util.setConcat({...yAxisStack,...allYAxis.leftYAxis}))
                //     rightYAxis = setScaleY(D3Util.setConcat(allYAxis.rightYAxis))
                //     // rightYAxis.tickFormat(d3.format(".0%"))
                // }else{
                //     leftYAxis = setScaleY(D3Util.setConcat({...yAxisStack,...yAxis}))
                // }

                if(axisSite) {
                    let allYAxis = D3Util.setTwoYAxis(this.CedorUtils.deepCopy(yAxis),axisSite.right)
                    leftYAxis = D3Util.setConcat({...yAxisStack,...allYAxis.leftYAxis})
                    rightYAxis = D3Util.setConcat(allYAxis.rightYAxis)
                }else{
                    leftYAxis = D3Util.setConcat({...yAxisStack,...yAxis})
                }
                let leftEle,rightEle,leftMax,rightMax
                // 通过数据,设置y轴的最大范围 Math.pow(x,y)x的y次方  Math.pow(10,最大值位数-1)算出来的最大值的整数倍
                // 目前不考虑负数(需改进)
                leftEle = Math.pow(10, d3.max(leftYAxis).toString().length - 1);
                if(axisSite) rightEle = Math.pow(10, d3.max(rightYAxis).toString().length - 1);


                // 用最大值除以整数的底数向上取整 例如 Math.ceil(7890/1000)*1000 将最大值设置为8000
                // 使用左侧Y轴 最大值
                leftMax = Math.ceil(d3.max(leftYAxis) / leftEle) * leftEle;
                // 使用右侧Y轴 最大值
                if(axisSite) rightMax =[0,Math.ceil(d3.max(rightYAxis) / rightEle) * rightEle] ;


                leftYAxis = setScaleY(leftMax)
                if(axisSite) rightYAxis = setScaleY(rightMax)

                //计算每个维度的宽度
                let xAxisIndex = this.findStackIndex(this.chartData.columns,stack)
                let singleWidth = scaleX.step() - 20
                //每个柱子的宽度
                let xAxisCount = 0
                for(let xName in xAxisIndex){
                    xAxisCount = xAxisCount >= xAxisIndex[xName] ? xAxisCount : xAxisIndex[xName]
                }
                let barWidth = singleWidth / xAxisCount - 2
                barWidth = barWidth >= maxSingleWidth ? maxSingleWidth : barWidth
                //画布
                let svg = d3.select('.D3')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

                //新增tooltip 蒙层功能
                let tooltips = d3.select('.D3')
                    .append('div')
                    .style('left', '5px')
                    .style('top', '5px')
                    .attr('class', 'tooltip')
                    .html('');

                svg.append('defs')
                    .append('clip-path')
                    .attr('id', 'body-clip')
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', width - margin.left - margin.right)
                    .attr('height', height - margin.top - margin.bottom)
                let body = svg.append('g')
                    .attr('class', 'body')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
                    // .attr('clip-path', 'url(#clipPath)')
                let shadow = body.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', scaleX.step())
                    .attr('height', leftYAxis(0))
                    .attr('fill', '#000')
                    .attr('fill-opacity', 0)


                //画柱
                /*
                * @renderStackBars  添加堆叠图方形图形
                * @data         {Array}     每个维度的数据
                * @dataName     {String}    当前维度的名称
                * @dataIndex    {Number}    当前维度的顺序
                * @xAxisIndex   {Number}    当前维度所在的X轴
                * @yAxisIndex   {Boolean}   当前维度所在的Y轴
                * */
                let renderStackBars = (data,dataName,dataIndex,xAxisIndex,yAxisIndex) => {
                    let stackName = D3Util.getStackName(dataName,stack)
                    if(stackName){
                        stackData[stackName].forEach((item,index)=>{
                            stackData[stackName][index] += data[index]
                        })
                    }
                    let currentData = stackName ? stackData[stackName] : data
                    body.append('g').selectAll('rect')
                        .data(currentData)
                        .enter()
                        .append('rect')
                        .attr('x', (d,i) => {
                            return scaleX(this.chartData.rows[i].name) + ((barWidth + 2) * xAxisIndex) - (barWidth + 2) * xAxisCount / 2 + 1
                        })
                        .attr('y', (d,i) => {
                            return yAxisIndex ? rightYAxis(d) : leftYAxis(d)
                        })
                        .attr('width', barWidth)
                        .attr('height', (d,i) => {
                            let heightData = stackName ? data[i] : d
                            let yAxis = yAxisIndex ? rightYAxis(heightData) : leftYAxis(heightData)
                            return height - margin.top - margin.bottom - yAxis
                        })
                        .attr('fill', color[dataIndex])
                        .attr('cursor','pointer')
                }
                //柱图中添加线图
                let lineYData = {}
                if(showLine){
                    showLine.forEach(item => {
                        lineYData[item] = yAxis[item]
                        delete yAxis[item]
                    })
                }



                const axisLeft = d3.axisLeft(leftYAxis).ticks(5);
                svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .attr('class', 'leftY')
                    .call(axisLeft);
                if(axisSite){
                    const axisRight = d3.axisRight(rightYAxis)
                    svg.append('g')
                        .attr('transform', `translate(${width - margin.right}, ${margin.top})`)
                        .call(axisRight)
                }
                const axisBottom = d3.axisBottom(scaleX).ticks(5);
                svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
                    .call(axisBottom);

                //添加Y轴段位的辅助线
                d3.selectAll('.leftY .tick')
                    .append('line')
                    .attr('class', 'grid-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', width - margin.left - margin.right)
                    .attr('y2', 0)



                let count = 0
                for (let key in yAxis){
                    let yAxisIndex = axisSite ? axisSite.right.includes(key) : false
                    renderStackBars(yAxis[key],key,count,xAxisIndex[key]-1,yAxisIndex)
                    count++
                }
                svg.on('mousemove',()=>{
                    let px = d3.event.offsetX;
                    let py = d3.event.offsetY;
                    // 如果鼠标在画布中
                    if(px < width - margin.right && px > margin.left && py < height - margin.bottom && py > margin.top) {
                        renderShadowAndTooltip(px, py, px - margin.left);
                    } else {
                        hideShadowAndTooltip();
                    }
                })
                let renderShadowAndTooltip = (x, y, bodyX) => {
                    // 通过当前鼠标所在坐标系中的X轴坐标/每个维度的宽度,拿到当前数据的索引值
                    let cutIndex = Math.floor(bodyX / scaleX.step());
                        // 根据鼠标移动的位置 设置tooltip 透明蒙层的位置
                    shadow.transition().duration(100).ease(d3.easeLinear).attr('fill-opacity', .12).attr('x', cutIndex * scaleX.step());
                    // 如果鼠标x方向位置 > 坐标轴宽度 - tooltip框的宽度 - 默认的左右padding值
                    if(x > width - margin.left - margin.right - tooltips.style('width').slice(0,-2) - 50) {
                        x = x - tooltips.style('width').slice(0,-2) - 50;
                    }
                    // 如果鼠标y方向位置 > 坐标轴高度 - tooltip框的高度 - 默认的上下padding值
                    if(y > height - margin.top - margin.bottom - tooltips.style('height').slice(0,-2) - 25) {
                        y = y - tooltips.style('height').slice(0,-2) - 50;
                    }
                    let currentData = this.chartData.rows[cutIndex]
                    let html = [`<span>${currentData[this.chartData.columns[0]]}</span><br>`]
                    this.chartData.columns.slice(1).forEach((item,index)=>{
                        html.push(`<span class="circle" style="background: ${color[index]};"></span><span>${item}:${currentData[item]}</span><br>`)
                    })
                    tooltips.html(html.join(' '))
                        .transition()
                        .duration(50)
                        .ease(d3.easeLinear)
                        .style('display', 'inline-block')
                        .style('opacity', 0.6)
                        .style('left', `${x + 25}px`)
                        .style('top', `${y + 25}px`);
                }
                let hideShadowAndTooltip = () => {
                    shadow.transition().duration(10).attr('fill-opacity', 0);
                    tooltips.transition().duration(50).style('opacity', 0).on('end', function () {d3.select(this).style('display', 'none')})
                }

            },
            /*
            * @columns      {Array}     X轴显示的维度
            * @stack        {Object}    堆叠的维度
            * */
            findStackIndex(columns,stack){
                let stackCount = {},step = 0
                columns.slice(1).forEach((item,index) => {
                    let count = D3Util.getStackName(item,stack)
                    if(count && stackCount[count]){
                        stackCount[item] = stackCount[count]
                    }else{
                        step++
                        stackCount[count] = step
                        stackCount[item] = step
                    }
                })
                return stackCount
            },
            createPercentStack(){
                let {
                    legendName,
                    labelMap,//所显示指标的别名 {age:'年龄'}
                    dataOrder,//根据哪个指标排序 { label: 'age', order: 'asc' } asc升序 desc降序
                    color = this.defaultColor,
                    margin = this.margin,
                    maxSingleWidth = 38
                } = this.chartSettings
                let width = document.getElementsByClassName('D3')[0].offsetWidth
                let height = document.getElementsByClassName('D3')[0].offsetHeight || 400

                //是否排序
                if(dataOrder){
                    this.chartData.rows.sort((a,b)=>{
                        return a[dataOrder.label] - b[dataOrder.label]
                    })
                    this.chartData.rows = dataOrder.order === 'asc' ? this.chartData.rows : this.chartData.rows.reverse()
                }

                let getXValue = item => item[this.chartData.columns[0]]
                let scaleX = d3.scalePoint()
                    .domain(this.chartData.rows.map(getXValue))
                    .range([0, width - margin.left - margin.right])
                    .padding(0.5)
                let yAxis = D3Util.getYAxis(this.chartData)
                let {stackCount,stackStep} = this.getStackPercent(yAxis)
                let scaleY = d3.scaleLinear()
                    .domain([0, 1])
                    .range([height - margin.top - margin.bottom, 0])

                //每个柱子的宽度
                let singleWidth = scaleX.step() - 20
                let barWidth = singleWidth >= maxSingleWidth ? maxSingleWidth : singleWidth
                //画布
                let svg = d3.select('.D3')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                //画柱
                /*
                * @renderStackBars  添加堆叠图方形图形
                * @data         {Array}     每个维度的数据
                * @dataName     {String}    当前维度的名称
                * @dataIndex    {Number}    当前维度的顺序
                * @xAxisIndex   {Number}    当前维度所在的X轴
                * @yAxisIndex   {Boolean}   当前维度所在的Y轴
                * */
                let renderStackBars = (data,dataIndex) => {
                    data.forEach((item,index)=>{
                        let percent = Math.ceil(item / (stackCount[index] - 1) * 10000) / 10000
                        stackStep[index] += percent
                    })
                    svg.append('g').selectAll('rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('x', (d,i) => {
                            return margin.left + scaleX(this.chartData.rows[i].name) - barWidth / 2
                        })
                        .attr('y', (d,i) => {
                            return scaleY(stackStep[i]) + margin.top
                        })
                        .attr('width', barWidth)
                        .attr('height', (d,i) => {
                            let percent = Math.ceil(d / (stackCount[i] - 1) * 10000) / 10000
                            return height - margin.top - margin.bottom - scaleY(percent)
                        })
                        .attr('fill', color[dataIndex])
                        .attr('cursor','pointer')
                }

                let count = 0
                for (let key in yAxis){
                    renderStackBars(yAxis[key],count)
                    count++
                }


                const axisLeft = d3.axisLeft(scaleY).ticks(5).tickFormat(d3.format(".0%"))
                svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .call(axisLeft);
                const axisBottom = d3.axisBottom(scaleX);
                svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
                    .call(axisBottom);




            },
            getStackPercent(object){
                let stackCount = [],stackStep = []
                for(let key in object){
                    object[key].forEach((item,index)=>{
                        stackCount[index] = stackCount[index] ? stackCount[index] += item : item
                        stackStep[index] = 0
                    })
                }
                return {stackCount,stackStep}
            }


        }
    }
</script>

<style>
    .D3{
        position: relative;
    }
    .tick text {
        font-size: 14px;
    }
    .grid-line {
        fill: none;
        stroke: #888;
        opacity: .4;
        shape-rendering: crispEdges;
    }
    .tooltip{
        font-size: 15px;
        width: auto;
        padding: 10px;
        height: auto;
        position: absolute;
        background-color: #000000;
        border-radius:5px;
        color: #ffffff;
        display: none;
    }
    .tooltip .circle{
        display: inline-block;
        margin-top: 2px;
        margin-right: 6px;
        width: 12px;
        height: 12px;
        border-radius:12px;
    }

</style>
