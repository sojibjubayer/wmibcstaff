import React from "react";

const netherlandsUniversities = [
  {
    name: "Delft University of Technology (TU Delft)",
    intake: "Sep (main) — apps Nov–Apr",
    programs: "Engineering, Tech, Architecture",
    english: "IELTS 6.5+",
    link: "https://www.tudelft.nl/en/",
  },
  {
    name: "University of Amsterdam (UvA)",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Arts, Sciences, Law",
    english: "IELTS 6.5+",
    link: "https://www.uva.nl/en/",
  },
  {
    name: "Eindhoven University of Technology (TU/e)",
    intake: "Sep — apps Nov–Apr",
    programs: "Engineering, Tech, Design",
    english: "IELTS 6.5+",
    link: "https://www.tue.nl/en/",
  },
  {
    name: "Leiden University",
    intake: "Sep — apps Nov–Apr",
    programs: "Humanities, Law, Sciences",
    english: "IELTS 6.5+",
    link: "https://www.uni-leiden.nl/en/",
  },
  {
    name: "Utrecht University",
    intake: "Sep — apps Nov–Apr",
    programs: "Sciences, Social Sciences, Law",
    english: "IELTS 6.5+",
    link: "https://www.uu.nl/en",
  },
  {
    name: "Wageningen University & Research (WUR)",
    intake: "Sep — apps Nov–Apr",
    programs: "Agriculture, Environmental Sci, Life Sci",
    english: "IELTS 6.5+",
    link: "https://www.wur.nl/en.htm",
  },
  {
    name: "University of Groningen",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Sciences, Social Sci",
    english: "IELTS 6.5+",
    link: "https://www.rug.nl/",
  },
  {
    name: "Vrije Universiteit Amsterdam (VU Amsterdam)",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Science, IT",
    english: "IELTS 6.5+",
    link: "https://www.vu.nl/en/",
  },
  {
    name: "Rotterdam School of Management (RSM)",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Management, MBA",
    english: "IELTS 6.5–7.0",
    link: "https://www.rsm.nl/",
  },
  {
    name: "Maastricht University",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Law, Health Sci",
    english: "IELTS 6.5+",
    link: "https://www.maastrichtuniversity.nl/",
  },
  {
    name: "Tilburg University",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Economics, Law",
    english: "IELTS 6.5+",
    link: "https://www.tilburguniversity.edu/",
  },
  {
    name: "Erasmus University Rotterdam",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Econ, Medicine",
    english: "IELTS 6.5+",
    link: "https://www.eur.nl/",
  },
  {
    name: "Radboud University",
    intake: "Sep — apps Nov–Apr",
    programs: "Humanities, Law, Sciences",
    english: "IELTS 6.5+",
    link: "https://www.ru.nl/english/",
  },
  {
    name: "University of Twente",
    intake: "Sep — apps Nov–Apr",
    programs: "Engineering, IT, Business",
    english: "IELTS 6.5+",
    link: "https://www.utwente.nl/en/",
  },
  {
    name: "Hanze University of Applied Sciences (Groningen)",
    intake: "Sep — apps Nov–Apr",
    programs: "Applied Sciences, Business, IT",
    english: "IELTS 6.0–6.5",
    link: "https://www.hanze.nl/EN/",
  },
  {
    name: "Amsterdam University of Applied Sciences (AUAS)",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, IT, Healthcare",
    english: "IELTS 6.0–6.5",
    link: "https://www.amsterdamuas.com/",
  },
  {
    name: "Hogeschool van Arnhem en Nijmegen (HAN)",
    intake: "Sep — apps Nov–Apr",
    programs: "Applied Sciences, Engineering",
    english: "IELTS 6.0–6.5",
    link: "https://www.han.nl/en/",
  },
  {
    name: "Fontys University of Applied Sciences",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, IT, Engineering",
    english: "IELTS 6.0–6.5",
    link: "https://fontys.edu/",
  },
  {
    name: "The Hague University of Applied Sciences",
    intake: "Sep — apps Nov–Apr",
    programs: "International Business, IT",
    english: "IELTS 6.0–6.5",
    link: "https://www.thehagueuniversity.com/",
  },
  {
    name: "Inholland University of Applied Sciences",
    intake: "Sep — apps Nov–Apr",
    programs: "Business, Tech, Media",
    english: "IELTS 6.0–6.5",
    link: "https://www.inholland.nl/",
  },
];

const StvNetherlands = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
        Netherlands Student Visa - Universities
      </h1>
      <p className="text-center text-green-700 mb-12">
        Major Dutch universities & applied sciences with intake, programs, and English requirements for international students.
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
            {netherlandsUniversities.map((uni) => (
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

export default StvNetherlands;
