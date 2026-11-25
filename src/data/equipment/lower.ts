import type { Equipment } from "../types";

export const lower: Equipment[] = [
  {
    id: "leg-press",
    name: "Leg Press",
    aliases: ["seated leg press", "foot press"],
    category: "lower",
    prevalence: "common",
    footprint: "1.5 × 1.0 m",
    difficulty: 2,
    summary:
      "Seated push with both legs. The highest-load station in most parks, and the easiest to do with a rounded back.",
    description:
      "You sit with your back against a pad and push a footplate away with both feet. Because both legs work together, it feels easy relative to a squat — which is exactly why people take it too far, lift the hips off the seat and round the low back at the bottom.",
    muscles: {
      primary: ["quadriceps", "glutes"],
      secondary: ["hamstrings", "calves", "adductors"],
    },
    joints: ["knee", "hip", "ankle", "lumbar spine"],
    howTo: [
      "Set the seat so the knees are bent to about 90° at the start, not folded tighter.",
      "Place both feet flat on the plate, hip-width apart.",
      "Press the plate away until the knees are almost straight.",
      "Return slowly until you feel the knees at 90° again — stop before the pelvis tucks.",
      "Keep the whole back and pelvis in contact with the pad throughout.",
    ],
    setup: [
      "Seat distance: knees at roughly 90° at the start position.",
      "Foot position: mid-plate, hip-width, whole foot in contact.",
    ],
    mistakes: [
      {
        wrong: "Going so deep that the hips lift off the seat and the low back rounds.",
        fix: "Stop the range where the pelvis stays put. That is your real depth, not the machine's.",
      },
      {
        wrong: "Locking the knees straight at the top.",
        fix: "Stop just short; the joint and the machine both prefer it.",
      },
      {
        wrong: "Pushing through the toes with the heels lifted.",
        fix: "Whole foot, heel down. Toes-only loading is how knees start to hurt.",
      },
      {
        wrong: "Letting the knees fall inward on the push.",
        fix: "Track the knees over the middle toes.",
      },
    ],
    benefits: [
      {
        claim: "Loads the legs more than any other park station.",
        tier: 1,
        note: "Bilateral pressing with bodyweight plus leverage gives the highest force output in the park.",
      },
      {
        claim: "A safe way to train legs with knee or hip pain.",
        tier: 2,
        note: "Often tolerated when the range is limited and the load is controlled — with clearance.",
      },
      {
        claim: "Burns fat from the thighs.",
        tier: 3,
        note: "No. Spot reduction is not a thing, on any machine.",
      },
    ],
    easier: "Single-leg presses with a short range.",
    harder: "Three sets of 12 with a four-second return, or single-leg presses at full range.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required; set the range short",
      },
    },
    overuse: {
      acute: ["Low-back strain from a rounded bottom position", "Knee pain from a deep, fast range"],
      chronic: [
        "Patellofemoral pain with repeated deep pressing",
        "Lumbar irritation from hip tuck under load",
      ],
      warning: [
        "Low-back pain at the bottom of the movement",
        "Knee pain under the kneecap on the push",
      ],
      avoidIf: ["Acute low-back pain", "Recent knee or hip surgery without clearance"],
    },
    safety: {
      before: [
        "Check the seat and backrest are locked.",
        "Check the footplate does not wobble.",
        "Check the return mechanism does not slam.",
      ],
      during: ["Keep the pelvis down.", "Breathe out on the push."],
      stopIf: ["Low-back pain", "The footplate shifts under load"],
    },
    maintenance: ["Seat locking pin", "Footplate bolts", "Backrest padding", "Return springs"],
    signboard: [
      {
        claim: "Reduces thigh fat",
        verdict: "unsupported",
        note: "Repeated on rider, leg press and twister boards alike. Fat loss is systemic.",
      },
      {
        claim: "Strengthens knees and hips",
        verdict: "supported",
        note: "It loads the quadriceps and glutes directly — the main reason to use it.",
      },
      {
        claim: "Replaces squats",
        verdict: "partly",
        note: "It loads the legs, but the fixed path removes balance and trunk demand. It is a supplement, not a swap.",
      },
    ],
    sources: ["acsm", "en16630", "bjsm-knee"],
    confidence: "high",
  },

  {
    id: "leg-extension",
    name: "Leg Extension",
    aliases: ["knee extension station", "quad bench"],
    category: "lower",
    prevalence: "common",
    footprint: "1.3 × 0.9 m",
    difficulty: 2,
    summary:
      "Seated knee extension against a shin pad. Isolates the quadriceps and concentrates load on the kneecap.",
    description:
      "You sit with a pad across the shins and straighten the knees. It is the most knee-specific station in the park: good for rebuilding quadriceps after injury, and the station most likely to provoke patellofemoral pain if the range or speed is wrong. Lining the knee up with the machine's pivot is the whole setup.",
    muscles: {
      primary: ["quadriceps"],
      secondary: ["hip flexors (as stabilisers)"],
    },
    joints: ["knee"],
    howTo: [
      "Sit so the knee joint lines up with the machine's pivot point.",
      "Set the shin pad just above the ankles.",
      "Straighten the knees slowly until the legs are almost straight — no snap.",
      "Lower over three seconds until the knees are at about 90°.",
      "Keep the thighs flat on the seat; do not let them lift.",
    ],
    setup: [
      "Pivot alignment: the machine's axis should sit level with the knee joint.",
      "Shin pad: two finger-widths above the ankle bone.",
      "Seat depth: knees hanging just past the seat edge.",
    ],
    mistakes: [
      {
        wrong: "Kicking up fast and letting the pad drop.",
        fix: "Slow both ways. This station is notorious for knee pain caused by speed, not load.",
      },
      {
        wrong: "Snapping into full extension.",
        fix: "Stop a few degrees short; the last degrees concentrate force on the kneecap.",
      },
      {
        wrong: "Seat too far back, knee pivot misaligned.",
        fix: "Move the seat forward. Misalignment turns a knee exercise into a knee irritation.",
      },
      {
        wrong: "Lifting the thighs off the seat to gain range.",
        fix: "Keep the thighs pinned; the movement is at the knee only.",
      },
    ],
    benefits: [
      {
        claim: "Directly strengthens the quadriceps, which supports the kneecap.",
        tier: 1,
        note: "Quadriceps strengthening is first-line for patellofemoral pain — with load managed, not maximal.",
      },
      {
        claim: "Useful after knee injury or surgery.",
        tier: 2,
        note: "Commonly used in rehabilitation, but the range and load should come from a physiotherapist.",
      },
      {
        claim: "Melts knee fat.",
        tier: 3,
        note: "No.",
      },
    ],
    easier: "Single-leg extensions through a 45° arc only.",
    harder: "Three sets of 12 with a four-second lower, or single-leg at full range.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 10–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 6–8 reps",
        supervision: "required; short range only",
      },
    },
    overuse: {
      acute: ["Kneecap pain from fast extensions", "Tendon irritation at the front of the knee"],
      chronic: [
        "Patellofemoral pain with daily use",
        "Quadriceps tendon irritation from snapping into lockout",
      ],
      warning: [
        "Pain under or around the kneecap during the set",
        "A grinding sensation that is new",
      ],
      avoidIf: [
        "Acute patellofemoral pain",
        "Recent knee surgery without a prescribed range",
      ],
    },
    safety: {
      before: [
        "Check the pivot alignment before you sit.",
        "Check the shin pad and its locking pin.",
        "Check the seat does not slide back under load.",
      ],
      during: ["Move slowly in both directions.", "Keep the thighs on the seat."],
      stopIf: ["Kneecap pain", "The pad slips down the shin"],
    },
    maintenance: ["Pivot bolt and bushings", "Shin pad clamp", "Seat track", "Weight-arm stops"],
    signboard: [
      {
        claim: "Removes knee fat",
        verdict: "unsupported",
        note: "The most common false claim on leg stations in Indian parks.",
      },
      {
        claim: "Good for knee pain",
        verdict: "partly",
        note: "Strengthening the quadriceps helps many people with kneecap pain — but only at a load and range they tolerate.",
      },
      {
        claim: "Tones the thighs",
        verdict: "partly",
        note: "It builds the quadriceps, which changes thigh shape over months. Not in a few sessions.",
      },
    ],
    sources: ["bjsm-knee", "acsm", "en16630"],
    confidence: "high",
  },

  {
    id: "hip-adductor",
    name: "Hip Adductor / Abductor",
    aliases: ["inner thigh machine", "outer thigh machine", "hip opener"],
    category: "lower",
    prevalence: "occasional",
    footprint: "1.2 × 0.9 m",
    difficulty: 2,
    summary:
      "Seated squeeze or spread against thigh pads. Small range, real groin load.",
    description:
      "You sit with pads against the inside or outside of the thighs and squeeze in or push out. The range is short and the muscles are small, so it is easy to overdo — groin strains from this station are common among people who use it every day at full effort. Slow, partial range is the sensible default.",
    muscles: {
      primary: ["adductors (inner thigh) or abductors (outer hip)"],
      secondary: ["glutes", "hip flexors"],
    },
    joints: ["hip"],
    howTo: [
      "Sit tall with the back against the pad and feet on the footrests.",
      "Set the start position at a comfortable stretch, not a maximal one.",
      "Squeeze the thighs together (or push apart) over two seconds.",
      "Hold for one second at the end of the range.",
      "Return slowly to the start position; do not let the pads fly open.",
    ],
    setup: [
      "Start angle: a mild stretch — you should be able to breathe normally.",
      "Back pad: sit fully against it; do not perch forward.",
    ],
    mistakes: [
      {
        wrong: "Starting from the widest possible position.",
        fix: "Narrow the start angle. End-range groin loading is where strains happen.",
      },
      {
        wrong: "Letting the pads snap back open.",
        fix: "Control the return over three seconds.",
      },
      {
        wrong: "Leaning forward to squeeze harder.",
        fix: "Stay back against the pad; the hips do the work.",
      },
      {
        wrong: "Using it every day because it feels easy.",
        fix: "Twice a week is plenty. Small muscles recover slower than they feel.",
      },
    ],
    benefits: [
      {
        claim: "Strengthens the adductors, which are protective for the groin in change-of-direction sport.",
        tier: 1,
        note: "Adductor strengthening is an established groin-injury prevention measure in sport.",
      },
      {
        claim: "Improves hip range of motion.",
        tier: 2,
        note: "A loaded stretch can improve tolerance at end-range; it is not a substitute for dynamic mobility work.",
      },
      {
        claim: "Shrinks the inner thighs.",
        tier: 3,
        note: "No. Strengthening a muscle does not remove fat over it.",
      },
    ],
    easier: "Single-leg or partial-range squeezes with a two-second hold.",
    harder: "Three sets of 12 with a three-second squeeze at the end range.",
    minutes: {
      adult: {
        perStation: "2 sets × 10–12 reps",
        sets: "2",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 set × 6–8 reps",
        supervision: "required; narrow range",
      },
    },
    overuse: {
      acute: ["Groin strain from end-range squeezing", "Hip-flexor irritation from leaning forward"],
      chronic: [
        "Adductor tendinopathy with daily use",
        "Hip joint irritation in people with existing hip arthritis",
      ],
      warning: [
        "Sharp groin pain at the end of the squeeze",
        "Pain that lingers for more than a day after a session",
      ],
      avoidIf: [
        "Current groin strain",
        "Pregnancy — the seated wide position is uncomfortable and the station is not designed for it",
        "Hip replacement without clearance",
      ],
    },
    safety: {
      before: [
        "Check the pad arms move smoothly and the locking pin holds.",
        "Check the backrest is fixed.",
      ],
      during: ["Stay back against the pad.", "Keep breathing; do not hold your breath at end-range."],
      stopIf: ["Sharp groin pain", "The pad arm jerks or sticks"],
    },
    maintenance: ["Pad-arm pivots", "Range locking pin", "Backrest bolts", "Padding splits"],
    signboard: [
      {
        claim: "Reduces inner-thigh fat",
        verdict: "unsupported",
        note: "Printed on almost every adductor machine in India. Physiologically impossible.",
      },
      {
        claim: "Tightens the hips",
        verdict: "partly",
        note: "It strengthens the adductors; 'tightening' is a marketing word for muscle tone.",
      },
      {
        claim: "Good for knee alignment",
        verdict: "partly",
        note: "Adductor strength contributes to knee control in sport, alongside glute and quadriceps work.",
      },
    ],
    sources: ["acsm", "en16630", "tendon"],
    confidence: "moderate",
  },

  {
    id: "calf-raise",
    name: "Calf Raise Platform",
    aliases: ["heel raise station", "toe raise"],
    category: "lower",
    prevalence: "occasional",
    footprint: "1.0 × 0.7 m",
    difficulty: 1,
    summary:
      "Stand on a raised edge and lift the heels. Simple, effective, and the station where Achilles problems begin.",
    description:
      "A platform with a raised toe block and handles at chest height. You rise onto the toes and lower the heels below the block for a stretch. It is the most direct calf exercise in the park and the fastest way to overload an unprepared Achilles if you do long sets every day.",
    muscles: {
      primary: ["calves (gastrocnemius, soleus)"],
      secondary: ["ankle stabilisers", "foot intrinsics"],
    },
    joints: ["ankle", "subtalar joint"],
    howTo: [
      "Stand with the balls of the feet on the block, heels off the edge.",
      "Hold the handles lightly for balance, not to pull yourself up.",
      "Rise onto the toes as high as comfortable over two seconds.",
      "Lower slowly until the heels drop below the block into a stretch.",
      "Keep the knees straight (or slightly bent for the soleus) throughout.",
    ],
    setup: [
      "Foot position: balls of the feet on the block, mid-foot over the edge.",
      "Handles at chest height; elbows relaxed.",
    ],
    mistakes: [
      {
        wrong: "Bouncing up and down using momentum.",
        fix: "Two seconds up, three seconds down. The lower half is the training.",
      },
      {
        wrong: "Dropping the heels far below the block on the first session.",
        fix: "Start with a small stretch. The Achilles does not tolerate sudden end-range load.",
      },
      {
        wrong: "Pulling with the arms to help.",
        fix: "Hands are for balance; the calves do the lift.",
      },
      {
        wrong: "Rolling onto the outside edge of the foot.",
        fix: "Push through the big toe and second toe as well.",
      },
    ],
    benefits: [
      {
        claim: "Strengthens the calf–Achilles unit, which takes the load of every step.",
        tier: 1,
        note: "Calf raises are standard in Achilles and ankle rehabilitation.",
      },
      {
        claim: "Improves balance and ankle stiffness.",
        tier: 2,
        note: "Better calf function helps balance, especially as people age.",
      },
      {
        claim: "Burns calf fat.",
        tier: 3,
        note: "No.",
      },
    ],
    easier: "Two-legged raises with a small range, no heel drop below the block.",
    harder: "Single-leg raises, or a three-second lower into a full stretch.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 12–15 reps",
        sets: "2–3",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 8–10 reps",
        supervision: "required; no heel drops below the platform",
      },
    },
    overuse: {
      acute: ["Achilles strain from deep heel drops", "Calf cramp from long sets"],
      chronic: [
        "Achilles tendinopathy with daily long sets",
        "Plantar fascia irritation in people who also walk long distances",
      ],
      warning: [
        "Morning Achilles stiffness that takes more than 20 minutes to ease",
        "A nodule or thickening you can feel on the tendon",
      ],
      avoidIf: ["Acute Achilles pain or a suspected tear", "Recent ankle sprain"],
    },
    safety: {
      before: [
        "Check the platform edge is not chipped or slippery.",
        "Check the handles are secure.",
        "Check the base does not rock.",
      ],
      during: ["Keep the heels aligned, not turned out.", "Hold the handles lightly."],
      stopIf: ["Sharp Achilles pain", "The platform moves"],
    },
    maintenance: ["Platform surface grip", "Handle fixings", "Base anchors", "Edge wear"],
    signboard: [
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "Another height myth. Calf training does not lengthen the tibia.",
      },
      {
        claim: "Prevents ankle sprains",
        verdict: "partly",
        note: "Stronger calves help, but balance training is the more effective prevention.",
      },
      {
        claim: "Shapes the legs",
        verdict: "partly",
        note: "Calf development does change lower-leg shape over months of consistent work.",
      },
    ],
    sources: ["acsm", "en16630", "tendon"],
    confidence: "moderate",
  },
];
