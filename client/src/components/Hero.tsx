import CategoryCarousel from "./CategoryCarousel";
import SearchBox from "./search-box";
import { Button } from "./ui/button";

function Hero() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image and Integrated Navbar */}
      <section
        className=" bg-cover bg-center h-[700px]"
        style={{
          backgroundImage: "url('/placeholder.svg?height=500&width=2000')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bgMain-gradient"></div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl">
              Connect with top employers and discover opportunities that match
              your skills and career goals
            </p>
            {/* Search Box */}
            <SearchBox />
            <CategoryCarousel/>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                Popular: Web Development
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                UX Design
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                Marketing
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              >
                Remote Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div></div>
      <div></div>
    </div>
  );
}

export default Hero;
