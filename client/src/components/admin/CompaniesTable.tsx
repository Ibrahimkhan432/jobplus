import { Table, TableCaption } from "@/components/ui/table"
import {
    TableBody,
    TableCell,
    TableHead,      
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "../ui/avatar"
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
        <div className="rounded-md border">
            <Table>
                <TableCaption>
                    Recent Registered Companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                                No companies found matching "{searchCompanyByName}"
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredCompanies.map((company: any) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{company.location}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                                        className="cursor-pointer text-primary hover:text-primary/80">Edit</button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
