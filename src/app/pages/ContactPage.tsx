import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, Linkedin, Github, Send, Upload } from 'lucide-react';

export function ContactPage() {
  const { contacts, addInquiry, services } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    description: '',
    document: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.service || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    addInquiry({
      name: formData.name,
      service: formData.service,
      description: formData.description,
      document: formData.document?.name
    });

    toast.success('Inquiry sent successfully! I will get back to you soon.');
    setFormData({ name: '', service: '', description: '', document: null });
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Mail,
      Phone,
      Linkedin,
      Github
    };
    const Icon = icons[iconName] || Mail;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Get In Touch
          </h1>
          <p className="text-lg" style={{ color: '#FFFFFF' }}>
            Have a project in mind? Let's discuss how I can help you achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#00FFFF' }}>
              Send an Inquiry
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" style={{ color: '#FFFFFF' }}>
                  Your Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="service" style={{ color: '#FFFFFF' }}>
                  Service Required *
                </Label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-md border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="description" style={{ color: '#FFFFFF' }}>
                  Project Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project requirements..."
                  rows={5}
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="document" style={{ color: '#FFFFFF' }}>
                  Attach Document (Optional)
                </Label>
                <div className="mt-1">
                  <label
                    htmlFor="document"
                    className="flex items-center gap-2 px-4 py-2 border-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ borderColor: '#147884', color: '#00FFFF' }}
                  >
                    <Upload className="w-4 h-4" />
                    {formData.document ? formData.document.name : 'Choose file (PDF/Word)'}
                  </label>
                  <input
                    id="document"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, document: e.target.files?.[0] || null })}
                    className="hidden"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: '#00FFFF', color: '#000000' }}
              >
                <Send className="mr-2 w-4 h-4" />
                Send Inquiry
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#00FFFF' }}>
                Contact Information
              </h2>
              
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#147884' }}
                    >
                      <span style={{ color: '#00FFFF' }}>
                        {getIconComponent(contact.icon)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>
                        {contact.type}
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-2" style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                Response Time
              </h3>
              <p style={{ color: '#FFFFFF' }}>
                I typically respond to inquiries within 24-48 hours. 
                For urgent requests, please mention it in your message.
              </p>
            </Card>

            <Card className="p-8 border-2" style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                Available Hours
              </h3>
              <p style={{ color: '#FFFFFF' }}>
                Monday - Friday: 9:00 AM - 6:00 PM (PHT)<br />
                Saturday: 10:00 AM - 2:00 PM (PHT)<br />
                Sunday: Closed
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
