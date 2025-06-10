import { Table, TableCaption } from "@/components/ui/table"
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "../ui/avatar"

function CompaniesTable() {
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
                        <TableHead>Industry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D" />
                            </Avatar>
                        </TableCell>
                        <TableCell>Example Company</TableCell>
                        <TableCell>11/6/2025</TableCell>
                        <TableCell>Technology</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>
                            <button className="text-primary hover:text-primary/80">Edit</button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
