import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

export function AdminTransactions() {
  const { isAuthenticated, feedbacks, addFeedback, updateFeedback, deleteFeedback } = useApp();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 5,
    comment: '',
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
    
    if (!formData.clientName || !formData.service || !formData.comment) {
      toast.error('Please fill in all required fields');
      return;
    }

    addFeedback(formData);
    toast.success('Client feedback added successfully');
    setFormData({ clientName: '', service: '', rating: 5, comment: '', image: '' });
    setIsAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.service || !formData.comment) {
      toast.error('Please fill in all required fields');
      return;
    }

    updateFeedback(editingFeedback.id, formData);
    toast.success('Feedback updated successfully');
    setFormData({ clientName: '', service: '', rating: 5, comment: '', image: '' });
    setEditingFeedback(null);
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
      toast.success('Feedback deleted successfully');
    }
  };

  const openEdit = (feedback: any) => {
    setEditingFeedback(feedback);
    setFormData({
      clientName: feedback.clientName,
      service: feedback.service,
      rating: feedback.rating,
      comment: feedback.comment,
      image: feedback.image || ''
    });
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Client Transactions & Feedbacks
          </h1>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                <Plus className="mr-2 w-4 h-4" />
                Add Feedback
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#00FFFF' }}>Add Client Feedback</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label htmlFor="add-client" style={{ color: '#FFFFFF' }}>Client Name *</Label>
                  <Input
                    id="add-client"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Enter client name"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-service" style={{ color: '#FFFFFF' }}>Service *</Label>
                  <Input
                    id="add-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="Service provided"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-rating" style={{ color: '#FFFFFF' }}>Rating *</Label>
                  <select
                    id="add-rating"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-md border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="add-comment" style={{ color: '#FFFFFF' }}>Comment *</Label>
                  <Textarea
                    id="add-comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Client's feedback"
                    rows={4}
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-image" style={{ color: '#FFFFFF' }}>Payment Proof Image (Optional)</Label>
                  <Input
                    id="add-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/proof.jpg"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  />
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                  Add Feedback
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {feedbacks.length === 0 ? (
          <Card className="p-12 text-center border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              No client feedbacks yet
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <Card
                key={feedback.id}
                className="p-6 border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                      >
                        {feedback.clientName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: '#00FFFF' }}>
                          {feedback.clientName}
                        </h3>
                        <p className="text-sm" style={{ color: '#FFFFFF' }}>
                          {feedback.service}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => openEdit(feedback)}
                      style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(feedback.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#00FFFF' }} />
                  ))}
                </div>

                <p className="mb-3 italic" style={{ color: '#FFFFFF' }}>
                  "{feedback.comment}"
                </p>

                {feedback.image && (
                  <div className="mt-4">
                    <p className="text-sm mb-2" style={{ color: '#00FFFF' }}>Payment Proof:</p>
                    <img
                      src={feedback.image}
                      alt="Transaction proof"
                      className="w-full max-w-md h-48 object-cover rounded-lg border-2"
                      style={{ borderColor: '#147884' }}
                    />
                  </div>
                )}

                <p className="text-sm mt-3 opacity-75" style={{ color: '#FFFFFF' }}>
                  {new Date(feedback.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#00FFFF' }}>Edit Feedback</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-client" style={{ color: '#FFFFFF' }}>Client Name *</Label>
                <Input
                  id="edit-client"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-service" style={{ color: '#FFFFFF' }}>Service *</Label>
                <Input
                  id="edit-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-rating" style={{ color: '#FFFFFF' }}>Rating *</Label>
                <select
                  id="edit-rating"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-md border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <Label htmlFor="edit-comment" style={{ color: '#FFFFFF' }}>Comment *</Label>
                <Textarea
                  id="edit-comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-image" style={{ color: '#FFFFFF' }}>Payment Proof Image (Optional)</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                />
              </div>

              <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                Update Feedback
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
