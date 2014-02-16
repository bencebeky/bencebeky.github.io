// Find <a id="w3cvalidator"> and set href to include current URL.
function setw3clink() {
  // Find element by id.
  var a = document.getElementById("w3cvalidator");
  if (a) {
    // If found, set href.
    a.setAttribute("href", "http://validator.w3.org/check?uri=" + encodeURIComponent(document.URL));
  }
}

// Bind function to event.
function addEvent(object, eventtype, functionname) {
  if (object.addEventListener)
    object.addEventListener(eventtype, functionname, true);
  else if (object.attachEvent)
    object.attachEvent("on"+eventtype, functionname);
}

addEvent(window, "load", setw3clink);
