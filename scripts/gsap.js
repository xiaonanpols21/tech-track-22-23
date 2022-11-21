import * as v from "./variables.js"; 

import gsap from "gsap";

// Zero state
gsap.to(".zero-state .play", {
	rotation: 360,
	duration: 3,
	//repeat: -1
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
		duration: 0.5
	})
	.fromTo(".zero-state p", 
	{
		y: 400
	}, {
		y: 0,
		duraration: 0.5,
		stagger: 0.2
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

// Reversed bron: https://codepen.io/PointC/pen/WqKyye?editors=0010
v.gBtn.to("header button", {
	rotation: 180,
	duration: 0.3
});

v.gBtn.reversed(true);

function dgsap() {
	v.gBtn.reversed(!gBtn.reversed());
};
v.darkBtn.addEventListener("click", dgsap);

// Function Zero state button Gsap
function zeroStateGone() {
	const Timeout = setTimeout(zeroHidden, 1000);
	function zeroHidden() {
		v.zeroBg.classList.add("hidden");
	};

	v.audio.pause();

	gsap.fromTo(".zero-state", 
	{
		opacity: 1
	}, {
		opacity: 0,
		duration: 1
	});

	gsap.fromTo(".zero-state section", 
	{
		scale: 1,
		opacity: 1
	}, {
		scale: 3,
		opacity: 0,
		duration: 1
	});

	gsap.fromTo(".zero-state div", 
	{
		scale: 1,
		opacity: 1
	}, {
		scale: 3,
		opacity: 0,
		duration: 1
	});

	// Nav buttons
	gsap.fromTo("nav button", 
	{
		x :-200,
		opacity: 0
	}, {
		x: 0,
		opacity: 1,
		stagger: 0.2,
		duration: 0.2
	});

	// Header img
	gsap.to("header img", {
		rotation: 360,
		duration: 3
	});
}
v.showBtn.addEventListener("click", zeroStateGone);

