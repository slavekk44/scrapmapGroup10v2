/* 
	Page scroll code
*/

var scrollSensitivity = 1; // Not currently working

var scroller;

var sections;

var pos = 0; // Current scroll position
var secPos = 0; // Current section

var windowHeight;
var numSections;

// Button stuff
var buttons = [];

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
	document.body.style.height = `${(windowHeight*(numSections))/scrollSensitivity}px`;
}

function updatePos() {
	// Update pos
	pos = window.pageYOffset;

	// Store old section position for comparison later
	var oldSecPos = secPos;

	// Calculate the closest section
	secPos = Math.round((pos*scrollSensitivity)/windowHeight);

	// Offset the page by the section position
	scroller.style.top = `${-secPos*windowHeight}px`;

	// If position changed trigger animations and update buttons
	if (secPos != oldSecPos) {
		updateRadioButtons();

		// Trigger css animations
		for (var i=0; i<numSections; i++) {
			let s = sections[i];

			if (i == secPos)
				s.classList.add('anim-end');
			else
				s.classList.remove('anim-end');
		}

		// Calculate the scroll direction
		let dir = Math.sign(secPos - oldSecPos);

		// Function to trigger the animation for section e
		const anim = (e) => {
			let s = sections[e];

			// Return if secPos is invalid
			if (!s) return;

			// Get animation code from HTML attribute
			let codeStr = s.getAttribute('onscrollto');

			// Return if animation is not set
			if (!codeStr) return;

			// Run the animation
			eval(codeStr);
		};

		// If scrolling down
		if (dir > 0)
			// Trigger animations between the last section and (including) the current one
			for (var i=oldSecPos; i<=secPos; i++) anim(i);
		
		// If scrolling up
		else if (dir < 0)
			// Trigger animations between the last section and (including) the current one
			for (var i=oldSecPos; i>=secPos; i--) anim(i);
	}
}

function createRadioButtons() {
	// Create container and assign id
	let container = document.createElement('div');
	container.id = 'page-buttons';

	// Create each button
	for (var i=0; i<numSections; i++) {
		// Create element
		let b = document.createElement('div');

		// Store the page to scroll to
		b.setAttribute('section', i);

		// Add hover text (defined in HTML, defaults to number)
		let secname = sections[i].getAttribute('secname');
		b.setAttribute('title', `Go to ${secname ? secname : ("section " + (i+1))}`);

		// Add event listener
		b.addEventListener('click', () => {
			if (b.classList.contains('current')) return;
			let n = b.getAttribute('section');
			scrollTo(0, n*windowHeight);
		});
		
		// Add to array and container
		buttons.push(b);
		container.appendChild(b);
	}

	// Add container to page
	document.body.appendChild(container);
}

function updateRadioButtons() {
	for (var i=0; i<numSections; i++) {
		if (i == secPos) {
			buttons[i].classList.add('current');
		} else {
			buttons[i].classList.remove('current');
		}
	}
}

// Initialise on page load
document.addEventListener('DOMContentLoaded', () => {
	initScroller();

	// Handle window resizes
	document.body.onresize = () => {
		console.log("Resize: ", window.visualViewport.height);
		initScroller();
		updatePos();
	};

	// Create buttons
	createRadioButtons();

	// Update buttons to initial state
	updateRadioButtons();
});

// On scroll event; does most of the work
document.addEventListener('scroll', updatePos);
