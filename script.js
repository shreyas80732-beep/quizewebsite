async function generateQuiz() {
  const topic = document.getElementById("topic").value;

  const response = await fetch("/api/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic })
  });

  const quizText = await response.text();
  const quiz = JSON.parse(quizText);
  displayQuiz(quiz);
}

function displayQuiz(quiz) {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  quiz.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Q${index + 1}: ${q.question}</strong><br>` +
      q.options.map((opt, i) =>
        `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>`
      ).join("");
    container.appendChild(div);
  });
}