// === Element References ===
const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const actionSelect = document.getElementById("actionSelect");
const numProblemsSelect = document.getElementById("numProblemsSelect");
const problemsContainer = document.getElementById("problemsContainer");

let currentUnit = "";
let currentTopic = "";

// === Notes Links (auto-generated placeholder structure) ===
// Format: notes/unit1-1d-motion.pdf
// Replace links with your actual PDF files in the /notes folder.

const notesLinks = {
  "Unit 1: Kinematics": {
    "1D Motion": "notes/unit1-1d-motion.pdf",
    "2D Motion and Projectile Motion": "notes/unit1-2d-motion-and-projectile-motion.pdf",
    "Graphical Analysis": "notes/unit1-graphical-analysis.pdf",
    "Relative Motion": "notes/unit1-relative-motion.pdf"
  },

  "Unit 2: Dynamics": {
    "Forces and Newton’s Laws": "notes/unit2-forces-and-newtons-laws.pdf",
    "Free-Body Diagrams": "notes/unit2-free-body-diagrams.pdf",
    "Friction": "notes/unit2-friction.pdf",
    "Tension and Normal Force": "notes/unit2-tension-and-normal-force.pdf",
    "Equilibrium and Net Force": "notes/unit2-equilibrium-and-net-force.pdf"
  },

  "Unit 3: Work, Energy, and Power": {
    "Work and the Work-Energy Theorem": "notes/unit3-work-and-the-work-energy-theorem.pdf",
    "Kinetic and Potential Energy": "notes/unit3-kinetic-and-potential-energy.pdf",
    "Conservation of Energy": "notes/unit3-conservation-of-energy.pdf",
    "Power": "notes/unit3-power.pdf"
  },

  "Unit 4: Linear Momentum": {
    "Impulse and Momentum": "notes/unit4-impulse-and-momentum.pdf",
    "Conservation of Linear Momentum": "notes/unit4-conservation-of-linear-momentum.pdf",
    "Elastic and Inelastic Collisions": "notes/unit4-elastic-and-inelastic-collisions.pdf",
    "Center of Mass": "notes/unit4-center-of-mass.pdf"
  },

  "Unit 5: Torque and Rotational Dynamics": {
    "Rotational Kinematics": "notes/unit5-rotational-kinematics.pdf",
    "Torque and Rotational Equilibrium": "notes/unit5-torque-and-rotational-equilibrium.pdf",
    "Moment of Inertia": "notes/unit5-moment-of-inertia.pdf",
    "Newton’s Second Law for Rotation": "notes/unit5-newtons-second-law-for-rotation.pdf"
  },

  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotational Kinetic Energy": "notes/unit6-rotational-kinetic-energy.pdf",
    "Work and Power in Rotational Motion": "notes/unit6-work-and-power-in-rotational-motion.pdf",
    "Angular Momentum and Its Conservation": "notes/unit6-angular-momentum-and-its-conservation.pdf"
  },

  "Unit 7: Oscillations": {
    "Simple Harmonic Motion": "notes/unit7-simple-harmonic-motion.pdf",
    "Mass-Spring Systems": "notes/unit7-mass-spring-systems.pdf",
    "Pendulums": "notes/unit7-pendulums.pdf",
    "Energy in SHM": "notes/unit7-energy-in-shm.pdf",
    "Period and Frequency Relationships": "notes/unit7-period-and-frequency-relationships.pdf"
  },

  "Unit 8: Fluids": {
    "Density and Pressure": "notes/unit8-density-and-pressure.pdf",
    "Buoyant Force and Archimedes’ Principle": "notes/unit8-buoyant-force-and-archimedes-principle.pdf",
    "Fluid Statics": "notes/unit8-fluid-statics.pdf",
    "Fluid Dynamics and the Continuity Equation": "notes/unit8-fluid-dynamics-and-the-continuity-equation.pdf",
    "Bernoulli’s Principle": "notes/unit8-bernoullis-principle.pdf"
  }
};

// === Load Units into Dropdown ===
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

  actionSelect.value = "";
  actionSelect.disabled = true;

  numProblemsSelect.value = "";
  numProblemsSelect.disabled = true;

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

// === Event: Topic Selected ===
topicSelect.addEventListener("change", () => {
  currentTopic = topicSelect.value;
  problemsContainer.innerHTML = "";

  actionSelect.value = "";
  actionSelect.disabled = !(currentUnit && currentTopic);

  numProblemsSelect.value = "";
  numProblemsSelect.disabled = true;
});

// === Event: Action Selected (Notes or Practice) ===
actionSelect.addEventListener("change", () => {
  const action = actionSelect.value;

  if (action === "notes") {
    const link = notesLinks[currentUnit]?.[currentTopic];
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("Notes not available for this topic yet.");
    }
    numProblemsSelect.disabled = true;
  } else if (action === "practice") {
    numProblemsSelect.disabled = false;
    numProblemsSelect.value = "1"; // Default 1 problem
    renderProblems(currentUnit, currentTopic, 1);
  }

  actionSelect.value = "";
});

// === Event: Number of Problems Selected ===
numProblemsSelect.addEventListener("change", () => {
  const num = parseInt(numProblemsSelect.value);
  if (currentUnit && currentTopic && num) {
    renderProblems(currentUnit, currentTopic, num);
  }
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
    const probTemplate = topicProblems[i % topicProblems.length];
    const prob = typeof probTemplate === "function" ? probTemplate() : probTemplate;
    problems.push(prob);
  }

  const regenBtn = document.createElement("button");
  regenBtn.textContent = "🔄 Generate New Problems";
  regenBtn.className = "regen-button";
  regenBtn.addEventListener("click", () => renderProblems(unit, topic, numProblems));
  problemsContainer.appendChild(regenBtn);

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

// === Answer Checking (Numeric Tolerance ±0.05) ===
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

// === Initialize Page ===
loadUnits();
