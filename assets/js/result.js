let user_answer = localStorage.getItem("users_answer");
let all_question = localStorage.getItem("all_question");
const tag = sessionStorage.getItem("cIndex");
let quiz_data = "./assets/json/quize.json";
let score = 0;
let right = 0;
let wrong = 0;
let tagline;


let questionArray = JSON.parse(all_question);
let useransrArray = JSON.parse(user_answer);
console.log(useransrArray);

function fetchData() {

    fetch(quiz_data)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            tagline = data[tag]["tag"];
            document.querySelector("#text").innerHTML = "Category /" + tagline + "/ Result"
            for (let i = 0; i < 10; i++) {
                let question_index = questionArray[i];
                let tag_Data = data[tag]["data"];
                let correct_answer = tag_Data[question_index]["correctIndex"];
                let user_answers = useransrArray[i]
                if (correct_answer == user_answers) {
                    score = score + 2;
                    right = right + 1;

                } else {
                    wrong = wrong + 1;
                }
            }
            // for score
            document.querySelector("#score-number").innerHTML = `${score}/20`;
            // for right
            document.querySelector("#right-number").innerHTML = `${right / 10 * 100}%`;
            // for wrong
            document.querySelector("#wrong-number").innerHTML = `${wrong / 10 * 100}%`;

            console.log(right / 10 * 100 + "%");
            console.log(wrong / 10 * 100 + "%");
        });
}
fetchData();

function showResult() {
    fetch(quiz_data)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            tagline = data[tag]["tag"];
            document.querySelector("#text").innerHTML = "Category /" + tagline + "/ Result"
            for (let i = 0; i < 10; i++) {
                let question_index = questionArray[i];
                let tag_Data = data[tag]["data"];
                let correct_answer = tag_Data[question_index]["correctIndex"];
                let user_answers = tag_Data[question_index]["answers"][useransrArray[i]]
                let question = tag_Data[questionArray[i]]["question"];
                // console.log(question);
                // console.log(correct_answer);
                let anser_area = document.querySelector("#checkans");
                anser_area.innerHTML = anser_area.innerHTML + `<h2 id="qesdiv"> ${question}</h2>`
                for (let j = 0; j < 4; j++) {
                    let anser = tag_Data[questionArray[i]]["answers"][j];
                    let right_answer = tag_Data[questionArray[i]]["answers"][correct_answer];

                    if (user_answers == right_answer && anser == right_answer) {
                        anser_area.innerHTML = anser_area.innerHTML + `<p class="answer sucess "> **good** ${anser}</p>`
                    } else if (anser == user_answers) {
                        anser_area.innerHTML = anser_area.innerHTML + `<p class="answer danger ">**bad**${anser}</p>`

                    } else if (anser == right_answer) {
                        anser_area.innerHTML = anser_area.innerHTML + `<p class="answer sucess "> ${anser}</p>`

                    } else { anser_area.innerHTML = anser_area.innerHTML + `<p class="answer" > ${anser}</p>` }


                }

            }

        });

}