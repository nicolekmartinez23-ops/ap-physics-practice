// === Example Problem Generators ===

// Kinematics: s = ½ a t²
function genKinematicsProblem() {
  const a = Math.floor(Math.random() * 4) + 1; // 1–4 m/s²
  const t = Math.floor(Math.random() * 5) + 2; // 2–6 s
  const s = 0.5 * a * t * t;
  return {
    question: `A car accelerates from rest at ${a} m/s² for ${t} seconds. How far does it travel?`,
    answer: s.toFixed(1)
  };
}

// Kinematics: v = u + a t
function genVelocityProblem() {
  const u = Math.floor(Math.random() * 10) + 5; // 5–15 m/s
  const a = Math.floor(Math.random() * 3) + 1;  // 1–3 m/s²
  const t = Math.floor(Math.random() * 5) + 2;  // 2–6 s
  const v = u + a * t;
  return {
    question: `An object starts at ${u} m/s and accelerates at ${a} m/s² for ${t} seconds. What is its final velocity?`,
    answer: v.toFixed(1)
  };
}

// Dynamics: F = m a
function genDynamicsProblem() {
  const m = Math.floor(Math.random() * 5) + 1;  // 1–5 kg
  const a = Math.floor(Math.random() * 5) + 1;  // 1–5 m/s²
  const F = m * a;
  return {
    question: `A ${m} kg block accelerates at ${a} m/s². What is the net force acting on it?`,
    answer: F.toFixed(1)
  };
}

// === Master Data Object ===

const problemsData = {
  "Unit 1: Kinematics": {
    "1D Motion": [genKinematicsProblem, genVelocityProblem],
    "2D Motion": [
      {
        question: "A projectile is launched horizontally at 5 m/s from a 10 m high cliff. How long until it hits the ground?",
        answer: "1.43"
      }
    ]
  },

  "Unit 2: Dynamics": {
    "Forces & Free-Body Diagrams": [genDynamicsProblem],
    "Newton’s Laws": [
      {
        question: "A 5 kg mass is pulled with 20 N on a frictionless surface. Find its acceleration.",
        answer: "4"
      }
    ]
  },

  "Unit 3: Work, Energy, and Power": {
    "Work & Kinetic Energy": [],
    "Potential Energy": []
  },

  "Unit 4: Linear Momentum": {
    "Momentum Conservation": [],
    "Impulse": []
  },

  "Unit 5: Torque and Rotational Dynamics": {
    "Torque & Rotational Motion": [],
    "Rotational Dynamics": []
  },

  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotational Energy": [],
    "Angular Momentum": []
  },

  "Unit 7: Oscillations": {
    "Simple Harmonic Motion": [],
    "Pendulums & Springs": []
  },

  "Unit 8: Fluids": {
    "Fluid Statics": [],
    "Fluid Dynamics": []
  }
};
