// === AP Physics 1 Problems Data ===
// Each topic array is ready for static problems or dynamic generators.

const problemsData = {
  // -------------------------------------------------------
  // Unit 1: Kinematics
  // -------------------------------------------------------
  "Unit 1: Kinematics": {
    "1D Scalars and Vectors": [],
    "Displacement, Velocity, Acceleration": [],
    "Representing Motion": [],
    "Reference Frames and Relative Motion": [],
    "Vectors and Motion in 2D": []
  }
};

// -------------------------------------------------------
// === Unit 2: Dynamics ===
// -------------------------------------------------------

// Interactive problem templates based on your Sample Unit 2 Problems Template.txt
// Students type numeric/symbolic answers; conceptual questions use multiple choice.

if (!problemsData["Unit 2: Dynamics"]) {
  problemsData["Unit 2: Dynamics"] = {};
}

// -------------------------------------------------------
// Topic: Forces and Free Body Diagrams (numeric/symbolic)
// -------------------------------------------------------
problemsData["Unit 2: Dynamics"]["Forces and Free Body Diagrams"] = [
  function() {
    // Random parameters
    const m = Math.floor(Math.random() * 8) + 2; // 2–9 kg
    const a = (Math.floor(Math.random() * 5) + 1).toFixed(1); // 1.0–5.0 m/s²
    const angle = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const g = 9.8;
    const weight = (m * g).toFixed(1);
    const parallel = (m * g * Math.sin(angle * Math.PI / 180)).toFixed(1);
    const canvasId = `fbd-${Math.random().toString(36).slice(2)}`;

    const question = `
      <p>A ${m}-kg block rests on a ${angle}° incline. The diagram below shows the forces acting on it.</p>
      <canvas id="${canvasId}" width="300" height="200" style="border:1px solid #444; background:#fafafa;"></canvas>
      <p>Calculate the component of the weight parallel to the incline (mg sin θ).</p>
      <p>Use g = 9.8 m/s².</p>
    `;

    // Draw diagram
    setTimeout(() => {
      const ctx = document.getElementById(canvasId)?.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(20, 180);
      ctx.lineTo(280, 180 - Math.tan(angle * Math.PI / 180) * 260);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#ccc";
      ctx.fillRect(130, 110, 40, 40);
      ctx.strokeStyle = "red";
      ctx.beginPath(); ctx.moveTo(150, 150); ctx.lineTo(150, 190); ctx.stroke();
      ctx.fillText("mg", 155, 180);
      ctx.strokeStyle = "blue";
      ctx.beginPath(); ctx.moveTo(150, 150);
      const compX = 150 + 30 * Math.cos(angle * Math.PI / 180);
      const compY = 150 + 30 * Math.sin(angle * Math.PI / 180);
      ctx.lineTo(compX, compY);
      ctx.stroke();
      ctx.fillText("mg sin θ", compX + 5, compY + 5);
    }, 100);

    return { question, answer: parallel };
  }
];

// -------------------------------------------------------
// Topic: Newton’s Third Law (numeric + conceptual MCQ)
// -------------------------------------------------------
problemsData["Unit 2: Dynamics"]["Newton's Third Law"] = [
  // --- Quantitative version ---
  function() {
    const m1 = Math.floor(Math.random() * 5) + 2; // 2–6 kg
    const m2 = Math.floor(Math.random() * 5) + 2; // 2–6 kg
    const a = (Math.floor(Math.random() * 4) + 1).toFixed(1); // 1–4 m/s²
    const F12 = (m2 * a).toFixed(1);
    const question = `
      <p>Two blocks of masses ${m1} kg and ${m2} kg are in contact on a frictionless surface. 
      A horizontal force accelerates the system at ${a} m/s².</p>
      <p>What is the magnitude of the force exerted by block 1 on block 2?</p>
    `;
    return { question, answer: F12 };
  },

  // --- Conceptual multiple-choice version ---
  function() {
    return {
      question: `
        <p>When a book rests on a table, which statement best describes the action–reaction pair according to Newton’s Third Law?</p>
        <form>
          <label><input type="radio" name="q" value="A"> The table exerts an upward force and gravity pulls downward on the book (not a 3rd-law pair).</label><br>
          <label><input type="radio" name="q" value="B"> The table pushes upward on the book, and the book pushes downward on the table.</label><br>
          <label><input type="radio" name="q" value="C"> The table pushes upward on the book, and gravity pulls the book downward.</label><br>
          <label><input type="radio" name="q" value="D"> The book and table exert no forces on each other when stationary.</label>
        </form>
      `,
      answer: "B",
      type: "mcq"
    };
  }
];

// -------------------------------------------------------
// Topic: Newton’s Second Law (numeric F = ma)
// -------------------------------------------------------
problemsData["Unit 2: Dynamics"]["Newton's Second Law"] = [
  function() {
    const m = Math.floor(Math.random() * 10) + 1; // 1–10 kg
    const a = (Math.random() * 4 + 1).toFixed(1); // 1–5 m/s²
    const F = (m * a).toFixed(1);
    const question = `
      <p>An object of mass ${m} kg accelerates at ${a} m/s². 
      Calculate the net force acting on the object.</p>
    `;
    return { question, answer: F };
  },
  function() {
    const F = Math.floor(Math.random() * 40) + 10; // 10–50 N
    const a = (Math.random() * 4 + 1).toFixed(1);
    const m = (F / a).toFixed(1);
    const question = `
      <p>An object accelerates at ${a} m/s² under a net force of ${F} N. 
      What is its mass?</p>
    `;
    return { question, answer: m };
  }
];

// === Helper Function (Optional for future expansion) ===
function addProblems(unit, topicProblems) {
  if (!problemsData[unit]) problemsData[unit] = {};
  Object.entries(topicProblems).forEach(([topic, problems]) => {
    problemsData[unit][topic] = problems;
  });
}

console.log("✅ problemsData loaded:", Object.keys(problemsData));
