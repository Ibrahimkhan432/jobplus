import { useState } from "react";

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

interface FilterCardProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
}

function FilterCard({ onFilterChange }: FilterCardProps) {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  const handleRadioClick = (filterType: string, value: string) => {
    // If already selected, remove filter
    const isSelected = selectedFilters[filterType] === value;
    const updatedFilters = { ...selectedFilters };
    if (isSelected) {
      delete updatedFilters[filterType];
    } else {
      updatedFilters[filterType] = value;
    }
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <div className="h-2 w-full bgMain-gradient" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Filter Jobs</h2>
        <hr className="mb-4" />
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">{data.filterType}</h3>
            <div className="flex flex-col gap-2">
              {data.array.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={data.filterType}
                    id={`${data.filterType}-${item}`}
                    checked={selectedFilters[data.filterType] === item}
                    onClick={() => handleRadioClick(data.filterType, item)}
                    readOnly
                    className="cursor-pointer"
                  />
                  <label htmlFor={`${data.filterType}-${item}`} className="text-sm text-gray-700 cursor-pointer">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;