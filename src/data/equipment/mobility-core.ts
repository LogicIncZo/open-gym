import type { Equipment } from "../types";

export const mobilityCore: Equipment[] = [
  {
    id: "pendulum",
    name: "Pendulum / Leg Swing",
    aliases: ["hip swing", "leg pendulum", "hip machine"],
    category: "mobility",
    prevalence: "occasional",
    footprint: "1.2 × 0.8 m",
    difficulty: 1,
    summary:
      "Hanging leg pendulum with handrails. A warm-up station, not a workout.",
    description:
      "One leg rests on a swinging arm and you swing it forward and back while holding the rails. The range is set by the arm, not by your effort, which makes it a genuine mobility warm-up for the hips — and a genuine way to irritate a hip that is already unhappy if you swing past comfortable range.",
    muscles: {
      primary: ["hip flexors", "hamstrings", "glutes"],
      secondary: ["adductors", "core"],
    },
    joints: ["hip", "knee"],
    howTo: [
      "Hold both rails and place one foot on the swinging arm.",
      "Stand tall on the supporting leg, pelvis level.",
      "Swing the leg forward and back at a slow, even pace.",
      "Keep the range inside where the hip feels free — never into a pinch.",
      "Switch sides after the set; the time should be equal on both.",
    ],
    setup: [
      "Rail height: elbows slightly bent, shoulders relaxed.",
      "Foot rest height: comfortable, without lifting the pelvis.",
    ],
    mistakes: [
      {
        wrong: "Swinging as high as the machine allows.",
        fix: "Range is set by comfort, not by the frame. A pinch at the front of the hip means you have gone too far.",
      },
      {
        wrong: "Letting the pelvis rotate and the low back arch.",
        fix: "Keep the pelvis level and the trunk still; the leg moves, the body does not.",
      },
      {
        wrong: "Swinging fast to 'loosen up'.",
        fix: "Slow and controlled. Fast end-range swinging is how hips get angry.",
      },
      {
        wrong: "Using it as a strength station.",
        fix: "It is a warm-up. Strength work belongs on the leg press or stepper.",
      },
    ],
    benefits: [
      {
        claim: "Raises hip range of motion as part of a warm-up.",
        tier: 1,
        note: "Dynamic range-of-motion work before activity is well supported.",
      },
      {
        claim: "Reduces hip stiffness after sitting.",
        tier: 2,
        note: "Commonly reported and plausible; effects are short-lived.",
      },
      {
        claim: "Cures sciatica.",
        tier: 3,
        note: "No station cures nerve pain. Swinging can aggravate it.",
      },
    ],
    easier: "A small swing with the hands taking some weight on the rails.",
    harder: "Longer, slower swings with the pelvis held level, 90 seconds per side.",
    minutes: {
      adult: {
        perStation: "1–2 min per side",
        sets: "1–2",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 min",
        supervision: "required; no swinging contests",
      },
    },
    overuse: {
      acute: ["Hip impingement pain from swinging past comfortable range", "Low-back strain from an arched trunk"],
      chronic: [
        "Hip-flexor irritation with repeated end-range swinging",
        "Groin strain in people who swing across the body",
      ],
      warning: [
        "A pinch at the front of the hip during the swing",
        "Groin pain that appears the next morning",
      ],
      avoidIf: [
        "Femoroacetabular impingement or a known labral tear",
        "Recent hip replacement",
      ],
    },
    safety: {
      before: [
        "Check the swing arm moves freely and does not wobble sideways.",
        "Check the rails are secure.",
        "Check the footrest surface.",
      ],
      during: ["Hold both rails.", "Keep the trunk still and the pelvis level."],
      stopIf: ["A pinch at the front of the hip", "The arm swings unevenly"],
    },
    maintenance: ["Swing-arm pivot", "Rail fixings", "Footrest surface", "Base anchors"],
    signboard: [
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "Leg swinging does not lengthen bones.",
      },
      {
        claim: "Improves hip flexibility",
        verdict: "supported",
        note: "As a warm-up, yes — within the range the machine permits.",
      },
      {
        claim: "Reduces hip fat",
        verdict: "unsupported",
        note: "No.",
      },
    ],
    sources: ["nhs", "en16630"],
    confidence: "moderate",
  },

  {
    id: "twister",
    name: "Twister",
    aliases: ["waist twister", "rotating disc", "hip twister"],
    category: "mobility",
    prevalence: "common",
    footprint: "1.0 × 1.0 m",
    difficulty: 2,
    summary:
      "Rotating disc with a waist-height wheel. Rotation mobility, and the station with the clearest contraindication.",
    description:
      "You stand on a rotating disc, hold a wheel at waist height and turn the hips side to side. It is the most over-claimed station in the park — boards promise waist reduction — and the one where loaded spinal rotation most reliably produces back pain in people who already have it.",
    muscles: {
      primary: ["obliques", "hip rotators"],
      secondary: ["erector spinae", "glutes"],
    },
    joints: ["lumbar spine", "hip", "knee"],
    howTo: [
      "Stand on the disc with feet shoulder-width apart.",
      "Hold the wheel with both hands at waist height.",
      "Turn the hips slowly to one side, letting the upper body follow.",
      "Return through the centre and turn to the other side.",
      "Keep the movement inside a range where the low back stays comfortable.",
    ],
    setup: [
      "Wheel height: waist level, elbows bent.",
      "Feet: evenly placed, knees soft.",
    ],
    mistakes: [
      {
        wrong: "Rotating as far as the disc allows at speed.",
        fix: "Slow, partial range. The disc has no stop; your spine does.",
      },
      {
        wrong: "Keeping the hips still and twisting the shoulders.",
        fix: "The disc turns because the hips turn. If the shoulders lead, you are twisting the spine under load.",
      },
      {
        wrong: "Locking the knees.",
        fix: "Soften them; a locked knee transfers rotation straight into the lumbar spine.",
      },
      {
        wrong: "Using it for minutes at a time to 'melt' the waist.",
        fix: "It will not. One to two minutes as part of a warm-up is the intended use.",
      },
    ],
    benefits: [
      {
        claim: "Trains trunk rotation through a controlled range.",
        tier: 2,
        note: "Rotation is a real movement quality; the machine's value is that it constrains the path.",
      },
      {
        claim: "Warms up the hips and low back before activity.",
        tier: 2,
        note: "Reasonable as a warm-up for people without back pain.",
      },
      {
        claim: "Reduces waist size.",
        tier: 3,
        note: "The single most common false claim on Indian park boards. Rotation does not burn abdominal fat.",
      },
    ],
    easier: "Half-range turns with the hands off the wheel.",
    harder: "Slower turns with a two-second pause at each end of the range.",
    minutes: {
      adult: {
        perStation: "1–2 min",
        sets: "1–2",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 min",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Acute low-back strain from fast end-range rotation", "Sciatic symptoms in people with a disc history"],
      chronic: [
        "Recurrent lumbar pain with daily loaded rotation",
        "Hip-labrum irritation in people with impingement",
      ],
      warning: [
        "Pain that travels down a leg during or after rotation",
        "Low-back pain that appears within the first few turns",
      ],
      avoidIf: [
        "Pregnancy — loaded spinal rotation is not appropriate",
        "Acute low-back pain or a current disc episode",
        "Known hip impingement or labral tear",
      ],
    },
    safety: {
      before: [
        "Check the disc turns smoothly and does not wobble.",
        "Check the wheel is firmly attached to its post.",
        "Check the disc surface for wear and water.",
      ],
      during: ["Turn from the hips, not the shoulders.", "Keep the knees soft."],
      stopIf: ["Pain radiating into a leg", "Dizziness during rotation"],
    },
    maintenance: ["Disc bearing", "Wheel mount", "Disc surface grip", "Post base"],
    signboard: [
      {
        claim: "Reduces waist and belly fat",
        verdict: "unsupported",
        note: "Rotation is not fat loss. Every twister board in the country says otherwise.",
      },
      {
        claim: "Improves digestion",
        verdict: "unsupported",
        note: "No mechanical basis. Digestion is not assisted by waist rotation.",
      },
      {
        claim: "Improves spinal mobility",
        verdict: "partly",
        note: "It moves the spine, but loaded end-range rotation is not the best way to gain mobility — and can cost you.",
      },
    ],
    sources: ["en16630", "nhs", "tendon"],
    confidence: "moderate",
  },

  {
    id: "waist-bend",
    name: "Waist Bend",
    aliases: ["side bend station", "lateral flexor"],
    category: "mobility",
    prevalence: "occasional",
    footprint: "1.0 × 0.8 m",
    difficulty: 2,
    summary:
      "Standing side-bend against a curved frame. Mild lateral mobility, marketed as a waist trimmer.",
    description:
      "A frame with curved arms lets you lean sideways and hold, stretching the side of the trunk. The movement is small and the marketing is large: these stations are almost always labelled as waist-reduction equipment. They are not. Used gently they are a tolerable lateral stretch; used as a workout they irritate the low back.",
    muscles: {
      primary: ["obliques", "quadratus lumborum"],
      secondary: ["latissimus dorsi", "hip abductors"],
    },
    joints: ["lumbar spine", "shoulder", "hip"],
    howTo: [
      "Stand with feet hip-width apart, one hand on the frame.",
      "Reach the other arm overhead and lean away from the frame.",
      "Hold a mild stretch for 15–20 seconds, breathing normally.",
      "Return to standing and repeat on the other side.",
      "Keep the hips level — the lean is in the trunk, not a hip shift.",
    ],
    setup: ["Frame height: comfortable to hold with a straight arm.", "Feet: hip-width, knees soft."],
    mistakes: [
      {
        wrong: "Leaning and bouncing.",
        fix: "Hold still. Bouncing at end-range is how side strains happen.",
      },
      {
        wrong: "Pushing the hips out to the side to get more range.",
        fix: "Keep the pelvis level; the stretch is above the hips.",
      },
      {
        wrong: "Holding for a minute or more.",
        fix: "15–20 seconds is enough for a static stretch.",
      },
      {
        wrong: "Using it every day for 'waist reduction'.",
        fix: "It does not reduce anything. Twice a week as part of a warm-up is plenty.",
      },
    ],
    benefits: [
      {
        claim: "Stretches the lateral trunk and hip.",
        tier: 2,
        note: "A mild static stretch; useful if your trunk feels stiff after sitting.",
      },
      {
        claim: "Improves side-bending range.",
        tier: 2,
        note: "True within the short term — range gains from static stretching last minutes, not days.",
      },
      {
        claim: "Burns side fat.",
        tier: 3,
        note: "No station burns fat from the area you are moving.",
      },
    ],
    easier: "Small lean with the arm at the side.",
    harder: "Reach overhead and hold for 25 seconds, hips level.",
    minutes: {
      adult: {
        perStation: "1 min per side",
        sets: "1–2",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "30–60 s",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Side strain from bouncing at end-range", "Low-back pain from hip-shifted leaning"],
      chronic: [
        "Quadratus lumborum irritation with daily use",
        "Lumbar side-flexion irritation in people with existing back pain",
      ],
      warning: ["Sharp pain in the side of the waist", "Low-back ache that starts during the hold"],
      avoidIf: ["Acute low-back pain", "Recent rib or abdominal injury"],
    },
    safety: {
      before: ["Check the frame arms are secure.", "Check the ground is level."],
      during: ["Breathe normally.", "Keep the hips level."],
      stopIf: ["Sharp side pain", "Dizziness"],
    },
    maintenance: ["Frame welds", "Base anchors", "Surface grip"],
    signboard: [
      {
        claim: "Reduces waist size",
        verdict: "unsupported",
        note: "The most confident claim on the least effective station.",
      },
      {
        claim: "Improves flexibility",
        verdict: "partly",
        note: "It produces a short-term stretch. Lasting range needs a broader mobility routine.",
      },
      {
        claim: "Strengthens the core",
        verdict: "unsupported",
        note: "A held side bend at bodyweight is a stretch, not a strengthening stimulus.",
      },
    ],
    sources: ["nhs", "en16630"],
    confidence: "moderate",
  },

  {
    id: "stretch-station",
    name: "Stretch Station",
    aliases: ["multi-stretch frame", "stretching bars"],
    category: "mobility",
    prevalence: "occasional",
    footprint: "1.4 × 0.8 m",
    difficulty: 1,
    summary:
      "A frame of bars at different heights. The best-value station in the park if you use it as intended.",
    description:
      "Several horizontal bars at calf, thigh, waist and chest height, plus a footrest. You put a heel on a bar, hold another, and hold a stretch. It is the least glamorous and most useful station for anyone over 40 — and the one where people most often stretch cold, hard and fast, which is the wrong way round.",
    muscles: {
      primary: ["hamstrings", "calves", "hip flexors", "chest"],
      secondary: ["glutes", "adductors", "shoulders"],
    },
    joints: ["hip", "knee", "ankle", "shoulder", "thoracic spine"],
    howTo: [
      "Warm up for three to five minutes first — walk, then use a cardio station briefly.",
      "Place a heel on a bar at or below hip height, knee straight but not locked.",
      "Hold a higher bar with both hands and hinge forward from the hips until you feel a mild stretch.",
      "Hold 20–30 seconds, breathing normally; do not bounce.",
      "Change height and repeat for the calves, hip flexors and chest.",
    ],
    setup: [
      "Bar height: start at knee height for hamstrings, work up over weeks.",
      "Keep the standing foot pointing forward.",
    ],
    mistakes: [
      {
        wrong: "Stretching cold, first thing after arriving.",
        fix: "Walk for five minutes first. Static stretching a cold muscle is the least productive use of this station.",
      },
      {
        wrong: "Putting the heel on the highest bar on day one.",
        fix: "Start low. Range is earned over weeks, not forced in one session.",
      },
      {
        wrong: "Bouncing to get deeper.",
        fix: "Hold still and breathe out into the stretch.",
      },
      {
        wrong: "Rounding the back to reach the foot.",
        fix: "Hinge from the hip with a long spine; the stretch is in the hamstring, not the low back.",
      },
    ],
    benefits: [
      {
        claim: "Maintains hamstring and calf length, which declines with age and sitting.",
        tier: 1,
        note: "Regular stretching maintains range of motion; it does not prevent all injuries.",
      },
      {
        claim: "Reduces stiffness after walking.",
        tier: 2,
        note: "Commonly reported; the effect is short-lived but real enough to be worth the two minutes.",
      },
      {
        claim: "Prevents injury.",
        tier: 3,
        note: "Static stretching before activity does not reliably prevent injury. Warming up does.",
      },
    ],
    easier: "Knee-height bar, small hinge, 20-second holds.",
    harder: "Progressively higher bars over weeks, plus a calf stretch on the footrest.",
    minutes: {
      adult: {
        perStation: "1–2 min per position",
        sets: "3–4 positions",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 min",
        supervision: "required; no forcing range",
      },
    },
    overuse: {
      acute: ["Hamstring strain from forcing range on a cold muscle", "Low-back strain from rounding to reach"],
      chronic: [
        "Hamstring origin irritation with aggressive daily stretching",
        "Overstretching in hypermobile people, who lose stability rather than gain it",
      ],
      warning: [
        "A sharp pull at the back of the thigh",
        "Nerve-like tingling down the leg during a hamstring stretch",
      ],
      avoidIf: [
        "Acute hamstring strain",
        "Hypermobility syndromes — static end-range stretching is usually counterproductive",
      ],
    },
    safety: {
      before: ["Check bars are welded and the frame is anchored.", "Warm up first."],
      during: ["Breathe out into the stretch.", "Keep the spine long."],
      stopIf: ["Sharp pull or tingling", "The frame rocks"],
    },
    maintenance: ["Bar welds", "Frame anchors", "Footrest surface", "Bar rust"],
    signboard: [
      {
        claim: "Prevents all injuries",
        verdict: "unsupported",
        note: "Warming up and progressive loading prevent more injuries than static stretching does.",
      },
      {
        claim: "Increases height",
        verdict: "unsupported",
        note: "Stretching does not lengthen bones.",
      },
      {
        claim: "Improves flexibility",
        verdict: "supported",
        note: "Held regularly, it does maintain and improve range of motion.",
      },
    ],
    sources: ["nhs", "who2020", "en16630"],
    confidence: "moderate",
  },

  {
    id: "shoulder-wheel",
    name: "Shoulder Wheel",
    aliases: ["arm wheel", "shoulder circle", "rehab wheel"],
    category: "mobility",
    prevalence: "occasional",
    footprint: "1.2 × 0.8 m",
    difficulty: 2,
    summary:
      "Vertical wheel turned by hand. Genuine shoulder rehabilitation tool, used badly as a workout.",
    description:
      "A large wheel on a post with a handle offset from the centre. Turning it takes the shoulder through a full circle under light load. It is a classic physiotherapy device for frozen shoulder and post-injury range work — which means it should be used gently and within a pain-free arc, not for repetitions.",
    muscles: {
      primary: ["rotator cuff", "deltoids"],
      secondary: ["scapular stabilisers", "thoracic spine"],
    },
    joints: ["shoulder", "scapulothoracic joint"],
    howTo: [
      "Stand side-on to the wheel with the handle at shoulder height.",
      "Hold the handle with a relaxed grip, arm almost straight.",
      "Turn the wheel slowly through a full circle, letting the shoulder follow.",
      "Reverse direction after 8–10 circles.",
      "Stay inside a pain-free arc — a painful range is not being 'worked through'.",
    ],
    setup: [
      "Wheel height: handle at shoulder level for the working arm.",
      "Distance: close enough to keep the elbow slightly bent.",
    ],
    mistakes: [
      {
        wrong: "Forcing through a painful arc.",
        fix: "Stop before pain. In shoulder rehab, pain is a boundary, not a target.",
      },
      {
        wrong: "Shrugging the shoulder as the arm goes overhead.",
        fix: "Keep the shoulder down and let the scapula rotate naturally.",
      },
      {
        wrong: "Going fast for a 'workout'.",
        fix: "Slow circles. This is a range and control tool.",
      },
      {
        wrong: "Leaning the body weight into the wheel.",
        fix: "Stand upright with the trunk still.",
      },
    ],
    benefits: [
      {
        claim: "Restores and maintains shoulder range of motion.",
        tier: 1,
        note: "Wheel-assisted range work is standard in shoulder rehabilitation.",
      },
      {
        claim: "Gentle loading for a stiff shoulder.",
        tier: 2,
        note: "Useful for frozen shoulder and post-immobilisation stiffness, ideally with a physiotherapist's protocol.",
      },
      {
        claim: "Builds shoulder muscle.",
        tier: 3,
        note: "The load is far too light. This is a mobility station.",
      },
    ],
    easier: "Half circles within the comfortable arc.",
    harder: "Full circles in both directions, then a slower tempo with a straighter arm.",
    minutes: {
      adult: {
        perStation: "1–2 min per arm",
        sets: "2",
        rest: "—",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 min",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Shoulder impingement pain from pushing through the painful arc", "Neck strain from shrugging"],
      chronic: [
        "Rotator-cuff irritation with daily end-range circling",
        "Aggravation of an unstable shoulder",
      ],
      warning: ["Pain at the top of the shoulder circle", "A catching or clunking sensation that is new"],
      avoidIf: ["Acute shoulder injury", "Shoulder instability or recent dislocation"],
    },
    safety: {
      before: ["Check the wheel spins freely and the handle is secure.", "Check the post is anchored."],
      during: ["Slow circles.", "Keep the shoulder down."],
      stopIf: ["Painful arc", "The wheel catches"],
    },
    maintenance: ["Wheel bearing", "Handle fixing", "Post anchor", "Grip surface"],
    signboard: [
      {
        claim: "Cures frozen shoulder",
        verdict: "partly",
        note: "Range work helps, but frozen shoulder needs a staged programme over months, usually with a physiotherapist.",
      },
      {
        claim: "Builds shoulder strength",
        verdict: "unsupported",
        note: "Light, unloaded circling does not build strength.",
      },
      {
        claim: "Improves posture",
        verdict: "partly",
        note: "Better shoulder range can help you sit and stand more comfortably; it is not a posture cure.",
      },
    ],
    sources: ["nhs", "rotator", "en16630"],
    confidence: "moderate",
  },

  {
    id: "sit-up-board",
    name: "Sit-up Board",
    aliases: ["ab board", "inclined sit-up bench", "abdominal board"],
    category: "core",
    prevalence: "common",
    footprint: "1.4 × 0.7 m",
    difficulty: 3,
    summary:
      "Inclined board with foot hooks. Trains the hip flexors more than the abs, and the low back pays for volume.",
    description:
      "An inclined or flat board with hooks for the feet. Repeated full sit-ups on it are the classic park core routine and the classic cause of low-back and neck complaints: anchored feet turn the movement into a hip-flexor exercise, and the spinal flexion under load is exactly what many backs dislike.",
    muscles: {
      primary: ["rectus abdominis", "hip flexors"],
      secondary: ["obliques", "transverse abdominis"],
    },
    joints: ["lumbar spine", "hip", "cervical spine"],
    howTo: [
      "Set the foot hooks so the knees are bent about 90°.",
      "Lie back with the low back supported and hands across the chest (not behind the head).",
      "Curl the ribs toward the pelvis, lifting the shoulder blades off the board.",
      "Pause, then lower slowly until the shoulder blades touch.",
      "Keep the range short — a curl, not a full sit-up.",
    ],
    setup: [
      "Foot hook height: knees at 90° when the feet are hooked.",
      "Incline: start flat or low; higher incline means more hip-flexor load.",
    ],
    mistakes: [
      {
        wrong: "Pulling on the neck with the hands.",
        fix: "Hands across the chest or lightly touching the ears — never laced behind the head.",
      },
      {
        wrong: "Doing full sit-ups from the bottom.",
        fix: "Curl the shoulder blades only. The last part of a sit-up is hip flexor work and spinal load.",
      },
      {
        wrong: "Swinging up with momentum.",
        fix: "Slow up, slower down. Momentum is how necks and backs get hurt.",
      },
      {
        wrong: "Chasing high repetition counts.",
        fix: "Two sets of 8–12 slow curls. Abdominal endurance is not built by 50 rushed reps.",
      },
    ],
    benefits: [
      {
        claim: "Trains trunk flexion and abdominal endurance.",
        tier: 1,
        note: "Abdominal endurance is associated with lower injury risk; the movement choice matters less than consistency.",
      },
      {
        claim: "Improves posture.",
        tier: 2,
        note: "A stronger trunk can support posture, but sit-ups alone rarely change it.",
      },
      {
        claim: "Burns belly fat — the six-pack station.",
        tier: 3,
        note: "The most persistent myth in every park. Abdominal exercise does not remove abdominal fat.",
      },
    ],
    easier: "Heel slides and shoulder-blade lifts with the feet on the board, not hooked.",
    harder: "Slower lowering (4 seconds) or a longer lever with arms overhead.",
    minutes: {
      adult: {
        perStation: "2 sets × 8–12 reps",
        sets: "2",
        rest: "60 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 set × 5–8 reps",
        supervision: "required; no full sit-ups",
      },
    },
    overuse: {
      acute: ["Neck strain from pulling the head", "Low-back pain from repeated full sit-ups"],
      chronic: [
        "Lumbar flexion-related back pain with daily high-volume sit-ups",
        "Hip-flexor tightness from anchored-feet sit-ups",
      ],
      warning: [
        "Low-back pain that appears during the set",
        "Neck pain or headaches afterwards",
      ],
      avoidIf: [
        "Acute low-back pain or a disc history",
        "Pregnancy — supine exercise and trunk flexion are not appropriate",
        "Osteoporosis with vertebral fracture risk",
      ],
    },
    safety: {
      before: ["Check the board and foot hooks are secure.", "Check the board surface is not wet."],
      during: ["Keep the chin slightly tucked, eyes on the knees.", "Exhale on the curl."],
      stopIf: ["Low-back pain", "Neck pain"],
    },
    maintenance: ["Board fixings", "Foot hooks", "Padding", "Surface grip"],
    signboard: [
      {
        claim: "Reduces belly fat",
        verdict: "unsupported",
        note: "Abdominal exercise builds abdominal muscle. Fat loss needs a calorie deficit.",
      },
      {
        claim: "Gives you a six-pack",
        verdict: "partly",
        note: "It builds the muscle; visibility depends almost entirely on body fat.",
      },
      {
        claim: "Strengthens the lower back",
        verdict: "unsupported",
        note: "Full sit-ups load the lumbar spine in flexion. They are not a back exercise.",
      },
    ],
    sources: ["acsm", "en16630", "tendon"],
    confidence: "moderate",
  },

  {
    id: "back-extension",
    name: "Back Extension Bench",
    aliases: ["hyperextension bench", "roman chair", "back bench"],
    category: "core",
    prevalence: "occasional",
    footprint: "1.3 × 0.7 m",
    difficulty: 3,
    summary:
      "Angled bench for spinal extension. Useful for the posterior chain, risky for anyone who over-arches.",
    description:
      "You lie face down on an angled pad with the hips supported and the upper body free, then lift and lower the trunk. It strengthens the spinal erectors and glutes — genuinely useful for people who sit all day — but the common fault is extending past neutral, which compresses the low back rather than strengthening it.",
    muscles: {
      primary: ["erector spinae", "glutes", "hamstrings"],
      secondary: ["multifidus", "adductors"],
    },
    joints: ["lumbar spine", "hip"],
    howTo: [
      "Set the hip pad just below the hip bones so the pelvis is supported.",
      "Cross the arms over the chest or lightly support the head.",
      "Lower the trunk until you feel a mild stretch, not a collapse.",
      "Raise until the body is in one straight line — no further.",
      "Lower slowly over three seconds and repeat.",
    ],
    setup: [
      "Hip pad: top edge just below the front hip bones.",
      "Ankle pads: snug, so the legs stay put.",
      "Bench angle: start shallow; steeper is harder.",
    ],
    mistakes: [
      {
        wrong: "Arching past a straight line at the top.",
        fix: "Stop at neutral. Extension beyond neutral is where backs complain.",
      },
      {
        wrong: "Jerking up with the arms.",
        fix: "Hands across the chest; the movement is slow and comes from the hips and back.",
      },
      {
        wrong: "Hip pad too high, so the pelvis is free to rotate.",
        fix: "Lower the pad. Pelvic support is the whole point of the bench.",
      },
      {
        wrong: "High rep counts.",
        fix: "Two sets of 8–12. This is not a cardio station.",
      },
    ],
    benefits: [
      {
        claim: "Strengthens the spinal erectors and glutes, which support the low back.",
        tier: 1,
        note: "Hip-hinge and extension work is a standard part of low-back conditioning.",
      },
      {
        claim: "Counteracts all-day sitting.",
        tier: 2,
        note: "Reasonable, if the range stays controlled and it is paired with hip mobility work.",
      },
      {
        claim: "Cures back pain.",
        tier: 3,
        note: "Back pain is multifactorial. Some people benefit, others are made worse. Not a cure.",
      },
    ],
    easier: "Small range with the hands supporting the trunk on the pad.",
    harder: "Slower lowering, or a longer hold at neutral for 3 seconds.",
    minutes: {
      adult: {
        perStation: "2 sets × 8–12 reps",
        sets: "2",
        rest: "60–90 s",
      },
      child: {
        band: "12+ supervised only",
        perStation: "1 set × 5–8 reps",
        supervision: "required",
      },
    },
    overuse: {
      acute: ["Low-back pain from over-extension", "Dizziness from rapid position changes"],
      chronic: [
        "Lumbar facet irritation with repeated hyperextension",
        "Hamstring strain if the legs take over",
      ],
      warning: [
        "Low-back pain at the top of the movement",
        "Dizziness or visual changes when standing up",
      ],
      avoidIf: [
        "Acute low-back pain or a disc episode",
        "Spondylolisthesis or a known pars fracture",
        "Uncontrolled high blood pressure — position changes and breath-holding raise pressure",
      ],
    },
    safety: {
      before: ["Check the hip and ankle pads are locked.", "Check the bench does not rock."],
      during: ["Move slowly.", "Stop at neutral; do not arch."],
      stopIf: ["Low-back pain", "Dizziness"],
    },
    maintenance: ["Pad locking pins", "Bench frame welds", "Ankle pad straps", "Base stability"],
    signboard: [
      {
        claim: "Cures back pain",
        verdict: "unsupported",
        note: "It strengthens the back; it does not treat pain. Some backs get worse on it.",
      },
      {
        claim: "Strengthens the core",
        verdict: "partly",
        note: "It trains the erectors, which are part of the core. The abs do little here.",
      },
      {
        claim: "Improves posture",
        verdict: "partly",
        note: "Stronger erectors can help some people stand taller, with consistent work.",
      },
    ],
    sources: ["acsm", "en16630", "tendon"],
    confidence: "moderate",
  },
];
