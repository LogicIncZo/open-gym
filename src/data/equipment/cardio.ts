import type { Equipment } from "../types";

export const cardio: Equipment[] = [
  {
    id: "air-walker",
    name: "Air Walker",
    aliases: ["leg swing glider", "hip glider", "walker"],
    category: "cardio",
    prevalence: "common",
    footprint: "1.6 × 0.9 m",
    difficulty: 1,
    summary:
      "Standing leg-swing glider. Light cardio and hip mobility — not a strength machine.",
    description:
      "Two foot plates hang from one pivot at the top of the frame, so the legs swing in opposition while you hold the side handles. You supply all the effort; the machine only guides the path, which makes the resistance your own bodyweight. It is the station most Indian park gyms install first, and the one most often treated as a substitute for walking.",
    muscles: {
      primary: ["hip flexors", "glutes"],
      secondary: ["hamstrings", "calves", "lower back"],
    },
    joints: ["hip", "knee", "ankle", "lumbar spine"],
    howTo: [
      "Hold both handles and step onto the plates one foot at a time, starting with the plate nearest you.",
      "Stand tall with ribs stacked over hips. Do not lean back into the frame.",
      "Swing the legs alternately from the hip at a comfortable stride — roughly your walking stride, not longer.",
      "Keep the swing smooth and quiet. A plate that slaps at the end of each swing means you are going too fast.",
      "Slow the swing to a stop before stepping off, and keep one hand on a handle until both feet are on the ground.",
    ],
    setup: [
      "No seat adjustment. Set your hand height so elbows stay slightly bent.",
      "If the plates hang unevenly, the pivot bolt is worn — do not use it.",
    ],
    mistakes: [
      {
        wrong: "Leaning back and pulling on the handles to drive the legs forward.",
        fix: "Stand upright and let the legs do the work; the handles are for balance only.",
      },
      {
        wrong: "Over-striding until the hip pinches at the front.",
        fix: "Shorten the swing to a stride you could walk comfortably.",
      },
      {
        wrong: "Swinging fast for a minute and stopping breathless.",
        fix: "Pick a pace you can hold for three minutes without gripping hard.",
      },
      {
        wrong: "Stepping off while the plates are still moving.",
        fix: "Decelerate first — most air-walker falls happen at dismount.",
      },
    ],
    benefits: [
      {
        claim: "Raises heart rate into the moderate-intensity band for the duration of the set.",
        tier: 1,
        note: "Any continuous whole-body movement counts toward the WHO 150–300 min/week target.",
      },
      {
        claim: "Takes the hips through a walking-range swing, which helps if you sit most of the day.",
        tier: 2,
        note: "Mechanically plausible and commonly reported; not a substitute for a targeted mobility programme.",
      },
      {
        claim: "Burns enough calories to matter for weight loss on its own.",
        tier: 3,
        note: "Effort is low and sets are short. Weight change comes from diet and total weekly activity, not one station.",
      },
    ],
    easier: "Hold the handles with both hands and take a very short swing for 60 seconds.",
    harder: "Increase to 5 minutes continuous, or let go of one handle for 30-second intervals.",
    minutes: {
      adult: {
        perStation: "3–5 min continuous, or 2 × 2 min",
        sets: "1–2 passes",
        rest: "60 s between passes",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2–3 min",
        supervision: "adult within arm's reach, no swinging contests",
      },
    },
    overuse: {
      acute: [
        "Hip-flexor strain from over-striding",
        "Low-back extension strain from leaning back into the swing",
      ],
      chronic: [
        "Hip-flexor tendinopathy with daily long sessions",
        "Recurrent low-back ache in people who already sit with a flattened lumbar curve",
      ],
      warning: [
        "A pinch at the front of the hip that persists after you stop",
        "Low-back ache that is still there an hour later",
      ],
      avoidIf: [
        "Recent hip replacement without your surgeon's clearance",
        "Acute low-back pain or sciatica in a current flare",
      ],
    },
    safety: {
      before: [
        "Check the top pivot bolt and both plate welds.",
        "Check that the plates hang level and the handles are not loose.",
        "Wipe the handles dry after rain — wet grips slip.",
      ],
      during: [
        "Keep both hands on the handles until you are steady.",
        "Stop if the frame rocks or creaks at the base.",
      ],
      stopIf: [
        "Sharp hip or groin pain",
        "Dizziness, or breathlessness that stops you speaking a sentence",
      ],
    },
    maintenance: [
      "Pivot bolt and bushings — the most common failure on this station",
      "Foot-plate welds and anti-slip surface",
      "Handle caps and grip tape",
      "Base plate anchor bolts into the ground",
    ],
    signboard: [
      {
        claim: "Reduces belly fat",
        verdict: "unsupported",
        note: "Spot reduction does not happen. Fat loss follows overall energy balance, not which machine you stand on.",
      },
      {
        claim: "Improves hip mobility",
        verdict: "supported",
        note: "It moves the hip through a walking-range swing under light load — a reasonable warm-up.",
      },
      {
        claim: "Cures knee pain",
        verdict: "unsupported",
        note: "No station cures knee pain. Some people find swinging comfortable; others find it aggravates the knee.",
      },
    ],
    sources: ["who2020", "en16630", "nhs"],
    confidence: "moderate",
  },

  {
    id: "moon-walker",
    name: "Moon Walker",
    aliases: ["space walker", "elliptical glider", "double air walker"],
    category: "cardio",
    prevalence: "common",
    footprint: "1.8 × 1.0 m",
    difficulty: 2,
    summary:
      "Long-arm glider with a body lean. More hip and shoulder involvement than an air walker, and more ways to cheat.",
    description:
      "The moon walker hangs two long curved arms from a high pivot and adds a chest or hip pad you lean into. The longer lever means bigger strides and a faster swing than an air walker, so heart rate climbs quicker — and so does the temptation to hang off the frame. The lean is the whole point and also the whole risk: lean too far and the low back takes the load.",
    muscles: {
      primary: ["hip flexors", "glutes", "hip extensors"],
      secondary: ["shoulders", "calves", "lower back"],
    },
    joints: ["hip", "knee", "ankle", "shoulder", "lumbar spine"],
    howTo: [
      "Set the chest pad height so it meets the breastbone, not the belly.",
      "Step on with one foot, take the pad on your chest, then bring the other foot on.",
      "Push the pads forward and back in opposition, keeping the lean in your whole body rather than your lower back.",
      "Hold a pace where your feet stay in contact with the plates through the whole stroke.",
      "Stand up out of the lean before stepping off.",
    ],
    setup: [
      "Chest pad height: breastbone level for most adults; higher for shorter users.",
      "Handle reach: elbows bent about 30° at the closest point.",
    ],
    mistakes: [
      {
        wrong: "Using the long arms as a swing and letting the body hang.",
        fix: "Drive with the legs and keep the torso actively braced against the pad.",
      },
      {
        wrong: "Arching the lower back to reach the pad.",
        fix: "Lower the pad or stand taller; the pad should meet you, not pull you forward.",
      },
      {
        wrong: "Taking huge strides because the machine allows it.",
        fix: "Keep the stride inside a range where the hip never pinches.",
      },
      {
        wrong: "Running it as a sprint for 40 seconds.",
        fix: "Steady 3–5 minutes is the intended use; short sprints belong on a bike or track.",
      },
    ],
    benefits: [
      {
        claim: "Higher cardiovascular load than an air walker at the same perceived effort.",
        tier: 2,
        note: "Longer levers and larger range mean more work per stroke; the exact difference depends on pace.",
      },
      {
        claim: "Trains hip extension and flexion through a bigger range than walking.",
        tier: 2,
        note: "Useful as a warm-up, not as a replacement for loaded hip work.",
      },
      {
        claim: "Firms the thighs and hips.",
        tier: 3,
        note: "Movement does not spot-tone. Muscle changes need progressive load and enough protein.",
      },
    ],
    easier: "Use the short end of the stroke, 2 minutes, standing tall with minimal lean.",
    harder: "Three minutes continuous with a full stroke and no hand pull.",
    minutes: {
      adult: {
        perStation: "3–5 min continuous",
        sets: "1–2 passes",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2–3 min",
        supervision: "required — the lean makes dismounts harder than they look",
      },
    },
    overuse: {
      acute: [
        "Low-back strain from leaning and arching",
        "Ankle roll on dismount when a plate is still moving",
      ],
      chronic: [
        "Lumbar extension irritation with daily use in people with existing back pain",
        "Hip-flexor overuse alongside long walking routines",
      ],
      warning: [
        "Low-back ache that starts during the set and does not settle in a few minutes",
        "Ankle pain or a feeling of instability on the plates",
      ],
      avoidIf: [
        "Current low-back pain or a recent disc episode",
        "Balance problems or neuropathy affecting the feet",
      ],
    },
    safety: {
      before: [
        "Check the chest pad bolts and the arm pivots.",
        "Check plate anti-slip strips — worn strips are the fall risk here.",
        "Confirm the frame does not rock when you push the arms.",
      ],
      during: ["Keep your weight through the whole foot.", "Dismount one foot at a time, holding a handle."],
      stopIf: ["Low-back pain that radiates down a leg", "Chest pain or unusual breathlessness"],
    },
    maintenance: [
      "Arm pivot bushings",
      "Chest-pad bolts and padding splits",
      "Foot-plate grip strips",
      "Base anchor bolts",
    ],
    signboard: [
      {
        claim: "Burns twice the calories of walking",
        verdict: "unsupported",
        note: "No credible station-specific figure exists. Energy cost depends on your pace, weight and time.",
      },
      {
        claim: "Strengthens hips and thighs",
        verdict: "partly",
        note: "It loads them lightly through a large range. Strength gains need progressive resistance.",
      },
      {
        claim: "Improves posture",
        verdict: "unsupported",
        note: "The station encourages a forward lean; posture change needs sustained strength and habit work.",
      },
    ],
    sources: ["who2020", "en16630"],
    confidence: "moderate",
  },

  {
    id: "cross-trainer",
    name: "Cross Trainer",
    aliases: ["outdoor elliptical", "park elliptical"],
    category: "cardio",
    prevalence: "occasional",
    footprint: "2.0 × 1.2 m",
    difficulty: 2,
    summary:
      "Standing elliptical with moving arms. The best continuous cardio station in a park gym.",
    description:
      "A flywheel, two foot pedals on swinging arms, and paired handles that move with the legs. It is the closest thing in an outdoor gym to a gym elliptical, and the only station where the arms and legs work continuously together. Most units are bodyweight-resisted with a fixed stroke length, so pace is your only intensity dial.",
    muscles: {
      primary: ["quadriceps", "glutes", "hamstrings"],
      secondary: ["calves", "hip flexors", "shoulders", "upper back"],
    },
    joints: ["hip", "knee", "ankle", "shoulder", "elbow"],
    howTo: [
      "Step onto the lower pedal first, holding both handles.",
      "Stand tall; do not lock the knees at any point in the stroke.",
      "Push the pedals in a smooth oval, letting the arms swing naturally in opposition.",
      "Keep the heels down through the back half of the stroke.",
      "Reduce the pace for 30 seconds before stepping off, then dismount one foot at a time.",
    ],
    setup: [
      "Handles at chest height, elbows slightly bent.",
      "No resistance adjustment on most park units — pace and time are your only controls.",
    ],
    mistakes: [
      {
        wrong: "Standing on tiptoe and letting the heels lift through the whole stroke.",
        fix: "Push the heel down as the pedal travels back; this takes load off the Achilles.",
      },
      {
        wrong: "Locking the knees straight at the bottom.",
        fix: "Keep a soft knee; the joint should never reach end-range under load.",
      },
      {
        wrong: "Leaning on the handles and letting the arms carry the body.",
        fix: "Stand upright and swing the arms — do not hang.",
      },
      {
        wrong: "Starting at maximum pace cold.",
        fix: "Two minutes easy first. This station loads the Achilles and knees more than it feels.",
      },
    ],
    benefits: [
      {
        claim: "Sustained moderate-intensity cardio with low joint impact.",
        tier: 1,
        note: "Counts directly toward the weekly 150–300 minutes of moderate activity.",
      },
      {
        claim: "Trains the arms and legs together, so heart rate rises faster than walking.",
        tier: 2,
        note: "More muscle mass involved means more oxygen demand at the same perceived effort.",
      },
      {
        claim: "Replaces a gym elliptical.",
        tier: 3,
        note: "It is a fixed-stroke approximation. No resistance control, no stride adjustment, no data.",
      },
    ],
    easier: "Two minutes at an easy pace with short strokes and both hands on the fixed rails.",
    harder: "Six minutes continuous with the arms driving, or 3 × 2 min with 45 s rest.",
    minutes: {
      adult: {
        perStation: "4–6 min continuous",
        sets: "1–2 passes",
        rest: "90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2–3 min",
        supervision: "required — the pedals keep moving after the child stops",
      },
    },
    overuse: {
      acute: [
        "Achilles or calf strain from heel-up pedalling",
        "Knee pain from a long stride at high pace",
      ],
      chronic: [
        "Achilles tendinopathy with daily 10-minute sessions",
        "Patellofemoral pain in people who lock the knees",
      ],
      warning: [
        "Morning Achilles stiffness that lasts more than 20 minutes",
        "Knee pain under the kneecap on stairs the next day",
      ],
      avoidIf: [
        "Acute Achilles or calf injury",
        "Balance problems — the pedals are unstable at dismount",
      ],
    },
    safety: {
      before: [
        "Spin the pedals by hand: they should move freely, without grinding.",
        "Check both handles are attached and the grips are not spinning.",
        "Check the flywheel guard is intact.",
      ],
      during: ["Keep both feet centred on the pedals.", "Look forward, not down at your feet."],
      stopIf: ["Sharp knee or Achilles pain", "The machine lurches or the pedal drops"],
    },
    maintenance: [
      "Flywheel bearings and guard",
      "Pedal pivot bolts",
      "Handle attachment welds",
      "Grip sleeves",
    ],
    signboard: [
      {
        claim: "Full-body workout",
        verdict: "partly",
        note: "It involves the whole body at low resistance. It does not build meaningful strength.",
      },
      {
        claim: "Low-impact cardio for knee patients",
        verdict: "partly",
        note: "Lower impact than running, but the knee still flexes under load. Get clearance if you have knee disease.",
      },
      {
        claim: "Burns 500 calories in 10 minutes",
        verdict: "unsupported",
        note: "That rate is beyond most people's maximum sustainable output. Ignore calorie counters on park boards.",
      },
    ],
    sources: ["who2020", "en16630", "bjsm-knee"],
    confidence: "moderate",
  },

  {
    id: "rider",
    name: "Rider / Horse Rider",
    aliases: ["horse rider", "riding machine", "galloping machine"],
    category: "cardio",
    prevalence: "common",
    footprint: "1.5 × 0.9 m",
    difficulty: 3,
    summary:
      "Saddle that swings between two pedals. Fun, hip-driven, and unforgiving on the groin if you push the range.",
    description:
      "You sit on a saddle and push two pedals alternately, which makes the seat rock and rise like a slow gallop. The movement is a hip-driven leg press with a bit of balance work mixed in. It is the station children gravitate to and the one adults injure themselves on by riding it like a competition.",
    muscles: {
      primary: ["quadriceps", "glutes", "adductors"],
      secondary: ["hamstrings", "calves", "core"],
    },
    joints: ["hip", "knee", "ankle", "lumbar spine"],
    howTo: [
      "Set the saddle height so your knee is slightly bent with the foot at the bottom of the pedal stroke.",
      "Sit back on the saddle, feet centred on the pedals, hands on the front bar.",
      "Push one pedal down while the other rises, letting the saddle rock rather than bounce.",
      "Keep the movement slow — one full cycle every two seconds is plenty.",
      "Stop pushing and let the saddle settle before standing off.",
    ],
    setup: [
      "Saddle height: knee about 150–160° at the bottom of the stroke.",
      "Handlebar reach: hands land on the bar without stretching the shoulders.",
    ],
    mistakes: [
      {
        wrong: "Riding fast, bouncing on the saddle.",
        fix: "Slow down until the saddle rocks smoothly and your trunk stays quiet.",
      },
      {
        wrong: "Saddle too low, knees folding past 90°.",
        fix: "Raise the saddle a notch; a deep knee bend under load is where groin and knee pain start.",
      },
      {
        wrong: "Standing up on the pedals and pumping.",
        fix: "Stay seated. Standing converts it into a balance challenge with a fall risk.",
      },
      {
        wrong: "Letting children ride unsupervised because it looks like a toy.",
        fix: "It is an adult-sized fitness machine with a moving saddle — supervise, and no under-12s.",
      },
    ],
    benefits: [
      {
        claim: "Raises heart rate through repeated leg extension.",
        tier: 2,
        note: "Short sets at moderate effort; useful as part of a circuit rather than alone.",
      },
      {
        claim: "Works the inner thigh through a controlled range.",
        tier: 2,
        note: "Adductor load is real — that is also why overuse shows up as groin pain.",
      },
      {
        claim: "Good for weight loss in the abdomen.",
        tier: 3,
        note: "No station targets abdominal fat. This claim appears on almost every rider in India.",
      },
    ],
    easier: "Half-range pushes for 2 minutes with both hands on the bar.",
    harder: "Three minutes continuous at a slow, full range with no hand support.",
    minutes: {
      adult: {
        perStation: "3–5 min",
        sets: "1–2 passes",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2–3 min",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Groin or adductor strain", "Low-back jarring from bouncing on the saddle"],
      chronic: [
        "Adductor tendinopathy in people who ride daily",
        "Knee pain from a saddle set too low",
      ],
      warning: [
        "Groin pain that lingers after the set",
        "Pain at the inner knee or a feeling of the knee caving in",
      ],
      avoidIf: [
        "Current groin or adductor injury",
        "Pregnancy — the wide seated position and rocking are uncomfortable and the station is not designed for it",
        "Recent hip or knee replacement",
      ],
    },
    safety: {
      before: [
        "Check the saddle bolts and that the saddle does not swivel freely.",
        "Check both pedals are level and the pivot is not seized.",
        "Check the front handlebar is firmly attached — it is your only handhold.",
      ],
      during: ["Keep both hands on the bar.", "Keep the movement slow and the trunk still."],
      stopIf: ["Sharp groin pain", "The saddle shifts or creaks under you"],
    },
    maintenance: [
      "Saddle mounting bolts — the highest-risk fixing on the station",
      "Pedal pivots",
      "Handlebar welds",
      "Anti-slip pedal surface",
    ],
    signboard: [
      {
        claim: "Reduces belly fat and love handles",
        verdict: "unsupported",
        note: "The most common false claim on Indian park boards. Fat loss is systemic, not local.",
      },
      {
        claim: "Improves hip and knee flexibility",
        verdict: "partly",
        note: "It moves the hip and knee through a fixed range under load; that is loading, not flexibility training.",
      },
      {
        claim: "Suitable for all ages",
        verdict: "unsupported",
        note: "The station is sized for adults and the moving saddle is a fall risk for children.",
      },
    ],
    sources: ["who2020", "en16630", "tendon"],
    confidence: "moderate",
  },

  {
    id: "stepper",
    name: "Stepper (Sky Stepper)",
    aliases: ["sky stepper", "leg press stepper", "climber"],
    category: "cardio",
    prevalence: "common",
    footprint: "1.4 × 0.9 m",
    difficulty: 2,
    summary:
      "Two independent pedals you push down alternately. Real calf and knee loading in a small footprint.",
    description:
      "Each pedal is on its own pivoting arm, so you drive them down one at a time against your bodyweight. It feels like stair climbing without the stairs, and the load on the Achilles and kneecap is correspondingly real. Standing tall and controlling the return is the whole technique.",
    muscles: {
      primary: ["quadriceps", "glutes", "calves"],
      secondary: ["hamstrings", "hip flexors"],
    },
    joints: ["knee", "ankle", "hip"],
    howTo: [
      "Hold both handles and place one foot on each pedal.",
      "Stand tall with the pelvis level — do not lean on the handles.",
      "Push one pedal down fully, then let it rise under control while the other descends.",
      "Keep the heel down on the pushing leg, especially at the bottom.",
      "Slow to a stop and step off one foot at a time.",
    ],
    setup: [
      "Handle height: elbows slightly bent, shoulders relaxed.",
      "Pedal start position should be level; if one hangs lower, the pivot is worn.",
    ],
    mistakes: [
      {
        wrong: "Bouncing from pedal to pedal with straight legs.",
        fix: "Control the rise; a slow return is where most of the training effect sits.",
      },
      {
        wrong: "Hanging on the handles and taking weight off the legs.",
        fix: "Hands for balance only. If you need to hang, you are going too hard.",
      },
      {
        wrong: "Pushing through the ball of the foot only.",
        fix: "Drive through the whole foot; toes-only work overloads the Achilles.",
      },
      {
        wrong: "Long sessions because it feels easy.",
        fix: "Five minutes is the ceiling. This station punishes volume more than intensity.",
      },
    ],
    benefits: [
      {
        claim: "Raises heart rate quickly in a very small footprint.",
        tier: 1,
        note: "Useful in a circuit where space is tight.",
      },
      {
        claim: "Loads the calves and quadriceps through a stair-like range.",
        tier: 2,
        note: "Good for people who avoid stairs; the same caution applies to the kneecap.",
      },
      {
        claim: "Builds leg muscle.",
        tier: 3,
        note: "Bodyweight-only resistance with short sets maintains, but does not meaningfully build, leg muscle.",
      },
    ],
    easier: "Two minutes at a slow pace with a short stroke and both hands on the rails.",
    harder: "Four minutes continuous, full stroke, hands lightly resting on the handles.",
    minutes: {
      adult: {
        perStation: "3–5 min",
        sets: "1–2 passes",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2–3 min",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Achilles or calf strain", "Knee pain from bouncing at the bottom"],
      chronic: [
        "Patellofemoral pain with daily use",
        "Achilles tendinopathy in people who also walk long distances",
      ],
      warning: [
        "Pain under the kneecap on stairs the next morning",
        "Achilles stiffness that eases only after ten minutes of walking",
      ],
      avoidIf: ["Acute knee or Achilles pain", "Severe balance impairment"],
    },
    safety: {
      before: [
        "Check both pedal pivots and the handle welds.",
        "Check the pedal surface is not worn smooth or holding water.",
      ],
      during: ["Keep the pelvis level.", "Step off one foot at a time, never both at once."],
      stopIf: ["Sharp knee pain", "The pedal gives way under load"],
    },
    maintenance: ["Pedal pivot bolts", "Handle welds", "Pedal grip surface", "Base anchors"],
    signboard: [
      {
        claim: "Replaces stair climbing for weight loss",
        verdict: "partly",
        note: "It is stair-like movement, but short sets and bodyweight resistance limit the effect.",
      },
      {
        claim: "Strengthens knees",
        verdict: "partly",
        note: "It loads the quadriceps, which supports the knee — but only if the load is progressed gradually.",
      },
      {
        claim: "Improves height in children",
        verdict: "unsupported",
        note: "No exercise changes adult height. Stretching or stepping does not lengthen bones.",
      },
    ],
    sources: ["who2020", "en16630", "bjsm-knee"],
    confidence: "moderate",
  },

  {
    id: "exercise-bike",
    name: "Outdoor Exercise Bike",
    aliases: ["park cycle", "static bike", "outdoor cycle"],
    category: "cardio",
    prevalence: "occasional",
    footprint: "1.5 × 0.7 m",
    difficulty: 1,
    summary:
      "Seated cycling with no resistance dial. Seat height decides whether your knees like it.",
    description:
      "A fixed bike frame with a saddle, pedals and a flywheel or fan wheel at the front. Park units rarely have resistance adjustment, so cadence and time are the only variables. The saddle is usually too low for tall users and the handlebars too far forward for short ones — check both before you start.",
    muscles: {
      primary: ["quadriceps", "glutes"],
      secondary: ["hamstrings", "calves", "hip flexors"],
    },
    joints: ["knee", "hip", "ankle"],
    howTo: [
      "Set the saddle so the knee is almost straight at the bottom of the pedal stroke.",
      "Sit with the whole foot on the pedal, not the toes.",
      "Pedal at a cadence you can hold for the whole set — 60–80 rpm feels natural.",
      "Keep the trunk still; if the hips rock, the saddle is too high.",
      "Slow down before dismounting and hold the frame.",
    ],
    setup: [
      "Saddle height: knee 150–160° at the bottom of the stroke.",
      "If the saddle will not adjust and your knee stays bent past 90°, use a different station.",
      "Handlebars: reachable without locking the elbows.",
    ],
    mistakes: [
      {
        wrong: "Saddle too low because it looks comfortable.",
        fix: "Raise it. A low saddle is the single biggest cause of park-bike knee pain.",
      },
      {
        wrong: "Pedalling with the toes and a pointed foot.",
        fix: "Keep the foot flat and let the ankle move through a small range.",
      },
      {
        wrong: "Rounding the back to reach the handlebars.",
        fix: "Sit tall and let the hands rest lightly; a long reach is a frame-fit problem, not a flexibility problem.",
      },
      {
        wrong: "Spinning as fast as possible for 30 seconds.",
        fix: "Steady 5–8 minutes is the intended use.",
      },
    ],
    benefits: [
      {
        claim: "Low-impact sustained cardio, useful for people who cannot run.",
        tier: 1,
        note: "A standard alternative for meeting weekly moderate-activity minutes.",
      },
      {
        claim: "Builds some leg endurance.",
        tier: 2,
        note: "Muscular endurance yes; strength and muscle size, not at this resistance.",
      },
      {
        claim: "Helps knee arthritis.",
        tier: 2,
        note: "Cycling is often recommended for knee arthritis, but the saddle must be high enough and the gear light.",
      },
    ],
    easier: "Three minutes at an easy cadence with the saddle at its highest safe setting.",
    harder: "Eight minutes continuous, or 4 × 2 min at a brisk cadence.",
    minutes: {
      adult: {
        perStation: "5–8 min continuous",
        sets: "1 pass",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "3 min",
        supervision: "required; check the saddle is not loose first",
      },
    },
    overuse: {
      acute: ["Knee pain from a low saddle", "Neck and wrist ache from a long reach"],
      chronic: [
        "Patellofemoral pain with repeated low-saddle riding",
        "Hip-flexor tightness from long seated sessions",
      ],
      warning: [
        "Knee pain at the front of the joint that appears within the first two minutes",
        "Numb hands or wrists",
      ],
      avoidIf: ["Acute knee injury", "Recent hip surgery without clearance"],
    },
    safety: {
      before: [
        "Check the saddle post clamp — a slipping saddle is a fall.",
        "Check the pedals spin freely and the crank arms are tight.",
        "Check the flywheel is guarded.",
      ],
      during: ["Keep both hands on the bars at dismount.", "Do not pedal standing up."],
      stopIf: ["The saddle slips or rotates", "Sharp knee pain"],
    },
    maintenance: ["Saddle clamp", "Crank and pedal threads", "Flywheel guard", "Handlebar bolts"],
    signboard: [
      {
        claim: "Exercises the whole body",
        verdict: "unsupported",
        note: "It is a leg station. The arms hold the bars.",
      },
      {
        claim: "No resistance means no benefit",
        verdict: "unsupported",
        note: "Cadence and duration still produce a cardiovascular stimulus; resistance is not the only variable.",
      },
      {
        claim: "Good for back pain",
        verdict: "partly",
        note: "Some people tolerate it well; a rounded back over a long reach can make back pain worse.",
      },
    ],
    sources: ["who2020", "en16630", "bjsm-knee"],
    confidence: "moderate",
  },

  {
    id: "ski-walker",
    name: "Ski Walker",
    aliases: ["cross-country ski machine", "skier"],
    category: "cardio",
    prevalence: "occasional",
    footprint: "1.7 × 0.9 m",
    difficulty: 3,
    summary:
      "Standing push-and-pull that mimics cross-country skiing. Demands coordination before it gives cardio.",
    description:
      "Two foot platforms slide or swing while the arms pull handles in opposition, copying the diagonal stride of cross-country skiing. Done well it is the most complete cardio station in a park. Done badly it is a shoulder and low-back strain, because people pull with the arms and forget the legs.",
    muscles: {
      primary: ["glutes", "hamstrings", "quadriceps", "latissimus dorsi"],
      secondary: ["shoulders", "triceps", "core", "calves"],
    },
    joints: ["hip", "knee", "ankle", "shoulder", "lumbar spine"],
    howTo: [
      "Stand with one foot forward and one back, hands on both handles.",
      "Push back with the rear leg while pulling the opposite handle — legs first, arms second.",
      "Let the front leg slide back as the rear leg returns; the movement is a diagonal, not a squat.",
      "Keep the trunk upright and the ribs down.",
      "Slow to a stop before stepping off the platforms.",
    ],
    setup: [
      "Handle height at chest level.",
      "Platform travel should be smooth; a jerky return means a worn bearing.",
    ],
    mistakes: [
      {
        wrong: "Pulling with the arms and barely moving the legs.",
        fix: "Drive with the legs and let the arms follow. Arms are assist, not engine.",
      },
      {
        wrong: "Rounding the low back as the arms pull.",
        fix: "Brace the trunk and keep the ribs stacked over the hips.",
      },
      {
        wrong: "Huge strides that pull the hip into end-range.",
        fix: "Shorten the stride until the hip stays comfortable.",
      },
      {
        wrong: "Starting at speed to 'get the heart rate up'.",
        fix: "It is a coordination station. Learn the pattern slowly for a minute first.",
      },
    ],
    benefits: [
      {
        claim: "Whole-body moderate cardio when the technique is right.",
        tier: 1,
        note: "Counts toward weekly moderate-activity minutes like any continuous aerobic work.",
      },
      {
        claim: "Trains the posterior chain through hip extension.",
        tier: 2,
        note: "Glutes and hamstrings do the pushing; that is a useful pattern most park users lack.",
      },
      {
        claim: "Improves balance and coordination.",
        tier: 2,
        note: "Cross-body coordination is a real demand here, especially on a moving platform.",
      },
    ],
    easier: "One minute at slow speed with short strides to learn the pattern.",
    harder: "Four minutes continuous with a full stride and no pause at the ends.",
    minutes: {
      adult: {
        perStation: "3–4 min",
        sets: "2 passes",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2 min",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Shoulder strain from arm-dominant pulling", "Low-back strain from a rounded trunk"],
      chronic: [
        "Rotator-cuff irritation with daily arm pulling",
        "Lumbar strain in people who flex the spine under load",
      ],
      warning: [
        "Shoulder pain at the front of the joint during the pull",
        "Low-back ache that appears only on this station",
      ],
      avoidIf: ["Current shoulder impingement flare", "Acute low-back pain"],
    },
    safety: {
      before: [
        "Check both platforms move freely and the handles are attached.",
        "Check the frame is anchored — this station takes a push-pull load.",
      ],
      during: ["Keep the trunk upright.", "Look ahead, not at your feet."],
      stopIf: ["Shoulder pain on the pull", "The platform jams mid-stroke"],
    },
    maintenance: ["Platform bearings", "Handle pivots", "Frame anchors", "Grip surfaces"],
    signboard: [
      {
        claim: "Burns more calories than running",
        verdict: "unsupported",
        note: "Cross-country skiing is efficient, but a short park set at low resistance is not comparable.",
      },
      {
        claim: "Tones arms and back",
        verdict: "partly",
        note: "It uses them continuously, but without progressive load there is little size or strength change.",
      },
      {
        claim: "Improves heart and lung capacity",
        verdict: "supported",
        note: "Any sustained moderate cardio does — provided you actually sustain it for the set.",
      },
    ],
    sources: ["who2020", "en16630", "rotator"],
    confidence: "moderate",
  },

  {
    id: "treadmill-rollers",
    name: "Manual Treadmill Rollers",
    aliases: ["roller treadmill", "walking rollers", "free treadmill"],
    category: "cardio",
    prevalence: "rare",
    footprint: "1.6 × 0.8 m",
    difficulty: 4,
    summary:
      "Unpowered rollers you walk on. Cheap to install, unforgiving if you lose rhythm.",
    description:
      "A set of free-spinning rollers between two rails. You walk, and the rollers turn under you; there is no motor and no belt tension, so the surface reacts to every wobble. Rare in Indian parks and the station with the clearest fall risk, especially for older users and anyone in sandals.",
    muscles: {
      primary: ["calves", "glutes", "quadriceps"],
      secondary: ["hamstrings", "core", "ankle stabilisers"],
    },
    joints: ["ankle", "knee", "hip"],
    howTo: [
      "Hold both rails and place one foot on the rollers to test the spin.",
      "Start at the front third and take short, slow steps.",
      "Keep the steps under your body, not reaching forward.",
      "Hold the rails until you are fully stopped.",
      "Step off to the side, not forward.",
    ],
    setup: [
      "Rail height should let you stand upright with elbows bent.",
      "If the rollers spin unevenly, do not use the station.",
    ],
    mistakes: [
      {
        wrong: "Long strides that land ahead of the body.",
        fix: "Short steps over the hips; long strides make the surface run away from you.",
      },
      {
        wrong: "Walking fast to finish quickly.",
        fix: "Slow is the only safe speed on free rollers.",
      },
      {
        wrong: "Sandals or wet footwear.",
        fix: "Closed, dry shoes only. This is not a barefoot station.",
      },
      {
        wrong: "Letting go of both rails before you stop.",
        fix: "Keep one hand on a rail at all times.",
      },
    ],
    benefits: [
      {
        claim: "Walking is the most transferable cardio there is.",
        tier: 1,
        note: "But the same walking can be done on the path, with no fall risk.",
      },
      {
        claim: "Adds an ankle-stability challenge to walking.",
        tier: 2,
        note: "True, and also the reason it is not a beginner station.",
      },
      {
        claim: "Better than normal walking.",
        tier: 3,
        note: "No evidence. For most park users it adds risk without adding training value.",
      },
    ],
    easier: "Do not use it. Walk the park path instead.",
    harder: "Longer sets once you can walk 2 minutes without touching a rail.",
    minutes: {
      adult: {
        perStation: "3–5 min",
        sets: "1 pass",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "not advised",
        supervision: "constant, and only with closed shoes",
      },
    },
    overuse: {
      acute: ["Ankle sprain from a rolled ankle", "Fall from losing rhythm"],
      chronic: [
        "Recurrent ankle instability after repeated minor rolls",
        "Achilles irritation from tense, toe-heavy walking",
      ],
      warning: [
        "Any ankle roll, even a minor one — stop for the day",
        "Fear or hesitation; that is a signal, not something to push through",
      ],
      avoidIf: [
        "Anyone over 65 without good balance",
        "Previous ankle sprain or instability",
        "Neuropathy or reduced foot sensation",
      ],
    },
    safety: {
      before: [
        "Spin each roller by hand — all must turn freely and evenly.",
        "Check rails are firmly attached and not loose at the base.",
        "Check for water, sand or leaves on the rollers.",
      ],
      during: ["Hold a rail.", "Short steps, slow pace, look ahead."],
      stopIf: ["Any loss of balance", "A roller stops turning"],
    },
    maintenance: ["Roller bearings", "Rail fixings", "Surface grip", "Drainage under the frame"],
    signboard: [
      {
        claim: "Burns more calories than normal walking",
        verdict: "partly",
        note: "Marginally, through the extra stabilisation effort. Not enough to justify the fall risk for most users.",
      },
      {
        claim: "Improves balance",
        verdict: "partly",
        note: "It challenges balance, but training balance on a high-risk surface is a bad trade for beginners.",
      },
      {
        claim: "Suitable for seniors",
        verdict: "unsupported",
        note: "It is the least suitable station in the park for older users.",
      },
    ],
    sources: ["who2020", "en16630"],
    confidence: "moderate",
  },
];
