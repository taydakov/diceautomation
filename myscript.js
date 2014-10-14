var ccText = "Hi<contact name>,\n\n" +
"I'm a great fit for the position \"<position title>\" because of my 4 years experience with web technologies including frontend and backend. I've got a lot of experience on server side with PHP stack and Apache+Nginx servers. Developed web apps using HTML5, CSS3, JavaScript with jQuery and MVC framework AngularJS, familiar with Chrome DevTools including profiler.\n\n" +
"I'm looking forward to add value to <company name>!";

// var emailText = "Hi<contact name>,\n\n" +
// "I found out that you need a web developer.\n" +
// "I'm a great fit for the position \"<position title>\" because of my 4 years experience with web technologies including frontend and backend. I've got a lot of experience on server side with PHP stack and Apache+Nginx servers. Developed web apps using HTML5, CSS3, JavaScript with jQuery and MVC framework AngularJS, familiar with Chrome DevTools including profiler.\n\n" +
// "I'm looking forward to add value to <company name>!";

var contactName,
	jobTitle,
	companyName,
	jobDesc,

	emailRegex,
	emailAvailable;

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function gatherData() {
	contactName = $("#contactName").html().trim();
	jobTitle    = $($(".rel100.fillForm .titleRow .leftCol .padRow span")[0]).html().trim();
	companyName = $($(".rel100.fillForm .titleRow .leftCol .padRow span")[4]).html().trim();
	jobDesc     = $("#jobDescription").html().trim();

	emailRegex     = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
	emailAvailable = (emailRegex.exec(jobDesc) !== null);
}

function checkData() {
	console.log("MYSCRIPT. contact name: >" + contactName + "<");
	console.log("MYSCRIPT. contact name: >" + jobTitle    + "<");
	console.log("MYSCRIPT. contact name: >" + companyName + "<");

	if (jobTitle === "" || companyName === "") {
		alert("CAN'T FIND JOB TITLE OR COMPANY NAME");
		return;
	}

	if (emailAvailable) {
		$("#jobInfo").click();
		alert("email available in job description.\nTake a look.");
	}
}

function prepareText() {
	if (contactName !== "") {
		if (contactName.indexOf(" ") !== -1)
			contactName = contactName.substr(0, contactName.indexOf(" "));
		ccText = ccText.replace("<contact name>", " " + contactName);
	}
	else
		ccText = ccText.replace("<contact name>", "");
	ccText = ccText.replace("<position title>", jobTitle);
	ccText = ccText.replace("<company name>",   companyName);

	$("textarea#coverLetterText").val(ccText);
}

$(document).ready(function(){
	gatherData();
	checkData();
	prepareText();
});