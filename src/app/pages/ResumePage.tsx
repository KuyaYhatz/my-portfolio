import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, Mail, Phone, MapPin } from 'lucide-react';

export function ResumePage() {
  const { profile, resume } = useApp();

  const handleDownload = () => {
    // Create a simple text version for download
    const content = `
${profile.name}
${profile.profession}

Contact Information:
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.address}

${resume || 'Resume content not yet added.'}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#00FFFF' }}>
            Resume
          </h1>
          <Button
            onClick={handleDownload}
            style={{ backgroundColor: '#00FFFF', color: '#000000' }}
          >
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </Button>
        </div>

        <Card className="p-8 border-2 mb-8" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          {/* Header */}
          <div className="text-center mb-8 pb-8 border-b" style={{ borderColor: '#147884' }}>
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4"
              style={{ borderColor: '#00FFFF' }}
            />
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#00FFFF' }}>
              {profile.name}
            </h2>
            <p className="text-xl mb-4" style={{ color: '#FFFFFF' }}>
              {profile.profession}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                <Mail className="w-4 h-4" style={{ color: '#00FFFF' }} />
                {profile.email}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                <Phone className="w-4 h-4" style={{ color: '#00FFFF' }} />
                {profile.phone}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                <MapPin className="w-4 h-4" style={{ color: '#00FFFF' }} />
                {profile.address}
              </div>
            </div>
          </div>

          {/* Resume Content */}
          {resume ? (
            <div className="prose prose-invert max-w-none">
              <div 
                style={{ color: '#FFFFFF', whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: resume.replace(/\n/g, '<br/>') }}
              />
            </div>
          ) : (
            <div>
              {/* Professional Summary */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                  Professional Summary
                </h3>
                <p style={{ color: '#FFFFFF' }}>
                  Experienced {profile.profession} with a passion for creating modern, 
                  responsive web applications. Skilled in various technologies and frameworks 
                  with a strong focus on user experience and clean code architecture.
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                  Technical Skills
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'React & TypeScript',
                    'HTML5, CSS3, JavaScript',
                    'Tailwind CSS',
                    'Responsive Web Design',
                    'UI/UX Design',
                    'API Integration',
                    'Git & Version Control',
                    'Adobe Creative Suite',
                    'Video Editing',
                    'Content Writing & Research'
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                      style={{ color: '#FFFFFF' }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#00FFFF' }}
                      />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg" style={{ color: '#00FFFF' }}>
                      Freelance Web Developer & Digital Creator
                    </h4>
                    <p className="text-sm mb-2" style={{ color: '#FFFFFF' }}>
                      Self-Employed | 2020 - Present
                    </p>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#FFFFFF' }}>
                      <li>Developed responsive web applications for various clients</li>
                      <li>Provided comprehensive digital services including design and video editing</li>
                      <li>Maintained 100% client satisfaction rate</li>
                      <li>Managed multiple projects simultaneously while meeting tight deadlines</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                  Education & Certifications
                </h3>
                <div>
                  <h4 className="font-bold" style={{ color: '#00FFFF' }}>
                    Web Development & Design
                  </h4>
                  <p style={{ color: '#FFFFFF' }}>
                    Various online courses and certifications in modern web technologies
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
