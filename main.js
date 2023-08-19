// Вопросы викторины
const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

// Находим элементы
const headerContainer = document.getElementById("header");
const listContainer = document.getElementById("list");
const submitBtn = document.getElementById("submit");

// Переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function showQuestion() {
  // Вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;
  let answerNumber = 1;
  // Варианты ответов
  for (const answerText of questions[questionIndex]["answers"]) {
    const questionTamplate = ` 
 <li>
   <label>
     <input type="radio" class="answer" name="answer" value="%number%" />
     <span>%answer%</span>
   </label>
 </li>`;
    let answerHTML = questionTamplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);
    answerHTML.replace("%answer%", answerNumber);
    answerHTML = listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  // Находим выбранную радио кнопку
  const checkedInp = listContainer.querySelector('input[type="radio"]:checked');

  // Проверка на выбранный radio input
  if (!checkedInp) {
    alert("Выберите правильный ответ!");
    submitBtn.blur();
    return;
  }

  // Узнаем номер ответа пользоваетля
  const userAnswer = parseInt(checkedInp.value);

  // Если ответио верно - увеличиваем счет
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }
  // Проверка последний ли это вопрос или нет
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }
}

// Показ результатов пройденого теста пользователем
function showResults() {
  console.log("Show Results started!");
  console.log(score);
  const resultsTemplate = `
  <h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>
  `;
  let title, message;

  // Варианты заголовков и текста
  if (score === questions.length) {
    title = "Поздравляем! 🎉";
    message = "Вы ответили верно на все вопросы!) 🥳";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Не плохой результат! 😋";
    message = "Вы дали более половины правильных ответов 😜🎉";
  } else {
    title = "Стоит постараться 😐";
    message = "Пока у вас меньше половины правильных ответов";
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  // Финальный ответ, подставленные данные в шаблон
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  headerContainer.innerHTML = finalMessage;

  // Меняем кнопку на "Играть снова"
  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.onclick = () => {
    history.go();
  };
}
