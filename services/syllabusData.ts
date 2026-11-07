import { Subject } from "./types";

export const STATIC_SYLLABUS_DB: Record<string, Record<string, string[]>> = {
  "9": {
    [Subject.PHYSICS]: ["Motion", "Force and Laws of Motion", "Gravitation", "Work and Energy", "Sound"],
    [Subject.CHEMISTRY]: ["Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "Structure of the Atom"],
    [Subject.MATHS]: ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations", "Lines and Angles", "Triangles", "Quadrilaterals", "Circles", "Heron's Formula", "Surface Areas and Volumes", "Statistics"],
    [Subject.BIOLOGY]: ["The Fundamental Unit of Life", "Tissues", "Improvement in Food Resources"],
    [Subject.ENGLISH]: ["The Fun They Had", "The Sound of Music", "The Little Girl", "A Truly Beautiful Mind", "The Snake and the Mirror", "My Childhood", "Reach for the Top", "Kathmandu", "If I Were You", "Reading Comprehension"]
  },
  "10": {
    [Subject.PHYSICS]: ["Light - Reflection and Refraction", "The Human Eye", "Electricity", "Magnetic Effects of Electric Current"],
    [Subject.CHEMISTRY]: ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Periodic Classification"],
    [Subject.MATHS]: ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Trigonometry", "Applications of Trigonometry", "Circles", "Constructions", "Areas Related to Circles", "Surface Areas and Volumes", "Statistics", "Probability"],
    [Subject.BIOLOGY]: ["Life Processes", "Control and Coordination", "How do Organisms Reproduce?", "Heredity and Evolution", "Our Environment"],
    [Subject.ENGLISH]: ["A Letter to God", "Nelson Mandela", "Two Stories about Flying", "From the Diary of Anne Frank", "The Hundred Dresses", "Glimpses of India", "Mijbil the Otter", "Madam Rides the Bus", "The Proposal"]
  },
  "11": {
    [Subject.PHYSICS]: ["Units and Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation", "Properties of Solids", "Fluids", "Thermal Properties", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves"],
    [Subject.CHEMISTRY]: ["Some Basic Concepts", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions", "Hydrogen", "s-Block Elements", "p-Block Elements", "Organic Chemistry Basics", "Hydrocarbons"],
    [Subject.MATHS]: ["Sets", "Relations and Functions", "Trigonometric Functions", "Complex Numbers", "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections", "3D Geometry", "Limits and Derivatives", "Statistics", "Probability"],
    [Subject.BIOLOGY]: ["The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Cell: The Unit of Life", "Biomolecules", "Cell Cycle", "Transport in Plants", "Mineral Nutrition", "Photosynthesis", "Respiration", "Plant Growth", "Digestion and Absorption", "Breathing and Exchange of Gases", "Body Fluids", "Excretory Products", "Locomotion", "Neural Control", "Chemical Coordination"],
    [Subject.ENGLISH]: ["The Portrait of a Lady", "We're Not Afraid to Die", "Discovering Tut", "The Ailing Planet", "The Browning Version", "The Adventure", "Silk Road", "A Photograph", "The Voice of the Rain"]
  },
  "12": {
    [Subject.PHYSICS]: ["Electric Charges and Fields", "Potential and Capacitance", "Current Electricity", "Moving Charges and Magnetism", "Magnetism and Matter", "Electromagnetic Induction", "Alternating Current", "EM Waves", "Ray Optics", "Wave Optics", "Dual Nature of Radiation", "Atoms", "Nuclei", "Semiconductor Electronics"],
    [Subject.CHEMISTRY]: ["The Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry", "Isolation of Elements", "p-Block Elements", "d- and f-Block Elements", "Coordination Compounds", "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers", "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules", "Polymers", "Chemistry in Everyday Life"],
    [Subject.MATHS]: ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants", "Continuity and Differentiability", "Application of Derivatives", "Integrals", "Application of Integrals", "Differential Equations", "Vector Algebra", "3D Geometry", "Linear Programming", "Probability"],
    [Subject.BIOLOGY]: ["Reproduction in Organisms", "Sexual Reproduction in Flowering Plants", "Human Reproduction", "Reproductive Health", "Principles of Inheritance", "Molecular Basis of Inheritance", "Evolution", "Human Health and Disease", "Strategies for Enhancement", "Microbes in Human Welfare", "Biotechnology Principles", "Biotechnology Applications", "Organisms and Populations", "Ecosystem", "Biodiversity", "Environmental Issues"],
    [Subject.ENGLISH]: ["The Last Lesson", "Lost Spring", "Deep Water", "The Rattrap", "Indigo", "Poets and Pancakes", "The Interview", "Going Places", "My Mother at Sixty-six", "Keeping Quiet"]
  }
};
