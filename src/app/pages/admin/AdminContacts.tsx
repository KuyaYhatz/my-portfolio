import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminContacts() {
  const { isAuthenticated, contacts, addContact, updateContact, deleteContact } = useApp();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    icon: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const iconOptions = ['Mail', 'Phone', 'Linkedin', 'Github', 'Twitter', 'Facebook', 'Instagram', 'Globe'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.value || !formData.icon) {
      toast.error('Please fill in all fields');
      return;
    }

    addContact(formData);
    toast.success('Contact added successfully');
    setFormData({ type: '', value: '', icon: '' });
    setIsAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.value || !formData.icon) {
      toast.error('Please fill in all fields');
      return;
    }

    updateContact(editingContact.id, formData);
    toast.success('Contact updated successfully');
    setFormData({ type: '', value: '', icon: '' });
    setEditingContact(null);
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
      toast.success('Contact deleted successfully');
    }
  };

  const openEdit = (contact: any) => {
    setEditingContact(contact);
    setFormData({
      type: contact.type,
      value: contact.value,
      icon: contact.icon
    });
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Manage Contact Information
          </h1>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                <Plus className="mr-2 w-4 h-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#00FFFF' }}>Add New Contact</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label htmlFor="add-type" style={{ color: '#FFFFFF' }}>Contact Type</Label>
                  <Input
                    id="add-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g., Email, Phone, LinkedIn"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-value" style={{ color: '#FFFFFF' }}>Value</Label>
                  <Input
                    id="add-value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="e.g., email@example.com, +1234567890"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-icon" style={{ color: '#FFFFFF' }}>Icon</Label>
                  <select
                    id="add-icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  >
                    <option value="">Select an icon</option>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                  Add Contact
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className="p-6 border-2"
              style={{ backgroundColor: '#000000', borderColor: '#147884' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                  >
                    {contact.icon.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: '#00FFFF' }}>
                      {contact.type}
                    </h3>
                    <p style={{ color: '#FFFFFF' }}>{contact.value}</p>
                    <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>
                      Icon: {contact.icon}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => openEdit(contact)}
                    style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#00FFFF' }}>Edit Contact</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-type" style={{ color: '#FFFFFF' }}>Contact Type</Label>
                <Input
                  id="edit-type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-value" style={{ color: '#FFFFFF' }}>Value</Label>
                <Input
                  id="edit-value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-icon" style={{ color: '#FFFFFF' }}>Icon</Label>
                <select
                  id="edit-icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                Update Contact
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
