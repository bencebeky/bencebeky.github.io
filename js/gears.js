$(function() {
  var circumference = 210;
  var circumferenceUnit = "cm";
  var chainrings = [28, 38, 48];
  var sprockets = [11, 13, 15, 18, 21, 24, 28, 32];
  var xArray = new Array(chainrings.length);
  var plotdata = [];
  var xminvalue = Infinity;
  var xmaxvalue = 0;
  var line;
  var color = "#4080d0";
  for (var c = 0; c < chainrings.length; c++) {
    line = [];
    xArray[c] = new Array(sprockets.length);
    for (var s = 0; s < sprockets.length; s++) {
      xArray[c][s] = (circumference * chainrings[c] / sprockets[s]);
      line.push([xArray[c][s], chainrings[c]]);
      if (xArray[c][s] < xminvalue)
        xminvalue = xArray[c][s];
      if (xArray[c][s] > xmaxvalue)
        xmaxvalue = xArray[c][s];
    }
    plotdata.push({data: line, color: "#4080d0"});
  }
  for (var s = 0; s < sprockets.length; s++) {
    line = [];
    for (var c = 0; c < chainrings.length; c++) {
      line.push([xArray[c][s], chainrings[c]]);
    }
    plotdata.push({data: line, color: "#4080d0"});
  }

  var plotoptions = {
    xaxis: {
      transform: function (v) {return Math.log(v);},
      inverseTransform: function (v) {return Math.exp(v);},
      font: {color: color},
      min: 0.91 * xminvalue,
      max: 1.1 * xmaxvalue
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
      var x = item.datapoint[0];
      var y = item.datapoint[1];
      var c = chainrings.indexOf(y);
      var s = xArray[c].indexOf(x);
      $("#tooltip").html("Gear " + (c+1)  + "-" + (s+1) + ": " + x.toFixed(0) + " " + circumferenceUnit)
              .css({top: item.pageY+5, left: item.pageX+5})
              .fadeIn(200);
    } else {
      $("#tooltip").hide();
    }
  }

  $("#gears-plot").bind("plothover", tooltipShow);
});
