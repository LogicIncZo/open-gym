import type { Equipment } from "../types";

export const upper: Equipment[] = [
  {
    id: "chest-press",
    name: "Seated Chest Press",
    aliases: ["bench press station", "push station"],
    category: "upper",
    prevalence: "common",
    footprint: "1.4 × 1.0 m",
    difficulty: 1,
    summary:
      "Seated push against fixed handles. The safest way for a beginner to learn a pressing pattern.",
    description:
      "A seat, a backrest and two handles on arms that pivot at shoulder height. You push forward against your own bodyweight, which means the resistance is fixed and modest — this station builds the habit of pressing, not the capacity to press heavy. The fixed path is why it is beginner-friendly and why it will never make you strong.",
    muscles: {
      primary: ["pectorals", "anterior deltoid", "triceps"],
      secondary: ["serratus anterior", "upper back"],
    },
    joints: ["shoulder", "elbow", "wrist"],
    howTo: [
      "Set the seat so the handles sit at mid-chest height, not at the collarbone.",
      "Sit back against the pad with feet flat and shoulder blades gently drawn back and down.",
      "Push both handles forward until the elbows are almost straight — never locked.",
      "Return slowly over two to three seconds until you feel a stretch across the chest.",
      "Keep the wrists straight and inline with the forearms throughout.",
    ],
    setup: [
      "Seat height: handles at nipple line for most adults.",
      "If handles are above the shoulders, the seat is too low — change station or skip it.",
    ],
    mistakes: [
      {
        wrong: "Pressing until the elbows snap straight.",
        fix: "Stop one or two degrees short of lockout; the joint takes the load otherwise.",
      },
      {
        wrong: "Letting the shoulders roll forward at the end of the push.",
        fix: "Keep the shoulder blades set back; the arm moves, the shoulder girdle stays put.",
      },
      {
        wrong: "Seat too low, pressing upward over the shoulders.",
        fix: "Raise the seat. Pressing above shoulder height on a fixed path is how impingement starts.",
      },
      {
        wrong: "Bouncing the return off the chest.",
        fix: "Control the way back; the eccentric half is most of the benefit.",
      },
    ],
    benefits: [
      {
        claim: "Teaches and maintains a horizontal pressing pattern with low injury risk.",
        tier: 1,
        note: "A reasonable entry point to upper-body strength work for untrained adults.",
      },
      {
        claim: "Builds chest and triceps strength.",
        tier: 2,
        note: "Only to a point: bodyweight-linked resistance plateaus quickly. Progress by adding reps and slowing the return.",
      },
      {
        claim: "Firms the chest and removes arm fat.",
        tier: 3,
        note: "No station reduces fat in a specific area.",
      },
    ],
    easier: "Half-range presses with a two-second pause at the chest.",
    harder: "Three sets of 12 with a three-second return, or single-arm presses alternating sides.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required; check hand placement on the handles",
      },
    },
    overuse: {
      acute: ["Shoulder pain from pressing above shoulder height", "Elbow discomfort from locking out"],
      chronic: [
        "Subacromial irritation with repeated high-seat pressing",
        "Wrist strain from bent-back wrists",
      ],
      warning: [
        "A pinch at the top of the shoulder during the press",
        "Elbow pain on the inner side that lingers",
      ],
      avoidIf: ["Current shoulder impingement flare", "Recent shoulder dislocation"],
    },
    safety: {
      before: [
        "Check the seat and backrest bolts.",
        "Check both press arms move symmetrically.",
        "Check handle grips are not spinning or split.",
      ],
      during: ["Keep feet flat.", "Exhale on the push; do not hold your breath."],
      stopIf: ["Sharp shoulder pain", "Numbness or tingling down the arm"],
    },
    maintenance: ["Seat bolts", "Press-arm pivots", "Handle grips", "Backrest padding"],
    signboard: [
      {
        claim: "Builds a big chest",
        verdict: "unsupported",
        note: "Bodyweight-linked resistance is too light for meaningful hypertrophy in most adults.",
      },
      {
        claim: "Corrects posture",
        verdict: "partly",
        note: "Pressing alone does not fix posture; a balanced push-pull programme might help.",
      },
      {
        claim: "Safe for all ages",
        verdict: "partly",
        note: "It is one of the safer stations, but it is still sized for adults and the fixed path can irritate a painful shoulder.",
      },
    ],
    sources: ["acsm", "en16630", "rotator"],
    confidence: "high",
  },

  {
    id: "shoulder-press",
    name: "Shoulder Press",
    aliases: ["overhead press station", "military press machine"],
    category: "upper",
    prevalence: "common",
    footprint: "1.3 × 0.9 m",
    difficulty: 3,
    summary:
      "Seated overhead push. Useful, but the station most likely to stir up an irritable shoulder.",
    description:
      "You sit and push two handles from shoulder height to overhead. The path is fixed and the load is your bodyweight, so the movement is small — but the shoulder position is the least forgiving one in the park. If pressing overhead hurts, that is information, not weakness.",
    muscles: {
      primary: ["deltoids", "triceps"],
      secondary: ["upper trapezius", "serratus anterior", "core"],
    },
    joints: ["shoulder", "elbow", "wrist", "cervical spine"],
    howTo: [
      "Set the seat so the handles start at shoulder height, not above the ears.",
      "Sit tall with the back against the pad and feet flat.",
      "Push the handles up and slightly together, stopping short of full lockout.",
      "Lower under control to shoulder height; do not let the stack drop.",
      "Keep the ribs down — do not arch the low back to finish the press.",
    ],
    setup: [
      "Seat height: handles level with the tops of the shoulders at the start.",
      "If the handles start above ear level, the seat is too low.",
    ],
    mistakes: [
      {
        wrong: "Arching the low back to push the last repetition.",
        fix: "Stop the set. The back is compensating for a shoulder that has run out of range.",
      },
      {
        wrong: "Pressing behind the head.",
        fix: "Never. Press in front of the face; behind-the-neck pressing is a known impingement risk.",
      },
      {
        wrong: "Shrugging the shoulders to the ears.",
        fix: "Keep the shoulders down and the neck long.",
      },
      {
        wrong: "Starting with the handles too low, below shoulder height.",
        fix: "That range is where the joint is most vulnerable under load.",
      },
    ],
    benefits: [
      {
        claim: "Maintains overhead pressing capacity, which declines fast with age.",
        tier: 1,
        note: "Overhead reach matters for daily tasks — shelves, hanging clothes, bus handrails.",
      },
      {
        claim: "Trains the deltoids and triceps.",
        tier: 2,
        note: "Light resistance and short range; a maintenance stimulus rather than a growth stimulus.",
      },
      {
        claim: "Broadens the shoulders.",
        tier: 3,
        note: "Muscle size responds to progressive load, which a fixed-path bodyweight station cannot supply for long.",
      },
    ],
    easier: "Partial-range presses from shoulder to eye level only.",
    harder: "Three sets of 12 with a three-second lower, or a single-arm press with the other hand on the seat.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Shoulder impingement pain at the top of the press", "Neck strain from shrugging"],
      chronic: [
        "Rotator-cuff irritation with repeated pressing on a painful shoulder",
        "Cervical strain from a forward head position under load",
      ],
      warning: [
        "Painful arc between shoulder and ear height",
        "Tingling or numbness into the hand",
      ],
      avoidIf: [
        "Uncontrolled high blood pressure — overhead work raises pressure further",
        "Current shoulder impingement or frozen shoulder",
        "Recent shoulder or cervical surgery",
      ],
    },
    safety: {
      before: [
        "Check the seat and press-arm bolts.",
        "Check the arms return without slamming.",
        "Check the handles are secure and not spinning.",
      ],
      during: ["Keep the ribs down.", "Breathe out on the press; never hold your breath."],
      stopIf: ["Painful arc in the shoulder", "Dizziness or visual changes"],
    },
    maintenance: ["Press-arm pivots", "Seat post clamp", "Handle grips", "Return springs or counterweights"],
    signboard: [
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "Repeatedly seen on Indian park boards. Exercise cannot increase adult height, and hanging does not either.",
      },
      {
        claim: "Good for the heart",
        verdict: "partly",
        note: "Any strength work supports metabolic health, but this is not a cardio station and it raises blood pressure acutely.",
      },
      {
        claim: "Builds shoulder strength",
        verdict: "supported",
        note: "To a modest ceiling. It is a legitimate strength station for untrained adults.",
      },
    ],
    sources: ["acsm", "en16630", "rotator"],
    confidence: "high",
  },

  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    aliases: ["pull-down station", "overhead pull"],
    category: "upper",
    prevalence: "common",
    footprint: "1.2 × 0.9 m",
    difficulty: 2,
    summary:
      "Seated overhead pull. The best park substitute for a pull-up, and much easier to scale.",
    description:
      "A high bar or two handles that you pull down to chest level while seated with your thighs under a pad. It trains the same pulling pattern as a pull-up but with a fraction of the load, which makes it the right starting point for most park users. Pull in front of the face, never behind the neck.",
    muscles: {
      primary: ["latissimus dorsi", "biceps"],
      secondary: ["rhomboids", "lower trapezius", "forearm flexors"],
    },
    joints: ["shoulder", "elbow", "wrist"],
    howTo: [
      "Set the thigh pad snug so you do not rise out of the seat.",
      "Take the handles with an overhand grip, slightly wider than shoulders.",
      "Sit tall, ribs down, and start with the arms straight overhead.",
      "Pull the handles to the upper chest, driving the elbows down and back.",
      "Return slowly until the arms are straight, letting the shoulder blades rise at the top.",
    ],
    setup: [
      "Thigh pad: snug against the thighs, not painful.",
      "Grip width: hands just outside shoulder width.",
      "Seat height: handles reachable with a straight arm and no trunk lean.",
    ],
    mistakes: [
      {
        wrong: "Pulling the bar behind the neck.",
        fix: "Front only. Behind-the-neck pulling puts the shoulder in a position it is not built to load.",
      },
      {
        wrong: "Leaning back 30° and using bodyweight to move the bar.",
        fix: "Stay upright. A small 10° lean is fine; rocking is not.",
      },
      {
        wrong: "Shrugging the shoulders up to the ears at the start.",
        fix: "Let the shoulder blades rise with the arms, then set them down as you pull.",
      },
      {
        wrong: "Letting the weight snap back up.",
        fix: "Three seconds up. The return is where the shoulder girdle does its work.",
      },
    ],
    benefits: [
      {
        claim: "Builds pulling strength, which most park users lack relative to pressing.",
        tier: 1,
        note: "Balancing push and pull is standard strength-training guidance.",
      },
      {
        claim: "A stepping stone toward a pull-up.",
        tier: 2,
        note: "It trains the same pattern at a scalable load; the carryover is real but partial.",
      },
      {
        claim: "Straightens the spine and improves posture.",
        tier: 3,
        note: "Stronger upper-back muscles may help some people hold a better position, but a machine does not 'straighten' anything.",
      },
    ],
    easier: "Single-arm pulls with half the range, or a two-second pause at the chest.",
    harder: "Three sets of 12 with a slow return, then move to the pull-up bar for negatives.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required; hands must stay on the bar, never the frame",
      },
    },
    overuse: {
      acute: ["Shoulder strain from behind-the-neck pulling", "Biceps tendon irritation from a jerky pull"],
      chronic: [
        "Elbow tendinopathy with high-volume pulling",
        "Low-back rounding when the thigh pad is loose",
      ],
      warning: [
        "Pain at the front of the shoulder during the pull",
        "Elbow pain on the inner side of the joint",
      ],
      avoidIf: ["Current shoulder or elbow injury", "Recent shoulder surgery"],
    },
    safety: {
      before: [
        "Check the high bar or handle attachment — this is a loaded overhead fixing.",
        "Check the thigh pad locks.",
        "Check the cable or linkage for fraying on cable-type units.",
      ],
      during: ["Pull to the chest, never behind the head.", "Keep the trunk still."],
      stopIf: ["Shoulder pain at the front of the joint", "The bar or handle shifts"],
    },
    maintenance: ["High-bar welds", "Cable and pulley wear", "Thigh-pad clamp", "Handle grips"],
    signboard: [
      {
        claim: "Increases height by decompressing the spine",
        verdict: "unsupported",
        note: "A frequent claim in Indian parks. Any 'gain' is temporary disc hydration, measured in millimetres, gone by evening.",
      },
      {
        claim: "Widens the back",
        verdict: "partly",
        note: "Lat development does change back shape, but bodyweight-scale resistance will not do much of it.",
      },
      {
        claim: "Replaces pull-ups",
        verdict: "partly",
        note: "Same pattern, much lower load. Good for beginners; not equivalent for trained users.",
      },
    ],
    sources: ["acsm", "en16630", "rotator"],
    confidence: "high",
  },

  {
    id: "seated-row",
    name: "Seated Row",
    aliases: ["rowing station", "horizontal pull"],
    category: "upper",
    prevalence: "common",
    footprint: "1.5 × 0.9 m",
    difficulty: 1,
    summary:
      "Seated horizontal pull with a footplate. The most useful upper-body station for desk-bound adults.",
    description:
      "You sit with feet on a plate and pull handles toward your waist against your own bodyweight. It trains the muscles that hold the shoulder blades back — the ones that weaken with desk work — and it is easy to do badly by rocking the torso. Slow and upright is the whole technique.",
    muscles: {
      primary: ["rhomboids", "middle trapezius", "latissimus dorsi"],
      secondary: ["biceps", "rear deltoid", "forearm flexors"],
    },
    joints: ["shoulder", "elbow", "wrist", "lumbar spine"],
    howTo: [
      "Set the footplate so the knees stay slightly bent at the start.",
      "Sit tall, chest up, and take both handles with the arms straight.",
      "Pull the handles to your navel, driving the elbows back past the ribs.",
      "Squeeze the shoulder blades together for one second at the end.",
      "Return slowly until the arms are straight, letting the blades spread.",
    ],
    setup: [
      "Footplate distance: knees bent about 20–30° at the start.",
      "Handle height: navel to lower ribs.",
    ],
    mistakes: [
      {
        wrong: "Rocking the torso back and forth to move the handles.",
        fix: "Keep the trunk still. If you cannot, reduce the range, not the posture.",
      },
      {
        wrong: "Rounding the low back at the end of the pull.",
        fix: "Chest up, ribs stacked. A rounded back under load is the classic park rowing injury.",
      },
      {
        wrong: "Shrugging the shoulders toward the ears.",
        fix: "Keep the neck long and pull the blades down and back.",
      },
      {
        wrong: "Pulling with straight wrists bent backward.",
        fix: "Keep the wrist neutral, in line with the forearm.",
      },
    ],
    benefits: [
      {
        claim: "Strengthens the muscles that retract the shoulder blades.",
        tier: 1,
        note: "Standard component of shoulder-health and posture programmes for desk workers.",
      },
      {
        claim: "Balances the pressing stations in the same park.",
        tier: 2,
        note: "A push:pull balance is sensible programming, not a law of nature.",
      },
      {
        claim: "Melts back fat.",
        tier: 3,
        note: "Spot reduction again. Also printed on park boards.",
      },
    ],
    easier: "Single-arm rows with a short range.",
    harder: "Three sets of 12 with a three-second return and a one-second squeeze.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Low-back strain from rocking with a rounded spine", "Biceps tendon irritation"],
      chronic: [
        "Lumbar irritation in people who row with a flexed spine",
        "Elbow tendinopathy from high-volume pulling",
      ],
      warning: [
        "Low-back pain during or just after the set",
        "Pain at the front of the shoulder when the elbow passes the ribs",
      ],
      avoidIf: ["Acute low-back pain", "Current elbow tendon injury"],
    },
    safety: {
      before: [
        "Check the footplate is fixed and does not rock.",
        "Check both handles are attached and the grips are secure.",
        "Check the seat does not slide when loaded.",
      ],
      during: ["Keep the chest up.", "Pull to the navel, not to the chest."],
      stopIf: ["Low-back pain", "The footplate shifts"],
    },
    maintenance: ["Footplate bolts", "Handle attachment", "Seat track and stop", "Grip sleeves"],
    signboard: [
      {
        claim: "Removes back fat",
        verdict: "unsupported",
        note: "Fat loss is systemic. The station strengthens the upper back; it does not remove fat over it.",
      },
      {
        claim: "Cures round shoulders",
        verdict: "partly",
        note: "Stronger retractors help some people, but posture is multifactorial and needs daily habit change.",
      },
      {
        claim: "Good for the lower back",
        verdict: "partly",
        note: "Only with a neutral spine. Performed with a rounded back it is a cause of low-back pain, not a cure.",
      },
    ],
    sources: ["acsm", "en16630", "nhs"],
    confidence: "high",
  },

  {
    id: "rowing-machine",
    name: "Outdoor Rowing Machine",
    aliases: ["park rower", "air rower"],
    category: "upper",
    prevalence: "rare",
    footprint: "2.2 × 0.7 m",
    difficulty: 3,
    summary:
      "Sliding seat and handle. Excellent full-body cardio if you get the sequence right — a back strain if you do not.",
    description:
      "A rail, a sliding seat, footrests and a handle connected to a resistance unit. The stroke order is legs, then body, then arms on the drive, and the reverse on the return. Almost everyone who has not been taught rows arms-first, which loads the low back instead of the legs.",
    muscles: {
      primary: ["quadriceps", "glutes", "latissimus dorsi"],
      secondary: ["hamstrings", "rhomboids", "biceps", "core"],
    },
    joints: ["hip", "knee", "ankle", "shoulder", "elbow", "lumbar spine"],
    howTo: [
      "Set the footrests so the strap crosses the ball of the foot.",
      "Sit tall at the catch: shins near vertical, arms straight, slight forward lean from the hips.",
      "Drive with the legs first, keeping the arms straight and the trunk angle steady.",
      "As the legs finish, swing the trunk back slightly and pull the handle to the lower ribs.",
      "Reverse exactly: arms away, body forward, then bend the knees.",
    ],
    setup: [
      "Footrest height: strap over the ball of the foot, heels free to lift at the catch.",
      "Damper or resistance: middle setting if adjustable.",
    ],
    mistakes: [
      {
        wrong: "Pulling with the arms first.",
        fix: "Legs, body, arms — in that order, every stroke.",
      },
      {
        wrong: "Rounding the back at the catch.",
        fix: "Hinge from the hips with a long spine; the lean comes from the hip, not the waist.",
      },
      {
        wrong: "Yanking the handle to the chin.",
        fix: "Pull to the lower ribs and keep the elbows close.",
      },
      {
        wrong: "Rushing the return.",
        fix: "The recovery should take twice as long as the drive.",
      },
    ],
    benefits: [
      {
        claim: "Full-body cardio with high energy cost when the sequence is right.",
        tier: 1,
        note: "Rowing is a standard cross-training mode for aerobic fitness.",
      },
      {
        claim: "Trains the posterior chain and the pull simultaneously.",
        tier: 2,
        note: "Real, if the legs are actually driving.",
      },
      {
        claim: "Low-impact alternative to running.",
        tier: 1,
        note: "No repeated landing forces, which suits painful knees and ankles.",
      },
    ],
    easier: "Legs-only strokes for one minute — no arm pull at all.",
    harder: "Four minutes continuous at a steady rate, then 6 × 45 s harder with 15 s easy.",
    minutes: {
      adult: {
        perStation: "2–4 min",
        sets: "2–3",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "2 min",
        supervision: "required; teach the leg drive before letting them pull",
      },
    },
    overuse: {
      acute: ["Low-back strain from arms-first rowing", "Wrist and elbow strain from a bent-wrist pull"],
      chronic: [
        "Lumbar flexion injury with repeated poor technique",
        "Biceps tendinopathy from arm-dominant strokes",
      ],
      warning: [
        "Low-back pain that starts mid-set and does not settle",
        "A catch position that feels 'stuck' — usually a hip mobility limit, not a strength limit",
      ],
      avoidIf: ["Acute low-back pain", "Recent abdominal or hernia surgery"],
    },
    safety: {
      before: [
        "Check the seat slides freely and the rail end-stop is intact.",
        "Check the foot straps and buckles.",
        "Check the handle and chain or cable for wear.",
      ],
      during: ["Keep the chain or cable straight.", "Do not row with the rail wet or sandy."],
      stopIf: ["Low-back pain", "The seat jumps the rail"],
    },
    maintenance: ["Seat rollers", "Rail end-stops", "Foot straps", "Handle and cable"],
    signboard: [
      {
        claim: "Burns more calories than any other station",
        verdict: "partly",
        note: "Rowing is metabolically demanding, but the claim depends entirely on how hard and how long you go.",
      },
      {
        claim: "Works 85% of your muscles",
        verdict: "unsupported",
        note: "A marketing number with no defined basis. It is a good full-body movement, not a measured percentage.",
      },
      {
        claim: "Strengthens the back",
        verdict: "partly",
        note: "It trains the back with a neutral spine. Done with a rounded back it does the opposite.",
      },
    ],
    sources: ["who2020", "acsm", "en16630"],
    confidence: "moderate",
  },

  {
    id: "arm-wheel",
    name: "Arm Wheel / Arm Paddle",
    aliases: ["arm bike", "hand wheel", "arm ergometer"],
    category: "upper",
    prevalence: "occasional",
    footprint: "1.2 × 0.7 m",
    difficulty: 2,
    summary:
      "Two cranked wheels you turn by hand. Useful seated cardio, and a good option for people who cannot use their legs.",
    description:
      "Standing or seated versions exist; both ask you to turn two wheels with the arms. Standing versions add a trunk-stability demand, seated versions are genuinely accessible cardio for wheelchair users and people with lower-limb injury. Resistance is fixed, so cadence and duration are the dials.",
    muscles: {
      primary: ["deltoids", "biceps", "triceps"],
      secondary: ["rhomboids", "forearm muscles", "core"],
    },
    joints: ["shoulder", "elbow", "wrist"],
    howTo: [
      "Adjust the wheel height so your shoulders stay relaxed, not shrugged.",
      "Grip both handles and turn the wheels in opposite directions, like pedalling with your hands.",
      "Keep the elbows slightly bent throughout the circle.",
      "Stand tall (or sit tall) and keep the ribs down.",
      "Slow to a stop before releasing the handles.",
    ],
    setup: [
      "Wheel height: hands travel between waist and chest height.",
      "Seated version: seat adjusted so the shoulders stay below ear level.",
    ],
    mistakes: [
      {
        wrong: "Shrugging the shoulders to reach the top of the circle.",
        fix: "Lower the wheels, or shorten the range and stay relaxed.",
      },
      {
        wrong: "Locking the elbows at the bottom.",
        fix: "Keep a soft elbow through the whole turn.",
      },
      {
        wrong: "Turning with the wrists only.",
        fix: "Drive from the shoulders and let the wrist follow.",
      },
      {
        wrong: "Standing with the knees locked and the back arched.",
        fix: "Soften the knees and brace the trunk.",
      },
    ],
    benefits: [
      {
        claim: "Provides aerobic work for people who cannot use their legs.",
        tier: 1,
        note: "Arm ergometry is a standard clinical and adaptive-fitness modality.",
      },
      {
        claim: "Raises heart rate with a small space footprint.",
        tier: 2,
        note: "Smaller muscle mass means heart rate rises for a given effort, but the total work is lower than leg exercise.",
      },
      {
        claim: "Builds arm muscle.",
        tier: 3,
        note: "Fixed low resistance, high repetitions — endurance, not size.",
      },
    ],
    easier: "One wheel at a time, slow and short.",
    harder: "Three minutes continuous with both arms, then intervals at a faster cadence.",
    minutes: {
      adult: {
        perStation: "2–3 min",
        sets: "2 passes",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 min",
        supervision: "required; fingers can catch in the spokes",
      },
    },
    overuse: {
      acute: ["Rotator-cuff strain from shrugging under load", "Forearm and grip fatigue"],
      chronic: [
        "Shoulder overuse in people who use it as their only cardio",
        "Wrist tendon irritation from a bent-wrist grip",
      ],
      warning: ["Shoulder pain that appears at the same point in every circle", "Grip weakness the next day"],
      avoidIf: ["Current rotator-cuff injury", "Recent shoulder surgery"],
    },
    safety: {
      before: [
        "Check the wheel bearings turn freely.",
        "Check the handle attachments.",
        "Check fingers cannot reach the spokes.",
      ],
      during: ["Keep the shoulders down.", "Stand with soft knees if using a standing unit."],
      stopIf: ["Shoulder pain", "Numbness in the fingers"],
    },
    maintenance: ["Wheel bearings", "Handle fixings", "Spoke guards", "Frame anchors"],
    signboard: [
      {
        claim: "Tones the arms and chest",
        verdict: "partly",
        note: "Endurance work at low resistance keeps the arms active; visible change needs load and diet.",
      },
      {
        claim: "Good for heart patients",
        verdict: "partly",
        note: "Arm ergometry is used in cardiac rehab — under supervision and with a prescribed protocol, not unsupervised in a park.",
      },
      {
        claim: "Improves grip strength for daily tasks",
        verdict: "supported",
        note: "Repeated gripping under light load does build grip endurance.",
      },
    ],
    sources: ["who2020", "en16630", "rotator"],
    confidence: "moderate",
  },

  {
    id: "pull-up-bar",
    name: "Chin-up / Pull-up Bar",
    aliases: ["horizontal bar", "chin-up bar", "hanging bar"],
    category: "upper",
    prevalence: "common",
    footprint: "1.6 × 0.6 m",
    difficulty: 4,
    summary:
      "The one station with real strength potential. Also the one most people cannot yet use for a full repetition.",
    description:
      "A high bar between two posts. Nothing else in a park gym loads the lats and grip as heavily, and nothing else exposes the gap between what people think they can do and what they can do. Negatives, hangs and band-assisted work are the honest way in.",
    muscles: {
      primary: ["latissimus dorsi", "biceps", "forearm flexors"],
      secondary: ["rhomboids", "lower trapezius", "core"],
    },
    joints: ["shoulder", "elbow", "wrist", "finger flexors"],
    howTo: [
      "Stand under the bar and check you can hang with the feet clear of the ground.",
      "Take an overhand grip slightly wider than the shoulders.",
      "Hang with straight arms, ribs down, legs together and slightly forward.",
      "Pull the elbows down toward the ribs until the chin clears the bar.",
      "Lower under control to a full hang; do not drop.",
    ],
    setup: [
      "Bar height: you should be able to hang without the feet touching.",
      "Grip: overhand for pull-ups, underhand for chin-ups (easier for most).",
    ],
    mistakes: [
      {
        wrong: "Kipping and swinging to get the chin up.",
        fix: "Strict only. Swinging loads the shoulder in a position it cannot control.",
      },
      {
        wrong: "Half-range reps from a bent-arm start.",
        fix: "Start from a dead hang and finish with the chin over the bar — the full range is the point.",
      },
      {
        wrong: "Jumping to grab the bar from a run-up.",
        fix: "Step up to a reachable height, or use a lower bar. Shoulder injuries come from the grab.",
      },
      {
        wrong: "Dropping from the top.",
        fix: "Lower to a hang, then step down. Landing from a bar is how ankles roll.",
      },
    ],
    benefits: [
      {
        claim: "Builds pulling strength and grip strength more than any other park station.",
        tier: 1,
        note: "Bodyweight pulling is a standard strength benchmark at every age.",
      },
      {
        claim: "Decompresses the spine.",
        tier: 3,
        note: "A hang feels good and temporarily unloads the discs. It does not 'decompress' permanently or add height.",
      },
      {
        claim: "Improves shoulder health.",
        tier: 2,
        note: "Hanging and pulling can help, provided the shoulder is not painful and volume is built gradually.",
      },
    ],
    easier: "Hang for 20–30 s, then do 3–5 negatives (jump or step up, lower for 5 s).",
    harder: "Add a repetition each week, then add a light backpack — never extra plates on the bar.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 3–8 reps",
        sets: "2–3",
        rest: "2 min",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 1–3 reps (or hangs)",
        supervision: "required; no under-12s, no jumping grabs",
      },
    },
    overuse: {
      acute: ["Hand blisters and torn calluses", "Elbow strain from sudden increased volume"],
      chronic: [
        "Elbow tendinopathy (golfer's elbow) from daily pulling",
        "Shoulder irritation from kipping",
      ],
      warning: [
        "Elbow pain on the inner side that persists after training",
        "Shoulder pain at the bottom of the hang",
      ],
      avoidIf: [
        "Current shoulder or elbow injury",
        "Shoulder instability or a history of dislocation",
        "Uncontrolled high blood pressure — a hard hold raises pressure sharply",
      ],
    },
    safety: {
      before: [
        "Check the bar is welded or bolted, not merely resting in brackets.",
        "Check the posts do not rock.",
        "Check the bar surface for rust and burrs — both tear hands.",
      ],
      during: ["Grip with the thumb around the bar.", "Keep the body still; no swinging."],
      stopIf: ["Sharp shoulder or elbow pain", "The bar moves in its mount"],
    },
    maintenance: ["Bar welds and brackets", "Post anchors", "Bar surface rust", "Ground surface under the bar"],
    signboard: [
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "The most-repeated myth in Indian parks. Hanging does not lengthen bones after growth plates close.",
      },
      {
        claim: "Cures back pain",
        verdict: "unsupported",
        note: "Some people find hanging relieves tension; others find it aggravates a painful shoulder. It is not a treatment.",
      },
      {
        claim: "Builds a V-shaped back",
        verdict: "supported",
        note: "Genuinely one of the best bodyweight movements for lat development — if you can do enough volume.",
      },
    ],
    sources: ["acsm", "en16630", "tendon"],
    confidence: "high",
  },

  {
    id: "parallel-bars",
    name: "Parallel Bars / Dips",
    aliases: ["dip bars", "parallel dip station"],
    category: "upper",
    prevalence: "common",
    footprint: "1.4 × 0.8 m",
    difficulty: 4,
    summary:
      "Support and dip station. Excellent for pressing strength, brutal on an unprepared shoulder.",
    description:
      "Two parallel rails at hip height. You support your bodyweight on straight arms, then bend and press back up. The support hold alone is a useful training goal; the full dip is a serious strength movement that most casual park users should build toward rather than start with.",
    muscles: {
      primary: ["pectorals", "triceps", "anterior deltoid"],
      secondary: ["serratus anterior", "core", "forearm flexors"],
    },
    joints: ["shoulder", "elbow", "wrist"],
    howTo: [
      "Stand between the bars, grip both, and press up to a support with straight arms.",
      "Hold the support for 10–20 seconds with the shoulders pressed down, away from the ears.",
      "Bend the elbows and lower only as far as the shoulders stay comfortable — usually to 90°.",
      "Press back up without bouncing, finishing with the shoulders down.",
      "Step down to one side, keeping a hand on a bar.",
    ],
    setup: [
      "Bar width: roughly shoulder width; wider is harder on the shoulders.",
      "Bar height: you should be able to mount without jumping.",
    ],
    mistakes: [
      {
        wrong: "Dipping below 90° at the elbow on a first attempt.",
        fix: "Depth is earned. Deeper dips load the front of the shoulder heavily.",
      },
      {
        wrong: "Letting the shoulders shrug up to the ears in support.",
        fix: "Push the bars down and the shoulders away from the ears.",
      },
      {
        wrong: "Swinging the legs to help.",
        fix: "Cross the ankles and keep the body still; a swinging dip is a shoulder injury waiting.",
      },
      {
        wrong: "Jumping up to the bars.",
        fix: "Mount from a step or from the ground with control.",
      },
    ],
    benefits: [
      {
        claim: "Builds pressing strength through a large range.",
        tier: 1,
        note: "A standard bodyweight strength movement; the support hold is a legitimate beginner goal.",
      },
      {
        claim: "Trains the core isometrically.",
        tier: 2,
        note: "Holding the body still in support is real anti-extension work.",
      },
      {
        claim: "Is safe for the shoulders because it is bodyweight.",
        tier: 3,
        note: "Bodyweight is not the same as low load. Dips are one of the more shoulder-demanding movements in the park.",
      },
    ],
    easier: "Support hold only, 10 s × 3, feet lightly touching the ground if needed.",
    harder: "Full dips for 3 × 5, then slow the lowering to 4 seconds.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 5–10 reps or 3 × 15 s holds",
        sets: "2–3",
        rest: "2 min",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 2–5 reps",
        supervision: "required; support holds only for beginners",
      },
    },
    overuse: {
      acute: ["Anterior shoulder strain from deep dips", "Elbow discomfort at lockout"],
      chronic: [
        "Subacromial irritation with repeated deep dips",
        "Elbow tendinopathy from high-volume pressing",
      ],
      warning: [
        "Pain at the front of the shoulder at the bottom of the dip",
        "A feeling of the shoulder 'sliding' in support",
      ],
      avoidIf: [
        "Shoulder instability or previous dislocation",
        "Current rotator-cuff injury",
        "Acute elbow pain",
      ],
    },
    safety: {
      before: [
        "Check both bars are solid in their mounts and do not rotate.",
        "Check the bar diameter is comfortable to grip.",
        "Check the ground under the bars is level and not slippery.",
      ],
      during: ["Keep the shoulders down.", "Stop at 90° until you have months of consistent work."],
      stopIf: ["Shoulder pain at the bottom", "Any sense of instability"],
    },
    maintenance: ["Bar mounts and welds", "Post anchors", "Bar surface", "Ground surface"],
    signboard: [
      {
        claim: "Builds the chest and arms",
        verdict: "supported",
        note: "One of the few accurate strength claims on a park board.",
      },
      {
        claim: "Suitable for beginners",
        verdict: "unsupported",
        note: "The support hold is beginner-appropriate; full dips are not.",
      },
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "Hanging or dipping does not change bone length in adults.",
      },
    ],
    sources: ["acsm", "en16630", "rotator"],
    confidence: "high",
  },

  {
    id: "push-up-bars",
    name: "Push-up Bars",
    aliases: ["push-up station", "low parallel bars"],
    category: "upper",
    prevalence: "occasional",
    footprint: "1.0 × 0.6 m",
    difficulty: 2,
    summary:
      "Low bars that let you push up with a neutral wrist. Kinder to wrists, harder on the chest.",
    description:
      "Two low bars at ankle-to-knee height. They raise the hands off the ground, which takes the wrist into a neutral position and lets the chest drop below the hands for a deeper push-up. That extra range is where the benefit and the shoulder risk both live.",
    muscles: {
      primary: ["pectorals", "triceps", "anterior deltoid"],
      secondary: ["core", "serratus anterior"],
    },
    joints: ["shoulder", "elbow", "wrist"],
    howTo: [
      "Grip both bars with the hands under the shoulders.",
      "Set a straight line from head to heels, ribs down and glutes engaged.",
      "Lower until the chest is level with the bars — not deeper on a first attempt.",
      "Press back up without letting the hips sag.",
      "Step back and stand; do not collapse onto the bars.",
    ],
    setup: [
      "Bar height: low enough that you can lower the chest to bar level.",
      "Hand position: slightly wider than the shoulders.",
    ],
    mistakes: [
      {
        wrong: "Hips sagging so the low back arches.",
        fix: "Brace the trunk and squeeze the glutes; the body is one line.",
      },
      {
        wrong: "Head dropping toward the ground first.",
        fix: "Chest leads, head follows.",
      },
      {
        wrong: "Lowering until the shoulders feel a pinch.",
        fix: "Stop at chest level. Depth beyond that is for people with the range for it.",
      },
      {
        wrong: "Elbows flared straight out to the sides.",
        fix: "Keep the elbows at about 45° to the torso.",
      },
    ],
    benefits: [
      {
        claim: "Trains a pressing pattern with a neutral wrist.",
        tier: 1,
        note: "Useful for people whose wrists hurt in a floor push-up.",
      },
      {
        claim: "Allows a deeper range than a floor push-up.",
        tier: 2,
        note: "More chest stretch and more shoulder demand — progress the depth slowly.",
      },
      {
        claim: "Builds arm and chest muscle.",
        tier: 2,
        note: "Real, up to the point where bodyweight becomes easy; then you need harder variations.",
      },
    ],
    easier: "Push-ups from the knees, hands on the bars.",
    harder: "Feet elevated on a bench, or a three-second lowering.",
    minutes: {
      adult: {
        perStation: "2–3 sets × 8–12 reps",
        sets: "2–3",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1–2 sets × 5–8 reps",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Wrist strain if the bars are gripped too hard", "Shoulder pinch at the bottom of a deep rep"],
      chronic: [
        "Subacromial irritation from repeatedly going too deep",
        "Elbow tendinopathy from high volume",
      ],
      warning: ["Shoulder pinch at the bottom", "Wrist pain that persists after the set"],
      avoidIf: ["Current shoulder impingement", "Wrist injury"],
    },
    safety: {
      before: [
        "Check the bars are firmly fixed and do not rock.",
        "Check the bar surface is not wet or slippery.",
        "Check the ground has grip — hands and feet both need it.",
      ],
      during: ["Keep the body in one line.", "Stop at chest level on early sets."],
      stopIf: ["Shoulder pinch", "The bars move"],
    },
    maintenance: ["Bar fixings", "Ground grip", "Bar surface rust"],
    signboard: [
      {
        claim: "Works the whole upper body",
        verdict: "partly",
        note: "It is a press: chest, shoulders and triceps. The back does very little.",
      },
      {
        claim: "Easier than floor push-ups",
        verdict: "partly",
        note: "Easier on the wrists, harder through the range. Which one it is depends on the person.",
      },
      {
        claim: "Burns chest fat",
        verdict: "unsupported",
        note: "No.",
      },
    ],
    sources: ["acsm", "en16630"],
    confidence: "moderate",
  },
];
