import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminPortfolio() {
  const { isAuthenticated, portfolioImages, addPortfolioImage, deletePortfolioImage } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url || !formData.title || !formData.category) {
      toast.error('Please fill in all fields');
      return;
    }

    addPortfolioImage(formData);
    toast.success('Image added successfully');
    setFormData({ url: '', title: '', category: '' });
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deletePortfolioImage(id);
      toast.success('Image deleted successfully');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Portfolio Gallery Management
          </h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                <Plus className="mr-2 w-4 h-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#00FFFF' }}>Add Portfolio Image</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="url" style={{ color: '#FFFFFF' }}>Image URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title" style={{ color: '#FFFFFF' }}>Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project title"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category" style={{ color: '#FFFFFF' }}>Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web Design, Video, Graphics"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                  Add Image
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {portfolioImages.length === 0 ? (
          <Card className="p-12 text-center border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <p className="text-lg mb-4" style={{ color: '#FFFFFF' }}>
              No portfolio images yet
            </p>
            <Button onClick={() => setIsOpen(true)} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
              <Plus className="mr-2 w-4 h-4" />
              Add Your First Image
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden border-2 group"
                style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              >
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center">
                    <Button
                      onClick={() => handleDelete(image.id)}
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1" style={{ color: '#00FFFF' }}>
                    {image.title}
                  </h3>
                  <p className="text-sm capitalize" style={{ color: '#FFFFFF' }}>
                    {image.category}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
