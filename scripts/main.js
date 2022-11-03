import '../styles/style.scss'
import * as d3 from 'd3';

function getData() {
	// Spotify API
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'c20e05d39emsh51bf7509082730ep146d0cjsn622276aaec1a',
			'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
		}
	};

	// Album
	fetch('https://spotify23.p.rapidapi.com/artist_albums/?id=3Nrfpe0tUJi4K4DXYWgMUX&offset=0&limit=100', options)
		.then(response => response.json())
		.then(response => {
			console.log(response);

			const newArray = [];

			response.forEach(item => {
				newArray,push(item["name"]);
			});

			console.log(newArray);
		})

		.catch(err => console.error(err));

	// Overview
	fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=3Nrfpe0tUJi4K4DXYWgMUX', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

	// BTS ID: 3Nrfpe0tUJi4K4DXYWgMUX

	/*
	const albums = response.map(item => ({
		name: ["Name"]
	}));
	console.log(albums);
	*/
}
getData();