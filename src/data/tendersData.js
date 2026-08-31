// 🇮🇳 PAIMANA Central Sector E-Procurement & Tendering Intelligence Dataset
// Compliant with CPPP (Central Public Procurement Portal), GeM (Government e-Marketplace), and GFR 2017 Rules

export const TENDERS_DATA = [
  // ==========================================
  // 1. ONGOING TENDERS (Active for Bidding)
  // ==========================================
  {
    id: "TND-2026-NHAI-0884",
    title: "Construction of 6-Lane Access-Controlled Highway Package IV (Vadodara–Mumbai Expressway Section)",
    ministry: "Ministry of Road Transport and Highways",
    agency: "NHAI",
    sector: "Road Transport & Highways",
    location: "Maharashtra / Gujarat",
    state: "Maharashtra",
    status: "ongoing",
    statusLabel: "Open for Bidding",
    estimatedCostCr: 1850.0,
    emdAmountCr: 18.5,
    tenderFee: 50000,
    bidOpeningDate: "2026-05-20",
    bidClosingDate: "2026-05-15T17:00:00",
    workDurationMonths: 30,
    procurementType: "EPC (Engineering, Procurement & Construction)",
    evaluationMethod: "L1 with Mandatory Technical Qualification",
    bidsReceivedCount: 4,
    description: "EPC execution for 42.6 km Greenfield 6-lane access-controlled expressway including 3 major bridges over river bodies, 14 underpasses, toll management integration, and environmental mitigation corridors.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 900.0,
      minSingleWorkCr: 740.0,
      minSimilarExperienceYears: 7,
      mandatoryMachinery: [
        { name: "Electronic Sensor Asphalt Pavers", requiredQty: 4, minCapacity: "9m width" },
        { name: "Soil Compactor / Tandem Rollers", requiredQty: 10, minCapacity: "12 Ton" },
        { name: "Automated Concrete Batching Plant", requiredQty: 2, minCapacity: "120 m³/hr" }
      ],
      requiredCertifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018 (Safety)"],
      financialSolvencyCr: 370.0
    }
  },
  {
    id: "TND-2026-RVNL-0412",
    title: "Design & Construction of 38 KM Tunnels & Elevated Bridges on Rishikesh–Karanprayag Broad Gauge Rail Link",
    ministry: "Ministry of Railways",
    agency: "RVNL",
    sector: "Railways",
    location: "Uttarakhand",
    state: "Uttarakhand",
    status: "ongoing",
    statusLabel: "Open for Bidding",
    estimatedCostCr: 2420.0,
    emdAmountCr: 24.2,
    tenderFee: 75000,
    bidOpeningDate: "2026-06-02",
    bidClosingDate: "2026-05-28T18:00:00",
    workDurationMonths: 42,
    procurementType: "Item Rate / NATM Underground Tunneling EPC",
    evaluationMethod: "QCBS (80:20 Quality-Cost Based Selection)",
    bidsReceivedCount: 3,
    description: "Complex Himalayan tunneling package employing New Austrian Tunneling Method (NATM), escape tunnels, cross-passages, automated ventilation shafts, and seismic monitoring stations across fault zones.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 1200.0,
      minSingleWorkCr: 960.0,
      minSimilarExperienceYears: 10,
      mandatoryMachinery: [
        { name: "Computerized Multi-boom Drill Jumbos", requiredQty: 4, minCapacity: "Heavy Tunneling" },
        { name: "Robotic Shotcreting Units", requiredQty: 6, minCapacity: "30 m³/hr" },
        { name: "High-Volume Ventilation Fans", requiredQty: 8, minCapacity: "100 m³/sec" }
      ],
      requiredCertifications: ["ISO 9001:2015", "ISO 45001:2018 Underground Tunneling Safety"],
      financialSolvencyCr: 480.0
    }
  },
  {
    id: "TND-2026-IGGL-0199",
    title: "142 KM River Crossing & High-Pressure Natural Gas Pipeline Installation for North East Gas Grid",
    ministry: "Ministry of Petroleum and Natural Gas",
    agency: "IGGL / MoPNG",
    sector: "Petroleum & Natural Gas",
    location: "Assam / Meghalaya",
    state: "Assam",
    status: "ongoing",
    statusLabel: "Open for Bidding",
    estimatedCostCr: 680.0,
    emdAmountCr: 6.8,
    tenderFee: 25000,
    bidOpeningDate: "2026-06-10",
    bidClosingDate: "2026-06-05T16:00:00",
    workDurationMonths: 18,
    procurementType: "EPC Turnkey Pipeline Installation",
    evaluationMethod: "L1 Price Based with Technical Pre-qualification",
    bidsReceivedCount: 5,
    description: "Laying 24-inch outer diameter API 5L Grade X-70 natural gas pipeline with Horizontal Directional Drilling (HDD) crossing over Brahmaputra tributaries, SCADA telemetry, and cathodic protection.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 350.0,
      minSingleWorkCr: 270.0,
      minSimilarExperienceYears: 5,
      mandatoryMachinery: [
        { name: "Maxi-Rig HDD Machines (>250 Ton pull)", requiredQty: 2, minCapacity: "250 Ton Pullback" },
        { name: "Automated Pipe Bending Machines", requiredQty: 3, minCapacity: "24-inch API 5L" },
        { name: "Ultrasonic / X-Ray Weld Testing Rigs", requiredQty: 4, minCapacity: "NDT Level III" }
      ],
      requiredCertifications: ["ISO 9001:2015", "PNGRB T4S Pipeline Safety Compliance"],
      financialSolvencyCr: 140.0
    }
  },
  {
    id: "TND-2026-NTPC-0914",
    title: "Balance of Plant (BoP) and Supercritical Boiler-Turbine Package for 1200 MW Power Expansion",
    ministry: "Ministry of Power",
    agency: "NTPC",
    sector: "Power",
    location: "Madhya Pradesh",
    state: "Madhya Pradesh",
    status: "ongoing",
    statusLabel: "Open for Bidding",
    estimatedCostCr: 5100.0,
    emdAmountCr: 51.0,
    tenderFee: 100000,
    bidOpeningDate: "2026-06-25",
    bidClosingDate: "2026-06-20T17:30:00",
    workDurationMonths: 48,
    procurementType: "International Competitive Bidding (ICB)",
    evaluationMethod: "Two-Envelope QCBS System",
    bidsReceivedCount: 2,
    description: "Design, engineering, manufacturing, civil works, and commissioning of 2x600 MW Supercritical Thermal power units including Flue Gas Desulfurization (FGD), dry ash handling, and zero liquid discharge (ZLD).",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 2500.0,
      minSingleWorkCr: 2000.0,
      minSimilarExperienceYears: 12,
      mandatoryMachinery: [
        { name: "Crawler Cranes (Heavy Lift)", requiredQty: 4, minCapacity: "350 Ton+" },
        { name: "Automated Submerged Arc Welding Stations", requiredQty: 8, minCapacity: "Heavy Pressure Vessel" }
      ],
      requiredCertifications: ["ASME Boiler & Pressure Vessel Stamp", "ISO 9001:2015"],
      financialSolvencyCr: 1000.0
    }
  },

  // ==========================================
  // 2. UPCOMING TENDERS (RFP & Pre-Bid Stage)
  // ==========================================
  {
    id: "TND-2026-NHSRCL-0072",
    title: "High-Speed Rail Ballastless Track Slab Manufacturing & Catenary Electrification Package (Sabarmati Section)",
    ministry: "Ministry of Railways",
    agency: "NHSRCL",
    sector: "Railways / High Speed Rail",
    location: "Gujarat",
    state: "Gujarat",
    status: "upcoming",
    statusLabel: "RFP Published • Pre-Bid Soon",
    estimatedCostCr: 3150.0,
    emdAmountCr: 31.5,
    tenderFee: 80000,
    expectedBidOpening: "July 2026",
    preBidMeetingDate: "2026-06-15",
    workDurationMonths: 36,
    procurementType: "Specialized High Speed Shinkansen Tech Transfer EPC",
    evaluationMethod: "QCBS with Japanese JICA Alignment",
    bidsReceivedCount: 0,
    description: "Manufacture and precision installation of RC Track Slabs for 320 km/h Bullet Train operations, 25 kV AC 50 Hz auto-transformer feeding system, and automated fault detection sensors.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 1500.0,
      minSingleWorkCr: 1200.0,
      minSimilarExperienceYears: 8,
      mandatoryMachinery: [
        { name: "Precision Track Laying Gantries", requiredQty: 2, minCapacity: "Sub-millimeter Accuracy" }
      ],
      requiredCertifications: ["High Speed Rail Track Certification", "ISO 9001:2015"],
      financialSolvencyCr: 600.0
    }
  },
  {
    id: "TND-2026-AAI-0335",
    title: "Greenfield Integrated Passenger Terminal Building & CAT-III Instrument Runway Package",
    ministry: "Ministry of Civil Aviation",
    agency: "AAI",
    sector: "Civil Aviation",
    location: "Andhra Pradesh",
    state: "Andhra Pradesh",
    status: "upcoming",
    statusLabel: "Draft RFP Under Review",
    estimatedCostCr: 1400.0,
    emdAmountCr: 14.0,
    tenderFee: 40000,
    expectedBidOpening: "August 2026",
    preBidMeetingDate: "2026-07-10",
    workDurationMonths: 24,
    procurementType: "EPC Turnkey Airport Infrastructure",
    evaluationMethod: "L1 with Mandatory Technical Compliance",
    bidsReceivedCount: 0,
    description: "4-star GRIHA green terminal building with 8 aerobridges, 3,750m CAT-III-B all-weather runway, multi-level passenger car parking, and ATC Tower with automated navigation aids.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 700.0,
      minSingleWorkCr: 550.0,
      minSimilarExperienceYears: 6,
      mandatoryMachinery: [
        { name: "Airfield Pavement Slipform Pavers", requiredQty: 2, minCapacity: "Runway Standard" }
      ],
      requiredCertifications: ["DGCA Airport Construction Standards", "GRIHA Green Building Auditor"],
      financialSolvencyCr: 280.0
    }
  },
  {
    id: "TND-2026-CIL-0561",
    title: "Turnkey Installation of 18 KM Fully-Enclosed Overland Belt Conveyor & Rapid Coal Loading Silo System",
    ministry: "Ministry of Coal",
    agency: "Coal India (MCL)",
    sector: "Coal & Mines",
    location: "Odisha",
    state: "Odisha",
    status: "upcoming",
    statusLabel: "Expression of Interest (EOI) Live",
    estimatedCostCr: 920.0,
    emdAmountCr: 9.2,
    tenderFee: 30000,
    expectedBidOpening: "September 2026",
    preBidMeetingDate: "2026-07-28",
    workDurationMonths: 20,
    procurementType: "First Mile Connectivity (FMC) EPC",
    evaluationMethod: "L1 Price Based with Proven Bulk Material Handling Credentials",
    bidsReceivedCount: 0,
    description: "Pollution-free First Mile Connectivity pipeline conveying 20 MTPA crushed coal from open-cast pits directly into automated railway rapid loading silos.",
    mandatoryRequirements: {
      minAnnualTurnoverCr: 450.0,
      minSingleWorkCr: 360.0,
      minSimilarExperienceYears: 5,
      mandatoryMachinery: [
        { name: "Heavy Structural Steel Fabrication Gantry", requiredQty: 4, minCapacity: "50 Ton" }
      ],
      requiredCertifications: ["ISO 9001:2015", "OSHAS 18001 Mining Environment"],
      financialSolvencyCr: 180.0
    }
  },

  // ==========================================
  // 3. COMPLETED & AWARDED TENDERS (With Debriefing & Disqualification Analysis)
  // ==========================================
  {
    id: "TND-2025-DFCCIL-0219",
    title: "Supply, Installation & Commissioning of European Train Control System (ETCS Level-2) Signaling & Telecom",
    ministry: "Ministry of Railways",
    agency: "DFCCIL",
    sector: "Railways",
    location: "Haryana / Rajasthan / Gujarat",
    state: "Rajasthan",
    status: "completed",
    statusLabel: "Awarded • Final Debrief Available",
    estimatedCostCr: 1450.0,
    awardedCostCr: 1410.0,
    awardDate: "2026-02-14",
    awardedContractor: "Siemens - Larsen & Toubro (L&T) Consortium",
    totalBidsReceived: 5,
    procurementType: "International Competitive Bidding (ICB)",
    evaluationMethod: "QCBS (80:20 Quality-Cost Scoring)",
    winnerTechnicalScore: 94.2,
    winnerFinancialQuoteCr: 1410.0,
    
    // Comprehensive Debrief Breakdown for all Bidders
    biddersDebrief: [
      {
        companyName: "Siemens - Larsen & Toubro (L&T) Consortium",
        status: "WINNER (L1)",
        financialQuoteCr: 1410.0,
        technicalScore: 94.2,
        compositeScore: 95.36,
        isWinner: true,
        reason: "Highest composite score under QCBS criteria. Demonstrated 100% compliance with ETCS Level-2 interoperability standards and offered the lowest competitive price bid.",
        strengths: ["Exceeded minimum railway signaling experience by 8 years", "Strong local manufacturing under Make in India (82% local content)", "Zero non-compliance in statutory audits"]
      },
      {
        companyName: "Bharat Heavy Tech Infra Pvt Ltd",
        status: "NON-WINNING (L2)",
        financialQuoteCr: 1495.0,
        technicalScore: 91.0,
        compositeScore: 89.44,
        isWinner: false,
        reason: "Financial Bid was ₹85.00 Crore (6.03%) higher than the L1 winning quote. Technical score was robust, but financial variance resulted in lower composite ranking.",
        detailedGapAnalysis: {
          financialVariance: "+₹85.00 Cr higher than L1 winner",
          technicalScoreVariance: "-3.20 points behind L1 (Deductions in radio block center redundancy architecture)",
          complianceStatus: "Fully Qualified, but lost on commercial pricing evaluation"
        },
        recommendationsForFutureBids: "Optimize component sourcing for wayside signaling modules and reduce local contingency markups to achieve tighter financial margins."
      },
      {
        companyName: "GMR - TransRail Signaling JV",
        status: "NON-WINNING (L3)",
        financialQuoteCr: 1560.0,
        technicalScore: 87.5,
        compositeScore: 84.10,
        isWinner: false,
        reason: "Financial quote was ₹150.00 Cr (10.64%) above L1 winner. Technical scoring was penalized due to inadequate track record in dual-channel GSM-R radio integration.",
        detailedGapAnalysis: {
          financialVariance: "+₹150.00 Cr higher than L1 winner",
          technicalScoreVariance: "-6.70 points behind L1",
          complianceStatus: "Sub-optimal technical scoring on telecom resilience"
        },
        recommendationsForFutureBids: "Partner with Tier-1 telecom radio technology providers to improve technical evaluation marks in next-generation high-speed rail tenders."
      },
      {
        companyName: "Infracon EPC Systems Pvt Ltd",
        status: "DISQUALIFIED (Technical Stage)",
        financialQuoteCr: 1380.0, // Had a lower price, but failed mandatory tech gates!
        technicalScore: 58.0,
        compositeScore: 0.0,
        isWinner: false,
        reason: "Disqualified at Technical Evaluation Stage due to failure to meet Mandatory Clause 4.2 (Annual Turnover) and Clause 6.1 (Solvency Certificate).",
        detailedGapAnalysis: {
          financialVariance: "Price bid not opened due to Stage 1 technical disqualification",
          technicalScoreVariance: "Disqualified (Below 75.0 threshold)",
          complianceStatus: "Critical Statutory Non-Compliance"
        },
        disqualificationReasons: [
          "Mandatory Clause 4.2 Violation: Average Annual Turnover in FY 2023-24 was ₹410 Cr against the required minimum of ₹700 Cr.",
          "Mandatory Clause 6.1 Violation: Financial Solvency certificate was issued by an unauthorized co-operative credit society instead of a Scheduled Commercial Bank.",
          "Technical Personnel Shortfall: Lead Signaling Safety Assessor did not possess mandatory IRSE Level 3 certification."
        ],
        recommendationsForFutureBids: "Ensure all statutory documents are attested by Scheduled Commercial Banks and verify mandatory turnover thresholds prior to tender submission."
      },
      {
        companyName: "Vishwa Railtech Solutions",
        status: "DISQUALIFIED (Bid Security Rejection)",
        financialQuoteCr: 0.0,
        technicalScore: 0.0,
        compositeScore: 0.0,
        isWinner: false,
        reason: "Disqualified at Preliminary Screening Stage due to invalid EMD Bank Guarantee format and missing Power of Attorney.",
        disqualificationReasons: [
          "EMD Bank Guarantee validity was 90 days against the mandatory tender requirement of 180 days.",
          "Power of Attorney for the authorized signatory was not notarized on non-judicial stamp paper."
        ],
        recommendationsForFutureBids: "Strictly adhere to Appendix-II standard formats for Bank Guarantees and ensure proper notarization."
      }
    ]
  },
  {
    id: "TND-2025-NHIDCL-0488",
    title: "Engineering & Construction of High-Altitude Sela Pass Approach Roads & Snow Avalanche Galleries",
    ministry: "Ministry of Road Transport and Highways",
    agency: "NHIDCL",
    sector: "Road Transport & Highways",
    location: "Arunachal Pradesh",
    state: "Arunachal Pradesh",
    status: "completed",
    statusLabel: "Awarded • Final Debrief Available",
    estimatedCostCr: 790.0,
    awardedCostCr: 740.0,
    awardDate: "2026-01-28",
    awardedContractor: "Afcons Infrastructure Ltd",
    totalBidsReceived: 4,
    procurementType: "EPC Item Rate with High Altitude Special Provisions",
    evaluationMethod: "L1 Financial Selection among Technically Qualified Bidders",
    winnerTechnicalScore: 96.0,
    winnerFinancialQuoteCr: 740.0,

    biddersDebrief: [
      {
        companyName: "Afcons Infrastructure Ltd",
        status: "WINNER (L1)",
        financialQuoteCr: 740.0,
        technicalScore: 96.0,
        isWinner: true,
        reason: "Lowest qualified price bid (L1). Full technical compliance with winter-grade sub-zero concrete additives and certified snow-avalanche shed construction equipment.",
        strengths: ["Demonstrated track record of 4 completed high-altitude tunnel/pass projects in Himalayas", "Ownership of 4 mobile heated batching plants"]
      },
      {
        companyName: "Hindustan Construction Company (HCC)",
        status: "NON-WINNING (L2)",
        financialQuoteCr: 785.0,
        technicalScore: 94.5,
        isWinner: false,
        reason: "Financial Bid was ₹45.00 Crore (6.08%) higher than L1 quote. Technical qualification was approved with high marks.",
        detailedGapAnalysis: {
          financialVariance: "+₹45.00 Cr higher than L1 winner",
          technicalScoreVariance: "-1.50 points",
          complianceStatus: "Technically Qualified"
        },
        recommendationsForFutureBids: "Re-evaluate local logistic hauling costs across the Bhalukpong–Tawang corridor to achieve sharper price competitiveness."
      },
      {
        companyName: "Himalayan Infra Works Ltd",
        status: "DISQUALIFIED (Technical Stage)",
        financialQuoteCr: 720.0, // Lower quote but failed tech compliance
        technicalScore: 61.0,
        isWinner: false,
        reason: "Disqualified during Technical Evaluation due to absence of dedicated sub-zero temperature concrete curing technology required under High-Altitude Clause 8.4.",
        disqualificationReasons: [
          "Clause 8.4 Non-Compliance: Bidder proposed standard ambient batching plant without mandatory steam-heating and anti-freeze admixtures for -15°C winter concreting.",
          "Equipment Shortfall: Failed to produce proof of ownership/lease for heavy-duty snow-clearing rotary blowers."
        ],
        recommendationsForFutureBids: "Procure or tie-up with specialized extreme-weather construction equipment suppliers for projects in Altitude Zone > 10,000 feet."
      }
    ]
  }
];
