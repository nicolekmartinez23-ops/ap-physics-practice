// Grab all dropdowns and container
const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const actionSelect = document.getElementById("actionSelect");
const problemsContainer = document.getElementById("problemsContainer");

let currentUnit = "";
let currentTopic = "";

// === Notes links (Unit → Topic → PDF link) ===
const notesLinks = {
  "Unit 1: Kinematics": {
    "1D Motion": "notes/unit1-1d-motion.pdf",
    "2D Motion": "notes/unit1-2d-motion.pdf"
  },
  "Unit 2: Dynamics": {
    "Forces & Free-Body Diagrams": "notes/unit2-forces.pdf",
    "Newton’s Laws": "notes/unit2-newton-laws.pdf"
  },
  "Unit 3: Work, Energy, and Power": {
    "Work & Kinetic Energy": "notes/unit3-work-kinetic.pdf",
    "Potential Energy": "notes/unit3-potential.pdf"
  },
  "Unit 4: Linear Momentum": {
    "Momentum Conservation": "notes/unit4-momentum.pdf",
    "Impulse": "notes/unit4-impulse.pdf"
  },
  "Unit 5: Torque and Rotational Dynamics": {
    "Torque & Rotational Motion": "notes/unit5-torque.pdf",
    "Rotational Dynamics": "notes/unit5-rotational.pdf"
  },
  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotational Energy": "notes/unit6-energy.pdf",
    "Angular Momentum": "notes/unit6-angular.pdf"
  },
  "Unit 7: Oscillations": {
    "Simple Harmonic Motion": "notes/unit7-shm.pdf",
    "Pendulums & Springs": "notes/unit7-pendulum.pdf"
  },
  "Unit 8: Fluids": {
    "Fluid Statics": "notes/unit8-statics.pdf",
    "Fluid Dynamics": "notes/unit8-dynamics.pdf"
  }
};

// === Load units into the dropdown ===
function loadUnits() {
  Object.keys(problemsData).forEach(unit => {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = unit;
    unitSelect.appendChild(opt);
  });
}

// === Event: Unit selected ===
unitSelect.addEventListener("change", () => {
  currentUnit = unitSelect.value;
  currentTopic = "";
  problemsContainer.innerHTML = "";

  // Reset topic dropdown
  topicSelect.innerHTML = '<option value="">-- Select Topic --</option>';
  topicSelect.disabled = true;

  actionSelect.value = "";
  actionSelect.disabled = true;

  if (currentUnit) {
    const topics = Object.keys(problemsData[currentUnit]);
    topics.forEach(topic => {
      const opt = document.createElement("option");
      opt.value = topic;
      opt.textContent = topic;
      topicSelect.appendChild(opt);
    });
    topicSelect.disabled = false;
  }
});

// === Event: Topic selected ===
topicSelect.addEventListener("change", () => {
  currentTopic = topicSelect.value;
  problemsContainer.innerHTML = "";

  actionSelect.value = "";
  actionSelect.disabled = !(currentUnit && currentTopic);
});

// === Event: Action selected (Notes or Practice) ===
actionSelect.addEventListener("change", () => {
  const action = actionSelect.value;

  if (action === "notes") {
    const link = notesLinks[currentUnit]?.[currentTopic];
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("Notes not available for this topic yet.");
    }
  } else if (action === "practice") {
    renderProblems(currentUnit, currentTopic);
  }

  actionSelect.value = ""; // reset selection after action
});

// === Render problems for a topic ===
function renderProblems(unit, topic) {
  problemsContainer.innerHTML = "";

  if (!unit || !topic) return;

  const topicProblems = problemsData[unit][topic];
  if (!topicProblems || topicProblems.length === 0) {
    problemsContainer.innerHTML = "<p>No problems available yet.</p>";
    return;
  }

  // Generate fresh problems if they are functions
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

// === Answer checking with numeric tolerance ===
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

// === Initialize page ===
loadUnits();
