import type { Equipment } from "../types";

export const playBalanceMulti: Equipment[] = [
  {
    id: "balance-beam",
    name: "Balance Beam",
    aliases: ["walking beam", "low beam"],
    category: "balance",
    prevalence: "common",
    footprint: "2.5 × 0.4 m",
    difficulty: 1,
    summary:
      "A low beam to walk along. The safest balance station in the park, and the most under-used.",
    description:
      "A beam forty to fifty centimetres off the ground. Walking it trains ankle and hip stabilisation, which is the single most protective physical quality against falls as people age. It is the one station where the timid and the elderly get the most benefit per minute — provided it is genuinely low and the surface underneath is not concrete.",
    muscles: {
      primary: ["ankle stabilisers", "glutes", "core"],
      secondary: ["foot intrinsics", "hip abductors"],
    },
    joints: ["ankle", "knee", "hip"],
    howTo: [
      "Check the drop height and the ground surface first. If it is above knee height or over concrete, use the kerb instead.",
      "Step on sideways, holding the rail or a companion's hand if needed.",
      "Walk heel-to-toe with the arms out for balance.",
      "Look at a fixed point ahead, not at your feet.",
      "Step off before the end, not off the end.",
    ],
    setup: [
      "Beam height: mid-calf is right for most adults. Higher is a different risk category.",
      "Footwear: closed shoes. Barefoot only on a clean, dry beam.",
    ],
    mistakes: [
      {
        wrong: "Walking fast to 'test' balance.",
        fix: "Slow is harder and safer. Speed adds fall risk without training benefit.",
      },
      {
        wrong: "Looking down at the feet.",
        fix: "Fix your gaze ahead at eye level; that is the skill being trained.",
      },
      {
        wrong: "Children using it as a playground beam with no adult nearby.",
        fix: "Same supervision rule as any play equipment — an adult within arm's reach.",
      },
      {
        wrong: "Using it in wet footwear or after rain.",
        fix: "Dry beam, dry shoes. Wet metal is the most common cause of a slip here.",
      },
    ],
    benefits: [
      {
        claim: "Trains balance, which reduces fall risk in older adults.",
        tier: 1,
        note: "Balance training is one of the best-evidenced fall-prevention measures.",
      },
      {
        claim: "Strengthens the ankles and feet.",
        tier: 2,
        note: "Real, through the constant small corrections walking a beam demands.",
      },
      {
        claim: "Improves concentration.",
        tier: 3,
        note: "It requires concentration. That is not the same as improving it.",
      },
    ],
    easier: "Walk half the beam holding a rail, then let go for the middle third.",
    harder: "Walk the full length with arms crossed, then backwards (only with a spotter).",
    minutes: {
      adult: {
        perStation: "1–2 min",
        sets: "3–4 passes",
        rest: "—",
      },
      child: {
        band: "6+ supervised",
        perStation: "1–2 min",
        supervision: "adult within arm's reach; low beam only",
      },
    },
    overuse: {
      acute: ["Ankle sprain from stepping off", "Fall from speed or wet footwear"],
      chronic: [
        "Ankle instability after repeated minor rolls",
        "Hip or knee irritation in people who walk it with a limp pattern",
      ],
      warning: ["Any ankle roll", "A feeling of the ankle giving way"],
      avoidIf: [
        "Recent ankle sprain",
        "Significant balance impairment without supervision",
        "Vertigo or uncontrolled dizziness",
      ],
    },
    safety: {
      before: [
        "Check the beam is fixed and does not rotate.",
        "Check the surface under the beam — grass or sand, not concrete.",
        "Check the beam for water, moss or bird droppings.",
      ],
      during: ["Look ahead.", "Keep a hand free if you are unsure."],
      stopIf: ["Dizziness", "The beam moves"],
    },
    maintenance: ["Beam fixings", "Surface coating", "Ground surface under the beam", "Post anchors"],
    signboard: [
      {
        claim: "Improves memory",
        verdict: "unsupported",
        note: "Balance work has cognitive benefits in the long run, but 'improves memory' on a park board is not a claim the station can support.",
      },
      {
        claim: "Improves balance",
        verdict: "supported",
        note: "This is exactly what it does, and it matters more than most park users realise.",
      },
      {
        claim: "Suitable for all ages",
        verdict: "partly",
        note: "It is the most age-inclusive station in the park — with supervision for children and a low beam.",
      },
    ],
    sources: ["who2020", "en16630", "en1176"],
    confidence: "high",
  },

  {
    id: "monkey-bars",
    name: "Monkey Bars",
    aliases: ["monkey ladder", "overhead ladder", "play bars"],
    category: "play",
    prevalence: "common",
    footprint: "2.5 × 0.8 m",
    difficulty: 3,
    summary:
      "Overhead rungs you travel across hand over hand. Real upper-body work, real fall risk.",
    description:
      "A horizontal ladder of rungs at adult height. Travelling it builds grip and pulling endurance, and falling from it from full height is the most serious injury in a park gym. It is play equipment installed under fitness-equipment assumptions, which is the mismatch worth knowing about.",
    muscles: {
      primary: ["forearm flexors", "latissimus dorsi", "shoulders"],
      secondary: ["core", "biceps"],
    },
    joints: ["shoulder", "elbow", "wrist", "finger flexors"],
    howTo: [
      "Check the drop and the surface underneath before touching the first rung.",
      "Hang with both hands, then move one hand to the next rung.",
      "Keep the body long and still — no swinging.",
      "Travel one rung at a time; do not skip rungs.",
      "Drop only when the feet are low relative to the bar, and land with bent knees.",
    ],
    setup: [
      "Height: rungs should be reachable from the ground or a low step, never by jumping.",
      "Bar diameter: small bars are harder on the grip; use chalk if available.",
    ],
    mistakes: [
      {
        wrong: "Jumping to grab the first rung.",
        fix: "Start from a reachable position. Jump-grabs are where shoulder injuries and falls begin.",
      },
      {
        wrong: "Swinging the legs to build momentum.",
        fix: "Still body, one rung at a time.",
      },
      {
        wrong: "Children under 8 using it unsupervised.",
        fix: "Adult within arm's reach, and only if the child can hang for ten seconds.",
      },
      {
        wrong: "Dropping from the middle of the ladder.",
        fix: "Travel to the end or lower yourself; a drop from full height is a fall.",
      },
    ],
    benefits: [
      {
        claim: "Builds grip and pulling endurance.",
        tier: 1,
        note: "Hanging and travelling are genuine bodyweight pulling work.",
      },
      {
        claim: "Develops coordination and upper-body confidence in children.",
        tier: 2,
        note: "Play-based climbing develops motor competence, which is why the station exists.",
      },
      {
        claim: "Increases height.",
        tier: 3,
        note: "Hanging does not lengthen bones. This claim appears on monkey bar frames across India.",
      },
    ],
    easier: "Hang for 10 seconds and drop; travel one rung at a time.",
    harder: "Travel the full length without stopping, then add a second pass.",
    minutes: {
      adult: {
        perStation: "1–2 min",
        sets: "2–3 passes",
        rest: "60 s",
      },
      child: {
        band: "8+ supervised",
        perStation: "1 min",
        supervision: "adult within arm's reach; no under-8s",
      },
    },
    overuse: {
      acute: ["Hand blisters and torn calluses", "Shoulder strain from a jump-grab", "Fall injury"],
      chronic: [
        "Elbow tendinopathy from high-volume hanging",
        "Recurrent shoulder irritation",
      ],
      warning: ["Any shoulder pain at the bottom of a hang", "Torn skin on the palm — stop for the day"],
      avoidIf: [
        "Children under 8",
        "Shoulder instability or previous dislocation",
        "Anyone who cannot hang for ten seconds",
      ],
    },
    safety: {
      before: [
        "Check every rung is welded and none rotate.",
        "Check the posts and the ground surface underneath.",
        "Check for burrs and rust on the rungs.",
      ],
      during: ["Grip with the thumb around the bar.", "No swinging, no skipping rungs."],
      stopIf: ["Shoulder pain", "A rung moves"],
    },
    maintenance: ["Rung welds", "Post anchors", "Rung surface rust and burrs", "Fall surface underneath"],
    signboard: [
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "The most common claim on Indian monkey bar frames. It is false.",
      },
      {
        claim: "Builds arm strength",
        verdict: "supported",
        note: "Grip and pulling endurance, yes — for anyone who can already hang.",
      },
      {
        claim: "Safe for children",
        verdict: "unsupported",
        note: "It is play equipment installed to fitness-equipment standards. Fall height and surfacing are usually not to EN 1176.",
      },
    ],
    sources: ["en1176", "en16630", "acsm"],
    confidence: "high",
  },

  {
    id: "climbing-net",
    name: "Climbing Net / Wall",
    aliases: ["climbing frame", "rope net", "climbing wall"],
    category: "play",
    prevalence: "occasional",
    footprint: "2.0 × 0.9 m",
    difficulty: 3,
    summary:
      "Rope or welded net for climbing. Excellent for children, and the station most dependent on surfacing.",
    description:
      "A net strung between posts, sometimes at an angle. Climbing develops coordination, grip and confidence, and falls from height are the risk that defines the station. There is no fitness benefit here that justifies an adult using it as a workout — it is play equipment, and it should be judged as such.",
    muscles: {
      primary: ["forearm flexors", "latissimus dorsi", "hip flexors"],
      secondary: ["core", "calves", "shoulders"],
    },
    joints: ["shoulder", "elbow", "wrist", "hip", "knee", "ankle"],
    howTo: [
      "Check the ground surface and the net's anchor points first.",
      "Start at the bottom, hands and feet on separate squares.",
      "Move one limb at a time, keeping three points of contact.",
      "Climb only as high as you are willing to fall from.",
      "Climb down, do not jump down.",
    ],
    setup: [
      "Footwear: closed shoes, laces tied.",
      "No loose clothing or drawstrings that can catch in the net.",
    ],
    mistakes: [
      {
        wrong: "Two children on the net at once.",
        fix: "One at a time. Entanglement and collisions are the main injuries here.",
      },
      {
        wrong: "Climbing in sandals or barefoot.",
        fix: "Closed shoes only; toes catch in the mesh.",
      },
      {
        wrong: "Jumping off from height.",
        fix: "Climb down. Falls from the top are the injury this station produces.",
      },
      {
        wrong: "Adults using it as a workout station.",
        fix: "It is play equipment. Use the pull-up bar for pulling work.",
      },
    ],
    benefits: [
      {
        claim: "Develops coordination, grip and confidence in children.",
        tier: 1,
        note: "Climbing is a core movement competence in childhood physical development.",
      },
      {
        claim: "Builds upper-body endurance.",
        tier: 2,
        note: "True, incidentally, for children who climb regularly.",
      },
      {
        claim: "Treats fear of heights.",
        tier: 3,
        note: "Gradual exposure helps some children, but a park net is not a therapeutic programme.",
      },
    ],
    easier: "Climb two squares up and back down.",
    harder: "Climb to the top and across, always with an adult spotting.",
    minutes: {
      adult: {
        perStation: "2–3 min",
        sets: "1–2",
        rest: "—",
      },
      child: {
        band: "6+ supervised",
        perStation: "2 min",
        supervision: "constant; one child at a time",
      },
    },
    overuse: {
      acute: ["Fall injury", "Finger entrapment in the mesh", "Rope burn"],
      chronic: ["Grip and forearm overuse in children who climb daily", "Ankle sprains from landing"],
      warning: ["Any fall from height — stop for the day", "Finger pain or swelling after climbing"],
      avoidIf: [
        "Children under 6",
        "Anyone with a shoulder or finger injury",
        "Wet or damaged netting",
      ],
    },
    safety: {
      before: [
        "Check the net for broken strands, fraying and loose anchors.",
        "Check the ground surface — sand, rubber or grass, never concrete.",
        "Check for entrapment gaps at the anchor points.",
      ],
      during: ["One child at a time.", "Three points of contact."],
      stopIf: ["A strand breaks", "A child is frightened — come down, do not coax upward"],
    },
    maintenance: ["Net strands and knots", "Anchor plates", "Post stability", "Fall surface depth"],
    signboard: [
      {
        claim: "Builds strong bones",
        verdict: "unsupported",
        note: "Weight-bearing activity supports bone health in children generally, but climbing nets are not a bone-density intervention.",
      },
      {
        claim: "Improves height",
        verdict: "unsupported",
        note: "No.",
      },
      {
        claim: "Develops coordination",
        verdict: "supported",
        note: "Genuinely one of the best coordination activities available to children.",
      },
    ],
    sources: ["en1176", "who2020", "en16630"],
    confidence: "moderate",
  },

  {
    id: "multi-gym",
    name: "Multi-Gym Combo",
    aliases: ["combination station", "5-in-1 gym", "multi station"],
    category: "multi",
    prevalence: "common",
    footprint: "3.0 × 2.0 m",
    difficulty: 3,
    summary:
      "One frame bundling press, pull, leg and core stations. Convenient, and the hardest to inspect.",
    description:
      "A single welded frame carrying three to six stations: usually a pull-up bar, a chest press, a leg press or extension, and a sit-up board. It is what most Indian parks install when they have one corner of space. The advantage is compactness; the disadvantage is that one loose anchor affects every station on the frame, and the setup of one station often conflicts with another.",
    muscles: {
      primary: ["varies by station — chest, back, legs, core"],
      secondary: ["varies"],
    },
    joints: ["shoulder", "elbow", "hip", "knee", "ankle", "lumbar spine"],
    howTo: [
      "Walk the whole frame before starting: check every station you intend to use.",
      "Set up each station separately — seat height for the press, pad height for the leg station.",
      "Work through stations in order, alternating upper and lower body.",
      "Wipe each seat and handle before and after use.",
      "Finish with the station closest to the ground, so you are not tired on the highest one.",
    ],
    setup: [
      "Each sub-station has its own seat and pad adjustments — set them one at a time.",
      "Check that adjusting one station does not loosen another.",
    ],
    mistakes: [
      {
        wrong: "Using three stations at once with a group, without checking settings between users.",
        fix: "Reset the seat and pads between people. Most combo injuries are setup errors.",
      },
      {
        wrong: "Assuming a sound frame means sound stations.",
        fix: "Check each sub-station's welds and pins separately.",
      },
      {
        wrong: "Doing a full circuit at maximum effort on every station.",
        fix: "Two sets per station at moderate effort; the frame is for a circuit, not a max-out.",
      },
      {
        wrong: "Children playing on the frame while adults train.",
        fix: "Keep children off while stations are in use — moving arms and counterweights are at head height.",
      },
    ],
    benefits: [
      {
        claim: "Delivers a full-body circuit in a small footprint.",
        tier: 1,
        note: "Useful where park space is limited — which is most Indian parks.",
      },
      {
        claim: "Makes a complete session possible without moving between stations.",
        tier: 2,
        note: "Convenience improves adherence, which is the real determinant of benefit.",
      },
      {
        claim: "Is equivalent to a gym.",
        tier: 3,
        note: "It is not. Fixed paths, bodyweight resistance, no progression beyond repetitions.",
      },
    ],
    easier: "Two stations, one set each, at half range.",
    harder: "Full circuit of 6–8 stations, two sets each, with a slow return on every rep.",
    minutes: {
      adult: {
        perStation: "8–12 min total across the frame",
        sets: "1–2 sets per sub-station",
        rest: "60 s between stations",
      },
      child: {
        band: "12+ supervised only",
        perStation: "5 min total",
        supervision: "required; keep to the lowest stations",
      },
    },
    overuse: {
      acute: ["Setup errors causing joint pain", "Pinch points between moving arms"],
      chronic: [
        "Overuse of one sub-station because it is the only one set up correctly",
        "Low-back strain from the leg station on a shared frame",
      ],
      warning: [
        "Pain that appears on one specific sub-station",
        "Any station that moves when another is used",
      ],
      avoidIf: [
        "Any visible frame damage — use a different station",
        "Children under 12",
      ],
    },
    safety: {
      before: [
        "Check the frame anchors and every weld you can see.",
        "Check each sub-station's pins and pads.",
        "Check for pinch points between moving parts.",
      ],
      during: ["Reset settings between users.", "Keep children clear of moving arms."],
      stopIf: ["The frame rocks", "Any station moves independently of the frame"],
    },
    maintenance: [
      "Frame anchor bolts — one loose anchor affects every station",
      "Sub-station pins and locking mechanisms",
      "Padding on seats and backrests",
      "Pinch-point guards",
    ],
    signboard: [
      {
        claim: "5-in-1 full body workout",
        verdict: "partly",
        note: "It does cover the body, but each station is a light, fixed-path version of the real thing.",
      },
      {
        claim: "Replaces a gym membership",
        verdict: "unsupported",
        note: "No progression, no free weights, no adjustable resistance. It complements a gym; it does not replace one.",
      },
      {
        claim: "Suitable for the whole family",
        verdict: "partly",
        note: "Adults and supervised teenagers, yes. Children, no — the frame is sized for adults.",
      },
    ],
    sources: ["en16630", "acsm", "who2020"],
    confidence: "moderate",
  },
];
