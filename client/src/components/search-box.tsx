"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "../../redux/jobSlice"

export default function SearchBox() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", { query, location, category })
    dispatch(setSearchedQuery(query));
    navigate("/browser")
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 ">
        <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-lg">
          <Search className="h-5 w-5 text-blue-400 mr-2" />
          <Input
            type="text"
            placeholder="Job title, company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus:bg-blue-100 focus-visible:ring-offset-0 text-base"
          />
        </div>

        <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-400 mr-2" />
          <Input
            type="text"
            placeholder="City or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-blue-100 text-base"
          />
        </div>

        <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-lg ">
          <Briefcase className="h-5 w-5 text-blue-400 mr-2" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-blue-100 text-base text-gray-600 outline-none"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>

        <Button type="submit" className="bgMain-gradient hover:bg-blue-700 text-white px-8 py-2 h-auto cursor-pointer">
          Search
        </Button>
      </div>
    </form>
  )
}
