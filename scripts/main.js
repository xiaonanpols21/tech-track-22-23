// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

console.log('Hello, world!');

const seconds = 10;

function getData() {
	console.log('Grabbing new userdata...');
	
	fetch('https://opensheet.elk.sh/1tO9SS1f9RQZ0Ay0BmkczJVkCxWcAhzGtcSDpzheKTZI/responses')
		.then(res => res.json())
		.then(data => {
					
			const newArray = [];
			
			data.forEach(item => {
				newArray.push(item["Welke kleur kledingstukken heb je aan vandaag? (Meerdere antwoorden mogelijk natuurlijk...)"])
			})
					
			let editedArray = newArray.map(item => item.split(','));
			console.log(editedArray.flat())
		
			let clothes = {};
		
			editedArray.flat().forEach(color => {
				color = color.trim();
				
				if(!clothes[color]) {
					clothes[color] = 0;
				}
				
				clothes[color] = clothes[color] + 1;
			})
		
			console.log(clothes);
		
		});
	}

// setInterval(getData, seconds * 1000)

getData();
