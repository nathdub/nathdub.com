const searchBox = document.getElementById('search-box');
const cursor = document.getElementById('cursor');
const cursorDefault = document.getElementById('cursor-default');
const cursorIbeam = document.getElementById('cursor-ibeam');
const cursorPointer = document.getElementById('cursor-pointer');
const searchButton = document.getElementById('search-button');

const urlParams = new URLSearchParams(window.location.search);
const showcase = urlParams.get('showcase');
const searchText = urlParams.get('q');


// const maxHeight = 200; // max-height in CSS
const maxHeight = parseInt(window.getComputedStyle(searchBox).getPropertyValue('max-height').slice(0, -2));
console.log(maxHeight);

function resizeTextArea() {
	this.style.height = 'auto';
	if (this.scrollHeight > maxHeight) {
		this.style.height = `${maxHeight}px`;
		this.style.overflowY = 'scroll';
	} else {
		this.style.height = `${this.scrollHeight}px`;
		this.style.overflowY = 'hidden';
	}
};

searchBox.addEventListener('input', () => resizeTextArea.call(searchBox));

searchBox.value = '';
resizeTextArea.call(searchBox);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const setCursorType = (type) => {
	cursorDefault.style.display = (type == 'default') ? 'block' : 'none';
	cursorIbeam.style.display = (type == 'ibeam') ? 'block' : 'none';
	cursorPointer.style.display = (type == 'pointer') ? 'block' : 'none';
};

const moveCursor = (element) => {
	return new Promise(resolve => {
		const rect = element.getBoundingClientRect();
		const x = rect.left + (rect.width / 2) + window.scrollX;
		const y = rect.top + (rect.height / 2) + window.scrollY;

		cursor.style.left = `${x}px`;
		cursor.style.top = `${y}px`;

		setTimeout(resolve, 1000);
	});
};

const typeText = (element, text) => {
	return new Promise(resolve => {
		let i = 0;
		const typingInterval = setInterval(() => {
			if (i < text.length) {
				element.value += text.charAt(i);
				i++;
				resizeTextArea.call(searchBox);
			} else {
				clearInterval(typingInterval);
				resolve();
			}
		}, 100);
	});
};


// async () => {
//     await moveCursor(searchBox);
//     setCursorType('ibeam');
//     await typeText(searchBox, searchText);
//     setCursorType('default');
//     await moveCursor(searchButton);
//     setCursorType('pointer');
//     setTimeout(1000)
//     setCursorType('default');
// }


const startAnimation = async () => {
	await moveCursor(searchBox);
	setCursorType('ibeam');

	await typeText(searchBox, searchText);

	setCursorType('default');
	await moveCursor(searchButton);
	setCursorType('pointer');

	setTimeout(() => {
		const encodedQuery = encodeURIComponent(searchText);
		window.location.href = `https://www.google.com/search?q=${encodedQuery}`;
	}, 1000);
};

// const startAnimation = async () => {
//     const target = document.getElementById('target');
//     await moveCursor(target);
//     setCursorType('default');
//     setCursorType('pointer');
//     setCursorType('ibeam');


//     // setTimeout(() => {
//     //     const encodedQuery = encodeURIComponent(searchText);
//     //     window.location.href = `https://www.google.com/search?q=${encodedQuery}`;
//     // }, 1000);
// };



if (showcase === null) {
	startAnimation();
} else {
	setCursorType('none');
	searchBox.readOnly = false;
}