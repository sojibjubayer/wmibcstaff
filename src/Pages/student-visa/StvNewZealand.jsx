import React from "react";

const nzUniversities = [
  {
    name: "University of Auckland",
    intake: "Feb & Jul (apply ~Aug–Nov for Feb)",
    programs: "UG, MS, PhD – Arts, Engineering, Business, Science, Health",
    english: "IELTS ~6.0–6.5+ (varies)",
    link: "https://www.auckland.ac.nz/en/study/international-students.html",
  },
  {
    name: "University of Otago",
    intake: "Feb & Jul (apply ~Aug–Nov for Feb)",
    programs: "UG, MS, PhD – Arts, Health Sciences, Business, Science",
    english: "IELTS ~6.0–6.5+",
    link: "https://www.otago.ac.nz/study/international/",
  },
  {
    name: "Auckland University of Technology (AUT)",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, IT, Health Sciences, Design",
    english: "IELTS ~6.0–6.5",
    link: "https://www.aut.ac.nz/study/international",
  },
  {
    name: "Victoria University of Wellington",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Arts, Business, Science, Law",
    english: "IELTS ~6.0–6.5",
    link: "https://www.wgtn.ac.nz/study/international",
  },
  {
    name: "Massey University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Arts, Science, Agriculture, Health",
    english: "IELTS ~6.0–6.5",
    link: "https://www.massey.ac.nz/study/entry-requirements-to-study-at-massey/entry-requirements-for-international-students/",
  },
  {
    name: "University of Canterbury",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Engineering, Business, Science, Arts",
    english: "IELTS ~6.0–6.5",
    link: "https://www.canterbury.ac.nz/international",
  },
  {
    name: "University of Waikato",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Science, IT, Social Sciences",
    english: "IELTS ~6.0–6.5",
    link: "https://www.waikato.ac.nz/study/apply/undergraduate-international/entry-requirements-for-international-students/",
  },
  {
    name: "Lincoln University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Agriculture & Environmental Sciences, Business",
    english: "IELTS ~6.0–6.5",
    link: "https://www.lincoln.ac.nz/study",
  },
];

const StvNewZealand = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        New Zealand Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major New Zealand universities with intake, programs, and English requirements for international students.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-purple-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">University/Institute</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Intake / Session & Application Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Programs for International Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">English Proficiency Requirements</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Admission Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nzUniversities.map((uni) => (
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

export default StvNewZealand;
