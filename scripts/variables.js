// Dark Mode
const darkBtn = document.querySelector("header button");
const body = document.querySelector("body");

// Change to data
// Header
const profilePic = document.querySelector("header img")
const bandName = document.querySelector("h1");
const followers = document.querySelector("header p:first-of-type a");
const listeners = document.querySelector("header p:last-of-type a");

// Nav
const main = document.querySelector("main");
const buttons = document.querySelectorAll("nav button");
const firstBtn = document.querySelector("nav button:first-of-type");

// Zero state
const zeroBg = document.querySelector("section");
const zeroImg = document.querySelector("section img");
const showBtn = document.querySelector(".show-timeline");
const audio = document.querySelector("audio");

export default {
    darkBtn,
    body,

    profilePic,
    bandName,
    followers,
    listeners,

    main,
    buttons,
    firstBtn,

    zeroBg,
    zeroImg,
    showBtn,
    audio,
};