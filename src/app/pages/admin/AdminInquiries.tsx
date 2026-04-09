import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function AdminInquiries() {
  const { isAuthenticated, inquiries, updateInquiryStatus, deleteInquiry } = useApp();
  const navigate = useNavigate();
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleStatusChange = (id: string, status: string) => {
    updateInquiryStatus(id, status);
    toast.success('Inquiry status updated');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      deleteInquiry(id);
      toast.success('Inquiry deleted successfully');
      setSelectedInquiry(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#00FFFF' }}>
          Manage Inquiries
        </h1>

        {inquiries.length === 0 ? (
          <Card className="p-12 text-center border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              No inquiries received yet
            </p>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Inquiries List */}
            <div className="lg:col-span-2">
              <Card className="border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: '#147884' }}>
                      <TableHead style={{ color: '#00FFFF' }}>Name</TableHead>
                      <TableHead style={{ color: '#00FFFF' }}>Service</TableHead>
                      <TableHead style={{ color: '#00FFFF' }}>Date</TableHead>
                      <TableHead style={{ color: '#00FFFF' }}>Status</TableHead>
                      <TableHead style={{ color: '#00FFFF' }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow 
                        key={inquiry.id} 
                        style={{ borderColor: '#147884' }}
                        className="cursor-pointer hover:bg-opacity-5"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <TableCell style={{ color: '#FFFFFF' }}>{inquiry.name}</TableCell>
                        <TableCell style={{ color: '#FFFFFF' }}>{inquiry.service}</TableCell>
                        <TableCell style={{ color: '#FFFFFF' }}>
                          {new Date(inquiry.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <select
                            value={inquiry.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleStatusChange(inquiry.id, e.target.value);
                            }}
                            className="px-2 py-1 rounded border"
                            style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(inquiry.id);
                            }}
                            style={{ color: '#00FFFF' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Inquiry Details */}
            <div>
              <Card className="p-6 border-2 sticky top-4" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#00FFFF' }}>
                  Inquiry Details
                </h3>
                
                {selectedInquiry ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Client Name</p>
                      <p style={{ color: '#FFFFFF' }}>{selectedInquiry.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Service</p>
                      <p style={{ color: '#FFFFFF' }}>{selectedInquiry.service}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Description</p>
                      <p style={{ color: '#FFFFFF' }}>{selectedInquiry.description}</p>
                    </div>
                    
                    {selectedInquiry.document && (
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Document</p>
                        <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: '#147884' }}>
                          <FileText className="w-4 h-4" style={{ color: '#00FFFF' }} />
                          <span className="text-sm" style={{ color: '#FFFFFF' }}>
                            {selectedInquiry.document}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Date Received</p>
                      <p style={{ color: '#FFFFFF' }}>
                        {new Date(selectedInquiry.date).toLocaleString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#00FFFF' }}>Status</p>
                      <span
                        className="px-3 py-1 rounded-full text-sm capitalize"
                        style={{
                          backgroundColor: selectedInquiry.status === 'completed' ? '#00FFFF' : '#147884',
                          color: selectedInquiry.status === 'completed' ? '#000000' : '#FFFFFF'
                        }}
                      >
                        {selectedInquiry.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: '#FFFFFF' }}>
                    Select an inquiry to view details
                  </p>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
