<template>
  <div>
    <div class="D3" style="width: 100%"></div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import * as D3Util from '../util/D3Util'

  export default {
    name: "D3Pie",
    data() {
      return {
        margin: {
          top: 40,
          right: 60,
          bottom: 40,
          left: 60,
        },
        width: 0,
        canvasWidth: 0, //画布去掉偏移量之后的宽度
        canvasHeight: 0,//画布去掉偏移量之后的高度
        dataY: [],
        columns: this.data.columns[1],
        labelMap: {},
        legendName: {},
        dataOrder: {},
        innerRadius: 0,
        outerRadius: 0,
        defaultColor: ['#38CCCB', '#0074D9', '#2FCC40', '#FEDC00', '#FF4036', 'pink'],
        series: [],
        legend: [],
        svg: null,
        body: null,
        pie: null,
        arc: null,
        arcAn: null,//移入半径的变化量
        tooltip: null,
        graphGroup: null,
        centersNumber: null,
        centersName: null,
        centersPercent: null,
      }
    },
    mounted() {
      if (this.settings.margin) this.margin = this.settings.margin
      this.dataOrder = this.settings.dataOrder || null
      this.labelMap = this.settings.labelMap || {}
      this.legendName = this.settings.legendName || {}
      this.width = document.getElementsByClassName('D3')[0].offsetWidth
      this.canvasWidth = this.width - this.margin.left - this.margin.right
      this.canvasHeight = this.height - this.margin.top - this.margin.bottom
      this.innerRadius = this.settings.innerRadius || this.canvasHeight / 8;
      this.outerRadius = this.settings.outerRadius || this.canvasHeight / 5;
      this.pie = d3.pie().sort(null).value(d => d[this.columns]);
      this.arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);
      this.arcAn = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius + 10);
      if (this.dataOrder) {
        this.data.rows.sort((a, b) => {
          return a[this.dataOrder.label] - b[this.dataOrder.label]
        })
        this.data.rows = this.dataOrder.order === 'asc' ? this.data.rows : this.data.rows.reverse()
      }
      this.dataY = JSON.parse(JSON.stringify(this.data.rows))
      this.setLegend()
      this.setSeries(this.dataY)
      this.render()
    },
    methods: {
      setLegend() {
        if (!this.columns) return this.legend
        let legendData = [], legendType = {}
        this.data.rows.forEach(item => {
          legendData.push(item.name)
          legendType[item.name] = true
        })
        this.legend = {
          data: legendData,
          type: legendType
        }
      },
      //填充的数据series
      setSeries(data) {
        if (!data) return this.series;
        this.series = data
      },
      render() {
        if (!this.tooltip) {
          this.tooltip = d3.select(`.${this.name} .D3`)
            .append('div')
            .style('left', '40px')
            .style('top', '30px')
            .attr('class', 'tooltip')
            .html('');
        }
        if (!this.svg) {
          this.svg = d3.select(`.${this.name} .D3`)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('background', '#f3f3f3')
        }
        this.renderBody()
      },
      renderBody() {
        if (!this.body) {
          this.body = this.svg.append('g')
            .attr('class', 'body')
            .attr('transform', `translate(${this.margin.left + this.canvasWidth / 2},${this.margin.top + this.canvasHeight / 2})`)
          // .attr('clip-path', 'url(#body-clip)')
          this.initAssist()
        }
        this.renderCanvas()
        this.renderGraph()
      },
      initAssist() {
        this.body.append('g').attr('class', 'pies');
        this.body.append('g').attr('class', 'lines');
        this.body.append('g').attr('class', 'texts');
        this.centersName = this.body.append('g')
          .append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dy', '-1em')
          .attr('font-size', '1.5em')
          .text('');
        this.centersNumber = this.body.append('g')
          .append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.2em')
          .attr('font-size', '1.5em')
          .text('');
        this.centersPercent = this.body.append('g')
          .append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dy', '1.2em')
          .attr('font-size', '1.5em')
          .text('');
      },
      renderCanvas() {
        let _this = this
        var pieData = this.pie(this.series);
        /*---------------------------pie----------------------------*/
        let pathUpdate = this.body.select('.pies').selectAll('path.pie').data(pieData)
        let pathEnter = pathUpdate.enter().append('path');

        pathEnter.merge(pathUpdate)
          .on('mouseover', function (d, i) {
            // _this.centersName.text(d.data.name)
            // _this.centersNumber.text(d.data[_this.columns])
            // _this.centersPercent.text(`(${(d.data[_this.columns] * 100 / d3.sum(_this.series, d => d[_this.columns])).toFixed(1)}%)`)
            d3.select(this)
              .transition()
              .duration(300)
              .ease(d3.easeElasticOut)
              .attr('d', _this.arcAn(d))
            setTimeout(_this.listenMousemove(d), 50)
          })
          .on('mouseout', function (d) {
            d3.select(this)
              .transition()
              .duration(100)
              .attr('d', _this.arc(d))
            _this.listenMouseout()
          })
          .transition()
          .duration(d => (d.endAngle - d.startAngle) * 200)
          .ease(d3.easeLinear)//easeBounceOut
          .delay(d => d.startAngle * 200)
          .attr('fill', (d, i) => this.defaultColor[i])
          .attr('class', 'pie')
          //直接画弧
          // .attr('d',d => this.arc(d))
          //过渡画弧
          .attrTween('d', d => {
            let i = d3.interpolate({startAngle: d.startAngle, endAngle: d.startAngle}, d);
            return t => this.arc(i(t))
          })

        /*---------------------------line----------------------------*/
        let polylineUpdate = this.body.select('.lines').selectAll('polyline').data(pieData);
        let polylineEnter = polylineUpdate.enter().append('polyline');

        polylineEnter.merge(polylineUpdate)
          .transition()
          .duration(500)
          .delay(1300)
          .attr('fill', 'none')
          .attr('stroke', (d, i) => this.defaultColor[i])
          .attr('points', d => {
            let direction = (d.startAngle + d.endAngle < Math.PI * 2 ? 1 : -1);
            return [this.arc.centroid(d), this.arc.centroid(d)[0] * 1.6, this.arc.centroid(d)[1] * 1.6, (this.innerRadius + this.outerRadius) * direction, this.arc.centroid(d)[1] * 1.6]
          })

        /*---------------------------text----------------------------*/
        let textsUpdate = this.body.select('.texts').selectAll('text').data(pieData);
        let textEnter = textsUpdate.enter().append('text');

        textEnter.merge(textsUpdate)
          .transition()
          .duration(500)
          .delay(1300)
          .attr('transform', d => {
            let direction = (d.startAngle + d.endAngle < Math.PI * 2 ? 1 : -1);
            return `translate(${(this.innerRadius + this.outerRadius) * direction}, ${this.arc.centroid(d)[1] * 1.6})`
          })
          .attr('fill', (d, i) => this.defaultColor[i])
          .attr('dy', '.38em')
          .attr('text-anchor', d => {
            return d.startAngle + d.endAngle < Math.PI * 2 ? 'start' : 'end'
          })
          .text(d => d.data.name)
      },
      renderGraph() {
        this.graphGroup = this.svg.append('g').attr('class', 'graphGroup')
        let ele = this.graphGroup.selectAll('g.graph-item').data(this.legend.data);

        let ent = ele.enter().append('g')
          .attr('class', 'graph-item')

        ent.append('rect')
          .attr('x', (d, i) => i * 150 + 100)
          .attr('y', 13)
          .attr('width', 25)
          .attr('height', 15)
          .attr('fill', (d, i) => {
            return this.legend.type[this.legend.data[i]] ? this.defaultColor[i] : 'lightgrey'
          })
          .style('cursor', 'pointer')

        ent.append('text')
          .attr('x', (d, i) => i * 150 + 132)
          .attr('y', 20)
          .attr('dy', '.4em')
          .attr('fill', '#444')
          .style('font-size', '13px')
          .style('cursor', 'pointer')
          .text(d => {
            return this.labelMap[d] || d
          })
          .on('click', (item, index) => {
            this.svg.selectAll('g').remove()
            this.body = null
            this.legend.type[item] = !this.legend.type[item]
            let newSeries = []
            this.dataY.forEach(item => {
              if (this.legend.type[item.name]) {
                newSeries.push(item)
              }
            })
            this.setSeries(newSeries)
            this.render();
          })
      },
      listenMousemove(d) {
        this.svg.on('mousemove', () => {
          let px = d3.event.offsetX;
          let py = d3.event.offsetY;
          let html = `<span class="circle" style="background: ${this.defaultColor[this.legend.data.indexOf(d.data.name)]};"></span><span>${d.data.name}:${d.data[this.columns]}(${(d.data[this.columns] * 100 / d3.sum(this.series, d => d[this.columns])).toFixed(1)}%)</span>`
          this.tooltip.html(html)
            .transition()
            .duration(50)
            .ease(d3.easeLinear)
            .style('display', 'inline-block')
            .style('opacity', 0.6)
            .style('left', `${px + 15}px`)
            .style('top', `${py + 15}px`);
        })
      },
      listenMouseout() {
        this.svg.on('mousemove', () => {
          this.tooltip.transition().duration(50).style('opacity', 0).on('end', function () {
            d3.select(this).style('display', 'none')
          })
        })
      },
    },
    props: {
      height: {
        // type:String,
        default: 400,
      },
      data: {
        // default: {}
        type: Object
      },
      settings: {
        type: Object
      },
      name: {
        type: String
      }
    }

  }
</script>

<style>
  .D3 {
    position: relative;
  }

  .tooltip {
    font-size: 15px;
    width: auto;
    padding: 10px;
    height: auto;
    position: absolute;
    background-color: #000000;
    border-radius: 5px;
    color: #ffffff;
    display: none;
  }

  .tooltip .circle {
    display: inline-block;
    margin-top: 2px;
    margin-right: 6px;
    width: 12px;
    height: 12px;
    border-radius: 12px;
  }

</style>
