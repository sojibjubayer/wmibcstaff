import React from "react";

const WorkVisa = () => {
  const countries = [
    "Greece", 
    "Poland", 
    "Portugal", 
    "Bulgaria", 
    "Croatia", 
    "Cyprus", 
    "Serbia", 
    "North Macedonia", 
    "Montenegro", 
  ]; 

  const countryFlagStyles = { 
    Greece: "linear-gradient(to bottom, #0D5EAF 0%, #0D5EAF 50%, white 50%, white 100%)",
    Poland: "linear-gradient(to bottom, white 0%, white 50%, #DC143C 50%, #DC143C 100%)",
    Portugal: "linear-gradient(to right, #006400 0%, #006400 40%, #FF0000 40%, #FF0000 100%)",
    Bulgaria: "linear-gradient(to right, #FFFFFF 0%, #FFFFFF 33%, #00966E 33%, #00966E 66%, #D62612 66%, #D62612 100%)",
    Cyprus: "linear-gradient(to right, #FFFFFF 0%, #FFFFFF 60%, #D57800 60%, #D57800 100%)",
    Croatia: "linear-gradient(to bottom, #FF0000 0%, #FF0000 33%, white 33%, white 66%, #002395 66%, #002395 100%)",
    Serbia: "linear-gradient(to bottom, #FF0000 0%, #FF0000 33%, #002395 33%, #002395 66%, white 66%, white 100%)",
    "North Macedonia": "radial-gradient(circle, #FFD700 20%, #D20000 21%)",
    Montenegro: "linear-gradient(#C8102E, #C8102E)",
    Bosnia: "linear-gradient(to right, #002395 60%, #FCD116 60%, #FCD116 100%)",
  }; 

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-800 mb-10">
        Work Visa Countries
      </h1> 

      <div className="flex flex-wrap justify-center gap-4">
        {countries.map((country, index) => (
          <a
            key={index}
            href={`/work-visa/${country.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative rounded-full border-2 border-white shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300 w-28 h-28 flex items-center justify-center"
            style={{ background: countryFlagStyles[country] }}
          >
            <div className="bg-cyan-200/75 px-3 py-1 rounded-full transition-all duration-300 group-hover:rounded-none group-hover:px-0 group-hover:w-full flex justify-center">
              <span className="text-black font-medium text-sm text-center">
                {country}
              </span>  
            </div>
          </a>
        ))}
      </div> 
    </div>
  );
}; 

export default WorkVisa;
