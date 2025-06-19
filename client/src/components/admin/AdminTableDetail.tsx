import { Table, TableCaption } from "@/components/ui/table"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: string;
}

function AdminTableDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);

  // Mock data for demonstration - replace with actual data fetching
  const mockAdmins: Admin[] = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Super Admin",
      lastLogin: "2024-03-20",
      status: "Active"
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      lastLogin: "2024-03-19",
      status: "Active"
    }
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockAdmins.filter((admin) =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins(mockAdmins);
    }
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-sm">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search admin by name or email"
            className="w-full"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            Admin Management
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No admins found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                  <TableCell>{admin.status}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/admin/edit/${admin._id}`)}
                      className="text-primary hover:text-primary/80 cursor-pointer"
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
    </div>
  )
}

export default AdminTableDetail 