$(function() {
  var circumference = 210;
  var circumferenceUnit = "cm";
  var chainrings = [28, 38, 48];
  var sprockets = [11, 13, 15, 18, 21, 24, 28, 32];
  var plotdata = [];
  var line;
  var color = "#4080d0"; 
  var plotoptions = {
    xaxis: {
      transform: function (v) {return Math.log(v);},
      inverseTransform: function (v) {return Math.exp(v);},
      font: {color: color}
    },
    yaxis: {
      transform: function (v) {return Math.log(v);},
      inverseTransform: function (v) {return Math.exp(v);},
      font: {color: color}
    },
    series: {
      lines: {show: true}, 
      points: {show: true}
    },
    grid: {color: color, hoverable: true}
  };
  for (var s = 0; s < sprockets.length; s++) {
    line = [];
    for (var c = 0; c < chainrings.length; c++) {
      line.push([circumference * chainrings[c] / sprockets[s], chainrings[c]]);
    }
    plotdata.push({data: line, color: "#4080d0"});
  }
  for (var c = 0; c < chainrings.length; c++) {
    line = [];
    for (var s = 0; s < sprockets.length; s++) {
      line.push([circumference * chainrings[c] / sprockets[s], chainrings[c]]);
    }
    plotdata.push({data: line, color: "#4080d0"});
  }
  var plot = $.plot("#gears-plot", plotdata, plotoptions);

  $("<div id='tooltip'></div>").css({
    position: "absolute",
    display: "none",
    border: "none",
    padding: "2px",
    "background-color": "#fff",
    opacity: 0.80
  }).appendTo("body");

  function tooltipShow(event, pos, item) {
    if (item) {
      var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
      $("#tooltip").html("Gear " + (chainrings.indexOf(~~y)+1)  + " " + y + " " + circumferenceUnit)
              .css({top: item.pageY+5, left: item.pageX+5})
              .fadeIn(200);
    } else {
      $("#tooltip").hide();
    }
  }

  $("#gears-plot").bind("plothover", tooltipShow);
});
