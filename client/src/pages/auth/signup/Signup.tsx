import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Navbar from "../../../components/global/Navbar"
import { Link } from "react-router-dom"

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "jobseeker",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup submitted:", formData)
  }

  return (
    <div className="min-h-screen flex flex-col bgMain-gradient">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="container max-w-lg mx-auto p-6">
          <Card className="border-gray-200 shadow-2xl rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
              <CardDescription>Join Job Plus to find your dream job</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                  <button type="button" className="absolute right-3 top-9" onClick={togglePassword}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">I am a</Label>
                  <select id="accountType" name="accountType" value={formData.accountType} onChange={handleChange} className="w-full h-10 px-3 rounded-md border bg-background text-sm">
                    <option value="jobseeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                  Create Account
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
