import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminRules() {
  const { isAuthenticated, rulesRegulations, updateRulesRegulations } = useApp();
  const navigate = useNavigate();
  const [content, setContent] = useState(rulesRegulations);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setContent(rulesRegulations);
  }, [rulesRegulations]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    updateRulesRegulations(content);
    toast.success('Rules & Regulations updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Rules & Regulations
          </h1>
          <Button onClick={handleSave} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
            <Save className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <div className="mb-4">
            <p style={{ color: '#FFFFFF' }}>
              Define the rules and regulations for your services. This helps set clear expectations with your clients.
            </p>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your service rules and regulations here...&#10;&#10;Consider including:&#10;- Service Scope&#10;- Client Responsibilities&#10;- Communication Guidelines&#10;- Payment Rules&#10;- Revision Limits&#10;- File Delivery Format&#10;- Project Timeline Expectations&#10;- Refund Policy&#10;- Dispute Resolution"
            rows={20}
            className="border-2 font-mono"
            style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
          />

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setContent(rulesRegulations)}
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
