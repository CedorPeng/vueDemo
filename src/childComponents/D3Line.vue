<template>
    <div class="D3" style="width: 100%">
    </div>
</template>

<script>
    import * as d3 from 'd3'
    import * as D3Util from '../util/D3Util'
    export default {
        name: "D3Line",
        data(){
            return {
                margin : {
                    top: 60,
                    right: 60,
                    bottom: 40,
                    left: 60,
                },
                defaultColor : ['#38CCCB', '#0074D9', '#2FCC40', '#FEDC00', '#FF4036', 'lightgrey'],
                width : 0,
                canvasWidth : 0, //画布去掉偏移量之后的宽度
                canvasHeight : 0,//画布去掉偏移量之后的高度
                dataY : [],//传过来的数据不变,不涉及点击改变
                columns : this.data.columns.slice(1),
                series : [],
                dataX : this.data.rows.map(item => item[this.data.columns[0]]),//X轴的数据
                color : d3.scaleOrdinal(d3.schemeCategory10),
                svg : null,
                body : null,
                scaleX : null,
                scaleY : null,
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
                lineStyle:''
            }
        },
        mounted(){
            this.width = document.querySelectorAll(`.D3`)[0].offsetWidth
            this.canvasWidth = this.width - this.margin.left - this.margin.right
            this.canvasHeight = this.height - this.margin.top - this.margin.bottom
            this.xStart = this.margin.left
            this.xEnd = this.width - this.margin.right
            this.yStart = this.height - this.margin.bottom
            this.yEnd = this.margin.top
            //根据X轴显示内容设置x轴比例尺
            this.scaleX = d3.scaleBand().range([0, this.canvasWidth]).paddingInner(1).align(0).domain(this.dataX)
            this.scaleY = d3.scaleLinear().range([this.canvasHeight, 0])
            this.lineStyle = this.settings.lineStyle || ''
            this.columns.forEach(item => {
                let data =  this.data.rows.map(rowsItem => rowsItem[item])
                this.dataY.push({name:item,data})
            })
            this.setSeries(this.dataY)

            this.render()
        },
        methods:{
            /*
            *
            * 1.处理数据setSeries
            * 2.画线和描点
            * 3.添加lenged并且添加点击事件
            *
            *
            * 之所以有setSeries的操作是因为后面的点击事件仅仅需要处理series,原数据不能直接处理
            * */
            render(){
                if(!this.tooltip) {
                    this.tooltip = d3.select(`.${this.name}.D3`)
                        .append('div')
                        .style('left', '40px')
                        .style('top', '30px')
                        .attr('class', 'tooltip')
                        .html('');
                }
                if(!this.svg) {
                    this.svg = d3.select(`.${this.name}.D3`)
                        .append('svg')
                        .attr('width', this.width)
                        .attr('height', this.height)
                        .style('background', '#f3f3f3')
                    this.renderClipPath();
                    this.initGraph();
                }
                this.renderAxes();
                this.renderBody()
            },
            //填充的数据series
            setSeries(data){
                if(!data) return this.series;
                this.series = data
                let maxY = this.selectMaxYNumber(this.series)
                this.setScaleY([0, maxY])
            },
            setScaleY(a){
                this.scaleY = this.scaleY.domain(a)
            },
            renderClipPath() {
                this.svg.append('defs')
                    .append('clipPath')
                    .attr('id', 'body-clip')
                    .append('rect')
                    .attr('x', 0 - this.activeR - 1)
                    .attr('y', 0)
                    .attr('width', this.canvasWidth + (this.activeR + 1) * 2)
                    .attr('height', this.canvasHeight)
            },
            initGraph() {
                let graph = this.svg.append('defs')
                    .append('g')
                    .attr('id', 'graph')

                graph.append('line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 30)
                    .attr('y2', 0)
                    .style('stroke', 'inherit')

                graph.append('circle')
                    .attr('cx', 15)
                    .attr('cy', 0)
                    .attr('r', 6.5)
                    .attr('stroke', 'inherit')
                    .attr('fill', '#fff')

                this.graphGroup = this.svg.append('g').attr('class', 'graphGroup')
            },
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
                let yAxis = d3.axisLeft().scale(this.scaleY).ticks(this.ticks);
                this.axes.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', `translate(${this.xStart}, ${this.yEnd})`)
                    .call(yAxis)

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
                    this.renderTransLine()
                }
                this.renderLines();
                this.renderDots();
                this.renderGraph();
                this.listenMousemove();
            },
            renderTransLine() {
                this.transLine = this.body.append('line')
                    .attr('class', 'trans-line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', this.scaleY(0))
                    .attr('stroke-opacity', 0)
            },
            renderLines() {
                let line = d3.line()
                    .x((d,i) => this.scaleX(this.dataX[i]))
                    .y(d => this.scaleY(d))

                let lineElements = this.body
                    .selectAll('path.line')
                    .data(this.series);

                let lineEnter =  lineElements
                    .enter()
                    .append('path')
                    .attr('class', (d,i) => 'line _' + i)
                    .attr('d', d => line(d.data.map(v => 0)))
                    .attr('stroke', (d,i) => this.color(i))
                    .attr('stroke-dasharray', this.lineStyle)
                let lineUpdate = lineEnter
                    .merge(lineElements)
                    .transition()
                    .duration(500)
                    .ease(d3.easeCubicOut)
                    .attr('d', d => line(d.data))
                let lineExit = lineElements
                    .exit()
                    .transition()
                    .attr('d', d => line(d.data))
                    .remove();
            },
            renderDots() {
                this.series.forEach((d,i) => {
                    let dotElements = this.body
                        .selectAll('circle._' + i)
                        .data(d.data);

                    let dotEnter =  dotElements
                        .enter()
                        .append('circle')
                        .attr('class', (v, index) => 'dot _' + i + ' index_' + index)
                        .attr('cx', (d,i) => this.scaleX(this.dataX[i]))
                        .attr('cy', d => this.scaleY(d))
                        .attr('r', 1e-6)
                        .attr('stroke', (d,i) => this.color(i))
                        .attr('cursor','pointer')

                    let dotUpdate = dotEnter
                        .merge(dotElements)
                        .transition()
                        .duration(50)
                        .ease(d3.easeCubicOut)
                        .attr('cx', (d,i) => this.scaleX(this.dataX[i]))
                        .attr('cy', d => this.scaleY(d))
                        .attr('r', 2)

                    let dotExit = dotElements
                        .exit()
                        // .transition()
                        // .attr('r', 1)
                        .remove();
                })
                this.dataX.forEach((d,i) => {
                    d3.selectAll('circle._' + i)
                        .attr('stroke', this.color(i))
                })
            },
            renderGraph() {
                let ele = this.graphGroup.selectAll('g.graph-item').data(this.dataY);

                let ent = ele.enter().append('g')
                    .attr('class', 'graph-item')

                ent.append('use')
                    .attr('x', (d,i) => i * 150 + 100)
                    .attr('y', 20)
                    .attr('xlink:href', '#graph')
                    .attr('stroke', (d,i) => this.color(i))
                    .style('cursor', 'pointer')

                ent.append('text')
                    .attr('x', (d,i) => i * 150 + 132)
                    .attr('y', 20)
                    .attr('dy', '.4em')
                    .attr('fill', '#444')
                    .style('font-size', '13px')
                    .style('cursor', 'pointer')
                    .text(d => d.name)
                    .on('click', item => {
                        let index = this.series.map(d => d.name).indexOf(item.name);
                        if(this.series[index]['data'].length == 0) {
                            this.setSeries(this.series.map((d,i) => {
                                if(i == index) {
                                    return this.dataY[index]
                                } else {
                                    return d;
                                }
                            }))
                        } else {
                            this.setSeries(this.series.map((d,i) => {
                                if(i == index) {
                                    return {
                                        name: d.name,
                                        data: []
                                    }
                                } else {
                                    return d
                                }
                            }))
                        }
                        this.render();
                    })
            },
            listenMousemove() {
                this.svg.on('mousemove', () => {
                    let px = d3.event.offsetX;
                    let py = d3.event.offsetY;
                    if(px < this.xEnd && px > this.xStart && py < this.yStart && py > this.yEnd) {
                        this.renderTransLineAndTooltip(px, py, px - this.xStart);
                    } else {
                        this.hideTransLineAndTooltip();
                    }
                })
                this.svg.on('mouseout', () => {
                    this.hideTransLineAndTooltip();
                })
            },
            renderTransLineAndTooltip(x, y, bodyX) {
                //鼠标悬浮的index
                let everyWidth = this.scaleX.step()
                let cutIndex = Math.floor((bodyX + everyWidth / 2) / everyWidth);
                //提示线位置
                this.transLine.transition().duration(50).ease(d3.easeLinear).attr('x1', cutIndex * everyWidth).attr('x2', cutIndex * everyWidth).attr('stroke-opacity', 1);
                // dot圆圈动画
                d3.selectAll('circle.dot').transition().duration(50).ease(d3.easeCubicOut).attr('r', 2)
                d3.selectAll('circle.index_' + cutIndex).transition().duration(50).ease(d3.easeBounceOut).attr('r', this.activeR)
                //提示框位置和内容
                if(x > this.canvasWidth - this.tooltip.style('width').slice(0,-2) - this.padding * 2) {
                    x = x - this.tooltip.style('width').slice(0,-2) - this.padding * 2 - this.offset * 2;
                }
                if(y > this.canvasHeight - this.tooltip.style('height').slice(0,-2) - this.padding * 2) {
                    y = y - this.tooltip.style('height').slice(0,-2) - this.padding * 2 - this.offset * 2;
                }
                let str = `<div style="text-align: center">${this.dataX[cutIndex]}</div>`;
                this.series.forEach((d, i) => {
                    if(d.data.length != 0) {
                        str = str + `<div style="width: 15px;height: 15px;vertical-align: middle;margin-right: 5px;border-radius: 50%;display: inline-block;background: ${this.color(i)};"></div>${d.name}<span style="display: inline-block;margin-left: 20px">${d['data'][cutIndex]}</span><br/>`
                    }
                })
                this.tooltip
                    .html(str)
                    .transition()
                    .duration(50)
                    .ease(d3.easeLinear)
                    .style('display', 'inline-block')
                    .style('opacity', .6)
                    .style('left', `${x + this.offset + this.padding}px`)
                    .style('top', `${y + this.offset + this.padding}px`);
            },
            hideTransLineAndTooltip() {
                this.transLine.transition().duration(10).ease(d3.easeLinear).attr('stroke-opacity', 0);
                d3.selectAll('circle.dot').transition().duration(50).ease(d3.easeCubicOut).attr('r', 2);
                this.tooltip.transition().duration(10).style('opacity', 0).on('end', function () {d3.select(this).style('display', 'none')});
            },
            selectMaxYNumber(arr) {
                let temp = [];
                arr.forEach(item => temp.push(...item.data));
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
    .domain {
        stroke-width: 2;
        fill: none;
        stroke: #888;
        shape-rendering: crispEdges;
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
    .trans-line {
        fill: none;
        stroke: #666;
        opacity: .4;
    }
    .line {
        fill: none;
        stroke-width: 2;
    }
    .dot {
        fill: #fff;
    }
    .tooltip{
        font-size: 15px;
        width: auto;
        padding: 10px;
        height: auto;
        position: absolute;
        background-color: #000000;
        opacity: .6;
        border-radius:5px;
        color: #ffffff;
        display: none;
    }

</style>
