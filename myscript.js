var ccText = "Hi<contact name>,\n\n" +
"I'm a great fit for the position \"<position title>\" because of my 4 years experience with web technologies including frontend and backend. I've got a lot of practice on server side with PHP stack and Apache+Nginx servers. Developed web apps using HTML5, CSS3, JavaScript with jQuery and MVC framework AngularJS, familiar with Chrome DevTools including profiler.\n\n" +
"I'm looking forward to add value to <company name>!";

var archiveText = "<company name> (<position name>) - \"<contact name>\"\n<url>";

// var emailText = "Hi<contact name>,\n\n" +
// "I found out that you need a web developer.\n" +
// "I'm a great fit for the position \"<position title>\" because of my 4 years experience with web technologies including frontend and backend. I've got a lot of experience on server side with PHP stack and Apache+Nginx servers. Developed web apps using HTML5, CSS3, JavaScript with jQuery and MVC framework AngularJS, familiar with Chrome DevTools including profiler.\n\n" +
// "I'm looking forward to add value to <company name>!";

var servedCompanies = [
	"SUPERMICRO COMPUTER INC",
	"WinMax Systems Corporation",    // <- first serious contact
	"Provide Commerce",
	"Task Management Inc",
	"Marsh Consulting Services",
	"Samiti Technology Inc.",
	"Ascent",
	"Technosoft Engineering",
	"Santa Cruz Biotechnology, Inc.",
	"Global Infotech Corporation",
	"Elti Solutions",                 // <- my favorite (russians are here)
	"Spruce Technology Inc.",
	"Adept Solutions Inc",
	"MindWorld LLC",
	"SMCI",
	"Skyrocket Ventures",
];

var contactName,
	jobTitle,
	companyName,
	jobDesc,

	emailRegex,
	emailInDesc;

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function gatherData() {
	contactName = $("#contactName").html().trim();
	jobTitle    = $($(".rel100.fillForm .titleRow .leftCol .padRow span")[0]).html().trim();
	companyName = $($(".rel100.fillForm .titleRow .leftCol .padRow span")[4]).html().trim();
	jobDesc     = $("#jobDescription").html().trim();

	emailRegex     = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
	emailInDesc    = emailRegex.exec(jobDesc);
}

function checkData() {
	console.log("MYSCRIPT. contact name: >" + contactName + "<");
	console.log("MYSCRIPT. contact name: >" + jobTitle    + "<");
	console.log("MYSCRIPT. contact name: >" + companyName + "<");

	if (jobTitle === "" || companyName === "") {
		alert("CAN'T FIND JOB TITLE OR COMPANY NAME");
		return;
	}

	if ($.inArray(companyName, servedCompanies) != -1) {
		alert("THIS COMPANY HAS ALREADY BEEN SERVED");
	}

	// if (emailAvailable) {
	// 	$("#jobInfo").click();
	// 	alert("email available in job description.\nTake a look.");
	// }
}

function prepareData() {
}

function prepareCCText() {
	var contactName = this.contactName;
	if (contactName !== "") {
		if (contactName.indexOf(" ") !== -1)
			contactName = contactName.substr(0, contactName.indexOf(" "));
		ccText = ccText.replace("<contact name>", " " + contactName);
	}
	else
		ccText = ccText.replace("<contact name>", "");
	ccText = ccText.replace("<position title>", jobTitle);
	ccText = ccText.replace("<company name>",   companyName);

	if (emailInDesc !== null)
		ccText = "e-mail: " + emailInDesc + "\n\n" + ccText;

	$("textarea#coverLetterText").val(ccText);

	jQuery.ajax({

		url: 'http://localhost:3000/',
		data: {
			companyName: companyName,
			jobTitle: jobTitle,
			contactName: contactName,
			url: document.URL,
			ccText: ccText			
		},
		crossDomain: true,
		dataType: 'jsonp',
		success: function() { alert("Success"); },
		error: function() { alert("Failed!"); },
	});
}

function prepareArchiveText() {
	archiveText = archiveText.replace("<company name>",  companyName);
	archiveText = archiveText.replace("<position name>", jobTitle);
	archiveText = archiveText.replace("<contact name>",  contactName);
	archiveText = archiveText.replace("<url>",           document.URL);

	copyToClipboard(archiveText);
}

$(document).ready(function(){
	if (document.URL === "http://dice.com/")
		alert('DON\'T FORGET TO START SERVER!!!');

	gatherData();
	checkData();
	prepareData();
	prepareCCText();
	prepareArchiveText();
});