import React from "react";

const australiaUniversities = [
  {
    name: "University of Melbourne",
    intake: "Feb & Jul (apply many months prior)",
    programs: "UG, MS, PhD – Arts, Engineering, Law, Business, Health",
    english: "IELTS usually 6.5–7.0",
    link: "https://study.unimelb.edu.au/how-to-apply/entry-requirements/international-applications",
  },
  {
    name: "University of Sydney",
    intake: "Feb & Aug (check deadlines)",
    programs: "UG, MS, PhD – Arts, Business, Law, Engineering, Health",
    english: "IELTS ~ 6.5+ (varies)",
    link: "https://www.sydney.edu.au/study/applying/how-to-apply/international-students.html",
  },
  {
    name: "UNSW Sydney",
    intake: "Feb & Jul (dates vary)",
    programs: "UG, MS, PhD – Engineering, Business, Law, IT",
    english: "IELTS ~ 6.5",
    link: "https://www.unsw.edu.au/study/how-to-apply/international",
  },
  {
    name: "Australian National University (ANU)",
    intake: "Feb & Jul (varies by program)",
    programs: "UG, MS, PhD – Arts, Science, Engineering, Business",
    english: "IELTS ~ 6.5+",
    link: "https://www.anu.edu.au/study/apply/international-students",
  },
  {
    name: "Monash University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Engineering, Business, Arts, Health",
    english: "IELTS ~ 6.5",
    link: "https://www.monash.edu/study/international",
  },
  {
    name: "University of Queensland (UQ)",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Science, Business, Engineering, Health",
    english: "IELTS ~ 6.5",
    link: "https://www.uq.edu.au/study/international",
  },
  {
    name: "University of Western Australia (UWA)",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Science, Engineering, Business",
    english: "IELTS ~ 6.5",
    link: "https://www.uwa.edu.au/study",
  },
  {
    name: "University of Adelaide",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Engineering, Health, Business",
    english: "IELTS ~ 6.5",
    link: "https://www.adelaide.edu.au/study/international",
  },
  {
    name: "University of Technology Sydney (UTS)",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Engineering, IT",
    english: "IELTS ~ 6.5",
    link: "https://www.uts.edu.au/future-students/international",
  },
  {
    name: "RMIT University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Design, Business, Engineering",
    english: "IELTS ~ 6.5",
    link: "https://www.rmit.edu.au/study-with-us/international-students",
  },
  {
    name: "Griffith University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Health, Science",
    english: "IELTS ~ 6.0–6.5",
    link: "https://www.griffith.edu.au/international",
  },
  {
    name: "University of Wollongong",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Engineering, Business, IT",
    english: "IELTS ~ 6.0+",
    link: "https://www.uow.edu.au/international",
  },
  {
    name: "Macquarie University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Engineering, Health",
    english: "IELTS ~ 6.5",
    link: "https://www.mq.edu.au/study/international",
  },
  {
    name: "Swinburne University of Technology",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Engineering, Business, IT",
    english: "IELTS ~ 6.5",
    link: "https://www.swinburne.edu.au/study/international",
  },
  {
    name: "University of South Australia",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Health, IT",
    english: "IELTS ~ 6.5",
    link: "https://www.unisa.edu.au/study/international",
  },
  {
    name: "Victoria University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Engineering",
    english: "IELTS ~ 6.0–6.5",
    link: "https://www.vu.edu.au/study-at-vu/international-students",
  },
  {
    name: "Charles Darwin University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Education, IT",
    english: "IELTS ~ 6.0",
    link: "https://www.cdu.edu.au/international",
  },
  {
    name: "Flinders University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Health Sci, Business, Engineering",
    english: "IELTS ~ 6.5",
    link: "https://www.flinders.edu.au/study/international",
  },
  {
    name: "Charles Sturt University",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Agriculture, Business, IT",
    english: "IELTS ~ 6.0",
    link: "https://study.csu.edu.au/international",
  },
  {
    name: "Torrens University Australia",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, Design, Hospitality",
    english: "IELTS ~ 6.0",
    link: "https://www.torrens.edu.au/international",
  },
  {
    name: "Federation University Australia",
    intake: "Feb & Jul",
    programs: "UG, MS, PhD – Business, IT, Education",
    english: "IELTS ~ 6.0",
    link: "https://federation.edu.au/study/international",
  },
];

const StvAustralia = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Australia Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        Here’s a list of major Australian universities with intake, programs, and English requirements for international students.
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
            {australiaUniversities.map((uni) => (
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

export default StvAustralia;
