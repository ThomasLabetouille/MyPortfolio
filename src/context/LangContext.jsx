import { createContext, useContext, useState } from "react";

// Bilingual project data
export const projectsData = {
  fr: {
    "claude-ue5": {
      title: "Agent IA × UE5",
      subtitle: "Pont MCP + plugin C++ pour piloter Unreal Engine 5 par IA — Projet personnel",
      type: "Outil / IA",
      role: "Développeur solo",
      description: "Toolchain qui permet à un agent IA conversationnel (Claude, via MCP) de piloter l'éditeur Unreal Engine 5 de façon fiable : génération procédurale de niveaux, édition de Blueprints par script, spawn d'acteurs — avec vérification automatique (tests, screenshot, playtest) avant que le moindre résultat ne soit sauvegardé.",
      highlights: [
        "Pont MCP (Remote Execution API) qui permet à un agent externe (Claude Code / Claude Cowork) de piloter l'éditeur UE5 en langage naturel — génération de niveaux, création de mécaniques de gameplay, vérification automatique du travail produit",
        "Panneau Slate C++ dockable (Tools → Claude AI) intégré nativement dans l'éditeur, pour un usage local sans dépendre d'un outil externe",
        "Suite de 90 tests automatiques (81 in-editor + 9 en CI GitHub Actions) qui valide chaque modification du plugin avant qu'elle soit acceptée — aucune régression silencieuse",
        "Agent de playtest autonome : pilote le personnage en jeu (PIE) et journalise les événements (détection ennemie, blocages, jumpscares) — a détecté et permis de corriger un vrai bug empêchant les ennemis de poursuivre le joueur",
        "BatchWireGraph : DSL JSON qui câble un graphe Blueprint entier (nœuds + connexions) en un seul appel, au lieu de 20+ appels d'API unitaires",
        "Placement zéro-overlap (safe_spawn_enemy) : grille d'occupation + raycast de sol + vérification physique réelle — un acteur qui atterrirait dans un mur est repositionné automatiquement, jamais validé tel quel",
        "Vérification visuelle non-régressive (SSIM approximé par blocs) : chaque zone validée devient une image de référence, toute reconstruction future est comparée pour détecter une dérive silencieuse (lumière déplacée, matériau changé)",
        "100% open-source, CI GitHub Actions à chaque commit — 19 comportements non documentés de l'API UE5.7 identifiés et contournés (voir docs/KNOWN_ISSUES.md)",
      ],
      sections: [
        { title: "Deux façons de piloter l'éditeur", text: "Un pont MCP (Remote Execution API) permet à un agent externe comme Claude Code ou Claude Cowork de piloter l'éditeur UE5 depuis une simple conversation. En complément, un panneau Slate C++ dockable (Tools → Claude AI) offre le même type d'exécution Python directement dans l'éditeur, sans dépendance externe." },
        { title: "Vérification avant chaque sauvegarde", text: "Aucun résultat n'est accepté à l'aveugle : verify_level.py scanne automatiquement les acteurs en collision, les lumières mal configurées, le NavMesh non reconstruit ; une capture d'écran synchrone (contournement d'un bug de rendu UE5) permet une relecture visuelle systématique avant tout save()." },
        { title: "Agent de playtest autonome", text: "Un module dédié pilote le personnage joueur en PIE via des waypoints et un pathfinding NavMesh réel, journalise les événements de gameplay (détection, poursuite, jumpscare) et permet de rejouer un scénario de façon reproductible — c'est cet agent qui a mis en évidence un vrai bug de comportement ennemi, invisible en test statique." },
        { title: "BlueprintEditingSubsystem & suite anti-régression", text: "BlueprintEditingSubsystem expose une API C++ pour câbler des graphes Blueprint entiers en un seul appel (BatchWireGraph DSL). Avant et après toute modification du plugin, une suite de 90 tests revalide chaque subsystem — une régression est bloquée avant d'atteindre le niveau." },
      ],
    },
    "horror-ue5": {
      title: "Projet Horreur", subtitle: "Jeu personnel", type: "Horreur", role: "Développeur solo",
      description: "Jeu d'horreur solo sur UE5. Le joueur est poursuivi par des mannequins animés qui s'activent dans l'obscurité. Système de détection par la lumière, IA comportementale, gestion de la tension sonore.",
      highlights: ["IA ennemie basée sur Behavior Trees et AI Perception (vision/son)", "Système Lumen — les ennemis réagissent à l'obscurité", "Gestion de l'état de peur : ambiance sonore procédurale, post-process", "Level design orienté tension et couloirs étroits"],
      sections: [],
    },
    "hover-ue5": {
      title: "HoverCharacter UE5", subtitle: "Personnage hover procédural — Projet personnel", type: "Gameplay / Physique", role: "Développeur solo",
      description: "Système de personnage C++ en UE5.8 combinant marche standard et mode hover, avec banking, alignement de surface et accélération sur pente. Terrain désertique procédural généré en C++, et calibrage physique itératif par comparaison avec des jeux hover de référence pour obtenir un ressenti crédible.",
      highlights: [
        "HoverCharacter C++ — dual mode marche/hover avec banking dynamique, alignement de surface par trace et accélération sur pente calculée depuis la normale du sol",
        "Terrain procédural désert (ADesertTerrain) via ProceduralMeshComponent — 5 octaves de bruit de Perlin, LOD dynamique",
        "Calibrage physique itératif par comparaison avec des références de vol externes (jeux à mécanique hover similaire), pour obtenir une sensation crédible plutôt que des valeurs choisies au hasard",
        "Contournement documenté d'un bug UE5.7/5.8 (modifiers Enhanced Input non persistants entre sessions) via IsInputKeyDown() avec mapping AZERTY explicite — la même solution retrouvée et réappliquée sur un second projet (voir RPG 3e personne)",
      ],
      sections: [
        { title: "HoverCharacter — Dual Mode C++", text: "Le personnage bascule entre marche standard et mode hover (lévitation, banking latéral, alignement de surface par trace). L'accélération sur pente est calculée à partir du vecteur normal du sol — plus la pente est raide, plus le boost est fort." },
        { title: "Terrain procédural & calibrage physique", text: "ADesertTerrain génère un terrain désertique en C++ via ProceduralMeshComponent avec 5 octaves de bruit de Perlin. La physique du mode hover a été calibrée de façon itérative, par comparaison avec des jeux de référence proposant une mécanique de vol similaire, pour obtenir un ressenti cohérent avec les attentes du joueur." },
        { title: "Contournement bug Enhanced Input UE5.8", text: "Bug documenté : les modifiers Enhanced Input ne persistent pas entre sessions PIE en UE5.7/5.8. Solution : remplacement par IsInputKeyDown() sur les axes critiques, avec mapping AZERTY explicite. Solution reproductible, documentée, et déjà réutilisée sur un projet suivant." },
      ],
    },
    "rpg-ue5": {
      title: "RPG 3e Personne", subtitle: "Projet personnel — combat, IA ennemie, puzzle (UE5.8)", type: "RPG / Combat", role: "Développeur solo",
      description: "RPG à la 3e personne façon Witcher sur UE5.8. Système de combat à deux mains (épée/bouclier) avec règles d'input distinctes par touche, IA ennemie en C++ pilotée par une vraie machine à états, puzzle générique interrupteurs→porte, objectifs multiples et inventaire d'objets ramassables.",
      highlights: [
        "Système de combat à deux mains indépendantes (épée en main gauche, bouclier en main droite) avec des règles distinctes par type d'input — tap déclenche une action, hold en déclenche une autre, sans dépendre du système Repeat d'Enhanced Input",
        "IA ennemie en C++ (ARPGEnemy) pilotée par une vraie machine à états (Idle → Patrol → Chase → Attack → Dead), paramètres de détection/poursuite/attaque exposés en UPROPERTY et réutilisés par héritage sur plusieurs archétypes d'ennemis",
        "Système de puzzle générique interrupteurs → porte, construit une seule fois puis instancié par script pour n'importe quelle séquence, plutôt que codé en dur pour un cas unique",
        "Réutilisation directe d'un bug déjà résolu sur un projet précédent (modifiers Enhanced Input non persistants) — même solution appliquée immédiatement, sans le redécouvrir",
        "Diagnostic d'un bug de sauvegarde de niveau : les modifications de position/tags d'acteurs étaient perdues au redémarrage malgré un save() « réussi », à cause du mode One File Per Actor du niveau — cause racine isolée par comparaison de fichiers, corrigée à la source",
        "Discipline de calibration : une valeur de tuning trouvée en modifiant un composant en direct (position d'une épée tenue en main) est systématiquement reportée dans le code source C++, plutôt que laissée comme un correctif runtime qui ne survit pas à une recompilation",
        "Système d'interaction (touche E) validé uniquement une fois testé par une vraie pression de touche en jeu — un premier test par appel direct sur la cible avait masqué un bug réel de détection de collision",
      ],
      sections: [
        { title: "Combat & IA ennemie", text: "Le personnage gère deux mains indépendantes : épée à gauche, bouclier à droite, chacune avec ses propres règles de tap/hold. Les ennemis (ARPGEnemy, C++) suivent une machine à états complète — détection, poursuite, attaque au contact, retour en patrouille — dont les paramètres sont réglables par instance et réutilisés par héritage pour créer de nouveaux archétypes sans dupliquer la logique." },
        { title: "Puzzle générique & objectifs", text: "Le système de puzzle interrupteurs→porte est générique : une fonction construit la séquence complète (portes, interrupteurs, câblage) pour n'importe quel nombre d'interrupteurs, réutilisable sur d'autres niveaux. Un système d'objectifs multiples affiche la progression (ennemis restants, statut du puzzle) via un widget dédié." },
        { title: "Ce qui devrait intéresser un recruteur technique", text: "Au-delà des mécaniques de jeu, ce projet documente une vraie discipline de débogage : un bug de sauvegarde de niveau où save() retournait un succès sans jamais réécrire certains fichiers d'acteurs sur disque, isolé par comparaison de fichiers avant/après ; une calibration de position d'objet tenu en main reportée du runtime vers le code source C++ pour ne plus dépendre d'un correctif fragile ; un système d'interaction déclaré fonctionnel seulement après un test par vraie pression de touche, après avoir découvert qu'un appel direct sur la cible masquait un bug réel. Ce sont exactement le genre de bugs qui n'apparaissent qu'en conditions réelles, pas en test isolé — et la méthode pour les débusquer (comparer un résultat « censé marcher » au comportement réel en jeu) est appliquée de façon systématique tout au long du projet." },
      ],
    },
    "rainbow-ant": {
      title: "Gameplay UE5", subtitle: "Rainbow Ant Studio", type: "Action-Aventure", role: "Gameplay Programmer",
      description: "Mission freelance d'un an comme Gameplay Programmer sur un jeu d'action-aventure. Mécaniques du personnage, natation, météo dynamique, map interactive.",
      highlights: ["Mécaniques de personnage complètes (déplacement, interactions, physique)", "Système de natation avec transitions surface/sous-eau", "Intégration météo dynamique (pluie, brouillard, vent)", "Map interactive avec zones de déclenchement", "Animations via State Machines et Blend Spaces"],
      sections: [],
    },
    "cs-group": {
      title: "Simulateur Aéronautique", subtitle: "CS Group — Défense", type: "Simulation Défense", role: "Technicien Systèmes Embarqués",
      description: "Développement sur un simulateur d'appareil aéronautique (Inscape VTS) pour la défense nationale. Environnement contraint, documentation classifiée, collaboration avec experts métiers.",
      highlights: ["Conception de scénarios interactifs pour simulateurs de vol défense", "Architecture logicielle modulaire pour évolutivité et réutilisabilité", "Débogage de comportements simulés complexes en environnement contrôlé", "Collaboration avec experts domaine dans un cadre réglementé (défense)"],
      sections: [],
    },
    "time-restore": {
      title: "Time Restore", subtitle: "Projet personnel — UE4 → UE5", type: "RPG", role: "Développeur / Game Designer",
      description: "RPG à la 3e personne dans un monde fantaisiste où le temps s'est arrêté. Le joueur doit découvrir pourquoi et remettre le temps en marche pour sauver les habitants.",
      highlights: ["Conception d'une île fantaisiste avec biomes variés (lac, village, désert...)", "Système de quêtes avec journal d'objectifs et progression narrative", "Migration du projet UE4 vers UE5", "Level design de la map principale", "Système d'interaction PNJ"],
      sections: [
        { title: "Monde & Biomes", text: "L'île est découpée en plusieurs biomes : plaines, swamp, désert, cavernes, montagnes enneigées et île du volcan. Chaque zone a ses propres assets, ennemis et quêtes." },
        { title: "Gameplay & Systèmes", text: "Système de quêtes avec journal d'objectifs, interactions PNJ, crafting et combat à la 3e personne. Le jeu est en pré-alpha." },
      ],
    },
    "virtual-badass": {
      title: "Virtual Badass", subtitle: "Projet de fin d'études — E-Artsup", type: "Boss Fight", role: "Développeur / Intégrateur / Game Designer",
      description: "Boss fight 3D en équipe de 6 sur 1 an pour la dernière année de bachelor. Le joueur incarne un mercenaire en armure futuriste qui affronte le boss.",
      highlights: ["Développement des systèmes de combat du personnage et du boss", "Level design de la zone tutoriel et de l'arène de boss", "Intégration d'animations et de VFX", "Gestion de projet en équipe de 6 sur 1 an"],
      sections: [
        { title: "Le Boss", text: "Le boss est un robot steampunk imposant. Il possède plusieurs phases d'attaque. L'arène force le joueur à utiliser toutes les mécaniques apprises." },
        { title: "Personnages", text: "Le joueur incarne un mercenaire en armure futuriste avec Buck son compagnon robot. Les deux modèles ont été intégrés avec leurs animations complètes." },
      ],
    },
    "sheeplone": {
      title: "Sheeplone", subtitle: "Projet de fin d'année — 2 mois", type: "FPS / Survie", role: "Développeur / Game Designer",
      description: "Jeu FPS dans un monde fantaisiste. On incarne un magicien aventurier propulsé dans un monde par une entité maléfique, qui doit trouver le moyen de rentrer chez lui.",
      highlights: ["Développement du controller FPS et des mécaniques de magie", "IA ennemie : Mouton de Feu et Golem Gardien avec comportements distincts", "Système de quêtes avec journal d'objectifs", "Level design open-world fantaisiste"],
      sections: [
        { title: "Monde & Environnement", text: "Un monde fantaisiste ouvert avec plusieurs biomes. Le level design guide le joueur à travers les zones de quêtes." },
        { title: "Ennemis & IA", text: "Deux types d'ennemis : le Mouton de Feu (rapide, attaque directe) et le Golem Gardien (lent, puissant, zone de défense)." },
      ],
    },
    "aigyptos": {
      title: "Aigyptos", subtitle: "Ludum Dare 50 — 4 jours", type: "Survie / Stealth", role: "Développeur solo",
      description: 'Survival stealth 3D réalisé en 4 jours pour la Ludum Dare 50, thème "Retarder l\'inévitable". Une momie s\'échappe de sa pyramide sans se faire repérer.',
      highlights: ["Développement solo complet en 4 jours (game jam)", "IA de détection des archéologues (vision en cône, alerte, poursuite)", "Level design de la pyramide avec multiples chemins", "Concept art du personnage Aigys"],
      sections: [
        { title: "Level Design", text: "La pyramide est un labyrinthe multi-niveaux avec des gardes patrouillant des couloirs. Le joueur utilise les angles morts pour se faufiler jusqu'à la sortie." },
        { title: "Personnage & Direction Artistique", text: "Aigys est une momie égyptienne stylisée. Le concept art a guidé le modèle 3D pour rester cohérent avec l'univers graphique." },
      ],
    },
    "casse-brique": {
      title: "Casse-Brique", subtitle: "Défi école — 2 semaines", type: "Jeu Casual", role: "Développeur",
      description: "Casse-brique 2D en 10 niveaux. Le joueur incarne un chevalier détruisant des monstres pour sauver sa princesse. Réalisé en 2 semaines.",
      highlights: ["IA ennemie et comportements des blocs", "Calcul de trajectoire de balle avec rebonds physiques", "Blocs spéciaux : Bloc Explosif, Bloc Renforcé", "10 niveaux avec progression de difficulté"],
      sections: [
        { title: "Niveaux", text: "10 niveaux avec progression de difficulté croissante. Les premiers servent de tutoriel, les derniers introduisent des combinaisons de blocs spéciaux." },
        { title: "Blocs & IA", text: "Trois types de blocs : standard, Bloc Armure (résistant) et Bloc Explosif (détruit les adjacents). Chaque bloc a son IA de réaction." },
      ],
    },
  },
  en: {
    "claude-ue5": {
      title: "AI Agent × UE5",
      subtitle: "MCP bridge + C++ plugin to drive Unreal Engine 5 with AI — Personal project",
      type: "Tool / AI",
      role: "Solo developer",
      description: "Toolchain that lets a conversational AI agent (Claude, via MCP) reliably drive the Unreal Engine 5 editor: procedural level generation, scripted Blueprint editing, actor spawning — with automatic verification (tests, screenshots, playtesting) before anything is ever saved.",
      highlights: [
        "MCP bridge (Remote Execution API) that lets an external agent (Claude Code / Claude Cowork) drive the UE5 editor in natural language — level generation, gameplay mechanics, automatic verification of its own work",
        "Dockable C++ Slate panel (Tools → Claude AI) natively embedded in the editor, for local use without depending on an external tool",
        "90 automated tests (81 in-editor + 9 in GitHub Actions CI) validating every plugin change before it's accepted — no silent regressions",
        "Autonomous playtest agent: drives the character in-game (PIE) and logs events (enemy detection, stuck states, jumpscares) — found and helped fix a real bug preventing enemies from chasing the player",
        "BatchWireGraph: a JSON DSL that wires an entire Blueprint graph (nodes + connections) in a single call instead of 20+ individual API calls",
        "Zero-overlap placement (safe_spawn_enemy): occupancy grid + floor raycast + real physics check — an actor that would land inside a wall gets repositioned automatically, never committed as-is",
        "Non-regressive visual verification (block-based SSIM): every approved zone becomes a reference image; future rebuilds are compared to catch silent drift (a moved light, a swapped material)",
        "100% open source, GitHub Actions CI on every commit — 19 undocumented UE5.7 API quirks identified and worked around (see docs/KNOWN_ISSUES.md)",
      ],
      sections: [
        { title: "Two Ways to Drive the Editor", text: "An MCP bridge (Remote Execution API) lets an external agent like Claude Code or Claude Cowork drive the UE5 editor from a plain conversation. A dockable C++ Slate panel (Tools → Claude AI) offers the same kind of Python execution directly inside the editor, with no external dependency." },
        { title: "Verification Before Every Save", text: "Nothing is accepted blindly: verify_level.py automatically scans for colliding actors, misconfigured lights, and an unbuilt NavMesh; a synchronous screenshot (working around a UE5 rendering bug) allows a systematic visual review before any save()." },
        { title: "Autonomous Playtest Agent", text: "A dedicated module drives the player character in PIE via waypoints and real NavMesh pathfinding, logs gameplay events (detection, chase, jumpscare), and lets a scenario be replayed reproducibly — this agent is what surfaced a real enemy-behaviour bug invisible to static testing." },
        { title: "BlueprintEditingSubsystem & Anti-Regression Suite", text: "BlueprintEditingSubsystem exposes a C++ API to wire entire Blueprint graphs in a single call (BatchWireGraph DSL). Before and after any plugin change, a 90-test suite revalidates every subsystem — a regression is caught before it ever reaches the level." },
      ],
    },
    "horror-ue5": {
      title: "Horror Project", subtitle: "Personal project", type: "Horror", role: "Solo developer",
      description: "Solo horror game on UE5. The player is chased by animated mannequins that activate in the dark. Light-detection system, behavioural AI, tension management.",
      highlights: ["AI enemies driven by Behavior Trees and AI Perception (sight/sound)", "Lumen dynamic lighting — enemies react to darkness", "Fear state management: procedural sound, post-process", "Tension-oriented level design"],
      sections: [],
    },
    "hover-ue5": {
      title: "HoverCharacter UE5", subtitle: "Procedural hover character — Personal project", type: "Gameplay / Physics", role: "Solo developer",
      description: "C++ character system in UE5.8 combining standard walking and hover mode, with banking, surface alignment and slope acceleration. Procedurally generated desert terrain in C++, and physics calibrated iteratively against reference hover-flight games for a credible feel.",
      highlights: [
        "C++ HoverCharacter — dual walk/hover mode with dynamic banking, trace-based surface alignment and slope acceleration derived from the ground normal",
        "Procedural desert terrain (ADesertTerrain) via ProceduralMeshComponent — 5 Perlin noise octaves, dynamic LOD",
        "Iterative physics calibration against reference flight games with a similar hover mechanic, to reach a credible feel rather than arbitrary tuning values",
        "Documented workaround for a UE5.7/5.8 bug (Enhanced Input modifiers not persisting between sessions) via IsInputKeyDown() with explicit AZERTY mapping — the same fix later re-applied on a second project (see 3rd-person RPG)",
      ],
      sections: [
        { title: "HoverCharacter — Dual Mode C++", text: "The character switches between standard walking (capsule + CharacterMovementComponent) and hover mode (levitation, lateral banking, surface alignment via trace). Slope acceleration is derived from the ground normal vector — the steeper the slope, the stronger the boost." },
        { title: "Procedural Terrain & Physics Calibration", text: "ADesertTerrain generates a desert landscape in C++ via ProceduralMeshComponent using 5 Perlin noise octaves. Hover physics were calibrated iteratively against reference games with a similar flight mechanic, to reach a feel consistent with player expectations." },
        { title: "Enhanced Input Bug Workaround (UE5.8)", text: "Documented bug: Enhanced Input modifiers (deadzone, swizzle, etc.) do not persist between PIE sessions in UE5.7/5.8. Solution: replaced by IsInputKeyDown() on critical axes with explicit AZERTY mapping. Reproducible, documented, and already reused on a follow-up project." },
      ],
    },
    "rpg-ue5": {
      title: "3rd-Person RPG", subtitle: "Personal project — combat, enemy AI, puzzle (UE5.8)", type: "RPG / Combat", role: "Solo developer",
      description: "3rd-person Witcher-style RPG in UE5.8. Two-handed combat system (sword/shield) with per-key input rules, C++ enemy AI driven by a real finite state machine, a generic switch-to-door puzzle system, multiple objectives and pickable inventory items.",
      highlights: [
        "Two independent hand slots (sword in the left hand, shield in the right) with distinct input rules per key — tap triggers one action, hold triggers another, without relying on Enhanced Input's Repeat system",
        "C++ enemy AI (ARPGEnemy) driven by a real finite state machine (Idle → Patrol → Chase → Attack → Dead), with detection/chase/attack parameters exposed as UPROPERTY and reused through inheritance across several enemy archetypes",
        "Generic switch-to-door puzzle system, built once and instantiated by script for any sequence, rather than hard-coded for a single case",
        "Directly reused a bug fix from a previous project (Enhanced Input modifiers not persisting) — same solution applied immediately instead of being rediscovered",
        "Diagnosed a level-save bug: actor position/tag changes were lost on restart despite a save() call \"succeeding\", due to the level's One File Per Actor mode — root cause isolated by file comparison, fixed at the source",
        "Calibration discipline: any tuning value found by live-editing a component (e.g. a sword's held-grip position) is systematically pushed into the C++ source code rather than left as a runtime patch that wouldn't survive a recompile",
        "Interaction system (E key) only declared working after being tested with an actual key press in-game — an earlier direct call on the target had masked a real collision-detection bug",
      ],
      sections: [
        { title: "Combat & Enemy AI", text: "The character manages two independent hands: sword on the left, shield on the right, each with its own tap/hold rules. Enemies (ARPGEnemy, C++) follow a full state machine — detection, chase, contact attack, return to patrol — with parameters tunable per instance and reused through inheritance to create new archetypes without duplicating logic." },
        { title: "Generic Puzzle & Objectives", text: "The switch-to-door puzzle system is generic: one function builds the whole sequence (doors, switches, wiring) for any number of switches, reusable across levels. A multi-objective system displays progress (remaining enemies, puzzle status) via a dedicated widget." },
        { title: "What a Technical Recruiter Should Find Interesting", text: "Beyond the gameplay mechanics, this project documents real debugging discipline: a level-save bug where save() reported success without ever rewriting some actor files to disk, isolated by before/after file comparison; a held-object position calibration pushed from runtime into C++ source code to stop depending on a fragile patch; an interaction system only declared working after being tested with a real key press, after discovering that a direct call on the target had masked a genuine detection bug. These are exactly the kind of bugs that only show up under real conditions, not in isolated testing — and the method used to catch them (comparing a result that's \"supposed to work\" against actual in-game behaviour) is applied systematically throughout the project." },
      ],
    },
    "rainbow-ant": {
      title: "UE5 Gameplay", subtitle: "Rainbow Ant Studio", type: "Action-Adventure", role: "Gameplay Programmer",
      description: "One-year freelance mission as Gameplay Programmer on an action-adventure game. Character mechanics, swimming system, dynamic weather, interactive map.",
      highlights: ["Full character mechanics (movement, interactions, physics)", "Swimming system with surface/underwater transitions", "Dynamic weather integration (rain, fog, wind)", "Interactive map with trigger zones", "Animations via State Machines and Blend Spaces"],
      sections: [],
    },
    "cs-group": {
      title: "Aeronautical Simulator", subtitle: "CS Group — Defence", type: "Defence Simulation", role: "Embedded Systems Technician",
      description: "Development on an aeronautical device simulator (Inscape VTS) for national defence. Constrained environment, classified documentation, collaboration with domain experts.",
      highlights: ["Designed interactive scenarios for defence flight simulators", "Modular software architecture for scalability and reusability", "Debugged complex simulated behaviours in a controlled environment", "Collaborated with domain experts in a regulated defence context"],
      sections: [],
    },
    "time-restore": {
      title: "Time Restore", subtitle: "Personal project — UE4 → UE5", type: "RPG", role: "Developer / Game Designer",
      description: "3rd-person RPG in a fantasy world where time has stopped. The player must discover why and restart time to save the inhabitants.",
      highlights: ["Fantasy island with varied biomes (lake, village, desert...)", "Quest system with objective journal and narrative progression", "Migration from UE4 to UE5", "Main map level design", "NPC interaction system"],
      sections: [
        { title: "World & Biomes", text: "The island is split into biomes: plains, swamp, desert, caverns, snowy mountains and volcano island. Each zone has its own assets, enemies and quests." },
        { title: "Gameplay & Systems", text: "Quest system with objective journal, NPC interactions, crafting and third-person combat. Game is in pre-alpha." },
      ],
    },
    "virtual-badass": {
      title: "Virtual Badass", subtitle: "Final-year project — E-Artsup", type: "Boss Fight", role: "Developer / Integrator / Game Designer",
      description: "3D boss fight made by a team of 6 over 1 year for the final bachelor year. The player is a futuristic-armoured mercenary who must defeat the boss.",
      highlights: ["Character and boss combat systems", "Tutorial zone and boss arena level design", "Animation and VFX integration", "Project management in a 6-person team over 1 year"],
      sections: [
        { title: "The Boss", text: "The boss is an imposing steampunk robot with multiple attack phases. The arena forces the player to use every mechanic learned in the tutorial." },
        { title: "Characters", text: "Player character in futuristic armour with Buck the robot companion. Both models integrated with full animations." },
      ],
    },
    "sheeplone": {
      title: "Sheeplone", subtitle: "End-of-year project — 2 months", type: "FPS / Survival", role: "Developer / Game Designer",
      description: "FPS in a fantasy world. You play a wizard adventurer thrust into an unknown world by a dark entity, who must find a way home.",
      highlights: ["FPS controller and magic mechanics", "Enemy AI: Fire Sheep and Golem Guardian with distinct behaviours", "Quest system with objective journal", "Open-world fantasy level design"],
      sections: [
        { title: "World & Environment", text: "An open fantasy world with several biomes. Level design guides the player through quest areas." },
        { title: "Enemies & AI", text: "Two enemy types: Fire Sheep (fast, direct attack) and Golem Guardian (slow, powerful, area defender)." },
      ],
    },
    "aigyptos": {
      title: "Aigyptos", subtitle: "Ludum Dare 50 — 4 days", type: "Survival / Stealth", role: "Solo developer",
      description: 'Survival stealth 3D game made in 4 days for Ludum Dare 50, theme "Delay the Inevitable". A mummy escapes her pyramid without being spotted.',
      highlights: ["Full solo development in 4 days (game jam)", "Archaeologist detection AI (cone vision, alert, chase)", "Pyramid level design with multiple escape routes", "Aigys character concept art"],
      sections: [
        { title: "Level Design", text: "The pyramid is a multi-level labyrinth with patrolling guards. The player uses blind spots to sneak to the exit." },
        { title: "Character & Art Direction", text: "Aigys is a stylised Egyptian mummy. The concept art guided the 3D model to stay consistent with the visual world." },
      ],
    },
    "casse-brique": {
      title: "Brick Breaker", subtitle: "School challenge — 2 weeks", type: "Casual Game", role: "Developer",
      description: "2D brick breaker with 10 levels. You play a knight destroying monsters to save your princess. Built in 2 weeks.",
      highlights: ["Enemy AI and block behaviours", "Ball trajectory with physics bounces", "Special blocks: Explosive Block, Armoured Block", "10 levels with increasing difficulty"],
      sections: [
        { title: "Levels", text: "10 levels with increasing difficulty. Early levels serve as tutorials; later levels combine special blocks requiring strategy." },
        { title: "Blocks & AI", text: "Three block types: standard, Armour Block (resistant) and Explosive Block (destroys adjacent blocks). Each has its own reaction AI." },
      ],
    },
  },
};

const translations = {
  fr: {
    nav_about: "À propos",
    nav_experience: "Expérience",
    nav_projects: "Projets",
    nav_skills: "Compétences",
    nav_contact: "Contact",
    nav_cta: "Me contacter",

    hero_tag: "Disponible — Remote / Toulouse",
    hero_subtitle: "Gameplay & Tools Programmer · Unreal Engine 5",
    hero_desc: "Spécialisé en Unreal Engine 5 (C++), outillage éditeur et automatisation de pipeline.\nGameplay. Automatisation. IA appliquée.",
    hero_btn_projects: "Voir mes projets",
    hero_btn_contact: "Me contacter",
    hero_stat1_label: "Ans d'expérience",
    hero_stat3_label: "Langages principaux",

    about_label: "À propos",
    about_title: "Thomas\nLabetouille",
    about_p1: "Je suis Thomas Labetouille, développeur logiciel spécialisé en programmation gameplay sur Unreal Engine 5 et en simulation temps réel.",
    about_p2: "Après un bachelor jeu vidéo à E-Artsup (RNCP Niv. 6), j'ai travaillé en freelance comme Gameplay Programmer sur un projet UE5, puis intégré CS Group pour développer un simulateur aéronautique destiné à la défense nationale — un environnement exigeant, technique et contraint.",
    about_p3: "Ce qui me motive : écrire des systèmes solides, résoudre des problèmes techniques complexes, et voir la logique prendre vie — que ce soit dans un combat de boss ou dans un simulateur de vol.",
    about_p4: "Je suis basé à Toulouse et disponible en full remote ou sur site dans la région.",
    about_card1_label: "Spécialisation principale",
    about_card1_val: "Gameplay & Tools Programming",
    about_card1_sub: "UE5 / C++ / Python",
    about_card2_label: "Expérience pro",
    about_card2_val: "2+ ans",
    about_card2_sub: "Jeu vidéo & Défense",
    about_card3_label: "Disponibilité",
    about_card3_val: "Ouvert aux offres",
    about_card3_sub: "CDI · CDD · Full Remote",
    about_card4_label: "Localisation",
    about_card4_val: "Toulouse, France",
    about_card4_sub: "Remote OK · Mobilité Occitanie",

    exp_label: "Expérience",
    exp_title: "Parcours\nprofessionnel",
    experience: [
      {
        role: "Technicien Systèmes Embarqués",
        company: "CS Group",
        type: "CDI",
        period: "Sept. 2024 — Nov. 2025",
        domain: "Simulation / Défense",
        color: "#7b61ff",
        desc: "Développement sur simulateur aéronautique (Inscape VTS) pour la défense nationale. Environnement sécurisé, documentation classifiée, architecture modulaire.",
      },
      {
        role: "Gameplay Programmer",
        company: "Rainbow Ant Studio",
        type: "Freelance",
        period: "Déc. 2023 — Sept. 2024",
        domain: "Jeu Vidéo / UE5",
        color: "#00d4ff",
        desc: "Mission freelance sur un jeu d'action-aventure UE5. Systèmes gameplay complets : personnage, natation, météo, map interactive.",
      },
      {
        role: "Bachelor Développement de Jeux Vidéo",
        company: "E-Artsup",
        type: "Formation",
        period: "2020 — 2023",
        domain: "RNCP Niveau 6",
        color: "#ff4d00",
        desc: "Spécialisation C# / Unity / Game & Level Design. Certification RNCP Niveau 6.",
      },
    ],

    proj_label: "Projets",
    proj_title: "Ce que j'ai\nconstruit",
    proj_filter_all: "Tous",
    proj_details: "▼ Détails techniques",
    proj_details_close: "▲ Réduire",
    proj_see: "↗ Voir le projet",
    proj_featured: "⚡ Projet phare 2026",
    proj_placeholder: "Images à venir",
    status_completed: "✓ Terminé",
    status_ongoing: "◐ En cours",

    skills_label: "Compétences",
    skills_title: "Stack &\nsavoir-faire",
    skills: [
      { category: "Moteurs", items: ["Unreal Engine 5", "Unreal Engine 5.8", "Unity"] },
      { category: "Langages", items: ["C++", "C#", "Python", "Blueprint (UE5)"] },
      { category: "Gameplay", items: ["Character Movement", "AI / Behavior Trees", "Animation Blueprints", "Physics", "ProceduralMeshComponent"] },
      { category: "IA & Outils", items: ["Claude AI", "MCP (Model Context Protocol)", "Remote Execution API UE5", "Pipeline IA → UE5", "BlueprintAutomation", "verify_level.py", "test_suite.py"] },
      { category: "Simulation", items: ["Temps réel", "Architecture modulaire", "Scénarios interactifs"] },
      { category: "Versioning", items: ["Git / GitHub", "Plastic SCM", "Perforce"] },
      { category: "Soft Skills", items: ["Autonomie remote", "Travail sous pression", "Anglais technique"] },
    ],

    contact_label: "Contact",
    contact_title: "Travaillons\nensemble",
    contact_intro: "Disponible pour des postes en CDI, CDD ou freelance.\nFull remote ou Toulouse et alentours.\nJeu vidéo, simulation, ingénierie logicielle temps réel.",
    contact_email_label: "Email",
    contact_linkedin_label: "LinkedIn",
    contact_github_label: "GitHub",
    contact_github_value: "ue5-agent-verified-levelgen",
    contact_cv_label: "CV",
    contact_cv_value: "Télécharger mon CV",
    contact_cv_file: "/CV_Thomas_Labetouille_FR.pdf",
    footer: "Gameplay Programmer · Toulouse, France",

    detail_back: "← Retour aux projets",
    detail_role: "Rôle",
    detail_engine: "Moteur",
    detail_year: "Année",
    detail_highlights: "// Ce que j'ai développé",
    detail_tech: "Technologies",
    detail_itch: "↗ Télécharger sur itch.io",
    detail_all: "← Tous les projets",
    detail_prev: "← Projet précédent",
    detail_next: "Projet suivant →",

    gallery_claude_panel: "Panneau Claude AI dans l'éditeur UE5",
    gallery_claude_level: "Level design procédural généré par l'agent",
    gallery_claude_python: "Exécution Python temps réel depuis le chat",
    gallery_claude_blueprint: "Édition de Blueprint via BatchWireGraph",
  },

  en: {
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    nav_cta: "Contact me",

    hero_tag: "Available — Remote / Toulouse",
    hero_subtitle: "Gameplay & Tools Programmer · Unreal Engine 5",
    hero_desc: "Specialized in Unreal Engine 5 (C++), editor tooling and pipeline automation.\nGameplay. Automation. Applied AI.",
    hero_btn_projects: "View my projects",
    hero_btn_contact: "Contact me",
    hero_stat1_label: "Years of experience",
    hero_stat3_label: "Main languages",

    about_label: "About",
    about_title: "Thomas\nLabetouille",
    about_p1: "I'm Thomas Labetouille, a software developer specialising in gameplay programming on Unreal Engine 5 and real-time simulation.",
    about_p2: "After a game dev bachelor's at E-Artsup (RNCP Level 6), I worked freelance as a Gameplay Programmer on a UE5 project, then joined CS Group to develop an aeronautical simulator for national defence.",
    about_p3: "What drives me: writing solid systems, solving complex technical problems, and seeing logic come to life — whether in a boss fight or a flight simulator.",
    about_p4: "Based in Toulouse, available fully remote or on-site in the area.",
    about_card1_label: "Main specialisation",
    about_card1_val: "Gameplay & Tools Programming",
    about_card1_sub: "UE5 / C++ / Python",
    about_card2_label: "Pro experience",
    about_card2_val: "2+ years",
    about_card2_sub: "Game dev & Defence",
    about_card3_label: "Availability",
    about_card3_val: "Open to offers",
    about_card3_sub: "Permanent · Fixed-term · Remote",
    about_card4_label: "Location",
    about_card4_val: "Toulouse, France",
    about_card4_sub: "Remote OK · South France",

    exp_label: "Experience",
    exp_title: "Career\npath",
    experience: [
      {
        role: "Embedded Systems Technician",
        company: "CS Group",
        type: "Permanent",
        period: "Sep. 2024 — Nov. 2025",
        domain: "Simulation / Defence",
        color: "#7b61ff",
        desc: "Development on an aeronautical simulator (Inscape VTS) for national defence. Secure environment, classified documentation, modular architecture.",
      },
      {
        role: "Gameplay Programmer",
        company: "Rainbow Ant Studio",
        type: "Freelance",
        period: "Dec. 2023 — Sep. 2024",
        domain: "Game Dev / UE5",
        color: "#00d4ff",
        desc: "Freelance mission on a UE5 action-adventure game. Full gameplay systems: character, swimming, weather, interactive map.",
      },
      {
        role: "Bachelor in Video Game Development",
        company: "E-Artsup",
        type: "Education",
        period: "2020 — 2023",
        domain: "RNCP Level 6",
        color: "#ff4d00",
        desc: "Specialisation in C# / Unity / Game & Level Design. RNCP Level 6 certification.",
      },
    ],

    proj_label: "Projects",
    proj_title: "What I've\nbuilt",
    proj_filter_all: "All",
    proj_details: "▼ Technical details",
    proj_details_close: "▲ Collapse",
    proj_see: "↗ View project",
    proj_featured: "⚡ Featured 2026",
    proj_placeholder: "Images coming soon",
    status_completed: "✓ Completed",
    status_ongoing: "◐ Ongoing",

    skills_label: "Skills",
    skills_title: "Stack &\nexpertise",
    skills: [
      { category: "Engines", items: ["Unreal Engine 5", "Unreal Engine 5.8", "Unity"] },
      { category: "Languages", items: ["C++", "C#", "Python", "Blueprint (UE5)"] },
      { category: "Gameplay", items: ["Character Movement", "AI / Behavior Trees", "Animation Blueprints", "Physics", "ProceduralMeshComponent"] },
      { category: "AI & Tools", items: ["Claude AI", "MCP (Model Context Protocol)", "Remote Execution API UE5", "AI → UE5 Pipeline", "BlueprintAutomation", "verify_level.py", "test_suite.py"] },
      { category: "Simulation", items: ["Real-time", "Modular architecture", "Interactive scenarios"] },
      { category: "Version control", items: ["Git / GitHub", "Plastic SCM", "Perforce"] },
      { category: "Soft Skills", items: ["Autonomous remote worker", "Works under pressure", "Technical English"] },
    ],

    contact_label: "Contact",
    contact_title: "Let's work\ntogether",
    contact_intro: "Available for permanent, fixed-term or freelance positions.\nFully remote or Toulouse area.\nGame dev, simulation, real-time software engineering.",
    contact_email_label: "Email",
    contact_linkedin_label: "LinkedIn",
    contact_github_label: "GitHub",
    contact_github_value: "ue5-agent-verified-levelgen",
    contact_cv_label: "Resume",
    contact_cv_value: "Download my resume",
    contact_cv_file: "/CV_Thomas_Labetouille_EN.pdf",
    footer: "Gameplay Programmer · Toulouse, France",

    detail_back: "← Back to projects",
    detail_role: "Role",
    detail_engine: "Engine",
    detail_year: "Year",
    detail_highlights: "// What I built",
    detail_tech: "Technologies",
    detail_itch: "↗ Download on itch.io",
    detail_all: "← All projects",
    detail_prev: "← Previous project",
    detail_next: "Next project →",

    gallery_claude_panel: "Claude AI panel inside the UE5 editor",
    gallery_claude_level: "Procedural level design generated by the agent",
    gallery_claude_python: "Real-time Python execution from the chat",
    gallery_claude_blueprint: "Blueprint editing via BatchWireGraph",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const t = (key) => translations[lang][key] ?? key;
  const tSkills = () => translations[lang].skills;
  const tProject = (id) => projectsData[lang][id] ?? projectsData.fr[id];
  const tExperience = () => translations[lang].experience;
  return (
    <LangContext.Provider value={{ lang, setLang, t, tSkills, tProject, tExperience }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
