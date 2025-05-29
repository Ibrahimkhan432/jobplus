import Navbar from "./global/Navbar";
import Job from "./Job";

const ransdomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Browser() {
  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto my-10 mt-5">
          <h1 className="text-xl font-bold">Search Results {ransdomJobs.length}</h1>
        <div className="grid lg:grid-cols-3 gap-4 mt-2">
          {ransdomJobs.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
}
export default Browser;
