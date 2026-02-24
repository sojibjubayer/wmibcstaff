import React from "react";

const denmarkUniversities = [
  {
    name: "University of Copenhagen (UCPH)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Bachelor, Master, PhD – wide range including sciences, humanities, health & law",
    english: "IELTS 6.5+ typically; TOEFL accepted",
    link: "https://www.ku.dk/studies/",
  },
  {
    name: "Aarhus University (AU)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Bachelor, Master, PhD – arts, science, engineering, health, economics",
    english: "IELTS 6.5+ (some programs require higher)",
    link: "https://international.au.dk/",
  },
  {
    name: "Technical University of Denmark (DTU)",
    intake: "Main: Sep (Apps often by Jan)",
    programs: "Engineering, technology & sciences",
    english: "IELTS ~6.5+ (TOEFL/other tests accepted)",
    link: "https://www.dtu.dk/english/education",
  },
  {
    name: "Copenhagen Business School (CBS)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Business, management, finance, marketing",
    english: "IELTS 7.0 for many programs (strict)",
    link: "https://www.cbs.dk/en/study",
  },
  {
    name: "Aalborg University (AAU)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Engineering, IT, business, social sciences",
    english: "IELTS ~6.5",
    link: "https://www.en.aau.dk/",
  },
  {
    name: "University of Southern Denmark (SDU)",
    intake: "Main: Sep (Apps ~Jan–Mar; some spring programs)",
    programs: "Bachelor, Master, PhD – multiple fields",
    english: "IELTS ~6.5",
    link: "https://www.sdu.dk/en",
  },
  {
    name: "Roskilde University (RUC)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Social sciences, humanities & interdisciplinary sciences",
    english: "IELTS ~6.5",
    link: "https://www.ruc.dk/english/",
  },
  {
    name: "IT University of Copenhagen (ITU)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "IT, computer science & digital innovation",
    english: "IELTS ~6.5",
    link: "https://en.itu.dk/",
  },
  {
    name: "VIA University College",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Professional bachelor programs – business, tech, design",
    english: "IELTS ~6.0–6.5",
    link: "https://www.via.dk/english",
  },
  {
    name: "University College of Northern Denmark (UCN)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Applied programs – business, tech, health",
    english: "IELTS ~6.0–6.5",
    link: "https://www.ucn.dk/ENGLISH",
  },
  {
    name: "Copenhagen Business Academy (Cphbusiness)",
    intake: "Main: Sep (Apps ~Jan–Mar)",
    programs: "Applied business & management diplomas/degrees",
    english: "IELTS ~6.0",
    link: "https://www.cphbusiness.dk/ENGLISH",
  },
  {
    name: "Royal Danish Academy – Architecture, Design & Conservation",
    intake: "Main: Sep",
    programs: "Architecture, design, arts",
    english: "IELTS ~6.5",
    link: "https://kadk.dk/en",
  },
  {
    name: "Animation Workshop (part of VIA)",
    intake: "Main: Sep",
    programs: "Animation & visual effects, game design",
    english: "IELTS ~6.0",
    link: "https://animationworkshop.dk/",
  },
  {
    name: "Business Academy Aarhus",
    intake: "Main: Sep",
    programs: "Business, service management, IT",
    english: "IELTS ~6.0–6.5",
    link: "https://baa.dk/",
  },
  {
    name: "University College Absalon",
    intake: "Main: Sep",
    programs: "Engineering, health, social sciences (some in English)",
    english: "IELTS ~6.0",
    link: "https://phabsalon.dk/english/",
  },
];

const StvDenmark = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Denmark Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Danish universities with intake, programs, and English requirements for international students.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-purple-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">University/Institute</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Intake / Session</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Programs for International Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">English Proficiency</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Admission Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {denmarkUniversities.map((uni) => (
              <tr key={uni.name} className="hover:bg-purple-50">
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

export default StvDenmark;
