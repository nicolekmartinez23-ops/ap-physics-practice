const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const problemsContainer = document.getElementById("problemsContainer");

// Load all units from data
function loadUnits() {
  Object.keys(problemsData).forEach(unit => {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = unit;
    unitSelect.appendChild(opt);
  });
}

// Load topics when a unit is selected
unitSelect.addEventListener("change", () => {
  const selectedUnit = unitSelect.value;
  problemsContainer.innerHTML = "";
  topicSelect.innerHTML = '<option value="">-- Select Topic --</option>';

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

// Display problems when a topic is selected
topicSelect.addEventListener("change", () => {
  const unit = unitSelect.value;
  const topic = topicSelect.value;
  problemsContainer.innerHTML = "";

  if (unit && topic) {
    const problems = problemsData[unit][topic];
    problems.forEach((prob, index) => {
      const div = document.createElement("div");
      div.className = "problem";
      div.innerHTML = `
        <p><strong>Problem ${index + 1}:</strong> ${prob.question}</p>
        <input type="text" id="answer-${index}" placeholder="Answer">
        <button onclick="checkAnswer('${unit}', '${topic}', ${index})">Check Answer</button>
        <div id="feedback-${index}" class="feedback"></div>
      `;
      problemsContainer.appendChild(div);
    });
  }
});

// Check answers
function checkAnswer(unit, topic, index) {
  const input = document.getElementById(`answer-${index}`).value.trim();
  const correct = problemsData[unit][topic][index].answer;
  const feedback = document.getElementById(`feedback-${index}`);

  if (input === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "❌ Try again.";
    feedback.className = "feedback incorrect";
  }
}

loadUnits();
