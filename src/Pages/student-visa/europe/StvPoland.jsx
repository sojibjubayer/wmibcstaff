import React from "react";

const polandUniversities = [
  {
    name: "University of Warsaw",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Bachelor, Master, PhD – Business, Law, IT, Sciences",
    english: "IELTS 6.0–6.5 / MOI",
    link: "https://en.uw.edu.pl/",
  },
  {
    name: "Jagiellonian University",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Medicine, Science, Humanities, Business",
    english: "IELTS 6.0–6.5 / MOI",
    link: "https://en.uj.edu.pl/",
  },
  {
    name: "Warsaw University of Technology",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Engineering, IT, Engineering Management",
    english: "IELTS 6.0–6.5 / MOI",
    link: "https://www.pw.edu.pl/",
  },
  {
    name: "AGH University of Science & Technology (Kraków)",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Engineering, Computer Sci, Tech",
    english: "IELTS 6.0–6.5",
    link: "https://www.agh.edu.pl/",
  },
  {
    name: "Adam Mickiewicz University (Poznań)",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Business, Sciences, Humanities",
    english: "IELTS 6.0",
    link: "https://amu.edu.pl/",
  },
  {
    name: "University of Wrocław",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Sciences, Humanities, Business",
    english: "IELTS 6.0–6.5",
    link: "https://international.uni.wroc.pl/",
  },
  {
    name: "Wrocław University of Science & Technology",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Engineering, IT, Applied Sci",
    english: "IELTS 6.0",
    link: "https://pwr.edu.pl/",
  },
  {
    name: "Gdańsk University of Technology",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Engineering, IT, Civil & Env Sci",
    english: "IELTS 6.0–6.5",
    link: "https://pg.edu.pl/",
  },
  {
    name: "University of Łódź",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Business, IT, Social Sci",
    english: "IELTS 6.0 / MOI",
    link: "https://www.uni.lodz.pl/",
  },
  {
    name: "Nicolaus Copernicus University (Toruń)",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Sciences, Medicine, IT",
    english: "IELTS 6.0",
    link: "https://www.umk.pl/",
  },
  {
    name: "Poznań University of Life Sciences",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Agriculture, Bio Sci, Enviro Sci",
    english: "IELTS 6.0",
    link: "https://www.puls.edu.pl/",
  },
  {
    name: "Maria Curie-Skłodowska University (Lublin)",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Multidisciplinary – Sciences, Business",
    english: "IELTS 6.0",
    link: "https://www.umcs.pl/en/",
  },
  {
    name: "Kozminski University (Private)",
    intake: "Fall (Sep) – apps ~Feb–Jun",
    programs: "Business, Management, Law, MBA",
    english: "IELTS 6.5 / MOI",
    link: "https://www.kozminski.edu.pl/",
  },
  {
    name: "Vistula University (Warsaw) (Private)",
    intake: "Fall (Sep) – apps ~Feb–Jun",
    programs: "Business, Finance, IT",
    english: "IELTS 6.0 / MOI",
    link: "https://www.vistula.edu.pl/",
  },
  {
    name: "Collegium Civitas (Private)",
    intake: "Fall (Sep) – apply ~Feb–Jun",
    programs: "International Relations, Sociology, Management",
    english: "IELTS 6.0",
    link: "https://civitas.edu.pl/en/",
  },
  {
    name: "Cardinal Stefan Wyszyński University",
    intake: "Fall (Sep) – apply ~Feb–May",
    programs: "Humanities, Theology, Social Sci",
    english: "IELTS 6.0",
    link: "https://uksw.edu.pl/",
  },
  {
    name: "Andrzej Frycz Modrzewski Krakow University",
    intake: "Fall (Sep) – apply ~Feb–Jun",
    programs: "Business, Law, IT",
    english: "IELTS 6.0",
    link: "https://www.afm.edu.pl/",
  },
  {
    name: "Collegium Da Vinci (Poznań)",
    intake: "Fall (Sep) – apps ~Feb–Jun",
    programs: "Business, Design, IT",
    english: "IELTS 6.0",
    link: "https://cdv.pl/",
  },
  {
    name: "WSB Merito Universities (Private Group)",
    intake: "Fall (Sep) – apply ~Feb–Jun",
    programs: "Business, Mgmt, IT",
    english: "IELTS 6.0",
    link: "https://wsb.pl/en/",
  },
  {
    name: "University of Information Technology & Management (Rzeszów) (Private)",
    intake: "Fall (Sep) – apply ~Feb–Jun",
    programs: "IT, Management, Business",
    english: "IELTS 6.0",
    link: "https://wsb.pl/rzeszow/en/",
  },
];

const StvPoland = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Poland Student Visa - Universities
      </h1>
      <p className="text-center text-purple-700 mb-12">
        Major Polish universities & private institutions with intake, programs, and English requirements for international students.
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
            {polandUniversities.map((uni) => (
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

export default StvPoland;
