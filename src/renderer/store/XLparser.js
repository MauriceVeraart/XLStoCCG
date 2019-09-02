import Store from './mystore.js'

const excelToJson = require('convert-excel-to-json')

function loadFile (name) {
  const result = excelToJson({
    sourceFile: name,
    header: {rows: 0},
    columnToKey: {
      '*': '{{columnHeader}}'
    }
  })
  let x = {}
  x.tochange = 'raw'
  x.change = result
  Store.commit('changeStuff', x)
  x.tochange = 'filename'
  x.change = name
  Store.commit('changeStuff', x)
}

export { loadFile }
