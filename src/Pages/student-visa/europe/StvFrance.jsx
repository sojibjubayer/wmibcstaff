import React from "react";

const franceUniversities = [
  {
    name: "Université PSL (Paris Sciences & Lettres)",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Master/PhD (Sci, Econ, Engg, Data) – many English tracks",
    english: "IELTS 6.5+ / TOEFL",
    link: "https://www.univ-psl.fr/",
  },
  {
    name: "Université Paris-Saclay",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Engineering, AI, Science, Business, Health",
    english: "IELTS 6.0–6.5",
    link: "https://www.universite-paris-saclay.fr/",
  },
  {
    name: "Sorbonne University (Paris)",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Arts, Science, Health, Law",
    english: "IELTS 6.0–6.5",
    link: "https://www.sorbonne-universite.fr/",
  },
  {
    name: "Aix-Marseille University",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Medicine, Social Sci, Law, Applied Sci",
    english: "IELTS 6.0–6.5",
    link: "https://www.univ-amu.fr/",
  },
  {
    name: "Université de Montpellier",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Life Sci, Medicine, Engineering, Environ Sci",
    english: "IELTS 6.0–6.5",
    link: "https://www.umontpellier.fr/",
  },
  {
    name: "Université de Strasbourg",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Sciences, Humanities, Law",
    english: "IELTS 6.0–6.5",
    link: "https://www.unistra.fr/",
  },
  {
    name: "Université de Bordeaux",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Science, Engineering, Social Sci",
    english: "IELTS 6.0–6.5",
    link: "https://www.u-bordeaux.com/",
  },
  {
    name: "Université de Lyon (multi-campus)",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Business, Sci, Tech, Arts",
    english: "IELTS 6.0–6.5",
    link: "https://www.universite-lyon.fr/",
  },
  {
    name: "Université Grenoble Alpes",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Science, Tech, Economics",
    english: "IELTS 6.0–6.5",
    link: "https://www.univ-grenoble-alpes.fr/",
  },
  {
    name: "Université de Nantes",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Business, Humanities, Tech",
    english: "IELTS 6.0–6.5",
    link: "https://www.univ-nantes.fr/",
  },
  {
    name: "Paris Cité University",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Law, Health Sci, Social Sci",
    english: "IELTS 6.0–6.5",
    link: "https://u-paris.fr/",
  },
  {
    name: "Université de Toulouse (multi-campus)",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Engineering, Arts, Business",
    english: "IELTS 6.0–6.5",
    link: "https://www.univ-toulouse.fr/",
  },
  {
    name: "IESEG School of Management (private Business)",
    intake: "Fall (Sep/Oct); variable",
    programs: "Business, Management, Finance (English)",
    english: "IELTS 6.5+",
    link: "https://www.ieseg.fr/",
  },
  {
    name: "NEOMA Business School (private)",
    intake: "Fall (Sep/Oct); apps often by Jun–Jul",
    programs: "Business, Marketing, Mgmt",
    english: "IELTS 6.5+",
    link: "https://www.neoma-bs.com/",
  },
  {
    name: "EDHEC Business School (private)",
    intake: "Fall (Sep/Oct); various deadlines",
    programs: "Business, Finance, MBA",
    english: "IELTS 6.5+",
    link: "https://www.edhec.edu/",
  },
  {
    name: "Audencia Business School (private)",
    intake: "Fall (Sep/Oct); app deadlines vary",
    programs: "BBA, Master in Management, MBA",
    english: "IELTS 6.5+",
    link: "https://www.audencia.com/",
  },
  {
    name: "INSEEC School of Business & Econ (private)",
    intake: "Fall (Sep/Oct); apps vary",
    programs: "Business, Econ, Management",
    english: "IELTS 6.5+",
    link: "https://www.inseec.com/",
  },
  {
    name: "CEFAM (Lyon) (private)",
    intake: "Fall (Sep/Oct); apps vary",
    programs: "Bachelor & MBA (English-focused)",
    english: "IELTS 6.0+",
    link: "https://www.cefam.fr/",
  },
  {
    name: "Institut Mines-Télécom Atlantique (IMT Atlantique)",
    intake: "Fall (Sep/Oct); apps vary",
    programs: "MSc Engg/Tech (English)",
    english: "IELTS 6.0–6.5",
    link: "https://www.imt-atlantique.fr/",
  },
  {
    name: "IAE Lyon / IAE Poitiers (Public Business Schools)",
    intake: "Fall (Sep/Oct); apps ~Oct–Dec",
    programs: "Business & Management pathways",
    english: "IELTS 6.0–6.5",
    link: "https://iae.univ-lyon.fr/ / http://www.iae.univ-poitiers.fr/",
  },
];

const StvFrance = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-red-800 text-center mb-6">
        France Student Visa - Universities
      </h1>
      <p className="text-center text-red-700 mb-12">
        List of major French universities with intake, programs, and English requirements for international students.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-red-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-800">University/Institute</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-800">Intake / Session</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-800">Programs for International Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-800">English Proficiency</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-800">Admission Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {franceUniversities.map((uni) => (
              <tr key={uni.name} className="hover:bg-red-50">
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

export default StvFrance;
