<template>
  <div id="wrapper">
    <main>
      <h1> CasparCG Excel Client</h1>
      <div id="control">
        <div id="templateControl">
          <h4>template control</h4>
          <input v-model="templateName"></input><br><br>
          <b-button class="btn-success button" @click="L3Din()" ><fa icon="play"></fa></b-button>
          <b-button class="btn-danger button" @click="L3Duit()" ><fa icon="stop"></fa></b-button>
          <b-button class="btn-warning button" @click="L3Dupdate()"><fa icon="pen"></fa> UPDATE</b-button>
        </div>
        <div id="excelControl">
          <h4>Excel</h4>
          <h4 id="filename" v-if="this.$store.state.filename">{{this.$store.state.filename}}</h4>
          <b-button class="button" @click="loadit()"><fa icon="folder-open"></fa> LOAD</b-button>
          <b-button class="button" @click="lineUp()"><fa icon="arrow-down"></fa> LINE</b-button>
          <b-button class="button" @click="lineDown()"><fa icon="arrow-up"></fa> LINE</b-button>
          <h4>Sheets</h4>
          <b-button class="btn-warning button" v-for="sheets in Object.keys(this.$store.state.raw)" @click="selectSheet(sheets)">{{sheets}}</b-button>
        </div>
        <div id="connectionControl">        
          <input v-model="CCGip"></input>
          <b-button @click="Connect(CCGip)">CONNECT</b-button>
        </div>
      </div>
      <div id="input">
        <h1>DATA</h1>
        <tr id="dataLine">
          <td v-for="(value, name, index) in this.$store.state.selected"><div class="dLine">{{name}} - {{value}}</div></td>
        </tr>
      </div>
      <div id="lijst" v-if="this.$store.state.raw[daSheet]">
        <table>
          <tr>
            <th v-for="item in this.$store.state.raw[daSheet][0]">{{item}}</th>
          </tr>          
          <tr v-for="(item, index) in this.$store.state.raw[daSheet].slice(1)">
            <td  @click="selectIt(item,index)" v-bind:class="{clicked: selectedIndex==(index + 1)}" v-for="subItem in item">{{subItem}}{{item.index}}</td>
          </tr>          
        </table>
      </div>

    </main>
  </div>
</template>

<script>
  import * as XLparser from '@/store/XLparser'
  import * as CCG from '../store/ccg'

  const { dialog } = require('electron').remote // voor laden saven naar file

  export default {
    name: 'landing-page',
    methods: {
      loadit () {
        const fileName = dialog.showOpenDialog({ title: 'Load Excel File', filters: [ { name: 'FILE', extensions: ['xlsx'] } ] })
        if (fileName === undefined) {
          return
        }
        XLparser.loadFile(fileName[0])
      },
      selectIt (i, index) {
        console.log(index)
        this.selected = this.$store.state.raw[this.daSheet][(index + 1)]
        this.selectedIndex = index + 1
        let x = {}
        x.tochange = 'selected'
        x.change = i
        this.$store.commit('changeStuff', x)
      },
      selectSheet (sheet) {
        this.daSheet = sheet
      },
      lineUp () {
        this.selectedIndex++
        this.selected = this.$store.state.raw[this.daSheet][this.selectedIndex]
        let x = {}
        x.tochange = 'selected'
        x.change = this.selected
        this.$store.commit('changeStuff', x)
      },
      lineDown () {
        this.selectedIndex--
        this.selected = this.$store.state.raw[this.daSheet][this.selectedIndex]
        let x = {}
        x.tochange = 'selected'
        x.change = this.selected
        this.$store.commit('changeStuff', x)
      },
      L3Din () {
        CCG.addTemplate(this.$store.state.selected, this.templateName)
      },
      L3Duit () {
        CCG.stop()
      },
      L3Dupdate () {
        CCG.updateTemplate(this.$store.state.selected)
      },
      Connect (ip) {
        CCG.connect(ip)
      }
    },
    computed: {
      updateChanged () {
        console.log('çomputed')
        return this.$store.getters.updateChange
      }
    },
    watch: {
      updateChanged: {
        handler (val) {
          CCG.updateTemplate(this.$store.state.selected)
        }
      }
    },
    data () {
      return {
        selected: {},
        selectedIndex: 1,
        horse: {},
        CCGip: '127.0.0.1',
        daSheet: '',
        templateName: 'veiling/veiling'
      }
    }
  }
</script>

<style>
.clicked{
  color:yellowgreen;
  background-color:black;
  border-style: solid;
  border-width: 2px;
  border-color:white;
}
tr{
  color:rgb(195, 195, 195);
  background-color: rgb(59, 59, 59);
  border-style: solid;
  border-width: 2px;
  border-color:white;  
}
th{
  background-color: rgb(59, 59, 59);
  border-style: solid;
  border-width: 2px;
  border-color:white;
  color:white;  
  position: sticky;
  top: 0px;
}
table{
  table-layout: auto;
  width:100%;
  padding:10px;
}
h1,h2,h3,h4{
  color:white;
}
#wrapper{
  position: fixed;
  background-color: black;
  width:100%;
  height:100%
}
#control{
  position: fixed;
  width:100%;
  height:20%;
  top:0%
}
#input{
  position: fixed;
  width:100%;
  height:100px;
  top:300px;
  padding:10px;
  background-color: red;
}
#lijst{
  position: fixed;
  width:100%;
  height:540px;
  top:420px;
  overflow: auto;
  padding:0px;
}
#lijstLegenda{
  position: fixed;
  width:100%;
  height:540px;
  top:340px;
  overflow: auto;
  padding:10px;
}
.dLine{
  color:white;
  font-size: 14px;
  border-style: solid;
  border-width: 2px;
  border-color: red;
  padding:10px;
}
#templateControl{
  padding:10px;
  border-style: solid;
  border-color:white;
  border-radius: 10px;
  position:absolute;
  left:20px;
  top:50px;
  width:450px;
}
#prijsControl{
  padding:10px;
  border-style: solid;
  border-color:white;
  border-radius: 10px;
  position:absolute;
  right:20px;
  top:60px;
  width:650px;
}
#excelControl{
  padding:10px;
  border-style: solid;
  border-color:white;
  border-radius: 10px;
  position:absolute;
  left:490px;
  top:50px;
  width:650px;
  height: 230px;;
}
#connectionControl{
  padding:10px;
  border-style: solid;
  border-color:white;
  border-radius: 10px;
  position:absolute;
  right:20px;
  top:50px;
  width:320px;
  height: 80px;;
}
#dataLine{
    position:fixed;
  top:310px;
  left:150px
}
input{
  margin-top:10px;
}
.button{
  margin:3px
}
#filename{
  font-size: 16px;
}
</style>
