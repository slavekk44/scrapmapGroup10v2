/* 
	Page scroll code
*/

var scroller;

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

	// Update window height
	windowHeight = window.visualViewport.height;

	// Set body height to total number of sections
	document.body.style.height = `${windowHeight*numSections}px`;
}

// Initialise on page load
document.addEventListener('DOMContentLoaded', () => {
	numSections = document.getElementsByClassName('page-section').length;
	initScroller();
});

// On scroll event; does most of the work
document.addEventListener('scroll', () => {
	// Update pos
	pos = window.pageYOffset;

	// Calculate the closest section
	secPos = Math.round(pos / windowHeight);

	// Offset the page by the section position
	scroller.style.top = `${-secPos*windowHeight}px`;
});

// Handle window resizes
document.addEventListener('onresize', () => {
	initScroller();
});
