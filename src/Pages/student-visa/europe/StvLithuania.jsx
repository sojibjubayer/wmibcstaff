import React from "react";

const lithuaniaUniversities = [
  {
    name: "Vilnius University (VU)",
    intake: "Fall (Sep): apply by 1 May; Spring sometimes",
    programs: "Bachelor, Master, PhD – Business, IT, Sciences, Law, Medicine",
    english: "IELTS 5.5+ (common); TOEFL, PTE, MOI options",
    link: "https://apply.vu.lt/",
  },
  {
    name: "Kaunas University of Technology (KTU)",
    intake: "Fall (Sep): applications open Oct–Jun; Spring limited",
    programs: "Engineering, IT, Business, AI, Robotics",
    english: "IELTS 5.5–6.0 typical",
    link: "https://apply.ktu.edu/",
  },
  {
    name: "Vytautas Magnus University (VMU)",
    intake: "Fall (Sep): applications Nov–May; Spring limited",
    programs: "Business, Social Sciences, Humanities, Tech",
    english: "IELTS 5.5–6.5 (varies by program)",
    link: "https://vytautasmagnus.dreamapply.com/",
  },
  {
    name: "Vilnius Gediminas Technical University (VILNIUS TECH)",
    intake: "Fall (Sep): apply Oct–Jun; Spring sometimes",
    programs: "Engineering, Architecture, Business",
    english: "IELTS 5.5+ typical",
    link: "https://www.vilniustech.lt/",
  },
  {
    name: "Mykolas Romeris University (MRU)",
    intake: "Fall (Sep): typical; Spring limited",
    programs: "Law, Public Admin, Business & Social Sciences",
    english: "IELTS 5.0–6.5 depending on program",
    link: "https://www.mruni.eu/",
  },
  {
    name: "Lithuanian University of Health Sciences (LSMU)",
    intake: "Fall (Sep): main intake; Spring rare",
    programs: "Medicine, Dentistry, Pharmacy, Veterinary",
    english: "IELTS 6.0+ common",
    link: "https://www.lsmuni.lt/",
  },
  {
    name: "ISM University of Management and Economics (Private)",
    intake: "Fall (Sep); deadline Jun–Jul",
    programs: "Business, Economics, Management, MBA",
    english: "IELTS 6.0+ typical; some internal tests",
    link: "https://www.ism.lt/",
  },
  {
    name: "LCC International University (Private)",
    intake: "Fall (Sep); typical deadlines early summer",
    programs: "International Business Admin, Psychology, TESOL, Int’l Relations",
    english: "IELTS 5.5–6.0",
    link: "http://www.lcc.lt/",
  },
  {
    name: "Kazimieras Simonavicius University (KSU) (Private)",
    intake: "Fall (Sep): application ongoing until spots filled; Spring possible",
    programs: "Aviation Mgmt, Business, Entrepreneurship",
    english: "IELTS 5.5–6.0",
    link: "https://ksu.lt/en/admission/",
  },
  {
    name: "Klaipėda University",
    intake: "Fall (Sep): opens Jan–Jun; Spring limited",
    programs: "Business, Science, Tech",
    english: "IELTS 5.5+",
    link: "https://apply.ku.lt/",
  },
  {
    name: "Vilnius Business College (VBC) (Private College)",
    intake: "Fall (Sep): apps until Aug (non-EU)",
    programs: "Undergraduate business programs",
    english: "IELTS 5.5+ (estimate)",
    link: "https://www.kolegija.lt/en/for-applicants/admission/",
  },
  {
    name: "Kaunas University of Applied Sciences (Public/Applied)",
    intake: "Fall (Sep): apps earlier in year",
    programs: "Business, Hospitality & Tourism, Arts",
    english: "IELTS 5.5+",
    link: "https://www.kaunokolegija.lt/",
  },
  {
    name: "Vilnius Academy of Arts",
    intake: "Fall (Sep): apply earlier year",
    programs: "Fine Arts, Design",
    english: "IELTS 5.5–6.0",
    link: "https://www.vda.lt/",
  },
  {
    name: "Lithuanian Sports University",
    intake: "Fall (Sep): application in spring season",
    programs: "Sports Science, Phys Ed",
    english: "IELTS 5.5+",
    link: "http://www.lsu.lt/",
  },
  {
    name: "European Humanities University (Private)",
    intake: "Fall (Sep): apps earlier",
    programs: "Humanities & Social Sciences",
    english: "IELTS 5.5–6.0",
    link: "https://www.ehu.lt",
  },
];

const StvLithuania = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
        Lithuania Student Visa - Universities
      </h1>
      <p className="text-center text-green-700 mb-12">
        List of major Lithuanian universities with intake, programs, and English requirements for international students.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">University/Institute</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Intake / Session</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Programs for International Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">English Proficiency</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Admission Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lithuaniaUniversities.map((uni) => (
              <tr key={uni.name} className="hover:bg-green-50">
                <td className="px-4 py-3">{uni.name}</td>
                <td className="px-4 py-3">{uni.intake}</td>
                <td className="px-4 py-3">{uni.programs}</td>
                <td className="px-4 py-3">{uni.english}</td>
                <td className="px-4 py-3">
                  <a
                    href={uni.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Apply / Info
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StvLithuania;
