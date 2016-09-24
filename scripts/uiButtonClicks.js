/*
This script was written by Thomas Slomka <tslomka@buffalo.edu>
Copyright Thomas W. Slomka 2011, all right reserved.
Written to manage response to user interactions for program assessemnt pages

!!!!
UB CEI Specialized Course Evaluations
Last Revision: 20151127 - 1014
!!!!

 */
 var navBullet = '<p class="bullet"><a href="[link]">[anchor]:</a>&nbsp;[alert]</p>';
 var helpSpan = '<p><span class="[class]" id="[id]" onclick="[mode]([target]);"></span>[anchor]</p>';//class,id,mode,target,anchor
 var defaultUrl;
 function setDefUrl(){
  var myDF = location.href.split("/").slice(0,6); //path to home dir
  defaultUrl = myDF.join("/");
 }
 setDefUrl();

//sends request to begin a report
function doReport(eState,evalId){
	alert("This would take the user to a UB Catalog page for this course");
}

//sends request to begin a report
function doPage(eState){
	if(eState != "home"){
		document.location = eState+".html";
	}else{
		document.location = "http://www.buffalo.edu/course-evaluation.html"
	}
}

function goHome(goLoc){
	if(goLoc == "" || goLoc == undefined){
		document.location = "index.cgi";
	}else{
		document.location = "index.cgi?"+goLoc;
	}
}


 //expands or collapses passed element
 function doExpand(thisId){
 	var myElement = document.getElementById(thisId);
 	var thisBtn = thisId+"_btn";
 	var myVis = myElement.style.display;
 	//alert("\""+myVis+"\"");
	if(myVis == "none" || myVis == ""){
		document.getElementById(thisBtn).innerHTML = "-";
		myElement.style.display = "block";
	}else{
		document.getElementById(thisBtn).innerHTML = "+";
		myElement.style.display = "none";
	} 
 }

//end

