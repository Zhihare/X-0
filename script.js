// ************************************Практика************************************ \\

// Потрібно створити гру хрестики нулики.
// Відмалюй розмітку ігрового поля для контейнера з класом "content", для кожної клітинки застосуй клас "item"
// Реалізуй делегування подій на ігровому полі для можливості ходу.
// Скріпт має самостійно визначати переможця гри та виводити модальне вікно з переможцем (X/O)
// Для історії ходів наших гравців (Х/О) потрібно щоб кожна клітинка ігрового поля містила дата атрибут id
// Створи скріпт для перевірки виграшної комбінації, список всіх можливих виграшних комбінацій знаходиться в масиві combination.
// Для виводу модального вікна застосуй бібліотеку basiclightbox
// Після визначення переможця обов'язково підготуй ігрове поле для наступної гри

const combination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [1, 5, 9],
    [3, 5, 7],
    [3, 6, 9],
];

const historyX = [];
const history0 = [];

let player = "X";

const content = document.querySelector(".content");
content.addEventListener("click", handleClick);

createMarkup();

function createMarkup() {
    let markup = "";
    for (let i = 1; i <= 9; i += 1) {
        markup += `<div class="item" data-id="${i}"></div>`
    }
    content.innerHTML = markup;
}

function handleClick(e) {
    console.log(e.target);
    if (e.target.textContent || e.target === e.currentTarget) {
        return;
    }

    const id = Number(e.target.dataset.id);
    let isWinner = false;

    if (player === "X") {
        historyX.push(id);
        isWinner = historyX.length >= 3 ? checkWinner(historyX) : false
    } else {
        history0.push(id);
        isWinner = historyX.length >= 3 ? checkWinner(history0) : false
    }

    if (isWinner) {
        const instance = basicLightbox.create(
            `<div class:"box>
             <style>
      h1 { color: green; }
    </style>
            <h1>Player ${player} is winner</h1>
            </div>"`
        );
        instance.show();
        resetGame();
        return;
    }

    if (historyX.length === 5 && history0.length === 4) {
        const instance = basicLightbox.create(
            `<div class:"box>
             <style>
      h1 { color: red; }
    </style>
            <h1>Players is not winners</h1>
            </div>"`
        );
        instance.show();
        resetGame();
        return;

    }

    e.target.textContent = player;
    player = player === "X" ? "O" : "X";

    console.log(historyX);
    console.log(history0);
}

function checkWinner(history) {
    return combination.some(item => item.every(id => history.includes(id)));
}


function resetGame() {
    createMarkup();
    player = "X";
    historyX.splice(0);
    history0.splice(0);
}