/**
 * DCI Kenya System - Comprehensive Data Store & Logic
 */

// 1. Data Store: Specialized Units & Directorates
const dciUnitsData = [
  {
    id: "crib",
    name: "Crime Research & Intelligence Bureau (CRIB)",
    acronym: "CRIB",
    icon: "brain-circuit",
    category: "Intelligence",
    description: "The core analytical nerve center of the DCI. Analyzes crime patterns, tracks digital footprints, and maps out organized criminal networks.",
    tags: ["Data Analytics", "Phone Tracking", "Syndicate Mapping", "Crime Trends"]
  },
  {
    id: "atpu",
    name: "Anti-Terrorism Police Unit",
    acronym: "ATPU",
    icon: "shield-alert",
    category: "Special Operations",
    description: "Counters violent extremism, deters radicalization networks, and conducts tactical anti-terrorism investigations across Kenya.",
    tags: ["Counter-Terrorism", "Radicalization", "Tactical Ops", "Border Security"]
  },
  {
    id: "forensics",
    name: "National Forensic Science Laboratory",
    acronym: "NFSL",
    icon: "microscope",
    category: "Scientific Support",
    description: "Located at Mazingira Complex. Conducts scientific analysis on crime scene physical evidence, DNA, cyber artifacts, and ballistics.",
    tags: ["DNA Profiling", "Cyber Forensics", "Ballistics", "Toxicology", "Fingerprints"]
  },
  {
    id: "cybercrime",
    name: "Cybercrime Unit",
    acronym: "CCU",
    icon: "cpu",
    category: "Digital Crimes",
    description: "Investigates digital financial fraud, SIM-swap syndicates, hacking, malware attacks, online identity theft, and social media scams.",
    tags: ["SIM-Swap Fraud", "Digital Forensics", "Hacking", "Identity Theft"]
  },
  {
    id: "scu",
    name: "Serious Crime Unit",
    acronym: "SCU",
    icon: "alert-triangle",
    category: "Investigations",
    description: "Handles high-profile, complex violent felonies, sophisticated abductions, major robberies, and cold-case homicides.",
    tags: ["Homicide", "Abductions", "Major Felonies", "Cold Cases"]
  },
  {
    id: "land-fraud",
    name: "Land Fraud Investigations Unit",
    acronym: "LFIU",
    icon: "file-text",
    category: "Economic Crimes",
    description: "Investigates forged title deeds, double-allocations, fraudulent land transactions, and registry irregularities in liaison with the Ministry of Lands.",
    tags: ["Title Deed Forgery", "Double Allocation", "Registry Audit"]
  },
  {
    id: "anu",
    name: "Anti-Narcotics Unit",
    acronym: "ANU",
    icon: "package-x",
    category: "Specialized Unit",
    description: "Detects, intercepts, and prosecutes illicit drug trafficking networks, international drug syndicates, and illegal substance distribution.",
    tags: ["Drug Interdiction", "Syndicate Busts", "Ports Security"]
  },
  {
    id: "bfu",
    name: "Banking Fraud & Economic Crimes Unit",
    acronym: "BFIU",
    icon: "landmark",
    category: "Economic Crimes",
    description: "Investigates money laundering, banking transactions irregularities, SACCO embezzlement, and corporate financial crimes.",
    tags: ["Money Laundering", "Bank Fraud", "SACCO Fraud", "Corporate Theft"]
  }
];

// 2. Data Store: Investigation Workflow
const workflowData = [
  {
    step: 1,
    title: "1. Incident Receipt & Assessment",
    subtitle: "Registration & Preliminary File Opening",
    points: [
      "Crime is formally reported at a Police Station, directly at DCI County/Sub-County offices, or initiated via ODPP/intelligence alerts.",
      "Duty detectives evaluate jurisdiction, severity, and specialized skills required.",
      "An official Occurrence Book (OB) entry and Inquiry File are opened."
    ]
  },
  {
    step: 2,
    title: "2. Crime Scene & Evidence Collection",
    subtitle: "Securing Physical & Digital Proof",
    points: [
      "Crime Scene Officers (SOCO) cordon off and systematically map the scene.",
      "Physical evidence (biological samples, weapons, latent fingerprints) is documented.",
      "Digital devices (smartphones, hard drives, CCTV footage) are secured under strict chain-of-custody protocols."
    ]
  },
  {
    step: 3,
    title: "3. Scientific & Intelligence Analysis",
    subtitle: "Forensic Laboratory & CRIB Processing",
    points: [
      "Evidence is routed to the Mazingira Forensic Laboratory for DNA profiling, ballistic matching, or digital extraction.",
      "Crime Research & Intelligence Bureau (CRIB) analyzes telecommunication logs and suspect associate networks.",
      "Expert scientific reports are generated for court admissibility."
    ]
  },
  {
    step: 4,
    title: "4. Suspect Interrogation & Arrest",
    subtitle: "Legal Apprehension & Statement Taking",
    points: [
      "Witness statements are recorded under Section 52 of the National Police Service Act.",
      "Suspects are apprehended under constitutional guidelines (Article 49).",
      "Suspects must be presented in court within 24 hours or granted bail/bond as guided by law."
    ]
  },
  {
    step: 5,
    title: "5. ODPP File Handover & Prosecution",
    subtitle: "Case File Compilation & Legal Review",
    points: [
      "Investigating Officers (IOs) compile the Duplicate Case File containing all evidence and witness testimonies.",
      "File is submitted to the Office of the Director of Public Prosecutions (ODPP) for charging approval.",
      "DCI officers and forensic experts appear in court as expert witnesses to tender evidence."
    ]
  }
];

// 3. Data Store: Interpol Red Notices (Mock)
const interpolNotices = [
  { name: "John Mark Okello", age: 38, crime: "Transnational Cyber Fraud / Money Laundering", status: "WANTED BY NCB NAIROBI" },
  { name: "Sarah Cherono", age: 42, crime: "Large-Scale Land Document Forgery", status: "RED NOTICE ISSUED" },
  { name: "Ahmad Rashid Ali", age: 31, crime: "Narcotics Trafficking & Syndicate Operations", status: "WANTED BY NCB NAIROBI" }
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Render Units
  renderUnits(dciUnitsData);

  // Search Filter Handler
  const searchInput = document.getElementById("unit-search");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = dciUnitsData.filter(u => 
      u.name.toLowerCase().includes(query) ||
      u.description.toLowerCase().includes(query) ||
      u.tags.some(t => t.toLowerCase().includes(query))
    );
    renderUnits(filtered);
  });

  // Render Workflow Visualizer
  renderWorkflowNav();
  selectWorkflowStep(1);

  // Tab Navigation Handler
  setupTabs();

  // Form Handlers
  setupPccForm();
  setupTipForm();

  // Render Interpol Cards
  renderInterpolNotices();
});

// Render Function for Units
function renderUnits(units) {
  const container = document.getElementById("units-grid");
  if (units.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted);">No units found matching your search term.</p>`;
    return;
  }

  container.innerHTML = units.map(unit => `
    <div class="unit-card">
      <div>
        <div class="unit-header">
          <div class="unit-icon">
            <i data-lucide="${unit.icon}"></i>
          </div>
          <div class="unit-title">
            <h3>${unit.acronym}</h3>
            <span>${unit.category}</span>
          </div>
        </div>
        <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 8px;">${unit.name}</h4>
        <p class="unit-desc">${unit.description}</p>
      </div>
      <div class="unit-tags">
        ${unit.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Render Workflow Navigation
function renderWorkflowNav() {
  const container = document.getElementById("workflow-steps-nav");
  container.innerHTML = workflowData.map(item => `
    <button class="step-nav-btn" data-step="${item.step}">
      <span class="step-num">${item.step}</span>
      <span>${item.title.split('. ')[1]}</span>
    </button>
  `).join('');

  container.querySelectorAll('.step-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-step'));
      selectWorkflowStep(step);
    });
  });
}

// Select Active Workflow Step
function selectWorkflowStep(stepNumber) {
  // Update Buttons
  document.querySelectorAll('.step-nav-btn').forEach(btn => {
    const s = parseInt(btn.getAttribute('data-step'));
    if (s === stepNumber) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Display Card
  const stepData = workflowData.find(w => w.step === stepNumber);
  const display = document.getElementById("workflow-detail-display");
  
  display.innerHTML = `
    <h3>${stepData.title}</h3>
    <div class="step-subtitle">${stepData.subtitle}</div>
    <ul class="workflow-list">
      ${stepData.points.map(pt => `<li>${pt}</li>`).join('')}
    </ul>
  `;
}

// Tab Switching Mechanism
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Simulator: PCC Good Conduct Form
function setupPccForm() {
  const form = document.getElementById("pcc-form");
  const resultBox = document.getElementById("pcc-result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ref = document.getElementById("pcc-ref").value;
    
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; color: var(--accent-green);">
        <i data-lucide="check-circle"></i>
        <strong>Certificate Valid & Verified</strong>
      </div>
      <p style="margin-top: 8px; font-size: 0.88rem; color: #cbd5e1;">
        Reference <strong>${ref}</strong> is officially cleared in the National Fingerprint Central Repository.
      </p>
    `;
    if (window.lucide) lucide.createIcons();
  });
}

// Simulator: Anonymous Tip Submission
function setupTipForm() {
  const form = document.getElementById("tip-form");
  const resultBox = document.getElementById("tip-result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const randomHash = "CRIB-HASH-" + Math.floor(100000 + Math.random() * 900000);

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; color: var(--primary-gold);">
        <i data-lucide="shield-check"></i>
        <strong>Encrypted Tip Successfully Dispatched to CRIB</strong>
      </div>
      <p style="margin-top: 8px; font-size: 0.88rem; color: #cbd5e1;">
        Tracking Hash Code: <code>${randomHash}</code>. No IP address or personal identity logs were recorded.
      </p>
    `;
    form.reset();
    if (window.lucide) lucide.createIcons();
  });
}

// Interpol Notices Generator
function renderInterpolNotices() {
  const container = document.getElementById("interpol-grid");
  container.innerHTML = interpolNotices.map(item => `
    <div class="interpol-card">
      <div class="interpol-header">
        <strong style="color: #fff;">${item.name}</strong>
        <span class="interpol-tag">${item.status}</span>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">Age: ${item.age}</div>
      <p style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${item.crime}</p>
    </div>
  `).join('');
}