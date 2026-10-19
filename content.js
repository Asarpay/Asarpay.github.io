/* ==========================================================================
   content.js  —  EDIT THIS FILE to update your site.
   Everything on the page is generated from the data below.
   To add a certificate / paper / report:
     1. Put the file in the  files/  folder (PDF, PNG or JPG).
     2. Add an entry to the  documents  list at the bottom.
   ========================================================================== */

window.CV = {
  name: "Quray Asarpay Potosí Dumaguala",
  shortName: "Quray Potosí",
  role: "Physics undergraduate · Computational materials science",
  tagline:
    "I study topological defects in 2D NbS₂ with first-principles calculations and machine-learned interatomic potentials.",
  location: "Yachay Tech University, Ecuador",
  /* Colors: "lattice" (teal & violet) · "andes" (terracotta & gold) ·
     "aurora" (green & sky blue) · "plasma" (magenta & orange) · "paper" (academic).
     showPalettePicker: true shows the 🎨 button so visitors can switch;
     set it to false to lock the site to your chosen palette. */
  palette: "lattice",
  showPalettePicker: true,

  photo: "", // e.g. "files/photo.jpg"  — leave empty to show initials
  cvPdf: "", // e.g. "files/CV_Quray_Potosi.pdf" — adds a "Download CV" button

  links: {
    email: "you@example.com",           // TODO
    github: "https://github.com/USERNAME", // TODO
    linkedin: "",                       // optional
    orcid: "",                          // optional
    scholar: "",                        // optional
  },

  about: [
    "I'm an undergraduate physics student at Yachay Tech University in the CompNano Research Group, supervised by Dr. Henry Pinto. My thesis combines density functional theory (VASP) for electronic properties with high-dimensional neural network potentials (RuNNer / n2p2 + LAMMPS) to reach the large supercells needed for mechanical properties.",
    "In 2026 I joined Prof. Jörg Behler's group at Ruhr University Bochum through the RESOLV Undergraduate Exchange Programme, developing HDNNPs for NbS₂ monolayers with flower-like topological defects. I'm looking for PhD opportunities in computational materials science and machine-learning potentials.",
  ],

  stats: [
    { value: "337", label: "DFT structures in my training set" },
    { value: "8", label: "member NNP committee" },
    { value: "236", label: "atoms in 9×9 defect supercell" },
    { value: "1", label: "Best Poster Award" },
  ],

  research: [
    {
      title: "HDNNPs for NbS₂ with topological defects",
      where: "Behler Group · Ruhr University Bochum (RESOLV)",
      text:
        "Built and validated high-dimensional neural network potentials for pristine and flower-defect NbS₂ monolayers: dataset curation, hyperparameter sweeps, committee-based active learning, and equation-of-state validation against DFT.",
      tags: ["RuNNer", "LAMMPS", "Active learning", "ASE"],
    },
    {
      title: "Flower-like defects in NbS₂ superlattices",
      where: "CompNano Group · Yachay Tech (thesis)",
      text:
        "DFT study of the electronic structure of flower-like topological defects, combined with ML potentials to obtain elastic properties (Birch–Murnaghan fits, bulk modulus) of larger supercells.",
      tags: ["VASP", "DFT", "PAW-PBE", "2D materials"],
    },
    {
      title: "Superradiance in the α-attractor potential",
      where: "Collaboration · published in IJMPA",
      text:
        "Studied superradiance in the α-attractor potential using the log-derivative method.",
      tags: ["Quantum mechanics", "Numerical methods"],
    },
  ],

  /* Timeline — newest first. Add dates where you know them. */
  timeline: [
    {
      date: "Oct 2026",
      title: "Speaker — Yachay Open Science Week 2026",
      place: "Yachay Tech, Ecuador",
      text: "Unraveling Flower-like Topological Defects on the NbS₂ Monolayer Superlattices with First-Principles Calculations and Machine Learning.",
      kind: "talk",
    },
    {
      date: "2026",
      title: "Research internship — Behler Group",
      place: "Ruhr University Bochum, Germany · RESOLV Undergraduate Exchange",
      text: "Development of High-Dimensional Neural Network Potentials for Niobium Disulfide Monolayers with Topological Defects.",
      kind: "research",
    },
    {
      date: "May 2026",
      title: "12th Summer School Solvation Science",
      place: "RESOLV Graduate School Solvation Science · Ruhr University Bochum, Germany",
      text: "Lectures on state-of-the-art solvation science, career exchange with industry, and advanced hands-on modules (26–29 May 2026).",
      kind: "training",
      file: "files/Quray Potosi_RESOLV_Certificate_SuSch2026.pdf",
    },
    {
      date: "2026",
      title: "Paper published — Int. J. Mod. Phys. A",
      place: "Second author",
      text: "Study of the Superradiance Phenomenon in the α–attractor Potential using the Log Derivative Method.",
      kind: "paper",
    },
    {
      date: "2025",
      title: "Poster — Natural Science Baltic Conference",
      place: "Work selected for publication",
      text: "NbS₂ topological defect research.",
      kind: "talk",
    },
    {
      date: "May 2025",
      title: "🏆 Best Poster Award — Nanophysics Day",
      place: "Yachay Tech, Ecuador",
      text: "Computational studies of topological defects on transition-metal dichalcogenide NbS₂ monolayer superlattice.",
      kind: "award",
    },
    {
      date: "Mar–May 2023",
      title: "Instructor — Logic & Critical Thinking",
      place: "Russell EdTech Project · \"Sánchez y Cifuentes\" high school",
      text: "Taught senior high-school students using Tarski's World.",
      kind: "teaching",
    },
    {
      date: "Feb 2023",
      title: "Organizing Committee — Hult Prize OnCampus Program 2023–2024",
      place: "Hult Prize Foundation · Yachay Tech University",
      text: "Helped organize the on-campus edition of the Hult Prize, the global social-entrepreneurship competition for students.",
      kind: "leadership",
      file: "files/HP25-Organizing_comm-Potosí-Dumaguala-Quray.pdf",
    },
    {
      date: "Mar 2022",
      title: "Organizing Committee — Hult Prize at Yachay Tech",
      place: "Hult Prize Foundation · Yachay Tech University",
      text: "Member of the organizing committee of the Hult Prize at Yachay Tech (18 March 2022).",
      kind: "leadership",
      file: "files/HP22-organizing-comm-Quray_Potosí.pdf",
    },
    {
      date: "—",
      title: "Undergraduate research assistant",
      place: "Yachay Tech",
      text: "Experimental projects: hard carbon synthesis from banana peels; avocado seeds project.",
      kind: "research",
    },
    {
      date: "—",
      title: "B.Sc. Physics",
      place: "Yachay Tech University, Ecuador",
      text: "Thesis in the CompNano Research Group, supervised by Dr. Henry Pinto.",
      kind: "education",
    },
  ],

  publications: [
    {
      authors: "Á. Salazar, <b>Q. Potosí</b>, D. Laroze, L. M. Pérez, B. de Zayas, C. Rojas",
      title: "Study of the Superradiance Phenomenon in the α–attractor Potential using the Log Derivative Method",
      venue: "International Journal of Modern Physics A",
      year: "2026",
      doi: "10.1142/S0217751X26501757",
      pdf: "", // e.g. "files/superradiance_ijmpa.pdf"
    },
  ],

  /* ------------------------------------------------------------------------
     EXTRA SECTIONS — add as many as you want. Each one gets its own block on
     the page and its own link in the menu automatically.
     Each item: title (required), subtitle, date, text, tags, link, file (all optional).
     file: a PDF in files/ — adds a "View certificate" button that opens it.
     To add a section: copy one { ... } block, change the id and title, fill items.
     ------------------------------------------------------------------------ */
  extraSections: [
    {
      id: "training",                  // short, no spaces (used in the URL: #training)
      title: "Schools & Training",     // section heading
      menu: "Training",                // name in the top menu (optional)
      items: [
        {
          title: "EPIC IV & EPIC V — Scientific Data Analysis and Machine Learning in Python",
          subtitle: "ICTP · Grupo de Investigadores Latitud Cero · Physics Without Frontiers (UNESCO)",
          date: "",
          text: "Programming schools on scientific data analysis and machine learning with Python.",
          tags: ["Python", "Machine learning", "Data analysis"],
          file: "files/EPICV-Quray_Asarpay_Potosí_Dumaguala.pdf",
        },
        {
          title: "Introduction to Quantum Information Science & Engineering",
          subtitle: "C2QA (USA) · 4-day program",
          date: "",
          text: "Hands-on introduction to quantum information, including circuits on IBM Quantum Composer.",
          tags: ["Quantum computing", "IBM Quantum"],
          file: "files/QISE-Quray_Asarpay_Potosí_Dumaguala.pdf",
        },
        {
          title: "12th Summer School Solvation Science",
          subtitle: "RESOLV Graduate School Solvation Science · Ruhr University Bochum",
          date: "26–29 May 2026",
          text: "Two days of lectures on state-of-the-art solvation science, half a day of career exchange with industry guests, and a day of advanced hands-on theoretical/experimental training.",
          tags: ["Solvation science", "RESOLV", "Germany"],
          file: "files/Quray Potosi_RESOLV_Certificate_SuSch2026.pdf",
        },
      ],
    },
    {
      id: "leadership",
      title: "Leadership & Outreach",
      menu: "Leadership",
      items: [
        {
          title: "Organizing Committee — Hult Prize OnCampus Program 2023–2024",
          subtitle: "Hult Prize Foundation · Yachay Tech University",
          date: "Feb 2023",
          text: "Helped organize the university edition of the Hult Prize, the world's largest student competition for social entrepreneurship.",
          tags: ["Event organization", "Social entrepreneurship"],
          file: "files/HP25-Organizing_comm-Potosí-Dumaguala-Quray.pdf",
        },
        {
          title: "Organizing Committee — Hult Prize at Yachay Tech",
          subtitle: "Hult Prize Foundation · Yachay Tech University",
          date: "Mar 2022",
          text: "Member of the organizing committee of the Hult Prize at Yachay Tech.",
          tags: ["Event organization", "Teamwork"],
          file: "files/HP22-organizing-comm-Quray_Potosí.pdf",
        },
        {
          title: "Instructor — Logic & Critical Thinking",
          subtitle: "Russell EdTech Project · \"Sánchez y Cifuentes\" high school",
          date: "Mar–May 2023",
          text: "Taught logic and critical thinking to senior high-school students using Tarski's World.",
          tags: ["Teaching", "Logic"],
        },
      ],
    },
  ],

  skills: [
    { group: "Simulation", items: ["VASP (DFT)", "LAMMPS", "RuNNer", "n2p2", "ASE"] },
    { group: "Programming", items: ["Python", "NumPy / Matplotlib", "MPI", "Bash", "Linux"] },
    { group: "HPC", items: ["SLURM", "CEDIA cluster", "Jagiellonian Univ. cluster (Cracow)"] },
    { group: "Methods", items: ["ML interatomic potentials", "Active learning", "Equation of state fitting", "Finite volume methods", "FFT solvers", "Langevin dynamics"] },
    { group: "Languages", items: ["Spanish (native)", "English (C1 · CEFR)"] },
  ],

  /* ------------------------------------------------------------------------
     DOCUMENTS — certificates, papers, reports, posters…
     type: "certificate" | "paper" | "report" | "poster" | "language" | "leadership" | "other"
     file: path inside the repo (PDF or image). Leave "" until you upload it.
     thumb: optional preview image (PNG/JPG). Images are their own thumbnail.
     ------------------------------------------------------------------------ */
  documents: [
    {
      title: "Best Poster Award — Nanophysics Day 2025",
      type: "certificate",
      date: "2025-05-22",
      issuer: "Yachay Tech University",
      file: "",
    },
      {
      
      title: "Computational studies of topological defects on transition-metal dichalcogenide NbS₂ monolayer superlattice",
      type: "certificate", 
      date: "2025",
      issuer: "Natural Science Baltic Conference",
      file: "files/MB_Potosi.pdf",
    },

     
    {
      title: "RESOLV Undergraduate Exchange — Research stay",
      type: "certificate",
      date: "2026",
      issuer: "RESOLV · Ruhr University Bochum",
      file: "files/UExch-Certificate-2026_Q-A_Potosi_Dumaguala.pdf",
    },
    {
      title: "EPIC IV — Scientific Data Analysis & ML in Python",
      type: "certificate",
      date: "",
      issuer: "ICTP · Latitud Cero · Physics Without Frontiers",
      file: "",
    },
    {
      title: "EPIC V — Scientific Data Analysis & ML in Python",
      type: "certificate",
      date: "",
      issuer: "ICTP · Latitud Cero · Physics Without Frontiers",
      file: "files/EPICV-Quray_Asarpay_Potosí_Dumaguala.pdf",
    },
    {
      title: "Introduction to Quantum Information Science & Engineering",
      type: "certificate",
      date: "",
      issuer: "C2QA (USA)",
      file: "files/QISE-Quray_Asarpay_Potosí_Dumaguala.pdf",
    },
    {
      title: "12th Summer School Solvation Science",
      type: "certificate",
      date: "May 2026",
      issuer: "RESOLV Graduate School · Ruhr University Bochum",
      file: "files/Quray Potosi_RESOLV_Certificate_SuSch2026.pdf",
    },
    {
      title: "English Language Proficiency — CEFR C1 (95/120)",
      type: "language",
      date: "May 2026",
      issuer: "Yachay Tech Language Center",
      file: "files/english-c1-certificate.pdf",
    },
    {
      title: "Organizing Committee — Hult Prize OnCampus 2023–2024",
      type: "leadership",
      date: "Feb 2023",
      issuer: "Hult Prize Foundation",
      file: "files/HP25-Organizing_comm-Potosí-Dumaguala-Quray.pdf",
    },
    {
      title: "Organizing Committee — Hult Prize at Yachay Tech",
      type: "leadership",
      date: "Mar 2022",
      issuer: "Hult Prize Foundation",
      file: "files/HP22-organizing-comm-Quray_Potosí.pdf",
    },
    {
      title: "Superradiance in the α–attractor potential (IJMPA)",
      type: "paper",
      date: "2026",
      issuer: "Int. J. Mod. Phys. A",
      link: "https://doi.org/10.1142/S0217751X26501757",
    },
    {
      title: "Topological defects on NbS₂ monolayer superlattice",
      type: "poster",
      date: "2025-05-22",
      issuer: "Nanophysics Day 2025",
      file: "files/Quray_Asarpay_Potosi_Dumaguala.pdf",
    },
    {
      title: "HDNNPs for NbS₂ monolayers — internship report",
      type: "certificate",
      date: "2026",
      issuer: "Behler Group, RUB",
      file: "files/Internship Confirmation Letter-Potosi.pdf",
    },
    {
      title: "Computational physics projects (MPI, FVM, FFT)",
      type: "report",
      date: "",
      issuer: "Yachay Tech · CEDIA cluster",
      
    },
  ],
};
