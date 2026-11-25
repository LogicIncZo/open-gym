export interface Source {
  id: string;
  label: string;
  publisher: string;
  year: string;
  url: string;
  tier: "guideline" | "standard" | "manual" | "review";
  note?: string;
}

export const SOURCES: Record<string, Source> = {
  who2020: {
    id: "who2020",
    label: "WHO Guidelines on physical activity and sedentary behaviour",
    publisher: "World Health Organization",
    year: "2020",
    url: "https://www.who.int/publications/i/item/9789240015128",
    tier: "guideline",
    note: "Adults: 150–300 min moderate activity per week plus 2 muscle-strengthening days. Ages 5–17: 60 min/day average.",
  },
  acsm: {
    id: "acsm",
    label: "Progression models in resistance training for healthy adults",
    publisher: "American College of Sports Medicine",
    year: "2009",
    url: "https://journals.lww.com/acsm-msse/fulltext/2009/03000/progression_models_in_resistance_training_for.26.aspx",
    tier: "guideline",
    note: "2–3 sets of 8–12 repetitions at moderate effort for novice trainees; 48 h between sessions for the same muscle group.",
  },
  nhs: {
    id: "nhs",
    label: "Strength and flexibility exercises",
    publisher: "NHS (UK)",
    year: "2023",
    url: "https://www.nhs.uk/live-well/exercise/strength-exercises/",
    tier: "guideline",
  },
  en16630: {
    id: "en16630",
    label: "EN 16630:2015 Outdoor fitness equipment — safety requirements and test methods",
    publisher: "European Committee for Standardization",
    year: "2015",
    url: "https://standards.iteh.ai/catalog/standards/cen/2b0f0e02-9d2e-4b5b-8f0f-9e2d1b6a0b3f/en-16630-2015",
    tier: "standard",
    note: "Written for adult and youth fitness equipment. Does not size stations for children or cover fall height and entrapment the way EN 1176 does.",
  },
  en1176: {
    id: "en1176",
    label: "EN 1176 Playground equipment — safety requirements and test methods",
    publisher: "European Committee for Standardization",
    year: "2017",
    url: "https://standards.iteh.ai/catalog/standards/cen/6f1e2a9c-1a4e-4f11-9c7e-2f0a1c7b9e21/en-1176-1-2017",
    tier: "standard",
    note: "The standard that actually covers children's play equipment: fall height, entrapment, surfacing.",
  },
  cpcb: {
    id: "cpcb",
    label: "Guidelines for public park maintenance and civic amenities",
    publisher: "Central Pollution Control Board / municipal practice",
    year: "2019",
    url: "https://cpcb.nic.in/",
    tier: "manual",
    note: "Indian municipal park upkeep context: surface drainage, standing water, and inspection cycles.",
  },
  "bjsm-knee": {
    id: "bjsm-knee",
    label: "Patellofemoral pain consensus statement",
    publisher: "British Journal of Sports Medicine",
    year: "2018",
    url: "https://bjsm.bmj.com/content/52/18/1170",
    tier: "review",
    note: "Load management and hip/knee strengthening are first-line; pain should not be pushed through.",
  },
  rotator: {
    id: "rotator",
    label: "Shoulder impingement: current concepts",
    publisher: "British Journal of Sports Medicine / review literature",
    year: "2020",
    url: "https://bjsm.bmj.com/",
    tier: "review",
    note: "Overhead and behind-the-neck positions load the subacromial space; range should stay pain-free.",
  },
  tendon: {
    id: "tendon",
    label: "Tendinopathy: load management and progressive exercise",
    publisher: "Journal of Orthopaedic & Sports Physical Therapy",
    year: "2019",
    url: "https://www.jospt.org/",
    tier: "review",
    note: "Tendon pain follows load spikes; gradual progression and 48-hour spacing are protective.",
  },
  heat: {
    id: "heat",
    label: "Heat and outdoor exercise safety guidance",
    publisher: "National Institute for Occupational Safety and Health / municipal advisories",
    year: "2022",
    url: "https://www.cdc.gov/niosh/topics/heatstress/",
    tier: "guideline",
    note: "Metal surfaces in direct afternoon sun can exceed 60 °C and cause contact burns.",
  },
};

export const sourceList = (ids: string[]): Source[] =>
  ids.map((id) => SOURCES[id]).filter(Boolean);
