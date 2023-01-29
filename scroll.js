/* 
	Page scroll code
*/

var scroller;

var sections = [];
var sectionPos = [];

var pos = 0; // Current scroll position
var secPos = 0; // Current section

var windowHeight = 0;

function initScoller() {
	scroller = document.getElementById('page-scroller');
	if (!scroller) console.error("Scroller element not found (was the script loaded on the wrong page?)");
	windowHeight = window.visualViewport.height;

	// Set body height to total number of sections
	document.body.style.height = `${windowHeight*sections.length}px`;
}

// Set up arrays
document.addEventListener('DOMContentLoaded', () => {
	// Get page sections
	sections = document.getElementsByClassName('page-section');

	initScoller();

	// Get section positions on page
	for (var i=0; i<sections.length; i++) {
		let s = sections[i];
		sectionPos[i] = s.offsetTop;
	}
});

// On scroll event; does most of the work
document.addEventListener('scroll', () => {
	pos = window.pageYOffset;

	oldSecPos = secPos;

	secPos = Math.round(pos / windowHeight); // Calculate the closest section

	let top = -(secPos*windowHeight);

	console.log(top);

	scroller.style.top = `${top}px`;
});

// Handle window resizes
document.addEventListener('onresize', () => {
	console.log("Resized to: ", window.visualViewport.height);
	initScoller();
});
