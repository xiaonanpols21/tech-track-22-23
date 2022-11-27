import "../styles/style.scss"; 

import * as d3 from 'd3';
import { cross, html, thresholdScott } from 'd3';

fetch('https://api.jikan.moe/v4/top/anime')
  .then((response) => response.json())
  .then((data) => {
	console.log(data)

	// Krijg de title, score en img van alle 25 uit de array
	const newArray = data.data.map(item => {
		return {
			title: item.title,
			score: item.score,
			img: item.url
		}
	})

	console.log(newArray)
  });