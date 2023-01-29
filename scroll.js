/* 
	Page scroll code
*/

var scroller;

var sections;

var pos = 0; // Current scroll position
var secPos = 0; // Current section

var windowHeight;
var numSections;

/**
 * Initialise/re-initialise the page scroller
 * Either for page load or resolution changes
 */
function initScroller() {
	if (!scroller) {
		// Get scoller element
		scroller = document.getElementById('page-scroller');

		// Error if not found
		if (!scroller) console.error("Scroller element not found (was the script loaded on the wrong page?)");
	}

	// Init sections array
	if (!sections) {
		sections = document.getElementsByClassName('page-section');
		numSections = sections.length;
	}

	// Update window height
	windowHeight = window.visualViewport.height;

	// Set body height to total number of sections
	document.body.style.height = `${windowHeight*numSections}px`;
}

function updatePos() {
	// Update pos
	pos = window.pageYOffset;

	// Store old section position for comparison later
	var oldSecPos = secPos;

	// Calculate the closest section
	secPos = Math.round(pos / windowHeight);

	// Offset the page by the section position
	scroller.style.top = `${-secPos*windowHeight}px`;

	// If position changed trigger animations
	if (secPos != oldSecPos) {
		let s = sections[secPos];

		// Return if secPos is invalid
		if (!s) return;

		// Get animation code from HTML attribute
		let codeStr = s.getAttribute('onscrollto');

		// Return if animation is not set
		if (!codeStr) return;

		// Run the animation
		eval(codeStr);
	}
}

// Initialise on page load
document.addEventListener('DOMContentLoaded', () => {
	initScroller();

	// Handle window resizes
	document.body.onresize = () => {
		console.log("Resize: ", window.visualViewport.height);
		initScroller();
	};
});

// On scroll event; does most of the work
document.addEventListener('scroll', updatePos);
