import React from "react";

const maltaUniversities = [
  {
    name: "University of Malta",
    intake: "Fall (Oct) – apply Jun–Aug; Spring (Feb) – apply Nov–Dec",
    programs: "UG, PG, PhD – Arts, Business, Engineering, Law, Science, Medicine, Education",
    english: "IELTS 6.0–6.5",
    link: "https://www.um.edu.mt/study/admissionsadvice/international/",
  },
  {
    name: "Malta College of Arts, Science & Technology (MCAST)",
    intake: "Fall (Oct) – applications open early year, deadlines vary",
    programs: "Diplomas, Bachelors, some Masters – Engineering, ICT, Business, Health Sciences, Creative Media",
    english: "IELTS 5.5–6.5",
    link: "https://mcast.edu.mt/international-applicants/",
  },
  {
    name: "Institute of Tourism Studies (ITS)",
    intake: "Fall (Oct) – check specific deadlines on website",
    programs: "Diplomas and Bachelors – Tourism, Hospitality, Culinary Arts, Events Management",
    english: "IELTS 5.5–6.0",
    link: "https://its.edu.mt/",
  },
  {
    name: "Ġ.F. Abela Junior College (JC)",
    intake: "Applications in spring/summer ahead of academic year",
    programs: "Pre-university matriculation / A-level preparation",
    english: "IELTS N/A",
    link: "https://www.jc.um.edu.mt/",
  },
  {
    name: "Life Long Learning (LLL Centre)",
    intake: "Flexible / year-round",
    programs: "Short courses & professional training",
    english: "IELTS varies by course",
    link: "https://euroguidance.gov.mt/schools/",
  },
  {
    name: "London School of Commerce Malta (Private)",
    intake: "Fall (Sep/Oct) & sometimes Spring; rolling admission",
    programs: "Foundation, Business, Management, Hospitality",
    english: "IELTS 5.5–6.0 (UG), 6.0–6.5 (PG)",
    link: "https://www.lscmalta.com",
  },
  {
    name: "International European University Malta (Private)",
    intake: "Fall (Sep/Oct) – main intake",
    programs: "Business, IT",
    english: "IELTS 5.5–6.0 (UG), 6.0+ (PG)",
    link: "https://www.ieu.edu.mt",
  },
  {
    name: "St. Martin’s Institute of Higher Education (Private)",
    intake: "Fall (Sep/Oct) & Spring (Feb)",
    programs: "Foundation, Business, IT, Health Sci",
    english: "IELTS 6.0 (UG), 6.5 (PG)",
    link: "https://www.smimalta.ac.mt",
  },
  {
    name: "European Graduate School Malta (Private)",
    intake: "Fall (Sep/Oct)",
    programs: "Humanities, Media",
    english: "IELTS 6.0 (UG), 6.5 (PG)",
    link: "https://www.egs.edu",
  },
  {
    name: "Advenio eAcademy (Private)",
    intake: "Fall & Spring intakes",
    programs: "Foundation, Business, Entrepreneurship",
    english: "IELTS 5.5–6.0 (UG), 6.0–6.5 (PG)",
    link: "https://www.advenioeacademy.com",
  },
  {
    name: "LearnKey Institute Malta (Private)",
    intake: "Flexible / rolling",
    programs: "Foundation, Business, IT, Management",
    english: "IELTS 5.5 (UG), 6.0 (PG)",
    link: "#",
  },
  {
    name: "Domain Academy of Higher Education (Private)",
    intake: "Fall & Spring intakes",
    programs: "Foundation, BA Communication/English, Arts",
    english: "IELTS 5.5 (UG), 6.0 (PG)",
    link: "#",
  },
  {
    name: "South Europe College (Private)",
    intake: "Rolling / flexible",
    programs: "Online UG/PG programs",
    english: "IELTS 6.0–6.5 approx",
    link: "https://southeurope.edu.mt",
  },
  {
    name: "IDEA Academy Malta (Private)",
    intake: "Fall & Spring",
    programs: "Foundation, Business, IT, Humanities",
    english: "IELTS 6.0 (UG), 6.5 (PG)",
    link: "#",
  },
  {
    name: "St. Edward’s International College (Private)",
    intake: "Fall & Spring",
    programs: "Foundation, Business, Tourism, IT",
    english: "IELTS 5.5",
    link: "#",
  },
  {
    name: "Malta International College (Private)",
    intake: "Fall & Spring",
    programs: "Foundation, UG & PG diplomas",
    english: "IELTS 6.0 (or 5.5 optional)",
    link: "#",
  },
  {
    name: "London Institute of Technology and Business – Malta (Private)",
    intake: "Fall & Spring",
    programs: "Foundation, IT, AI, Digital Marketing",
    english: "IELTS 6.0",
    link: "#",
  },
  {
    name: "Malta Academy of Fine Arts (Private)",
    intake: "Fall",
    programs: "Fine Arts, Design, Media",
    english: "IELTS 5.5",
    link: "#",
  },
  {
    name: "Malta Financial Services Institute (Private)",
    intake: "Fall",
    programs: "Finance, Accounting, Risk Mgmt",
    english: "IELTS 6.0 approx",
    link: "#",
  },
  {
    name: "STC Higher Education Malta (Private)",
    intake: "Fall & Spring",
    programs: "Foundation, Business & IT programs",
    english: "IELTS 5.5 (UG), 6.0 (PG)",
    link: "#",
  },
];

const StvMalta = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Malta Student Visa - Universities & Colleges
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Maltese universities and private institutions with intake, programs, and English requirements for international students.
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
            {maltaUniversities.map((uni) => (
              <tr key={uni.name} className="hover:bg-purple-50">
                <td className="px-4 py-3">{uni.name}</td>
                <td className="px-4 py-3">{uni.intake}</td>
                <td className="px-4 py-3">{uni.programs}</td>
                <td className="px-4 py-3">{uni.english}</td>
                <td className="px-4 py-3">
                  {uni.link !== "#" ? (
                    <a
                      href={uni.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Apply / Info
                    </a>
                  ) : (
                    "Info on website"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StvMalta;
