export type Module = {
  code: string;
  name: string;
  pathway: string;
  creditHours: number;
  prerequisite?: string;
};

export const pathways = [
  "BSc in Information Technology and Computing",
  "BSc in Information Technology and Computing (Computer Science)",
  "BSc in Information Technology and Computing (Computing with Business)",
  "BSc in Information Technology and Computing (Network and Security)",
  "BSc in Information Technology and Computing (Web Development)",
  "Business Studies (Accounting)",
  "Business Studies (Accounting in Arabic)",
  "Business Studies (Marketing)",
  "Business Studies (Systems)",
  "BA in English Language and Literature"
] as const;

export type Pathway = typeof pathways[number];

export const modules: Record<Pathway, Module[]> = {
  "BSc in Information Technology and Computing": [
    { code: "GR101", name: "Self-Learning Skills", pathway: "BSc in Information Technology and Computing", creditHours: 3 },
    { code: "AR111", name: "Arabic Communication Skills I", pathway: "BSc in Information Technology and Computing", creditHours: 3 },
    { code: "EL111", name: "English Communication Skills I", pathway: "BSc in Information Technology and Computing", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "BSc in Information Technology and Computing", creditHours: 3 },
    { code: "MT129", name: "Calculus and Probability", pathway: "BSc in Information Technology and Computing", creditHours: 4, prerequisite: "EL099" },
    { code: "TM105", name: "Introduction to Programming", pathway: "BSc in Information Technology and Computing", creditHours: 4, prerequisite: "EL111" },
    { code: "MT132", name: "Linear Algebra", pathway: "BSc in Information Technology and Computing", creditHours: 4, prerequisite: "EL112" },
    { code: "TM111", name: "Introduction to Computing and Information Technology I", pathway: "BSc in Information Technology and Computing", creditHours: 8, prerequisite: "EL111" },
    { code: "M269", name: "Algorithms, Data Structures and Computability", pathway: "BSc in Information Technology and Computing", creditHours: 8, prerequisite: "TM105" },
    { code: "T215A", name: "Communication and Information Technologies-A", pathway: "BSc in Information Technology and Computing", creditHours: 8, prerequisite: "TM111" },
    { code: "TM355", name: "Communications Technology", pathway: "BSc in Information Technology and Computing", creditHours: 4, prerequisite: "TM111" },
    { code: "TM354", name: "Software Engineering", pathway: "BSc in Information Technology and Computing", creditHours: 8, prerequisite: "M269" },
  ],

  "BSc in Information Technology and Computing (Computer Science)": [
    // First Year - First Semester
    { code: "GR101", name: "Self-Learning Skills", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3 },
    { code: "AR111", name: "Arabic Communication Skills I", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3 },
    { code: "EL111", name: "English Communication Skills I", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3 },
    { code: "MT129", name: "Calculus and Probability", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "EL099" },
    // First Year - Second Semester
    { code: "AR112", name: "Arabic Communication Skills II", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Communication Skills II", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 3, prerequisite: "EL111" },
    { code: "MT131", name: "Discrete Mathematics", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "EL111" },
    { code: "TM105", name: "Introduction to Programming", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "EL111" },
    // Second Year - First Semester
    { code: "TM111", name: "Introduction to Computing and Information Technology I", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "EL111" },
    { code: "MT132", name: "Linear Algebra", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "EL112" },
    { code: "M251", name: "Object-Oriented Programming using Java", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "TM105" },
    // Second Year - Second Semester
    { code: "TM112", name: "Introduction to Computing and Information Technology II", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "TM111" },
    { code: "TM103", name: "Computer Organization and Architecture", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "EL111" },
    { code: "M269", name: "Algorithms, Data Structures and Computability", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "TM105" },
    // Third Year - First Semester
    { code: "T227", name: "Change, Strategy and Project at Work", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "TM111" },
    { code: "TM260", name: "Computer Graphics and Multimedia", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "M251" },
    { code: "TM298", name: "Operating Systems", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "TM103" },
    // Third Year - Second Semester
    { code: "TM351", name: "Data Management and Analysis", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "M269" },
    { code: "TM354", name: "Software Engineering", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 8, prerequisite: "M269" },
    // Fourth Year - First Semester
    { code: "TM366", name: "Artificial Intelligence", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "TM354" },
    { code: "TM471-A", name: "CS Project-A", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "TM354" },
    // Fourth Year - Second Semester
    { code: "TM471-2", name: "CS Project-B", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "TM471-A" },
    { code: "CAS400", name: "Applied Studies For Computing Students", pathway: "BSc in Information Technology and Computing (Computer Science)", creditHours: 4, prerequisite: "TM354" },
  ],

  "BSc in Information Technology and Computing (Computing with Business)": [
    // First Year - First Semester (16 CHs)
    { code: "AR111", name: "Arabic Communication Skills I", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3 },
    { code: "EL111", name: "English Communication Skills I", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3 },
    { code: "GR101", name: "Self-Learning Skills", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3 },
    { code: "MT129", name: "Calculus and Probability", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "EL099" },
    // First Year - Second Semester (17 CHs)
    { code: "AR112", name: "Arabic Communication Skills II", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Communication Skills II", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 3, prerequisite: "EL111" },
    { code: "TM105", name: "Introduction to Programming", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "EL111" },
    { code: "MT131", name: "Discrete Mathematics", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "EL111" },
    // Second Year - First Semester (20 CHs)
    { code: "BUS110", name: "Introduction to Business", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "EL111" },
    { code: "TM111", name: "Introduction to Computing and Information", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "EL111" },
    { code: "MT132", name: "Linear Algebra", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "EL112" },
    // Second Year - Second Semester (20 CHs)
    { code: "B207A", name: "Shaping business opportunities A", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "BUS110" },
    { code: "TM103", name: "Computer Organization and Architecture", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "EL111" },
    { code: "M251", name: "Object-Oriented Programming using Java", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "TM105" },
    // Third Year - First Semester (19 CHs)
    { code: "B207B", name: "Shaping business opportunities B", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "B207A" },
    { code: "M269", name: "Algorithms, Data Structures and Computability", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "TM105" },
    // Third Year - Second Semester (16 CHs)
    { code: "TM352", name: "Web, Mobile and Cloud Technologies", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "M251" },
    { code: "BUS310", name: "Strategic Management", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "B207B" },
    // Fourth Year - First Semester (15 CHs)
    { code: "TM351", name: "Data Management and Analysis", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 8, prerequisite: "M269" },
    { code: "TM471-A", name: "CwB Project-A", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "BUS310" },
    // Fourth Year - Second Semester (8 CHs)
    { code: "TM471-B", name: "CwB Project-B", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "TM471-A" },
    { code: "CAS400", name: "Applied Studies For Computing Students", pathway: "BSc in Information Technology and Computing (Computing with Business)", creditHours: 4, prerequisite: "TM352" },
  ],

  "BSc in Information Technology and Computing (Network and Security)": [
    // First Year - First Semester (12 CHs)
    { code: "GR101", name: "Self-Learning Skills", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3 },
    { code: "AR111", name: "Arabic Communication Skills I", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3 },
    { code: "EL111", name: "English Communication Skills I", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3, prerequisite: "EL099" },
    { code: "TU170", name: "Computing Essentials", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3 },
    
    // First Year - Second Semester (18 CHs)
    { code: "AR112", name: "Arabic Communication Skills II", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Communication Skills II", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 3, prerequisite: "EL111" },
    { code: "TM111", name: "Introduction to Computing and Information Technology I", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "EL111" },
    { code: "MT129", name: "Calculus and Probability", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "EL099" },
    
    // Second Year - First Semester (19 CHs)
    { code: "TM105", name: "Introduction to Programming", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "EL111" },
    { code: "MT131", name: "Discrete Mathematics", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "EL111" },
    { code: "TM112", name: "Introduction to Computing and Information Technology II", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "TM111" },
    
    // Second Year - Second Semester (20 CHs)
    { code: "T216A", name: "Cisco Networking (CCNA)-A", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "TM112" },
    { code: "M251", name: "Object-Oriented Programming using Java", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "TM105" },
    { code: "MT132", name: "Linear Algebra", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "EL111" },
    
    // Third Year - First Semester (20 CHs)
    { code: "T227", name: "Change, Strategy and Project at Work", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "TM112" },
    { code: "T216B", name: "Cisco Networking (CCNA)-B", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "T216A" },
    { code: "TM103", name: "Computer Organization and Architecture", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "EL111" },
    
    // Third Year - Second Semester (19 CHs)
    { code: "T316", name: "Advanced Networking", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "T216B" },
    { code: "TM352", name: "Web, Mobile and Cloud Technologies", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "M251" },
    
    // Fourth Year - First Semester (15 CHs)
    { code: "T318", name: "Applied Network Security", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 8, prerequisite: "T216B" },
    { code: "TM471-A", name: "N&S Project-A", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "T316" },
    
    // Fourth Year - Second Semester (8 CHs)
    { code: "TM471-B", name: "N&S Project-B", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "TM471-A" },
    { code: "CAS400", name: "Applied Studies For Computing Students", pathway: "BSc in Information Technology and Computing (Network and Security)", creditHours: 4, prerequisite: "TM352" },
  ],

  "BSc in Information Technology and Computing (Web Development)": [
    // First Year - First Semester (16 CHs)
    { code: "AR111", name: "Arabic Communication Skills I", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3 },
    { code: "EL111", name: "English Communication Skills I", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3, prerequisite: "EL099" },
    { code: "TU170", name: "Computing Essentials", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3 },
    { code: "GR101", name: "Self-Learning Skills", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3 },
    { code: "MT129", name: "Calculus and Probability", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "EL099" },

    // First Year - Second Semester (17 CHs)
    { code: "AR112", name: "Arabic Communication Skills II", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Communication Skills II", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 3, prerequisite: "EL111" },
    { code: "TM105", name: "Introduction to Programming", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "EL111" },
    { code: "MT131", name: "Discrete Mathematics", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "EL111" },

    // Second Year - First Semester (16 CHs)
    { code: "TM103", name: "Computer Organization and Architecture", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "EL111" },
    { code: "MT132", name: "Linear Algebra", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "EL111" },
    { code: "TM111", name: "Introduction to Computing and IT (I)", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "EL111" },

    // Second Year - Second Semester (19 CHs)
    { code: "TM112", name: "Introduction to Computing and IT (II)", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TM111" },
    { code: "M251", name: "Object-Oriented Programming using Java", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TM105" },

    // Third Year - First Semester (16 CHs)
    { code: "M269", name: "Algorithms, Data Structures and Computability", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TM105" },
    { code: "T227", name: "Change, Strategy and Project at Work", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TM112" },

    // Third Year - Second Semester (19 CHs)
    { code: "TM354", name: "Software Engineering", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "M251" },
    { code: "TT284", name: "Web Technologies", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TM112" },

    // Fourth Year - First Semester (20 CHs)
    { code: "TM352", name: "Web, Mobile and Cloud Technologies", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TT284" },
    { code: "TM356", name: "Interaction Design and the User Experience", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 8, prerequisite: "TT284" },
    { code: "TM471-A", name: "WD Project-A", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "TM354" },

    // Fourth Year - Second Semester (8 CHs)
    { code: "TM471-B", name: "WD Project-B", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "TM471-A" },
    { code: "CAS400", name: "Applied Studies For Computing Students", pathway: "BSc in Information Technology and Computing (Web Development)", creditHours: 4, prerequisite: "TM352" },
  ],

  "Business Studies (Accounting)": [
    // First Academic Year - First Semester (16 CHs)
    { code: "AR111", name: "Arabic Comm. Skills – I", pathway: "Business Studies (Accounting)", creditHours: 3 },
    { code: "EL111", name: "English Comm. Skills – I", pathway: "Business Studies (Accounting)", creditHours: 3, prerequisite: "EL099" },
    { code: "GR101", name: "Self-Learning Skills", pathway: "Business Studies (Accounting)", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "Business Studies (Accounting)", creditHours: 3, prerequisite: "EL099" },
    { code: "BUS101", name: "Introduction to Math for Business", pathway: "Business Studies (Accounting)", creditHours: 4, prerequisite: "EL099" },

    // First Academic Year - Second Semester (16 CHs)
    { code: "AR112", name: "Arabic Comm. Skills – II", pathway: "Business Studies (Accounting)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Comm. Skills – II", pathway: "Business Studies (Accounting)", creditHours: 3, prerequisite: "EL111" },
    { code: "BUS102", name: "Introduction to Statistics", pathway: "Business Studies (Accounting)", creditHours: 4, prerequisite: "EL111" },

    // Second Academic Year - First Semester (16 CHs)
    { code: "BUS110", name: "Introduction to Business Study", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "EL111" },
    { code: "LB170", name: "Professional Communication Skills for Business Studies", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "EL112" },

    // Second Academic Year - Second Semester (16 CHs)
    { code: "B124", name: "Fundamentals of Accounting", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "BUS110" },

    // Third Academic Year - First Semester (16 CHs)
    { code: "B207A", name: "Shaping Business Opportunities A", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "BUS110" },
    { code: "B291", name: "Financial Accounting", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B124" },

    // Third Academic Year - Second Semester (16 CHs)
    { code: "B207B", name: "Shaping Business Opportunities B", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B207A" },
    { code: "B292", name: "Management Accounting", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B124" },

    // Fourth Academic Year - First Semester (16 CHs)
    { code: "BUS310", name: "Strategic Management", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B207B" },
    { code: "ACC300", name: "Accounting Information System", pathway: "Business Studies (Accounting)", creditHours: 4, prerequisite: "B291" },
    { code: "ACC302", name: "Auditing Theory and Practice", pathway: "Business Studies (Accounting)", creditHours: 4, prerequisite: "B291" },

    // Fourth Academic Year - Second Semester (20 CHs)
    { code: "B326", name: "Advanced Financial Accounting", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B291" },
    { code: "B392", name: "Advanced Management Accounting", pathway: "Business Studies (Accounting)", creditHours: 8, prerequisite: "B292" },
    { code: "BAS400", name: "Applied Studies for Business Students", pathway: "Business Studies (Accounting)", creditHours: 4, prerequisite: "BUS310" },
  ],

  "Business Studies (Accounting in Arabic)": [
    // First Academic Year - First Semester (15 CHs)
    { code: "AR111", name: "مهارات الاتصال باللغة العربية 1", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3 },
    { code: "EL111", name: "مهارات الاتصال باللغة الإنجليزية 1", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "EL099" },
    { code: "GR101", name: "مهارات التعلم الذاتي", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3 },
    { code: "ECON201", name: "مدخل في العلوم الاقتصادية 1", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3 },
    { code: "MATH201", name: "الرياضيات للإدارة والاقتصاد", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3 },

    // First Academic Year - Second Semester (15 CHs)
    { code: "AR112", name: "مهارات الاتصال باللغة العربية 2", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "مهارات الاتصال باللغة الإنجليزية 2", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "EL111" },
    { code: "TU170", name: "مهارات الحاسب", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "EL099" },
    { code: "ECON202", name: "مدخل في العلوم الاقتصادية 2", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ECON201" },
    { code: "STAT201", name: "الإحصاء للإدارة والاقتصاد", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "MATH201" },

    // Second Academic Year - First Semester (15 CHs)
    { code: "MGT201", name: "مبادئ الإدارة (1)", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3 },
    { code: "ACC1201", name: "المحاسبة المالية (1)", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },
    { code: "ACC1307", name: "المحاسبة الحكومية", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },
    { code: "FIN301", name: "تمويل", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },
    { code: "LAW301", name: "مبادئ القانون للأعمال", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },

    // Second Academic Year - Second Semester (15 CHs)
    { code: "MGT202", name: "مبادئ الإدارة (2)", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "MGT201" },
    { code: "ACCT202", name: "المحاسبة المالية (2)", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "MGT201" },
    { code: "ACC1302", name: "المحاسبة المتوسطة (2)", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1201" },
    { code: "FIN302", name: "مبادئ التسويق", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "MGT201" },
    { code: "ACC1250", name: "المحاسبة باستخدام الحاسب الآلي", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },

    // Third Academic Year - First Semester (15 CHs)
    { code: "ACC1301", name: "محاسبة التكاليف", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },
    { code: "ACC1303", name: "نظم المعلومات المحاسبية", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACCT202" },
    { code: "ACC340", name: "محاسبة منشآت مالية ومصرفية", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC302" },
    { code: "MGT301", name: "السلوك التنظيمي والقيادي", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "MATH201" },
    { code: "ACC350", name: "محاسبة شركات", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1302" },

    // Fourth Academic Year - First Semester (15 CHs)
    { code: "ACC1403", name: "المحاسبة المالية المتقدمة", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1302" },
    { code: "ACC1401", name: "مراجعة الحسابات", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1301" },
    { code: "ACC1402", name: "المراجعة والتدقيق", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1311" },
    { code: "ACC1404B", name: "التدريب الميداني", pathway: "Business Studies (Accounting in Arabic)", creditHours: 6 },

    // Fourth Academic Year - Second Semester (9 CHs)
    { code: "ACC1413", name: "معايير المحاسبة الدولية", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1402" },
    { code: "ACC1420", name: "نظم المعلومات المحاسبية المتقدمة", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1413" },
    { code: "ACC1412", name: "التحليل المالي المتقدم", pathway: "Business Studies (Accounting in Arabic)", creditHours: 3, prerequisite: "ACC1402" },
  ],

  "Business Studies (Marketing)": [
    // First Academic Year - First Semester (16 CHs)
    { code: "AR111", name: "Arabic Comm. Skills – I", pathway: "Business Studies (Marketing)", creditHours: 3 },
    { code: "EL111", name: "English Comm. Skills – I", pathway: "Business Studies (Marketing)", creditHours: 3, prerequisite: "EL099" },
    { code: "GR101", name: "Self-Learning Skills", pathway: "Business Studies (Marketing)", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "Business Studies (Marketing)", creditHours: 3, prerequisite: "EL099" },
    { code: "BUS101", name: "Introduction to Math for Business", pathway: "Business Studies (Marketing)", creditHours: 4, prerequisite: "EL099" },

    // First Academic Year - Second Semester (16 CHs)
    { code: "AR112", name: "Arabic Comm. Skills – II", pathway: "Business Studies (Marketing)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Comm. Skills – II", pathway: "Business Studies (Marketing)", creditHours: 3, prerequisite: "EL111" },
    { code: "BUS102", name: "Introduction to Statistics", pathway: "Business Studies (Marketing)", creditHours: 4, prerequisite: "EL111" },

    // Second Academic Year - First Semester (16 CHs)
    { code: "BUS110", name: "Introduction to Business Study", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "EL111" },
    { code: "LB170", name: "Professional Communication Skills for Business Studies", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "EL112" },

    // Second Academic Year - Second Semester (16 CHs)
    { code: "B122", name: "Introduction to Retail Management and Marketing", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "BUS110" },

    // Third Academic Year - First Semester (16 CHs)
    { code: "B207A", name: "Shaping Business Opportunities A", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "BUS110" },
    { code: "B205A", name: "Exploring Innovation and Entrepreneurship A", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "BUS110" },

    // Third Academic Year - Second Semester (16 CHs)
    { code: "B207B", name: "Shaping Business Opportunities B", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "B207A" },
    { code: "B205B", name: "Exploring Innovation and Entrepreneurship B", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "B205A" },

    // Fourth Academic Year - First Semester (16 CHs)
    { code: "BUS310", name: "Strategic Management", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "B207B" },
    { code: "B324", name: "Marketing and Society", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "B205B" },

    // Fourth Academic Year - Second Semester (20 CHs)
    { code: "B327", name: "Sustainable Enterprise and Innovation", pathway: "Business Studies (Marketing)", creditHours: 8, prerequisite: "BUS310" },
    { code: "MKT331", name: "Digital Marketing", pathway: "Business Studies (Marketing)", creditHours: 4, prerequisite: "B324" },
    { code: "MKT332", name: "Service Marketing", pathway: "Business Studies (Marketing)", creditHours: 4, prerequisite: "B324" },
    { code: "BAS400", name: "Applied Studies for Business Students", pathway: "Business Studies (Marketing)", creditHours: 4, prerequisite: "BUS310" },
  ],

  "Business Studies (Systems)": [
    // First Academic Year - First Semester (16 CHs)
    { code: "AR111", name: "Arabic Comm. Skills – I", pathway: "Business Studies (Systems)", creditHours: 3 },
    { code: "EL111", name: "English Comm. Skills – I", pathway: "Business Studies (Systems)", creditHours: 3, prerequisite: "EL099" },
    { code: "GR101", name: "Self-Learning Skills", pathway: "Business Studies (Systems)", creditHours: 3 },
    { code: "TU170", name: "Computing Essentials", pathway: "Business Studies (Systems)", creditHours: 4, prerequisite: "EL099" },
    { code: "BUS101", name: "Introduction to Math for Business", pathway: "Business Studies (Systems)", creditHours: 3, prerequisite: "EL099" },

    // First Academic Year - Second Semester (16 CHs)
    { code: "AR112", name: "Arabic Comm. Skills – II", pathway: "Business Studies (Systems)", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "English Comm. Skills – II", pathway: "Business Studies (Systems)", creditHours: 3, prerequisite: "EL111" },
    { code: "BUS102", name: "Introduction to Statistics", pathway: "Business Studies (Systems)", creditHours: 4, prerequisite: "EL111" },

    // Second Academic Year - First Semester (16 CHs)
    { code: "BUS110", name: "Introduction to Business Study", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "EL111" },
    { code: "LB170", name: "Professional Communication Skills for Business Studies", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "EL111" },

    // Second Academic Year - Second Semester (16 CHs)
    { code: "B123", name: "Management Practice", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "BUS110" },

    // Third Academic Year - First Semester (16 CHs)
    { code: "B207A", name: "Shaping Business Opportunities A", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "BUS110" },
    { code: "SYS210", name: "Managing technology & innovation", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "B123" },

    // Third Academic Year - Second Semester (16 CHs)
    { code: "B207B", name: "Shaping Business Opportunities B", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "B207A" },
    { code: "SYS280", name: "Principles and practice of Systems Thinking", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "SYS210" },

    // Fourth Academic Year - First Semester (16 CHs)
    { code: "BUS310", name: "Strategic Management", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "B207B" },
    { code: "SYS380", name: "Managing Systems Complexity", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "SYS280" },

    // Fourth Academic Year - Second Semester (20 CHs)
    { code: "B325", name: "Managing across organizational & Cultural Boundaries", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "BUS310" },
    { code: "B327", name: "Sustainable Enterprise and Innovation", pathway: "Business Studies (Systems)", creditHours: 8, prerequisite: "BUS310" },
    { code: "BAS400", name: "Applied Studies for Business Students", pathway: "Business Studies (Systems)", creditHours: 4, prerequisite: "BUS310" },
  ],

  "BA in English Language and Literature": [
    // First Year - First Semester
    { code: "AR111", name: "Communication Skills in Arabic I", pathway: "BA in English Language and Literature", creditHours: 3 },
    { code: "EL111", name: "Communication Skills in English-Intermediate", pathway: "BA in English Language and Literature", creditHours: 3, prerequisite: "EL99" },
    { code: "TU170", name: "Learning On-Line", pathway: "BA in English Language and Literature", creditHours: 3, prerequisite: "EL99" },
    { code: "EL117", name: "Writing", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL99" },
    { code: "GR101", name: "Self-Learning Skills", pathway: "BA in English Language and Literature", creditHours: 3 },

    // First Year - Second Semester
    { code: "AR112", name: "Communication Skills in Arabic II", pathway: "BA in English Language and Literature", creditHours: 3, prerequisite: "AR111" },
    { code: "EL112", name: "Communication Skills in English-Upper Intermediate", pathway: "BA in English Language and Literature", creditHours: 3, prerequisite: "EL111" },
    { code: "EL120", name: "English phonetics and Linguistics", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL111" },
    { code: "EL121N", name: "Literary appreciation and Critique", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL117" },
    { code: "FR101", name: "French for Beginners/Current International Issues and problems", pathway: "BA in English Language and Literature", creditHours: 3 },

    // Second Year - First Semester
    { code: "AA100A", name: "Arts of Past & Present (I)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "EL112" },
    { code: "U214A", name: "Worlds of English (I)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "EL112" },
    { code: "EL119", name: "Oral Presentation Skills", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL111" },

    // Second Year - Second Semester
    { code: "AA100B", name: "Arts of Past & Present (II)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "AA100A" },
    { code: "U214B", name: "Worlds of English (II)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "U214A" },
    { code: "EL118", name: "Reading", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL111" },

    // Third Year - First Semester
    { code: "A230A", name: "Reading and Studying Literature (I)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "AA100B" },
    { code: "E304A", name: "Exploring English Grammar I", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "U214B" },
    { code: "EL122", name: "Writing Research", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "EL117" },

    // Third Year - Second Semester
    { code: "A230B", name: "Reading and Studying Literature (II)", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "AA100B" },
    { code: "E304B", name: "Exploring English Grammar I", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "U214B" },

    // Fourth Year - First Semester
    { code: "EA300A", name: "Children's Literature I", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "A230B" },
    { code: "LAS-400", name: "Applied studies for English Students", pathway: "BA in English Language and Literature", creditHours: 4, prerequisite: "A230B" },

    // Fourth Year - Second Semester
    { code: "EA300B", name: "Children's Literature II", pathway: "BA in English Language and Literature", creditHours: 8, prerequisite: "EA300A" },
  ],
};