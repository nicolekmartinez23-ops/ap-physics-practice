// === Element References ===
const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const actionSelect = document.getElementById("actionSelect");
const numProblemsSelect = document.getElementById("numProblemsSelect");
const problemsContainer = document.getElementById("problemsContainer");

let currentUnit = "";
let currentTopic = "";

// === Load Units ===
function loadUnits() {
  Object.keys(problemsData).forEach(unit => {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = unit;
    unitSelect.appendChild(opt);
  });
}

// === Event: Unit Selected ===
unitSelect.addEventListener("change", () => {
  currentUnit = unitSelect.value;
  currentTopic = "";
  problemsContainer.innerHTML = "";

  topicSelect.innerHTML = '<option value="">-- Select Topic --</option>';
  topicSelect.disabled = true;
  actionSelect.disabled = true;
  numProblemsSelect.disabled = true;

  if (currentUnit) {
    Object.keys(problemsData[currentUnit]).forEach(topic => {
      const opt = document.createElement("option");
      opt.value = topic;
      opt.textContent = topic;
      topicSelect.appendChild(opt);
    });
    topicSelect.disabled = false;
  }
});

// === Event: Topic Selected ===
topicSelect.addEventListener("change", () => {
  currentTopic = topicSelect.value;
  problemsContainer.innerHTML = "";
  actionSelect.disabled = !(currentUnit && currentTopic);
  numProblemsSelect.disabled = true;
});

// === Event: Action Selected (Notes or Practice) ===
actionSelect.addEventListener("change", () => {
  const action = actionSelect.value;

  if (action === "notes") {
    const link = notesLinks?.[currentUnit]?.[currentTopic];
    if (link) window.open(link, "_blank");
    else alert("Notes not available yet.");
    numProblemsSelect.disabled = true;
  } else if (action === "practice") {
    numProblemsSelect.disabled = false;
    numProblemsSelect.value = "1";
    renderProblems(currentUnit, currentTopic, 1);
  }

  actionSelect.value = "";
});

// === Event: Number of Problems Selected ===
numProblemsSelect.addEventListener("change", () => {
  const num = parseInt(numProblemsSelect.value);
  if (currentUnit && currentTopic && num) renderProblems(currentUnit, currentTopic, num);
});

// === Render Problems ===
function renderProblems(unit, topic, numProblems = 1) {
  problemsContainer.innerHTML = "";
  if (!unit || !topic) return;

  const topicProblems = problemsData[unit][topic];
  if (!topicProblems || topicProblems.length === 0) {
    problemsContainer.innerHTML = "<p>No problems available yet.</p>";
    return;
  }

  const problems = [];
  for (let i = 0; i < numProblems; i++) {
    const template = topicProblems[i % topicProblems.length];
    const prob = typeof template === "function" ? template() : template;
    problems.push(prob);
  }

  // Regenerate button
  const regenBtn = document.createElement("button");
  regenBtn.textContent = "🔄 Generate New Problems";
  regenBtn.className = "regen-button";
  regenBtn.addEventListener("click", () => renderProblems(unit, topic, numProblems));
  problemsContainer.appendChild(regenBtn);

  // Render each problem
  problems.forEach((prob, i) => {
    const div = document.createElement("div");
    div.className = "problem";
    div.innerHTML = `<p><strong>Problem ${i + 1}:</strong> ${prob.question}</p>`;

    if (prob.type === "mcq") {
      // --- Multiple Choice Problem ---
      const btn = document.createElement("button");
      btn.textContent = "Check Answer";
      btn.addEventListener("click", () => checkMCQAnswer(i, prob.answer));
      div.appendChild(btn);
      div.innerHTML += `<div id="feedback-${i}" class="feedback"></div>`;
    } else {
      // --- Numeric / Symbolic Problem ---
      const input = document.createElement("input");
      input.type = "text";
      input.id = `answer-${i}`;
      input.placeholder = "Answer";

      const btn = document.createElement("button");
      btn.textContent = "Check Answer";
      btn.addEventListener("click", () => checkAnswer(i, prob.answer));

      div.appendChild(input);
      div.appendChild(btn);
      div.innerHTML += `<div id="feedback-${i}" class="feedback"></div>`;
    }

    problemsContainer.appendChild(div);
  });
}

// === Check Numeric / Symbolic Answers ===
function checkAnswer(index, correctAnswer) {
  const input = document.getElementById(`answer-${index}`)?.value.trim();
  const feedback = document.getElementById(`feedback-${index}`);
  if (!feedback) return;

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

  if (input?.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ Try again. (Correct answer: ${correctAnswer})`;
    feedback.className = "feedback incorrect";
  }
}

// === Check Multiple-Choice Answers ===
function checkMCQAnswer(index, correctLetter) {
  const feedback = document.getElementById(`feedback-${index}`);
  const selected = document.querySelector(`.problem:nth-of-type(${index + 2}) input[type="radio"]:checked`);
  if (!feedback) return;

  if (!selected) {
    feedback.textContent = "⚠️ Please select an answer first.";
    feedback.className = "feedback warning";
    return;
  }

  if (selected.value === correctLetter) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ Incorrect. The correct answer is ${correctLetter}.`;
    feedback.className = "feedback incorrect";
  }
}

// === Initialize ===
loadUnits();
