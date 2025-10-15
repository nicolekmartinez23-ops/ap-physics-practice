// === AP Physics 1 Problems Data ===
// Each topic has an empty array, ready for you to add static or generated problems.
// You can use either:
//   { question: "text", answer: "text" }
// or random-generating functions that return { question, answer } objects.

const problemsData = {
  "Unit 1: Kinematics": {
    "1D Motion": [],
    "2D Motion and Projectile Motion": [],
    "Graphical Analysis": [],
    "Relative Motion": []
  },

  "Unit 2: Dynamics": {
    "Forces and Newton’s Laws": [],
    "Free-Body Diagrams": [],
    "Friction": [],
    "Tension and Normal Force": [],
    "Equilibrium and Net Force": []
  },

  "Unit 3: Work, Energy, and Power": {
    "Work and the Work-Energy Theorem": [],
    "Kinetic and Potential Energy": [],
    "Conservation of Energy": [],
    "Power": []
  },

  "Unit 4: Linear Momentum": {
    "Impulse and Momentum": [],
    "Conservation of Linear Momentum": [],
    "Elastic and Inelastic Collisions": [],
    "Center of Mass": []
  },

  "Unit 5: Torque and Rotational Dynamics": {
    "Rotational Kinematics": [],
    "Torque and Rotational Equilibrium": [],
    "Moment of Inertia": [],
    "Newton’s Second Law for Rotation": []
  },

  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotational Kinetic Energy": [],
    "Work and Power in Rotational Motion": [],
    "Angular Momentum and Its Conservation": []
  },

  "Unit 7: Oscillations": {
    "Simple Harmonic Motion": [],
    "Mass-Spring Systems": [],
    "Pendulums": [],
    "Energy in SHM": [],
    "Period and Frequency Relationships": []
  },

  "Unit 8: Fluids": {
    "Density and Pressure": [],
    "Buoyant Force and Archimedes’ Principle": [],
    "Fluid Statics": [],
    "Fluid Dynamics and the Continuity Equation": [],
    "Bernoulli’s Principle": []
  }
};

// === Helper Function to Add Problems (Optional) ===
// You can use this function to add problems later from other files if you prefer.
function addProblems(unit, topicProblems) {
  if (!problemsData[unit]) problemsData[unit] = {};
  Object.entries(topicProblems).forEach(([topic, problems]) => {
    problemsData[unit][topic] = problems;
  });
}

console.log("✅ problemsData loaded:", Object.keys(problemsData));
