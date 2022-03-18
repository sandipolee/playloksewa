let user_answer = localStorage.getItem("users_answer");
let all_question = localStorage.getItem("all_question");
const tag = sessionStorage.getItem("cIndex");
let quiz_data = "./assets/json/quize.json";
let score = 0;
let right = 0;
let wrong = 0;



let questionArray = JSON.parse(all_question);
let useransrArray = JSON.parse(user_answer);
console.log(useransrArray);

function fetchData() {

    fetch(quiz_data)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (let i = 0; i < 10; i++) {
                let question_index = questionArray[i];
                let tag_Data = data[tag]["data"];
                let correct_answer = tag_Data[question_index]["correctIndex"];
                let user_answers = tag_Data[question_index]["answers"][useransrArray[i]]

                if (correct_answer === user_answers) {
                    score = score + 2;
                    right = right++;
                    console.log("in this")
                } else {
                    wrong = wrong + 1;
                }
            }
            console.log(score);
            console.log(right / 10 * 100);
            console.log(wrong / 10 * 100 + "%");
        });
}
fetchData();