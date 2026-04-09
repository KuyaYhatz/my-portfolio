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

export function AdminFAQ() {
  const { isAuthenticated, faqs, addFAQ, updateFAQ, deleteFAQ } = useApp();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.question || !formData.answer) {
      toast.error('Please fill in all fields');
      return;
    }

    addFAQ(formData);
    toast.success('FAQ added successfully');
    setFormData({ category: '', question: '', answer: '' });
    setIsAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.question || !formData.answer) {
      toast.error('Please fill in all fields');
      return;
    }

    updateFAQ(editingFAQ.id, formData);
    toast.success('FAQ updated successfully');
    setFormData({ category: '', question: '', answer: '' });
    setEditingFAQ(null);
    setIsEditOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      deleteFAQ(id);
      toast.success('FAQ deleted successfully');
    }
  };

  const openEdit = (faq: any) => {
    setEditingFAQ(faq);
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer
    });
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Manage FAQ
          </h1>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                <Plus className="mr-2 w-4 h-4" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#00FFFF' }}>Add New FAQ</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label htmlFor="add-category" style={{ color: '#FFFFFF' }}>Category</Label>
                  <Input
                    id="add-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Developer, Services, Freelance"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-question" style={{ color: '#FFFFFF' }}>Question</Label>
                  <Input
                    id="add-question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Enter the question"
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="add-answer" style={{ color: '#FFFFFF' }}>Answer</Label>
                  <Textarea
                    id="add-answer"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Enter the answer"
                    rows={4}
                    className="border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                  Add FAQ
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* FAQs by Category */}
        <div className="space-y-6">
          {categories.length === 0 ? (
            <Card className="p-12 text-center border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <p className="text-lg" style={{ color: '#FFFFFF' }}>
                No FAQs yet. Add your first one!
              </p>
            </Card>
          ) : (
            categories.map((category) => (
              <Card key={category} className="p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
                <h3 className="text-xl font-bold mb-4 capitalize" style={{ color: '#00FFFF' }}>
                  {category}
                </h3>
                <div className="space-y-4">
                  {faqs.filter(faq => faq.category === category).map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 rounded border"
                      style={{ borderColor: '#147884' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold flex-1 pr-4" style={{ color: '#00FFFF' }}>
                          Q: {faq.question}
                        </h4>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openEdit(faq)}
                            style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(faq.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p style={{ color: '#FFFFFF' }}>A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#00FFFF' }}>Edit FAQ</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label htmlFor="edit-category" style={{ color: '#FFFFFF' }}>Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-question" style={{ color: '#FFFFFF' }}>Question</Label>
                <Input
                  id="edit-question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-answer" style={{ color: '#FFFFFF' }}>Answer</Label>
                <Textarea
                  id="edit-answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                  className="border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <Button type="submit" className="w-full" style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
                Update FAQ
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
