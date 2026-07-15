// bundles-library.js
// SINGLE SOURCE OF TRUTH for all pre-built workout programs / bundles.
// Used by member-app.html (client-facing Training tab) AND coach-crm.html
// (coach's program picker when scheduling a client). Do not fork this list --
// before this file existed, member-app.html and coach-crm.html each had their
// own separate, drifting copy (member-app had Ironclad Iron Protocol + Ironclad Ironman
// Circuit that coaches never saw; coach-crm had 11 equipment-based bundles clients
// never saw). Consolidated July 14, 2026 per Ted -- add new bundles here once,
// both apps pick them up automatically.
//
// Exercise objects: {name, sets, reps, rest, note?}. The 11 equipment-based bundles
// ported over from the old coach-only list (kb_foundations through foam_roller_recovery)
// only have {name} -- sets/reps/rest were never defined for those and are left blank
// rather than invented. Rendering code should treat sets/reps/rest as optional.
const BUNDLES = [
  {
    id: "upper_lower",
    icon: "🔁",
    name: "Upper / Lower Split",
    desc: "Alternate upper and lower body sessions for balanced development",
    days: "4 days / week",
    accent: "#2563EB",
    goal: ["recomp", "build", "general"],
    routines: [
      { label: "Day A — Upper Body Push", exercises: [
        {name:"Barbell Bench Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"60s"},
        {name:"Overhead Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lateral Raises", sets:3, reps:"15", rest:"45s"},
        {name:"Tricep Pushdown", sets:3, reps:"12-15", rest:"45s"}
      ]},
      { label: "Day B — Lower Body", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6-8", rest:"2min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10", rest:"90s"},
        {name:"Leg Curl", sets:3, reps:"12", rest:"60s"},
        {name:"Calf Raises", sets:4, reps:"15-20", rest:"45s"}
      ]},
      { label: "Day C — Upper Body Pull", exercises: [
        {name:"Pull-Ups / Lat Pulldown", sets:4, reps:"8-10", rest:"90s"},
        {name:"Seated Cable Row", sets:3, reps:"10-12", rest:"60s"},
        {name:"Face Pulls", sets:3, reps:"15", rest:"45s"},
        {name:"Barbell Curl", sets:3, reps:"10-12", rest:"45s"},
        {name:"Hammer Curl", sets:2, reps:"12", rest:"45s"}
      ]},
      { label: "Day D — Lower Body + Core", exercises: [
        {name:"Deadlift", sets:4, reps:"5-6", rest:"2-3min"},
        {name:"Bulgarian Split Squat", sets:3, reps:"8 each side", rest:"90s"},
        {name:"Hip Thrust", sets:3, reps:"12", rest:"60s"},
        {name:"Plank", sets:3, reps:"45s hold", rest:"30s"},
        {name:"Cable Crunch", sets:3, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "push_pull_legs",
    icon: "🔺",
    name: "Push / Pull / Legs",
    desc: "The classic 3-day split for strength and muscle. Run it twice a week for 6 days.",
    days: "3–6 days / week",
    accent: "#E0192B",
    goal: ["build", "recomp"],
    routines: [
      { label: "Push — Chest, Shoulders, Triceps", exercises: [
        {name:"Flat Bench Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Shoulder Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Cable Fly", sets:3, reps:"12-15", rest:"60s"},
        {name:"Lateral Raise", sets:4, reps:"15", rest:"30s"},
        {name:"Tricep Dips", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Pull — Back, Biceps", exercises: [
        {name:"Deadlift", sets:3, reps:"5", rest:"3min"},
        {name:"Pull-Ups", sets:4, reps:"6-8", rest:"90s"},
        {name:"Barbell Row", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lat Pulldown", sets:3, reps:"10-12", rest:"60s"},
        {name:"Face Pulls", sets:3, reps:"15-20", rest:"30s"},
        {name:"EZ Bar Curl", sets:4, reps:"10", rest:"45s"}
      ]},
      { label: "Legs — Quads, Hamstrings, Glutes, Calves", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10-12", rest:"90s"},
        {name:"Walking Lunges", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Standing Calf Raise", sets:4, reps:"15-20", rest:"30s"}
      ]},
    ]
  },
  {
    id: "full_body",
    icon: "⚡",
    name: "Full Body",
    desc: "Hit every muscle group each session. Great for 3 days/week or beginners.",
    days: "3 days / week",
    accent: "#1E9E5A",
    goal: ["general", "cut", "recomp"],
    routines: [
      { label: "Full Body A", exercises: [
        {name:"Squat", sets:3, reps:"8-10", rest:"90s"},
        {name:"Bench Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Barbell Row", sets:3, reps:"8-10", rest:"90s"},
        {name:"Overhead Press", sets:2, reps:"10-12", rest:"60s"},
        {name:"Romanian Deadlift", sets:2, reps:"12", rest:"60s"},
        {name:"Plank", sets:3, reps:"30-60s", rest:"30s"}
      ]},
      { label: "Full Body B", exercises: [
        {name:"Deadlift", sets:3, reps:"5-6", rest:"2min"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Pull-Ups / Lat Pulldown", sets:3, reps:"8-10", rest:"90s"},
        {name:"Dumbbell Shoulder Press", sets:3, reps:"10-12", rest:"60s"},
        {name:"Leg Press", sets:3, reps:"12-15", rest:"60s"},
        {name:"Cable Crunch", sets:3, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "core_conditioning",
    icon: "🔥",
    name: "Core & Conditioning",
    desc: "Core strength, stability, and cardio conditioning. Pairs with any split.",
    days: "Add-on · 2–3x / week",
    accent: "#D97706",
    goal: ["cut", "general"],
    routines: [
      { label: "Core + Cardio Circuit", exercises: [
        {name:"Plank Hold", sets:4, reps:"45s", rest:"20s"},
        {name:"Dead Bug", sets:3, reps:"10 each side", rest:"30s"},
        {name:"Cable Crunch", sets:3, reps:"15-20", rest:"30s"},
        {name:"Russian Twist", sets:3, reps:"20 total", rest:"30s"},
        {name:"Mountain Climbers", sets:3, reps:"30s", rest:"30s"},
        {name:"Rowing Machine or Bike", sets:1, reps:"10 min steady", rest:"—"}
      ]},
      { label: "Glutes & Core", exercises: [
        {name:"Hip Thrust", sets:4, reps:"12-15", rest:"60s"},
        {name:"Glute Bridge", sets:3, reps:"15", rest:"45s"},
        {name:"Side-Lying Clam Shell", sets:3, reps:"15 each", rest:"30s"},
        {name:"Bird Dog", sets:3, reps:"10 each side", rest:"30s"},
        {name:"Reverse Crunch", sets:3, reps:"15", rest:"30s"},
        {name:"Pallof Press", sets:3, reps:"12 each side", rest:"30s"}
      ]},
    ]
  },
  {
    id: "strength_5x5",
    icon: "🏋️",
    name: "Strength Foundation 5×5",
    desc: "Compound lifts only. Progressive overload every session. The fastest way to get genuinely strong.",
    days: "3 days / week",
    accent: "#1A1D21",
    goal: ["strength", "general"],
    routines: [
      { label: "Workout A", exercises: [
        {name:"Barbell Squat", sets:5, reps:"5", rest:"3 min"},
        {name:"Barbell Bench Press", sets:5, reps:"5", rest:"3 min"},
        {name:"Barbell Row", sets:5, reps:"5", rest:"3 min"}
      ]},
      { label: "Workout B", exercises: [
        {name:"Barbell Squat", sets:5, reps:"5", rest:"3 min"},
        {name:"Overhead Press", sets:5, reps:"5", rest:"3 min"},
        {name:"Deadlift", sets:1, reps:"5", rest:"5 min"}
      ]},
    ]
  },
  {
    id: "fat_loss_circuit",
    icon: "⚡",
    name: "Fat Loss Circuit",
    desc: "Supersets with minimal rest. Keeps heart rate elevated, burns more in less time. No cardio excuses.",
    days: "3–4 days / week",
    accent: "#D97706",
    goal: ["cut", "recomp"],
    routines: [
      { label: "Circuit A — Upper + Lower Superset", exercises: [
        {name:"Dumbbell Press (superset with Row)", sets:4, reps:"12", rest:"20s between, 60s after"},
        {name:"Dumbbell Row", sets:4, reps:"12", rest:"60s after superset"},
        {name:"Goblet Squat (superset with RDL)", sets:4, reps:"12", rest:"20s between, 60s after"},
        {name:"Romanian Deadlift", sets:4, reps:"12", rest:"60s after superset"},
        {name:"Plank to Push-Up", sets:3, reps:"10", rest:"45s"}
      ]},
      { label: "Circuit B — Push + Pull Superset", exercises: [
        {name:"Incline Press (superset with Pull-Up)", sets:4, reps:"10", rest:"20s between, 60s after"},
        {name:"Pull-Up or Lat Pulldown", sets:4, reps:"10", rest:"60s after superset"},
        {name:"Shoulder Press (superset with Face Pull)", sets:3, reps:"12", rest:"20s between, 60s after"},
        {name:"Face Pull", sets:3, reps:"15", rest:"60s after superset"},
        {name:"Dip (superset with Curl)", sets:3, reps:"10", rest:"20s between, 60s after"},
        {name:"Barbell Curl", sets:3, reps:"10", rest:"60s after superset"}
      ]},
    ]
  },
  {
    id: "functional_strength",
    icon: "🔩",
    name: "Functional Strength",
    desc: "Movement patterns over muscle groups. Built for real-world strength, injury prevention, and longevity.",
    days: "3 days / week",
    accent: "#2563EB",
    goal: ["general", "strength"],
    routines: [
      { label: "Day 1 — Hinge & Push", exercises: [
        {name:"Trap Bar Deadlift or Kettlebell Swing", sets:4, reps:"8", rest:"90s"},
        {name:"Push-Up Variations (tempo)", sets:4, reps:"10-12", rest:"60s"},
        {name:"Cable Pull-Through", sets:3, reps:"15", rest:"60s"},
        {name:"Farmers Carry", sets:4, reps:"40 yards", rest:"60s"},
        {name:"Pallof Press", sets:3, reps:"12 each side", rest:"30s"}
      ]},
      { label: "Day 2 — Squat & Pull", exercises: [
        {name:"Goblet Squat or Safety Bar Squat", sets:4, reps:"10", rest:"90s"},
        {name:"Single-Arm Dumbbell Row", sets:4, reps:"10 each", rest:"60s"},
        {name:"Step-Up with Dumbbells", sets:3, reps:"10 each leg", rest:"60s"},
        {name:"Band Pull-Apart", sets:4, reps:"20", rest:"20s"},
        {name:"Dead Bug", sets:3, reps:"10 each side", rest:"30s"}
      ]},
      { label: "Day 3 — Carry & Rotate", exercises: [
        {name:"Single-Leg RDL", sets:3, reps:"8 each", rest:"60s"},
        {name:"Landmine Press", sets:3, reps:"10 each", rest:"60s"},
        {name:"Suitcase Carry", sets:4, reps:"40 yards each", rest:"60s"},
        {name:"Cable Woodchop", sets:3, reps:"12 each side", rest:"45s"},
        {name:"Plank Row", sets:3, reps:"10 each", rest:"45s"}
      ]},
    ]
  },
  {
    id: "chest_arms",
    icon: "💪",
    name: "Chest & Arms",
    desc: "Extra volume on the muscles men want most. Run alongside any base split for accelerated chest and arm development.",
    days: "2 days / week (add-on)",
    accent: "#E0192B",
    goal: ["build", "recomp"],
    routines: [
      { label: "Chest Specialization Day", exercises: [
        {name:"Flat Barbell Bench Press", sets:5, reps:"5-6", rest:"3 min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Low Cable Fly", sets:4, reps:"12-15", rest:"60s"},
        {name:"Decline Push-Up", sets:3, reps:"15-20", rest:"45s"},
        {name:"Cable Chest Press", sets:3, reps:"12", rest:"45s"}
      ]},
      { label: "Arms Specialization Day", exercises: [
        {name:"EZ Bar Preacher Curl", sets:4, reps:"10", rest:"60s"},
        {name:"Skull Crushers", sets:4, reps:"10", rest:"60s"},
        {name:"Incline Dumbbell Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Cable Tricep Pushdown", sets:3, reps:"15", rest:"45s"},
        {name:"Hammer Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"12", rest:"45s"},
        {name:"Reverse Curl", sets:2, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "bodybuilding_5day",
    icon: "🏆",
    name: "Bodybuilding Split",
    desc: "High volume, isolation work, aesthetics focus. For experienced members chasing size and definition.",
    days: "5 days / week",
    accent: "#7C3AED",
    goal: ["build", "recomp"],
    routines: [
      { label: "Day 1 — Chest", exercises: [
        {name:"Flat Barbell Bench Press", sets:4, reps:"6-8", rest:"2 min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"10-12", rest:"90s"},
        {name:"Decline Bench Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Cable Fly", sets:4, reps:"12-15", rest:"45s"},
        {name:"Push-Up Burnout", sets:2, reps:"failure", rest:"60s"}
      ]},
      { label: "Day 2 — Back", exercises: [
        {name:"Deadlift", sets:4, reps:"5-6", rest:"3 min"},
        {name:"Wide-Grip Pull-Up", sets:4, reps:"8-10", rest:"90s"},
        {name:"T-Bar Row", sets:4, reps:"10", rest:"90s"},
        {name:"Seated Cable Row", sets:3, reps:"12", rest:"60s"},
        {name:"Straight-Arm Pulldown", sets:3, reps:"15", rest:"45s"},
        {name:"Face Pull", sets:3, reps:"20", rest:"30s"}
      ]},
      { label: "Day 3 — Shoulders", exercises: [
        {name:"Overhead Press (Barbell)", sets:4, reps:"6-8", rest:"2 min"},
        {name:"Dumbbell Lateral Raise", sets:5, reps:"15", rest:"30s"},
        {name:"Arnold Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Rear Delt Fly", sets:4, reps:"15", rest:"30s"},
        {name:"Cable Lateral Raise", sets:3, reps:"15 each", rest:"30s"},
        {name:"Shrugs", sets:3, reps:"12-15", rest:"45s"}
      ]},
      { label: "Day 4 — Arms", exercises: [
        {name:"EZ Bar Curl", sets:4, reps:"10-12", rest:"60s"},
        {name:"Close-Grip Bench Press", sets:4, reps:"10-12", rest:"60s"},
        {name:"Incline Dumbbell Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Skull Crushers", sets:3, reps:"10-12", rest:"60s"},
        {name:"Concentration Curl", sets:3, reps:"12", rest:"30s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"12", rest:"45s"},
        {name:"Reverse Curl", sets:2, reps:"15", rest:"30s"}
      ]},
      { label: "Day 5 — Legs", exercises: [
        {name:"Barbell Squat", sets:4, reps:"8-10", rest:"2-3 min"},
        {name:"Leg Press", sets:4, reps:"12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10-12", rest:"90s"},
        {name:"Leg Curl", sets:4, reps:"12", rest:"60s"},
        {name:"Leg Extension", sets:4, reps:"12-15", rest:"45s"},
        {name:"Standing Calf Raise", sets:5, reps:"15-20", rest:"30s"}
      ]},
    ]
  },
  {
    id: "beginner_foundation",
    icon: "🌱",
    name: "Beginner Foundation",
    desc: "Your first 6 weeks. Form before intensity. 3 days, never back-to-back. Build the base everything else stands on.",
    days: "3 days / week · Mon, Wed, Fri",
    accent: "#1E9E5A",
    goal: ["beginner", "general"],
    routines: [
      { label: "Week 1–2: Movement Patterns", exercises: [
        {name:"Goblet Squat", sets:3, reps:"10", rest:"90s", note:"Feet shoulder-width. Chest up. Sit between your heels."},
        {name:"Dumbbell Bench Press", sets:3, reps:"10", rest:"90s", note:"Start light. Full range of motion. Control the descent."},
        {name:"Seated Cable Row", sets:3, reps:"10", rest:"90s", note:"Pull to your belly button. Squeeze shoulder blades together."},
        {name:"Dumbbell Shoulder Press", sets:3, reps:"10", rest:"60s", note:"Don't lock out at the top. Stay controlled."},
        {name:"Plank", sets:3, reps:"20-30s hold", rest:"45s", note:"Straight line head to heels. Don't let hips sag."}
      ]},
      { label: "Week 3–4: Adding Load", exercises: [
        {name:"Barbell Squat (light)", sets:3, reps:"8", rest:"2 min", note:"Add the bar when goblet squat feels solid."},
        {name:"Barbell Bench Press (light)", sets:3, reps:"8", rest:"2 min", note:"Have a spotter or use a rack with safety bars."},
        {name:"Lat Pulldown", sets:3, reps:"10", rest:"90s", note:"Pull to chin. Lead with elbows, not hands."},
        {name:"Dumbbell Row", sets:3, reps:"10 each", rest:"60s", note:"One hand on bench. Full stretch at bottom."},
        {name:"Romanian Deadlift (dumbbell)", sets:3, reps:"10", rest:"90s", note:"Hip hinge. Push hips back. Feel the hamstrings stretch."},
        {name:"Plank + Side Plank", sets:3, reps:"30s each", rest:"30s"}
      ]},
      { label: "Week 5–6: Progressive Overload", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6", rest:"2-3 min", note:"Add 5 lb each session if form is clean."},
        {name:"Barbell Bench Press", sets:4, reps:"6", rest:"2-3 min", note:"Add 5 lb each session."},
        {name:"Deadlift (intro)", sets:3, reps:"5", rest:"3 min", note:"This is the king of exercises. Take your time learning it."},
        {name:"Barbell Row", sets:3, reps:"8", rest:"90s"},
        {name:"Overhead Press", sets:3, reps:"8", rest:"90s"},
        {name:"Ab Wheel or Cable Crunch", sets:3, reps:"10", rest:"30s"}
      ]},
    ]
  },
  {
    id: "athletic_performance",
    icon: "🚀",
    name: "Athletic Performance",
    desc: "Power, speed, and explosive strength. For competitive men who want to feel athletic, not just look it.",
    days: "3–4 days / week",
    accent: "#0891B2",
    goal: ["strength", "general"],
    routines: [
      { label: "Power Day A", exercises: [
        {name:"Box Jump", sets:5, reps:"3", rest:"2 min", note:"Full reset between reps. Land soft."},
        {name:"Power Clean or Hang Clean", sets:5, reps:"3", rest:"2-3 min"},
        {name:"Barbell Squat (explosive)", sets:4, reps:"4", rest:"2 min", note:"Drive up as fast as possible. Control descent."},
        {name:"Broad Jump", sets:4, reps:"3", rest:"90s"},
        {name:"Med Ball Slam", sets:4, reps:"8", rest:"60s"}
      ]},
      { label: "Power Day B", exercises: [
        {name:"Trap Bar Jump Deadlift", sets:5, reps:"3", rest:"2 min"},
        {name:"Push Press (barbell)", sets:5, reps:"3", rest:"2 min"},
        {name:"Single-Leg Bound", sets:4, reps:"5 each", rest:"90s"},
        {name:"Battle Ropes", sets:5, reps:"20s on, 40s off", rest:"40s"},
        {name:"Sprint (treadmill or turf)", sets:6, reps:"10 sec all-out", rest:"50s"}
      ]},
    ]
  },
  {
    id: "mobility_recovery",
    icon: "🧘",
    name: "Mobility & Recovery",
    desc: "The work that protects the work. Do this on rest days or before any session. 20–30 minutes.",
    days: "Rest days · or pre-session",
    accent: "#059669",
    goal: ["recovery", "general"],
    routines: [
      { label: "Full Body Mobility Flow", exercises: [
        {name:"Foam Roll — T-Spine", sets:1, reps:"60s", rest:"—", note:"Find tight spots, pause and breathe into them."},
        {name:"Foam Roll — Lats", sets:1, reps:"45s each", rest:"—"},
        {name:"90/90 Hip Stretch", sets:2, reps:"60s each side", rest:"—", note:"Sit tall. Switch sides slowly."},
        {name:"World's Greatest Stretch", sets:3, reps:"5 each side", rest:"—"},
        {name:"Cat-Cow", sets:2, reps:"10 slow", rest:"—", note:"Breathe through each rep. Full range."},
        {name:"Thoracic Rotation (half-kneeling)", sets:2, reps:"10 each side", rest:"—"},
        {name:"Hip Flexor Stretch", sets:2, reps:"60s each", rest:"—", note:"Squeeze the glute of the back leg. Feel the stretch change."},
        {name:"Shoulder CARs (Controlled Articular Rotations)", sets:2, reps:"5 each direction", rest:"—"},
        {name:"Hamstring Floss (banded or towel)", sets:2, reps:"10 each", rest:"—"}
      ]},
      { label: "Pre-Session Activation", exercises: [
        {name:"Band Pull-Apart", sets:3, reps:"20", rest:"—"},
        {name:"Hip Circle", sets:2, reps:"10 each direction", rest:"—"},
        {name:"Glute Bridge Activation", sets:2, reps:"15", rest:"—"},
        {name:"Inchworm", sets:2, reps:"8", rest:"—"},
        {name:"Leg Swing (front-back + lateral)", sets:2, reps:"10 each direction", rest:"—"},
        {name:"Light Goblet Squat (warm-up weight)", sets:2, reps:"10", rest:"—"}
      ]},
    ]
  },
  {
    id: "retro_iron_protocol",
    icon: "🦾",
    name: "Ironclad Iron Protocol",
    desc: "Elite 5-day mass and strength split for advanced lifters chasing maximum growth. Every muscle group trained twice a week. Not for beginners — every set pushes close to failure.",
    days: "5 days / week",
    accent: "#111827",
    goal: ["build", "strength"],
    routines: [
      { label: "Phase 1 (Weeks 1-6) — Day 1: Push", exercises: [
        {name:"Barbell Bench Press", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Standing Overhead Press", sets:3, reps:"6-8", rest:"2min"},
        {name:"Cable Lateral Raise", sets:4, reps:"12-15", rest:"60s"},
        {name:"Weighted Dips", sets:3, reps:"8-12", rest:"90s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 2: Pull", exercises: [
        {name:"Deadlift", sets:4, reps:"5", rest:"3min"},
        {name:"Weighted Pull-Ups", sets:4, reps:"6-8", rest:"2min"},
        {name:"Barbell Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Face Pull", sets:3, reps:"15", rest:"60s"},
        {name:"Barbell Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Hammer Curl", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 3: Legs", exercises: [
        {name:"Barbell Back Squat", sets:4, reps:"6-8", rest:"3min"},
        {name:"Romanian Deadlift", sets:4, reps:"8-10", rest:"2min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Leg Curl", sets:3, reps:"10-12", rest:"60s"},
        {name:"Walking Lunge", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Standing Calf Raise", sets:4, reps:"12-15", rest:"45s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 4: Upper", exercises: [
        {name:"Incline Barbell Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Chest-Supported Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Seated Dumbbell Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lat Pulldown (wide grip)", sets:3, reps:"10-12", rest:"60s"},
        {name:"Cable Fly", sets:3, reps:"12-15", rest:"45s"},
        {name:"Close-Grip Bench Press", sets:3, reps:"8-10", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 5: Lower", exercises: [
        {name:"Front Squat", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Hip Thrust", sets:4, reps:"8-10", rest:"90s"},
        {name:"Bulgarian Split Squat", sets:3, reps:"10 each leg", rest:"60s"},
        {name:"Seated Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Leg Extension", sets:3, reps:"12-15", rest:"45s"},
        {name:"Seated Calf Raise", sets:4, reps:"15-20", rest:"45s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 1: Push", exercises: [
        {name:"Incline Barbell Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Flat Dumbbell Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Push Press", sets:3, reps:"5-6", rest:"2min", note:"More explosive/power-focused than the strict overhead press from Phase 1 — same muscles, different stimulus."},
        {name:"Egyptian Lateral Raise", sets:3, reps:"12-15", rest:"60s"},
        {name:"Weighted Dips", sets:3, reps:"8-10", rest:"90s"},
        {name:"Skull Crusher", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 2: Pull", exercises: [
        {name:"Rack Pull", sets:4, reps:"5", rest:"3min", note:"Partial-range pull from just below the knee — heavier loads, less lower-back demand than a full deadlift."},
        {name:"Chest-Supported T-Bar Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Single-Arm Dumbbell Row", sets:3, reps:"10-12 each arm", rest:"60s"},
        {name:"Rear Delt Fly", sets:3, reps:"15", rest:"60s"},
        {name:"Preacher Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Cable Curl", sets:3, reps:"12-15", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 3: Legs", exercises: [
        {name:"Front Squat", sets:4, reps:"6-8", rest:"3min"},
        {name:"Stiff-Leg Deadlift", sets:4, reps:"8-10", rest:"2min"},
        {name:"Hack Squat", sets:3, reps:"10-12", rest:"90s"},
        {name:"Lying Leg Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Reverse Lunge", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Standing Calf Raise (paused)", sets:4, reps:"12-15", rest:"45s", note:"2-second pause at full stretch — same movement as Phase 1, different tempo for a fresh stimulus."}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 4: Upper", exercises: [
        {name:"Flat Barbell Bench Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Pendlay Row", sets:4, reps:"6-8", rest:"2min"},
        {name:"Arnold Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Straight-Arm Pulldown", sets:3, reps:"12-15", rest:"60s"},
        {name:"Pec Deck Fly", sets:3, reps:"12-15", rest:"45s"},
        {name:"EZ-Bar Skull Crusher", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 5: Lower", exercises: [
        {name:"Back Squat (paused)", sets:4, reps:"6-8", rest:"3min", note:"2-second pause in the hole — same lift pattern as Phase 1 Front Squat day, different variation for a fresh stimulus."},
        {name:"Good Morning", sets:4, reps:"8-10", rest:"2min"},
        {name:"Walking Lunge (weighted)", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Lying Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Single-Leg Extension", sets:3, reps:"12-15 each leg", rest:"45s"},
        {name:"Seated Calf Raise", sets:4, reps:"15-20", rest:"45s"}
      ]},
    ]
  },
  {
    id: "retro_ironman_circuit",
    icon: "🔥",
    name: "Ironclad Ironman Circuit",
    desc: "One hour, all-out full-body conditioning. Tire flips, kettlebells, battle ropes, box jumps, sprints — built for the PTC turf room. Hardcore by design, not for the faint of heart.",
    days: "60 min · as often as you can handle it",
    accent: "#DC2626",
    goal: ["cut", "build", "general"],
    routines: [
      { label: "Block 1 — The Gauntlet (2 rounds, 40s work / 20s rest per station)", exercises: [
        {name:"Tire Flips", sets:2, reps:"40s work", rest:"20s"},
        {name:"Battle Ropes (alternating waves)", sets:2, reps:"40s work", rest:"20s"},
        {name:"Box Jumps", sets:2, reps:"40s work", rest:"20s"},
        {name:"Kettlebell Swings", sets:2, reps:"40s work", rest:"20s"},
        {name:"Sled Push / Pull", sets:2, reps:"40s work", rest:"20s"},
        {name:"Bear Crawl (turf length, down and back)", sets:2, reps:"40s work", rest:"20s"},
        {name:"Turf Sprints", sets:2, reps:"40s work", rest:"20s"},
        {name:"Burpees", sets:2, reps:"40s work", rest:"20s"},
        {name:"Med Ball Slams", sets:2, reps:"40s work", rest:"20s", note:"End of Block 1 — rest 2 min before Block 2."}
      ]},
      { label: "Block 2 — The Grind (15-minute AMRAP, track total rounds completed)", exercises: [
        {name:"Tire Flips", sets:1, reps:"10 reps", rest:"—"},
        {name:"Kettlebell Swings", sets:1, reps:"20 reps", rest:"—"},
        {name:"Box Jumps", sets:1, reps:"15 reps", rest:"—"},
        {name:"Battle Rope Slams", sets:1, reps:"30s", rest:"—"},
        {name:"Burpees", sets:1, reps:"10 reps", rest:"—", note:"Cycle through this full circuit as many times as possible in 15 minutes straight. Write down your round count — beat it next time."}
      ]},
      { label: "Block 3 — Finisher (3 rounds, no rest between exercises, 1 min rest between rounds)", exercises: [
        {name:"Wall Balls (or Med Ball Slams)", sets:3, reps:"20 reps", rest:"—"},
        {name:"Turf Sprint", sets:3, reps:"200m", rest:"—"},
        {name:"Kettlebell Swings", sets:3, reps:"15 reps", rest:"60s", note:"Rest a full minute after each complete round, not between exercises within a round."}
      ]},
    ]
  },
  {
    id: "kb_foundations",
    icon: "🏋️",
    name: "Kettlebell Foundations",
    desc: "Kettlebell fundamentals — swings, presses, and single-arm work to build a base with the bell.",
    days: "2 sessions",
    accent: "#7C3AED",
    goal: ["general"],
    routines: [
      { label: "Session 1 — Fundamentals", exercises: [
        {name:"Kettlebell Goblet Squat"},
        {name:"Kettlebell Swing"},
        {name:"Kettlebell Single Arm Press"},
        {name:"Kettlebell Romanian Deadlift"},
        {name:"Kettlebell Bent Over Row"}
      ]},
      { label: "Session 2 — Building Load", exercises: [
        {name:"Kettlebell Reverse Lunge"},
        {name:"Kettlebell Clean"},
        {name:"Kettlebell Halo"},
        {name:"Kettlebell Single Leg Deadlift"},
        {name:"Kettlebell Racked Carry"}
      ]},
    ]
  },
  {
    id: "kb_complex",
    icon: "🔥",
    name: "Kettlebell Complex Conditioning",
    desc: "Kettlebell complexes for conditioning — chained movements, minimal rest.",
    days: "2 sessions",
    accent: "#7C3AED",
    goal: ["general"],
    routines: [
      { label: "Complex A", exercises: [
        {name:"Kettlebell Clean and Press"},
        {name:"Kettlebell Snatch"},
        {name:"Kettlebell Single Arm Swing"},
        {name:"Kettlebell Turkish Get Up"},
        {name:"Kettlebell Overhead Carry"}
      ]},
      { label: "Complex B", exercises: [
        {name:"Kettlebell Bulgarian Split Squat"},
        {name:"Kettlebell Gorilla Row"},
        {name:"Kettlebell Figure 8"},
        {name:"Kettlebell Arm Bar"}
      ]},
    ]
  },
  {
    id: "trx_full_body",
    icon: "🪢",
    name: "TRX / Suspension Full Body",
    desc: "Suspension trainer push/pull split using bodyweight and TRX straps.",
    days: "2 sessions",
    accent: "#0891B2",
    goal: ["general"],
    routines: [
      { label: "Day A — Push & Core", exercises: [
        {name:"Suspension Chest Press"},
        {name:"Suspension Pike"},
        {name:"Suspension Tricep Extension"},
        {name:"Suspension Plank"},
        {name:"Suspension Mountain Climber"}
      ]},
      { label: "Day B — Pull & Legs", exercises: [
        {name:"Suspension Row"},
        {name:"Suspension Low Row"},
        {name:"Suspension Hamstring Curl"},
        {name:"Suspension Split Squat"},
        {name:"Suspension Reverse Lunge"},
        {name:"Suspension Bicep Curl"}
      ]},
    ]
  },
  {
    id: "landmine_strength",
    icon: "🔩",
    name: "Landmine Strength Circuit",
    desc: "Landmine-based pressing, squatting, and rotational strength work.",
    days: "2 sessions",
    accent: "#B45309",
    goal: ["general"],
    routines: [
      { label: "Day 1 — Press & Squat", exercises: [
        {name:"Landmine Single Arm Press"},
        {name:"Landmine Squat"},
        {name:"Landmine Front Squat"},
        {name:"Landmine Rotation"}
      ]},
      { label: "Day 2 — Hinge & Row", exercises: [
        {name:"Landmine Deadlift"},
        {name:"Landmine RDL"},
        {name:"Landmine Row"},
        {name:"Landmine Split Squat"},
        {name:"Landmine Good Morning"}
      ]},
    ]
  },
  {
    id: "sandbag_conditioning",
    icon: "🏖️",
    name: "Sandbag Conditioning",
    desc: "Full-body sandbag conditioning session.",
    days: "1 session",
    accent: "#B45309",
    goal: ["general"],
    routines: [
      { label: "Full Body Sandbag Session", exercises: [
        {name:"Sandbag Deadlift"},
        {name:"Sandbag Clean"},
        {name:"Sandbag Front Squat"},
        {name:"Sandbag Overhead Press"},
        {name:"Sandbag Bent Over Row"},
        {name:"Sandbag Carry"}
      ]},
    ]
  },
  {
    id: "medball_power",
    icon: "💥",
    name: "Medicine Ball Power",
    desc: "Medicine ball power finisher — slams, throws, and rotational power.",
    days: "1 session",
    accent: "#DC2626",
    goal: ["general"],
    routines: [
      { label: "Power Finisher", exercises: [
        {name:"Medicine Ball Slam"},
        {name:"Medicine Ball Rotational Throw"},
        {name:"Medicine Ball Overhead Slam"},
        {name:"Medicine Ball Chest Pass"},
        {name:"Medicine Ball Squat to Press"}
      ]},
    ]
  },
  {
    id: "superband_total",
    icon: "🏹",
    name: "SuperBand Total Body",
    desc: "Band-only total body session — travel or home friendly.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Home / Travel Session", exercises: [
        {name:"SuperBand Deadlift"},
        {name:"SuperBand Row"},
        {name:"SuperBand Chest Fly"},
        {name:"SuperBand Squat"},
        {name:"SuperBand Pallof Press"},
        {name:"SuperBand Face Pull"}
      ]},
    ]
  },
  {
    id: "stability_ball_core",
    icon: "⚪",
    name: "Stability Ball Core",
    desc: "Stability ball core circuit.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Core Circuit", exercises: [
        {name:"Stability Ball Pike"},
        {name:"Stability Ball Rollout"},
        {name:"Stability Ball Dead Bug"},
        {name:"Stability Ball Plank"},
        {name:"Stability Ball Hamstring Curl"}
      ]},
    ]
  },
  {
    id: "pilates_mat",
    icon: "🧘",
    name: "Pilates Mat Fundamentals",
    desc: "Mat Pilates — beginner and intermediate flows.",
    days: "2 flows",
    accent: "#DB2777",
    goal: ["general"],
    routines: [
      { label: "Beginner Mat Flow", exercises: [
        {name:"Pilates The Hundred"},
        {name:"Pilates Roll-Up"},
        {name:"Pilates Single Leg Circle"},
        {name:"Pilates Double Leg Stretch"},
        {name:"Pilates Spine Stretch Forward"}
      ]},
      { label: "Intermediate Mat Flow", exercises: [
        {name:"Pilates Teaser"},
        {name:"Pilates Side Kick Series"},
        {name:"Pilates Swan"},
        {name:"Pilates Saw"},
        {name:"Pilates Shoulder Bridge"}
      ]},
    ]
  },
  {
    id: "yoga_mobility",
    icon: "🧘‍♀️",
    name: "Yoga Mobility Flow",
    desc: "Yoga-based mobility flow — morning and recovery sequences.",
    days: "2 flows",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Morning Flow", exercises: [
        {name:"Yoga Sun Salutation A"},
        {name:"Yoga Downward-Facing Dog"},
        {name:"Yoga Warrior I"},
        {name:"Yoga Warrior II"},
        {name:"Yoga Chair Pose"},
        {name:"Yoga Tree Pose"}
      ]},
      { label: "Recovery Flow", exercises: [
        {name:"Yoga Cat-Cow Stretch"},
        {name:"Yoga Pigeon Pose"},
        {name:"Yoga Cobra Pose"},
        {name:"Yoga Child's Pose"},
        {name:"Yoga Triangle Pose"},
        {name:"Yoga Bridge Pose"}
      ]},
    ]
  },
  {
    id: "foam_roller_recovery",
    icon: "🧊",
    name: "Foam Roller / Lacrosse Ball Recovery",
    desc: "Foam roller and lacrosse ball recovery session.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Full Body Recovery", exercises: [
        {name:"Foam Roller Quad Smash"},
        {name:"Foam Roller Hamstring"},
        {name:"Foam Roller Lat"},
        {name:"Foam Roller Glute"},
        {name:"Foam Roller Calf"},
        {name:"Foam Roller Upper Back"},
        {name:"Lacrosse Ball Glute Release"},
        {name:"Lacrosse Ball Hip Flexor Release"}
      ]},
    ]
  }
];

// Node/CommonJS export guard (no-op in the browser) so this file can also be
// validated with `node --check` and imported by build/test scripts if needed.
if (typeof module !== 'undefined' && module.exports) { module.exports = { BUNDLES }; }
