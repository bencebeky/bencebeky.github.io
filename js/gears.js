function plotFigure() {
  function inputToIntArray(element) {
    var strings = $(element).val().split(",");
    var answer = new Array(strings.length);
    for (var i = 0; i < strings.length; i++)
      answer[i] = parseInt(strings[i]);
    return answer;
  }
  var chainrings = inputToIntArray("#chainrings");
  var sprockets = inputToIntArray("#sprockets");
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumference = parseFloat(circumferenceArray[0]);
  var circumferenceUnit;
  if (circumferenceArray.length > 1)
    circumferenceUnit = circumferenceArray[1];
  else
    circumferenceUnit = "cm";
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
      $("#tooltip").html("Gear " + (c+1)  + "-" + (sprockets.length-s) + ": " + x.toFixed(0) + " " + circumferenceUnit)
              .css({top: item.pageY+5, left: item.pageX+5})
              .fadeIn(200);
    } else {
      $("#tooltip").hide();
    }
  }

  $("#gears-plot").bind("plothover", tooltipShow);
}

function chainringListSelect(event) {
  $("#chainrings").val($("#chainring-list").val());
  if (event)
    plotFigure();
}

function sprocketListSelect(event) {
  $("#sprockets").val($("#sprocket-list").val());
  if (event)
    plotFigure();
}

function circumferenceListSelect(event) {
  var circumference = $("#circumference-list").val();
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumferenceUnit = "mm";
  if (circumferenceArray.length > 1) {
    circumferenceUnit = circumferenceArray[1];
    if (circumferenceUnit.toLowerCase().search("cm") != -1) {
      circumference /= 10.0;
      circumference = circumference.toFixed(1);
    } else if (circumferenceUnit.toLowerCase().search("in") != -1) {
      circumference /= 25.4;
      circumference = circumference.toFixed(1);
    } else {
      circumferenceUnit = "mm";
    }
  }
  $("#circumference").val(circumference + " " + circumferenceUnit);
  if (event) {
    circumferenceChange();
  }
}

function unitCm(event) {
  $("#cm").css("background-color", "#4080d0");
  $("#mm").css("background-color", "#ffffff");
  $("#in").css("background-color", "#ffffff");
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumference = parseFloat(circumferenceArray[0]);
  var circumferenceUnit;
  if (circumferenceArray.length > 1) {
    circumferenceUnit = circumferenceArray[1];
    if (circumferenceUnit.toLowerCase().search("mm") != -1)
      circumference /= 10.0;
    else if (circumferenceUnit.toLowerCase().search("in") != -1)
      circumference *= 2.54;
  }
  $("#circumference").val(circumference.toFixed(1) + " cm");
  plotFigure();
}

function unitMm(event) {
  $("#cm").css("background-color", "#ffffff");
  $("#mm").css("background-color", "#4080d0");
  $("#in").css("background-color", "#ffffff");
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumference = parseFloat(circumferenceArray[0]);
  var circumferenceUnit;
  if (circumferenceArray.length > 1) {
    circumferenceUnit = circumferenceArray[1];
    if (circumferenceUnit.toLowerCase().search("cm") != -1)
      circumference *= 10.0;
    else if (circumferenceUnit.toLowerCase().search("in") != -1)
      circumference *= 25.4;
  }
  $("#circumference").val(circumference.toFixed(1) + " mm");
  plotFigure();
}

function unitIn(event) {
  $("#cm").css("background-color", "#ffffff");
  $("#mm").css("background-color", "#ffffff");
  $("#in").css("background-color", "#4080d0");
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumference = parseFloat(circumferenceArray[0]);
  var circumferenceUnit;
  if (circumferenceArray.length > 1) {
    circumferenceUnit = circumferenceArray[1];
    if (circumferenceUnit.toLowerCase().search("cm") != -1)
      circumference /= 2.54;
    else if (circumferenceUnit.toLowerCase().search("mm") != -1)
      circumference /= 25.4;
  }
  $("#circumference").val(circumference.toFixed(1) + " in");
  plotFigure();
}

function circumferenceChange(event) {
  var circumferenceArray = $("#circumference").val().split(" ");
  var circumferenceUnit = null;
  if (circumferenceArray.length > 1)
    circumferenceUnit = circumferenceArray[1];
  if (circumferenceUnit.toLowerCase().search("cm") != -1) {
    $("#cm").css("background-color", "#4080d0");
    $("#mm").css("background-color", "#ffffff");
    $("#in").css("background-color", "#ffffff");
  } else if (circumferenceUnit.toLowerCase().search("mm") != -1) {
    $("#cm").css("background-color", "#ffffff");
    $("#mm").css("background-color", "#4080d0");
    $("#in").css("background-color", "#ffffff");
  } else if (circumferenceUnit.toLowerCase().search("in") != -1) {
    $("#cm").css("background-color", "#ffffff");
    $("#mm").css("background-color", "#ffffff");
    $("#in").css("background-color", "#4080d0");
  } else {
    $("#cm").css("background-color", "#ffffff");
    $("#mm").css("background-color", "#ffffff");
    $("#in").css("background-color", "#ffffff");
  }
  plotFigure();
}

$("#chainring-list").on("change", chainringListSelect);
$("#sprocket-list").on("change", sprocketListSelect);
$("#circumference-list").on("change", circumferenceListSelect);
$("#chainrings").on("change", plotFigure);
$("#sprockets").on("change", plotFigure);
$("#circumference" ).on("change", circumferenceChange);
$("#cm" ).on("click", unitCm);
$("#mm" ).on("click", unitMm);
$("#in" ).on("click", unitIn);

chainringListSelect();
sprocketListSelect();
circumferenceListSelect();
circumferenceChange();
