import React from "react";

const malaysiaUniversities = [
  {
    name: "University of Malaya (UM)",
    intake: "Feb & Sep",
    programs: "UG, MS, PhD – Arts, Science, Engineering, Business, Health",
    english: "IELTS ~6.0–6.5 or equivalent",
    link: "https://um.edu.my/study/international-students",
  },
  {
    name: "Universiti Kebangsaan Malaysia (UKM)",
    intake: "Feb & Sep",
    programs: "UG, MS, PhD – Science, Engineering, Business, Arts",
    english: "IELTS ~6.0–6.5 or equivalent",
    link: "https://www.ukm.my/en/admission/international-students",
  },
  {
    name: "Universiti Putra Malaysia (UPM)",
    intake: "Feb & Sep",
    programs: "UG, MS, PhD – Agriculture, Science, Engineering, Business",
    english: "IELTS ~6.0–6.5",
    link: "https://www.upm.edu.my/admission/international_students",
  },
  {
    name: "Universiti Teknologi Malaysia (UTM)",
    intake: "Feb & Sep",
    programs: "UG, MS, PhD – Engineering, Science, IT, Business",
    english: "IELTS ~6.0–6.5",
    link: "https://www.utm.my/admission/international/",
  },
  {
    name: "Universiti Sains Malaysia (USM)",
    intake: "Feb & Sep",
    programs: "UG, MS, PhD – Science, Engineering, Health, Arts",
    english: "IELTS ~6.0–6.5",
    link: "https://www.usm.my/admission/international",
  },
  {
    name: "Taylor’s University",
    intake: "Feb, May & Sep",
    programs: "UG, MS – Business, Arts, Hospitality, IT",
    english: "IELTS ~6.0+",
    link: "https://university.taylors.edu.my/International-Students.html",
  },
  {
    name: "Monash University Malaysia",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Arts, Science, Business, Engineering",
    english: "IELTS ~6.5",
    link: "https://www.monash.edu.my/study/international",
  },
  {
    name: "Sunway University",
    intake: "Feb & Jul",
    programs: "UG, MS – Business, Arts, Science, IT",
    english: "IELTS ~6.0",
    link: "https://university.sunway.edu.my/international",
  },
];

const StvMalaysia = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Malaysia Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Malaysian universities with intake, programs, and English requirements for international students.
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
            {malaysiaUniversities.map((uni) => (
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

export default StvMalaysia;
