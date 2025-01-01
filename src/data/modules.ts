export type Module = {
  code: string;
  title: string;
  creditHours: number;
  prerequisite: string[];
  pathway: string[];
  year: number;
  semester: number;
};

export const PATHWAYS = [
  "all",
  "BSc in Information Technology and Computing",
  "BSc in Information Technology and Computing (Computer Science)",
  "BSc in Information Technology and Computing (Computing with Business)",
  "BSc in Information Technology and Computing (Network and Security)",
  "BSc in Information Technology and Computing (Web Development)",
  "Bachelor of Business Studies (Accounting)",
  "Bachelor of Business Studies (Accounting in Arabic)",
  "Bachelor of Business Studies (Marketing)",
  "Bachelor of Business Studies (Systems)",
  "BA in English Language and Literature"
] as const;

export const modules: Module[] = [
  // First Year - First Semester (16 CHs)
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 1
  },
  {
    code: "AR111",
    title: "Arabic Communication Skills I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Communication Skills I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 1
  },
  {
    code: "MT129",
    title: "Calculus and Probability",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (17 CHs)
  {
    code: "AR112",
    title: "Arabic Communication Skills II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Communication Skills II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 2
  },
  {
    code: "TM103",
    title: "Computer Organization and Architecture",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 2
  },
  {
    code: "MT131",
    title: "Discrete Mathematics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Requirement / Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (16 CHs)
  {
    code: "TM105",
    title: "Introduction to Programming",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 1
  },
  {
    code: "MT132",
    title: "Linear Algebra",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 1
  },
  {
    code: "TM111",
    title: "Introduction to Computing and Information Technology I",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (19 CHs)
  {
    code: "TM112",
    title: "Introduction to Computing and Information Technology II",
    creditHours: 8,
    prerequisite: ["TM111"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 2
  },
  {
    code: "M251",
    title: "Object-Oriented Programming using Java",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (16 CHs)
  {
    code: "M269",
    title: "Algorithms, Data Structures and Computability",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 3,
    semester: 1
  },
  {
    code: "T215A",
    title: "Communication and Information Technologies-A",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (19 CHs)
  {
    code: "T215B",
    title: "Communication and Information Technologies-B",
    creditHours: 8,
    prerequisite: ["T215A"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 3,
    semester: 2
  },
  {
    code: "TM351",
    title: "Data Management and Analysis",
    creditHours: 8,
    prerequisite: ["M269"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 3,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (20 CHs)
  {
    code: "TM355",
    title: "Communications Technology",
    creditHours: 8,
    prerequisite: ["T215B"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 4,
    semester: 1
  },
  {
    code: "TM354",
    title: "Software Engineering",
    creditHours: 8,
    prerequisite: ["M251"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 4,
    semester: 1
  },
  {
    code: "TM471-A",
    title: "ITC. Project-A",
    creditHours: 4,
    prerequisite: ["TM351"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (8 CHs)
  {
    code: "CAS400",
    title: "Applied Studies For Computing Students",
    creditHours: 4,
    prerequisite: ["TM354"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 4,
    semester: 2
  },
  {
    code: "TM471-B",
    title: "ITC. Project-B",
    creditHours: 4,
    prerequisite: ["TM471-A"],
    pathway: ["BSc in Information Technology and Computing"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (16 CHs)
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 1
  },
  {
    code: "AR111",
    title: "Arabic Communication Skills I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Communication Skills I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 1
  },
  {
    code: "MT129",
    title: "Calculus and Probability",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (17 CHs)
  {
    code: "AR112",
    title: "Arabic Communication Skills II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Communication Skills II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 2
  },
  {
    code: "TM105",
    title: "Introduction to Programming",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 2
  },
  {
    code: "MT131",
    title: "Discrete Mathematics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Requirement / Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (20 CHs)
  {
    code: "TM111",
    title: "Introduction to Computing and Information Technology I",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 1
  },
  {
    code: "MT132",
    title: "Linear Algebra",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 1
  },
  {
    code: "M251",
    title: "Object-Oriented Programming using Java",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (20 CHs)
  {
    code: "TM112",
    title: "Introduction to Computing and Information Technology II",
    creditHours: 8,
    prerequisite: ["TM111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 2
  },
  {
    code: "TM103",
    title: "Computer Organization and Architecture",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 2
  },
  {
    code: "M269",
    title: "Algorithms, Data Structures and Computability",
    creditHours: 8,
    prerequisite: ["MT131", "TM105"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (16 CHs)
  {
    code: "T227",
    title: "Change, Strategy and Project at Work",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 3,
    semester: 1
  },
  {
    code: "TM240",
    title: "Computer Graphics and Multimedia",
    creditHours: 4,
    prerequisite: ["MT132", "TM105"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 3,
    semester: 1
  },
  {
    code: "TM298",
    title: "Operating Systems",
    creditHours: 4,
    prerequisite: ["TM103", "TM105"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (16 CHs)
  {
    code: "TM351",
    title: "Data Management and Analysis",
    creditHours: 8,
    prerequisite: ["M251", "M269"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 3,
    semester: 2
  },
  {
    code: "TM354",
    title: "Software Engineering",
    creditHours: 8,
    prerequisite: ["M251", "M269"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (15 CHs)
  {
    code: "TM366",
    title: "Artificial Intelligence",
    creditHours: 8,
    prerequisite: ["M269"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 1
  },
  {
    code: "TM471-A",
    title: "CS. Project-A",
    creditHours: 4,
    prerequisite: ["TM351", "TM354"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (11 CHs)
  {
    code: "TM471-2",
    title: "CS. Project-B",
    creditHours: 4,
    prerequisite: ["TM471-A"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 2
  },
  {
    code: "CAS400",
    title: "Applied Studies For Computing Students",
    creditHours: 4,
    prerequisite: ["TM354"],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computer Science)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (16 CHs)
  {
    code: "AR111",
    title: "Arabic Communication Skills I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Communication Skills I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 1
  },
  {
    code: "MT129",
    title: "Calculus and Probability",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (17 CHs)
  {
    code: "AR112",
    title: "Arabic Communication Skills II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Communication Skills II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 2
  },
  {
    code: "TM105",
    title: "Introduction to Programming",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 2
  },
  {
    code: "MT131",
    title: "Discrete Mathematics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Requirement / Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (20 CHs)
  {
    code: "BUS110",
    title: "Introduction to Business",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 1
  },
  {
    code: "TM111",
    title: "Introduction to Computing and Information",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 1
  },
  {
    code: "MT132",
    title: "Linear Algebra",
    creditHours: 4,
    prerequisite: ["EL112"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (20 CHs)
  {
    code: "B207A",
    title: "Shaping business opportunities A",
    creditHours: 8,
    prerequisite: ["BUS110"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 2
  },
  {
    code: "TM103",
    title: "Computer Organization and Architecture",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 2
  },
  {
    code: "M251",
    title: "Object-Oriented Programming using Java",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (19 CHs)
  {
    code: "B207B",
    title: "Shaping business opportunities B",
    creditHours: 8,
    prerequisite: ["B207A"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 3,
    semester: 1
  },
  {
    code: "M269",
    title: "Algorithms, Data Structures and Computability",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 3,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (16 CHs)
  {
    code: "TM352",
    title: "Web, Mobile and Cloud Technologies",
    creditHours: 8,
    prerequisite: ["M251"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 3,
    semester: 2
  },
  {
    code: "BUS310",
    title: "Strategic Management",
    creditHours: 8,
    prerequisite: ["B207B"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (15 CHs)
  {
    code: "TM351",
    title: "Data Management and Analysis",
    creditHours: 8,
    prerequisite: ["M269"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 4,
    semester: 1
  },
  {
    code: "TM471-A",
    title: "CwB Project-A",
    creditHours: 4,
    prerequisite: ["BUS310"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 4,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (8 CHs)
  {
    code: "TM471-B",
    title: "CwB Project-B",
    creditHours: 4,
    prerequisite: ["TM471-A"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 4,
    semester: 2
  },
  {
    code: "CAS400",
    title: "Applied Studies For Computing Students",
    creditHours: 4,
    prerequisite: ["TM352"],
    pathway: ["BSc in Information Technology and Computing (Computing with Business)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (12 CHs)
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 1
  },
  {
    code: "AR111",
    title: "Arabic Communication Skills I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Communication Skills I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (18 CHs)
  {
    code: "AR112",
    title: "Arabic Communication Skills II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Communication Skills II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 2
  },
  {
    code: "TM111",
    title: "Introduction to Computing and Information Technology I",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 2
  },
  {
    code: "MT129",
    title: "Calculus and Probability",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (19 CHs)
  {
    code: "TM105",
    title: "Introduction to Programming",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 1
  },
  {
    code: "MT131",
    title: "Discrete Mathematics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 1
  },
  {
    code: "TM112",
    title: "Introduction to Computing and Information Technology II",
    creditHours: 8,
    prerequisite: ["TM111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "University Requirement / Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (20 CHs)
  {
    code: "T216A",
    title: "Cisco Networking (CCNA)-A",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 2
  },
  {
    code: "M251",
    title: "Object-Oriented Programming using Java",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 2
  },
  {
    code: "MT132",
    title: "Linear Algebra",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (20 CHs)
  {
    code: "T227",
    title: "Change, Strategy and Project at Work",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 1
  },
  {
    code: "T216B",
    title: "Cisco Networking (CCNA)-B",
    creditHours: 8,
    prerequisite: ["T216A"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 1
  },
  {
    code: "TM103",
    title: "Computer Organization and Architecture",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (19 CHs)
  {
    code: "T316",
    title: "Advanced Networking",
    creditHours: 8,
    prerequisite: ["T216B"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 2
  },
  {
    code: "TM352",
    title: "Web, Mobile and Cloud Technologies",
    creditHours: 8,
    prerequisite: ["M251"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (15 CHs)
  {
    code: "T318",
    title: "Applied Network Security",
    creditHours: 8,
    prerequisite: ["T216B", "TM260"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 4,
    semester: 1
  },
  {
    code: "TM471-A",
    title: "N&S Project-A",
    creditHours: 4,
    prerequisite: ["T316", "T318", "TM355"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 4,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (8 CHs)
  {
    code: "TM471-B",
    title: "N&S Project-B",
    creditHours: 4,
    prerequisite: ["TM471-A"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 4,
    semester: 2
  },
  {
    code: "CAS400",
    title: "Applied Studies For Computing Students",
    creditHours: 4,
    prerequisite: ["TM352"],
    pathway: ["BSc in Information Technology and Computing (Network and Security)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester
  {
    code: "AR111",
    title: "Communication Skills in Arabic I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "Communication Skills in English-Intermediate",
    creditHours: 3,
    prerequisite: ["EL99"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Learning On-Line",
    creditHours: 3,
    prerequisite: ["EL99"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 1
  },
  {
    code: "EL117",
    title: "Writing",
    creditHours: 4,
    prerequisite: ["EL99"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester
  {
    code: "AR112",
    title: "Communication Skills in Arabic II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "Communication Skills in English-Upper Intermediate",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 2
  },
  {
    code: "EL120",
    title: "English phonetics and Linguistics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 2
  },
  {
    code: "EL121N",
    title: "Literary appreciation and Critique",
    creditHours: 4,
    prerequisite: ["EL117"],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 2
  },
  {
    code: "FR101",
    title: "French for Beginners/Current International Issues and problems",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BA in English Language and Literature"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester
  {
    code: "AA202A",
    title: "Arts of Past & Present (I)",
    creditHours: 8,
    prerequisite: ["EL121/120"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 1
  },
  {
    code: "U214A",
    title: "Worlds of English (I)",
    creditHours: 8,
    prerequisite: ["EL121/120"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 1
  },
  {
    code: "EL118",
    title: "Oral Presentation Skills",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester
  {
    code: "AA202B",
    title: "Arts of Past & Present (II)",
    creditHours: 8,
    prerequisite: ["AA202A"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 2
  },
  {
    code: "U214B",
    title: "Worlds of English (II)",
    creditHours: 8,
    prerequisite: ["U214A"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 2
  },
  {
    code: "EL119",
    title: "Reading",
    creditHours: 4,
    prerequisite: ["EL118"],
    pathway: ["BA in English Language and Literature"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester
  {
    code: "A230A",
    title: "Reading and Studying Literature (I)",
    creditHours: 8,
    prerequisite: ["AA202B"],
    pathway: ["BA in English Language and Literature"],
    year: 3,
    semester: 1
  },
  {
    code: "E304A",
    title: "Exploring English Grammar I",
    creditHours: 8,
    prerequisite: ["U214B"],
    pathway: ["BA in English Language and Literature"],
    year: 3,
    semester: 1
  },
  {
    code: "EL122",
    title: "Writing Research",
    creditHours: 4,
    prerequisite: ["EL117"],
    pathway: ["BA in English Language and Literature"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester
  {
    code: "A230B",
    title: "Reading and Studying Literature (II)",
    creditHours: 8,
    prerequisite: ["AA202B"],
    pathway: ["BA in English Language and Literature"],
    year: 3,
    semester: 2
  },
  {
    code: "E304B",
    title: "Exploring English Grammar II",
    creditHours: 8,
    prerequisite: ["U214B"],
    pathway: ["BA in English Language and Literature"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester
  {
    code: "EA300A",
    title: "Children's Literature I",
    creditHours: 8,
    prerequisite: ["A230B"],
    pathway: ["BA in English Language and Literature"],
    year: 4,
    semester: 1
  },
  {
    code: "LAS-400",
    title: "Applied Studies for English Students",
    creditHours: 4,
    prerequisite: ["A230B"],
    pathway: ["BA in English Language and Literature"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester
  {
    code: "EA300B",
    title: "Children's Literature II",
    creditHours: 8,
    prerequisite: ["EA300A"],
    pathway: ["BA in English Language and Literature"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester
  {
    code: "AR111",
    title: "Arabic Communication Skills I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Communication Skills I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 1
  },
  {
    code: "MT129",
    title: "Calculus and Probability",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester
  {
    code: "AR112",
    title: "Arabic Communication Skills II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Communication Skills II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 2
  },
  {
    code: "TM105",
    title: "Introduction to Programming",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 2
  },
  {
    code: "MT131",
    title: "Discrete Mathematics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Requirement / Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester
  {
    code: "TM103",
    title: "Computer Organization and Architecture",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 1
  },
  {
    code: "MT132",
    title: "Linear Algebra",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 1
  },
  {
    code: "TM111",
    title: "Introduction to Computing and IT (I)",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester
  {
    code: "TM112",
    title: "Introduction to Computing and IT (II)",
    creditHours: 8,
    prerequisite: ["TM111"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 2
  },
  {
    code: "M251",
    title: "Object-Oriented Programming using Java",
    creditHours: 8,
    prerequisite: ["TM105"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester
  {
    code: "M269",
    title: "Algorithms, Data Structures and Computability",
    creditHours: 8,
    prerequisite: ["TM105", "MT131"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 3,
    semester: 1
  },
  {
    code: "T227",
    title: "Change, Strategy and Project at Work",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester
  {
    code: "TM354",
    title: "Software Engineering",
    creditHours: 8,
    prerequisite: ["M251"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 3,
    semester: 2
  },
  {
    code: "TT284",
    title: "Web Technologies",
    creditHours: 8,
    prerequisite: ["TM112"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 3,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty Requirements / Electives",
    creditHours: 3,
    prerequisite: [],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester
  {
    code: "TM352",
    title: "Web, Mobile and Cloud Technologies",
    creditHours: 8,
    prerequisite: ["TT284"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 4,
    semester: 1
  },
  {
    code: "TM356",
    title: "Interaction Design and the User Experience",
    creditHours: 8,
    prerequisite: ["TT284"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 4,
    semester: 1
  },
  {
    code: "TM471-A",
    title: "WD Project-A",
    creditHours: 4,
    prerequisite: ["TM352", "TM354", "TM356"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester
  {
    code: "TM471-B",
    title: "WD Project-B",
    creditHours: 4,
    prerequisite: ["TM471-A"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 4,
    semester: 2
  },
  {
    code: "CAS400",
    title: "Applied Studies For Computing Students",
    creditHours: 4,
    prerequisite: ["TM352"],
    pathway: ["BSc in Information Technology and Computing (Web Development)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester
  {
    code: "AR111",
    title: "Communication Skills in Arabic I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "Communication Skills in English I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: ["EL099", "EL98"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 1
  },
  {
    code: "BUS101",
    title: "Introduction to Math for Business",
    creditHours: 4,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester
  {
    code: "AR112",
    title: "Communication Skills in Arabic II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "Communication Skills in English II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 2
  },
  {
    code: "BUS102",
    title: "Introduction to Statistics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester
  {
    code: "BUS110",
    title: "Introduction to Business Study",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 2,
    semester: 1
  },
  {
    code: "LB170",
    title: "Professional Communication Skills for Business Studies",
    creditHours: 8,
    prerequisite: ["EL112"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester
  {
    code: "B124",
    title: "Fundamentals of Accounting",
    creditHours: 8,
    prerequisite: ["B120", "EL112"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester
  {
    code: "B207A",
    title: "Shaping Business Opportunities A",
    creditHours: 8,
    prerequisite: ["BUS110", "B120", "B124", "BE2104"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 3,
    semester: 1
  },
  {
    code: "B291",
    title: "Financial Accounting",
    creditHours: 8,
    prerequisite: ["B124", "BE2104", "BE211/4"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester
  {
    code: "B207B",
    title: "Shaping Business Opportunities B",
    creditHours: 8,
    prerequisite: ["B207A", "B203A", "B124", "BE2104", "BE211/4"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 3,
    semester: 2
  },
  {
    code: "B292",
    title: "Management Accounting",
    creditHours: 8,
    prerequisite: ["B291"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester
  {
    code: "BUS310",
    title: "Strategic Management",
    creditHours: 8,
    prerequisite: ["B207B", "B203B", "B291", "B292"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 1
  },
  {
    code: "ACC300",
    title: "Accounting Information System",
    creditHours: 4,
    prerequisite: ["B291", "B292"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 1
  },
  {
    code: "ACC302",
    title: "Auditing Theory and Practice",
    creditHours: 4,
    prerequisite: ["B291", "B292"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester
  {
    code: "B326",
    title: "Advanced Financial Accounting",
    creditHours: 8,
    prerequisite: ["B291"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 2
  },
  {
    code: "B392",
    title: "Advanced Management Accounting",
    creditHours: 8,
    prerequisite: ["B292"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 2
  },
  {
    code: "BAS400",
    title: "Applied Statistics for Business Students",
    creditHours: 4,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Accounting)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (16 CHs)
  {
    code: "AR111",
    title: "Arabic Comm. Skills - I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Comm. Skills - I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: ["EL099", "EL98"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 1
  },
  {
    code: "BUS101",
    title: "Introduction to Math for Business",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (16 CHs)
  {
    code: "AR112",
    title: "Arabic Comm. Skills - II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Comm. Skills - II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 2
  },
  {
    code: "BUS102",
    title: "Introduction to Statistics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (16 CHs)
  {
    code: "BUS110",
    title: "Introduction to Business Study",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 2,
    semester: 1
  },
  {
    code: "LB170",
    title: "Professional Communication Skills for Business Studies",
    creditHours: 8,
    prerequisite: ["EL112"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (16 CHs)
  {
    code: "B122",
    title: "Introduction to Retail Management and Marketing",
    creditHours: 8,
    prerequisite: ["BUS110", "EL112"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty-elective",
    creditHours: 4,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty-elective",
    creditHours: 4,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (16 CHs)
  {
    code: "B207A",
    title: "Shaping Business Opportunities A",
    creditHours: 8,
    prerequisite: ["BUS110", "B120"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 3,
    semester: 1
  },
  {
    code: "B205A",
    title: "Exploring Innovation and Entrepreneurship A",
    creditHours: 8,
    prerequisite: ["B122", "BUS110", "B120"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (16 CHs)
  {
    code: "B207B",
    title: "Shaping Business Opportunities B",
    creditHours: 8,
    prerequisite: ["B207A", "B203A"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 3,
    semester: 2
  },
  {
    code: "B205B",
    title: "Exploring Innovation and Entrepreneurship B",
    creditHours: 8,
    prerequisite: ["B205A"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (16 CHs)
  {
    code: "BUS310",
    title: "Strategic Management",
    creditHours: 8,
    prerequisite: ["B207B", "B203B"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 1
  },
  {
    code: "B324",
    title: "Marketing and Society",
    creditHours: 8,
    prerequisite: ["B205B"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (20 CHs)
  {
    code: "B327",
    title: "Sustainable Enterprise and Innovation",
    creditHours: 8,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 2
  },
  {
    code: "MKT331",
    title: "Digital Marketing",
    creditHours: 4,
    prerequisite: ["B324"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 2
  },
  {
    code: "MKT332",
    title: "Service Marketing",
    creditHours: 4,
    prerequisite: ["B324"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 2
  },
  {
    code: "BAS400",
    title: "Applied Studies for Business Students",
    creditHours: 4,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Marketing)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (16 CHs)
  {
    code: "AR111",
    title: "Arabic Comm. Skills - I",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111",
    title: "English Comm. Skills - I",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 1
  },
  {
    code: "GR101",
    title: "Self-Learning Skills",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 1
  },
  {
    code: "TU170",
    title: "Computing Essentials",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 1
  },
  {
    code: "BUS101",
    title: "Introduction to Math for Business",
    creditHours: 4,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (16 CHs)
  {
    code: "AR112",
    title: "Arabic Comm. Skills - II",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112",
    title: "English Comm. Skills - II",
    creditHours: 3,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 2
  },
  {
    code: "BUS102",
    title: "Introduction to Statistics",
    creditHours: 4,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "University Elective",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (16 CHs)
  {
    code: "BUS110",
    title: "Introduction to Business Study",
    creditHours: 8,
    prerequisite: ["EL111"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 2,
    semester: 1
  },
  {
    code: "LB170",
    title: "Professional Communication Skills for Business Studies",
    creditHours: 8,
    prerequisite: ["EL112"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (16 CHs)
  {
    code: "B123",
    title: "Management Practice",
    creditHours: 8,
    prerequisite: ["BUS110", "B120", "EL112"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty-elective",
    creditHours: 4,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 2,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "Faculty-elective",
    creditHours: 4,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (16 CHs)
  {
    code: "B207A",
    title: "Shaping Business Opportunities A",
    creditHours: 8,
    prerequisite: ["BUS110", "B120"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 3,
    semester: 1
  },
  {
    code: "SYS210",
    title: "Managing Technology & Innovation",
    creditHours: 8,
    prerequisite: ["B123"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (16 CHs)
  {
    code: "B207B",
    title: "Shaping Business Opportunities B",
    creditHours: 8,
    prerequisite: ["B203A"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 3,
    semester: 2
  },
  {
    code: "SYS280",
    title: "Principles and Practice of Systems' Thinking",
    creditHours: 8,
    prerequisite: ["BUS110", "SYS210", "B207A"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (16 CHs)
  {
    code: "BUS310",
    title: "Strategic Management",
    creditHours: 8,
    prerequisite: ["B207B", "B203B"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 4,
    semester: 1
  },
  {
    code: "SYS380",
    title: "Managing Systems Complexity",
    creditHours: 8,
    prerequisite: ["SYS280", "BUS310"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (20 CHs)
  {
    code: "B325",
    title: "Managing Across Organisational & Cultural Boundaries",
    creditHours: 8,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 4,
    semester: 2
  },
  {
    code: "B327",
    title: "Sustainable Enterprise and Innovation",
    creditHours: 8,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 4,
    semester: 2
  },
  {
    code: "BAS400",
    title: "Applied Studies for Business Students",
    creditHours: 4,
    prerequisite: ["BUS310"],
    pathway: ["Bachelor of Business Studies (Systems)"],
    year: 4,
    semester: 2
  },

  // First Year - First Semester (15 CHs)
  {
    code: "AR111",
    title: "مهارات الاتصال باللغة العربية 1",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 1
  },
  {
    code: "EL111B",
    title: "مهارات الاتصال باللغة الإنجليزية 1",
    creditHours: 3,
    prerequisite: ["EL099"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 1
  },
  {
    code: "ECON201",
    title: "مبادئ علم الاقتصاد 1",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 1
  },
  {
    code: "ACC1201",
    title: "مبادئ المحاسبة المالية 1",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 1
  },
  {
    code: "MATH201",
    title: "الرياضيات للإدارة والاقتصاد",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 1
  },

  // First Year - Second Semester (15 CHs)
  {
    code: "AR112",
    title: "مهارات الاتصال باللغة العربية 2",
    creditHours: 3,
    prerequisite: ["AR111"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 2
  },
  {
    code: "EL112B",
    title: "مهارات الاتصال باللغة الإنجليزية 2",
    creditHours: 3,
    prerequisite: ["EL111B"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 2
  },
  {
    code: "ECON202",
    title: "مبادئ علم الاقتصاد 2",
    creditHours: 3,
    prerequisite: ["ECON201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 2
  },
  {
    code: "ACC1202",
    title: "مبادئ المحاسبة المالية 2",
    creditHours: 3,
    prerequisite: ["ACC1201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 2
  },
  {
    code: "STAT201",
    title: "مبادئ الإحصاء للإدارة والاقتصاد",
    creditHours: 3,
    prerequisite: ["MATH201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 1,
    semester: 2
  },

  // Second Year - First Semester (15 CHs)
  {
    code: "MGT201",
    title: "مبادئ الإدارة (1)",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 1
  },
  {
    code: "ACC2201",
    title: "المحاسبة المتوسطة (1)",
    creditHours: 3,
    prerequisite: ["ACC1202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 1
  },
  {
    code: "FIN201",
    title: "مبادئ التمويل",
    creditHours: 3,
    prerequisite: ["ACC1202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 1
  },
  {
    code: "LAW201",
    title: "البيئة القانونية للأعمال",
    creditHours: 3,
    prerequisite: ["ACC1202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 1
  },
  {
    code: "ELECTIVE",
    title: "متطلب جامعة اختياري",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 1
  },

  // Second Year - Second Semester (15 CHs)
  {
    code: "MGT202",
    title: "مبادئ الإدارة (2)",
    creditHours: 3,
    prerequisite: ["MGT201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 2
  },
  {
    code: "MIS201",
    title: "نظم المعلومات الإدارية",
    creditHours: 3,
    prerequisite: ["ACC1201", "MGT201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 2
  },
  {
    code: "ACC2202",
    title: "المحاسبة المتوسطة (2)",
    creditHours: 3,
    prerequisite: ["ACC2201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 2
  },
  {
    code: "MKT201",
    title: "مبادئ التسويق",
    creditHours: 3,
    prerequisite: ["MGT201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 2
  },
  {
    code: "ACC2250",
    title: "المحاسبة الحكومية والمنظمات غير الهادفة للربح",
    creditHours: 3,
    prerequisite: ["ACC2202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 2,
    semester: 2
  },

  // Third Year - First Semester (15 CHs)
  {
    code: "ACC3305",
    title: "محاسبة التكاليف",
    creditHours: 3,
    prerequisite: ["ACC1202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 1
  },
  {
    code: "ACC3330",
    title: "تحليل القوائم المالية",
    creditHours: 3,
    prerequisite: ["ACC3352"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 1
  },
  {
    code: "ACC3340",
    title: "المحاسبة في المنشآت المالية",
    creditHours: 3,
    prerequisite: ["ACC1202"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 1
  },
  {
    code: "MGT301",
    title: "إدارة العمليات 1",
    creditHours: 3,
    prerequisite: ["ACC1202", "MGT201"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 1
  },
  {
    code: "ACC3350",
    title: "متطلب جامعة اختياري",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 1
  },

  // Third Year - Second Semester (15 CHs)
  {
    code: "ACC3306",
    title: "المحاسبة الإدارية",
    creditHours: 3,
    prerequisite: ["ACC3305"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 2
  },
  {
    code: "ACC3311",
    title: "المحاسبة في المنشآت المتخصصة",
    creditHours: 3,
    prerequisite: ["ACC3352"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 2
  },
  {
    code: "ACC3345",
    title: "محاسبة الزكاة",
    creditHours: 3,
    prerequisite: ["ACC3352"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 2
  },
  {
    code: "ELECTIVE",
    title: "متطلب جامعة اختياري",
    creditHours: 3,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 3,
    semester: 2
  },

  // Fourth Year - First Semester (15 CHs)
  {
    code: "ACC4403",
    title: "المحاسبة المالية المتقدمة",
    creditHours: 3,
    prerequisite: ["ACC3352"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 1
  },
  {
    code: "ACC4401",
    title: "نظرية المحاسبة",
    creditHours: 3,
    prerequisite: ["ACC3301"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 1
  },
  {
    code: "ACC4402",
    title: "المراجعة والتدقيق",
    creditHours: 3,
    prerequisite: ["ACC3311"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 1
  },
  {
    code: "ACC4420",
    title: "مشروع التخرج",
    creditHours: 6,
    prerequisite: [],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 1
  },

  // Fourth Year - Second Semester (9 CHs)
  {
    code: "ACC4413",
    title: "معايير المحاسبة الدولية",
    creditHours: 3,
    prerequisite: ["ACC4402"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 2
  },
  {
    code: "ACC4420",
    title: "موضوعات متخصصة في المحاسبة",
    creditHours: 3,
    prerequisite: ["ACC4413"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 2
  },
  {
    code: "ACC4412",
    title: "النظام المحاسبي المالي",
    creditHours: 3,
    prerequisite: ["ACC4402"],
    pathway: ["Bachelor of Business Studies (Accounting in Arabic)"],
    year: 4,
    semester: 2
  },
];
