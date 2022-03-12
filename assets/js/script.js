document.onload(alert(loading))

function toggle() {
    let nav = document.querySelector("#nav-bar")
    if (nav.classList.contains("nav-toggle")) {
        nav.classList.replace("nav-toggle", "nav-bar")
    } else
        nav.classList.replace("nav-bar", "nav-toggle")
}

function playquiz(cIndrex) {
    sessionStorage.setItem("cIndex", cIndrex);
    location.href = "./play.html";
}