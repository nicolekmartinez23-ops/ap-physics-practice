const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const problemsContainer = document.getElementById("problemsContainer");

let currentUnit = "";
let currentTopic = "";

// Load units into dropdown
function loadUnits() {
  Object.keys(problemsData).forEach(unit => {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = unit;
    unitSelect.appendChild(opt);
  });
}

unitSelect.addEventListener("change", () => {
  const selectedUnit = unitSelect.value;
  problemsContainer.innerHTML = "";
  topicSelect.innerHTML = '<option value="">-- Select Topic --</option>';
  currentUnit = selectedUnit;
  currentTopic = "";

  if (selectedUnit) {
    const topics = Object.keys(problemsData[selectedUnit]);
    topics.forEach(topic => {
      const opt = document.createElement("option");
      opt.value = topic;
      opt.textContent = topic;
      topicSelect.appendChild(opt);
    });
    topicSelect.disabled = false;
  } else {
    topicSelect.disabled = true;
  }
});

topicSelect.addEventListener("change", () => {
  currentUnit = unitSelect.value;
  currentTopic = topicSelect.value;
  renderProblems(currentUnit, currentTopic);
});

// === Main function to render problems ===
function renderProblems(unit, topic) {
  problemsContainer.innerHTML = "";

  if (!unit || !topic) return;

  const topicProblems = problemsData[unit][topic];
  if (!topicProblems || topicProblems.length === 0) {
    problemsContainer.innerHTML = "<p>No problems available yet.</p>";
    return;
  }

  // Generate fresh problems
  const problems = topicProblems.map(prob =>
    typeof prob === "function" ? prob() : prob
  );

  // Create "Generate New Problems" button
  const regenBtn = document.createElement("button");
  regenBtn.textContent = "🔄 Generate New Problems";
  regenBtn.className = "regen-button";
  regenBtn.addEventListener("click", () => renderProblems(unit, topic));
  problemsContainer.appendChild(regenBtn);

  // Render each problem
  problems.forEach((prob, index) => {
    const div = document.createElement("div");
    div.className = "problem";
    div.innerHTML = `
      <p><strong>Problem ${index + 1}:</strong> ${prob.question}</p>
      <input type="text" id="answer-${index}" placeholder="Answer">
      <button onclick="checkAnswer(${index}, '${prob.answer}')">Check Answer</button>
      <div id="feedback-${index}" class="feedback"></div>
    `;
    problemsContainer.appendChild(div);
  });
}

// === Answer Checking ===
function checkAnswer(index, correctAnswer) {
  const input = document.getElementById(`answer-${index}`).value.trim();
  const feedback = document.getElementById(`feedback-${index}`);

  const numericInput = parseFloat(input);
  const numericCorrect = parseFloat(correctAnswer);

  if (!isNaN(numericInput) && !isNaN(numericCorrect)) {
    const diff = Math.abs(numericInput - numericCorrect);
    if (diff < 0.05) {
      feedback.textContent = "✅ Correct!";
      feedback.className = "feedback correct";
      return;
    }
  }

  if (input.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "❌ Try again.";
    feedback.className = "feedback incorrect";
  }
}

loadUnits();
