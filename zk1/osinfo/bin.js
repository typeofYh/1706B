var _ = require('lodash');
var ps = require('current-processes');
var blessed = require('blessed');
let contrib = require('blessed-contrib');
 
// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

var line = contrib.line(
    { style:
      { line: "yellow"
      , text: "green"
      , baseline: "yellow"}
    , xLabelPadding: 3
    , xPadding: 5
    , showLegend: true
    , wholeNumbersOnly: false //true=do not show fraction in y axis
})

function draw(){
    ps.get(function(err, processes) {
        var sorted = _.sortBy(processes, 'cpu');
        var top5  = sorted.reverse().splice(0, 5);
        var series1 = {
            title: 'cpu',
            x: top5.map((item,key)=>{
                return ''+((key+1)*5)
            }),
            y: top5.map((item,key)=>item.cpu)
        }
        screen.append(line) //must append before setting data
        line.setData([series1])
        screen.render()
    });
}

draw();

setInterval(()=>{
    draw();
},1000)




