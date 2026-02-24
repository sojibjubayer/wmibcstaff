import React from "react";

const hungaryUniversities = [
  {
    name: "University of Debrecen",
    intake: "Fall: Sep (Deadline ~15 Jun); Spring: Feb (limited)",
    programs: "Bachelor, Master, Medicine, Engineering",
    english: "IELTS 5.5–6.5 or equivalent (sometimes MOI)",
    link: "https://unideb.hu/en/admissions",
  },
  {
    name: "Eötvös Loránd University (ELTE)",
    intake: "Fall: Sep (Jan–May); Spring: limited",
    programs: "Bachelor & Master (Sci, Arts, Humanities)",
    english: "IELTS ~6.0–6.5 (varies)",
    link: "https://www.elte.hu/en/admission",
  },
  {
    name: "University of Szeged",
    intake: "Fall: Sep (Jan–May); Spring: limited",
    programs: "Bachelor, Master, Medicine, Law, Sci",
    english: "IELTS ~5.5–6.0",
    link: "https://u-szeged.hu/english",
  },
  {
    name: "University of Pécs",
    intake: "Fall: Sep (Jan–May); Spring: limited",
    programs: "Bachelor & Master across fields",
    english: "IELTS ~5.5–6.0",
    link: "https://international.pte.hu/",
  },
  {
    name: "Budapest University of Technology and Economics (BME)",
    intake: "Fall: Sep (Jan–May); Spring for few programs",
    programs: "Engineering, IT & Sciences",
    english: "IELTS ~5.5–6.0",
    link: "https://www.bme.hu/?language=en",
  },
  {
    name: "Corvinus University of Budapest",
    intake: "Fall: Sep (Jan–May); Spring some programs",
    programs: "Business, Economics, Social Sci",
    english: "IELTS ~6.0",
    link: "https://www.uni-corvinus.hu/index.php?id=international",
  },
  {
    name: "Hungarian University of Agriculture & Life Sciences",
    intake: "Fall: Sep (Jan–May)",
    programs: "Agriculture, Food Sci, Environmental Sci",
    english: "IELTS ~6.0 (varies)",
    link: "http://sziu.hu/en/",
  },
  {
    name: "Széchenyi István University",
    intake: "Fall: Sep (Jan–May)",
    programs: "Engineering, Business, Tech",
    english: "IELTS 5.5–6.0 (estimate)",
    link: "https://uni.sze.hu/en",
  },
  {
    name: "Kodolányi János University (Private)",
    intake: "Fall: Sep (typically Jan–Aug)",
    programs: "Bachelor/Master (Business, IT, Tourism)",
    english: "IELTS ~5.5–6.5 (per program)",
    link: "https://kodolanyi.hu/en/admission",
  },
  {
    name: "Budapest Metropolitan University",
    intake: "Fall: Sep (Jan–May)",
    programs: "Business, Creative Arts, Media",
    english: "IELTS ~5.5–6.0 (varies)",
    link: "https://metropolitan.hu/en",
  },
  {
    name: "Avicenna International College (Foundation)",
    intake: "Flexible intake (pre-degree)",
    programs: "Foundation & Prep Programs (Medicine, Business, Tech)",
    english: "Check with college; often internal English test",
    link: "https://avicenna.hu",
  },
  {
    name: "International Business School (IBS) Budapest - Private",
    intake: "Fall: Sep (Jan–May)",
    programs: "Business & Management (BA/MBA)",
    english: "IELTS 6.0–6.5",
    link: "https://ibs-b.hu/apply",
  },
  {
    name: "Wekerle Business School - Private",
    intake: "Fall: Sep",
    programs: "Business & Commerce programs",
    english: "IELTS 5.5–6.0",
    link: "https://wsuf.hu/en",
  },
];

const StvHungary = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Hungary Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Hungarian universities with intake, programs, and English requirements for international students.
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
            {hungaryUniversities.map((uni) => (
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

export default StvHungary;
