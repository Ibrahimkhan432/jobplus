import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const isApplied = false;

function JobDescription() {
  return (
    <div className="my-10 max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Top Section: Role & Apply Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Frontend Developer</h1>
          <p className="text-sm text-gray-500 mt-1">Location: Karachi, Pakistan</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="text-white font-medium bg-blue-600">Experience: 1-2 Years</Badge>
            <Badge className="text-white font-medium bg-purple-600">PKR 50,000/month</Badge>
            <Badge className="text-white font-medium bg-green-600">Part Time</Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          className={`mt-2 sm:mt-0 bgMain-gradient text-white cursor-pointer font-semibold px-6 ${
            isApplied ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Meta Info */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Total Applications:</span> 24
        </div>
        <div>
          <span className="font-medium">Posted Date:</span> 20 May 2025
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Job Description</h2>
        <hr className="mb-4 border-gray-300" />
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          We are looking for a motivated and creative Frontend Developer to join our team. You will be responsible
          for creating engaging and responsive user interfaces. The ideal candidate should have experience working
          with modern frameworks such as React.js, and a solid understanding of frontend best practices.
        </p>

        <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1 text-sm sm:text-base">
          <li>Collaborate with designers to translate Figma mockups into working UI</li>
          <li>Write clean, maintainable, and efficient code using React and TailwindCSS</li>
          <li>Ensure application responsiveness and performance across devices</li>
          <li>Participate in regular code reviews and agile team activities</li>
          <li>Good understanding of Git and deployment workflows</li>
        </ul>
      </div>
    </div>
  );
}

export default JobDescription;
