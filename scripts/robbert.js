import '../styles/style.scss'
import * as d3 from 'd3';
import { html } from 'd3';

// Tutorial robbert
const main = document.querySelector('main');
const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
	button.addEventListener('click', filter)
});

for(let i = 1; i < 6; i++) {
	let newEl = document.createElement('article');
	newEl.setAttribute('data-name', i);
	newEl.innerHTML = `Jaar: ${i}`;
	main.appendChild(newEl);
};

function filter(e) {
	let allItems = document.querySelectorAll('main article');
	
	allItems.forEach(item => {
		item.classList.add('hidden');
		
		if(item.getAttribute('data-name') === e.target.value) {
			console.log('match!', e.target.value);
			item.classList.remove('hidden');
		};
	});
};

function randomNumber(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
};


// TODO: , filter year slider, object server


