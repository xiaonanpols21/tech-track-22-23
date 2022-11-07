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

			// Albums
			const albums = [];
			response.data.artist.discography.albums.items.forEach(item => {
				albums.push(item.releases.items[0]);
			});
			console.log(albums);
		})

		.catch(err => console.error(err));

	// Overview
	fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=3Nrfpe0tUJi4K4DXYWgMUX', options)
		.then(response => response.json())
		.then(response => {
			//console.log(response);

			const btsName = response.data.artist.profile.name;
			console.log(btsName);
		})
		.catch(err => console.error(err));

	// BTS ID: 3Nrfpe0tUJi4K4DXYWgMUX
}
getData();

function txtContent() {
	let bandName = document.querySelector("h1");
	let followers = document.querySelector("header p:first-of-type a");
	let linteners = document.querySelector("header p:last-of-type a");
	bandName.textContent = Object.keys(getData(btsName));
}
txtContent();

