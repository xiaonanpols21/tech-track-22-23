import * as v from "./variables.js"; 

import gsap from "gsap";

// Bron: https://www.sitepoint.com/get-url-parameters-with-javascript
const urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('animation') == 'false') {
	showZeroState();
}

function showZeroState() {
	v.zeroBg.classList.add("hidden");
}

beginAnimation();

function beginAnimation() {
	// Zero state
	gsap.to(".zero-state .play", {
		rotation: 360,
		duration: 3,
	});

	gsap.fromTo(".zero-img", 
		{
			rotation: -180,
			transformOrigin: "left bottom"
		}, {
			rotation: 0,
			duration: 2
		}
	);

	const animation = gsap.timeline();
	animation
		.fromTo(".zero-state h4", 
		{
			y: 400
		}, {
			y: 0,
			duration: .5
		})
		.fromTo(".zero-state p", 
		{
			y: 400
		}, {
			y: 0,
			stagger: .2
		});

	gsap.fromTo(".show-timeline",
		{
			scale: 5,
			opacity: 0
		}, {
			scale: 1,
			opacity: 1,
			duration: 1
		}
	);

	v.audio.pause();
};

// Reversed bron: https://codepen.io/PointC/pen/WqKyye?editors=0010
v.gBtn.to("header button", {
	rotation: 180,
	duration: .3
});

v.gBtn.reversed(true);

function dgsap() {
	v.gBtn.reversed(!v.gBtn.reversed());
};
v.darkBtn.addEventListener("click", dgsap);
