import * as v from "./variables.js"; 

import gsap from "gsap";

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
		stagger: .2,
		duration: .2
	});

	// Header img
	gsap.to("header img", {
		rotation: 360,
		duration: 3
	});
}
v.showBtn.addEventListener("click", zeroStateGone);

export {
    zeroStateGone
}