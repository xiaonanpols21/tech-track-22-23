// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

console.log('Hello, world!');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c20e05d39emsh51bf7509082730ep146d0cjsn622276aaec1a',
		'X-RapidAPI-Host': 'k-pop.p.rapidapi.com'
	}
};

fetch('https://k-pop.p.rapidapi.com/boy-groups?q=BTS&by=Group%20Name', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));