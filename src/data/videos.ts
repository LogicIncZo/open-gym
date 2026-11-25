/**
 * Externally hosted video demos, hand-curated for source quality.
 *
 * None of these are produced by Open Gym. "Credential" describes what the
 * publisher states about the presenter; where no credential is stated we say
 * so. Videos are a supplement to the written technique notes, not a safety
 * approval for the equipment in your park.
 */
export type Credential = "accredited" | "clinical" | "certified" | "manufacturer" | "uncredentialed";

export interface VideoDemo {
  id: string;
  title: string;
  channel: string;
  url: string;
  credential: Credential;
  credentialNote: string;
  scope: string;
  language: string;
}

export const CREDENTIAL_LABEL: Record<Credential, string> = {
  accredited: "Accredited exercise scientist",
  clinical: "Registered clinician",
  certified: "Certified trainer",
  manufacturer: "Equipment manufacturer",
  uncredentialed: "No stated credential",
};

/** Broad open-gym technique videos — relevant to most stations. */
export const GENERAL_VIDEOS: VideoDemo[] = [
  {
    id: "Gsji5J5wwn4",
    title: "Staying Active: How to use outdoor exercise equipment — for teenagers and adults",
    channel: "Preventive Health SA",
    url: "https://www.youtube.com/watch?v=Gsji5J5wwn4",
    credential: "accredited",
    credentialNote:
      "Produced by a state public-health agency and presented by Jarrod, an accredited exercise scientist.",
    scope: "General outdoor-gym stations, demonstrated by an accredited professional.",
    language: "English",
  },
  {
    id: "VUat0VivIE0",
    title: "Correct way to do exercise with open gym machine",
    channel: "Dr. Pratibha Singh Physio Therapist (PT)",
    url: "https://www.youtube.com/watch?v=VUat0VivIE0",
    credential: "clinical",
    credentialNote: "Presented by a physiotherapist (PT); movement and injury framing.",
    scope: "Open-gym machine technique, in an Indian park setting.",
    language: "English / Hindi",
  },
  {
    id: "CfrIvTcwzF0",
    title: "Correct Use Of Open Gym Machines/equipment for Men/women over 50: detailed explanation",
    channel: "FITDADMOM",
    url: "https://www.youtube.com/watch?v=CfrIvTcwzF0",
    credential: "uncredentialed",
    credentialNote:
      "Useful over-50 walkthrough, but the channel states no professional credential — use as a lay demonstration.",
    scope: "Open-gym stations with a slower, older-adult pace.",
    language: "English",
  },
  {
    id: "LJ4NIkDeOxw",
    title: "How To Use Park Gym Effectively",
    channel: "The Supple Strength",
    url: "https://www.youtube.com/watch?v=LJ4NIkDeOxw",
    credential: "uncredentialed",
    credentialNote: "No professional credential stated on the channel; check technique against this guide.",
    scope: "General park-gym circuit and pacing.",
    language: "English",
  },
  {
    id: "oBs-PE34x7g",
    title: "How to Use Basic Gym Equipment (Beginner's Full Body Workout) | SELF",
    channel: "SELF",
    url: "https://www.youtube.com/watch?v=oBs-PE34x7g",
    credential: "certified",
    credentialNote:
      "Published by SELF with certified trainer Amy Kiser Schemper; demonstrates indoor machines.",
    scope: "Indoor equivalents of press, row and pull patterns — useful for form, not for outdoor hardware.",
    language: "English",
  },
];

/** Station-specific demos. */
export const STATION_VIDEOS: Record<string, VideoDemo[]> = {
  "air-walker": [
    {
      id: "O01iBy0ch38",
      title: "Air walker 7801 — see how to exercise!",
      channel: "Buglo",
      url: "https://www.youtube.com/watch?v=O01iBy0ch38",
      credential: "manufacturer",
      credentialNote:
        "A manufacturer's own demonstration, coached by trainer Marek Purczyński — accurate for this model, not independent advice.",
      scope: "Air walker specifically, with coached posture and range.",
      language: "English",
    },
  ],
};

export const videosFor = (id: string): VideoDemo[] => [
  ...(STATION_VIDEOS[id] ?? []),
  ...GENERAL_VIDEOS,
];

export const ALL_VIDEOS: VideoDemo[] = [
  ...GENERAL_VIDEOS,
  ...Object.values(STATION_VIDEOS).flat(),
];
