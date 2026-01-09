const battle = document.getElementById("battle");
const gameSelect = document.getElementById("game_select");
const stage = document.getElementById("stage");
const resultText = document.getElementById("result");

function getWeapon(calc) {
  if (calc < 0.2) {
    return "🗿";
  } else if (calc >= 0.21 && calc < 0.4) {
    return "✂️";
  } else if (calc >= 0.41 && calc < 0.6) {
    return "📄";
  } else if (calc >= 0.61 && calc < 0.8) {
    return "🦎";
  } else {
    return "🖖";
  }
}

function move(real) {
  if (real) {
    battle.classList.remove("height-0");
    gameSelect.classList.remove("height-100");

    battle.classList.add("height-100");
    gameSelect.classList.add("height-0");
  } else {
    battle.classList.remove("height-100");
    gameSelect.classList.remove("height-0");

    battle.classList.add("height-0");
    gameSelect.classList.add("height-100");
  }
}

function startGame(choose) {
  let result = getWeapon(Math.random());

  stage.innerText = choose + " V.S " + result;
  if (result === choose) {
    resultText.innerText = "Draw";
  } else if (
    (result === "✂️" && choose === "🗿") ||
    (result === "📄" && choose === "✂️") ||
    (result === "🗿" && choose === "📄") ||
    (result === "🦎" && choose === "🗿") ||
    (result === "🖖" && choose === "🦎") ||
    (result === "✂️" && choose === "🖖") ||
    (result === "🦎" && choose === "✂️") ||
    (result === "📄" && choose === "🦎") ||
    (result === "🖖" && choose === "📄") ||
    (result === "🗿" && choose === "🖖")
  ) {
    resultText.innerText = "You Win";
  } else {
    resultText.innerText = "You Lose";
  }

  move(true);
}

const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
  move(false);
});
