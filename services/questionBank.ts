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
      explanation: "Using mirror formula 1/f = 1/v + 1/u. Here f = -10 cm, u = -15 cm. 1/v = 1/(-10) - 1/(-15) = -1/10 + 1/15 = -1/30. Therefore v = -30 cm (30 cm in front of the mirror, real and inverted)."
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
      explanation: "Total Internal Reflection occurs when light travels from an optically denser medium to a rarer medium and the angle of incidence in the denser medium exceeds the critical angle (i > c)."
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
      question: "Which of the following mirror is used as a rear-view mirror in vehicles?",
      options: ["Convex mirror", "Concave mirror", "Plane mirror", "Parabolic mirror"],
      correctOptionIndex: 0,
      explanation: "Convex mirrors are used as rear-view mirrors because they always produce an erect, diminished virtual image and have a wide field of view."
    },
    {
      id: 6,
      question: "When a pencil is partly immersed in water, it appears bent at the interface due to:",
      options: ["Refraction of light", "Dispersion of light", "Scattering of light", "Diffraction of light"],
      correctOptionIndex: 0,
      explanation: "Light coming from the submerged part of the pencil refracts away from the normal when moving from water (denser) to air (rarer), making it appear bent."
    },
    {
      id: 7,
      question: "For a real object placed between optical centre O and principal focus F1 of a convex lens, the nature of the image formed is:",
      options: ["Virtual, erect and magnified", "Real, inverted and diminished", "Real, inverted and magnified", "Virtual, inverted and same size"],
      correctOptionIndex: 0,
      explanation: "When an object is placed between the optical centre and F1 of a convex lens, the refracted rays diverge. Extending them backwards forms a virtual, erect, and magnified image on the same side."
    },
    {
      id: 8,
      question: "If magnification produced by a spherical mirror is m = -1.5, what does it signify?",
      options: ["Real, inverted, and enlarged image", "Virtual, erect, and enlarged image", "Real, inverted, and diminished image", "Virtual, erect, and diminished image"],
      correctOptionIndex: 0,
      explanation: "Negative sign of magnification m indicates that the image is inverted and therefore real. |m| = 1.5 > 1 indicates the image is enlarged."
    },
    {
      id: 9,
      question: "Speed of light in vacuum is 3 × 10⁸ m/s. If refractive index of diamond is 2.42, speed of light in diamond is:",
      options: ["1.24 × 10⁸ m/s", "2.42 × 10⁸ m/s", "1.5 × 10⁸ m/s", "2.0 × 10⁸ m/s"],
      correctOptionIndex: 0,
      explanation: "v = c / n = (3 × 10⁸) / 2.42 ≈ 1.239 × 10⁸ m/s."
    },
    {
      id: 10,
      question: "The radius of curvature of a spherical mirror is 24 cm. Its focal length is:",
      options: ["12 cm", "48 cm", "6 cm", "24 cm"],
      correctOptionIndex: 0,
      explanation: "For spherical mirrors of small aperture, focal length f = R/2 = 24 / 2 = 12 cm."
    }
  ],

  // Physics - Electricity
  "Electricity": [
    {
      id: 1,
      question: "Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is their equivalent resistance?",
      options: ["1 Ω", "11 Ω", "2.5 Ω", "0.5 Ω"],
      correctOptionIndex: 0,
      explanation: "1/Rp = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. Therefore Rp = 1 Ω."
    },
    {
      id: 2,
      question: "According to Ohm's Law, the graph between potential difference (V) and current (I) at constant temperature is:",
      options: ["A straight line passing through origin", "A parabola", "A hyperbola", "An exponential curve"],
      correctOptionIndex: 0,
      explanation: "V = IR. Since R is constant at a given temperature, V is directly proportional to I, yielding a linear graph passing through the origin."
    },
    {
      id: 3,
      question: "The electrical resistivity of a given metallic wire depends upon:",
      options: ["Nature of the material and temperature", "Length of the wire", "Thickness of the wire", "Shape of the wire"],
      correctOptionIndex: 0,
      explanation: "Resistivity (ρ) is an intrinsic property that depends solely on the material and temperature, independent of dimensions (length or area of cross-section)."
    },
    {
      id: 4,
      question: "An electric bulb is rated 220 V and 100 W. When it is operated on 110 V, the power consumed will be:",
      options: ["25 W", "50 W", "75 W", "100 W"],
      correctOptionIndex: 0,
      explanation: "Resistance R = V²/P = (220)²/100 = 484 Ω. When operated at 110 V, P' = V'²/R = (110)²/484 = 12100/484 = 25 W."
    },
    {
      id: 5,
      question: "How much work is done in moving a charge of 2 C across two points having a potential difference of 12 V?",
      options: ["24 Joules", "6 Joules", "14 Joules", "0.16 Joules"],
      correctOptionIndex: 0,
      explanation: "Work done W = Q × V = 2 C × 12 V = 24 J."
    },
    {
      id: 6,
      question: "The commercial unit of electrical energy is kilowatt-hour (kWh). 1 kWh is equal to:",
      options: ["3.6 × 10⁶ J", "3.6 × 10⁵ J", "1000 J", "3600 J"],
      correctOptionIndex: 0,
      explanation: "1 kWh = 1 kW × 1 h = 1000 W × 3600 s = 3.6 × 10⁶ Joules."
    },
    {
      id: 7,
      question: "In domestic electric circuits, appliances are always connected in parallel because:",
      options: ["Each appliance gets the same full voltage and operates independently", "Total resistance increases", "Less current is drawn from mains", "Wires do not overheat at all"],
      correctOptionIndex: 0,
      explanation: "Parallel connection ensures every appliance receives full 220 V supply and switching off one appliance does not affect the others."
    },
    {
      id: 8,
      question: "If the length of a conductor is doubled and its area of cross-section is halved, its resistance will become:",
      options: ["4 times", "2 times", "Halved", "Unchanged"],
      correctOptionIndex: 0,
      explanation: "R = ρ(L/A). New resistance R' = ρ(2L / (A/2)) = 4 × ρ(L/A) = 4R."
    },
    {
      id: 9,
      question: "A fuse wire should have:",
      options: ["High resistance and low melting point", "Low resistance and high melting point", "High resistance and high melting point", "Low resistance and low melting point"],
      correctOptionIndex: 0,
      explanation: "A safety fuse needs relatively high resistance to generate heat rapidly upon excess current, and a low melting point so it breaks the circuit before appliances get damaged."
    },
    {
      id: 10,
      question: "Joule's law of heating states that heat produced in a resistor is directly proportional to:",
      options: ["Square of current (I²)", "Inversely proportional to resistance", "Inversely proportional to time", "Independent of current"],
      correctOptionIndex: 0,
      explanation: "H = I²Rt. Heat produced is directly proportional to the square of current, resistance, and time."
    }
  ],

  // Chemistry - Chemical Reactions
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
      explanation: "In CuO + H₂ → Cu + H₂O, CuO loses oxygen (reduced to Cu) and H₂ gains oxygen (oxidized to H₂O). It is a classic redox reaction."
    },
    {
      id: 3,
      question: "The brown gas evolved on heating ferrous sulphate crystals in a dry boiling tube has the smell of burning sulphur. The gas is:",
      options: ["SO₂ and SO₃", "NO₂", "CO₂", "H₂S"],
      correctOptionIndex: 0,
      explanation: "2FeSO₄(s) --Δ--> Fe₂O₃(s) + SO₂(g) + SO₃(g). Ferrous sulphate decomposes into ferric oxide, sulphur dioxide, and sulphur trioxide."
    },
    {
      id: 4,
      question: "Rancidity of oily food items can be prevented by:",
      options: ["Flushing bags with Nitrogen gas", "Exposing to direct sunlight", "Keeping at high temperature", "Adding moisture"],
      correctOptionIndex: 0,
      explanation: "Nitrogen is an unreactive inert gas that displaces oxygen, preventing oxidation of fats and oils."
    },
    {
      id: 5,
      question: "In the reaction: Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃, the precipitate PbI₂ is of which color?",
      options: ["Yellow", "White", "Black", "Brown"],
      correctOptionIndex: 0,
      explanation: "Lead iodide (PbI₂) forms a bright yellow precipitate in this double displacement precipitation reaction."
    },
    {
      id: 6,
      question: "Respiration is considered an exothermic reaction because:",
      options: ["Energy is released during oxidation of glucose", "Oxygen is consumed", "Carbon dioxide is absorbed", "Water is formed"],
      correctOptionIndex: 0,
      explanation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP). Heat/energy is released, hence exothermic."
    },
    {
      id: 7,
      question: "The chemical formula of marble, limestone, and chalk is:",
      options: ["CaCO₃", "CaO", "Ca(OH)₂", "CaSO₄"],
      correctOptionIndex: 0,
      explanation: "Calcium carbonate (CaCO₃) is the common chemical compound present in limestone, chalk, and marble."
    },
    {
      id: 8,
      question: "Electrolysis of water is a decomposition reaction. The molar ratio of hydrogen to oxygen gas liberated is:",
      options: ["2 : 1", "1 : 2", "1 : 1", "4 : 1"],
      correctOptionIndex: 0,
      explanation: "2H₂O(l) → 2H₂(g) + O₂(g). 2 moles of Hydrogen gas are collected at cathode for every 1 mole of Oxygen gas at anode."
    },
    {
      id: 9,
      question: "When silver chloride (AgCl) is exposed to sunlight, it turns grey due to formation of:",
      options: ["Silver metal by photolytic decomposition", "Silver oxide", "Chlorine gas absorption", "Silver carbonate"],
      correctOptionIndex: 0,
      explanation: "2AgCl(s) --sunlight--> 2Ag(s) + Cl₂(g). White silver chloride turns grey due to decomposition into metallic silver."
    },
    {
      id: 10,
      question: "Rusting of iron is chemically formulated as:",
      options: ["Hydrated ferric oxide (Fe₂O₃·xH₂O)", "Ferrous oxide (FeO)", "Ferric carbonate", "Magnetic iron oxide (Fe₃O₄)"],
      correctOptionIndex: 0,
      explanation: "Rust is hydrated iron(III) oxide with the formula Fe₂O₃·xH₂O, formed in the presence of both oxygen and moisture."
    }
  ]
};

// Curated high-yield Subjective Questions & Detailed Model Answers
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
        keywords: ["sin i / sin r = constant", "ratio of sine of angle of incidence", "refractive index", "constant for given pair"],
        modelAnswer: "Snell's Law: The ratio of the sine of the angle of incidence (i) to the sine of the angle of refraction (r) is constant for a given pair of media and a given wavelength of light.\nFormula: sin(i) / sin(r) = constant = ₁n₂ (refractive index of medium 2 with respect to medium 1).",
        breakdown: "Definition (1 Mark) + Formula & Notation (1 Mark)"
      },
      102: {
        keywords: ["ratio of speed of light in vacuum", "c / v", "cannot be less than 1", "speed of light c is maximum"],
        modelAnswer: "Absolute refractive index (n) of a medium is defined as the ratio of speed of light in vacuum (c) to speed of light in that medium (v): n = c / v.\nNo, refractive index can never be less than 1 because no physical medium can transmit light faster than its speed in vacuum (c ≈ 3 × 10⁸ m/s). Since v ≤ c, n ≥ 1 always.",
        breakdown: "Definition & formula (1 Mark) + Justification why n >= 1 (1 Mark)"
      },
      103: {
        keywords: ["1 Dioptre", "focal length 1 metre", "P = 1/f", "-2 D", "concave lens"],
        modelAnswer: "1 Dioptre is the power of a lens whose focal length is 1 metre (1 D = 1 m⁻¹).\nGiven: f = -50 cm = -0.5 m.\nPower P = 1 / f(in m) = 1 / (-0.5) = -2.0 D (concave / diverging lens).",
        breakdown: "Definition of 1 Dioptre (1 Mark) + Numerical Calculation with correct unit & sign (1 Mark)"
      },
      104: {
        keywords: ["atmospheric refraction", "apparent position", "point source", "extended source", "fluctuation"],
        modelAnswer: "1. Stars are very distant and act as point-sized sources of light. Light entering Earth's atmosphere passes through continuously shifting layers of varying optical density, causing atmospheric refraction and fluctuations in apparent brightness (twinkling).\n2. Planets are much closer and act as extended sources (collections of numerous point sources). The average variation in light nullifies the twinkling effect.",
        breakdown: "Point source & shifting atmospheric layers (1 Mark) + Extended source cancellation for planets (1 Mark)"
      },
      105: {
        keywords: ["lateral displacement", "emergent ray parallel to incident ray", "angle i = angle e", "perpendicular distance"],
        modelAnswer: "Key points:\n1. Ray bends towards normal at air-glass interface (rarer to denser).\n2. Ray bends away from normal at glass-air interface (denser to rarer).\n3. Emergent ray is parallel to the original incident ray (angle i = angle e).\n4. The perpendicular distance between original path of incident ray and emergent ray is called Lateral Displacement (d).",
        breakdown: "Ray path & interface normals (1 Mark) + Correct labeling of lateral shift (1 Mark)"
      },
      201: {
        keywords: ["similar triangles", "sign conventions", "1/f = 1/v + 1/u", "concave mirror", "object distance u", "image distance v", "radius of curvature R"],
        modelAnswer: "To score full marks, write this answer like this:\n\n1. RAY DIAGRAM & GEOMETRY:\nDraw concave mirror with pole P, focus F, center of curvature C. Place object AB beyond C. Real, inverted image A'B' forms between C and F.\n\n2. DERIVATION:\n- Consider ΔABP and ΔA'B'P:\n  ∠APB = ∠A'PB' (Law of reflection)\n  ∠ABP = ∠A'B'P = 90°\n  Therefore ΔABP ~ ΔA'B'P (AA similarity)\n  => A'B' / AB = PB' / PB  --- (Equation 1)\n\n- Consider ΔABC and ΔA'B'C:\n  ∠ACB = ∠A'CB' (Vertically opposite)\n  ∠B = ∠B' = 90°\n  Therefore ΔABC ~ ΔA'B'C\n  => A'B' / AB = CB' / CB  --- (Equation 2)\n\n- Equating Eq 1 & 2: PB' / PB = CB' / CB = (CP - PB') / (PB - CP)\n\n3. NEW CARTESIAN SIGN CONVENTIONS:\n- Object distance: PB = -u\n- Image distance: PB' = -v\n- Radius of curvature: PC = -R = -2f\n\n- Substituting signs:\n  (-v) / (-u) = (-2f - (-v)) / (-u - (-2f))\n  v / u = (v - 2f) / (2f - u)\n  Cross multiplying: v(2f - u) = u(v - 2f)\n  2vf - uv = uv - 2uf\n  2vf + 2uf = 2uv\n  vf + uf = uv\n\n- Dividing both sides by uvf:\n  1/u + 1/v = 1/f\n\nHence derived: 1/f = 1/v + 1/u.",
        breakdown: "Ray Diagram (3 Marks) + Step-by-step Triangle Derivation (4 Marks) + Sign Conventions & Final Form (3 Marks)"
      },
      202: {
        keywords: ["total internal reflection", "denser to rarer", "angle of incidence greater than critical angle", "critical angle", "sin C = 1/n", "n = 1.5", "C = 41.8°"],
        modelAnswer: "To score full marks, write this answer like this:\n\n(a) Total Internal Reflection (TIR):\nWhen a ray of light traveling from an optically denser medium to a rarer medium strikes the boundary at an angle of incidence greater than the critical angle, the ray is completely reflected back into the denser medium.\nConditions:\n1. Light must travel from optically denser to rarer medium.\n2. Angle of incidence in denser medium must be strictly greater than the critical angle (i > C).\n\n(b) Critical Angle (C) & Relation:\nCritical angle is the angle of incidence in denser medium for which angle of refraction in rarer medium is 90°.\nBy Snell's Law: n₁ sin(C) = n₂ sin(90°)\nTaking rarer medium as air (n₂ = 1) and denser medium index as n (n₁ = n):\nn sin(C) = 1 × 1\n=> sin(C) = 1 / n\n=> n = 1 / sin(C)\n\n(c) Numerical Calculation:\nGiven: n = 1.5 = 3/2\nsin(C) = 1 / 1.5 = 2/3 ≈ 0.6667\nC = sin⁻¹(0.6667) ≈ 41.8°.\nHence, critical angle of glass is approximately 41.8°.",
        breakdown: "TIR Definition & 2 Conditions (3 Marks) + Critical Angle definition & Derivation (4 Marks) + Numerical calculation with unit (3 Marks)"
      }
    }
  }
};
