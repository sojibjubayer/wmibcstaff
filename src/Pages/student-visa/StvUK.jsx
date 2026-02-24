import React from "react";

const ukUniversities = [
  {
    name: "University of Oxford",
    intake: "Sep (primary) – apply by Jan–Jun",
    programs: "UG, MS, PhD – Arts, Engineering, Law, Business, Science",
    english: "IELTS ~7.0–7.5 (varies by program)",
    link: "https://www.ox.ac.uk/admissions/undergraduate/international-students",
  },
  {
    name: "University of Cambridge",
    intake: "Sep (primary) – apply by Jan–Jun",
    programs: "UG, MS, PhD – Science, Engineering, Business, Arts",
    english: "IELTS ~7.0+",
    link: "https://www.cam.ac.uk/study/international",
  },
  {
    name: "Imperial College London",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Science, Business",
    english: "IELTS ~6.5–7.0",
    link: "https://www.imperial.ac.uk/study/international-students",
  },
  {
    name: "University College London (UCL)",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Arts, Science, Business, Law",
    english: "IELTS ~6.5–7.0",
    link: "https://www.ucl.ac.uk/prospective-students/international",
  },
  {
    name: "London School of Economics and Political Science (LSE)",
    intake: "Sep & some Jan",
    programs: "UG, MS, PhD – Social Sciences, Business, Law",
    english: "IELTS ~7.0",
    link: "https://www.lse.ac.uk/study/international",
  },
  {
    name: "University of Manchester",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Business, Engineering, Science, Arts",
    english: "IELTS ~6.5+",
    link: "https://www.manchester.ac.uk/study/international/",
  },
  {
    name: "University of Edinburgh",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Business, Science, Arts",
    english: "IELTS ~6.5–7.0",
    link: "https://www.ed.ac.uk/study/international",
  },
  {
    name: "King’s College London",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Arts, Business, Health, Law",
    english: "IELTS ~6.5–7.0",
    link: "https://www.kcl.ac.uk/study/international",
  },
  {
    name: "University of Bristol",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Business, Arts, Science",
    english: "IELTS ~6.5+",
    link: "https://www.bristol.ac.uk/study/international/",
  },
  {
    name: "University of Leeds",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Business, Engineering, Science",
    english: "IELTS ~6.5+",
    link: "https://www.leeds.ac.uk/info/130589/international_students",
  },
  {
    name: "University of Birmingham",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Business, Engineering, Law, Science",
    english: "IELTS ~6.5",
    link: "https://www.birmingham.ac.uk/international",
  },
  {
    name: "University of Warwick",
    intake: "Sep (primary)",
    programs: "UG, MS, PhD – Business, Engineering, Science",
    english: "IELTS ~6.5",
    link: "https://warwick.ac.uk/study/international",
  },
  {
    name: "University of Glasgow",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Health Sciences, Business, Engineering",
    english: "IELTS ~6.5+",
    link: "https://www.gla.ac.uk/international/",
  },
  {
    name: "University of Southampton",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Science, Business",
    english: "IELTS ~6.5",
    link: "https://www.southampton.ac.uk/international",
  },
  {
    name: "Cardiff University",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Business, Engineering, Health",
    english: "IELTS ~6.5",
    link: "https://www.cardiff.ac.uk/study/international",
  },
  {
    name: "Queen Mary University of London",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Business, Law, Science",
    english: "IELTS ~6.5",
    link: "https://www.qmul.ac.uk/international/",
  },
  {
    name: "University of Nottingham",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Science, Business, Engineering",
    english: "IELTS ~6.5",
    link: "https://www.nottingham.ac.uk/international",
  },
  {
    name: "Newcastle University",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Science, Business",
    english: "IELTS ~6.5",
    link: "https://www.ncl.ac.uk/international/",
  },
  {
    name: "University of Sheffield",
    intake: "Sep & Jan",
    programs: "UG, MS, PhD – Engineering, Business, Science",
    english: "IELTS ~6.5",
    link: "https://www.sheffield.ac.uk/international",
  },
  {
    name: "Anglia Ruskin University",
    intake: "Sep & Jan (wider intakes for some courses)",
    programs: "UG, MS, PhD – Business, Arts, Science",
    english: "IELTS ~6.0–6.5 (often flexible)",
    link: "https://www.aru.ac.uk/study/international",
  },
];

const StvUK = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        UK Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major UK universities with intake, programs, and English requirements for international students.
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
            {ukUniversities.map((uni) => (
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

export default StvUK;
