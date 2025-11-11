const textarea = document.getElementById('search-box');
// const maxHeight = 200; // max-height in CSS
const maxHeight = parseInt(window.getComputedStyle(textarea).getPropertyValue('max-height').slice(0,-2));
console.log(maxHeight);

function resizeTextArea() {}
// function resizeTextArea() {
//     textarea.style.height = 'auto';

//     if (textarea.scrollHeight > maxHeight) {
//         textarea.style.height = `${maxHeight}px`;
//         textarea.style.overflowY = 'scroll';
//     } else {
//         textarea.style.height = `${textarea.scrollHeight}px`;
//         textarea.style.overflowY = 'hidden';
//     }
// }
// }

textarea.addEventListener('input', function() {
this.style.height = 'auto';
if (this.scrollHeight > maxHeight) {
this.style.height = `${maxHeight}px`;
this.style.overflowY = 'scroll';
} else {
this.style.height = `${this.scrollHeight}px`;
this.style.overflowY = 'hidden';
}
});
