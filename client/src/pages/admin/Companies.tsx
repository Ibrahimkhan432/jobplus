import CompaniesTable from "@/components/admin/CompaniesTable"
import Navbar from "@/components/global/Navbar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Companies() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 cursor-pointer ">
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies
