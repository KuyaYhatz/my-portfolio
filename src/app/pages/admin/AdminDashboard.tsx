import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  Mail, 
  Image as ImageIcon, 
  FileText, 
  Briefcase,
  MessageSquare,
  TrendingUp,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import { useEffect } from 'react';

export function AdminDashboard() {
  const { isAuthenticated, inquiries, services, feedbacks, portfolioImages } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const stats = [
    {
      title: 'Total Inquiries',
      value: inquiries.length,
      icon: Mail,
      color: '#00FFFF',
      link: '/admin/inquiries'
    },
    {
      title: 'Active Services',
      value: services.length,
      icon: Briefcase,
      color: '#147884',
      link: '/admin/services'
    },
    {
      title: 'Client Feedbacks',
      value: feedbacks.length,
      icon: MessageSquare,
      color: '#00FFFF',
      link: '/admin/transactions'
    },
    {
      title: 'Portfolio Images',
      value: portfolioImages.length,
      icon: ImageIcon,
      color: '#147884',
      link: '/admin/portfolio'
    }
  ];

  // Inquiries by status
  const inquiryStatusData = [
    { name: 'Pending', value: inquiries.filter(i => i.status === 'pending').length },
    { name: 'In Progress', value: inquiries.filter(i => i.status === 'in-progress').length },
    { name: 'Completed', value: inquiries.filter(i => i.status === 'completed').length }
  ];

  // Services demand
  const servicesDemandData = services.map(service => ({
    name: service.title.split(' ')[0],
    inquiries: inquiries.filter(i => i.service === service.title).length
  }));

  const COLORS = ['#00FFFF', '#147884', '#FFFFFF'];

  const downloadReport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Portfolio Analytics Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('Summary Statistics', 20, 50);
    
    doc.setFontSize(10);
    let y = 60;
    stats.forEach(stat => {
      doc.text(`${stat.title}: ${stat.value}`, 30, y);
      y += 10;
    });
    
    doc.text('Inquiry Status Breakdown', 20, y + 10);
    y += 20;
    inquiryStatusData.forEach(item => {
      doc.text(`${item.name}: ${item.value}`, 30, y);
      y += 10;
    });
    
    doc.save('portfolio_report.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#FFFFFF' }}>
              Overview of your portfolio analytics
            </p>
          </div>
          <Button
            onClick={downloadReport}
            style={{ backgroundColor: '#00FFFF', color: '#000000' }}
          >
            <Download className="mr-2 w-4 h-4" />
            Download Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 border-2 cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              onClick={() => navigate(stat.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: stat.color === '#00FFFF' ? '#147884' : '#00FFFF' }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-5 h-5" style={{ color: '#00FFFF' }} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#00FFFF' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: '#FFFFFF' }}>
                {stat.title}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inquiries Status */}
          <Card className="p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#00FFFF' }}>
              Inquiry Status Distribution
            </h3>
            {inquiries.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={inquiryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inquiryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                No inquiry data available
              </div>
            )}
          </Card>

          {/* Services Demand */}
          <Card className="p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#00FFFF' }}>
              Service Demand
            </h3>
            {inquiries.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={servicesDemandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#147884" />
                  <XAxis dataKey="name" stroke="#FFFFFF" />
                  <YAxis stroke="#FFFFFF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000000', borderColor: '#147884' }}
                    labelStyle={{ color: '#00FFFF' }}
                  />
                  <Bar dataKey="inquiries" fill="#00FFFF" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                No inquiry data available
              </div>
            )}
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Recent Inquiries
          </h3>
          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.slice(-5).reverse().map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-3 rounded border"
                  style={{ borderColor: '#147884' }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: '#00FFFF' }}>
                      {inquiry.name}
                    </p>
                    <p className="text-sm" style={{ color: '#FFFFFF' }}>
                      {inquiry.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: inquiry.status === 'completed' ? '#00FFFF' : '#147884',
                        color: inquiry.status === 'completed' ? '#000000' : '#FFFFFF'
                      }}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#FFFFFF' }}>No inquiries yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}
