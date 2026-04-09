import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminResume() {
  const { isAuthenticated, resume, updateResume } = useApp();
  const navigate = useNavigate();
  const [content, setContent] = useState(resume);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setContent(resume);
  }, [resume]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    updateResume(content);
    toast.success('Resume updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Edit Resume
          </h1>
          <Button onClick={handleSave} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
            <Save className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <div className="mb-4">
            <p style={{ color: '#FFFFFF' }}>
              Edit your resume content below. This will be displayed on your public resume page.
            </p>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your resume content here... You can include:&#10;&#10;- Professional Summary&#10;- Work Experience&#10;- Education&#10;- Skills&#10;- Certifications&#10;- Projects&#10;&#10;Tip: Use line breaks to organize your content clearly."
            rows={20}
            className="border-2 font-mono"
            style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
          />

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setContent(resume)}
              style={{ borderColor: '#147884', color: '#FFFFFF' }}
            >
              Reset
            </Button>
            <Button onClick={handleSave} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
              <Save className="mr-2 w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="mt-6 p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Preview
          </h3>
          <div style={{ color: '#FFFFFF', whiteSpace: 'pre-wrap' }}>
            {content || 'No content yet. Start typing above to see a preview.'}
          </div>
        </Card>
      </div>
    </div>
  );
}
