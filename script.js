// === Element References ===
const unitSelect = document.getElementById("unitSelect");
const topicSelect = document.getElementById("topicSelect");
const actionSelect = document.getElementById("actionSelect");
const numProblemsSelect = document.getElementById("numProblemsSelect");
const problemsContainer = document.getElementById("problemsContainer");

let currentUnit = "";
let currentTopic = "";

// === Notes Links (placeholder filenames, lowercase + hyphens) ===
// Filenames generated manually to match each topic (lowercase, spaces -> hyphens)
const notesLinks = {
  "Unit 1: Kinematics": {
    "1D Scalars and Vectors": "notes/unit1-1d-scalars-and-vectors.pdf",
    "Displacement, Velocity, Acceleration": "notes/unit1-displacement-velocity-acceleration.pdf",
    "Representing Motion": "notes/unit1-representing-motion.pdf",
    "Reference Frames and Relative Motion": "notes/unit1-reference-frames-and-relative-motion.pdf",
    "Vectors and Motion in 2D": "notes/unit1-vectors-and-motion-in-2d.pdf"
  },

  "Unit 2: Dynamics": {
    "Systems and Centers of Mass": "notes/unit2-systems-and-centers-of-mass.pdf",
    "Forces and Free Body Diagrams": "notes/unit2-forces-and-free-body-diagrams.pdf",
    "Newton's Third Law": "notes/unit2-newtons-third-law.pdf",
    "Newton's First Law": "notes/unit2-newtons-first-law.pdf",
    "Newton's Second Law": "notes/unit2-newtons-second-law.pdf",
    "Gravitational Force": "notes/unit2-gravitational-force.pdf",
    "Kinetic and Static Friction": "notes/unit2-kinetic-and-static-friction.pdf",
    "Spring Forces": "notes/unit2-spring-forces.pdf",
    "Circular Motion": "notes/unit2-circular-motion.pdf"
  },

  "Unit 3: Work, Energy, and Power": {
    "Translational Kinetic Energy": "notes/unit3-translational-kinetic-energy.pdf",
    "Work": "notes/unit3-work.pdf",
    "Potential Energy": "notes/unit3-potential-energy.pdf",
    "Conservation of Energy": "notes/unit3-conservation-of-energy.pdf",
    "Power": "notes/unit3-power.pdf"
  },

  "Unit 4: Linear Momentum": {
    "Linear Momentum": "notes/unit4-linear-momentum.pdf",
    "Change in Momentum and Impulse": "notes/unit4-change-in-momentum-and-impulse.pdf",
    "Conservation of Linear Momentum": "notes/unit4-conservation-of-linear-momentum.pdf",
    "Elastic and Inelastic Collisions": "notes/unit4-elastic-and-inelastic-collisions.pdf"
  },

  "Unit 5: Torque and Rotational Dynamics": {
    "Rotational Kinematics": "notes/unit5-rotational-kinematics.pdf",
    "Connecting Linear and Rotational Motion": "notes/unit5-connecting-linear-and-rotational-motion.pdf",
    "Torque": "notes/unit5-torque.pdf",
    "Rotational Inertia": "notes/unit5-rotational-inertia.pdf",
    "Newton's First Law for Rotation": "notes/unit5-newtons-first-law-for-rotation.pdf",
    "Newton's Second Law for Rotation": "notes/unit5-newtons-second-law-for-rotation.pdf"
  },

  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotating Kinetic Energy": "notes/unit6-rotating-kinetic-energy.pdf",
    "Torque and Work": "notes/unit6-torque-and-work.pdf",
    "Angular Momentum and Angular Impulse": "notes/unit6-angular-momentum-and-angular-impulse.pdf",
    "Conservation of Angular Momentum": "notes/unit6-conservation-of-angular-momentum.pdf",
    "Rolling": "notes/unit6-rolling.pdf",
    "Motion of Orbiting Satellites": "notes/unit6-motion-of-orbiting-satellites.pdf"
  },

  "Unit 7: Oscillations": {
    "Defining Simple Harmonic Motion": "notes/unit7-defining-simple-harmonic-motion.pdf",
    "Frequency and Period of SHM": "notes/unit7-frequency-and-period-of-shm.pdf",
    "Representing and Analyzing SHM": "notes/unit7-representing-and-analyzing-shm.pdf",
    "Energy of Simple Harmonic Oscillators": "notes/unit7-energy-of-simple-harmonic-oscillators.pdf"
  },

  "Unit 8: Fluids": {
    "Internal Structure and Density": "notes/unit8-internal-structure-and-density.pdf",
    "Pressure": "notes/unit8-pressure.pdf",
    "Fluids and Newton's Laws": "notes/unit8-fluids-and-newtons-laws.pdf",
    "Fluids and Conservation Laws": "notes/unit8-fluids-and-conservation-laws.pdf"
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
