import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminServices() {
  const { isAuthenticated, services, addService, updateService, deleteService } = useApp();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.image) {
      toast.error('Please fill in all fields');
      return;
    }

    addService(formData);
    toast.success('Service added successfully');
    setFormData({ title: '', description: '', image: '' });
    setIsAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.image) {
      toast.error('Please fill in all fields');
      return;
    }

    updateService(editingService.id, formData);
    toast.success('Service updated successfully');
    setFormData({ title: '', description: '', image: '' });
    setEditingService(null);
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      toast.success('Service deleted successfully');
    }
  };

  const openEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image
    });
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Manage Services
          </h1>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                <Plus className="mr-2 w-4 h-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#00FFFF' }}>Add New Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label htmlFor="add-title" style={{ color: '#FFFFFF' }}>Service Title</Label>
                  <Input
                    id="add-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Web Development"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-description" style={{ color: '#FFFFFF' }}>Description</Label>
                  <Textarea
                    id="add-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the service..."
                    rows={4}
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-image" style={{ color: '#FFFFFF' }}>Image URL</Label>
                  <Input
                    id="add-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                  Add Service
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border-2"
              style={{ backgroundColor: '#000000', borderColor: '#147884' }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#00FFFF' }}>
                  {service.title}
                </h3>
                <p className="mb-4" style={{ color: '#FFFFFF' }}>
                  {service.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEdit(service)}
                    className="flex-1"
                    style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                  >
                    <Edit className="mr-2 w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(service.id)}
                    variant="destructive"
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
              <DialogTitle style={{ color: '#00FFFF' }}>Edit Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-title" style={{ color: '#FFFFFF' }}>Service Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description" style={{ color: '#FFFFFF' }}>Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-image" style={{ color: '#FFFFFF' }}>Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                Update Service
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
