import React from "react";

const italyUniversities = [
  {
    name: "University of Bologna",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.5",
    link: "https://www.unibo.it/en/teaching/enrolment-transfer-and-final-examination/admission-to-degree-programmes",
  },
  {
    name: "Politecnico di Milano",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0–6.5",
    link: "https://www.polimi.it/en/prospective-students/how-to-apply",
  },
  {
    name: "Sapienza University of Rome",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited, mostly Master’s)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.uniroma1.it/en/pagina/admission-international-students",
  },
  {
    name: "University of Padua",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.unipd.it/en/how-apply",
  },
  {
    name: "University of Milan",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.unimi.it/en/study/enrolment-and-admission",
  },
  {
    name: "University of Turin",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://en.unito.it/studying-unito/application-and-admission",
  },
  {
    name: "Ca’ Foscari University of Venice",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.unive.it/pag/16406/",
  },
  {
    name: "University of Florence",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.unifi.it/vp-11664-how-to-apply.html",
  },
  {
    name: "University of Rome Tor Vergata",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://en.uniroma2.it/admissions/",
  },
  {
    name: "University of Bari Aldo Moro",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.uniba.it/en/study/admission",
  },
  {
    name: "University of Pisa",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.unipi.it/index.php/admission",
  },
  {
    name: "University of Trento",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.unitn.it/en/admissions",
  },
  {
    name: "University of Genoa",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://unige.it/en/study-with-us/enrolment",
  },
  {
    name: "University of Catania",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.unict.it/en/study/admission",
  },
  {
    name: "University of Salerno",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://web.unisa.it/en/teaching/admission",
  },
  {
    name: "University of Bergamo",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.unibg.it/en/study/how-apply",
  },
  {
    name: "University of Naples Federico II",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (limited)",
    programs: "Bachelor, Master",
    english: "IELTS 6.0",
    link: "https://www.unina.it/en_GB/home",
  },
  {
    name: "University of Ferrara",
    intake: "Fall: Sep/Oct (App: Nov–Apr), Spring: Feb/Mar (few programs)",
    programs: "Bachelor, Master",
    english: "IELTS 5.5–6.0",
    link: "https://www.unife.it/en/how-to-apply",
  },
  {
    name: "John Cabot University (Private)",
    intake: "Fall: Aug/Sep (App: Jan–Jul), Spring: Jan (App: Sep–Nov)",
    programs: "Bachelor, Master",
    english: "IELTS 6.5",
    link: "https://www.johncabot.edu/admissions/",
  },
  {
    name: "Lorenzo de’ Medici Institute (Private)",
    intake: "Fall: Sep (App: Jan–Aug), Spring: Jan/Feb (App: Sep–Nov)",
    programs: "Foundation, Bachelor, Semester programs",
    english: "IELTS 6.0",
    link: "https://ldminstitute.com/admissions/",
  },
  {
    name: "MIB Trieste School of Management (Private)",
    intake: "Fall: Sep/Oct (App: Mar–Aug), Spring: Feb (App: Oct–Jan)",
    programs: "Master, MBA",
    english: "IELTS 6.0–6.5",
    link: "https://mib.edu/admissions/",
  },
];

const StvItaly = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-red-800 text-center mb-6">
        Italy Student Visa - Universities
      </h1>
      <p className="text-center text-red-700 mb-12">
        List of major Italian universities with intake, programs, and English requirements for international students.
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
            {italyUniversities.map((uni) => (
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

export default StvItaly;
