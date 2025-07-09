import { Table, TableCaption } from "@/components/ui/table"
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useSelector, } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
    const navigate = useNavigate();
    useGetAllCompanies();
    const companies = useSelector((store: any) => store.company.companies);
    const searchCompanyByName = useSelector((store: any) => store.company.searchCompanyByName);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);

    useEffect(() => {
        if (searchCompanyByName) {
            const filtered = companies.filter((company: any) =>
                company.name.toLowerCase().includes(searchCompanyByName.toLowerCase())
            );
            setFilteredCompanies(filtered);
        } else {
            setFilteredCompanies(companies);
        }
    }, [searchCompanyByName, companies]);

    if (!filteredCompanies || filteredCompanies.length === 0) {
        return <div className="text-center py-4">No companies found</div>;
    }

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <Table className="w-full text-sm">
                <TableCaption className="text-sm text-gray-500 py-2">
                    Recent Registered Companies
                </TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="px-4 py-3 text-gray-700">Logo</TableHead>
                        <TableHead className="text-gray-700">Company Name</TableHead>
                        <TableHead className="text-gray-700">Date</TableHead>
                        <TableHead className="text-gray-700">Location</TableHead>
                        <TableHead className="text-gray-700 text-right pr-4">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredCompanies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                No companies found matching "<span className="font-semibold">{searchCompanyByName}</span>"
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredCompanies.map((company: any) => (
                            <TableRow
                                key={company._id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <TableCell className="px-4 py-2">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                        <AvatarFallback className="bg-gray-200 text-gray-600">
                                            {company.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">{company.name}</TableCell>
                                <TableCell className="text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-gray-600">{company.location}</TableCell>
                                <TableCell className="text-right pr-4">
                                    <button
                                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                                        className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-800 transition cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable
