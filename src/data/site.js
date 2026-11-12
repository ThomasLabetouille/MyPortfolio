// Textes de la page d'accueil et de l'interface, en français et en anglais.
// Tous les chiffres viennent des pages de détail (src/data/projectsData.js) :
// ne rien ajouter ici qui n'y figure pas.

export const links = {
  email: "thomas.labetouille@gmail.com",
  linkedin: "https://www.linkedin.com/in/thomas-labetouille-294b39212/",
  github: "https://github.com/ThomasLabetouille",
  freelance: "https://portfolio-freelance-lake.vercel.app/",
  droneRepo: "https://github.com/ThomasLabetouille/drone-nav-estimation",
};

const fr = {
  meta: {
    title: "Thomas Labetouille — Simulation, logiciel temps réel et validation",
  },
  nav: {
    projects: "Projets",
    experience: "Parcours",
    skills: "Compétences",
    contact: "Contact",
    cv: "CV (PDF)",
    menu: "Menu",
    close: "Fermer le menu",
    skip: "Aller au contenu",
    langLabel: "Langue",
  },
  cvFile: "/CV_Thomas_Labetouille_FR.pdf",
  hero: {
    status: ["Disponible immédiatement", "Toulouse", "Habilitable"],
    role: "Simulation, logiciel temps réel et validation",
    pitch:
      "Je développe des logiciels temps réel — simulateurs aéronautiques, estimation d'état de drones — et les tests automatiques qui prouvent qu'ils sont justes.",
    ctaResults: "Voir les résultats",
    ctaCv: "Télécharger le CV",
    figLabel: "Fig. 1",
    figCaption:
      "Deux vrais vols PX4 (A1, A2), coupures GNSS simulées de 30 s : écart entre la position estimée et la position GNSS, pour trois jeux de capteurs. La position GNSS retrouvée après la coupure sert de référence.",
    figAlt:
      "Deux graphiques, un par vol. Pendant chaque coupure GNSS de 30 secondes, l'écart entre l'estimation et le GNSS augmente, tracé en échelle logarithmique pour trois jeux de capteurs : IMU et GNSS, avec baromètre et magnétomètre, avec Pitot, vent et dérapage.",
  },
  results: {
    title: "Projets et résultats mesurés",
    lede: "Ce que chaque projet a démontré, en chiffres.",
    cols: ["Projet", "Ce que fait le logiciel", "Résultat", "Outils"],
    rows: [
      {
        id: "drone-nav-estimation",
        name: "Navigation de drone — estimation d'état",
        ctx: "Projet personnel · 2026",
        what: "Filtre de Kalman étendu, validé en trois temps : vols simulés avec capteurs modélisés (latence GNSS de 150 ms, biais qui dérivent, vent), trois vrais vols PX4, puis portage C++.",
        value: "15 m",
        versus: "contre 85 m",
        result:
          "d'erreur après 60 s sans GNSS, face à la centrale inertielle seule (moyenne de 40 vols simulés).",
        extra: "0,2 à 0,5 m d'écart avec l'EKF2 de PX4 sur les vrais vols.",
        tools: ["C++17 · Eigen", "Python · PX4", "197 tests"],
      },
      {
        id: "cs-group",
        name: "Simulateur aéronautique — défense",
        ctx: "CS Group · 2024–2025",
        what: "Conception et intégration de scénarios d'entraînement temps réel sur simulateurs Inscape VTS ; correction de bugs sur des comportements simulés difficiles à reproduire.",
        value: "14 mois",
        versus: "défense nationale",
        result:
          "Exigences fonctionnelles strictes, validation formelle, travail direct avec ingénieurs systèmes et pilotes.",
        tools: ["Inscape VTS", "C#"],
      },
      {
        id: "vigie",
        name: "Vigie — sûreté de vol pour drone",
        ctx: "Projet personnel · 2026 · en cours",
        what: "Surveille un drone PX4 et lui ordonne de rentrer ou de se poser s'il sort de sa zone, manque de batterie ou perd le lien sol. Testé en simulation PX4 et Gazebo.",
        value: "16 ms",
        result:
          "pour que PX4 accuse réception de l'ordre de retour, sur un vol simulé de bout en bout.",
        tools: ["Rust · cœur no_std", "MAVLink · Gazebo", "38 tests"],
      },
      {
        id: "level-design-tools",
        name: "Banc de test automatisé — outil 3D",
        ctx: "Projet personnel · 2026",
        what: "Vérifie la géométrie d'un outil d'éditeur 3D hors moteur, et mesure sa propre fiabilité en y injectant des défauts volontaires.",
        value: "4 vrais bugs",
        result:
          "trouvés dans du code qui compilait · 40 000 cas · 19 défauts injectés sur 21 détectés.",
        tools: ["C# · Unity 6", "Mutation testing"],
      },
    ],
  },
  dive: {
    title: "Zoom : navigation de drone",
    text: "Un drone doit savoir à chaque instant où il est. Aucun capteur ne le dit seul : le GNSS peut couper, le magnétomètre est perturbé, la centrale inertielle dérive. Ce filtre les combine.",
    points: [
      "Validé en trois temps : vols simulés où la vérité est connue, trois vrais vols PX4, portage C++.",
      "Les vrais vols ont invalidé trois hypothèses du simulateur ; le filtre a gagné les états qui les corrigent.",
      "C++17 sans allocation dynamique, 4 µs par échantillon traité.",
      "197 tests, et 63 bugs injectés tous détectés par les tests de mutation.",
    ],
    read: "Lire le projet",
    github: "Code sur GitHub",
    figLabel: "Fig. 2",
    // [texte, exposant, suite] : l'exposant est mis en forme à l'affichage
    figCaption: ["Portage C++ contre référence Python sur les vols réels : mêmes états à 10", "−11", " m près."],
    figAlt:
      "Écart entre le portage C++ et la version Python au cours des trois vols réels, en échelle logarithmique : il reste sous dix puissance moins onze mètre.",
  },
  tools: {
    title: "Outils et IA appliquée",
    rows: [
      {
        id: "assistant-ue5-local",
        name: "Assistant IA local × UE5",
        year: "2026",
        sub: "Pilote Unreal Engine 5.8 en langage naturel, entièrement en local · en cours",
      },
      {
        id: "claude-ue5",
        name: "Pilotage & vérification d'un moteur 3D",
        year: "2025–26",
        sub: "Plugin C++ Unreal Engine 5 piloté par IA ; rien n'est sauvegardé sans vérification · 117 tests",
      },
      {
        id: "comptoir",
        name: "Comptoir & Bordereau",
        year: "2026",
        sub: "Deux outils pour agences de voyages : le modèle de langage comprend, le code décide",
      },
    ],
  },
  games: {
    title: "Jeu vidéo & temps réel",
    lede: "Mes débuts : moteurs 3D, physique et gameplay en C++ et C#.",
    rows: [
      { id: "rainbow-ant", name: "Gameplay UE5 — Rainbow Ant Studio", year: "2023–24", sub: "Gameplay Programmer (freelance) · UE5 / C++" },
      { id: "hover-ue5", name: "HoverCharacter UE5", year: "2025–26", sub: "Personnage hover procédural · physique · C++" },
      { id: "horror-ue5", name: "Projet Horreur", year: "2024–26", sub: "Jeu d'horreur à la première personne · UE5 / C++" },
      { id: "time-restore", name: "Time Restore", year: "2024", sub: "RPG · migré d'UE4 à UE5" },
      { id: "virtual-badass", name: "Virtual Badass", year: "2022–23", sub: "Projet de fin d'études, équipe de 6 · Unity" },
      { id: "sheeplone", name: "Sheeplone", year: "2022", sub: "FPS / survie, 2 mois · Unity" },
      { id: "aigyptos", name: "Aigyptos", year: "2022", sub: "Ludum Dare 50, 4 jours · Unity" },
      { id: "casse-brique", name: "Casse-Brique", year: "2021", sub: "Défi école, 2 semaines · Unity" },
    ],
  },
  experience: {
    title: "Parcours",
    rows: [
      {
        period: "09.2024 — 11.2025",
        role: "Technicien Systèmes Embarqués",
        org: "CS Group",
        text: "CDD · Simulateurs aéronautiques Inscape VTS pour un programme de défense nationale : scénarios d'entraînement temps réel sous validation formelle, correction de bugs sur des comportements simulés, travail direct avec ingénieurs systèmes et pilotes.",
      },
      {
        period: "12.2023 — 09.2024",
        role: "Gameplay Programmer",
        org: "Rainbow Ant Studio",
        text: "Freelance, équipe à distance · Jeu d'action-aventure UE5 : personnage, natation, météo, carte interactive.",
      },
      {
        period: "2020 — 2023",
        role: "Bachelor Développement de jeux vidéo",
        org: "E-Artsup",
        text: "Titre RNCP niveau 6 (Bac+3) · C# / Unity, game & level design.",
      },
    ],
  },
  skills: {
    title: "Compétences",
    groups: [
      { name: "Simulation", text: "Inscape VTS, scénarios d'entraînement temps réel, Unreal Engine 5, Unity 6, physique et comportements simulés" },
      { name: "Estimation", text: "Filtre de Kalman (EKF), fusion IMU / GNSS, navigation inertielle, PX4, MAVLink" },
      { name: "Langages", text: "C++ (principal), C#, Python, Rust, Java, SQL" },
      { name: "Tests", text: "Non-régression, tests de propriétés, mutation testing, pytest, intégration continue" },
    ],
  },
  contact: {
    title: "Un poste en simulation ou en validation ?",
    text: "Disponible immédiatement en CDI, CDD ou prestation. Toulouse et alentours, véhiculé.",
    email: "Email",
    cv: "CV",
    cvValue: "Télécharger le CV (PDF)",
    freelance: "Activité freelance",
    freelanceValue: "IA appliquée au voyage",
  },
  footer: "© 2026 Thomas Labetouille · Toulouse, France",
  status: { completed: "Terminé", ongoing: "En cours" },
  detail: {
    back: "Retour aux projets",
    role: "Rôle",
    engine: "Outil principal",
    year: "Année",
    summary: "En bref",
    highlights: "Ce que j'ai développé",
    tech: "Technologies",
    itch: "Télécharger sur itch.io",
    github: "Voir le code sur GitHub",
    demo: "Essayer la démo en ligne",
    all: "Tous les projets",
    prev: "Projet précédent",
    next: "Projet suivant",
    notFound: "Projet introuvable.",
    zoom: "Agrandir l'image",
    close: "Fermer",
    loading: "Chargement…",
  },
  gallery: {
    gallery_drone_outage: "Perte du GNSS pendant 60 s : où le drone croit-il être ?",
    gallery_drone_real_outages: "Pertes GNSS simulées sur deux vrais vols PX4",
    gallery_drone_sensors: "Ce que les vrais logs disent des capteurs",
    gallery_drone_cpp: "Écart entre le portage C++ et la version Python sur les vols réels",
    gallery_claude_panel: "Panneau Claude AI dans l'éditeur UE5",
    gallery_claude_level: "Level design procédural généré par l'agent",
    gallery_claude_python: "Exécution Python temps réel depuis le chat",
    gallery_claude_blueprint: "Édition de Blueprint via BatchWireGraph",
  },
};

const en = {
  meta: {
    title: "Thomas Labetouille — Simulation, real-time software and validation",
  },
  nav: {
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    cv: "Resume (PDF)",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    langLabel: "Language",
  },
  cvFile: "/CV_Thomas_Labetouille_EN.pdf",
  hero: {
    status: ["Available now", "Toulouse, France", "Eligible for security clearance"],
    role: "Simulation, real-time software and validation",
    pitch:
      "I build real-time software — aeronautical simulators, drone state estimation — and the automated tests that prove it is right.",
    ctaResults: "See the results",
    ctaCv: "Download resume",
    figLabel: "Fig. 1",
    figCaption:
      "Two real PX4 flights (A1, A2) with simulated 30 s GNSS outages: distance between the estimated position and the GNSS position, for three sensor sets. The GNSS fix right after the outage is the reference. Plot labels are in French.",
    figAlt:
      "Two plots, one per flight. During each 30-second GNSS outage, the distance between the estimate and GNSS grows, drawn on a log scale for three sensor sets: IMU and GNSS, with barometer and magnetometer, with pitot, wind and sideslip.",
  },
  results: {
    title: "Projects and measured results",
    lede: "What each project demonstrated, in numbers.",
    cols: ["Project", "What the software does", "Result", "Tools"],
    rows: [
      {
        id: "drone-nav-estimation",
        name: "Drone navigation — state estimation",
        ctx: "Personal project · 2026",
        what: "Extended Kalman filter validated in three stages: simulated flights with modelled sensors (150 ms GNSS latency, drifting biases, wind), three real PX4 flights, then a C++ port.",
        value: "15 m",
        versus: "against 85 m",
        result:
          "of error after 60 s without GNSS, compared with the inertial unit alone (mean over 40 simulated flights).",
        extra: "Within 0.2 to 0.5 m of the PX4 EKF2 on the real flights.",
        tools: ["C++17 · Eigen", "Python · PX4", "197 tests"],
      },
      {
        id: "cs-group",
        name: "Aeronautical simulator — defence",
        ctx: "CS Group · 2024–2025",
        what: "Designed and integrated real-time training scenarios on Inscape VTS simulators; fixed bugs in hard-to-reproduce simulated behaviour.",
        value: "14 months",
        versus: "national defence",
        result:
          "Strict functional requirements, formal validation, direct work with systems engineers and pilots.",
        tools: ["Inscape VTS", "C#"],
      },
      {
        id: "vigie",
        name: "Vigie — drone flight safety",
        ctx: "Personal project · 2026 · ongoing",
        what: "Monitors a PX4 drone and orders it to return or land if it leaves its area, runs low on battery or loses the ground link. Tested in PX4 and Gazebo simulation.",
        value: "16 ms",
        result:
          "for PX4 to acknowledge the return order, on an end-to-end simulated flight.",
        tools: ["Rust · no_std core", "MAVLink · Gazebo", "38 tests"],
      },
      {
        id: "level-design-tools",
        name: "Automated test bench — 3D tool",
        ctx: "Personal project · 2026",
        what: "Verifies the geometry of a 3D editor tool outside the engine, and measures its own reliability by injecting deliberate faults.",
        value: "4 real bugs",
        result:
          "found in code that compiled · 40,000 cases · 19 of 21 injected faults caught.",
        tools: ["C# · Unity 6", "Mutation testing"],
      },
    ],
  },
  dive: {
    title: "Close-up: drone navigation",
    text: "A drone has to know at every moment where it is. No sensor can tell it alone: GNSS can drop out, the magnetometer gets disturbed, the inertial unit drifts. This filter combines them.",
    points: [
      "Validated in three stages: simulated flights where the truth is known, three real PX4 flights, a C++ port.",
      "The real flights disproved three assumptions of the simulator; the filter gained the states that correct them.",
      "C++17 with no dynamic allocation, 4 µs per processed sample.",
      "197 tests, and 63 injected bugs all caught by mutation testing.",
    ],
    read: "Read the project",
    github: "Code on GitHub",
    figLabel: "Fig. 2",
    figCaption: ["C++ port against the Python reference on the real flights: same states to within 10", "−11", " m."],
    figAlt:
      "Difference between the C++ port and the Python version over the three real flights, on a log scale: it stays below ten to the minus eleven metres.",
  },
  tools: {
    title: "Tools and applied AI",
    rows: [
      {
        id: "assistant-ue5-local",
        name: "Local AI Assistant × UE5",
        year: "2026",
        sub: "Drives Unreal Engine 5.8 in natural language, fully local · ongoing",
      },
      {
        id: "claude-ue5",
        name: "Driving & verifying a 3D engine",
        year: "2025–26",
        sub: "AI-driven Unreal Engine 5 C++ plugin; nothing is saved without verification · 117 tests",
      },
      {
        id: "comptoir",
        name: "Comptoir & Bordereau",
        year: "2026",
        sub: "Two travel-agency tools: the language model understands, the code decides",
      },
    ],
  },
  games: {
    title: "Video games & real-time",
    lede: "Where I started: 3D engines, physics and gameplay in C++ and C#.",
    rows: [
      { id: "rainbow-ant", name: "UE5 Gameplay — Rainbow Ant Studio", year: "2023–24", sub: "Gameplay Programmer (freelance) · UE5 / C++" },
      { id: "hover-ue5", name: "HoverCharacter UE5", year: "2025–26", sub: "Procedural hover character · physics · C++" },
      { id: "horror-ue5", name: "Horror Project", year: "2024–26", sub: "First-person horror game · UE5 / C++" },
      { id: "time-restore", name: "Time Restore", year: "2024", sub: "RPG · migrated from UE4 to UE5" },
      { id: "virtual-badass", name: "Virtual Badass", year: "2022–23", sub: "Final-year project, team of 6 · Unity" },
      { id: "sheeplone", name: "Sheeplone", year: "2022", sub: "FPS / survival, 2 months · Unity" },
      { id: "aigyptos", name: "Aigyptos", year: "2022", sub: "Ludum Dare 50, 4 days · Unity" },
      { id: "casse-brique", name: "Brick Breaker", year: "2021", sub: "School challenge, 2 weeks · Unity" },
    ],
  },
  experience: {
    title: "Experience",
    rows: [
      {
        period: "09.2024 — 11.2025",
        role: "Embedded Systems Technician",
        org: "CS Group",
        text: "Fixed-term contract · Inscape VTS aeronautical simulators for a national defence programme: real-time training scenarios under formal validation, bug fixing in simulated behaviour, direct work with systems engineers and pilots.",
      },
      {
        period: "12.2023 — 09.2024",
        role: "Gameplay Programmer",
        org: "Rainbow Ant Studio",
        text: "Freelance, remote team · UE5 action-adventure game: character, swimming, weather, interactive map.",
      },
      {
        period: "2020 — 2023",
        role: "Bachelor in Video Game Development",
        org: "E-Artsup",
        text: "RNCP level 6 qualification (French 3-year degree) · C# / Unity, game & level design.",
      },
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      { name: "Simulation", text: "Inscape VTS, real-time training scenarios, Unreal Engine 5, Unity 6, simulated physics and behaviour" },
      { name: "Estimation", text: "Kalman filter (EKF), IMU / GNSS fusion, inertial navigation, PX4, MAVLink" },
      { name: "Languages", text: "C++ (main), C#, Python, Rust, Java, SQL" },
      { name: "Testing", text: "Regression testing, property-based testing, mutation testing, pytest, continuous integration" },
    ],
  },
  contact: {
    title: "A role in simulation or validation?",
    text: "Available now for permanent, fixed-term or consulting positions. Toulouse area.",
    email: "Email",
    cv: "Resume",
    cvValue: "Download resume (PDF)",
    freelance: "Freelance",
    freelanceValue: "Applied AI for travel",
  },
  footer: "© 2026 Thomas Labetouille · Toulouse, France",
  status: { completed: "Completed", ongoing: "Ongoing" },
  detail: {
    back: "Back to projects",
    role: "Role",
    engine: "Main tool",
    year: "Year",
    summary: "In short",
    highlights: "What I built",
    tech: "Technologies",
    itch: "Download on itch.io",
    github: "View the code on GitHub",
    demo: "Try the live demo",
    all: "All projects",
    prev: "Previous project",
    next: "Next project",
    notFound: "Project not found.",
    zoom: "Enlarge image",
    close: "Close",
    loading: "Loading…",
  },
  gallery: {
    gallery_drone_outage: "60 s GNSS outage: where does the drone think it is?",
    gallery_drone_real_outages: "GNSS outages simulated on two real PX4 flights",
    gallery_drone_sensors: "What the real logs say about the sensors",
    gallery_drone_cpp: "Difference between the C++ port and the Python version on real flights",
    gallery_claude_panel: "Claude AI panel inside the UE5 editor",
    gallery_claude_level: "Procedural level design generated by the agent",
    gallery_claude_python: "Real-time Python execution from the chat",
    gallery_claude_blueprint: "Blueprint editing via BatchWireGraph",
  },
};

export const site = { fr, en };
