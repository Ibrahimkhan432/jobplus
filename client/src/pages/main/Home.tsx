import "../../index.css"
import Footer from "../../components/Footer"
import Navbar from "../../components/global/Navbar"
import LatestJobs from "@/components/LatestJobs"
import Hero from "@/components/Hero"

export default function Home() {
  return (
  <div>
    <Navbar/>
    <Hero/>
    <LatestJobs/>
    <Footer/>
  </div>
  )
}