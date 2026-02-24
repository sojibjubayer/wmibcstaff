import React from "react";

const romaniaUniversities = [
  {
    name: "University of Bucharest",
    intake: "Sep intake (main): apply Feb–Aug",
    programs: "Arts & Social Sciences, Science, Law, Business",
    english: "IELTS 5.5–6.5 / TOEFL / MOI",
    link: "https://unibuc.ro/en/",
  },
  {
    name: "Babeș-Bolyai University (Cluj-Napoca)",
    intake: "Sep intake: Feb–Aug",
    programs: "Multilingual – Business, IT, Social Sci, Law",
    english: "IELTS 5.5–6.5 / MOI",
    link: "https://www.ubbcluj.ro/en/",
  },
  {
    name: "Politehnica University of Bucharest",
    intake: "Sep intake: Feb–Aug",
    programs: "Engineering, IT, Applied Sciences",
    english: "IELTS 5.5–6.5 / TOEFL/MOI",
    link: "https://upb.ro/en/",
  },
  {
    name: "Alexandru Ioan Cuza University (Iași)",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, Law, Sci, Humanities",
    english: "IELTS 5.5–6.5 / TOEFL/MOI",
    link: "https://www.uaic.ro/en/",
  },
  {
    name: "West University of Timișoara",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, IT, Law, Sciences",
    english: "IELTS 5.5–6.5 / MOI",
    link: "https://www.uvt.ro/en/",
  },
  {
    name: "Technical University of Cluj-Napoca",
    intake: "Sep intake: Feb–Aug",
    programs: "Engineering, Tech, Architecture",
    english: "IELTS 5.5–6.5 / TOEFL/MOI",
    link: "https://www.utcluj.ro/en/",
  },
  {
    name: "Transilvania University of Brașov",
    intake: "Sep intake: Feb–Aug",
    programs: "Engineering, Business, IT",
    english: "IELTS 5.5–6.5",
    link: "https://www.unitbv.ro/en/",
  },
  {
    name: "Carol Davila Univ. of Medicine & Pharmacy",
    intake: "Oct intake: Mar–Jul",
    programs: "Medicine, Dentistry, Pharmacy",
    english: "IELTS 6.0+ / TOEFL",
    link: "https://www.cmub.ro/en/",
  },
  {
    name: "Iuliu Hațieganu University of Medicine and Pharmacy",
    intake: "Sep intake: Feb–Aug",
    programs: "Medicine, Health Sciences",
    english: "IELTS 6.0+",
    link: "https://www.umfcluj.ro/",
  },
  {
    name: "Grigore T. Popa Univ. of Medicine & Pharmacy (Iași)",
    intake: "Sep intake: Feb–Aug",
    programs: "Medicine, Pharmacy, Dentistry",
    english: "IELTS 6.0+",
    link: "https://www.umfiasi.ro/en/",
  },
  {
    name: "University of Medicine & Pharmacy of Craiova",
    intake: "Sep intake: Feb–Aug",
    programs: "Medicine & Health Programs",
    english: "IELTS 6.0+",
    link: "https://www.umfcv.ro/",
  },
  {
    name: "University of Agronomic Sciences & Veterinary Medicine Bucharest",
    intake: "Sep intake: Feb–Aug",
    programs: "Agriculture, Vet Medicine, Bio Sciences",
    english: "IELTS 5.5–6.5",
    link: "https://www.usamv.ro/",
  },
  {
    name: "University of Oradea",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, Law, IT, Medicine",
    english: "IELTS 5.5–6.5",
    link: "https://www.uoradea.ro/",
  },
  {
    name: "Lucian Blaga University of Sibiu",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, IT, Law, Humanities",
    english: "IELTS 5.5–6.5",
    link: "https://www.ulbsibiu.ro/",
  },
  {
    name: "Ştefan cel Mare Univ. of Suceava",
    intake: "Sep intake: Feb–Aug",
    programs: "IT, Engineering, Economics, Law",
    english: "IELTS 5.5–6.5",
    link: "https://www.usv.ro/",
  },
  {
    name: "University of Craiova",
    intake: "Sep intake: Feb–Aug",
    programs: "Engineering, Law, Education",
    english: "IELTS 5.5–6.5",
    link: "https://www.ucv.ro/",
  },
  {
    name: "University of Pitești",
    intake: "Sep intake: Feb–Aug",
    programs: "Engineering, Sports Science, Business",
    english: "IELTS 5.5–6.5",
    link: "https://upit.ro/",
  },
  {
    name: "Romanian-American University (Private)",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, Law, IT, Tourism",
    english: "IELTS 5.5–6.5 / MOI",
    link: "https://www.rau.ro/",
  },
  {
    name: "Titu Maiorescu University (Private)",
    intake: "Sep intake: Feb–Aug",
    programs: "Business, Law, Psychology",
    english: "IELTS 5.5–6.5",
    link: "https://www.tmu.edu.ro/",
  },
  {
    name: "Danubius University (Galați) (Private)",
    intake: "Sep intake: Feb–Aug",
    programs: "International Law, Comm, IT",
    english: "IELTS 5.5–6.5",
    link: "https://danubius.ro/",
  },
];

const StvRomania = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-red-700 text-center mb-6">
        Romania Student Visa - Universities
      </h1>
      <p className="text-center text-red-600 mb-12">
        Major Romanian universities & private institutions with intake, programs, and English requirements for international students.
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
            {romaniaUniversities.map((uni) => (
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

export default StvRomania;
