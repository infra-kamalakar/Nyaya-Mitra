export interface LawCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: LawTopic[];
}

export interface LawTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
  rights: string[];
}

export const lawCategories: LawCategory[] = [
  {
    id: "constitution",
    title: "Constitutional Rights",
    description: "Fundamental rights and duties of every Indian citizen.",
    icon: "BookOpen",
    topics: [
      {
        id: "fundamental-rights",
        title: "Fundamental Rights (Part III)",
        summary: "Basic human rights guaranteed to all citizens of India.",
        keyPoints: [
          "Right to Equality (Articles 14-18)",
          "Right to Freedom (Articles 19-22)",
          "Right against Exploitation (Articles 23-24)",
          "Right to Freedom of Religion (Articles 25-28)",
          "Cultural and Educational Rights (Articles 29-30)",
          "Right to Constitutional Remedies (Article 32)"
        ]
      },
      {
        id: "fundamental-duties",
        title: "Fundamental Duties (Article 51A)",
        summary: "Moral obligations of all citizens to help promote a spirit of patriotism and uphold the unity of India.",
        keyPoints: [
          "Abide by the Constitution and respect its ideals.",
          "Cherish and follow the noble ideals that inspired the national struggle for freedom.",
          "Uphold and protect the sovereignty, unity, and integrity of India.",
          "Defend the country and render national service when called upon.",
          "Promote harmony and the spirit of common brotherhood."
        ]
      }
    ]
  },
  {
    id: "criminal",
    title: "Criminal Law (BNS/BNSS)",
    description: "Laws dealing with crimes, their prevention, and punishment.",
    icon: "Scale",
    topics: [
      {
        id: "fir",
        title: "First Information Report (FIR)",
        summary: "A written document prepared by the police when they receive information about the commission of a cognizable offence.",
        keyPoints: [
          "Can be filed by the victim, a witness, or anyone with knowledge of the crime.",
          "Police must register an FIR for cognizable offences (serious crimes like murder, rape, theft).",
          "Zero FIR: Can be filed at any police station, regardless of jurisdiction.",
          "e-FIR: Can be filed online for certain non-heinous crimes."
        ]
      },
      {
        id: "arrest-rights",
        title: "Rights of an Arrested Person",
        summary: "Legal protections available to a person who has been arrested.",
        keyPoints: [
          "Right to know the grounds of arrest.",
          "Right to inform a relative or friend.",
          "Right to consult a lawyer.",
          "Right to be produced before a magistrate within 24 hours.",
          "Right to free legal aid if unable to afford a lawyer."
        ]
      }
    ]
  },
  {
    id: "family",
    title: "Family Law",
    description: "Laws relating to marriage, divorce, inheritance, and adoption.",
    icon: "Users",
    topics: [
      {
        id: "marriage",
        title: "Marriage Laws",
        summary: "Laws governing the solemnization and registration of marriages.",
        keyPoints: [
          "Hindu Marriage Act, 1955: Applies to Hindus, Buddhists, Jains, and Sikhs.",
          "Special Marriage Act, 1954: For inter-faith marriages or those who do not wish to marry under personal laws.",
          "Registration of marriage is mandatory in most states.",
          "Legal age for marriage: 18 for women, 21 for men."
        ]
      },
      {
        id: "domestic-violence",
        title: "Protection from Domestic Violence",
        summary: "The Protection of Women from Domestic Violence Act, 2005.",
        keyPoints: [
          "Protects women from physical, emotional, verbal, sexual, and economic abuse.",
          "Right to reside in the shared household.",
          "Right to obtain protection orders, monetary relief, and custody orders.",
          "Complaint can be filed with the police, Protection Officer, or Magistrate."
        ]
      }
    ]
  },
  {
    id: "consumer",
    title: "Consumer Rights",
    description: "Protection against unfair trade practices and defective goods.",
    icon: "ShoppingBag",
    topics: [
      {
        id: "consumer-protection-act",
        title: "Consumer Protection Act, 2019",
        summary: "Empowers consumers and provides a mechanism for resolving disputes.",
        keyPoints: [
          "Right to Safety: Protection against hazardous goods.",
          "Right to be Informed: Information about quality, quantity, potency, purity, standard, and price.",
          "Right to Choose: Access to a variety of goods at competitive prices.",
          "Right to be Heard: Assurance that consumer interests will receive due consideration.",
          "Right to seek Redressal: Against unfair trade practices or unscrupulous exploitation."
        ]
      },
      {
        id: "filing-complaint",
        title: "How to File a Consumer Complaint",
        summary: "Steps to seek redressal for consumer grievances.",
        keyPoints: [
          "Send a legal notice to the seller/service provider.",
          "File a complaint online via the e-Daakhil portal.",
          "Approach the District Consumer Disputes Redressal Commission for claims up to ₹50 Lakhs.",
          "State Commission for claims between ₹50 Lakhs and ₹2 Crores.",
          "National Commission for claims above ₹2 Crores."
        ]
      }
    ]
  },
  {
    id: "labor",
    title: "Labor & Employment",
    description: "Laws protecting the rights of workers and employees.",
    icon: "Briefcase",
    topics: [
      {
        id: "maternity-benefit",
        title: "Maternity Benefit Act",
        summary: "Protects the employment of women during maternity and entitles them to full paid absence.",
        keyPoints: [
          "26 weeks of paid maternity leave for the first two children.",
          "12 weeks for subsequent children.",
          "Applicable to establishments employing 10 or more persons.",
          "Protection from dismissal during maternity leave."
        ]
      },
      {
        id: "posh",
        title: "POSH Act",
        summary: "Prevention of Sexual Harassment at Workplace.",
        keyPoints: [
          "Mandatory for organizations with 10 or more employees to have an Internal Complaints Committee (ICC).",
          "Defines sexual harassment broadly, including unwelcome physical contact, demands for sexual favors, and sexually colored remarks.",
          "Provides a mechanism for filing complaints and conducting inquiries.",
          "Ensures confidentiality and protection against retaliation."
        ]
      }
    ]
  },
  {
    id: "civic",
    title: "Civic & Environmental",
    description: "Laws regarding public property, littering, and environmental protection.",
    icon: "TreePine",
    topics: [
      {
        id: "public-property-damage",
        title: "Damage to Public Property",
        summary: "The Prevention of Damage to Public Property Act, 1984 deals with offences related to the destruction or vandalism of public assets.",
        keyPoints: [
          "Section 3: Mischief causing damage to public property is punishable with imprisonment up to 5 years and a fine.",
          "Section 4: Causing damage by fire or explosive substance carries a mandatory minimum sentence of 1 year, extending up to 10 years.",
          "Public property includes any building, transport, water/light/power installation owned by the Government or local authorities.",
          "BNS Section 324 (formerly IPC 425): Defines 'Mischief' as causing wrongful loss or damage to the public or any person."
        ]
      },
      {
        id: "littering-nuisance",
        title: "Littering & Public Nuisance",
        summary: "Laws penalizing littering, spitting, and creating a nuisance in public spaces.",
        keyPoints: [
          "BNS Section 270 (formerly IPC 268): Defines 'Public Nuisance' as an act causing common injury, danger, or annoyance to the public.",
          "Solid Waste Management Rules, 2016: Mandates waste segregation at source and empowers local bodies to levy spot fines for littering or illegal dumping.",
          "Municipal Corporation Acts: Local civic bodies (like BMC, NDMC) have specific bylaws to impose strict penalties for spitting, urinating, or littering in public.",
          "Environment (Protection) Act, 1986: Provides umbrella protection for the environment, penalizing severe pollution and hazardous waste dumping."
        ]
      }
    ]
  }
];

export const scenarios: Scenario[] = [
  {
    id: "traffic-stop",
    title: "Stopped by Traffic Police",
    description: "What to do and what your rights are if you are pulled over.",
    icon: "Car",
    steps: [
      "Pull over safely and turn off the engine.",
      "Stay calm and polite. Do not argue aggressively.",
      "Provide your driving license, registration certificate (RC), insurance, and PUC certificate when asked. (Digital copies in DigiLocker/mParivahan are legally valid).",
      "If issued a challan, you can pay it online or in court. You have the right to contest it.",
      "If asked to take a breathalyzer test, cooperate. Refusal can lead to arrest or fines."
    ],
    rights: [
      "Police cannot confiscate your keys or vehicle without a valid reason (e.g., suspected stolen, driver is intoxicated).",
      "You have the right to ask for the officer's identification.",
      "Traffic police below the rank of Sub-Inspector (one star) cannot issue a challan for certain offences.",
      "Women cannot be searched by male officers."
    ]
  },
  {
    id: "rent-dispute",
    title: "Landlord-Tenant Dispute",
    description: "Handling common issues like eviction or deposit return.",
    icon: "Home",
    steps: [
      "Review your rent agreement carefully.",
      "Communicate the issue in writing (email or registered post) to the landlord/tenant.",
      "If unresolved, send a formal legal notice through a lawyer.",
      "If the issue persists, approach the Rent Control Court or Civil Court."
    ],
    rights: [
      "A landlord cannot evict a tenant without proper notice (usually 1 month, as per the agreement).",
      "Landlords cannot cut off essential services (water, electricity) to force eviction.",
      "Tenants have the right to peaceful possession of the property.",
      "Security deposits must be returned as per the terms of the agreement."
    ]
  },
  {
    id: "cybercrime",
    title: "Victim of Cybercrime",
    description: "Steps to take if you face online fraud, harassment, or hacking.",
    icon: "MonitorSmartphone",
    steps: [
      "Do not delete any evidence (emails, messages, screenshots, bank statements).",
      "Immediately block the perpetrator and report the account on the platform.",
      "If financial fraud, contact your bank immediately to block the card/account.",
      "Report the incident on the National Cyber Crime Reporting Portal (cybercrime.gov.in) or call 1930.",
      "File an FIR at the nearest Cyber Crime Police Station."
    ],
    rights: [
      "Right to file a complaint anonymously in certain cases (like child pornography or rape).",
      "Banks must reverse unauthorized transactions if reported within 3 days.",
      "Right to privacy and protection of personal data."
    ]
  },
  {
    id: "rti",
    title: "Filing an RTI",
    description: "How to use the Right to Information Act to get government data.",
    icon: "FileText",
    steps: [
      "Identify the Public Authority (government department) you need information from.",
      "Draft your application clearly, specifying the information required.",
      "Submit the application online (rtionline.gov.in) or offline (via post) with the prescribed fee (usually ₹10).",
      "Wait for the response (usually within 30 days).",
      "If no response or unsatisfied, file a First Appeal."
    ],
    rights: [
      "Any Indian citizen can seek information from public authorities.",
      "Information concerning life and liberty must be provided within 48 hours.",
      "BPL (Below Poverty Line) citizens are exempt from paying the fee.",
      "Right to inspect documents and take certified copies."
    ]
  },
  {
    id: "public-damage",
    title: "Witnessing Vandalism or Littering",
    description: "What to do if you see someone damaging public property or littering.",
    icon: "AlertOctagon",
    steps: [
      "For severe vandalism or destruction of public property, do not confront aggressive mobs directly. Call 112 or the local police immediately.",
      "Safely document the incident by taking photos or videos of the act, the damage, and vehicle number plates if applicable.",
      "For civic issues like littering, open dumping of garbage, or uncollected waste, use the 'Swachhata-MoHUA' app to report directly to your local municipality.",
      "You can also file a written complaint with the municipal health officer or the local police station for public nuisance."
    ],
    rights: [
      "Article 51A(i) of the Constitution makes it a Fundamental Duty of every citizen to safeguard public property and to abjure violence.",
      "Article 51A(g) makes it a duty to protect and improve the natural environment.",
      "You have the right to a clean environment, which is recognized as part of the Right to Life (Article 21).",
      "Informants of crimes can request police to keep their identity confidential."
    ]
  }
];
