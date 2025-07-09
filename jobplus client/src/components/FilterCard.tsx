import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Mobile Developer",
      "Data Scientist",
      "Machine Learning Engineer",
      "DevOps Engineer",
      "Cloud Engineer",
      "Cybersecurity Analyst",
      "Network Engineer",
      "Database Administrator",
      "System Administrator",
      "Technical Support Specialist",
      "IT Project Manager",
      "Business Analyst",
      "Product Manager",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-150k", "150k-200k", "200k+"],
  },
];



function FilterCard() {

  const [selectedValue, setSelectedValue] = useState();

  const changeHandler = (value: any) => {
    setSelectedValue(value);
  }

useEffect(() => {
console.log(selectedValue)
}, [selectedValue])
  
  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* Top Gradient */}
      <div className="h-2 w-full bgMain-gradient" />

      {/* Filter Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Filter Jobs</h2>
        <hr className="mb-4" />

        <RadioGroup
        onValueChange={changeHandler}
        value={selectedValue}
        >
          {filterData.map((data, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">
                {data.filterType}
              </h3>
              <div className="flex flex-col gap-2">
                {data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={item}
                      id={`${data.filterType}-${item}`}
                      className="cursor-pointer focus-visible:ring-4 ring-blue-600 focus:bg-blue-600"
                    />
                    <label
                      htmlFor={`${data.filterType}-${item}`}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCard;
