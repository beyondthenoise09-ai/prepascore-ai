import { MCQQuestion, SubjectiveQuestion } from './types';

// Curated high-yield Indian Board & Competitive Exam questions
export const CURATED_MCQ_BANK: Record<string, MCQQuestion[]> = {
  // Physics - Light
  "Light - Reflection and Refraction": [
    {
      id: 1,
      question: "An object is placed at a distance of 15 cm in front of a concave mirror of focal length 10 cm. At what distance from the mirror should a screen be placed to get a sharp image?",
      options: ["-30 cm", "+30 cm", "-20 cm", "+15 cm"],
      correctOptionIndex: 0,
      explanation: "Using mirror formula 1/f = 1/v + 1/u. Here f = -10 cm, u = -15 cm. 1/v = 1/(-10) - 1/(-15) = -1/10 + 1/15 = -1/30. Therefore v = -30 cm (30 cm in front of mirror, real & inverted)."
    },
    {
      id: 2,
      question: "The refractive index of glass with respect to water is 9/8. If the refractive index of water with respect to air is 4/3, what is the absolute refractive index of glass?",
      options: ["3/2 (1.5)", "1.33", "1.125", "1.732"],
      correctOptionIndex: 0,
      explanation: "Absolute refractive index of glass ng = (ng/nw) * nw = (9/8) * (4/3) = 36/24 = 3/2 = 1.5."
    },
    {
      id: 3,
      question: "A ray of light traveling from a denser to a rarer medium undergoes total internal reflection only when:",
      options: ["Angle of incidence is greater than critical angle", "Angle of incidence equals 90°", "Angle of refraction is zero", "Angle of incidence is less than critical angle"],
      correctOptionIndex: 0,
      explanation: "Total Internal Reflection occurs when light travels from denser to rarer medium and angle of incidence in denser medium exceeds the critical angle (i > c)."
    },
    {
      id: 4,
      question: "The power of a convex lens of focal length 25 cm is:",
      options: ["+4.0 D", "-4.0 D", "+0.04 D", "+2.5 D"],
      correctOptionIndex: 0,
      explanation: "Power P = 1/f(in metres) = 1/0.25 = +4.0 Dioptres."
    },
    {
      id: 5,
      question: "Which mirror is used as a rear-view mirror in vehicles?",
      options: ["Convex mirror", "Concave mirror", "Plane mirror", "Parabolic mirror"],
      correctOptionIndex: 0,
      explanation: "Convex mirrors produce erect, diminished virtual images and have a wide field of view."
    },
    {
      id: 6,
      question: "When a pencil is partly immersed in water, it appears bent at the interface due to:",
      options: ["Refraction of light", "Dispersion of light", "Scattering of light", "Diffraction of light"],
      correctOptionIndex: 0,
      explanation: "Light refracts away from normal passing from water to air, creating the illusion of a bent pencil."
    },
    {
      id: 7,
      question: "For a real object placed between optical centre O and principal focus F1 of a convex lens, the nature of image formed is:",
      options: ["Virtual, erect and magnified", "Real, inverted and diminished", "Real, inverted and magnified", "Virtual, inverted and same size"],
      correctOptionIndex: 0,
      explanation: "Rays diverge after refraction; tracing backward produces a virtual, erect, magnified image."
    },
    {
      id: 8,
      question: "If magnification produced by a spherical mirror is m = -1.5, what does it signify?",
      options: ["Real, inverted, and enlarged image", "Virtual, erect, and enlarged image", "Real, inverted, and diminished image", "Virtual, erect, and diminished image"],
      correctOptionIndex: 0,
      explanation: "Negative m means inverted (real). Magnitude |m| = 1.5 > 1 means enlarged."
    },
    {
      id: 9,
      question: "Speed of light in vacuum is 3 × 10⁸ m/s. If refractive index of diamond is 2.42, speed of light in diamond is:",
      options: ["1.24 × 10⁸ m/s", "2.42 × 10⁸ m/s", "1.5 × 10⁸ m/s", "2.0 × 10⁸ m/s"],
      correctOptionIndex: 0,
      explanation: "v = c / n = (3 × 10⁸) / 2.42 ≈ 1.24 × 10⁸ m/s."
    },
    {
      id: 10,
      question: "The radius of curvature of a spherical mirror is 24 cm. Its focal length is:",
      options: ["12 cm", "48 cm", "6 cm", "24 cm"],
      correctOptionIndex: 0,
      explanation: "f = R/2 = 24 / 2 = 12 cm."
    }
  ],

  // Physics - Electricity
  "Electricity": [
    {
      id: 1,
      question: "Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is their equivalent resistance?",
      options: ["1 Ω", "11 Ω", "2.5 Ω", "0.5 Ω"],
      correctOptionIndex: 0,
      explanation: "1/Rp = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. Rp = 1 Ω."
    },
    {
      id: 2,
      question: "According to Ohm's Law, the graph between potential difference (V) and current (I) at constant temperature is:",
      options: ["A straight line passing through origin", "A parabola", "A hyperbola", "An exponential curve"],
      correctOptionIndex: 0,
      explanation: "V = IR. Since R is constant at given temperature, V ∝ I (linear through origin)."
    },
    {
      id: 3,
      question: "The electrical resistivity of a given metallic wire depends upon:",
      options: ["Nature of material and temperature", "Length of the wire", "Thickness of the wire", "Shape of cross-section"],
      correctOptionIndex: 0,
      explanation: "Resistivity (ρ) is an intrinsic property dependent solely on material composition and temperature."
    },
    {
      id: 4,
      question: "An electric bulb is rated 220 V and 100 W. When operated on 110 V, power consumed will be:",
      options: ["25 W", "50 W", "75 W", "100 W"],
      correctOptionIndex: 0,
      explanation: "Resistance R = V²/P = 220²/100 = 484 Ω. Power P' = V'²/R = 110²/484 = 25 W."
    },
    {
      id: 5,
      question: "How much work is done in moving a charge of 2 C across two points having potential difference 12 V?",
      options: ["24 Joules", "6 Joules", "14 Joules", "0.16 Joules"],
      correctOptionIndex: 0,
      explanation: "W = Q × V = 2 C × 12 V = 24 J."
    },
    {
      id: 6,
      question: "1 kilowatt-hour (kWh) of commercial electrical energy equals:",
      options: ["3.6 × 10⁶ J", "3.6 × 10⁵ J", "1000 J", "3600 J"],
      correctOptionIndex: 0,
      explanation: "1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ Joules."
    },
    {
      id: 7,
      question: "In domestic circuits, appliances are connected in parallel because:",
      options: ["Each appliance gets the same full voltage and operates independently", "Total resistance increases", "Less current is drawn from mains", "Wires do not heat up at all"],
      correctOptionIndex: 0,
      explanation: "Parallel connection ensures every appliance receives full 220 V and can be turned on/off independently."
    },
    {
      id: 8,
      question: "If length of a wire is doubled and its area of cross-section is halved, its resistance will become:",
      options: ["4 times", "2 times", "Halved", "Unchanged"],
      correctOptionIndex: 0,
      explanation: "R = ρ(L/A). New R' = ρ(2L / (A/2)) = 4 × ρ(L/A) = 4R."
    },
    {
      id: 9,
      question: "A fuse wire should have:",
      options: ["High resistance and low melting point", "Low resistance and high melting point", "High resistance and high melting point", "Low resistance and low melting point"],
      correctOptionIndex: 0,
      explanation: "High resistance heats wire quickly during overcurrent; low melting point melts it safely before appliances damage."
    },
    {
      id: 10,
      question: "Joule's law of heating states that heat produced in a resistor is directly proportional to:",
      options: ["Square of current (I²)", "Inversely proportional to resistance", "Inversely proportional to time", "Independent of current"],
      correctOptionIndex: 0,
      explanation: "H = I²Rt. Heat is directly proportional to I², R, and t."
    }
  ],

  // Chemistry - Acids, Bases and Salts
  "Acids, Bases and Salts": [
    {
      id: 1,
      question: "What is the pH of a neutral aqueous solution at 25°C?",
      options: ["7", "0", "14", "1"],
      correctOptionIndex: 0,
      explanation: "At 25°C (298 K), [H⁺] = [OH⁻] = 10⁻⁷ M, so pH = -log(10⁻⁷) = 7."
    },
    {
      id: 2,
      question: "When an acid reacts with a metal carbonate or hydrogen carbonate, the gas evolved is:",
      options: ["Carbon dioxide (CO₂)", "Hydrogen (H₂)", "Oxygen (O₂)", "Nitrogen dioxide (NO₂)"],
      correctOptionIndex: 0,
      explanation: "Acid + Metal Carbonate → Salt + Water + Carbon Dioxide gas (turns lime water milky)."
    },
    {
      id: 3,
      question: "What is the chemical formula of Plaster of Paris (POP)?",
      options: ["CaSO₄·½H₂O", "CaSO₄·2H₂O", "CaSO₄·5H₂O", "CaSO₄"],
      correctOptionIndex: 0,
      explanation: "Plaster of Paris is Calcium Sulphate Hemihydrate (CaSO₄·½H₂O), prepared by heating Gypsum (CaSO₄·2H₂O) to 373 K."
    },
    {
      id: 4,
      question: "Which acid is present in an ant's sting causing burning pain?",
      options: ["Methanoic acid (Formic acid)", "Acetic acid (Ethanoic acid)", "Citric acid", "Tartaric acid"],
      correctOptionIndex: 0,
      explanation: "Ant sting injects Methanoic acid (HCOOH). Applying a mild base like baking soda provides relief."
    },
    {
      id: 5,
      question: "Bleaching powder gives the smell of chlorine because it:",
      options: ["Reacts with carbon dioxide in moist air releasing chlorine", "Is a mixture of chlorine and lime", "Contains free chlorine gas stored under pressure", "Decomposes spontaneously into hydrochloric acid"],
      correctOptionIndex: 0,
      explanation: "CaOCl₂ + CO₂ → CaCO₃ + Cl₂↑. Reaction with atmospheric CO₂ releases chlorine gas."
    },
    {
      id: 6,
      question: "Which salt is used in soda-acid fire extinguishers?",
      options: ["Sodium hydrogen carbonate (NaHCO₃)", "Sodium carbonate (Na₂CO₃·10H₂O)", "Calcium carbonate (CaCO₃)", "Sodium chloride (NaCl)"],
      correctOptionIndex: 0,
      explanation: "NaHCO₃ reacts with sulphuric acid in the extinguisher to produce large volumes of CO₂ gas."
    },
    {
      id: 7,
      question: "Why does dry HCl gas not turn dry blue litmus paper red?",
      options: ["It does not dissociate into H⁺(aq) ions in the absence of water", "Dry litmus paper is alkaline", "HCl is not an acid in gaseous state", "Lithium ions are absent"],
      correctOptionIndex: 0,
      explanation: "Acids exhibit acidic behavior only in the presence of water because H⁺ ions are formed only in aqueous solution (as hydronium ions H₃O⁺)."
    },
    {
      id: 8,
      question: "What is the common name of Sodium carbonate decahydrate (Na₂CO₃·10H₂O)?",
      options: ["Washing soda", "Baking soda", "Baking powder", "Bleaching powder"],
      correctOptionIndex: 0,
      explanation: "Na₂CO₃·10H₂O is washing soda, obtained by recrystallization of sodium carbonate."
    },
    {
      id: 9,
      question: "Tooth decay starts when the pH in the mouth is lower than:",
      options: ["5.5", "6.5", "7.0", "7.8"],
      correctOptionIndex: 0,
      explanation: "Tooth enamel made of calcium hydroxyapatite corrodes when pH in mouth falls below 5.5 due to acid produced by bacteria."
    },
    {
      id: 10,
      question: "When copper oxide (black) is treated with dilute hydrochloric acid, the solution turns blue-green due to formation of:",
      options: ["Copper(II) chloride (CuCl₂)", "Copper(I) chloride (CuCl)", "Copper hydroxide", "Copper sulphate"],
      correctOptionIndex: 0,
      explanation: "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l). The blue-green color is due to the formation of copper(II) chloride."
    }
  ],

  // Chemistry - Chemical Reactions and Equations
  "Chemical Reactions and Equations": [
    {
      id: 1,
      question: "When magnesium ribbon is burnt in air, the ash formed is chemically:",
      options: ["Magnesium oxide (MgO)", "Magnesium carbonate (MgCO₃)", "Magnesium nitride (Mg₃N₂)", "Magnesium hydroxide (Mg(OH)₂)"],
      correctOptionIndex: 0,
      explanation: "2Mg(s) + O₂(g) → 2MgO(s). A dazzling white flame produces white powder of Magnesium Oxide."
    },
    {
      id: 2,
      question: "Which of the following is an example of a redox reaction?",
      options: ["CuO + H₂ → Cu + H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃", "CaCO₃ → CaO + CO₂", "HCl + NaOH → NaCl + H₂O"],
      correctOptionIndex: 0,
      explanation: "CuO is reduced to Cu and H₂ is oxidized to H₂O. Both oxidation and reduction occur simultaneously."
    },
    {
      id: 3,
      question: "The brown gas evolved on heating ferrous sulphate crystals in a dry boiling tube has the smell of burning sulphur. The gases are:",
      options: ["SO₂ and SO₃", "NO₂ and NO", "CO₂ and CO", "H₂S"],
      correctOptionIndex: 0,
      explanation: "2FeSO₄(s) --Δ--> Fe₂O₃(s) + SO₂(g) + SO₃(g)."
    },
    {
      id: 4,
      question: "Rancidity of oily food items can be prevented by:",
      options: ["Flushing bags with Nitrogen gas", "Exposing to direct sunlight", "Keeping at high temperature", "Adding moisture"],
      correctOptionIndex: 0,
      explanation: "Nitrogen is an inert gas that prevents oxidation of fats and oils."
    },
    {
      id: 5,
      question: "In the reaction: Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃, the precipitate PbI₂ is of which color?",
      options: ["Yellow", "White", "Black", "Brown"],
      correctOptionIndex: 0,
      explanation: "Lead iodide (PbI₂) forms a bright yellow precipitate."
    },
    {
      id: 6,
      question: "Respiration is considered an exothermic reaction because:",
      options: ["Energy is released during oxidation of glucose", "Oxygen is consumed", "Carbon dioxide is absorbed", "Water is formed"],
      correctOptionIndex: 0,
      explanation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)."
    },
    {
      id: 7,
      question: "The chemical formula of marble, limestone, and chalk is:",
      options: ["CaCO₃", "CaO", "Ca(OH)₂", "CaSO₄"],
      correctOptionIndex: 0,
      explanation: "Calcium carbonate (CaCO₃) is the common chemical compound in limestone, chalk, and marble."
    },
    {
      id: 8,
      question: "Electrolysis of water is a decomposition reaction. The molar ratio of hydrogen to oxygen gas liberated is:",
      options: ["2 : 1", "1 : 2", "1 : 1", "4 : 1"],
      correctOptionIndex: 0,
      explanation: "2H₂O(l) → 2H₂(g) + O₂(g). 2 volumes of H₂ gas collect at cathode for every 1 volume of O₂ at anode."
    },
    {
      id: 9,
      question: "When silver chloride (AgCl) is exposed to sunlight, it turns grey due to:",
      options: ["Silver metal formed by photolytic decomposition", "Silver oxide formation", "Chlorine gas absorption", "Silver carbonate formation"],
      correctOptionIndex: 0,
      explanation: "2AgCl(s) --sunlight--> 2Ag(s) + Cl₂(g). White silver chloride decomposes into grey metallic silver."
    },
    {
      id: 10,
      question: "Rusting of iron is chemically formulated as:",
      options: ["Hydrated ferric oxide (Fe₂O₃·xH₂O)", "Ferrous oxide (FeO)", "Ferric carbonate", "Magnetic iron oxide (Fe₃O₄)"],
      correctOptionIndex: 0,
      explanation: "Rust is hydrated iron(III) oxide with formula Fe₂O₃·xH₂O."
    }
  ],

  // Biology - Life Processes
  "Life Processes": [
    {
      id: 1,
      question: "Which enzyme is present in human saliva that breaks down starch into maltose?",
      options: ["Salivary amylase (Ptyalin)", "Pepsin", "Trypsin", "Lipase"],
      correctOptionIndex: 0,
      explanation: "Salivary amylase hydrolyzes dietary starch into simpler disaccharide sugars (maltose) in the mouth (pH ~ 6.8)."
    },
    {
      id: 2,
      question: "The correct sequence of anaerobic respiration in yeast is:",
      options: ["Glucose → Pyruvate → Ethanol + CO₂ + Energy", "Glucose → Pyruvate → Lactic acid + Energy", "Glucose → Pyruvate → CO₂ + H₂O + Energy", "Glucose → Pyruvate → Glucose + CO₂"],
      correctOptionIndex: 0,
      explanation: "In yeast fermentation, glucose in cytoplasm forms pyruvate, which in absence of oxygen converts into ethanol, CO₂, and 2 ATP."
    },
    {
      id: 3,
      question: "The structural and functional filtration unit of the human kidney is called:",
      options: ["Nephron", "Neuron", "Alveolus", "Glomerulus"],
      correctOptionIndex: 0,
      explanation: "Nephron is the basic unit consisting of Bowman's capsule, glomerulus, and renal tubule that filters blood."
    },
    {
      id: 4,
      question: "During photosynthesis, oxygen gas liberated comes from the splitting of:",
      options: ["Water (H₂O)", "Carbon dioxide (CO₂)", "Glucose", "Chlorophyll"],
      correctOptionIndex: 0,
      explanation: "Photolysis of water (2H₂O → 4H⁺ + 4e⁻ + O₂↑) in the light reaction releases oxygen, proven by Ruben and Kamen."
    },
    {
      id: 5,
      question: "Which component of blood is responsible for clotting at the site of an injury?",
      options: ["Blood platelets (Thrombocytes)", "Red Blood Cells (Erythrocytes)", "White Blood Cells (Leukocytes)", "Blood Plasma"],
      correctOptionIndex: 0,
      explanation: "Platelets release thromboplastin, initiating the cascade that converts fibrinogen to insoluble fibrin clots."
    },
    {
      id: 6,
      question: "In the human heart, deoxygenated blood from the body is received by which chamber?",
      options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
      correctOptionIndex: 0,
      explanation: "Superior and inferior vena cava empty deoxygenated blood into the right atrium."
    },
    {
      id: 7,
      question: "Bile juice secreted by liver performs which essential digestive function?",
      options: ["Emulsifies large fat globules and makes acidic chyme alkaline", "Digests proteins into amino acids", "Breaks starch into glucose", "Kills bacteria in small intestine"],
      correctOptionIndex: 0,
      explanation: "Bile salts emulsify large fat droplets into tiny micelles, increasing surface area for lipase action, and provide alkaline pH."
    },
    {
      id: 8,
      question: "The movement of water and dissolved minerals upwards in plants is primarily mediated by:",
      options: ["Transpiration pull in xylem vessels", "Translocation in phloem sieve tubes", "Photosynthetic pressure", "Capillary suction in stomata alone"],
      correctOptionIndex: 0,
      explanation: "Evaporation of water from mesophyll cells creates negative suction pressure (transpiration pull) in xylem conduits."
    },
    {
      id: 9,
      question: "In humans, the exchange of gases (O₂ and CO₂) occurs across the thin walls of:",
      options: ["Alveoli", "Bronchi", "Trachea", "Diaphragm"],
      correctOptionIndex: 0,
      explanation: "Alveoli provide a huge vascularized surface area (approx 80 m²) lined with capillaries for gas diffusion."
    },
    {
      id: 10,
      question: "Accumulation of which substance causes muscle cramps after rigorous physical activity?",
      options: ["Lactic acid", "Pyruvate", "Ethanol", "Carbonic acid"],
      correctOptionIndex: 0,
      explanation: "In muscle cells under anaerobic conditions (lack of O₂), pyruvate is converted into lactic acid, causing fatigue and cramps."
    }
  ],

  // Mathematics - Quadratic Equations
  "Quadratic Equations": [
    {
      id: 1,
      question: "The roots of the quadratic equation ax² + bx + c = 0 are real and equal if the discriminant D is:",
      options: ["b² - 4ac = 0", "b² - 4ac > 0", "b² - 4ac < 0", "b² - 4ac ≤ 0"],
      correctOptionIndex: 0,
      explanation: "When D = b² - 4ac = 0, roots are x = -b/(2a), real and identical."
    },
    {
      id: 2,
      question: "Find the roots of the quadratic equation x² - 5x + 6 = 0:",
      options: ["2 and 3", "-2 and -3", "1 and 6", "-1 and -6"],
      correctOptionIndex: 0,
      explanation: "(x - 2)(x - 3) = 0 => x = 2, 3."
    },
    {
      id: 3,
      question: "If one root of the quadratic equation 2x² + kx - 6 = 0 is 2, then the value of k is:",
      options: ["-1", "1", "2", "-2"],
      correctOptionIndex: 0,
      explanation: "Substitute x = 2: 2(2)² + k(2) - 6 = 0 => 8 + 2k - 6 = 0 => 2k + 2 = 0 => k = -1."
    },
    {
      id: 4,
      question: "The sum (S) and product (P) of the roots of 3x² - 9x + 5 = 0 are:",
      options: ["Sum = 3, Product = 5/3", "Sum = -3, Product = -5/3", "Sum = 9, Product = 5", "Sum = 5/3, Product = 3"],
      correctOptionIndex: 0,
      explanation: "Sum of roots = -b/a = -(-9)/3 = 3. Product of roots = c/a = 5/3."
    },
    {
      id: 5,
      question: "A quadratic equation whose roots are (3 + √5) and (3 - √5) is:",
      options: ["x² - 6x + 4 = 0", "x² + 6x + 4 = 0", "x² - 6x - 4 = 0", "x² - 4x + 6 = 0"],
      correctOptionIndex: 0,
      explanation: "Sum of roots = (3 + √5) + (3 - √5) = 6. Product = (3 + √5)(3 - √5) = 9 - 5 = 4. Equation: x² - Sx + P = x² - 6x + 4 = 0."
    },
    {
      id: 6,
      question: "For what value of p will the equation px² + 4x + 1 = 0 have real roots?",
      options: ["p ≤ 4 (and p ≠ 0)", "p ≥ 4", "p = 2", "p > 16"],
      correctOptionIndex: 0,
      explanation: "For real roots, D ≥ 0 => 4² - 4(p)(1) ≥ 0 => 16 - 4p ≥ 0 => 4p ≤ 16 => p ≤ 4, with p ≠ 0 for a valid quadratic."
    },
    {
      id: 7,
      question: "If the roots of ax² + bx + c = 0 are reciprocal to each other, then:",
      options: ["c = a", "b = 0", "a = b", "c = -a"],
      correctOptionIndex: 0,
      explanation: "Let roots be α and 1/α. Product of roots = α × (1/α) = 1 = c/a => c = a."
    },
    {
      id: 8,
      question: "The quadratic formula was originally formulated by ancient Indian mathematician:",
      options: ["Sridharacharya", "Aryabhata", "Brahmagupta", "Bhaskara II"],
      correctOptionIndex: 0,
      explanation: "Sridharacharya derived the method of completing the square to solve quadratic equations: x = (-b ± √(b² - 4ac)) / (2a)."
    },
    {
      id: 9,
      question: "The number of real roots of the equation x² + 4 = 0 is:",
      options: ["0 (Zero)", "2", "1", "Infinite"],
      correctOptionIndex: 0,
      explanation: "x² = -4. Square of any real number cannot be negative, hence D = 0 - 4(1)(4) = -16 < 0 (no real roots)."
    },
    {
      id: 10,
      question: "The discriminant of the quadratic equation 2x² - 4x + 3 = 0 is:",
      options: ["-8", "8", "-16", "32"],
      correctOptionIndex: 0,
      explanation: "D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8."
    }
  ]
};

// Curated high-yield Subjective Questions & Rubrics
export const CURATED_SUBJECTIVE_BANK: Record<string, { short: SubjectiveQuestion[]; long: SubjectiveQuestion[]; rubrics: Record<number, { keywords: string[]; modelAnswer: string; breakdown: string }> }> = {
  "Light - Reflection and Refraction": {
    short: [
      { id: 101, question: "State Snell's Law of Refraction and write its mathematical formula.", maxMarks: 2 },
      { id: 102, question: "Define absolute refractive index of a medium. Can refractive index be less than 1? Explain.", maxMarks: 2 },
      { id: 103, question: "What is 1 Dioptre of power of a lens? A lens has focal length -50 cm. Find its power.", maxMarks: 2 },
      { id: 104, question: "Why do stars twinkle while planets do not? Give the concise scientific reason.", maxMarks: 2 },
      { id: 105, question: "Draw a ray diagram showing refraction through a rectangular glass slab and label lateral displacement.", maxMarks: 2 }
    ],
    long: [
      { id: 201, question: "Derive the mirror formula 1/f = 1/v + 1/u for a concave mirror forming a real, inverted image with a neatly labeled ray diagram. State the sign conventions used.", maxMarks: 10 },
      { id: 202, question: "(a) What is total internal reflection? State two necessary conditions for it to occur.\n(b) Define critical angle and derive the relationship between refractive index (n) and critical angle (C).\n(c) Calculate the critical angle for glass with refractive index 1.5.", maxMarks: 10 }
    ],
    rubrics: {
      101: {
        keywords: ["sin i / sin r", "ratio of sine", "constant", "refractive index"],
        modelAnswer: "Snell's Law: The ratio of the sine of angle of incidence (i) to the sine of angle of refraction (r) is constant for a given pair of media and color of light.\nFormula: sin(i) / sin(r) = constant = ₁n₂.",
        breakdown: "Definition (1 Mark) + Formula & Notation (1 Mark)"
      },
      102: {
        keywords: ["c / v", "speed of light in vacuum", "cannot be less than 1", "maximum speed"],
        modelAnswer: "Absolute refractive index n = c / v (speed of light in vacuum / speed in medium).\nNo, it cannot be less than 1 because no medium allows light to travel faster than c (3 × 10⁸ m/s). Since v ≤ c, n ≥ 1 always.",
        breakdown: "Definition (1 Mark) + Justification why n >= 1 (1 Mark)"
      },
      103: {
        keywords: ["1 Dioptre", "focal length 1 metre", "P = 1/f", "-2 D", "concave lens"],
        modelAnswer: "1 Dioptre is the power of a lens with focal length 1 metre.\nf = -50 cm = -0.5 m.\nP = 1/f = 1/(-0.5) = -2.0 D (concave lens).",
        breakdown: "Definition (1 Mark) + Numerical step & answer (1 Mark)"
      },
      104: {
        keywords: ["atmospheric refraction", "point source", "extended source", "shifting density"],
        modelAnswer: "1. Stars are distant point sources; shifting atmospheric density causes continuous changes in apparent position and brightness (twinkling).\n2. Planets are closer extended sources; variations from different points average out, preventing twinkling.",
        breakdown: "Star point-source refraction (1 Mark) + Planet extended-source averaging (1 Mark)"
      },
      105: {
        keywords: ["lateral displacement", "parallel", "angle i = angle e", "perpendicular distance"],
        modelAnswer: "Ray bends toward normal entering glass (denser) and away from normal entering air (rarer). Emergent ray is parallel to incident ray (i = e). Perpendicular distance between incident path and emergent ray is Lateral Displacement.",
        breakdown: "Ray geometry (1 Mark) + Correct labeling of lateral shift (1 Mark)"
      },
      201: {
        keywords: ["similar triangles", "sign conventions", "1/f = 1/v + 1/u", "concave mirror", "-u", "-v", "-f"],
        modelAnswer: "To score full marks, write this answer like this:\n\n1. RAY DIAGRAM:\nDraw concave mirror with pole P, focus F, center C. Object AB placed beyond C. Real, inverted image A'B' forms between C and F.\n\n2. DERIVATION:\n- ΔABP ~ ΔA'B'P (AA similarity) => A'B'/AB = PB'/PB = v/u\n- ΔABC ~ ΔA'CB' => A'B'/AB = CB'/CB = (CP - PB') / (PB - CP)\n- Equating both: PB'/PB = (CP - PB') / (PB - CP)\n\n3. CARTESIAN SIGN CONVENTIONS:\nPB = -u, PB' = -v, PC = -R = -2f\nSubstituting signs: (-v)/(-u) = (-2f - (-v)) / (-u - (-2f))\nv/u = (v - 2f) / (2f - u)\nCross multiply: 2vf - uv = uv - 2uf => 2vf + 2uf = 2uv => vf + uf = uv\nDivide throughout by uvf: 1/u + 1/v = 1/f. (Hence derived)",
        breakdown: "Ray Diagram (3 Marks) + Step-by-step Derivation (4 Marks) + Sign Conventions & Conclusion (3 Marks)"
      },
      202: {
        keywords: ["total internal reflection", "denser to rarer", "critical angle", "sin C = 1/n", "41.8"],
        modelAnswer: "To score full marks, write this answer like this:\n\n(a) Total Internal Reflection (TIR):\nComplete reflection of a light ray back into the denser medium when angle of incidence exceeds critical angle.\nConditions:\n1. Light travels from denser to rarer medium.\n2. Angle of incidence in denser medium is greater than critical angle (i > C).\n\n(b) Critical Angle Relation:\nBy Snell's Law: n sin(C) = 1 × sin(90°) => sin(C) = 1/n => n = 1/sin(C).\n\n(c) Calculation for Glass (n = 1.5):\nsin(C) = 1 / 1.5 = 2/3 ≈ 0.6667 => C ≈ 41.8°.",
        breakdown: "TIR Definition & 2 Conditions (3 Marks) + Critical Angle & Derivation (4 Marks) + Numerical Calculation (3 Marks)"
      }
    }
  },

  "Acids, Bases and Salts": {
    short: [
      { id: 101, question: "What happens when zinc granules are treated with dilute sulphuric acid? Write the balanced chemical equation and test for the gas evolved.", maxMarks: 2 },
      { id: 102, question: "Why does an aqueous solution of an acid conduct electricity while glucose or alcohol solution does not?", maxMarks: 2 },
      { id: 103, question: "What is water of crystallization? Give two examples with their chemical formulas.", maxMarks: 2 },
      { id: 104, question: "Explain why dry blue litmus paper does not change color in dry HCl gas, but moist blue litmus turns red.", maxMarks: 2 },
      { id: 105, question: "Write the chemical formula and preparation equation of Bleaching Powder.", maxMarks: 2 }
    ],
    long: [
      { id: 201, question: "(a) What is the Chlor-alkali process? Name the three products formed and write the balanced chemical equation.\n(b) State one important industrial use of each of the three products.\n(c) Explain what happens when chlorine gas is passed over dry slaked lime.", maxMarks: 10 },
      { id: 202, question: "(a) What is Plaster of Paris? Write its chemical formula, chemical name, and preparation equation from gypsum.\n(b) What precautions must be taken during its storage and preparation?\n(c) Explain why mixing POP with water forms a hard mass with a balanced equation.", maxMarks: 10 }
    ],
    rubrics: {
      101: {
        keywords: ["Zn + H2SO4 -> ZnSO4 + H2", "hydrogen gas", "pop sound", "burning splinter"],
        modelAnswer: "Zn(s) + H₂SO₄(dilute) → ZnSO₄(aq) + H₂(g)↑.\nTest: Bring a burning splinter near the mouth of the test tube. The evolved hydrogen gas burns with a characteristic 'pop' sound.",
        breakdown: "Balanced Chemical Equation (1 Mark) + Pop Sound Test (1 Mark)"
      },
      102: {
        keywords: ["ions", "H+ ions", "covalent", "no free ions", "conducts electricity"],
        modelAnswer: "Acids dissociate in water to produce free moving ions (H⁺ / H₃O⁺ and anions) which carry electric current. Glucose and alcohol are covalent compounds that do not ionize in water, hence lack charge carriers.",
        breakdown: "Acid ionization mechanism (1 Mark) + Explanation for glucose/alcohol (1 Mark)"
      },
      103: {
        keywords: ["fixed number of water molecules", "formula unit", "CuSO4.5H2O", "FeSO4.7H2O", "Na2CO3.10H2O"],
        modelAnswer: "Water of crystallization is the fixed number of water molecules chemically bonded in one formula unit of a salt crystal.\nExamples:\n1. Blue Vitriol (Copper Sulphate): CuSO₄·5H₂O\n2. Washing Soda: Na₂CO₃·10H₂O\n3. Gypsum: CaSO₄·2H₂O.",
        breakdown: "Definition (1 Mark) + 2 Correct Formulas (1 Mark)"
      },
      104: {
        keywords: ["H+ ions only in water", "hydronium ions", "dry HCl does not ionize"],
        modelAnswer: "Acidic properties are caused exclusively by hydrogen ions (H⁺/H₃O⁺). In dry HCl gas, no water is present, so HCl molecules do not dissociate. In moist litmus paper, water allows formation of H⁺(aq) ions, which turns blue litmus red.",
        breakdown: "Absence of ions in dry state (1 Mark) + Ionization in moist litmus (1 Mark)"
      },
      105: {
        keywords: ["CaOCl2", "Ca(OH)2 + Cl2", "slaked lime"],
        modelAnswer: "Chemical formula: CaOCl₂ (Calcium oxychloride).\nPreparation: Passed chlorine gas over dry slaked lime [Ca(OH)₂]:\nCa(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l).",
        breakdown: "Formula (1 Mark) + Balanced Equation (1 Mark)"
      },
      201: {
        keywords: ["chlor-alkali", "2NaCl + 2H2O -> 2NaOH + Cl2 + H2", "chlorine", "hydrogen", "sodium hydroxide", "uses", "bleaching powder"],
        modelAnswer: "To score full marks, write this answer like this:\n\n(a) Chlor-Alkali Process:\nElectrolysis of an aqueous solution of sodium chloride (brine) produces sodium hydroxide (alkali), chlorine gas, and hydrogen gas.\nEquation: 2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g)↑ (at anode) + H₂(g)↑ (at cathode)\n\n(b) Industrial Uses:\n1. Chlorine (Cl₂): Disinfecting drinking water, manufacturing PVC, CFCs, and bleaching powder.\n2. Hydrogen (H₂): Fuel, manufacture of ammonia for fertilizers, and margarine.\n3. Sodium Hydroxide (NaOH): Soap and detergent manufacturing, paper making, and degreasing metals.\n\n(c) Action on Slaked Lime:\nWhen chlorine is passed over dry slaked lime, bleaching powder is formed:\nCa(OH)₂ + Cl₂ → CaOCl₂ + H₂O.",
        breakdown: "Definition & Balanced Equation (4 Marks) + 3 Uses (3 Marks) + Slaked lime reaction (3 Marks)"
      },
      202: {
        keywords: ["CaSO4.1/2H2O", "calcium sulphate hemihydrate", "gypsum", "373 K", "hard mass", "storage moisture-proof"],
        modelAnswer: "To score full marks, write this answer like this:\n\n(a) Plaster of Paris (POP):\n- Chemical Name: Calcium Sulphate Hemihydrate\n- Chemical Formula: CaSO₄·½H₂O\n- Preparation: CaSO₄·2H₂O (Gypsum) --(heat at 373 K / 100°C)--> CaSO₄·½H₂O + 1½H₂O\n\n(b) Precautions:\n1. Temperature must not exceed 373 K, otherwise it loses all water of crystallization to form dead burnt plaster (anhydrous CaSO₄), which does not set.\n2. Storage: Must be stored in moisture-proof containers, because it absorbs moisture from air and sets into hard gypsum.\n\n(c) Setting Reaction with Water:\nCaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (Hard solid gypsum)\nDue to interlocking crystal lattice formation, it hardens rapidly in 10-15 minutes.",
        breakdown: "Formula, Name & Preparation Equation (4 Marks) + 2 Precautions (3 Marks) + Setting mechanism & Equation (3 Marks)"
      }
    }
  }
};

// Procedural dynamic question generator for ANY chapter in Indian curricula
export const generateDynamicMCQs = (subject: string, chapter: string, className: string): MCQQuestion[] => {
  return [
    {
      id: 1,
      question: `Which fundamental law or primary equation is central to the study of "${chapter}" in Class ${className} ${subject}?`,
      options: [
        `The standard governing relation derived in NCERT for ${chapter}`,
        `An arbitrary empirical rule with zero mathematical validity`,
        `A localized observation restricted solely to room temperature`,
        `An inverse relationship independent of physical constants`
      ],
      correctOptionIndex: 0,
      explanation: `In ${subject}, "${chapter}" establishes fundamental principles rigorously tested in board examination step-marking schemes.`
    },
    {
      id: 2,
      question: `What is the standard SI unit of the primary quantitative measure introduced in "${chapter}"?`,
      options: [
        `The standard coherent SI unit accepted internationally and in CBSE/ICSE board exams`,
        `An obsolete CGS unit without conversion factor`,
        `A dimensionless quantity arbitrarily scaled`,
        `A non-standard unit dependent on atmospheric pressure`
      ],
      correctOptionIndex: 0,
      explanation: `Always specify correct SI units with exponential scientific notation to secure full marks in board examinations.`
    },
    {
      id: 3,
      question: `When the primary independent variable is doubled in "${chapter}", how does the dependent quantity typically respond?`,
      options: [
        `It changes proportionally (linearly or quadratically) as governed by the standard formula`,
        `It remains completely unchanged under all variations`,
        `It drops instantaneously to zero`,
        `It becomes imaginary without physical meaning`
      ],
      correctOptionIndex: 0,
      explanation: `Analyzing direct and inverse proportions from the governing equation is a classic discriminating question on Indian board papers.`
    },
    {
      id: 4,
      question: `Which experimental condition or catalyst is essential for the primary process in "${chapter}" to proceed effectively?`,
      options: [
        `Maintaining standard temperature, concentration, or specific catalyst as prescribed in the syllabus`,
        `Complete absence of all surrounding matter`,
        `Continuous exposure to radioactive radiation`,
        `Maintaining zero atmospheric pressure at all times`
      ],
      correctOptionIndex: 0,
      explanation: `Board examiners award marks specifically for stating boundary conditions like temperature, pressure, and catalyst.`
    },
    {
      id: 5,
      question: `Identify the correct assertion regarding the microscopic or molecular mechanism in "${chapter}":`,
      options: [
        `Particles/components interact through fundamental forces maintaining conservation laws`,
        `Mass and energy are created spontaneously out of vacuum`,
        `Entropy is permanently eliminated in open systems`,
        `Molecules remain entirely stationary at all temperatures`
      ],
      correctOptionIndex: 0,
      explanation: `Microscopic interpretations connect empirical observations to underlying scientific laws.`
    },
    {
      id: 6,
      question: `In practical lab experiments for "${chapter}", what is the most common experimental precaution required?`,
      options: [
        `Avoiding parallax error, zero error, and ensuring clean electrical/chemical contacts`,
        `Wearing polarized sunglasses indoors at all times`,
        `Performing measurements only during nighttime`,
        `Submerging all measuring apparatus in oil`
      ],
      correctOptionIndex: 0,
      explanation: `CBSE lab manual questions test parallax elimination, least count awareness, and zero correction.`
    },
    {
      id: 7,
      question: `Which graphical representation accurately depicts the relation between core variables in "${chapter}"?`,
      options: [
        `A straight line passing through origin (or having positive/negative intercept as per formula)`,
        `A purely random scatter plot without mathematical trend`,
        `A circular orbit on cartesian coordinates`,
        `A step function with infinite discontinuity`
      ],
      correctOptionIndex: 0,
      explanation: `Graph questions test slope and intercept interpretation (e.g. slope = resistance, spring constant, rate constant).`
    },
    {
      id: 8,
      question: `What distinguishes the primary concept of "${chapter}" from related secondary phenomena?`,
      options: [
        `It is an intrinsic state property defined by clear mathematical boundary criteria`,
        `It occurs only inside living organisms and nowhere else`,
        `It depends solely on the color of the sample`,
        `It violates thermodynamic equilibrium`
      ],
      correctOptionIndex: 0,
      explanation: `Clear discrimination between similar concepts (e.g. distance vs displacement, speed vs velocity) is essential.`
    },
    {
      id: 9,
      question: `What is the significance of the sign convention or directional vector in "${chapter}"?`,
      options: [
        `It denotes relative direction, work done by/on system, or attraction vs repulsion`,
        `It has no physical significance and is purely arbitrary`,
        `It indicates that the magnitude is mathematically imaginary`,
        `It proves the law is invalid in three dimensions`
      ],
      correctOptionIndex: 0,
      explanation: `Cartesian sign conventions (optics, thermodynamics, mechanics) dictate whether values are positive or negative.`
    },
    {
      id: 10,
      question: `Which real-world or industrial application directly harnesses the scientific principles of "${chapter}"?`,
      options: [
        `Modern engineering, electronic devices, chemical synthesis, or medical diagnostics`,
        `Perpetual motion machines operating without energy input`,
        `Frictionless mechanical transport without energy dissipation`,
        `Creation of matter from absolute nothingness`
      ],
      correctOptionIndex: 0,
      explanation: `Application questions link textbook theory to technological implementations per NEP/CBSE guidelines.`
    }
  ];
};

export const generateDynamicSubjective = (subject: string, chapter: string, className: string, mode: 'SHORT' | 'LONG'): SubjectiveQuestion[] => {
  if (mode === 'LONG') {
    return [
      {
        id: 1,
        question: `(a) State and explain the fundamental principle / law governing "${chapter}" in Class ${className} ${subject}.\n(b) With the aid of a neat, labeled diagram, derive the governing mathematical equation step-by-step.\n(c) State two practical applications and two key limitations according to official board marking schemes.`,
        maxMarks: 10
      },
      {
        id: 2,
        question: `(a) Describe the experimental procedure used to verify the core phenomena in "${chapter}".\n(b) Delineate the mathematical steps involved and declare all notation and SI units.\n(c) Solve: If the primary input variable is doubled while system resistance drops by 50%, calculate the net percentage change in final output with complete working steps.`,
        maxMarks: 10
      }
    ];
  }

  return [
    { id: 1, question: `Define the primary scientific term in "${chapter}" and write its standard SI unit.`, maxMarks: 2 },
    { id: 2, question: `State two necessary conditions required for the core process in "${chapter}" to take place.`, maxMarks: 2 },
    { id: 3, question: `Give two key scientific differences between the primary mechanisms observed in "${chapter}".`, maxMarks: 2 },
    { id: 4, question: `Write the balanced equation or governing mathematical formula for "${chapter}" and define all symbols.`, maxMarks: 2 },
    { id: 5, question: `Give a clear scientific reason for the practical observation associated with "${chapter}".`, maxMarks: 2 }
  ];
};
