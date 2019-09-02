// import Store from './mystore'

const {CasparCG} = require('casparcg-connection')
var CCG1 = new CasparCG()

// CCG1.host = '192.168.0.5'
// CCG1.connect()
// console.log('SIDESCRIPT')

function addTemplate (obj, name) {
  // CCG1.cgUpdate(1, 20, 1, obj)
  CCG1.cgAdd(1, 20, 1, name, true, obj)
}

function updateTemplate (obj) {
  console.log(obj)
  CCG1.cgUpdate(1, 20, 1, obj)
}

function stop () {
  CCG1.cgStop(1, 20, 1)
}

function playClip (name) {
  CCG1.play(1, 10, name, true, 'MIX', 25)
}

function connect (ip) {
  CCG1.host = ip
  CCG1.connect()
}

export { addTemplate, stop, playClip, updateTemplate, connect }
