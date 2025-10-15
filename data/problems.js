// === AP Physics 1 Problems Data ===
// Topics pulled directly from the uploaded "AP Physics 1 Topics.txt".
// Each topic array is empty (ready for static problems or generator functions).

const problemsData = {
  "Unit 1: Kinematics": {
    "1D Scalars and Vectors": [],
    "Displacement, Velocity, Acceleration": [],
    "Representing Motion": [],
    "Reference Frames and Relative Motion": [],
    "Vectors and Motion in 2D": []
  },

  "Unit 2: Dynamics": {
    "Systems and Centers of Mass": [],
    "Forces and Free Body Diagrams": [],
    "Newton's Third Law": [],
    "Newton's First Law": [],
    "Newton's Second Law": [],
    "Gravitational Force": [],
    "Kinetic and Static Friction": [],
    "Spring Forces": [],
    "Circular Motion": []
  },

  "Unit 3: Work, Energy, and Power": {
    "Translational Kinetic Energy": [],
    "Work": [],
    "Potential Energy": [],
    "Conservation of Energy": [],
    "Power": []
  },

  "Unit 4: Linear Momentum": {
    "Linear Momentum": [],
    "Change in Momentum and Impulse": [],
    "Conservation of Linear Momentum": [],
    "Elastic and Inelastic Collisions": []
  },

  "Unit 5: Torque and Rotational Dynamics": {
    "Rotational Kinematics": [],
    "Connecting Linear and Rotational Motion": [],
    "Torque": [],
    "Rotational Inertia": [],
    "Newton's First Law for Rotation": [],
    "Newton's Second Law for Rotation": []
  },

  "Unit 6: Energy and Momentum of Rotating Systems": {
    "Rotating Kinetic Energy": [],
    "Torque and Work": [],
    "Angular Momentum and Angular Impulse": [],
    "Conservation of Angular Momentum": [],
    "Rolling": [],
    "Motion of Orbiting Satellites": []
  },

  "Unit 7: Oscillations": {
    "Defining Simple Harmonic Motion": [],
    "Frequency and Period of SHM": [],
    "Representing and Analyzing SHM": [],
    "Energy of Simple Harmonic Oscillators": []
  },

  "Unit 8: Fluids": {
    "Internal Structure and Density": [],
    "Pressure": [],
    "Fluids and Newton's Laws": [],
    "Fluids and Conservation Laws": []
  }
};

// Optional helper to add problems programmatically
function addProblems(unit, topicProblems) {
  if (!problemsData[unit]) problemsData[unit] = {};
  Object.entries(topicProblems).forEach(([topic, problems]) => {
    problemsData[unit][topic] = problems;
  });
}

console.log("✅ problemsData loaded:", Object.keys(problemsData));
