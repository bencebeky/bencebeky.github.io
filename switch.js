// (c) Nalyman, 2005

//checking DOM
// routines are using W3C DOM
var isDOM=0;
if (document.appendChild) isDOM++;
if (document.getElementById) isDOM++;
if (document.createElement) isDOM++;
if (window.addEventListener) isDOM++;
if (isDOM!=4) isDOM=0; else isDOM=1;

/*************************
*************************/
// switching email addresses

function switchmail()
/*

 !!important!!
 use with (no childnodes allowed!!):
  <span class="mail">somone (kukac) one (pont) two (pont) com</span>
 result
  <span class="mail><a href="mailto:someone@one.two.com">someone@one.two.com</a></span>
 (the result of the code is equivalent with the above xhtml code)
 
 corr.:
  at this time only one (pont) is posibble!

*/
{
    var myCim=document.getElementsByTagName('a');
    if (myCim)
    {
	//document.write('email cimek (',myCim.length,'db)<br/>'); // debug
	var myKukac=new RegExp(/--kukac--/); // replacing to '@'
	var myKukac2=new RegExp(/--at--/); // english version
	var myPont=new RegExp(/--pont--/g); // replacing to '.'
	var myPont2=new RegExp(/--dot--/g); //english version
	// var myProtocol="mailto:"; // for the href-s
	for (i=0; i<myCim.length; i++) // going through all the span-s
	{
	    if (myCim[i].id=="email") // focusing on class="mail" spans
	    {
		// var myCsere=myCim[i].lastChild.nodeValue.replace(myKukac,"@"); // first replacement
		var myCsere=myCim[i].href; // extract href
		myCsere=myCsere.replace(myKukac,"@"); // first replacement
		myCsere=myCsere.replace(myKukac2,"@");
		myCsere=myCsere.replace(myPont,"."); // second replacement
		myCsere=myCsere.replace(myPont2,".");
                myCim[i].setAttribute('href',myCsere);
                // myCim[i].setAttribute('href',myProtocol.concat(myCsere));
                // myCim[i].setAttribute('href',"majom");
		//document.write(myCsere,"*<br/>"); // debug
		
		// var NewLink=document.createElement('a'); //building up the link
		// NewLink.setAttribute('href',myProtocol.concat(myCsere)); // the href
		// var NewText=document.createTextNode(myCsere); //the text of the link
		// NewLink.appendChild(NewText); // adding the text to the link
		// myCim[i].removeChild(myCim[i].lastChild); // removing old text
		// myCim[i].appendChild(NewLink); // adding the link
	    }
	}
    }
}
// backwards compatible...
// from www.weblabor.hu/cikkek/diszkretjavascript
function addEvent(obj, evType, fn)
{
    if (obj.addEventListener) // W3C DOM level2
    {
	 obj.addEventListener(evType, fn, true);
	 return true;
    } 
    else if (obj.attachEvent) // oldschool
    {
	var r = obj.attachEvent("on"+evType, fn);
	return r;
    }
    else
    {
	return false;
    }
}
addEventListener_EXISTS=1;
/*
// nalyman's DOM standard solution
window.addEventListener('load',switchmail,true);
*/

addEvent(window,'load',switchmail);
/*addEvent(window,'load',switchpanel);*/

/* *************************************** */
/* tartalom jegyzék*/
/*function addcontents()
{
	if (document.getElementById)
	{
		
	}
}
addEvent(window,'load',addcontents); // beillesztés futtatáshoz
*/

