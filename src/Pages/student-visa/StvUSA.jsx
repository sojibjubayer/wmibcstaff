import React from "react";

const usaUniversities = [
  {
    name: "Harvard University",
    intake: "Fall (Aug/Sep); Applications Sep–Jan",
    programs: "Undergrad, Graduate, PhD across Arts, Sciences, Business, Law",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://www.harvard.edu/admissions-aid",
  },
  {
    name: "Massachusetts Institute of Technology (MIT)",
    intake: "Fall (Sep); Applications Sep–Jan",
    programs: "Engineering, Computer Science, Sciences, Management",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://mitadmissions.org/",
  },
  {
    name: "Stanford University",
    intake: "Fall (Sep); Applications Sep–Jan",
    programs: "Engineering, Business, Arts, Sciences, Medicine",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://admission.stanford.edu/",
  },
  {
    name: "University of California, Berkeley",
    intake: "Fall (Aug/Sep); Applications Nov–Nov (prior year)",
    programs: "Engineering, Business, Arts, Sciences",
    english: "IELTS 6.5–7.0 / TOEFL 90+",
    link: "https://admissions.berkeley.edu/",
  },
  {
    name: "Columbia University",
    intake: "Fall (Aug/Sep); Applications Sep–Jan",
    programs: "Arts, Sciences, Business, Engineering, Law",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://undergrad.admissions.columbia.edu/",
  },
  {
    name: "University of California, Los Angeles (UCLA)",
    intake: "Fall (Sep); Applications Nov–Nov (prior year)",
    programs: "Engineering, Sciences, Arts, Business",
    english: "IELTS 6.5–7.0 / TOEFL 90+",
    link: "https://www.admission.ucla.edu/",
  },
  {
    name: "New York University (NYU)",
    intake: "Fall (Aug/Sep); Applications Nov–Jan",
    programs: "Business, Arts, Sciences, Law",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://www.nyu.edu/admissions.html",
  },
  {
    name: "University of Southern California (USC)",
    intake: "Fall (Aug/Sep); Applications Oct–Jan",
    programs: "Engineering, Business, Arts, Sciences",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://admission.usc.edu/",
  },
  {
    name: "University of Michigan, Ann Arbor",
    intake: "Fall (Sep); Applications Aug–Feb",
    programs: "Engineering, Business, Arts, Sciences",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://admissions.umich.edu/",
  },
  {
    name: "University of Illinois Urbana-Champaign",
    intake: "Fall (Aug/Sep); Applications Aug–Jan",
    programs: "Engineering, Computer Science, Business",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://admissions.illinois.edu/",
  },
  {
    name: "Carnegie Mellon University",
    intake: "Fall (Aug/Sep); Applications Sep–Jan",
    programs: "Engineering, Computer Science, Business, Arts",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://www.cmu.edu/admission/",
  },
  {
    name: "University of Texas at Austin",
    intake: "Fall (Aug/Sep); Applications Aug–Dec",
    programs: "Engineering, Business, Sciences, Arts",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://admissions.utexas.edu/",
  },
  {
    name: "Boston University",
    intake: "Fall (Aug/Sep); Applications Oct–Jan",
    programs: "Business, Arts, Sciences, Engineering, Health",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://www.bu.edu/admissions/",
  },
  {
    name: "University of Wisconsin-Madison",
    intake: "Fall (Aug/Sep); Applications Aug–Feb",
    programs: "Engineering, Business, Sciences, Arts",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://www.admissions.wisc.edu/",
  },
  {
    name: "University of Pennsylvania",
    intake: "Fall (Aug/Sep); Applications Sep–Jan",
    programs: "Business, Arts, Sciences, Law, Medicine",
    english: "IELTS 7.0+ / TOEFL 100+",
    link: "https://www.admissions.upenn.edu/",
  },
  {
    name: "University of Florida",
    intake: "Fall (Aug/Sep); Applications Aug–May",
    programs: "Engineering, Business, Arts, Sciences",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://www.admissions.ufl.edu/",
  },
  {
    name: "Georgia Institute of Technology",
    intake: "Fall (Aug/Sep); Applications Sep–Jan",
    programs: "Engineering, Computer Science, Business",
    english: "IELTS 7.0 / TOEFL 100+",
    link: "https://admission.gatech.edu/",
  },
  {
    name: "University of Washington, Seattle",
    intake: "Fall (Sep); Applications Aug–Jan",
    programs: "Engineering, Business, Sciences, Arts",
    english: "IELTS 6.5+ / TOEFL 92+",
    link: "https://www.washington.edu/admissions/",
  },
  {
    name: "Purdue University",
    intake: "Fall (Aug/Sep); Applications Aug–Jan",
    programs: "Engineering, Business, Sciences, IT",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://www.purdue.edu/admissions/",
  },
  {
    name: "University of Minnesota Twin Cities",
    intake: "Fall (Aug/Sep); Applications Aug–Jan",
    programs: "Engineering, Business, Arts, Sciences",
    english: "IELTS 6.5+ / TOEFL 90+",
    link: "https://admissions.tc.umn.edu/",
  },
];

const StvUSA = () => {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-red-700 text-center mb-6">
        USA Student Visa - Popular Universities for Bangladeshi Students
      </h1>
      <p className="text-center text-red-600 mb-12">
        Major U.S. universities with intake, programs, and English requirements for Bangladeshi international students.
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
            {usaUniversities.map((uni) => (
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
                    className="text-red-600 hover:underline"
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

export default StvUSA; 
