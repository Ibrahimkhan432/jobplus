import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Database,
  Layers,
  PenTool,
  Smartphone,
  Settings,
  BarChart,
  Target,
  CheckCircle,
  Shield,
  Cloud,
  Link as LinkIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
interface Category {
  id: string
  name: string
  icon: React.ReactNode
  count: number
}


export default function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const categories: Category[] = [
    { id: "frontend", name: "Frontend Developer", icon: <Code className="h-6 w-6" />, count: 842 },
    { id: "fullstack", name: "Full Stack Developer", icon: <Layers className="h-6 w-6" />, count: 765 },
    { id: "backend", name: "Backend Developer", icon: <Database className="h-6 w-6" />, count: 693 },
    { id: "ui-ux", name: "UI/UX Designer", icon: <Palette className="h-6 w-6" />, count: 528 },
    { id: "graphic", name: "Graphic Designer", icon: <PenTool className="h-6 w-6" />, count: 476 },
    { id: "mobile", name: "Mobile Developer", icon: <Smartphone className="h-6 w-6" />, count: 412 },
    { id: "devops", name: "DevOps Engineer", icon: <Settings className="h-6 w-6" />, count: 387 },
    { id: "data", name: "Data Scientist", icon: <BarChart className="h-6 w-6" />, count: 342 },
    { id: "product", name: "Product Manager", icon: <Target className="h-6 w-6" />, count: 298 },
    { id: "qa", name: "QA Engineer", icon: <CheckCircle className="h-6 w-6" />, count: 276 },
    { id: "security", name: "Security Engineer", icon: <Shield className="h-6 w-6" />, count: 245 },
    { id: "cloud", name: "Cloud Architect", icon: <Cloud className="h-6 w-6" />, count: 213 },
    { id: "blockchain", name: "Blockchain Developer", icon: <LinkIcon className="h-6 w-6" />, count: 187 },
  ]

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      // Initial check
      checkScroll()
      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }



  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 mt-8 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Browse Categories</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full bg-white/20 text-white border-white/40 hover:bg-white/30 ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full bg-white/20 text-white border-white/40 hover:bg-white/30 ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory">
        {categories.map((category) => (
          <Link key={category.id} to={`/jobs?category=${category.id}`} className="flex-shrink-0 snap-start">
            <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-xl p-2 w-[100px] md:w-[200px] flex flex-col items-center text-center border border-white/30 ">
              <div className="bg-white/20 p-2 text-white rounded-full mb-3">{category.icon}</div>
              <h3 className="font-medium text-white mb-1">{category.name}</h3>
              <p className="text-sm text-blue-100">{category.count} jobs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
