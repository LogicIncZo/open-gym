/**
 * Real-world station photographs, sourced from Wikimedia Commons.
 *
 * These are representative photos, not photographs of one particular park's
 * equipment. Design details vary by manufacturer, so the hand-drawn schematic
 * remains the authoritative diagram for how a station works. Every image is
 * credited on /credits; do not add a photo here without a licence and artist.
 */
export interface StationPhoto {
  file: string;
  title: string;
  artist: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  note: string;
}

export const PHOTOS: Record<string, StationPhoto> = {
  "air-walker": {
    file: "air-walker.jpg",
    title: "Temple park, Narayananagar, Bengaluru (2026) 02.jpg",
    artist: "Gpkp",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Temple_park,_Narayananagar,_Bengaluru_(2026)_02.jpg",
    note: "An air walker with pendulum footplates at Temple Park, Bengaluru.",
  },
  "cross-trainer": {
    file: "cross-trainer.jpg",
    title: "Crosstrainer 2242 1.JPG",
    artist: "Flohsand",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Crosstrainer_2242_1.JPG",
    note: "An outdoor elliptical cross-trainer.",
  },
  rider: {
    file: "rider.jpg",
    title: "Rider in park.jpg",
    artist: "Vflorish",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rider_in_park.jpg",
    note: "A pair of seated rider machines beside their instruction board.",
  },
  stepper: {
    file: "stepper.jpg",
    title: "Stepper, Fahrdorf (P1100690).jpg",
    artist: "Matti Blume",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Stepper,_Fahrdorf_(P1100690).jpg",
    note: "A freestanding outdoor stepper with two independent footplates.",
  },
  "leg-press": {
    file: "leg-press.jpg",
    title: "Leg press 2.jpg",
    artist: "Tiia Monto",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Leg_press_2.jpg",
    note: "A seated outdoor leg-press station with paired footplates.",
  },
  twister: {
    file: "twister.jpg",
    title: "Temple park, Narayananagar, Bengaluru (2026) 09.jpg",
    artist: "Gpkp",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Temple_park,_Narayananagar,_Bengaluru_(2026)_09.jpg",
    note: "Twin rotating waist-twister discs at Temple Park, Bengaluru.",
  },
  "stretch-station": {
    file: "stretch-station.jpg",
    title:
      "Ōhori Park The static back stretch bench on the fitness trail Ōhorikōen Chūō-ku Fukuoka 20260721.jpg",
    artist: "Hirho",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:%C5%8Chori_Park_The_static_back_stretch_bench_on_the_fitness_trail_%C5%8Chorik%C5%8Den_Ch%C5%AB%C5%8D-ku_Fukuoka_20260721.jpg",
    note: "A static back-stretch bench on a fitness trail in Fukuoka.",
  },
  "shoulder-wheel": {
    file: "shoulder-wheel.jpg",
    title: "Temple park, Narayananagar, Bengaluru (2026) 07.jpg",
    artist: "Gpkp",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Temple_park,_Narayananagar,_Bengaluru_(2026)_07.jpg",
    note: "A large upright wheel turned with the hands at Temple Park, Bengaluru.",
  },
  "sit-up-board": {
    file: "sit-up-board.jpg",
    title: "Inclined sit-up bench.jpg",
    artist: "Tpikonen",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inclined_sit-up_bench.jpg",
    note: "An inclined sit-up bench at an outdoor fitness station.",
  },
  "back-extension": {
    file: "back-extension.jpg",
    title: "Inclined sit-up and hyperextension bench.jpg",
    artist: "Tpikonen",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Inclined_sit-up_and_hyperextension_bench.jpg",
    note: "A combined incline sit-up and hyperextension (back-extension) bench.",
  },
  "monkey-bars": {
    file: "monkey-bars.jpg",
    title: "Monkey Bars - Monkey World - geograph.org.uk - 2031324.jpg",
    artist: "Paul Gillett",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Monkey_Bars_-_Monkey_World_-_geograph.org.uk_-_2031324.jpg",
    note: "An overhead monkey-bar ladder.",
  },
  "multi-gym": {
    file: "multi-gym.jpg",
    title: "Senior Citizen Exercise Machines not in use in Singapore.jpg",
    artist: "Exec8",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Senior_Citizen_Exercise_Machines_not_in_use_in_Singapore.jpg",
    note: "A cluster of senior-citizen exercise stations in a Singapore park — the type of setting combination rigs sit in.",
  },
  "chest-press": {
    file: "chest-press.jpg",
    title: "Sandown outdoor gym chest press.JPG",
    artist: "Editor5807",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sandown_outdoor_gym_chest_press.JPG",
    note: "An outdoor chest-press station at Sandown, Isle of Wight.",
  },
  "rowing-machine": {
    file: "rowing-machine.jpg",
    title: "Park rowing machine - geograph.org.uk - 2471618.jpg",
    artist: "David Lally",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Park_rowing_machine_-_geograph.org.uk_-_2471618.jpg",
    note: "An outdoor rowing machine in a public park.",
  },
  "arm-wheel": {
    file: "arm-wheel.jpg",
    title: "Tsui Ping (South) Estate Arm Pedal and Big Turning Wheels.jpg",
    artist: "Prosperity Horizons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tsui_Ping_(South)_Estate_Arm_Pedal_and_Big_Turning_Wheels.jpg",
    note: "The green arm-pedal station, with a separate turning wheel beside it.",
  },
  "pull-up-bar": {
    file: "pull-up-bar.jpg",
    title: "Sandown outdoor gym pull ups equipment.JPG",
    artist: "Editor5807",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sandown_outdoor_gym_pull_ups_equipment.JPG",
    note: "A freestanding outdoor pull-up bar with an instruction plate.",
  },
  "push-up-bars": {
    file: "push-up-bars.jpg",
    title: "Outdoor Gym Ernst-Thälmann-Park Berlin.jpg",
    artist: "Singlespeedfahrer",
    license: "CC0",
    licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Outdoor_Gym_Ernst-Th%C3%A4lmann-Park_Berlin.jpg",
    note: "A Berlin outdoor gym whose frame includes a monkey-bar run and push-up bars.",
  },
};

export const photoFor = (id: string): StationPhoto | undefined => PHOTOS[id];

export const PHOTO_IDS = Object.keys(PHOTOS).sort();
