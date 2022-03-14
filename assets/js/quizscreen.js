// timer js

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// display quze js code

let currentQuestion = 0;
let score = 0;
let question_count = 1;
let correctans_count = 0;
let Wrongans_count = 0;
let users_answers = [];

const tag = sessionStorage.getItem("cIndex");
let quiz_data = "./assets/json/quize.json";

function fetchData() {

    fetch(quiz_data)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            show(data);
        });
}
fetchData();

function show(qdata) {
    getquestion();
    let tag_Data = qdata[tag]["data"];
    let ans = tag_Data[currentQuestion]["answers"];

    let question = document.querySelector("#qesdiv");
    let ans_ul = document.querySelector("#ans-area");



    question.innerHTML = question_count + ". " + tag_Data[currentQuestion]["question"];
    ans_ul.innerHTML = `<li class="optionQ" id="0">${ans[0]} </li>
    <li class="optionQ" id="1">${ans[1]} </li>
    <li class="optionQ" id="2">${ans[2]} </li>
    <li class="optionQ" id="3">${ans[3]} </li>`;
    toogleclick();

}

function getrandom(max) {
    return Math.floor(Math.random() * max)
}

function getquestion() {
    currentQuestion = getrandom(4);
}

function getnewque() {
    let increaser = getrandom(4);
    if (increaser === 0) {
        getnewque();

    } else {
        currentQuestion = currentQuestion + increaser;
    }

}

function nextbtn(qdata) {

    getnewque()

    let tag_Data = qdata[tag]["data"];
    let ans = tag_Data[currentQuestion]["answers"];
    let question = document.querySelector("#qesdiv");
    let ans_ul = document.querySelector("#ans-area");


    question.innerHTML = question_count + ". " + tag_Data[currentQuestion]["question"];
    ans_ul.innerHTML = `<li class="optionQ" id="0">${ans[0]} </li>
    <li class="optionQ" id="1">${ans[1]} </li>
    <li class="optionQ" id="2">${ans[2]} </li>
    <li class="optionQ" id="3">${ans[3]} </li>`
    toogleclick()
}

function next() {
    question_count++;
    getuseranswer();
    let userAnswer = document.querySelector(".activequiz").id;
    users_answers.push(userAnswer);
    fetch(quiz_data)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            nextbtn(data);
        });
}

function toogleclick() {
    let optionQ = document.querySelectorAll(".optionQ");
    for (let i = 0; i < optionQ.length; i++) {
        optionQ[i].onclick = function() {
            for (let j = 0; j < optionQ.length; j++) {
                if (optionQ[j].classList.contains("activequiz")) {
                    optionQ[j].classList.remove("activequiz");
                }
            }
            optionQ[i].classList.add("activequiz");
        }

    }

}

function getuseranswer() {
    let userAnswer = document.querySelector(".activequiz").id;
}