<template>
    <div>
        <div class="D3" style="width: 100%"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import * as D3Util from '../util/D3Util'
    export default {
        name: "D3Bar",
        data(){
            return {
                margin : {
                    top: 60,
                    right: 60,
                    bottom: 40,
                    left: 60,
                },
                defaultColor : ['#38CCCB', '#0074D9', '#2FCC40', '#FEDC00', '#FF4036', 'pink'],
                width : 0,
                canvasWidth : 0, //画布去掉偏移量之后的宽度
                canvasHeight : 0,//画布去掉偏移量之后的高度
                dataY : [],//传过来的数据不变,不涉及点击改变
                axisSite:null,//设置数据所对应的Y轴
                labelMap:{},//设置指标的别名,同时作用于legend和tooltip显示的指标
                legendName:{},//设置legend的别名,会根据labelMap的别名进行设置,labelMap先生效
                showLine:null,
                dataOrder:null,
                stack:null,
                yAxisStack : {},//堆叠之后会增大Y轴显示范围
                stackCount : {},//画柱时,需要计算起点,加上堆叠所在维度的其他值
                stackIndex : {},//数据所对应的柱的位置
                xCount:0,
                barWidth:0,
                maxSingleWidth:38,
                lineY : [],//需要显示为折线的数据
                columns : this.data.columns.slice(1),
                series : [],
                legend:[],
                dataX : this.data.rows.map(item => item[this.data.columns[0]]),//X轴的数据
                color : d3.scaleOrdinal(d3.schemeCategory10),
                svg : null,
                body : null,
                shadow:null,
                scaleX : null,
                scaleLeftY : null,
                scaleRightY : null,
                tooltip : null,
                transLine : null,
                graphGroup : null,
                axes : null,
                xStart : 0,
                xEnd : 0,
                yStart : 0,
                yEnd : 0,
                activeR : 5,
                ticks : 5,
                padding : 10,
                offset : 35,

            }
        },
        mounted(){
            if(this.settings.margin) this.margin = this.settings.margin
            this.dataOrder = this.settings.dataOrder || null
            this.stack = this.settings.stack || null
            this.axisSite = this.settings.axisSite || null
            this.labelMap = this.settings.labelMap || {}
            this.legendName = this.settings.legendName || {}
            this.showLine = this.settings.showLine || []
            this.width = document.getElementsByClassName('D3')[0].offsetWidth
            this.canvasWidth = this.width - this.margin.left - this.margin.right
            this.canvasHeight = this.height - this.margin.top - this.margin.bottom
            this.xStart = this.margin.left
            this.xEnd = this.width - this.margin.right
            this.yStart = this.height - this.margin.bottom
            this.yEnd = this.margin.top
            //根据X轴显示内容设置x轴比例尺
            this.scaleX = d3.scalePoint().domain(this.dataX).range([0, this.canvasWidth]).padding(0.5)
            this.xCount = this.columns.length - this.showLine.length
            let everyWidth = (this.scaleX.step() - 20) / this.xCount
            this.barWidth = everyWidth > this.maxSingleWidth ? this.maxSingleWidth : everyWidth;
            //处理排序
            if(this.dataOrder){
                this.data.rows.sort((a,b)=>{
                    return a[this.dataOrder.label] - b[this.dataOrder.label]
                })
                this.data.rows = this.dataOrder.order === 'asc' ? this.data.rows : this.data.rows.reverse()
            }
            this.columns.forEach(item => {
                let data =  this.data.rows.map(rowsItem => rowsItem[item])
                this.dataY.push({name:item,data,type:this.showLine.includes(item)? 'line':'bar'})
            })
            this.setLegend()
            this.setSeries(this.dataY)
            this.render()
        },
        methods:{
            setLegend(){
                if(this.columns.length === 0) return this.legend
                let legendData = [],legendType = {}
                this.columns.forEach(item=>{
                    legendData.push(item)
                    legendType[item] = true
                })
                this.legend = {
                    data:legendData,
                    type:legendType
                }
            },
            //填充的数据series
            setSeries(data){
              console.log(data);
              if(!data) return this.series;
                this.series = data
                this.yAxisStack = {}
                this.stackCount = {}
                let getMaxArr = []
                //处理堆叠所涉及的数据
                if(this.stack){
                    for(let key in this.stack){
                        this.yAxisStack[key] = []
                        this.stackCount[key] = []
                        this.series.forEach(item=>{
                            getMaxArr.push(...item.data)
                            if(this.stack[key].includes(item.name)){
                                if(this.yAxisStack[key].length === 0){
                                    this.yAxisStack[key] = JSON.parse(JSON.stringify(item.data))
                                    this.stackCount[key] = item.data.map(() => 0)
                                }else{
                                    item.data.forEach((dataItem,index)=>{
                                        this.yAxisStack[key][index] += dataItem
                                    })
                                }
                            }
                        })
                        getMaxArr.push(...this.yAxisStack[key])
                    }
                    this.xCount = 0
                    this.stackIndex = {}
                    this.series.forEach(item=>{
                        let stackName = D3Util.getStackName(item.name,this.stack)
                        if(stackName && this.stackIndex[stackName]){
                            this.stackIndex[item.name] = this.stackIndex[stackName]
                        }else{
                            if(item.type === 'bar'){
                                this.xCount++
                                this.stackIndex[stackName] = this.xCount
                                this.stackIndex[item.name] = this.xCount
                            }
                        }
                    })
                    let everyWidth = (this.scaleX.step() - 20) / this.xCount
                    this.barWidth = everyWidth > this.maxSingleWidth ? this.maxSingleWidth : everyWidth;
                }
                else{
                    this.xCount = 0
                    this.stackIndex = {}
                    this.series.forEach((item,index)=>{
                        if(!this.showLine.includes(item.name)) {
                          this.xCount++
                          this.stackIndex[item.name] = this.xCount
                        }
                    })
                }
                if(this.axisSite){
                    this.setYAxis()
                }else{
                    this.series.forEach(item=>{getMaxArr.push(...item.data)})
                    let maxY = this.selectMaxYNumber(getMaxArr)
                    this.scaleLeftY = this.setScaleY([0, maxY])
                }
            },
            render(){
                if(!this.tooltip) {
                    this.tooltip = d3.select(`.${this.name} .D3`)
                        .append('div')
                        .style('left', '40px')
                        .style('top', '30px')
                        .attr('class', 'tooltip')
                        .html('');
                }
                if(!this.svg) {
                    this.svg = d3.select(`.${this.name} .D3`)
                        .append('svg')
                        .attr('width', this.width)
                        .attr('height', this.height)
                        .style('background', '#f3f3f3')
                }
                this.renderAxes();
                this.renderBody()
            },
            //如果有右Y轴
            setYAxis(){
                let leftData=[],rightData=[]
                this.series.forEach(item=>{
                    if(this.axisSite.right.includes(item.name)){
                        rightData.push(...item.data)
                    }else{
                        leftData.push(...item.data)
                    }
                })
                if(this.stack){
                    for(let key in this.yAxisStack){
                        leftData.push(...this.yAxisStack[key])
                    }
                }
                let maxLeft = this.selectMaxYNumber(leftData)
                let maxRight = this.selectMaxYNumber(rightData)
                this.scaleLeftY = this.setScaleY([0, maxLeft])
                this.scaleRightY = this.setScaleY([0, maxRight])
            },
            //设置坐标轴
            renderAxes() {
                if(!this.axes) {
                    this.axes = this.svg.append('g')
                        .attr('class', 'axes');
                } else {
                    this.axes.remove();
                    this.axes = this.svg.append('g')
                        .attr('class', 'axes');
                }
                this.renderXAxis();
                this.renderYAxis();
            },
            renderXAxis() {
                let xAxis = d3.axisBottom().scale(this.scaleX).ticks(this.dataX.length);
                this.axes.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', `translate(${this.xStart}, ${this.yStart})`)
                    .call(xAxis)
                d3.selectAll('g.x .tick text')
                    .data(this.dataX)
                    .enter()
            },
            renderYAxis() {
                let yLeftAxis = d3.axisLeft().scale(this.scaleLeftY).ticks(this.ticks);
                this.axes.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', `translate(${this.xStart}, ${this.yEnd})`)
                    .call(yLeftAxis)
                if(this.axisSite){
                    let axisRight = d3.axisRight().scale(this.scaleRightY).ticks(this.ticks);
                    this.axes.append('g')
                        .attr('transform', `translate(${this.xEnd}, ${this.yEnd})`)
                        .call(axisRight)
                }

                d3.selectAll('.y .tick')
                    .append('line')
                    .attr('class', 'grid-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', this.canvasWidth)
                    .attr('y2', 0)
            },
            renderBody() {
                if(!this.body) {
                    this.body = this.svg.append('g')
                        .attr('class', 'body')
                        .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
                        .attr('clip-path', 'url(#body-clip)')
                    this.renderShadow()
                }
                this.renderCanvas()
                this.renderGraph()
                this.listenMousemove()
            },
            // 添加tooltip透明层
            renderShadow() {
                this.shadow = this.body.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', this.scaleX.step())
                    .attr('height', this.scaleLeftY(0))
                    .attr('fill', '#000')
                    .attr('fill-opacity', 0)
            },
            renderCanvas(){
                let line = []
                this.series.forEach(item=>{
                    if(item.type === 'bar'){
                        this.renderBar(item)
                    }else{
                        line.push(item)
                    }

                })
                if(this.showLine.length !== 0){
                    this.renderLines(line)
                    this.renderDots(line)
                }
            },
            renderBar(item){
                let yAxis = false
                if(this.axisSite){
                    yAxis = this.axisSite.right.includes(item.name)
                }
                let stackName = D3Util.getStackName(item.name,this.stack)
                if(stackName){
                    item.data.forEach((stackItem,stackIndex)=>{
                        this.stackCount[stackName][stackIndex] += stackItem
                    })
                }
                let currentData = stackName ? this.stackCount[stackName] : item.data
                this.body.append('g').selectAll('rect')
                    .data(currentData)
                    .enter()
                    .append('rect')
                    .attr('x', (d,i) => {
                        return this.scaleX(this.dataX[i]) + (this.barWidth + 2) * (this.stackIndex[item.name] - 1 - this.xCount / 2) + 1
                    })
                    .attr('y', (d,i) => {
                        return yAxis ? this.scaleRightY(d) : this.scaleLeftY(d)
                    })
                    .attr('width', this.barWidth)
                    .attr('height', (d,i) => {
                        let heightData = stackName ? item.data[i] : d
                        let ySite = yAxis ? this.scaleRightY(heightData) : this.scaleLeftY(heightData)
                        return this.height - this.margin.top - this.margin.bottom - ySite
                    })
                    .attr('fill', this.defaultColor[this.legend.data.indexOf(item.name)])
                    .attr('cursor','pointer')
            },
            renderLines(series){
                let line = d3.line()
                    .x((d,i) => this.scaleX(this.dataX[i]))
                    .y(d => {
                        return this.scaleRightY(d)
                    })
                this.body.selectAll('path.line')
                    .data(series)
                    .enter()
                    .append('path')
                    .attr('class', (d,i) => 'line _' + i)
                    .attr('d', d => line(d.data))
                    .attr('stroke', (d,i) => this.defaultColor[this.legend.data.indexOf(series[i].name)])
            },
            renderDots(series) {
                series.forEach((item,i) => {
                    this.body
                        .selectAll('circle._' + i)
                        .data(item.data)
                        .enter()
                        .append('circle')
                        .attr('class', (v, index) => 'dot _' + i + ' index_' + index)
                        .attr('cx', (d,i) => this.scaleX(this.dataX[i]))
                        .attr('cy', d => {
                            // let yAxisIndex = this.axisSite && this.axisSite.right.includes(item.name) ? this.scaleRightY : this.scaleLeftY
                            return this.scaleRightY(d)
                        })
                        .attr('r', 2)
                        .attr('stroke', (d,i) => this.defaultColor[this.legend.data.indexOf(item.name)])
                        .attr('cursor','pointer')
                })
            },
            renderGraph() {
                this.graphGroup = this.svg.append('g').attr('class', 'graphGroup')
                let ele = this.graphGroup.selectAll('g.graph-item').data(this.legend.data);

                let ent = ele.enter().append('g')
                    .attr('class', 'graph-item')

                ent.append('rect')
                    .attr('x', (d,i) => i * 150 + 100)
                    .attr('y', 13)
                    .attr('width', 25)
                    .attr('height', 15)
                    .attr('fill', (d,i) => {
                        return this.legend.type[this.legend.data[i]] ? this.defaultColor[i] : 'lightgrey'
                    })
                    .style('cursor', 'pointer')

                ent.append('text')
                    .attr('x', (d,i) => i * 150 + 132)
                    .attr('y', 20)
                    .attr('dy', '.4em')
                    .attr('fill', '#444')
                    .style('font-size', '13px')
                    .style('cursor', 'pointer')
                    .text(d => {
                        return this.labelMap[d] || d
                    })
                    .on('click', (item,index) => {
                        this.body.selectAll('g').remove()
                        this.body.selectAll('path').remove()
                        this.body.selectAll('circle').remove()
                        this.legend.type[item] = !this.legend.type[item]
                        let newSeries = []
                        this.dataY.forEach(item=>{
                            if(this.legend.type[item.name]){
                                newSeries.push(item)
                            }
                        })
                        this.setSeries(newSeries)
                        this.render();
                    })
            },
            listenMousemove(){
                this.svg.on('mousemove',()=>{
                    let px = d3.event.offsetX;
                    let py = d3.event.offsetY;
                    // 如果鼠标在画布中
                    if(px < this.width - this.margin.right && px > this.margin.left && py < this.height - this.margin.bottom && py > this.margin.top) {
                        this.renderShadowAndTooltip(px, py, px - this.margin.left);
                    } else {
                        this.hideShadowAndTooltip();
                    }
                })
                this.svg.on('mouseout',()=>{
                    this.hideShadowAndTooltip();
                })
            },
            renderShadowAndTooltip(x, y, bodyX){
                // 通过当前鼠标所在坐标系中的X轴坐标/每个维度的宽度,拿到当前数据的索引值
                let cutIndex = Math.floor(bodyX / this.scaleX.step());
                // 根据鼠标移动的位置 设置tooltip 透明蒙层的位置
                this.shadow.transition().duration(50).ease(d3.easeLinear).attr('fill-opacity', .12).attr('x', cutIndex * this.scaleX.step());
                // 如果鼠标x方向位置 > 坐标轴宽度 - tooltip框的宽度 - 默认的左右padding值
                if(x >= this.width - this.margin.left - this.margin.right - this.tooltip.style('width').slice(0,-2)) {
                    x = x - this.tooltip.style('width').slice(0,-2) - 50;
                }
                // 如果鼠标y方向位置 > 坐标轴高度 - tooltip框的高度 - 默认的上下padding值
                if(y >= this.height - this.margin.top - this.margin.bottom - this.tooltip.style('height').slice(0,-2)) {
                    y = y - this.tooltip.style('height').slice(0,-2) - 50;
                }
                let currentData = this.data.rows[cutIndex]
                let html = [`<span>${this.dataX[cutIndex]}</span><br>`]
                this.series.forEach((item,index)=>{
                    let name = this.labelMap[item.name] || item.name
                    html.push(`<span class="circle" style="background: ${this.defaultColor[this.legend.data.indexOf(item.name)]};"></span><span>${this.legendName[name] || name  }:${currentData[item.name]}</span><br>`)
                })
                this.tooltip.html(html.join(' '))
                    .transition()
                    .duration(50)
                    .ease(d3.easeLinear)
                    .style('display', 'inline-block')
                    .style('opacity', 0.6)
                    .style('left', `${x + 25}px`)
                    .style('top', `${y + 25}px`);
            },
            hideShadowAndTooltip(){
                this.shadow.transition().duration(10).attr('fill-opacity', 0);
                this.tooltip.transition().duration(50).style('opacity', 0).on('end', function () {d3.select(this).style('display', 'none')})
            },
            setScaleY(data){
                return d3.scaleLinear().range([this.canvasHeight, 0]).domain(data)
            },
            selectMaxYNumber(temp) {
                if(temp.length == 0) return 0;
                let max = d3.max(temp);
                let base = Math.pow(10, max.toString().length - 1);
                //获取Y轴最大值
                if(max / base < 1.4) {
                    return 1.4 * base;
                } else if (max  / base < 2) {
                    return 2 * base;
                } else if (max  / base < 3) {
                    return 3 * base;
                } else if (max  / base < 4) {
                    return 4 * base;
                } else if (max  / base < 5) {
                    return 5 * base;
                } else if (max  / base < 6) {
                    return 6 * base;
                } else if (max  / base < 7) {
                    return 7 * base;
                } else if (max  / base < 8) {
                    return 8 * base;
                } else if (max  / base < 9) {
                    return 9 * base;
                } else if (max  / base < 10) {
                    return 10 * base;
                }
            }

        },
        props:{
            height:{
                // type:String,
                default:400,
            },
            data:{
                // default: {}
                type:Object
            },
            settings:{
                type:Object
            },
            name:{
                type:String
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
    .line {
        fill: none;
        stroke-width: 2;
    }
    .dot {
        fill: #fff;
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
