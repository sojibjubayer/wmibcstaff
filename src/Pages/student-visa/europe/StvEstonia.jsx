import React from "react";

const estoniaUniversities = [
  {
    name: "University of Tartu",
    intake: "Main intake: Sep (applications typically Jan–Apr)",
    programs: "Bachelor, Master, PhD; Business, IT, Sciences, Medicine & more – many English programs",
    english: "IELTS ~6.0 (varies by program; TOEFL accepted)",
    link: "https://estonia.dreamapply.com/institutions/institution/1-university-tartu",
  },
  {
    name: "Tallinn University of Technology (TalTech)",
    intake: "Main: Sep (applications Jan–Apr via DreamApply)",
    programs: "Engineering, IT, Business & Tech (Bachelor & Master)",
    english: "IELTS ~6.0–6.5 (TOEFL also accepted)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "Tallinn University (TLU)",
    intake: "Main: Sep (applications Jan–Apr)",
    programs: "Humanities, Social Sciences, Business, Media, Law",
    english: "IELTS ~6.0 (TOEFL accepted)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "Estonian Business School (EBS) (Private)",
    intake: "Main: Sep (applications early year via DreamApply)",
    programs: "Business, Management, Finance, Marketing",
    english: "IELTS ~6.0–6.5 (varies)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "Estonian Entrepreneurship University of Applied Sciences (EUAS) (Private)",
    intake: "Main: Sep (applications Jan–Apr)",
    programs: "Business Admin, Finance, Logistics, Software & Game Dev",
    english: "IELTS ~5.5–6.5 (English programs)",
    link: "https://www.euas.eu/",
  },
  {
    name: "Estonian University of Life Sciences (EMÜ)",
    intake: "Main: Sep (via DreamApply)",
    programs: "Agriculture, Environmental Science, Veterinary, Bio Sciences",
    english: "IELTS ~6.0 (varies by faculty)",
    link: "https://www.emu.ee/en/admissions",
  },
  {
    name: "Estonian Academy of Arts (EKA)",
    intake: "Main: Sep (applications vary)",
    programs: "Art, Design, Media, Architecture (Bachelor & Masters)",
    english: "IELTS ~6.0 (portfolio may be required)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "Estonian Academy of Music and Theatre (EAMT)",
    intake: "Main: Sep (applications early year)",
    programs: "Music, Performing Arts, Theatre, Cultural Mgt",
    english: "IELTS ~6.0 (auditions possible)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "TTK University of Applied Sciences",
    intake: "Main: Sep (applications Jan–Apr)",
    programs: "IT, Engineering, Business, Logistics",
    english: "IELTS ~6.0 (varies)",
    link: "https://estonia.dreamapply.com/",
  },
  {
    name: "Tartu Applied Health Sciences University",
    intake: "Main: Sep (applications early year)",
    programs: "Healthcare, Nursing, Physiotherapy, Allied Sciences",
    english: "IELTS ~6.0+ (medical fields)",
    link: "https://estonia.dreamapply.com/",
  },
];

const StvEstonia = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Estonia Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        List of major Estonian universities with intake, programs, and English requirements for international students.
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
            {estoniaUniversities.map((uni) => (
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

export default StvEstonia;
