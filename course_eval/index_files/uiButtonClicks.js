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
	if(eState != "Closed"){
		document.location = "index.cgi?p="+eState+"&e="+evalId;
	}
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

//draws admin request to send an announcement email
function drawSendAnnounce(){
	//alert('working');
	var myForm = "<form id='myForm'><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>";
	
	myForm += "<p><strong>Select Announce Timing:</strong><br/>The announcement will go out to any evaluation that is open or that matches the provided date<br/>";
	myForm += "<input type='radio' id='anounceTiming0' name='radio' value='review' onClick='setDate(\"\");'><strong> Review: </strong>Send a review evaluation announcement to faculty<br/>";
	myForm += "<input type='radio' id='anounceTiming1' name='radio' value='begin' onClick='setDate(\"none\");'><strong> Open: </strong>Send an open announcement to students<br/>";
	myForm += "<input type='radio' id='anounceTiming2' name='radio' value='remind' onClick='setDate(\"none\");'><strong> Remind: </strong>Send a reminder to students to complete evaluation <br/>";
	myForm += "<input type='radio' id='anounceTiming3' name='radio' value='last' onClick='setDate(\"none\");'><strong> Last: </strong>Send and announcement to students this is their last chance before closing. <br/>";
	myForm += "<input type='radio' id='anounceTiming4' name='radio' value='report' onClick='setDate(\"\");'><strong> Reports: </strong>Send an announcement to faculty that reports are ready <br/>";
	
	myForm += "<p><strong>Report Date:</strong> yyyymmdd<br/><input type='text' id='myForm_courseDate' value=''  onkeyup=\"checkCnt(this.id,'10');\" onkeypress=\"return myKey(event,this.id,'10');\" onpaste='return pStrip(event,this.id,\"10\");' onDrop='return dStrip(event,this.id,\"10\");' autocomplete='off'><br/>";
 	myForm += "<span class='formError' id='charCnt_myForm_courseDate'>Max Characters = 10. Character Count = 0</span></p>";
 	
 	var getConfirm = new XMLHttpRequest();
	getConfirm.open('GET', "index.cgi?p=openEvaluations", false);
	getConfirm.send();
	var thisConfirm =  getConfirm.responseText.split("|");
		
 	myForm += "<p><strong>Limit to these evaluations: </strong>Select evaluations to send announcement to or all<br/>";
	myForm += "<input type='checkbox' id='evalsOpen0' name='eval' value='"+thisConfirm[1]+"' onmouseup='cleanSelections(\"evalsOpen\",\"0\",\""+thisConfirm[0]+"\");'> Send to all open evaluations.<br/>";
	myForm +=  thisConfirm[2];
	myForm += "<input type='hidden' id='evalsNum' value='"+thisConfirm[0]+"'>";
	
	
	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitDrawSendAnnounce();'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></form></p>";
	myForm += "<hr><p id='myError'>*All mail is sent to the UB IT Name '@buffalo.edu'.</p><hr>";
	
	document.getElementById('formField').innerHTML = myForm;
	
	formOpen();
	document.getElementById("formField").style.cursor = "pointer";
	document.getElementById("formPop").style.cursor = "pointer";
}
function setDate(dVal){
	document.getElementById("myForm_courseDate").value = dVal;
}
function cleanSelections(thisSelect,allNone,selectTotal){
	if(allNone == "0"){
		for(x=1; x<selectTotal; x++){
			nextSelect = thisSelect + x;
			document.getElementById(nextSelect).checked = false;
		}
	}else{
		document.getElementById(thisSelect).checked = false;
	}
}
//responds to email request
//https://xhr.spec.whatwg.org/
 function submitDrawSendAnnounce(){
 	document.getElementById("formField").style.cursor = "wait";
	document.getElementById("formPop").style.cursor = "wait";
	document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Processing.</span><hr></p><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>" ;
	document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Processing.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
	
	
	var checkForm = "send";
	var errorMessage = "";
	var myMessage = "";
	var testA = "";
	for(i=0; i<=4; i++){
		thisRadio = document.getElementById("anounceTiming"+i);
		if(thisRadio.checked){ // radio checked?
            testA = thisRadio.value; // if so, hold its value in var
            //alert(thisRadio.value);
            break; // and break out of for loop
        }
    }
   	var testB = document.getElementById("myForm_courseDate").value;
	//alert(testB);
	if(testA == "review" || testA == "report"){
		testC = "none";
	}else{
		var testC = new Array();
		var eNum = document.getElementById("evalsNum").value;
		//alert(eNum);
		var eItem = 0;
		for(i=0; i<eNum; i++){
			thisRadio = document.getElementById("evalsOpen"+i);
			if(thisRadio.checked){ // radio checked?
				testC[eItem] = thisRadio.value; // if so, hold its value in value
				eItem = eItem+1;
				//alert(thisRadio.value);
			}
		}
		testC = testC.join(",");
	}
	//alert(testC);
	//alert(testA+" - "+testB);
	if(testA == "" || testB == "" || testC == "" ||testA == undefined || testB == undefined || testC == undefined){
		checkForm = "Error";
		errorMessage = "Error!<br/>All fields must be completed."
	}
	//check start date mm/dd/yyyy
	if(testB != "none"){
		 theAccept = /^[\d]{8}$/;
		 theReply = "- Evaluation Report Date: yyyymmdd<br/>&nbsp;&nbsp;&nbsp;&nbsp;  where mm = [2 num month] and - and dd = [2 num day] and - and yyyy = [4 num year]";
		if (theAccept.test(testB)){
			//do nothing
		}else{
			checkForm = "Error";
			if(errorMessage == ""){
				 errorMessage = "Error!<br/>"+theReply;
			}else{
				 errorMessage += "<br/>"+theReply;
			}
		}
	}
	if(checkForm == "send"){
		myMessage = testA+"|"+testB+"|"+testC;
		myMessageTest = testA+"|"+testB+"|"+testC;
		
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Building Emails.</span><hr></p><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Building Emails.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
		//formToggle();
	
		
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "index.cgi?p=eamilAllOpen&f="+myMessage, false);
		myEmail.send();
		myMessage = myEmail.responseText;
			/*
			myResult = "<h1>response from build emails:</h1>";
			myResult += "<p>"+myEmail.responseText+"</p>";
			//alert(myResult);
			myForm = displayText(myResult);
		
			myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
			document.getElementById('formField').innerHTML = myForm;
			*/
		if(myMessage == myMessageTest){	    	
			document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Building Emails Failed:<br/>"+myMessage+"</span><hr></p><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>" ;
			document.getElementById('myError').innerHTML = "<p><hr><span style='color: red;'>Building Emails Failed:<br/>"+myMessage+"</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
	    }else{
	    	
	    	document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Sending Emails.</span><hr></p><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>" ;
			document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Sending Emails.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
		
			myEmail = new XMLHttpRequest();
			myEmail.open('GET', "scripts/evalBulkMail.php?p="+myMessage, false);
			myEmail.send();
			myResult = "<h1>Send Announcement Emails:</h1>";
			myResult += "<p>"+myEmail.responseText+"</p>";
			//alert(myResult);
			myForm = displayText(myResult);
		
			myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
			document.getElementById('formField').innerHTML =  myForm;
			
	    }
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><h1 id='myTitle'>Send Announcement Email:</h1><p>Complete this form to send out an announcement. All fields are required.</p>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
	}
	document.getElementById("formField").style.cursor = "pointer";
	document.getElementById("formPop").style.cursor = "pointer";
}


//draws a submit request form for an administrator to submit a new specialty evaluation
function drawAddEval(){
	//alert("add eval");
	var myForm = "<h1 id='myTitle'>Build New Specialty Evaluation:</h1><p>Complete this form to build a new evaluation. All fields are required.</p>";
	
	myForm += "<p><strong>Program Coordinator:</strong>itname/first/last/proCor or none (specifically when same as faculty)<br/><input type='text' id='myForm_ProCor' value=''  onkeyup=\"checkCnt(this.id,'90');\" onkeypress=\"return myKey(event,this.id,'90');\" onpaste='return pStrip(event,this.id,\"90\");' onDrop='return dStrip(event,this.id,\"90\");' autocomplete='off'></p>";
 	myForm += "<p><span class='formError' id='charCnt_myForm_ProCor'>Max Characters = 90. Character Count = 0</span><br/><br/></p>";
	
 	myForm += "<p><strong>Course Numbers:</strong>reg-dept-course-section/<br/><input type='text' id='myForm_CourseNum' value=''  onkeyup=\"checkCnt(this.id,'90');\" onkeypress=\"return myKey(event,this.id,'90');\" onpaste='return pStrip(event,this.id,\"90\");' onDrop='return dStrip(event,this.id,\"90\");' autocomplete='off'></p>";
 	myForm += "<p><span class='formError' id='charCnt_myForm_CourseNum'>Max Characters = 90. Character Count = 0</span><br/><br/></p>";
	
 	myForm += "<p><strong>Evaluation Start/Stop/Report Date:</strong>yyyymmdd/yyyymmdd/yyyymmdd<br/><input type='text' id='myForm_CourseDates' value=''  onkeyup=\"checkCnt(this.id,'90');\" onkeypress=\"return myKey(event,this.id,'90');\" onpaste='return pStrip(event,this.id,\"90\");' onDrop='return dStrip(event,this.id,\"90\");' autocomplete='off'></p>";
 	myForm += "<p><span class='formError' id='charCnt_myForm_CourseDates'>Max Characters = 90. Character Count = 0</span><br/><br/></p>";
	
 	myForm += "<p><strong>Faculty List: </strong> itname/first/last/faculty[q]question/question<br/><textarea id='myForm_Faculty' value='' onkeyup=\"checkCnt(this.id,'3000');\" onkeypress=\"return myKey(event,this.id,'3000');\" onpaste='return pStrip(event,this.id,\"3000\");' onDrop='return dStrip(event,this.id,\"3000\");' autocomplete='off'></textarea></p>";
	myForm += "<p><span class='formError' id='charCnt_myForm_Faculty'>Max Characters = 3000. Character Count = 0</span><br/><br/></p>";
	
	myForm += "<p><strong>Student List: </strong> itname/first/last/student<br/><textarea id='myForm_stuList' value='' onkeyup=\"checkCnt(this.id,'3000');\" onkeypress=\"return myKey(event,this.id,'3000');\" onpaste='return pStrip(event,this.id,\"3000\");' onDrop='return dStrip(event,this.id,\"3000\");' autocomplete='off'></textarea></p>";
	myForm += "<p><span class='formError' id='charCnt_myForm_stuList'>Max Characters = 3000. Character Count = 0</span><br/><br/></p>";

	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitAddEval();'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr><p id='myError'>*All mail is sent to the UB IT Name '@buffalo.edu'.</p><hr>"+textLimit;

	document.getElementById('formField').innerHTML = myForm;
	
	formOpen();
	//document.getElementById('formBack').style.display = "block";
	//document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
	document.getElementById("formPop").style.cursor = "pointer";
}
//submits form data to server for processing
/*=cut
finn/Jeremy/Finn/proCor/
10624-CEP-590B/12345-CEP-590B-SEC
20151122/20151213
afakeper/Afake/Person/faculty/question-one/question-two
wmguyker/Wendy/Guyker/faculty/question-one/question-two
clarakun/Clara/Kuntz/student/
klsilla /Silla/Kimberly Lynn Savannah/student/
alyssasm/Smyth/Alyssa/student/
=cut*/
 function submitAddEval(){
 	document.getElementById("formField").style.cursor = "wait";
	document.getElementById("formPop").style.cursor = "wait";
	var checkForm = "send";
	var myMessage = "";
	var errorMessage = "";
	var testA = document.getElementById("myForm_ProCor").value;
	var testB = document.getElementById("myForm_CourseNum").value;
	var testC = document.getElementById("myForm_CourseDates").value;
	var testD = document.getElementById("myForm_Faculty").value;
	var testE = document.getElementById("myForm_stuList").value;
	//alert(testA+" - "+testB);
	if(testA == "" || testB == "" || testC == "" || testD == "" || testE == "" ||testA == undefined || testB == undefined || testC == undefined || testD == undefined || testE == undefined ){
		checkForm = "Error";
		errorMessage = "Error!<br/>All fields must be completed."
	}
	
	//check for itname string
	if(testA != "none"){
		var theAccept = /^[a-z0-9]{1,8}\/[a-zA-Z-]{1,14}\/[a-zA-Z-]{1,14}\/proCor$/;
		var theReply = "- Department Chair: itname,First,Last<br/>&nbsp;&nbsp;&nbsp;&nbsp;  where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
		if (theAccept.test(testA)){
			//do nothing
		}else{
			checkForm = "Error";
			if(errorMessage == ""){
				 errorMessage = "Error!<br/>"+theReply;
			}else{
				 errorMessage += "<br/>"+theReply;
			}
		}
	}
	//check course name   [12345-HIS-110LR-MAL]
	 theAccept = /^([\d]{5}\-[A-Z]{3,4}\-\d{3,4}\-[0-9A-Z]{2,5}\-[0-9A-Z]{1,5}){1}(\/[\d]{5}\-[A-Z]{3,4}\-\d{3,4}\-[0-9A-Z]{2,5}\-[0-9A-Z]{1,5})*?$/;
	 theReply = "- Course Number: regNum-ABC-123-SEC<br/>&nbsp;&nbsp;&nbsp;&nbsp; where regNum = [5 Nums] and - and dept = [3-4 Caps] and - and num = [3-4 Nums] and - and type = [2-5 Nums-Caps]  and - and sec = [1-5 Nums-Caps] ";
	if (theAccept.test(testB)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//check start dates
	 theAccept = /^[\d]{8}\/[\d]{8}\/[\d]{8}$/;
	 theReply = "- Evaluation Report Start-End-Report Dates: yyyymmdd|yyyymmdd|yyyymmdd<br/>&nbsp;&nbsp;&nbsp;&nbsp;  where mm = [2 num month] and - and dd = [2 num day] and - and yyyy = [4 num year]";
	if (theAccept.test(testC)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}

	//check faculty list
	 theAccept = /^[a-z0-9]{1,8}\/[a-zA-Z-]{1,14}\/[a-zA-Z-]{1,14}\/faculty\[q\][a-zA-Z0-9\s\.\,\;\:\%\&\$\@\+\=\-\_\'\"\!\?\–\•\…\/]*([\r\n]{1}[\w\d]{1,8}\/[a-zA-Z-]{1,14}\/[a-zA-Z-]{1,14}\/faculty\[q\][a-zA-Z0-9\s\.\,\;\:\%\&\$\@\+\=\-\_\'\"\!\?\–\•\…\/]*)*?$/;
	 theReply = "- Faculty List: itName/First/Last/faculty[q]none or questions [one line per faculty]<br/>&nbsp;&nbsp;&nbsp;&nbsp; where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
	if (theAccept.test(testD)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//check student list
	 theAccept = /^[a-z0-9]{1,8}\/[a-zA-Z-]{1,14}\/[a-zA-Z-]{1,14}\/student([\r\n]{1}[\w\d]{1,8}\/[a-zA-Z-]{1,14}\/[a-zA-Z-]{1,14}\/student)*?$/;
	 theReply = "- Student List: itName/First/Last/student [one line per student]<br/>&nbsp;&nbsp;&nbsp;&nbsp; where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
	if (theAccept.test(testE)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//alert(myMessage);
	if(checkForm == "send"){
		
		myMessage += washText(testA+"\n");
		myMessage += washText(testB+"\n");
		myMessage += washText(testC+"\n");
		myMessage += washText(testD+"\n");
		myMessage += washText(testE);
		
		var getConfirm = new XMLHttpRequest();
		getConfirm.open('GET', "index.cgi?p=getConfirm", false);
		getConfirm.send();
		var thisConfirm =  getConfirm.responseText.split(",");
		if(thisConfirm[3] == "admin"){
			var myEmail = new XMLHttpRequest();
			myEmail.open('GET', "index.cgi?p=AddEval&s="+myMessage, false);
			myEmail.send();
			var myResult = "<h1>Request:</h1>";
			myResult += "<p>"+myEmail.responseText+"</p>";
			//alert(myResult);
			myForm = displayText(myResult);
			myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
			document.getElementById('formField').innerHTML = myForm;
		}else{
			document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: Form Can Not Be Processed at this time.</span><hr></p><h1 id='myTitle'>Build New Specialty Evaluation:</h1>" ;
			document.getElementById('myError').innerHTML = "<p><hr><span style='color: red;'>Error: Form Can Not Be Processed at this time.</span><hr></p><p>*All mail is sent to UB IT Names.</p>";
		}
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><h1 id='myTitle'>Build New Specialty Evaluation:</h1>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><p>*All mail is sent to UB IT Names.</p>";
	}
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById("formPop").style.cursor = "pointer";
}



//draws a submit request form for new evaluation
function drawRequest(myId,myFlds){
	var myForm = "<h1 id='myTitle'>Request Specialty Evaluation:</h1><p>Complete this form for each course you would like evaluated. All fields are required.</p>";
 
 	myForm += "<p><strong>Department Chair Information:</strong> Required Format: itName,FirstName,LastName<br/><input type='text' id='myForm_chair' value=''  onkeyup=\"checkCnt(this.id,'38');\" onkeypress=\"return myKey(event,this.id,'38');\" onpaste='return pStrip(event,this.id,\"38\");' onDrop='return dStrip(event,this.id,\"38\");' autocomplete='off'><br/>";
 	myForm += "<span class='formError' id='charCnt_myForm_chair'>Max Characters = 38. Character Count = 0</span></p>";
 	
 	myForm += "<p><strong>Course Number Information:</strong> Required Format: regNum-dept-num-sec or 12345-ABC-123-SEC separate multiple sections by commas.<br/><input type='text' id='myForm_courseName' value=''   onkeyup=\"checkCnt(this.id,'60');\" onkeypress=\"return myKey(event,this.id,'60');\" onpaste='return pStrip(event,this.id,\"60\");' onDrop='return dStrip(event,this.id,\"60\");' autocomplete='off'><br/>";
 	myForm += "<span class='formError' id='charCnt_myForm_courseName'>Max Characters = 60. Character Count = 0</span></p>";
 	
 	myForm += "<p><strong>Evaluation Start Date:</strong> [mm/dd/yyyy] Evaluations must be concurrent with or before end of semester evaluation, and run no longer than three weeks.<br/><input type='text' id='myForm_courseDate' value=''  onkeyup=\"checkCnt(this.id,'10');\" onkeypress=\"return myKey(event,this.id,'10');\" onpaste='return pStrip(event,this.id,\"10\");' onDrop='return dStrip(event,this.id,\"10\");' autocomplete='off'><br/>";
 	myForm += "<span class='formError' id='charCnt_myForm_courseDate'>Max Characters = 10. Character Count = 0</span></p>";
 	
 	myForm += "<p><strong>Faculty List: </strong>Required Format: itName,FirstName,LastName – one faculty per line.<br/><textarea id='myForm_facList' value='' style='height:70px;' onkeyup=\"checkCnt(this.id,'190');\" onkeypress=\"return myKey(event,this.id,'190');\" onpaste='return pStrip(event,this.id,\"190\");' onDrop='return dStrip(event,this.id,\"190\");' autocomplete='off'></textarea><br/>";
	myForm += "<span class='formError' id='charCnt_myForm_facList'>Max Characters = 190. Character Count = 0</span><br/><br/></p>";
	 	
	myForm += "<p><strong>Faculty Specific Questions: </strong> Format: faculty itName: question text (qualitative only). One question per line.  Enter \"none\" in field in no questions.<br/><textarea id='myForm_facQuest' value='' style='height:70px;' onkeyup=\"checkCnt(this.id,'6000');\" onkeypress=\"return myKey(event,this.id,'6000');\" onpaste='return pStrip(event,this.id,\"6000\");' onDrop='return dStrip(event,this.id,\"6000\");' autocomplete='off'></textarea><br/>";
	myForm += "<span class='formError' id='charCnt_myForm_facQuest'>Max Characters = 6000. Character Count = 0</span><br/><br/></p>";
	
	myForm += "<p><strong>Student List: </strong>Required Format: itName,FirstName,LastName – one student per line.<br/><textarea id='myForm_stuList' value='' style='height:70px;' onkeyup=\"checkCnt(this.id,'3000');\" onkeypress=\"return myKey(event,this.id,'3000');\" onpaste='return pStrip(event,this.id,\"3000\");' onDrop='return dStrip(event,this.id,\"3000\");' autocomplete='off'></textarea><br/>";
	myForm += "<span class='formError' id='charCnt_myForm_stuList'>Max Characters = 3000. Character Count = 0</span><br/><br/></p>";
			
 	myForm += "<hr><id='wait' p><input type='button' value='Submit Edits' onClick='submitRequest(\""+myId+"\",\""+myFlds+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr><p id='myError'>*All mail is sent to the UB IT Name '@buffalo.edu'.</p><hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	formOpen();
	document.getElementById("formField").style.cursor = "pointer";
	document.getElementById("formPop").style.cursor = "pointer";
 }
 function submitRequest(myId,myLocs){
	document.getElementById("formField").style.cursor = "wait";
	document.getElementById("formPop").style.cursor = "wait";

	setTimeout(document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Processing Form.</span><hr></p><h1 id='myTitle'>Request Specialty Evaluation:</h1>",100);
	setTimeout(document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Processing Form.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>",100);
	//formToggle();
	
	
	var checkForm = "send";
	var errorMessage = "";
	var myMessage = "";
	var testC = document.getElementById("myForm_chair").value;
	var testE = document.getElementById("myForm_courseName").value;
	var testF = document.getElementById("myForm_courseDate").value;
	var testG = document.getElementById("myForm_facList").value;
	var testH = document.getElementById("myForm_facQuest").value;
	var testI = document.getElementById("myForm_stuList").value;
	//alert(testA+" - "+testB);
	if(testC == "" || testE == "" || testF == "" || testG == "" || testH == "" || testI == "" || testC == undefined  || testE == undefined || testF == undefined || testG == undefined || testH == undefined || testI == undefined){
		checkForm = "Error";
		errorMessage = "Error!<br/>All fields must be completed."
	}
	//check for itname string
	var theAccept = /^[a-z0-9]{1,8}\,[a-zA-Z-]{1,14}\,[a-zA-Z-]{1,14}$/;
	var theReply = "- Department Chair: itname,First,Last<br/>&nbsp;&nbsp;&nbsp;&nbsp;  where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
	if (theAccept.test(testC)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//check course name   [12345-HIS-110LR-MAL]
	 theAccept = /^([\d]{5}\-[A-Z]{3,4}\-\d{3,4}\-[0-9A-Z]{2,5}\-[0-9A-Z]{1,5}){1}(\,[\d]{5}\-[A-Z]{3,4}\-\d{3,4}\-[0-9A-Z]{2,5}\-[0-9A-Z]{1,5})*?$/;
	 theReply = "- Course Number: regNum-ABC-123-SEC<br/>&nbsp;&nbsp;&nbsp;&nbsp; where regNum = [5 Nums] and - and dept = [3-4 Caps] and - and num = [3-4 Nums] and - and type = [2-5 Nums-Caps]  and - and sec = [1-5 Nums-Caps] ";
	if (theAccept.test(testE)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//check start date mm/dd/yyyy
	 theAccept = /^[\d]{2,}\/[\d]{2,}\/[\d]{4,}$/;
	 theReply = "- Evaluation Start Date: mm/dd/yyyy<br/>&nbsp;&nbsp;&nbsp;&nbsp;  where mm = [2 num month] and - and dd = [2 num day] and - and yyyy = [4 num year]";
	if (theAccept.test(testF)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	//check faculty list
	 theAccept = /^[a-z0-9]{1,8}\,[a-zA-Z-]{1,14}\,[a-zA-Z-]{1,14}([\r\n]{1}[\w\d]{1,8}\,[a-zA-Z-]{1,14}\,[a-zA-Z-]{1,14})*?$/;
	 theReply = "- Faculty List: itName,First,Last [one line per faculty]<br/>&nbsp;&nbsp;&nbsp;&nbsp; where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
	if (theAccept.test(testG)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	 theReply = "- Student List: itName,First,Last [one line per student]<br/>&nbsp;&nbsp;&nbsp;&nbsp; where itName = [8 chars/nums] and , and FirstName = [14 chars] and , and LastName = [14 chars]";
	if (theAccept.test(testI)){
		//do nothing
	}else{
		checkForm = "Error";
		if(errorMessage == ""){
			 errorMessage = "Error!<br/>"+theReply;
		}else{
			 errorMessage += "<br/>"+theReply;
		}
	}
	if(checkForm == "send"){
		var testX = testC.replace(/\,/g, "/");
		myMessage += "Program Chair Information: [r]"+testX+"/proCor[r][r]";
		testX = testE.replace(/\,/g, "/");
		myMessage += "Course Name: [r]"+testX+"[r][r]";
		myMessage += washText("Evaluation Start Date: \n"+testF+"\n\n");
		testX = testG.replace(/\,/g, "/");
		testG = testX.replace(/\n/g, "/faculty[q]none[r]");
		myMessage += "Faculty List: [r]"+testG+"/faculty[q]none[r]"+"[r][r]";
		myMessage += washText("Faculty Questions: \n"+testH+"\n\n");
		testX = testI.replace(/\,/g, "/");
		testI = testX.replace(/\n/g, "/student[r]");
		myMessage += "Student List: [r]"+testI+"/student[r]"+"[r][r]";
		
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Sending Form.</span><hr></p><h1 id='myTitle'>Request Specialty Evaluation:</h1>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Sending Form.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
		//formToggle();
	
		var getConfirm = new XMLHttpRequest();
		getConfirm.open('GET', "index.cgi?p=getConfirm", false);
		getConfirm.send();
		var thisConfirm =  getConfirm.responseText.split(",");
		myMessage += "Form Submitted By: \n" + thisConfirm[1] + " " + thisConfirm[0]+ "@buffalo.edu" +  "\n\n";
		var myFrom = thisConfirm[1] + " <" + thisConfirm[0] + "@buffalo.edu>";
		var mySubject = "Request UB Specialty Evaluation";
	
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: blue;'>Waiting for response.</span><hr></p><h1 id='myTitle'>Request Specialty Evaluation:</h1>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: blue;'>Waiting for response.</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
		//formToggle();
		
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "scripts/adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><h1 id='myTitle'>Request Specialty Evaluation:</h1>" ;
		document.getElementById('myError').innerHTML = "<p><hr><span style='color: red;'>"+errorMessage+"</span><hr></p><p>*All mail is sent to your UB IT Name.</p>";
	}
	document.getElementById("formField").style.cursor = "pointer";
	document.getElementById("formPop").style.cursor = "pointer";
}
 
 //checks for completed field set and sets checkbox to visible
 function setComplete(flds){
 	var mySet = flds.split("_");
 	var myInput = mySet.shift();
 	var inputTotal = 0;
 	var numIn = 0;
 	for(x = 0; x < mySet.length; x++){
 		var thisInput = myInput + "_" + mySet[x] + numIn;
 		//alert(thisInput + " - " +document.getElementById(thisInput));
 		if(document.getElementById(thisInput) != null){
			if(document.getElementById(thisInput).type == "textarea" || document.getElementById(thisInput).type == "text"){
				if(document.getElementById(thisInput).value != ""){
					inputTotal++;
				}
			}
			if(document.getElementById(thisInput).type == "radio"){
				//var myThisInput =  myInput + "_" + mySet[x];
				var oneMore = true;
				var y = 0;
				while(oneMore){
					myThisInput = myInput + "_" + mySet[x] + y;
					if(document.getElementById(myThisInput) != null){
						if(document.getElementById(myThisInput).checked){
							inputTotal++;
							oneMore = false;
						}
						y++;
					}else{
						oneMore = false;
					}
				}
			}
			numIn = 0;
		}else{
			numIn++;
		}
 	}
 	var thisSpan =  myInput + "_check";	
 	//alert(inputTotal+" == "+mySet.length);
 	if(inputTotal == mySet.length){
 		document.getElementById(thisSpan).style.visibility = "visible";
 	}else{
 		document.getElementById(thisSpan).style.visibility = "hidden";
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
 
 //checks for an optional field, presets and toggles display
function checkToggle(flds){
	var fldsDiv = flds + "_div";
	var fldsTxt =  flds + 0;
	var myVis = document.getElementById(fldsDiv).style.display;
	if(myVis == "none"){
		document.getElementById(fldsTxt).value = "";
		document.getElementById(fldsDiv).style.display = "block";
	}else{
		//document.getElementById(fldsTxt).value = "none";
		document.getElementById(fldsDiv).style.display = "none";
	}
}
//checks for an optional field visibility and sets to hidden
function checkHidden(flds){
	var fldsDiv = flds + "_div";
	var fldsTxt =  flds + 0;
	var myVis = document.getElementById(fldsDiv).style.display;
	if(myVis == "block"){
		if(document.getElementById(fldsTxt).value == ""){
			document.getElementById(fldsTxt).value = "none";
		}
		document.getElementById(fldsDiv).style.display = "none";
	}
}
//checks for conditions to display an optional field
function setConditional(flds){ //x7_a,x6_a_b_c_d,0_1
	var myFlds = flds.split(",");
	var myOptFlds = myFlds.shift().split("_");
	var myOptId = myOptFlds.shift();
	var myOptDiv = myOptId + "_div";
	var myOptCheck = myOptId + "_check";
	var myCheckFlds = myFlds.shift().split("_");
	var myCheckId = myCheckFlds.shift();
	var myInputs = myFlds.shift().split("_");
	var curVisState = document.getElementById(myOptDiv).style.display;
	var curCheckedState = document.getElementById(myOptCheck).style.visibility;
	var myVisState = 0;
	var oneMore = 0;
	for(x=0; x < myCheckFlds.length; x++){
		for(y=0; y < myInputs.length; y++){
			var myThisInput = myCheckId + "_" + myCheckFlds[x] + myInputs[y];
			if(document.getElementById(myThisInput).checked){
				myVisState = 1;
				oneMore = 1;
			}
		}
		if(oneMore == 1) { break; }
	}
	for(x=0; x < myOptFlds.length; x++){
		var thisInput = myOptId + "_" + myOptFlds[x] + x;
		if(myVisState && curVisState == "none"){
			//alert("1");
			//document.getElementById(thisInput).value = "";
			document.getElementById(myOptCheck).style.visibility = "hidden";
			document.getElementById(myOptDiv).style.display = "block";
		}
		if(myVisState && curVisState == "block" && document.getElementById(thisInput).value == ""){
			//alert("2");
			document.getElementById(myOptCheck).style.visibility = "hidden";
		}
		if(myVisState && curVisState == "block" && document.getElementById(thisInput).value == "none"){
			//alert("3");
			document.getElementById(thisInput).value = "";
			document.getElementById(myOptCheck).style.visibility = "hidden";
		}
		if(myVisState && curVisState == "block" && document.getElementById(thisInput).value != "none" && document.getElementById(thisInput).value != ""){
			//alert("4");
			document.getElementById(myOptCheck).style.visibility = "visible";
		}
		if(!myVisState && curVisState == "none"){
			//alert("5");
			if(document.getElementById(thisInput).value == ""){
				document.getElementById(thisInput).value = "none";
			}
			document.getElementById(myOptCheck).style.visibility = "hidden";
			document.getElementById(myOptDiv).style.display = "none";
		}
		if(!myVisState && curVisState == "block"){
			//alert("6");
			if(document.getElementById(thisInput).value == ""){
				document.getElementById(thisInput).value = "none";
			}
			document.getElementById(myOptCheck).style.visibility = "hidden";
			document.getElementById(myOptDiv).style.display = "none";
		}
	}
}

//sends request to begin evaluation
function doEval(eState,evalId){
	if(eState != "Closed"){
		document.location = "index.cgi?p=doEval&e="+evalId;
	}
}

//captures form data and sends it to server
function saveEval(){
	var evalArray = document.getElementById("startArray").value.split("=");
	evalArray.shift();
	var evalStudent = document.getElementById("student").value;
	var evalId = document.getElementById("examId").value;
	var evalData = new Array();
	for(x=0; x<evalArray.length; x++){
		var thisX = evalArray[x].split("~");
		var xData = new Array();
		for(y=0; y<thisX.length; y++){
			var thisY = thisX[y].split("|")[0].split(",");
			var zData = new Array();
			for(z=0; z<thisY.length; z++){
				if(thisY[z] != ""){
					if(document.getElementById(thisY[z]).type == "textarea" || document.getElementById(thisY[z]).type == "text"){
						var washData = washText(document.getElementById(thisY[z]).value);
						if(washData == ""){
							zData[z] = "none";
						}else{
							zData[z] = washData;
						}
					}
					if(document.getElementById(thisY[z]).type == "radio"){
						if(document.getElementById(thisY[z]).checked){
							zData[z] = document.getElementById(thisY[z]).value;
						}else{
							zData[z] = 0;
						}
					}
				}
			}
			xData[y] = zData.join(",");
		}
		evalData[x]	= xData.join("~");
	}	
	var evalString = evalId+"~"+evalStudent+"~"+evalData.join("~");	
	//alert(evalString);
	document.location = "index.cgi?p=writeEval&e="+evalString;
}

function addDocument(myId,myPos){
	//alert("Add = myId - " +myId + "\rmyPos - \"" + myPos + "\"");
	var myForm = "<form><h1 id='myTitle'>Add An Assessment Document:</h1>";
		
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	   	if(myPos == "0"){
			myForm += "<p><strong>Where do you want to add the document?</strong></p><hr><p>";
			myForm += "<input type='radio' id='doc0' name='radio' value='after' checked='true' readonly>: First Document <br/>";
			myForm += "</p><hr><p><strong>Title of Document:</strong><br/><input type='text' id='Title_of_Document'  value='' onkeyup=\"checkCnt(this.id,'80');\" onkeypress=\"return myKey(event,this.id,'80');\" onpaste='return pStrip(event,this.id,'80');' onDrop='return dStrip(event,this.id,'80');' autocomplete='off'><br/>";
			myForm += "<span class='formError' id='charCnt_Title_of_Document'>Max Characters = 60. Character Count = 0</span><br/><br/></p>";
			myForm += "<p><strong>Description of Document:</strong><br/><input type='text' id='Description_of_Document'  value='' onkeyup=\"checkCnt(this.id,'300');\" onkeypress=\"return myKey(event,this.id,'300');\" onpaste='return pStrip(event,this.id,'300');' onDrop='return dStrip(event,this.id,'300');' autocomplete='off'><br/>";
			myForm += "<span class='formError' id='charCnt_Description_of_Document'>Max Characters = 100. Character Count = 0</span><br/><br/></p>";
			myForm += "</p><hr><p><strong>Select File*:</strong><br/><input type='file' id='file' value='' accept='application/pdf'><br/>";
			myForm += "<hr><p><input type='button' value='Add Document' onClick='submitAddDocument(\""+myId+"\",\""+myPos+"\");'>&nbsp;";
			myForm += "<input type='button' value='Cancel Edit' onClick='formClose();'></p>";
			myForm += "</p><hr><p><strong>*Note: File Selection</strong><br/>File uploads must be of type &quot;aplication/pdf&quot; and be no larger than 2.3mb in size. Be sure your file will upload properly by saving it as an &quot;optimized PDF&quot; to be sure it is less than 2.3mb in size and will view well on all devices. When saving your PDF choose the settings or options button in the save dialog box and select &quot;Mobile&quot; from the settings menu and &quot;Acrobat 10.0 and Later&quot; from the make-compatible-with menu for best results.<br/>";
			myForm += "<hr><p></form>";	
		}else{
			myForm += "<p><strong>Where do you want to add the document?</strong></p><hr><p>";
			myPosArray = myPos.split("~");
			xCnt = 0;
			for(x=0; x<myPosArray.length; x++){
				if(x==0){
					myForm += "<input type='radio' id='doc"+x+"' name='radio' value='"+x+"'>: Before <br/>";
				}else{
					myForm += "<input type='radio' id='doc"+x+"' name='radio' value='"+x+"'>: Between <br/>";
				}
				myForm += "<strong>Document \""+myPosArray[x]+"\"</strong><br/>";
				xCnt++;
			}
			myForm += "<input type='radio' id='doc"+x+"' name='radio' value='after'>: After <br/>";
			
			myForm += "</p><hr><p><strong>Title of Document:</strong><br/><input type='text' id='Title_of_Document'  value='' onkeyup=\"checkCnt(this.id,'80');\" onkeypress=\"return myKey(event,this.id,'80');\" onpaste='return pStrip(event,this.id,'80');' onDrop='return dStrip(event,this.id,'80');' autocomplete='off'><br/>";
			myForm += "<span class='formError' id='charCnt_Title_of_Document'>Max Characters = 60. Character Count = 0</span><br/><br/></p>";
			myForm += "<p><strong>Description of Document:</strong><br/><input type='text' id='Description_of_Document'  value='' onkeyup=\"checkCnt(this.id,'300');\" onkeypress=\"return myKey(event,this.id,'300');\" onpaste='return pStrip(event,this.id,'300');' onDrop='return dStrip(event,this.id,'300');' autocomplete='off'><br/>";
			myForm += "<span class='formError' id='charCnt_Description_of_Document'>Max Characters = 100. Character Count = 0</span><br/><br/></p>";
			myForm += "</p><hr><p><strong>Select File*:</strong><br/><input type='file' id='file' value='' accept='application/pdf'><br/>";
			myForm += "<hr><p><input type='button' value='Add Document' onClick='submitAddDocument(\""+myId+"\",\""+myPos+"\");'>&nbsp;";
			myForm += "<input type='button' value='Cancel Edit' onClick='formClose();'></p>";
			myForm += "</p><hr><p><strong>*Note: File Selection</strong><br/>File uploads must be of type &quot;aplication/pdf&quot; and be no larger than 2.3mb in size. Be sure your file will upload properly by saving it as an &quot;optimized PDF&quot; to be sure it is less than 2.3mb in size and will view well on all devices. When saving your PDF choose the settings or options button in the save dialog box and select &quot;Mobile&quot; from the settings menu and &quot;Acrobat 10.0 and Later&quot; from the make-compatible-with menu for best results.<br/>";
			myForm += "<hr><p></form>";
		
		}
	
	}else{
		myForm += "<p><strong>This feature requires a web browser that supports HTML 5</strong></p>";
		myForm += "<p>Update your browser to one of the following:<br/>IE: 10+<br/>FIREFOX: 3.6+<br/>CHROME: 6.0+<br/>SAFARI: 6.0+<br/>OPERA: 11.1</p>"
		myForm += "<hr><input type='button' value='OK' onClick='formClose();'></p>";
		myForm += "<hr><p></form>";
	}
	
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitAddDocument(myId,myPos){
	//alert("Add = myId - " +myId + "\rmyPos - \"" + myPos + "\"");
	document.getElementById("formField").style.cursor = "wait";
	document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Reading form fields...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
	var checkForm =  "<p><hr><span style='color: red;'>Error:<br/>";
	var theError = new Array();
	theError[0] = "- You must select a position for the document.<br/>";
	var myPosArray = myPos.split("~");
	var mySelectPos = "";
	for(x=0; x<=myPosArray.length; x++){
		if(document.getElementById('doc'+x).checked){
			mySelectPos = document.getElementById('doc'+x).value;
			theError[0] = "";
			break;
		}
	}
	var myTitle;
	var myDesc;
	if(document.getElementById('Title_of_Document').value == "" || document.getElementById('Description_of_Document').value == ""){
		theError[1] = "- You must provide a Title and Description for the document.<br/>";
	}else{
		myTitle = washText(document.getElementById('Title_of_Document').value);
		myDesc = washText(document.getElementById('Description_of_Document').value);
		theError[1] = "";
	}
	var myName;
	if(document.getElementById('file').value == ""){
		theError[2] = "- You must select a document to upload.<br/>";
	}else{
		myName = document.getElementById('file').value;
		theError[2] = "";
	}
	var myFile = document.getElementById("file").files[0];
	myName = myFile.name;
	mySize = myFile.size;
	myType = myFile.type;
	//alert(myType +" = "+ mySize);
	if(myType != "application/pdf"){
		theError[3] = "- Only PDF files are allowed to be uploaded.<br/>";
	}
	if(mySize > 2300000){
		theError[4] = "- File must be less than 2.3mb in size.<br/>";
	}
	
	var theSend = "";
	for(x=0; x<theError.length; x++){
		theSend += theError[x];
	}
	if(theSend == ""){
		var reader = new FileReader();
		var rawData;
		reader.onload = function(e) {
			rawData = encode64(reader.result);
			//alert(rawData);
			
			var formData = new FormData();
			formData.append('page', 'addDocument');
			formData.append('myId', myId);
			formData.append('myTitle', myTitle);
			formData.append('myDesc', myDesc);
			formData.append('mySelectPos', mySelectPos);
			formData.append('myName', myName);
			formData.append('rawData', rawData);
		
			var myEmail = new XMLHttpRequest();
			myEmail.open('POST', "secure.cgi", true);
			myEmail.onload = function(){
				document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Waiting for response...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
				var myResult = "<h1>Add An Assessment Document Request:</h1>";
				myResult += "<p>"+myEmail.responseText+"</p>";
				//alert(myResult);
				myForm = displayText(myResult);
				myForm += "<hr><p><input type='button' value='OK' onClick='document.location = \"secure.cgi?p=documents&s=1&0="+myId+"\";'></p>";
				document.getElementById('formField').innerHTML = myForm;
				document.getElementById("formField").style.cursor = "pointer";
			}
			//var progressBar = document.querySelector('.myTitle');
			myEmail.onprogress = function(e) {
				if (e.lengthComputable) {
					var myPercent = (e.loaded / e.total) * 100;
					myPercent = myPercent.split("\.")[0];
					document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Upload: "+myPercent+"% complete</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
				}else{
					document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Document is uploading...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
				}
			}
			document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Sending form to server...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
			myEmail.send(formData); 
		}
		/*
		reader.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				var myPercent = (e.loaded / e.total) * 100;
				myPercent = myPercent.split(".")[0];
				document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Upload"+myPercent+"% complete</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
			}else{
				document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Document is uploading...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
			}
		}
		*/
		document.getElementById("myTitle").innerHTML = "<p><hr><span style='color: red;'>Progress:<br/>Reading file...</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
		reader.readAsDataURL(myFile);
		//reader.readAsText(myFile);
	
	}else{
		document.getElementById('myTitle').innerHTML = checkForm+""+theSend+"</span><hr></p><h1 id='myTitle'>Add An Assessment Document:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}
// public method for encoding
function encode64(input, utf8) {
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

    }

    return output;
};

function removeDocument(myId,myTitle,myPos){
	//alert("Remove = myId - " +myId + "\rmyPos - " + myPos);
	var myForm = "<h1 id='myTitle'>Remove An Assessment Document:</h1>";
 	myForm += "<p>Are you sure you want to remove the document <strong>\""+myTitle+"\"?</strong> <br/>Removing a document can not be undone!<p>";
 	myForm += "<hr><p><input type='button' value='Remove Document' onClick='submitRemoveDocument(\""+myId+"\",\""+myTitle+"\",\""+myPos+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edit' onClick='formClose();'></p>";
	myForm += "<hr><p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitRemoveDocument(myId,myTitle,myPos){
	//alert("Remove = myId - " +myId + "\rmyPos - " + myPos);
	//alert(document.getElementById('before').checked+" -- "+document.getElementById('after').checked);
	document.getElementById("formField").style.cursor = "wait";
	var myEmail = new XMLHttpRequest();
	myEmail.open('GET', "secure.cgi?p=removeDocument"+"&i="+myId+"&t="+myTitle+"&l="+myPos, false);
	myEmail.send();
	var myResult = "<h1>Remove An Assessment Document Request:</h1>";
	myResult += "<p>"+myEmail.responseText+"</p>";
	//alert(myResult);
	myForm = displayText(myResult);
	myForm += "<hr><p><input type='button' value='OK' onClick='document.location = \"secure.cgi?p=documents&s=1&0="+myId+"\";'></p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById("formField").style.cursor = "pointer";
}
 
function addOutcome(myId,myPos){
	//alert("myId - " +myId + "\rmyPos - " + myPos);
	var myForm = "<h1 id='myTitle'>Add A Program Outcome:</h1>";
 	myForm += "<p><strong>Where do you want to add the item?</strong><p>";
 	myForm += "<hr><p><input type='radio' id='before' name='radio' value='"+(Number(myPos)-1)+"'>: Before Outcome "+myPos+"<br/>";
	myForm += "<input type='radio' id='after' name='radio' value='"+(Number(myPos))+"'>: After Outcome "+myPos+"</p>";
	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitAddOutcome(\""+myId+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr><p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitAddOutcome(myId){
	//alert(document.getElementById('before').checked+" -- "+document.getElementById('after').checked);
	document.getElementById("formField").style.cursor = "wait";
	var checkForm = "Error";
	var myPos = "";
	//alert(myPos);
	if(document.getElementById('before').checked){
		myPos = document.getElementById('before').value;
		checkForm = "Send";
	}else{
		if(document.getElementById('after').checked){
			myPos = document.getElementById('after').value;
			checkForm = "Send";
		}
	}
	//alert(myPos);
	//document.location = "secure.cgi?p=addOutcome&i="+myId+"&l="+myPos;
	if(checkForm == "Send"){
		var myEmail = new XMLHttpRequest();
		//alert("secure.cgi?p=addOutcome"+"&i="+myId+"&l="+myPos);
		myEmail.open('GET', "secure.cgi?p=addOutcome"+"&i="+myId+"&l="+myPos, false);
		myEmail.send();
		var myResult = "<h1>Add A Program Outcome Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='document.location = \"secure.cgi?p=report&s=1&0="+myId+"\";'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: You must select an option: before or after.</span><hr></p><h1 id='myTitle'>Add An Outcome:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}

function removeOutcome(myId,myPos){
	//alert("myId - " +myId + "\rmyPos - " + myPos);
	var myForm = "<h1 id='myTitle'>Remove A Program Outcome:</h1>";
 	myForm += "<p><strong>Are you sure you want to remove Outcome "+myPos+"? <br/>Removing an outcome can not be undone!</strong><p>";
 	myForm += "<hr><p><input type='button' value='Remove Outcome' onClick='submitRemoveOutcome(\""+myId+"\",\""+myPos+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edit' onClick='formClose();'></p>";
	myForm += "<hr><p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitRemoveOutcome(myId,myPos){
	//alert(document.getElementById('before').checked+" -- "+document.getElementById('after').checked);
	document.getElementById("formField").style.cursor = "wait";
	var myEmail = new XMLHttpRequest();
	myEmail.open('GET', "secure.cgi?p=removeOutcome"+"&i="+myId+"&l="+myPos, false);
	myEmail.send();
	var myResult = "<h1>Remove A Program Outcome Request:</h1>";
	myResult += "<p>"+myEmail.responseText+"</p>";
	//alert(myResult);
	myForm = displayText(myResult);
	myForm += "<hr><p><input type='button' value='OK' onClick='document.location = \"secure.cgi?p=report&s=1&0="+myId+"\";'></p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById("formField").style.cursor = "pointer";
}
 
 
function editCoordinator(myId,myFlds){
	var myForm = "<h1 id='myTitle'>Edit Program Coordinator:</h1>";
 	myForm += "<p><strong>Program Assessment Coordinator Full Name:</strong><br/><input type='text' id='myForm_Name' value='"+document.getElementById("Coordinator_Name").innerHTML+"'  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<p><strong>Program Assessment Coordinator Title:</strong><br/><input type='text' id='myForm_Title' value='"+document.getElementById("Coordinator_Title").innerHTML+"'  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<p><strong>Program Assessment Coordinator UB IT Name:</strong><br/>"+document.getElementById("Coordinator_IT_Name").innerHTML+"*</p>";
 	myForm += "<p><strong>Program Assessment Coordinator Phone:</strong><br/><input type='text' id='myForm_Phone' value='"+document.getElementById("Coordinator_Phone").innerHTML+"'  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submiteditCoordinator(\""+myId+"\",\""+myFlds+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr><p>*All mail is sent to your UB IT Name. If your intent is to change the program coordinator or if your UB IT Name has changed please submit the 'Add A Program Coordinator' form.</p><hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
 	
 }
 function submiteditCoordinator(myId,myLocs){
	document.getElementById("formField").style.cursor = "wait";
	var checkForm = "send";
	var myFrom = document.getElementById("Coordinator_Name").innerHTML + " <" + document.getElementById("Coordinator_IT_Name").innerHTML + "@buffalo.edu>";
	var mySubject = "Edit Program Coordinator";
	myMessage = "";
	testA = document.getElementById("myForm_Name").value;
	testB = document.getElementById("myForm_Title").value;
	testC = document.getElementById("myForm_Phone").value;
	//alert(testA+" - "+testB);
	if(testA == "" || testB == "" || testC == "" ||testA == undefined || testB == undefined || testC == undefined){
		checkForm = "Error";
	}else{
		myMessage += washText("Program Name: "+document.getElementById("Program_Name").innerHTML+"\n");
		myMessage += washText("Program Id: "+myId+"\n\n");
		myMessage += washText("Program Coordinator Full Name: "+testA+"\n");
		myMessage += washText("Program Coordinator Title: "+testB+"\n");
		myMessage += washText("Program Coordinator UB IT Name: "+document.getElementById("Coordinator_IT_Name").innerHTML+"\n");
		myMessage += washText("Program Coordinator Phone: "+testC+"\n");
	}
	
	if(checkForm == "send"){
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>Edit Program Coordinator Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: All fields must be completed.</span><hr></p><h1 id='myTitle'>Edit Program Coordinator:</h1>" ;
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}

function newCoordinator(myId,myFlds){
	var myForm = "<h1 id='myTitle'>Add a New Coordinator:</h1>";
 	myForm += "<p><strong>Program Assessment Coordinator Full Name:</strong><br/><input type='text' id='myForm_Name' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<p><strong>Program Assessment Coordinator UB IT Name:</strong><br/><input type='text' id='myForm_IT' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitnewCoordinator(\""+myId+"\",\""+myFlds+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
 	
 }
 function submitnewCoordinator(myId,myLocs){
	document.getElementById("formField").style.cursor = "wait";
	var checkForm = "send";
	var myFrom = document.getElementById("Coordinator_Name").innerHTML + " <" + document.getElementById("Coordinator_IT_Name").innerHTML + "@buffalo.edu>";
	var mySubject = "New Program Coordinator";
	myMessage = "";
	testA = document.getElementById("myForm_Name").value;
	testB = document.getElementById("myForm_IT").value;
	//alert(testA+" - "+testB);
	if(testA == "" || testB == "" ||testA == undefined || testB == undefined){
		checkForm = "Error";
	}else{
		myMessage += washText("Program Name: "+document.getElementById("Program_Name").innerHTML+"\n");
		myMessage += washText("Program Id: "+myId+"\n\n");
		myMessage += washText("Program Coordinator Full Name: "+testA+"\n");
		//myMessage += washText("Program Coordinator UB IT Name: "+document.getElementById("Coordinator_IT_Name").innerHTML+"\n");
		myMessage += washText("Program Coordinator UB IT Name: "+testB+"\n");
	}
	
	if(checkForm == "send"){
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>New Program Coordinator Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: All fields must be completed.</span><hr></p><h1 id='myTitle'>Add a New Coordinator:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}
 
function newProgram(myFlds){
 	var myForm = "<h1 id='myTitle'>Add a New Progam:</h1>";
 	var fArray = myFlds.split("~");	
	var myData = new Array();
 	for(f=0; f<+fArray.length; f=f+2){
 		myData[f] = "myForm_"+f;
		myData[Number(f+1)] = "myForm_"+Number(f+1);
		thisName = fArray[f].split("-")[0].replace(/\_/g, " ");
		myForm += "<p><strong>"+thisName+"</strong><br/><input type='text' id='myForm_"+f+"' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
		thisName = fArray[Number(f+1)].split("-")[0].replace(/\_/g, " ");
		myForm += "<p><strong>"+thisName+"</strong><br/><input type='text' id='myForm_"+Number(f+1)+"' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	}
 	myForm += "<p><strong>Program Assessment Coordinator Full Name:</strong><br/><input type='text' id='myForm_Name' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<p><strong>Program Assessment Coordinator UB IT Name:</strong><br/><input type='text' id='myForm_IT' value=''  onkeypress=\"return myKey(event,this.id);\" onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></p>";
 	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitNewProgram(\""+myFlds+"\",\""+myData.join("~")+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
 	
 }
 function submitNewProgram(myLocs,myFields){
	document.getElementById("formField").style.cursor = "wait";
	var checkForm = "send";
	//alert("myUpdate = \""+myUpdate+"\"\r myRef = \""+myRef+"\"\r myLocs = \""+myLocs+"\"\r myFields = \""+myFields);//"\"\r xxx = \""+xxx+
	var currentFields = new Array();
	var fArray = myLocs.split("~");
	var lArray = myFields.split("~");
	var fPos = 0;
	for(f=0; f<+fArray.length; f=f+2){
		testA = document.getElementById(lArray[f]).value;
		testB = document.getElementById(lArray[Number(f+1)]).value;
		//alert(testA+" - "+testB);
		if(testA == "" || testB == "" ||testA == undefined || testB == undefined){
			checkForm = "Error";
			break;
		}else{
			var thisF = fArray[f].split("-")[0];
			var thisFF = fArray[Number(f+1)].split("-")[0];
			currentFields[fPos] = thisF+": "+testA+" - "+thisFF+": "+testB;
		}
		fPos++;
	}
	
	var myFrom = document.getElementById("Coordinator_Name").innerHTML + " <" + document.getElementById("Coordinator_IT_Name").innerHTML + "@buffalo.edu>";
	var mySubject = "New Program Request";
	var myMessage = washText("New Program Details:\n"+currentFields.join("\n")+"\n\n");
	testA = document.getElementById("myForm_Name").value;
	testB = document.getElementById("myForm_IT").value;
	//alert(testA+" - "+testB);
	if(testA == "" || testB == "" ||testA == undefined || testB == undefined){
		checkForm = "Error";
	}else{
		myMessage += washText("Program Coordinator Full Name: "+testA+"\n");
		myMessage += washText("Program Coordinator UB IT Name: "+testB+"\n");
	}
	
	if(checkForm == "send"){
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>New Program Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: All fields must be completed.</span><hr></p><h1 id='myTitle'>Add a New Progam:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}
 
 function removeProgram(myId,myFlds){
 	document.getElementById("formField").style.cursor = "wait";
	//alert(myId+" - "+myFlds);
 	var fArray = myFlds.split("~");
 	var myForm = "<h1 id='myTitle'>Remove This Progam:</h1>";
 	var myData = new Array();
 	for(f=0; f<+fArray.length; f=f+2){
 		myForm += "<p>"+document.getElementById(fArray[f].split("-")[0]).innerHTML+" - "+document.getElementById(fArray[Number(f+1)].split("-")[0]).innerHTML+"<br/>"
 	}
 	myForm += "<p><strong>Comments:</strong> Please provide an explanation for removing this program.<br/>";
 	myForm += "<textarea id='myExplain' value=''  onkeypress='return myKey(event,this.id);' onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></textarea></p>";			
 	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitRemoveProgram(\""+myId+"\",\""+myFlds+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
 }
 function submitRemoveProgram(myRef,myLocs){
	var checkForm = "send";
	document.getElementById("formField").style.cursor = "wait";
	//alert("myUpdate = \""+myUpdate+"\"\r myRef = \""+myRef+"\"\r myLocs = \""+myLocs+"\"\r myFields = \""+myFields);//"\"\r xxx = \""+xxx+
	var currentFields = new Array();
	var fArray = myLocs.split("~");
	var fPos = 0;
	for(f=0; f<+fArray.length; f=f+2){
		var thisF = fArray[f].split("-")[0];
		var thisFF = fArray[Number(f+1)].split("-")[0];
		testA = document.getElementById(thisF).innerHTML;
		testB = document.getElementById(thisFF).innerHTML;
		currentFields[fPos] = thisF+": "+testA+" - "+thisFF+": "+testB;
		fPos++;
	}
	//alert("currentFields = "+currentFields);
	//alert("changeFields = "+changeFields);
	
	var myFrom = document.getElementById("Coordinator_Name").innerHTML + " <" + document.getElementById("Coordinator_IT_Name").innerHTML + "@buffalo.edu>";
	var mySubject = "Remove Program Request";
	var myMessage = washText("Current Details:\n"+currentFields.join("\n")+"\n\n");
	myMessage += washText("Program Id: "+myRef+"\n\n");
	if(document.getElementById("myExplain").value == "" || document.getElementById("myExplain").value == undefined){
		checkForm = "Error";
	}else{
		myMessage += washText("Comments:\n"+document.getElementById("myExplain").value);
	}
	if(checkForm == "send"){
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>Remove Program Request:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: All fields must be completed.</span><hr></p><h1 id='myTitle'>Remove This Progam:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}

 
 function editProgam(myId,myFlds){
 	document.getElementById("formField").style.cursor = "wait";
	//alert(myId+" - "+myFlds);
 	var fArray = myFlds.split("~");
 	var myForm = "<h1 id='myTitle'>Edit Program Elements:</h1>";
 	var myData = new Array();
 	for(f=0; f<+fArray.length; f=f+2){
 		myData[f] = "myMenu_"+f;
 		myData[Number(f+1)] = "myMenu_"+Number(f+1);
 		myForm += getPopup(fArray[f]+"~"+fArray[Number(f+1)],myData[f]+"~"+myData[Number(f+1)]);
 	}
 	myForm += "<p><strong>Comments:</strong> Please provide details to help understand edit request.<br/>";
 	myForm += "<textarea id='myExplain' value=''  onkeypress='return myKey(event,this.id);' onpaste='return pStrip(event,this.id);' onDrop='return dStrip(event,this.id);' autocomplete='off'></textarea></p>";			
 	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitEditProgram(\"r\",\""+myId+"\",\""+myFlds+"\",\""+myData.join("~")+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr>"+textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
 }
 function submitEditProgram(myUpdate,myRef,myLocs,myFields){
	var checkForm = "send";
	document.getElementById("formField").style.cursor = "wait";
	//alert("myUpdate = \""+myUpdate+"\"\r myRef = \""+myRef+"\"\r myLocs = \""+myLocs+"\"\r myFields = \""+myFields);//"\"\r xxx = \""+xxx+
	var currentFields = new Array();
	var fArray = myLocs.split("~");
	var fPos = 0;
	for(f=0; f<+fArray.length; f=f+2){
		var thisF = fArray[f].split("-")[0];
		var thisFF = fArray[Number(f+1)].split("-")[0];
		testA = document.getElementById(thisF).innerHTML;
		testB = document.getElementById(thisFF).innerHTML;
		if(testA == "" || testB == "" ||testA == undefined || testB == undefined){
			checkForm = "Error";
			break;
		}else{
			currentFields[fPos] = testA+" - "+testB;
		}
		fPos++;
	}
	var changeFields  = new Array();
	var fArray = myFields.split("~");
	fPos = 0;
	for(f=0; f<+fArray.length; f=f+2){
		var myIn = document.getElementById(fArray[f]).selectedIndex;
		var myInF = document.getElementById(fArray[Number(f+1)]).selectedIndex;
		testA = document.getElementById(fArray[f]).options[myIn].value;
		testB = document.getElementById(fArray[Number(f+1)]).options[myInF].value;
		if(testA == "" || testB == "" ||testA == undefined || testB == undefined){
			checkForm = "Error";
			break;
		}else{
			changeFields[fPos] = testA+" - "+testB;
		}
		fPos++;
	}
	//alert("currentFields = "+currentFields);
	//alert("changeFields = "+changeFields);
	
	var myFrom = document.getElementById("Coordinator_Name").innerHTML + " <" + document.getElementById("Coordinator_IT_Name").innerHTML + "@buffalo.edu>";
	var mySubject = "Edit Program Details Request";
	var myMessage = washText("Current Details:\n"+currentFields.join(",")+"\n\n");
	myMessage += washText("Program Id: "+myRef+"\n\n");
	myMessage += washText("New Details:\n"+changeFields.join(",")+"\n\n");
	testA = document.getElementById("myExplain").value;
	if(testA == "" ||testA == undefined){
		checkForm = "Error";
	}else{
		myMessage += washText("Comments:\n"+testA);
	}
	//alert("myMessage = "+myMessage);
	if(checkForm == "send"){
		var myEmail = new XMLHttpRequest();
		myEmail.open('GET', "adminEmail.php?f="+myFrom+"&s="+mySubject+"&m="+myMessage, false);
		myEmail.send();
		var myResult = "<h1>Edit Program Details:</h1>";
		myResult += "<p>"+myEmail.responseText+"</p>";
		//alert(myResult);
		myForm = displayText(myResult);
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;'>Error: All fields must be completed.</span><hr></p><h1 id='myTitle'>Edit Program Elements:</h1>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formField').scrollTop = 0;
	}
}

//menu contents
var programList = new Array("Architecture~ARC","Urban Planning~UP","Urban and Regional Planning~URP","Environmental Design~ED","Anthropology~ANT","Biological Sciences~BS","Chemistry~CHE","Medicinal Chemistry~MC","Classics~CLA","Communication~COM","Informatics~IF","Audiology~AUD","Communicative Disorders and Sciences~CDS","Speech and Hearing Science~SHS","Comparative Literature~CL","Economics~ECO","English~ENG","Geography~GGY","Geography International Trade~GGY","Geological Sciences~GLY","Evolution Ecology and Behavior~EEB","Environmental Geosciences~GGY","Humanities Interdisciplinary~HUM","Management Science Business Analytics~MSBA","Management~MGT","Natural Sciences Interdisciplinary~NS","Social Sciences Interdisciplinary~SS","History~HIS","Jewish Studies~JS","Linguistics~LIN","German~GER","Mathematics~MTH","Bioinformatics and Computational Biology~BCB","Mathematics Economics~MECO","Mathematical Physics~MPHY","Media Study~MS","Arts Management~AM","Film Studies~FS","Music Historical Musicology and Music Theory~HMMT","Music Composition~MC","Music History~MHC","Music Performance~MP","Philosophy~PHI","Computational Physics~CPHY","Political Science~PSC","Behavioral Neuroscience~BNEU","Clinical Psychology~CLIN","Cognitive Psychology~COG","Social-Personality Psychology~SPP","French Literature~FLL","Spanish Literature~SLL","Spanish~SP","Spanish Linguistics~SPA","Italian~ITA","Social Science Interdisciplinary Programs Health and Human Services~SSIDP","Social Science Interdisciplinary Programs Environmental Studies~SSIDP","Sociology~SOC","Special Major~SM","Theatre and Performance~THP","Theatre~TH","Dance~DAN","Design and Technology~DAT","Music Theatre~MT","American Studies~AMS","Global Gender Studies~GGS","African & African American Studies~AAS","Asian Studies~AS","Art History~AH","Fine Arts~FA","Visual Studies~VS","Studio Arts~SA","Biomedical Engineering~BME","Chemical and Biological Engineering~CBE","Civil Engineering~CE","Civil Structural and Environmental Engineering~CSEE","Environmental Engineering~ENV","Computer Engineering~CE","Electrical Engineering~EE","Engineering Physics~EPI","Aerospace Engineering~AE","Mechanical Engineering~ME","Computer Science and Engineering~CSE","Industrial Engineering~IE","School Counseling~SC","School Psychology~sPSY","Psychology~PSY","Rehabilitation Counseling~RHC","Educational Psychology~EDP","Mental Health Counseling~MHC","Counselor Education~CED","School Counseling Psychology~CSP","Economics and Education Policy Analysis~EEPA","Educational Administration~EA","Education Studies~ES","General Education~GE","General Education (Educational Leadership and Policy)~GELP","Higher Education~HED","Educational Culture Policy and Society~ECPS","Music Education~MUSED","Childhood Education (1-6)~CHED6","Early Childhood Education (Birth-Grade 2)~ECE","Elementary Education~ELED","English Education~ENGED","English Education: Adolescence (5-12 or 7-12)~ENGEDA","All PhD programs~PHD","School Media Specialist~SMS","Mathematics Education Adolescence (5-12 or 7-12)~MEA","Early Childhood Education with Bilingual Extension (Birth-Grade 2)~ECEB2","Childhood Education with Bilingual Extension (1-6)~ECEB6","English for Speakers of Other Languages~ESOL","French~FR","French Education: Adolescence (5-12 or 7-12)~FRED","Foreign and Second Language Education~FSL","German Education: Adolescence (5-12 or 7-12)~GERED","Latin Education Adolescence (5-12 or 7-12)~LAEDA","Spanish Education: Adolescence (5-12 or 7-12)~SPAED","Teaching English to Speakers of Other Languages~TESOL","Literacy Specialist~LS","Reading Education~RED","Biology Education Adolescence (5-12 or 7-12)~BEDA","Chemistry Education: Adolescence (5-12 or 7-12)~CHEEDA","Earth Science Education: Adolescence (5-12 or 7-12)~ESCIED","All EDM except TESOL and Literacy~LAI","Physics Education Adolescence (5-12 or 7-12)~PHYED","Curriculum Instruction and the Science of Learning~CISL","Social Studies Education: Adolescence (5-12 or 7-12)~SSED","Special Education~SPEC","General Education (Learning and Instruction)~GELAI","Science and the Public~SCIP","Library Science~LIS","Law~LAW","Criminal Law~CL","Law-General~LAW","Biochemistry~BCH","Medical Technology~MT","Nuclear Medicine Technology~NMT","Biotechnology~BT","Medicine~MED","Microbiology and Immunology~MI","Anatomical Sciences~AS","Pathology~PATH","Biophysics~BIOP","Biophysics-Medical Physics~BMP","Physiology~PHYS","Biomedical Sciences~BMS","Structural Biology~SB","Epidemiology~EPI","Epidemiology - Clinical Research~EPI","Public Health~PH","Community Health and Health Behavior~CCHB","Exercise Science~ES","Nutrition~NUT","Physical Therapy~PT","Biostatistics~BIOP","Rehabilitation Science~RS","Occupational Therapy~OT","Pharmacology~PHT","Pharmacy~PHARM","Pharmaceutical Sciences~PS","Pharmacology and Toxicology~PHT","Dental Surgery~DS","Oral Sciences~OS","Oral Biology~OB","Biomaterials~BMA","Accounting~ACC","Supply Chain and Operations Management~SCOM","Finance~FIN","Business Administration~BA","Management and Information Technology Systems~MIS","Nursing Leadership~NUR","Family Nurse Practitioner~FNP","Nurse Anesthesia~NAN","Adult-Gerontology Nurse Practitioner~NUR","Psychiatric Mental Health Nurse Practitioner~PMHN/PSYN","Nursing Education~NUR","Maternal and Women's Health Nurse Practitioner~MWN","Pediatric Nurse Practitioner~NUR","Adult Clinical Nurse Specialist~CAN","Social Work~SWK","Social Welfare~SWF","American Pluralism~AP","Critical Thinking~CT","Depth Requirement~DEPTH","Foreign Language~FL","Humanities~HUM","Oral Communication~OC","World Civilizations~WC","Writing~COMP","Information Management~IM","Natural Sciences~NS","Social Sciences~SS");
var degreeList = new Array("Master of Science~MS","Master of Architecture~MARCH","Bachelor of Science~BS","Master of Urban Planning~MUP","Doctor of Philosophy~PHD","Bachelor of Arts~BA","Master Degree~MA","Audiology~AUD","Master of Arts~MA","Master of Fine Arts~MFA","Master of Music~MM","Bachelor of Music~MUSB","Bachelor of Fine Arts~BFA","Master of Engineering~ME","Education Master~EdM","Education Master~EdMsa","Doctor of Education~EDD","Master of Education~M.ED","Master of Science in Education~EDM","Master of Library Science~MLS","Juris Doctor~JD","Master of Laws~LLM","Medical Degree~MD","Master of Public Health~MPH","Doctor of Physical Therapy~DPT","Doctor of Pharmacy~PHARMD","Doctor of Dental Science~DDS","Master of Business Administration~MBA","Doctor of Nursing Practice~DNP","Master of Social Work~MSW","American Pluralism~AP","Critical Thinking~CT","Depth Requirement~DEPTH","Foreign Language~FL","Humanities~HUM","Mathematics~MTH","Natural Sciences~NS","Oral Communication~OC","Social Sciences~SS","World Civilizations~WC","Writing~COMP");
var departmentList = new Array("Architecture~ARC","Urban and Regional Planning~UP","Anthropology~ANT","Biological Sciences~BS","Chemistry~CHE","Classics~CLA","Communication~COM","Communicative Disorders and Sciences~CDS","Comparative Literature~CL","Economics~ECO","English~ENG","Geography~GGY","Geology~GLY","Graduate Interdisciplinary Programs~GIDP","History~HIS","Institute of Jewish Thought~JTH","Linguistics~LIN","Mathematics~MTH","Media Study~MS","Music~MUS","Philosophy~PHI","Physics~PHY","Political Science~PSC","Psychology~PSY","Romance Languages and Literatures~RLL","Social Science Interdisciplinary Programs~SSIDP","Sociology~SOC","Special Major~SM","Theatre and Dance~THD","Transnational Studies~TNS","Art~Art","Biomedical Engineering~BME","Chemical  and Biological Engineering~CBE","Civil Engineering~CE","Civil Structural and Environmental Engineering~CSEE","Computer Science and Engineering~CSE","Electrical Engineering~EE","Industrial Engineering~IE","Mechanical and Aerospace Engineering~MAE","Counseling School and Educational Psychology~CSEP","Educational Leadership and Policy~ELP","Learning and Instruction~LAI","Library and Information Studies~LIS","Law School~LAW","Biochemistry~BCH","Biotechnical and Clinical Laboratory Sciences~BCLS","Biotechnology~BT","Medicine~MED","Microbiology and Immunology~MI","Neuroscience~NEU","Pathology and Anatomical Sciences~PAS","Physiology and Biophysics~PHB","School of Medicine and Biomedical Sciences~MED","Structural Biology~SB","School of Public Health and Health Professions~PHP","Pharmaceutical Sciences~PS","Dental Medicine~SDM","Accounting and Law~ACC","School of Management~SOM","School of Nursing~NUR","Social Work~SSW","General Education~GE","Pharmacology And Toxicology~PHT","Information Management~IM");
var unitList = new Array("School of Architecture and Urban Planning~AUP","College of Arts and Sciences~CAS","School of Engineering and Applied Sciences~EAS","Graduate School of Education~GSE","Law School~LAW","School of Medicine and Biomedical Sciences~MED","School of Public Health and Health Professions~PHP","School of Pharmacy and Pharmaceutical Sciences~PPS","School of Dental Medicine~SDS","School of Management~SOM","School of Nursing~SON","School of Social Work~SSW","Undergraduate Education~UE");


//returns select menu variable as an array
function getPopup(theFields,thisId){
	//alert('getMenuData = ' + theFields+" - "+thisId);
	myFields = theFields.split("~");
	thisX = myFields[0].split("-")[0];
	thisY = myFields[1].split("-")[0];
	myPrepedText1 = prepText(document.getElementById(thisX).innerHTML);
	myPrepedText2 = prepText(document.getElementById(thisY).innerHTML);
	//alert(myPrepedText1+" - "+myPrepedText2);
	theFields = thisX.split("_")[0];
	var thisArray1 = new Array();
	var thisArray2 = new Array();
	var retArray1 = "";
	var retArray2 = "";
	var myReturn = "";
	if(theFields == "Department"){
		retArray1 = departmentList.sort();
		for(x in retArray1){
			thisArray1[x] = retArray1[x].split("~")[0];
			thisArray2[x] = retArray1[x].split("~")[1];
		}
		//retArray1 = thisArray1.sort();
		//retArray2 = thisArray2.sort();	
	}
	if(theFields == "Unit"){
		retArray1 = unitList.sort();
		for(x in retArray1){
			thisArray1[x] = retArray1[x].split("~")[0];
			thisArray2[x] = retArray1[x].split("~")[1];
		}
		//retArray1 = thisArray1.sort();
		//retArray2 = thisArray2.sort();
	}
	if(theFields == "Degree"){
		retArray1 = degreeList.sort();
		for(x in retArray1){
			thisArray1[x] = retArray1[x].split("~")[0];
			thisArray2[x] = retArray1[x].split("~")[1];
		}
		//retArray1 = thisArray1.sort();
		//retArray2 = thisArray2.sort();
	}
	if(theFields == "Program"){
		retArray1 = programList.sort();
		for(x in retArray1){
			thisArray1[x] = retArray1[x].split("~")[0];
			thisArray2[x] = retArray1[x].split("~")[1];
		}
		//retArray1 = thisArray1.sort();
		//retArray2 = thisArray2.sort();
	}
	
	var thisPopup = '<select id="'+thisId.split("~")[0]+'" onChange="setPartner(\''+thisId.split("~")[0]+'\',\''+thisId.split("~")[1]+'\');">\n';
	for(x in thisArray1){
		//alert(myValue+" == "+retArray[x]);
		if(myPrepedText1 == thisArray1[x]){
			thisPopup += '<option value="'+thisArray1[x]+'" selected="true">'+thisArray1[x]+'</option>\n';
		}else{
			thisPopup += '<option value="'+thisArray1[x]+'">'+thisArray1[x]+'</option>\n';
		}
	}
	thisPopup += "</select>\n";
	myReturn = "<p><strong>"+thisX.replace(/\_/g, " ")+"</strong><br/>"+thisPopup+"</p>";
	
	var thisPopup = '<select id="'+thisId.split("~")[1]+'" onChange="setPartner(\''+thisId.split("~")[1]+'\',\''+thisId.split("~")[0]+'\');">\n';
	for(x in thisArray2){
		//alert(myValue+" == "+retArray[x]);
		if(myPrepedText2 == thisArray2[x]){
			thisPopup += '<option value="'+thisArray2[x]+'" selected="true">'+thisArray2[x]+'</option>\n';
		}else{
			thisPopup += '<option value="'+thisArray2[x]+'">'+thisArray2[x]+'</option>\n';
		}
	}
	thisPopup += "</select>\n";
	myReturn += "<p><strong>"+thisY.replace(/\_/g, " ")+"</strong><br/>"+thisPopup+"</p>";
	
	
	return myReturn;
}
function setPartner(id1,id2){
	//alert(id1+","+id2);
	document.getElementById(id2).selectedIndex = document.getElementById(id1).selectedIndex;
}



//respond to button clicks
//gets a pdf file and returns it to the user
function myGetPdf(myType,myLoc,myName,myExt){
	//alert(myType);
	if(myType == "secure"){
		document.location = defaultUrl+"/secure/secure.cgi?p=getDownload&l="+myLoc+"&n="+myName+"&e="+myExt;
	}
	if(myType == "public"){
		document.location = defaultUrl+"/index.cgi?p=getDownload&l="+myLoc+"&n="+myName;
	}
}
function showRef(myRef,myfields){
	alert(myRef + " - " + myfields);
}

/*
*Start
*editor/administrator assessment item edit script
*/
function editAsmt(myUpdate,myType,myRef,myfields){
	document.getElementById("formField").style.cursor = "wait";
	//alert(myUpdate + " - " + myType + " - " + myRef + " - " + myfields);	
	//get status
	var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=status", false);
	myList.send();
	myStatus = myList.responseText;
	myLevels = new Array("<span class='numFourIconLg'></span>= Excellent","<span class='numThreeIconLg'></span>= Achieving","<span class='numTwoIconLg'></span>= Needs Development","<span class='numOneIconLg'></span>= Inadequate","<span class='bubbleIconLg'></span>= Not Submitted");
	myLevels.reverse();
	refArray = myfields.split("-");
	locArray = refArray[1].split("*");
	nameArray = refArray[0].split("*");
	if(nameArray.length == 1){
		nameArray = refArray[0].split("_");
	}
	thisName = refArray[0].replace(/\*/g, " ");
	myForm = "";
	if(myStatus == "a"){
		myForm += "<form id='radioForm'><p><h1>Select "+getRubric(nameArray[0],1)+" Evaluation:</h1></p>";
		inputBase = "<p><input type='radio' name='myForm' id='myForm' value='[v]' checked='[c]'>[x]</p>";
		for(x=0; x<=4; x++){
			myForm += "<p><input type='radio' name='myForm' id='myForm' value='"+myUpdate+","+myRef+","+x+","+refArray[0]+","+locArray[1]+"*"+locArray[2]+"'";
			if(x == Number(locArray[0])){//match icon location
				myForm += "' checked='true'>";
			}else{
				myForm += "'>";
			}
			myForm += myLevels[x]+"</p>";
			
		}
		myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitAsmt(\"radioForm\");'>&nbsp;";
		myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p></form>";
	}//else{
		myLevels.reverse();
		myForm += "<hr><h1>"+getRubric(nameArray[0],1)+" Evaluation Rubric Value:</h1>";
		myForm += "<p><strong>"+getRubric(nameArray[0],2)+"</strong></p>";
		for(x=0; x<=4; x++){
			y = x+3;
			myForm += "<p class='hang'><strong>"+myLevels[x]+": </strong><br/>"+getRubric(nameArray[0],y)+"</p>";
		}
		myForm += "<hr><p><input type='button' value='Close' onClick='formClose();'></p><hr>";
	//}
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitAsmt(myUpdate){
	document.getElementById("formField").style.cursor = "wait";
	myForm = document.getElementById(myUpdate);
	myRadios = myForm.elements['myForm'];
	myValue = "";
	for(var i=0, len=myRadios.length; i<len; i++){
        if( myRadios[i].checked ){
            myValue = myRadios[i].value;
            break;
        }
    }
    //oa/ma,id,newIconNum,UiIconRef,dataRef
    //oa,20140930010115,0,Criterion*2,0*4*2
    myUpdate = myValue.split(",");
    //get icons
	var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=getProgramUI&i=asmtIcons&e=1", false);
	myList.send();
	myIconArray = myList.responseText.split(",");
    document.getElementById(myUpdate[3]).className = myIconArray[Number(myUpdate[2])];
    //save change
    // $myMode,$myId,$myLoc,$myData
    var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=writeItem&m="+myUpdate[0]+"&i="+myUpdate[1]+"&l="+myUpdate[4]+"&d="+myUpdate[2], false);
	myList.send();
	myResult = "<p><strong>Select Assessment Evaluation</strong></p>";
	myResult += "<p>"+myUpdate[3].replace(/\*/g, " ")+":";
	myResult += myList.responseText;
	myResult += "</p>";
    myForm = myResult;
	myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById("formField").style.cursor = "pointer";
}
/*
*End
*editor/administrator assessment item edit script
*/

/*
*Start
*administrator assessment whole row edit script
*/
function editAsmtAdmin(myUpdate,myType,myRef,myfields){
	document.getElementById("formField").style.cursor = "wait";
	//alert(myUpdate + " - " + myType + " - " + myRef + " - " + myfields);	
	//alert("ref = \""+myRef + "\"\rfields = \"" + myfields+"\"");	
	//get status
	var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=status", false);
	myList.send();
	myStatus = myList.responseText;
	myLevels = new Array("<span class='numFourIconLg'></span>= Excellent","<span class='numThreeIconLg'></span>= Achieving","<span class='numTwoIconLg'></span>= Needs Development","<span class='numOneIconLg'></span>= Inadequate","<span class='bubbleIconLg'></span>= Not Submitted");
	myLevels.reverse();
	refArray = myfields.split("-")[0].split("~");
	fldArray = myfields.split("-")[1].split("~");
	HtmArray = myfields.split("-")[2].split("~");
	myLoc = fldArray[0].split("*")[1];
	myForm = "<form id='radioForm'><h1>Edit Evaluation:</h1>";
	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitAsmtAdmin(\"radioForm\",\""+myUpdate+"\",\""+myRef+"\",\""+myLoc+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	if(myStatus == "a"){
		for(myR in refArray){
			locArray = fldArray[myR].split("*");
			nameArray = refArray[myR].split("*");
			if(nameArray.length == 1){
				nameArray = refArray[myR].split("_");
			}
			htmlField = HtmArray[myR];
			thisName = refArray[myR].replace(/\*/g, " ");
				myForm += "<hr><p><strong>Select "+getRubric(nameArray[0],1)+" Evaluation:</strong></p>";
				//inputBase = "<p><input type='radio' name='myForm' id='myForm' value='[v]' checked='[c]'>[x]&nbsp;&nbsp;";
				myForm += "<p>";
				for(x=0; x<=4; x++){
					myForm += "<input type='radio' name='myForm"+myR+"' id='myForm"+myR+"' value='"+x+","+refArray[myR]+","+locArray[1]+"*"+locArray[2]+"'";
					if(x == Number(locArray[0])){//match icon location
						myForm += "' checked='true'>";
					}else{
						myForm += "'>";
					}
					myForm += myLevels[x]+"&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				myForm += "</p>";
				myForm += "<p><strong>Item Content:</strong></p><p>"+document.getElementById(htmlField).innerHTML+"</p>";
				
				
		
				myForm += "<p><strong>"+getRubric(nameArray[0],1)+" Evaluation Rubric Value:</strong></p>";
				myForm += "<p>"+getRubric(nameArray[0],2)+"</p>";
				if(Number(locArray[0]) == 0){
					myForm += "<p class='hang'><strong>0: </strong>Item has no evaluation.</p>";
				}else{
					y = Number(locArray[0])+3;
					myForm += "<p class='hang'><strong>"+locArray[0]+": </strong>"+getRubric(nameArray[0],y)+"</p>";
				}
				//}
				
					
		}
		myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitAsmtAdmin(\"radioForm\",\""+myUpdate+"\",\""+myRef+"\",\""+myLoc+"\");'>&nbsp;";
		myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p></form><hr>";
		
	}else{
		//non admin
		myLevels.reverse();
		myForm += "<hr><h1>"+getRubric(nameArray[0],1)+" Evaluation Rubric Value:</h1>";
		myForm += "<p><strong>"+getRubric(nameArray[0],2)+"</strong></p>";
		for(x=0; x<=4; x++){
			y = x+3;
			myForm += "<p class='hang'><strong>"+myLevels[x]+": </strong><br/>"+getRubric(nameArray[0],y)+"</p>";
		}
		myForm += "<hr><p><input type='button' value='Close' onClick='formClose();'></p><hr>";
	}
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitAsmtAdmin(myFormId,myMode,myId,myLoc){
	document.getElementById("formField").style.cursor = "wait";
	//alert(myFormId + " - " + myMode + " - " + myId + " - " + myLoc);
	myRadioForm = document.getElementById(myFormId);
	myForm = "";
	myData = new Array();
	//get icons css class names
	var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=getProgramUI&i=asmtIcons&e=1", false);
	myList.send();
	myIconArray = myList.responseText.split(",");
	//get selected radio
	for(x=0; x<=4; x++){		
		myRadios = myRadioForm.elements['myForm'+x];
		myValue = "";
		for(var i=0, len=myRadios.length; i<len; i++){
			if( myRadios[i].checked ){
				myValue = myRadios[i].value;
				break;
			}
		}		
		myUpdate = myValue.split(",");
		// myvalue array = newIcon,UiIconRef,dataRef
		// myvaluemyvalue array = 0,Criterion*2,0*4*2
		//set icon in interface
		document.getElementById(myUpdate[1]).className = myIconArray[Number(myUpdate[0])];
		//alert(myUpdate[3]+"  -  "+Number(myUpdate[2]));
		//collect change
		myData[x] = myUpdate[0];
		// $myMode,$myId,$myLoc,$myData
	}
	//save change
	myDataList = myData.join("~");
	var myList = new XMLHttpRequest();
	myList.open('GET', "secure.cgi?p=writeRow&m="+myMode+"&i="+myId+"&l="+myLoc+"&d="+myDataList, false);
	myList.send();
	myResult = "<p><strong>Select Assessment Evaluation</strong></p>";
	myResult += "<p>"+myUpdate[1].replace(/\*/g, " ")+":";
	myResult += myList.responseText;
	myResult += "</p>";
	myForm += myResult;
	
	myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById("formField").style.cursor = "pointer";
}

/*
*End
*administrator assessment whole row edit script
*/

 
var textLimit = "<p><h1>Text entry is limited to:</h1>"+
				"<strong>Aplha-Numeric:</strong> Aa to Zz and 0 to 9<br/>"+
				"<strong>Punctuation:</strong> space, period, comma, colon, semi-colon, straight quote, apostrophe, ampersand em-dash, exlamation, and question Mark<br/>"+
				"<strong>Mathematical:</strong> plus, minus (dash), equals, underscore, dollar, fraction, percent, parenthesis, and brackets <br/>"+
				"<strong>Special:</strong> copyright, at, bullet, elipse, dagger, </p><br/>"+
				"<p><h1>Character Stripping:</h1>"+
				"<strong>Paste and Drop:</strong> On paste or drag/drop text is stripped or replaced for characters that are not allowed.<br/>"+
				"<strong>Replace List:</strong> | with /,  * with •,  ~ with -, # with num., &lt; with [, &gt; with ]<br/>"+
				"<strong>Auto Complete:</strong> Auto complete is disabled.</p><hr><br/>";
				


function editRef(myUpdate,myType,myRef,myfields){
	document.getElementById("formField").style.cursor = "wait";
	fieldArray = myfields.split("~");
	//alert(myUpdate + " - " + myType + " - " + myRef + " - " + myfields);
	myData = new Array();
	myLengthArray = new Array();
	//myLocs = new Array();
	myForm = "<div id='myTitle'><p><h1>Edit Elements:</h1></p></div>";
	//alert(fieldArray[0] + " - " + fieldArray[1]);
	if(myType == "m"){//select
		myForm += getPopup(myfields,"myMenu_1~myMenu_2");
		myData[0] = "myMenu_1";
		myData[1] = "myMenu_2";
	}else{
		for(x in fieldArray){
			thisX = fieldArray[x].split("-")[0];
			thisY = fieldArray[x].split("-")[1];
			thisName = thisX.replace(/\_/g, " ");
			myPrepedText = prepText(document.getElementById(thisX).innerHTML);
			myLength = 0;
			switch(thisX){
				case "Program_Mission":
					myLength = 2000;
					break;
				case "Maintaining":
					myLength = 4000;
					break;
				case "Strengthening":
					myLength = 4000;
					break;
				case "Changing":
					myLength = 4000;
					break;
				case "Program_Goals":
					myLength = 2000;
					break;
				case "Accreditation_Agency":
					myLength = 60;
					break;
				case "Coordinator_Name":
					myLength = 30;
					break;
				case "Coordinator_Title":
					myLength = 60;
					break;
				case "Coordinator_IT_Name":
					myLength = 40;
					break;
				case "Coordinator_Phone":
					myLength = 20;
					break;
				case "Date_Last_Visit":
					myLength = 20;
					break;
				case "Renewal_Date":
					myLength = 20;
					break;
				case "Visit_Outcomes":
					myLength = 500;
					break;
				case "Comments":
					myLength = 500;
					break;
				case "Title_of_Document":
					myLength = 60;
					break;
				case "Description_of_Document":
					myLength = 100;
					break;
			}
			if(myLength == 0){
				if(thisX.split("_")[0] == "Outcome"){
					myLength = 1000;
				}else{
					myLength = 20;
				}
			}
			if(myType == "t"){//Text
				myForm += "<p><strong>"+thisName+"</strong><br/><input type='text' id='myForm"+x+"' value='"+myPrepedText+"' onkeyup=\"checkCnt(this.id,'"+myLength+"');\" onkeypress=\"return myKey(event,this.id,'"+myLength+"');\" onpaste='return pStrip(event,this.id,\""+myLength+"\");' onDrop='return dStrip(event,this.id,\""+myLength+"\");' autocomplete='off'></p>";
				myForm += "<span class='formError' id='charCnt_myForm"+x+"'>Max Characters = "+myLength+". Character Count = "+myPrepedText.length+"</span><br/><br/></p>";
			}
			if(myType == "ta"){//Text area
				myForm += "<p><strong>"+thisName+"</strong><br/><textarea id='myForm"+x+"' value='"+myPrepedText+"' onkeyup=\"checkCnt(this.id,'"+myLength+"');\" onkeypress=\"return myKey(event,this.id,'"+myLength+"');\" onpaste='return pStrip(event,this.id,\""+myLength+"\");' onDrop='return dStrip(event,this.id,\""+myLength+"\");' autocomplete='off'>"+myPrepedText+"</textarea></p>";
				myForm += "<span class='formError' id='charCnt_myForm"+x+"'>Max Characters = "+myLength+". Character Count = "+myPrepedText.length+"</span><br/><br/></p>";
			}
			myLengthArray[x] = myLength;
			myData[x] = "myForm"+x;
			//myLocs[x] = thisY;
		}
	}
	myForm += "<hr><p><input type='button' value='Submit Edits' onClick='submitEdits(\""+myUpdate+"\",\""+myRef+"\",\""+myfields+"\",\""+myData.join("~")+"\",\""+myLengthArray.join("~")+"\");'>&nbsp;";
	myForm += "<input type='button' value='Cancel Edits' onClick='formClose();'></p>";
	myForm += "<hr>"+textLimit;
	//document.getElementById('formError').innerHTML = textLimit;
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
	document.getElementById("formField").style.cursor = "pointer";
}
function submitEdits(myUpdate,myRef,myLocs,myFields,myLength){
	document.getElementById("formField").style.cursor = "wait";
	var myError = "Send";
	//alert(myUpdate+","+myRef+","+myLocs+","+myFields);
	//make form fields array
	myFlds = myFields.split("~");
	myLengths = myLength.split("~");
	//make data fields array html id-data location
	//alert("myFlds = \""+myFlds+"\"");
	myLoc = myLocs.split("~");
	var myResult = "<p><strong>Element Changes:</strong></p>";
	for(x in myFlds){
		thisLoc = myLoc[x].split("-");
		isMenu = myFlds[x].split("_")[0];
		if(isMenu == "myMenu"){
			myIn = document.getElementById(myFlds[x]).selectedIndex;
			myValue = document.getElementById(myFlds[x]).options[myIn].value;
		}else{
			myValue = document.getElementById(myFlds[x]).value;
			if(myValue.length > Number(myLengths[x])){
				myError = "Error";
			}
		}
		//alert(myValue);
		if(myError == "Send"){
			myValueClean = washText(myValue);
			myValueDisplay = displayText(myValue);
			mySave = myUpdate+"&i="+myRef+"&l="+thisLoc[1]+"&d="+myValueClean;
			//alert(mySave);
			document.getElementById(thisLoc[0]).innerHTML = myValueDisplay;
			var myList = new XMLHttpRequest();
			myList.open('GET', "secure.cgi?p=writeItem&m="+mySave, false);
			myList.send();
			myResult += "<p>"+thisLoc[0].replace(/\_/g, " ")+": ";
			myResult += myList.responseText;
			myResult += "</p>";
			//alert(myResult);
		}
		
	}
	if(myError == "Send"){
		myForm = myResult;
		myForm += "<hr><p><input type='button' value='OK' onClick='formClose();'></p>";
		document.getElementById('formField').innerHTML = myForm;
		document.getElementById("formField").style.cursor = "pointer";
	}else{
		document.getElementById('myTitle').innerHTML = "<p><hr><span style='color: red;' id='myTitleError'>Error: You have text that goes beyond the maximum allowed characters. Please Trim the fields.</span><hr></p><p><h1>Edit Elements:</h1></p>";
		document.getElementById("formField").style.cursor = "pointer";
		document.getElementById('formPop').scrollTop = 0;
	}
}





function drawHelp(myHelp){
	//alert("myHelp = \""+myHelp+"\"");
	helpVars = myHelp.split("*");
	thisHelp = helpVars.shift();
	//alert("helpVars = \""+helpVars+"\"");
	getHelp = new XMLHttpRequest();
	getHelp.open('GET', "../index.cgi?p=help&m="+thisHelp, false);
	getHelp.send();
	helpData = getHelp.responseText.split("*");
	//alert("helpData = \""+helpData+"\"");
	myForm = "<h1>"+helpData[0].split("|")[1]+"</h1><p><strong>"+helpData[0].split("|")[2]+"</strong></p><hr>";
	helpData.shift();
	for(x in helpData){
		xArray = helpData[x].split("|");
		myForm += "<p><strong>"+displayText(xArray[0])+"</strong><br/>"+displayText(xArray[1])+"</p>";
		yArray = xArray[2].split("~");
		for(y in yArray){
			//anchor#mode[res/web/(script)]#link(icon)#desc(function:field:...)
			zArray = yArray[y].split("#");
			
			yAnchor = zArray.shift();
			yMode = zArray.shift();
			yLink = zArray.shift();
			yDesc = zArray.shift();
			
			if(yMode == "res"){
				var a = navBullet.replace(/\[link\]/,defaultUrl+"/resources/"+yLink);
				var b = a.replace(/\[anchor\]/,yAnchor);
				myForm += b.replace(/\[alert\]/,displayText(yDesc));
			}
			if(yMode == "web"){
				var a = navBullet.replace(/\[link\]/,yLink);
				var b = a.replace(/\[anchor\]/,yAnchor);
				myForm += b.replace(/\[alert\]/,displayText(yDesc));
			}
			if(yMode == "script"){
				//class,id,mode,target,anchor
				//alert("yAnchor = \""+yAnchor+"\"  yMode = \""+yMode+"\" yLink = \""+yLink+"\" yDesc = \""+yDesc+"\" y = \""+y+"\"" );
				
				var a = helpSpan.replace(/\[class\]/,yLink);
				var b = a.replace(/\[id\]/,"");
				a = b.replace(/\[anchor\]/,yAnchor);
				var sArray = yDesc.split(":");
				var hArray = helpVars[x].split(":")
				//alert(x+" = hArray = "+hArray);
				b = a.replace(/\[mode\]/,sArray.shift());
				var scriptFields = new Array();
				for(s in sArray){
					scriptFields[s] = "'"+hArray[s]+"'";
				}
				myForm += b.replace(/\[target\]/,scriptFields.join(","));
			}
		}
		myForm += "<hr>";
	}
	myForm += "<p><input type='button' value='Close' onClick='formClose();'></p>";
	myForm += "<hr>";
	document.getElementById('formField').innerHTML = myForm;
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
}



function editUi(myRef){
	alert(myRef + " admin!");
}
function secure(myRef){
	alert(myRef);
}

//toggle course divisions
function doToggle(thisTog){
	var thisTogDiv = thisTog+"_toggleDiv";
	var thisTogBtn = thisTog+"_toggleBtn";
	var thisTogState = document.getElementById(thisTogBtn).innerHTML;
	if(thisTogState == "+"){
		document.getElementById(thisTogBtn).innerHTML = "-";
		document.getElementById(thisTogDiv).style.display = "block";
	}else{
		document.getElementById(thisTogBtn).innerHTML = "+";
		document.getElementById(thisTogDiv).style.display = "none";
	}
}
		

////manage forms
function formClose(){
	document.getElementById('formBack').style.display = "none";
	document.getElementById('formPop').style.display = "none";

}
function formOpen(){
	document.getElementById('formBack').style.display = "block";
	document.getElementById('formPop').style.display = "block";
}
function formToggle(){
	document.getElementById('formBackb').style.display = "block";
	document.getElementById('formBackb').style.display = "none";
	formOpen();
}	
	
//restricts characters that can be dropped into a field
function dStrip(e,myId,myTotal){
	//alert(myId);
	var data = e.dataTransfer.getData("Text");
	
	stripText(myId,data,myTotal);
	return false;
}

//restricts characters that can be pasted into a field
function pStrip(e,myId,myTotal){
	//alert(myId);
	var pastedText = undefined;
	if(window.clipboardData && window.clipboardData.getData){//IE
		pastedText = window.clipboardData.getData('Text');
	}else if(e.clipboardData && e.clipboardData.getData){
		pastedText = e.clipboardData.getData('text/plain');
	}
	
	stripText(myId,pastedText,myTotal);
	//alert(pastedText);//Process and handle text...
	
	return false;
}

//takes an element id and string, strips unwanted characters and passes to insertAtCaret
function stripText(myId,myText,myTotal){
	
	var stripped = myText.replace(/\//g, '-');
	myText = stripped.replace(/\|/g, '/');
	stripped = myText.replace(/\~/g, '-');
	myText = stripped.replace(/\*/g, '•');
 	stripped = myText.replace(/\</g, '[');
	myText = stripped.replace(/\#/g, 'num.');
	stripped = myText.replace(/\>/g, ']');
	//alert(stripped);
	//document.getElementById(myId).value = stripped;
	insertAtCaret(myId,stripped,myTotal);	
}

//takes an element id and a string and inserts string at insertion point of element
function insertAtCaret(areaId,text,myTotal) {
	
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var endPos = 0;
	var myBrowse = "";
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
		"ff" : (document.selection ? "ie" : false ) );
	if (br == "ie") { 
		txtarea.focus();
		myBrowse = "yes ie pre 9";
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		strPos = range.text.length;
		range.moveEnd ('character', -txtarea.value.length);
		endPos = range.text.length;
	}
	else if (br == "ff"){
		myBrowse = "not ie pre 9";
		strPos = txtarea.selectionStart;
		endPos = txtarea.selectionEnd;
	}
	//alert("myBrowse = \""+myBrowse+"\"");
	//alert("strPos = \""+strPos+"\"");
	//alert("endPos = \""+endPos+"\"");
	
	var front = (txtarea.value).substring(0,strPos);  
	var back = (txtarea.value).substring(endPos,txtarea.value.length); 
	//var back = (txtarea.value).substring(strPos,txtarea.value.length); 
	//alert("front = \""+front+"\"");
	//alert("back = \""+back+"\"");
	
	var myCnt = "charCnt_"+areaId;
	//alert("myCnt = \""+myCnt+"\"");
	var myLength = document.getElementById(areaId).value.length + text.length;
	//alert("myLength = \""+myLength+"\"");
	if(myLength > myTotal){
		document.getElementById(myCnt).innerHTML = "Max Characters of "+myTotal+" Reached!<br/>The text you pasted puts you over the max characters for the field.<br/>You will need to reduce the number of characters to submit changes.";
		document.getElementById(myCnt).style.color = '#FF0000';
	}else{
		document.getElementById(myCnt).innerHTML = "Max Characters = "+myTotal+". Character Count = "+myLength;
		document.getElementById(myCnt).style.color = '#000000';
	}
	
	
	
	txtarea.value=front+text+back;
	//txtarea.value=front+text+back;
	strPos = strPos + text.length;
	if (br == "ie") { 
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		range.moveStart ('character', strPos);
		range.moveEnd ('character', 0);
		range.select();
	}
	else if (br == "ff") {
		txtarea.selectionStart = strPos;
		txtarea.selectionEnd = strPos;
		txtarea.focus();
	}
	txtarea.scrollTop = scrollPos;
	
}


//limit the characters that can be keyed into a field
function myKey(e,myId,myTotal) {
	//alert(myId);
	var myLength = 0;
	var ret = false;
	
	var myCnt = "charCnt_"+myId;
	var myLength = document.getElementById(myId).value.length;
	if(myLength > myTotal){
		document.getElementById(myCnt).innerHTML = "Max Characters of "+myTotal+" Reached!<br/>The text you pasted puts you over the max characters for the field.<br/>You will need to reduce the number of characters to submit changes.";
		document.getElementById(myCnt).style.color = '#FF0000';
	}else{
		document.getElementById(myCnt).innerHTML = "Max Characters = "+myTotal+". Character Count = "+myLength;
		document.getElementById(myCnt).style.color = '#000000';
	}
	
	if(myLength <= myTotal){
		var k = e.keyCode == 0 ? e.charCode : e.keyCode;
		var myChar = String.fromCharCode(k);
		ret = (/[\sA-Z0-9\r\n\(\)\[\]\.\,\;\:\%\&\$\@\+\=\-\_\'\"\!\?\–\•\©\…\†\/]/ig.test(myChar));
	}else{
		//return false
	}
	return ret;
}

function checkCnt(myId,myTotal){
	var myCnt = "charCnt_"+myId;
	var myLength = document.getElementById(myId).value.length;
	if(myLength > myTotal){
		document.getElementById(myCnt).innerHTML = "Max Characters of "+myTotal+" Reached!<br/>The text you pasted puts you over the max characters for the field.<br/>You will need to reduce the number of characters to submit changes.";
		document.getElementById(myCnt).style.color = '#FF0000';
	}else{
		document.getElementById(myCnt).innerHTML = "Max Characters = "+myTotal+". Character Count = "+myLength;
		document.getElementById(myCnt).style.color = '#000000';
	}
}


//preps text for entry into data fields
function washText(thisText){
	thatText = thisText.replace(/\n/g, "[r]");
	thisText = thatText.replace(/\r/g, "[r]");
	thatText = thisText.replace(/\|/g, "[pipe]");
	thisText = thatText.replace(/\~/g, "[tilde]");
	thatText = thisText.replace(/\*/g, "[astrk]");
	thisText = thatText.replace(/\'/g, "[squot]");
	thatText = thisText.replace(/\"/g, "[quot]");
	thisText = thatText.replace(/\&amp;/g, "[amp]");
	thatText = thisText.replace(/\#/g, "[num]");
	thisText = thatText.replace(/\,/g, "[com]");
	thatText = thisText.replace(/\s/g, "[s]");
	thisText = thatText.replace(/\&/g, "[amp]");
	
	
	//return thatText;
	return thisText;
}
//send text to textarea display
function prepText(thisText){
	thatText = thisText.replace(/\[r\]/g, "\r");
	thisText = thatText.replace(/&tilde;/g, "~");
	thatText = thisText.replace(/<br\/>/g, "\r");
	thatText = thisText.replace(/<br>/g, "\r");
	thisText = thatText.replace(/\[pipe\]/g, "|");
	
	return thisText;
}
//send text back to html display
function displayText(thisText){
	//alert(thisText);
	thatText = thisText.replace(/\[r\]/g, "<br/>");
	thisText = thatText.replace(/\'/g, "&rsquo;");
	
	thatText = thisText.replace(/\[squot\]/g, "&rsquo;");
	thisText = thatText.replace(/\[quot\]/g, "&quot;");
	
	thatText = thisText.replace(/\"/g, "&quot;");
	thisText = thatText.replace(/\[num\]/g, "#");
	
	thatText = thisText.replace(/\[ast\]/g, "*");
	thisText = thatText.replace(/\n/g, "<br/>");
	
	thatText = thisText.replace(/\[r\]/g, "<br/>");
	thisText = thatText.replace(/\n/g, "<br/>");
	
	thatText = thisText.replace(/\[com\]/g, ",");
	thisText = thatText.replace(/\[s\]/g, " ");
	
	
	//alert(thisText);
	
	//return thatText;
	return thisText;
}

var rubricUi = new Array("Mission|Program Mission|A concise statement of the general values and principles which guide the curriculum and set a tone and a philosophical position from which follow a program's goals and objectives.|The mission indicates: what is expected of the program, the services it provides, and the target audience.|A program mission is presented but is missing one of the key components.|A program mission is presented but is missing more than one of the key components.|Mission is not specific to academic program or not presented.|",
	"Planning|Program Planning|The plan of action for maintaining, strengthening, or changing aspects of program delivery based on results of the program assessment.|Suggestions for program delivery are based on assessment results, clearly described, and clearly linked to improving student learning.|Description of suggestions for program delivery are provided but are not linked to improving student learning.|Suggestions for program delivery are vaguely described or not clearly linked to improving student learning.|Effects to program are not described.||Plan Aspect|Description of Action|Maintaining|Strengthening|Changing|",
	"Maintaining|Program Planning|The plan of action for maintaining, strengthening, or changing aspects of program delivery based on results of the program assessment.|Suggestions for program delivery are based on assessment results, clearly described, and clearly linked to improving student learning.|Description of suggestions for program delivery are provided but are not linked to improving student learning.|Suggestions for program delivery are vaguely described or not clearly linked to improving student learning.|Effects to program are not described.||Plan Aspect|Description of Action|Maintaining|Strengthening|Changing|",
	"Strengthening|Program Planning|The plan of action for maintaining, strengthening, or changing aspects of program delivery based on results of the program assessment.|Suggestions for program delivery are based on assessment results, clearly described, and clearly linked to improving student learning.|Description of suggestions for program delivery are provided but are not linked to improving student learning.|Suggestions for program delivery are vaguely described or not clearly linked to improving student learning.|Effects to program are not described.||Plan Aspect|Description of Action|Maintaining|Strengthening|Changing|",
	"Changing|Program Planning|The plan of action for maintaining, strengthening, or changing aspects of program delivery based on results of the program assessment.|Suggestions for program delivery are based on assessment results, clearly described, and clearly linked to improving student learning.|Description of suggestions for program delivery are provided but are not linked to improving student learning.|Suggestions for program delivery are vaguely described or not clearly linked to improving student learning.|Effects to program are not described.||Plan Aspect|Description of Action|Maintaining|Strengthening|Changing|",
	"Outcomes|Learning Outcomes|What students will know and be able to do when they graduate.|Program Learning Outcomes clearly describe in measurable terms what students are expected to know or be able to do.|Program Learning Outcomes describe in un- measurable terms what students are expected to know or be able to do.|Program Learning Outcomes are presented as general goals or objectives of the program.|Program Learning Outcomes are not included.|",
	"Methods|Assessment Methods|How the outcome will be measured. Who will be assessed, when, and how often.|Appropriate forms of direct evidence of student learning related to at least one Program Learning Outcome have been collected. Appropriate forms of indirect evidence were also collected.|Direct and indirect evidence of student learning have been collected but may not be appropriate to a specific Program Learning Outcome.|Only indirect evidence of student learning is collected.|Assessment methods are described in insufficient detail or not at all.|",
	"Criterion|Success Criterion|The level of performance which represents mastery and what proportion of students should be achieving mastery.|Appropriate methods for demonstrating mastery have been identified and achievement levels have been quantified.|Methods for demonstrating mastery or proportion for success may not provide interpretable data|Methods for demonstrating mastery are not measurable and/or levels for success are not defined.|Success Criterions are not included.|",
	"Findings|Assessment Findings|The assessment results and what they show about student learning.|Key assessment results for at least one Program Learning Outcome are presented and interpreted according to implications for program delivery.|Interpretations of assessment findings are presented, but results are not included.|Assessment findings are included but are not interpreted. |Findings from assessment activities are presented vaguely or not at all.|",
	"Results|Interpretation of Results|Who the findings were reviewed by and the changes that were made or will be made to the program or courses in the program based on the results.|Key assessment results for at least one Program Learning Outcome are:  presented, and  interpreted according to implications for program delivery.|Interpretations of assessment findings are presented, but results are not included.|Assessment findings are included but are not interpreted.|Findings from assessment activities are presented vaguely or not at all.|");
function getRubric(myId,myPos){
	//alert(myId+"-"+myPos);
	var myResult;
	var r;
	for(r in rubricUi){
		//myResult = rubricUi[r].split("|")[myPos];
		//alert(myId+"  -  "+rubricUi[r].split("|")[0]);
		if(myId == rubricUi[r].split("|")[0]){
			return rubricUi[r].split("|")[myPos];
			last;
		}
	}
	//return myResult;
}


function checkTextFormat(checkData,cd){
	var theAccept = "";
	var theReply = "";
	if(checkData.elements[cd].type == "textarea"){
		thisId = checkData.elements[cd].id;
		
			testString = document.getElementById(thisId).value;
			holdLine = testString.split("\r");
			tempLine = holdLine.join(" ");
			holdLine = tempLine.split("\n");
			testString = holdLine.join(" ");	
			//window.alert(testString);
			theReply = "letters, numbers, and punctuation except |";
			theAccept = /\|]/g;	
				if (theAccept.test(testString)){
					return theReply;
				}else{
					return "ok";
				}
		
	}else{
		theVal = checkData.elements[cd].accept;
		testString = checkData.elements[cd].value;
		if(theVal != ""){
			if(theVal == "numbers"){
				theAccept = /\D/;
				theReply = "numbers only";
			}
			if(theVal == "numbersTwo"){
				theAccept = /^\d\d$/;
				theReply = "numbers only: 12";
			}
			if(theVal == "numbersFour"){
				theAccept = /^\d\d\d\d$/;
				theReply = "4 numbers only) \n";
			}
			if(theVal == "currency"){
				theAccept = /^(\d{1,})\.(\d\d)$/;
				theReply = "numbers only: 22.22";
			}
			if(theVal == "zipcode"){
				theAccept = /^(([0-9]{5})|[-]{1}[0-9]{4})+$/;
				theReply = "12345 or 12345-1234";
			}
			if(theVal == "phone"){
				theAccept = /^(([0-9]{1}\s)?(((\(?\d{3}\)?){1,}( \d{3}-){1})|((\(?\d{3}\)?){1,}( \d{3}.){1})|((\(?\d{3}\)?){1,}( \d{3}\s){1}))\d{4})|^((\d{1}[ -])?\d{3}-\d{3}-\d{4})|^((\d{1}[ .])?\d{3}.\d{3}.\d{4})$/;
				theReply = "1 123-123-1234 or 1 \(123\) 123-1234";
			}
			if(theVal == "alpha"){
				theAccept = /^[a-zA-Z.-]+(\s[a-zA-Z.-]+)*?$/;
				theReply = "letters only";
			}
			if(theVal == "alphaName"){
				theAccept = /^[a-zA-Z.-]+(\s[a-zA-Z.-]+)*?$/;
				theReply = "letters, hyphen and period only";
			}
			if(theVal == "alphaNum"){
				theAccept = /^[\w\d\(\)\.\-\,\?]+(\s[\w\d\(\)\.\-\,\?]+)*?$/;
				theReply = "letters, numbers, punctuation only";
			}
			if(theVal == "latLong"){
				theAccept = /^(?!0\d)-?([0-8]?\d(\.\d{1,6})?|90(\.\d{1,6})?),(?!0\d)-?((\d{1,2}|1[0-7]\d)(\.\d{1,6})?|-?180(\.\d{1,6})?)$/;
				theReply = "[-]dd.dddddd,[-]ddd.dddddd no spaces";
			}
			if(theVal == "email"){
				theAccept = /^(([a-zA-Z0-9\-\_\.]+)*?([a-zA-Z0-9]+)){1,64}\@(([a-zA-Z0-9\.\-]+)*?([a-zA-Z0-9]+)){1,64}(\.[a-z]{2,6})$/;
				theReply = "letters, numbers and .-_ only: name@place.com";
			}
			if(theVal == "password" || theVal == "passwordEmpty"){
				theAccept = /^(?!.*\s).*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;
				theReply = "8 or more characters with 1 each of number,capital,lowercase and !@#$%^&*";
			}
			if (theAccept.test(testString)){
				return "ok";
			}else{
				return theReply;
			}
		}else{	
			return "ok";
		}
	}
}



//end

