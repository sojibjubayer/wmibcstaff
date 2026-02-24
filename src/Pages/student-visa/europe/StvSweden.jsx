import React from "react";

const swedenUniversities = [
  {
    name: "Lund University",
    intake: "Autumn (Aug/Sep); Applications Oct–Jan",
    programs: "Bachelor, Master, PhD—wide range including engineering, sciences, business",
    english: "IELTS 6.5+ (English 7 for some)",
    link: "https://www.lunduniversity.lu.se/",
  },
  {
    name: "Uppsala University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Bachelor, Master, PhD across disciplines",
    english: "IELTS 6.5+ common",
    link: "https://www.uu.se/en/admissions/",
  },
  {
    name: "KTH Royal Institute of Technology",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering, tech, architecture",
    english: "IELTS 6.5+ (some higher)",
    link: "https://www.kth.se/en/",
  },
  {
    name: "Stockholm University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Bachelor, Master programs in sciences, humanities",
    english: "IELTS 6.5+",
    link: "https://www.su.se/english/",
  },
  {
    name: "University of Gothenburg",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business, arts, sciences",
    english: "IELTS 6.5+",
    link: "https://www.gu.se/en",
  },
  {
    name: "Chalmers University of Technology",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering, tech & applied sciences",
    english: "IELTS 6.5+",
    link: "https://www.chalmers.se/en",
  },
  {
    name: "Linköping University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering, business, sciences",
    english: "IELTS 6.5+",
    link: "https://liu.se/en/",
  },
  {
    name: "Umeå University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Sciences, humanities & tech",
    english: "IELTS 6.5+",
    link: "https://www.umu.se/en/",
  },
  {
    name: "Jönköping University (Private)",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business, IT, engineering, health sciences",
    english: "IELTS 6.5+",
    link: "https://ju.se/",
  },
  {
    name: "Örebro University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Sciences, business, tech",
    english: "IELTS 6.5+",
    link: "https://www.oru.se/english/",
  },
  {
    name: "Linnaeus University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business, IT, social sciences",
    english: "IELTS 6.5+",
    link: "https://lnu.se/en/",
  },
  {
    name: "Swedish University of Agricultural Sciences (SLU)",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Agriculture, environment, life sciences",
    english: "IELTS 6.5+",
    link: "https://www.slu.se/en/",
  },
  {
    name: "Malmö University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business, social sciences, tech",
    english: "IELTS 6.5+",
    link: "https://www.mah.se/english/",
  },
  {
    name: "Blekinge Institute of Technology",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering, IT, sustainable development",
    english: "IELTS 6.5+",
    link: "https://www.bth.se/en/",
  },
  {
    name: "Karolinska Institutet",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Medicine & health sciences",
    english: "IELTS 6.5+",
    link: "https://ki.se/en",
  },
  {
    name: "Luleå University of Technology",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering & tech",
    english: "IELTS 6.5+",
    link: "https://www.ltu.se/",
  },
  {
    name: "Mid Sweden University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business, tech, humanities",
    english: "IELTS 6.5+",
    link: "https://www.miun.se/en/",
  },
  {
    name: "Karlstad University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Business & social sciences",
    english: "IELTS 6.5+",
    link: "https://www.kau.se/en/",
  },
  {
    name: "Dalarna University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Applied sciences & business",
    english: "IELTS 6.5+",
    link: "https://www.du.se/en/",
  },
  {
    name: "Mälardalen University",
    intake: "Autumn (Aug/Sep); Oct–Jan",
    programs: "Engineering, business, IT",
    english: "IELTS 6.5+",
    link: "https://mdu.se/en/",
  },
];

const StvSweden = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
        Sweden Student Visa - Universities
      </h1>
      <p className="text-center text-blue-600 mb-12">
        Major Swedish universities & private institutions with intake, programs, and English requirements for international students.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">University/Institute</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Intake / Session</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Programs for International Students</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">English Proficiency</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Admission Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {swedenUniversities.map((uni) => (
              <tr key={uni.name} className="hover:bg-blue-50">
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

export default StvSweden;
