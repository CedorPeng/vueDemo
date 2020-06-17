// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install(Vue, options) {
    Vue.prototype.htmlToCanvas = function (dom) {
      return new Promise((resolve) => {
        html2Canvas(document.querySelector(dom)).then(function (canvas) {
            resolve(canvas)
          }
        )
      })
    }
    Vue.prototype.mergeImg = function (images) {
      let height = 0, imgHeight = [];
      for (let key in images) {
        height += images[key].height
        imgHeight.push({
          name: key,
          height: images[key].height,
          width: images[key].width,
        })
      }
      const canvas = document.createElement('canvas')
      canvas.height = height;
      canvas.width = imgHeight[0].width;
      const context = canvas.getContext('2d')

      let y = 0
      imgHeight.forEach((item, index) => {
        const currentHeight = item.height
        context.drawImage(images[item.name], 0, y, 1000, currentHeight)
        y += currentHeight
      })
      return canvas
    }
    Vue.prototype.savePdf = function (canvas, title) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 592.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(title + '.pdf')
    }
  }
}
