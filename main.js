// Set up theming and other event listeners
document.addEventListener('DOMContentLoaded', () => {
	// Load theme
	let theme = localStorage.getItem('theme');
	let body = document.body;
	let themeToggle = document.getElementById('theme-toggle');
	if (theme) {
		body.classList.add(theme);
		if (theme == 'light')
			themeToggle.classList.add('on');
	}

	// Fix sidebar height and margin
	let header = document.getElementById('header');
	let sidebar = document.getElementById('sidebar');
	let content = document.getElementById('content-container');

	let margin = header.offsetHeight + "px";

	sidebar.style.marginTop = margin;
	sidebar.style.height = `calc(100vh - ${margin})`;
	if (content) content.style.marginTop = margin;

	// Add event listeners for toggles
	let toggles = document.getElementsByClassName('toggle');
	for (var i=0; i<toggles.length; i++) {
		let t = toggles[i];
		t.addEventListener('click', () => {
			if (t.classList.contains('on'))
				t.classList.remove('on');
			else
				t.classList.add('on');
		});
	}

	// Add specific event listeners
	if (themeToggle) themeToggle.addEventListener('click', () => {
		if (body.classList.contains('light')) {
			body.classList.remove('light');
			localStorage.setItem('theme', 'dark');
		} else {
			body.classList.add('light');
			localStorage.setItem('theme', 'light');
		}
	});
});

// Add event listener for sidebar
document.addEventListener('DOMContentLoaded', () => {
	let sidebarOpen = document.getElementById('sidebar-open');
	let sidebar = document.getElementById('sidebar');

	sidebarOpen.addEventListener('click', () => {
		if (sidebar.classList.contains('show'))
			sidebar.classList.remove('show');
		else
			sidebar.classList.add('show');
	});
});

// OLD VERSION
// document.addEventListener('DOMContentLoaded', () => {
// 	let sidebarOpen = document.getElementById('sidebar-open');
// 	let sidebar = document.getElementById('sidebar');

// 	let compStyle = getComputedStyle(sidebar);

// 	if (!sidebar.style.width) sidebar.style.width = '0';

// 	sidebarOpen.addEventListener('click', () => {
// 		console.log(compStyle.getPropertyValue('--sidebar-width'));
// 		if (sidebar.style.width == '0px')
// 			sidebar.style.width = compStyle.getPropertyValue('--sidebar-width');
// 		else
// 			sidebar.style.width = '0';
// 	});
// });
