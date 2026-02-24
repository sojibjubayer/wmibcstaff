import React from "react";

const germanyUniversities = [
  {
    name: "Technical University of Munich (TUM)",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Engineering, Computer Science, Natural Sciences",
    english: "IELTS ~6.5 / TOEFL ~88+ / MOI",
    link: "https://www.tum.de/",
  },
  {
    name: "Ludwig Maximilian University of Munich (LMU)",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Arts, Sciences, Business, Medicine",
    english: "IELTS ~6.5 / alternatives accepted",
    link: "https://www.en.uni-muenchen.de/",
  },
  {
    name: "Heidelberg University",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Life Sciences, Physics, Law",
    english: "IELTS ~6.5 / TOEFL ~90",
    link: "https://www.uni-heidelberg.de/en",
  },
  {
    name: "Humboldt University of Berlin",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Humanities, Econ, Science",
    english: "IELTS ~6.5 / TOEFL ~80",
    link: "https://www.hu-berlin.de/en",
  },
  {
    name: "Free University of Berlin (Freie Universität)",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Social Sciences, Business, Arts",
    english: "IELTS ~5.5–6.5 (varies)",
    link: "https://www.fu-berlin.de/en/",
  },
  {
    name: "University of Freiburg",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Engineering, Environmental Sci, Biology",
    english: "IELTS ~6.0–6.5",
    link: "https://www.uni-freiburg.de/",
  },
  {
    name: "University of Cologne",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Business, Economics, Sciences",
    english: "IELTS ~6.0",
    link: "https://www.uni-koeln.de/en/",
  },
  {
    name: "RWTH Aachen University",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Engineering, Technology, Science",
    english: "IELTS ~6.5 / TOEFL ~90",
    link: "https://www.rwth-aachen.de/",
  },
  {
    name: "University of Bonn",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Mathematics, Science, Economics",
    english: "IELTS ~5.5–6.0 / TOEFL",
    link: "https://www.uni-bonn.de/en",
  },
  {
    name: "Technical University of Berlin (TU Berlin)",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Engineering, IT, Architecture",
    english: "IELTS ~6.0 / TOEFL ~79+",
    link: "https://www.tu-berlin.de/?set_language=en",
  },
  {
    name: "University of Göttingen",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Sciences, Law, Social Sci",
    english: "IELTS ~6.5",
    link: "https://www.uni-goettingen.de/en/",
  },
  {
    name: "Leipzig University",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Humanities, Sciences",
    english: "IELTS ~5.5–6.0",
    link: "https://www.uni-leipzig.de/en/",
  },
  {
    name: "Ruhr University Bochum",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Business, Engineering, Sciences",
    english: "IELTS ~6.0",
    link: "https://www.ruhr-uni-bochum.de/en/",
  },
  {
    name: "Leibniz University Hannover",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Sciences, Engineering, Law",
    english: "IELTS ~6.0",
    link: "https://www.uni-hannover.de/en/",
  },
  {
    name: "University of Hamburg",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Social Sci, Business, Science",
    english: "IELTS ~6.5",
    link: "https://www.uni-hamburg.de/en/",
  },
  {
    name: "University of Stuttgart",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Engineering, Natural Sci, Tech",
    english: "IELTS ~6.0 / TOEFL",
    link: "https://www.uni-stuttgart.de/en/",
  },
  {
    name: "University of Hildesheim",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Humanities, Management",
    english: "IELTS ~5.5–6.0",
    link: "https://www.uni-hildesheim.de/en/",
  },
  {
    name: "Rhine-Waal University of Applied Sciences",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "Tech, Life Sci, Business (English options)",
    english: "IELTS ~6.0",
    link: "https://www.hs-rhein-waal.de/en/",
  },
  {
    name: "CBS International Business School (Private)",
    intake: "Fall & Spring",
    programs: "Business Management, MBA",
    english: "IELTS varies (often 6.0+)",
    link: "https://www.cbs-education.org/",
  },
  {
    name: "University of Potsdam",
    intake: "Winter (Oct) – apps ~Feb–May",
    programs: "IT, Science, Social Sci",
    english: "IELTS ~6.0",
    link: "https://www.uni-potsdam.de/en/",
  },
];

const StvGermany = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
        Germany Student Visa - Universities
      </h1>
      <p className="text-center text-green-700 mb-12">
        List of major German universities with intake, programs, and English requirements for international students.
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
            {germanyUniversities.map((uni) => (
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

export default StvGermany;
