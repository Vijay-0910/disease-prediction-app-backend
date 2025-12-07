/**
 * Disease Prediction Service
 * Rule-based system for predicting diseases from symptoms
 */

const getDiseasePrediction = (symptoms) => {
  const symptomsLower = symptoms.toLowerCase();

  // Medical Report Analysis - Check for lab values
  if (/blood pressure|hba1c|cholesterol|tsh|sgot|sgpt|creatinine|blood sugar|fasting/.test(symptomsLower)) {
    const conditions = [];
    let severityLevel = "Moderate";

    // Check for Diabetes indicators
    if (/hba1c|blood sugar|fasting/.test(symptomsLower)) {
      if (/hba1c/.test(symptomsLower) && /[6-9]\./.test(symptoms)) {
        conditions.push("Type 2 Diabetes (Early Stage)");
        severityLevel = "Moderate to Serious";
      }
    }

    // Check for Hypertension
    if (/blood pressure/.test(symptomsLower) && /(138|140|150|90)/.test(symptoms)) {
      conditions.push("Hypertension (High Blood Pressure)");
    }

    // Check for Thyroid issues
    if (/tsh/.test(symptomsLower) && /[5-9]\.|10\./.test(symptoms)) {
      conditions.push("Hypothyroidism");
    }

    // Check for Liver issues
    if (/sgot|sgpt|alt|ast/.test(symptomsLower)) {
      if (/(48|50|60|62|70)/.test(symptoms)) {
        conditions.push("Fatty Liver / Elevated Liver Enzymes");
      }
    }

    // Check for High Cholesterol
    if (/cholesterol/.test(symptomsLower)) {
      if (/(210|220|230|240)/.test(symptoms)) {
        conditions.push("High Cholesterol");
      }
    }

    if (conditions.length > 0) {
      const diseaseName = conditions.join(" + ");
      return {
        disease: `Metabolic Syndrome / ${diseaseName}`,
        severity: severityLevel,
        description: `Based on your medical report, multiple metabolic conditions detected: ${conditions.join(', ')}. These conditions often occur together and increase risk of heart disease, stroke, and other complications. Requires lifestyle modifications and medical supervision.`,
        symptoms_match: "95%",
        tips: [
          { icon: "🏃", title: "Regular Exercise", detail: "At least 150 minutes of moderate aerobic activity per week. Start slow and increase gradually." },
          { icon: "⚖️", title: "Weight Management", detail: "Aim for healthy BMI through balanced diet and exercise. Even 5-10% weight loss helps significantly." },
          { icon: "🧘", title: "Stress Management", detail: "Practice yoga, meditation, or deep breathing exercises daily to reduce stress hormones." },
          { icon: "😴", title: "Quality Sleep", detail: "Get 7-8 hours of uninterrupted sleep. Poor sleep affects blood sugar and blood pressure." },
          { icon: "📊", title: "Monitor Regularly", detail: "Check blood pressure, blood sugar regularly. Keep a log and share with your doctor." },
          { icon: "💊", title: "Medication Adherence", detail: "Take prescribed medications regularly. Don't skip doses without consulting doctor." }
        ],
        diet_plan: {
          foods_to_eat: [
            { icon: "🥗", name: "Leafy Greens", benefit: "Low calorie, high fiber, controls blood sugar" },
            { icon: "🫘", name: "Legumes & Lentils", benefit: "Rich in protein and fiber, stabilizes glucose" },
            { icon: "🐟", name: "Fatty Fish", benefit: "Omega-3 reduces inflammation, lowers triglycerides" },
            { icon: "🥜", name: "Nuts & Seeds", benefit: "Healthy fats, controls cholesterol" },
            { icon: "🌾", name: "Whole Grains", benefit: "Complex carbs, better glycemic control" },
            { icon: "🥑", name: "Avocado", benefit: "Healthy monounsaturated fats" }
          ],
          foods_to_avoid: [
            { icon: "🍬", name: "Refined Sugar", reason: "Spikes blood sugar rapidly" },
            { icon: "🍞", name: "White Bread/Rice", reason: "High glycemic index foods" },
            { icon: "🍟", name: "Fried Foods", reason: "High in trans fats, increases cholesterol" },
            { icon: "🧂", name: "Excess Salt", reason: "Raises blood pressure" },
            { icon: "🥓", name: "Processed Meats", reason: "High in sodium and saturated fats" },
            { icon: "🍺", name: "Alcohol", reason: "Affects liver, blood sugar, and BP" }
          ]
        },
        when_to_see_doctor: [
          "Blood pressure consistently above 140/90 mmHg",
          "Fasting blood sugar above 126 mg/dL or HbA1c above 6.5%",
          "Chest pain, severe headaches, or vision changes",
          "Unexplained weight loss or persistent fatigue",
          "Regular follow-up appointments for monitoring and medication adjustment"
        ]
      };
    }
  }

  // Common Cold / Flu
  if (/fever|cough|cold|sore throat|runny nose/.test(symptomsLower)) {
    return {
      disease: "Common Cold / Flu",
      severity: "Mild to Moderate",
      description: "A viral infection affecting the upper respiratory system caused by rhinoviruses or influenza viruses. Common symptoms include fever, cough, runny nose, and sore throat. The condition is highly contagious and spreads through airborne droplets. Usually resolves within 7-10 days with proper rest and care.",
      symptoms_match: "92%",
      tips: [
        { icon: "🛌", title: "Rest & Sleep", detail: "Get 7-8 hours of quality sleep. Your body needs rest to fight the infection and recover faster." },
        { icon: "💧", title: "Stay Hydrated", detail: "Drink 8-10 glasses of water, warm herbal teas, and clear broths throughout the day." },
        { icon: "🧂", title: "Salt Water Gargle", detail: "Gargle with warm salt water 3-4 times daily to soothe sore throat and reduce inflammation." },
        { icon: "💨", title: "Use Humidifier", detail: "Add moisture to the air to ease breathing and reduce nasal congestion, especially at night." },
        { icon: "💊", title: "OTC Medications", detail: "Take acetaminophen or ibuprofen for fever and body aches as per recommended dosage." },
        { icon: "🚫", title: "Prevent Spread", detail: "Wash hands frequently, cover mouth when coughing, and avoid close contact with others." }
      ],
      diet_plan: {
        foods_to_eat: [
          { icon: "🍲", name: "Chicken Soup", benefit: "Rich in nutrients, reduces inflammation" },
          { icon: "🍊", name: "Citrus Fruits", benefit: "High Vitamin C boosts immunity" },
          { icon: "🫚", name: "Ginger Tea", benefit: "Anti-inflammatory, soothes throat" },
          { icon: "🧄", name: "Garlic", benefit: "Natural antimicrobial properties" },
          { icon: "🍵", name: "Herbal Teas", benefit: "Keeps you hydrated and warm" },
          { icon: "🥛", name: "Yogurt", benefit: "Probiotics support gut health" }
        ],
        foods_to_avoid: [
          { icon: "🧀", name: "Dairy Products", reason: "May increase mucus production" },
          { icon: "🍬", name: "Sugary Foods", reason: "Weakens immune response" },
          { icon: "🍟", name: "Fried Foods", reason: "Hard to digest, causes inflammation" },
          { icon: "🍺", name: "Alcohol", reason: "Dehydrates body, weakens immunity" },
          { icon: "🧊", name: "Cold Beverages", reason: "Can irritate throat further" }
        ]
      },
      when_to_see_doctor: [
        "Fever above 103°F (39.4°C) lasting more than 3 days",
        "Difficulty breathing or shortness of breath",
        "Persistent chest pain or pressure",
        "Severe or worsening symptoms after 10 days",
        "Symptoms in high-risk groups (elderly, pregnant, chronic conditions)"
      ]
    };
  }

  // Migraine / Headache
  if (/headache|migraine|head pain/.test(symptomsLower)) {
    return {
      disease: "Migraine / Tension Headache",
      severity: "Moderate",
      description: "A common neurological condition characterized by recurring headaches ranging from moderate to severe intensity. Often accompanied by nausea, sensitivity to light and sound, or visual disturbances. Can be triggered by stress, certain foods, or hormonal changes.",
      symptoms_match: "88%",
      tips: [
        { icon: "🛌", title: "Rest in Darkness", detail: "Lie down in a quiet, dark room to reduce sensory stimulation and help ease pain." },
        { icon: "❄️", title: "Cold/Warm Compress", detail: "Apply cold compress to forehead or warm compress to neck for 15-20 minutes." },
        { icon: "🧘", title: "Relaxation Techniques", detail: "Practice deep breathing, meditation, or progressive muscle relaxation." },
        { icon: "⏰", title: "Sleep Schedule", detail: "Maintain consistent sleep and wake times, even on weekends." },
        { icon: "💧", title: "Stay Hydrated", detail: "Drink plenty of water as dehydration can trigger headaches." },
        { icon: "🚫", title: "Avoid Triggers", detail: "Identify and avoid known triggers like stress, bright lights, or loud noises." }
      ],
      diet_plan: {
        foods_to_eat: [
          { icon: "💧", name: "Water", benefit: "Prevents dehydration triggers" },
          { icon: "🥬", name: "Magnesium Foods", benefit: "Spinach, almonds help prevent attacks" },
          { icon: "🐟", name: "Fatty Fish", benefit: "Omega-3 reduces inflammation" },
          { icon: "🍌", name: "Bananas", benefit: "Rich in magnesium and potassium" },
          { icon: "🌾", name: "Whole Grains", benefit: "Stable energy, prevents blood sugar drops" },
          { icon: "🫚", name: "Ginger", benefit: "Natural anti-nausea properties" }
        ],
        foods_to_avoid: [
          { icon: "🧀", name: "Aged Cheese", reason: "Contains tyramine trigger" },
          { icon: "🍫", name: "Chocolate", reason: "Can trigger migraines in some people" },
          { icon: "🍷", name: "Red Wine", reason: "Contains histamine and tannins" },
          { icon: "🥡", name: "MSG Foods", reason: "Common migraine trigger" },
          { icon: "🧂", name: "Processed Meats", reason: "High in nitrates" }
        ]
      },
      when_to_see_doctor: [
        "Sudden severe headache (thunderclap headache)",
        "Headache with fever, stiff neck, confusion, or vision problems",
        "Headache after head injury",
        "Chronic headaches that worsen over time",
        "New headache pattern after age 50"
      ]
    };
  }

  // Gastroenteritis
  if (/stomach|nausea|vomit|diarrhea|abdominal/.test(symptomsLower)) {
    return {
      disease: "Gastroenteritis / Stomach Flu",
      severity: "Mild to Moderate",
      description: "An inflammation of the digestive tract, commonly called stomach flu, caused by viral or bacterial infection. Characterized by nausea, vomiting, diarrhea, abdominal cramps, and sometimes fever. Usually self-limiting and resolves within 2-3 days with proper hydration.",
      symptoms_match: "90%",
      tips: [
        { icon: "💧", title: "Rehydrate", detail: "Drink oral rehydration solutions or clear fluids every 15-30 minutes to prevent dehydration." },
        { icon: "🍚", title: "BRAT Diet", detail: "Follow Bananas, Rice, Applesauce, Toast diet once vomiting subsides." },
        { icon: "⏸️", title: "Rest Stomach", detail: "Avoid solid foods for first few hours, gradually reintroduce light foods." },
        { icon: "🧼", title: "Hand Hygiene", detail: "Wash hands thoroughly with soap to prevent spreading infection." },
        { icon: "🛌", title: "Get Rest", detail: "Allow your body to recover with adequate rest and sleep." },
        { icon: "🚑", title: "Monitor Symptoms", detail: "Watch for signs of dehydration like dizziness, dry mouth, or dark urine." }
      ],
      diet_plan: {
        foods_to_eat: [
          { icon: "🥤", name: "Clear Broths", benefit: "Easy to digest, provides electrolytes" },
          { icon: "🍌", name: "Bananas", benefit: "Gentle on stomach, replenishes potassium" },
          { icon: "🍚", name: "White Rice", benefit: "Bland, helps firm up stools" },
          { icon: "🍞", name: "Toast", benefit: "Easy to digest carbohydrates" },
          { icon: "🥥", name: "Coconut Water", benefit: "Natural electrolyte replacement" },
          { icon: "🥛", name: "Probiotic Yogurt", benefit: "Restores gut bacteria (after acute phase)" }
        ],
        foods_to_avoid: [
          { icon: "🥛", name: "Dairy", reason: "Hard to digest during illness" },
          { icon: "🌶️", name: "Spicy Foods", reason: "Irritates stomach lining" },
          { icon: "🍟", name: "Fried Foods", reason: "High fat content hard to digest" },
          { icon: "☕", name: "Caffeine", reason: "Can worsen dehydration" },
          { icon: "🍎", name: "Raw Fruits/Veggies", reason: "High fiber may worsen symptoms" }
        ]
      },
      when_to_see_doctor: [
        "Severe dehydration (no urination for 8+ hours)",
        "Blood in vomit or stool",
        "High fever above 102°F (39°C)",
        "Symptoms lasting more than 3 days",
        "Severe abdominal pain or tenderness"
      ]
    };
  }

  // Fatigue
  if (/fatigue|tired|weakness|exhaustion/.test(symptomsLower)) {
    return {
      disease: "Chronic Fatigue / Exhaustion",
      severity: "Mild to Moderate",
      description: "Persistent tiredness and lack of energy that doesn't improve significantly with rest. Can be caused by various factors including poor sleep quality, stress, anemia, thyroid problems, depression, or other underlying health conditions. Requires proper evaluation to identify root cause.",
      symptoms_match: "85%",
      tips: [
        { icon: "⏰", title: "Sleep Schedule", detail: "Maintain consistent sleep-wake times. Aim for 7-9 hours nightly." },
        { icon: "🏃", title: "Regular Exercise", detail: "Light to moderate exercise boosts energy. Start with 20-30 minute walks." },
        { icon: "🧘", title: "Stress Management", detail: "Practice meditation, yoga, or deep breathing to reduce stress levels." },
        { icon: "☕", title: "Limit Caffeine", detail: "Avoid caffeine after 2 PM to prevent sleep disruption." },
        { icon: "💊", title: "Check Deficiencies", detail: "Get blood work to check for vitamin D, B12, iron deficiencies." },
        { icon: "👨‍⚕️", title: "Medical Evaluation", detail: "Consult doctor if fatigue persists despite lifestyle changes." }
      ],
      diet_plan: {
        foods_to_eat: [
          { icon: "🥬", name: "Iron-Rich Foods", benefit: "Spinach, lentils combat anemia" },
          { icon: "🌾", name: "Whole Grains", benefit: "Sustained energy release" },
          { icon: "🍳", name: "Protein Foods", benefit: "Eggs, chicken support energy" },
          { icon: "🥜", name: "Nuts & Seeds", benefit: "Healthy fats and minerals" },
          { icon: "🍎", name: "Fresh Produce", benefit: "Vitamins and antioxidants" },
          { icon: "💧", name: "Water", benefit: "Proper hydration essential" }
        ],
        foods_to_avoid: [
          { icon: "🍬", name: "Refined Sugar", reason: "Causes energy crashes" },
          { icon: "🍕", name: "Processed Foods", reason: "Low nutritional value" },
          { icon: "☕", name: "Excess Caffeine", reason: "Disrupts natural energy" },
          { icon: "🍺", name: "Alcohol", reason: "Impairs sleep quality" },
          { icon: "🍟", name: "Fried Foods", reason: "Causes sluggishness" }
        ]
      },
      when_to_see_doctor: [
        "Fatigue lasting more than 2 weeks without improvement",
        "Unexplained weight loss or gain",
        "Difficulty concentrating or memory problems",
        "Shortness of breath with minimal exertion",
        "Signs of depression or mood changes"
      ]
    };
  }

  // Allergies
  if (/allergy|sneeze|itchy|rash|hives/.test(symptomsLower)) {
    return {
      disease: "Allergic Reaction",
      severity: "Mild to Moderate",
      description: "An immune system response to a foreign substance (allergen) such as pollen, dust mites, pet dander, certain foods, or insect stings. Symptoms range from mild (sneezing, itching) to severe (anaphylaxis). Most allergic reactions can be managed with avoidance and medications.",
      symptoms_match: "87%",
      tips: [
        { icon: "🔍", title: "Identify Triggers", detail: "Keep a diary to track and identify specific allergen triggers." },
        { icon: "🪟", title: "Indoor Control", detail: "Keep windows closed during high pollen seasons, use air purifiers." },
        { icon: "🧹", title: "Clean Regularly", detail: "Vacuum and dust frequently to remove allergens from home." },
        { icon: "💊", title: "Antihistamines", detail: "Take over-the-counter antihistamines as directed for symptom relief." },
        { icon: "🧼", title: "Wash Frequently", detail: "Wash hands and face after outdoor activities to remove pollen." },
        { icon: "👨‍⚕️", title: "Allergy Testing", detail: "Consult allergist for testing and potential immunotherapy." }
      ],
      diet_plan: {
        foods_to_eat: [
          { icon: "🫚", name: "Turmeric/Ginger", benefit: "Natural anti-inflammatory" },
          { icon: "🍎", name: "Quercetin Foods", benefit: "Apples, onions stabilize mast cells" },
          { icon: "🐟", name: "Omega-3 Fish", benefit: "Reduces inflammatory response" },
          { icon: "🥛", name: "Probiotics", benefit: "Supports immune function" },
          { icon: "🥬", name: "Leafy Greens", benefit: "Anti-inflammatory nutrients" },
          { icon: "🍯", name: "Local Honey", benefit: "May help with pollen allergies" }
        ],
        foods_to_avoid: [
          { icon: "🥜", name: "Common Allergens", reason: "Check personal trigger foods" },
          { icon: "🥡", name: "Processed Foods", reason: "Contains additives and preservatives" },
          { icon: "🧀", name: "Histamine-Rich", reason: "Aged cheese, wine may worsen symptoms" },
          { icon: "🍭", name: "Artificial Dyes", reason: "Can trigger allergic responses" },
          { icon: "🦐", name: "Shellfish", reason: "Common severe allergen" }
        ]
      },
      when_to_see_doctor: [
        "Difficulty breathing or swallowing (call 911)",
        "Severe swelling of face, lips, or tongue",
        "Rapid pulse or dizziness",
        "Allergic reactions getting progressively worse",
        "Need for allergy testing or immunotherapy evaluation"
      ]
    };
  }

  // Default/Unspecified
  return {
    disease: "Unspecified Condition",
    severity: "Unknown",
    description: "Based on your symptoms, we recommend consulting with a healthcare professional for accurate diagnosis. Your symptoms may require medical evaluation and possibly diagnostic tests to determine the exact condition and appropriate treatment plan.",
    symptoms_match: "75%",
    tips: [
      { icon: "📝", title: "Track Symptoms", detail: "Keep a detailed diary noting symptom onset, severity, and duration." },
      { icon: "🌡️", title: "Monitor Vitals", detail: "Track temperature, pulse, and any other relevant measurements." },
      { icon: "🛌", title: "Get Rest", detail: "Ensure adequate sleep and rest to support recovery." },
      { icon: "💧", title: "Stay Hydrated", detail: "Drink plenty of fluids throughout the day." },
      { icon: "🍎", title: "Balanced Diet", detail: "Eat nutritious, well-balanced meals to support immune system." },
      { icon: "👨‍⚕️", title: "Seek Medical Care", detail: "Schedule appointment with doctor for proper evaluation." }
    ],
    diet_plan: {
      foods_to_eat: [
        { icon: "🍎", name: "Fresh Fruits", benefit: "Vitamins and antioxidants" },
        { icon: "🥗", name: "Vegetables", benefit: "Essential nutrients and fiber" },
        { icon: "🌾", name: "Whole Grains", benefit: "Complex carbohydrates for energy" },
        { icon: "🍗", name: "Lean Proteins", benefit: "Supports tissue repair" },
        { icon: "💧", name: "Water", benefit: "Maintains hydration" },
        { icon: "🥜", name: "Nuts & Seeds", benefit: "Healthy fats and minerals" }
      ],
      foods_to_avoid: [
        { icon: "🍕", name: "Processed Foods", reason: "Low nutritional value" },
        { icon: "🍬", name: "Excessive Sugar", reason: "May weaken immune response" },
        { icon: "🍟", name: "Fried Foods", reason: "Hard to digest" },
        { icon: "🍺", name: "Alcohol", reason: "Can interfere with medications" },
        { icon: "☕", name: "Excess Caffeine", reason: "May affect sleep and hydration" }
      ]
    },
    when_to_see_doctor: [
      "Symptoms persist or worsen despite self-care",
      "New or unusual symptoms develop",
      "High fever, severe pain, or breathing difficulties",
      "Symptoms significantly impact daily activities",
      "Uncertainty about diagnosis or treatment"
    ]
  };
};

export default getDiseasePrediction;
