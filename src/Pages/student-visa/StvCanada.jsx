import React from "react";

const canadaUniversities = [
  {
    name: "University of Toronto",
    intake: "Fall (Sept; apply many months prior)",
    programs: "UG, MS, PhD – Arts, Engineering, Law, Business, Health",
    english: "IELTS 6.5–7.0+",
    link: "https://future.utoronto.ca/international-students",
  },
  {
    name: "University of British Columbia (UBC)",
    intake: "Fall & some Winter/Summer",
    programs: "UG, MS, PhD – Science, Engineering, Business, Health",
    english: "IELTS ~6.5+",
    link: "https://you.ubc.ca/applying-ubc/international-students",
  },
  {
    name: "McGill University",
    intake: "Fall (primary)",
    programs: "UG, MS, PhD – Arts, Engineering, Business, Health",
    english: "IELTS ~6.5+",
    link: "https://www.mcgill.ca/internationalstudents",
  },
  {
    name: "University of Alberta",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Engineering, Business, Science, Health",
    english: "IELTS ~6.5+",
    link: "https://www.ualberta.ca/admissions/international-students",
  },
  {
    name: "University of Waterloo",
    intake: "Fall (main) & Winter",
    programs: "UG, MS, PhD – Engineering, IT, Business, Science",
    english: "IELTS ~6.5+",
    link: "https://uwaterloo.ca/future-students/international-students",
  },
  {
    name: "Western University",
    intake: "Fall (primary)",
    programs: "UG, MS, PhD – Business, Arts, Health, Law",
    english: "IELTS ~6.5+",
    link: "https://welcome.uwo.ca",
  },
  {
    name: "Queen’s University at Kingston",
    intake: "Fall",
    programs: "UG, MS, PhD – Arts, Business, Engineering, Health",
    english: "IELTS ~6.5+",
    link: "https://www.queensu.ca/international",
  },
  {
    name: "McMaster University",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Health Sciences, Engineering, Business",
    english: "IELTS ~6.5+",
    link: "https://www.mcmaster.ca/international",
  },
  {
    name: "University of Calgary",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Engineering, Business, Arts, Science",
    english: "IELTS ~6.5+",
    link: "https://www.ucalgary.ca/future-students/international",
  },
  {
    name: "Simon Fraser University (SFU)",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Business, Engineering, IT, Science",
    english: "IELTS ~6.5+",
    link: "https://www.sfu.ca/students/international.html",
  },
  {
    name: "Dalhousie University",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Arts, Business, Engineering, Health",
    english: "IELTS ~6.5+",
    link: "https://www.dal.ca/admissions/international.html",
  },
  {
    name: "University of Ottawa",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Arts, Law, Business, Health",
    english: "IELTS ~6.5+",
    link: "https://www.uottawa.ca/future-students/international",
  },
  {
    name: "University of Manitoba",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Arts, Science, Business, Engineering",
    english: "IELTS ~6.5+",
    link: "https://umanitoba.ca/future-students/international",
  },
  {
    name: "York University",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Business, Arts, Law, Science",
    english: "IELTS ~6.5+",
    link: "https://futurestudents.yorku.ca/international",
  },
  {
    name: "Concordia University",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Arts, Business, Science, Engineering",
    english: "IELTS ~6.5+",
    link: "https://www.concordia.ca/admissions/international.html",
  },
  {
    name: "University of Saskatchewan",
    intake: "Fall",
    programs: "UG, MS, PhD – Engineering, Science, Business, Health",
    english: "IELTS ~6.5+",
    link: "https://admissions.usask.ca/international.php",
  },
  {
    name: "Memorial University of Newfoundland",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Arts, Science, Business, Engineering",
    english: "IELTS ~6.5+",
    link: "https://www.mun.ca/international",
  },
  {
    name: "University of Victoria (UVic)",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Engineering, Arts, Business, Science",
    english: "IELTS ~6.5+",
    link: "https://www.uvic.ca/international",
  },
  {
    name: "Carleton University",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Journalism, Science, Business, Engineering",
    english: "IELTS ~6.5+",
    link: "https://carleton.ca/futurestudents/international/",
  },
  {
    name: "University of New Brunswick (UNB)",
    intake: "Fall & Winter",
    programs: "UG, MS, PhD – Engineering, Science, Business",
    english: "IELTS ~6.5+",
    link: "https://www.unb.ca/fredericton/international-students",
  },
];

const StvCanada = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Canada Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Canadian universities with intake, programs, and English requirements for international students.
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
            {canadaUniversities.map((uni) => (
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

export default StvCanada;
