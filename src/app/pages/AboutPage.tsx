import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Mail, Phone, MapPin, Download } from 'lucide-react';

export function AboutPage() {
  const { profile } = useApp();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#00FFFF' }}>
          About Me
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Profile Image */}
          <div>
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="w-full h-96 object-cover rounded-lg border-4"
              style={{ borderColor: '#00FFFF' }}
            />
          </div>

          {/* Profile Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FFFF' }}>
              {profile.name}
            </h2>
            <p className="text-xl mb-6" style={{ color: '#FFFFFF' }}>
              {profile.profession}
            </p>

            <Card className="p-6 mb-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#147884' }}>
                    <Mail className="w-5 h-5" style={{ color: '#00FFFF' }} />
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>Email</p>
                    <p style={{ color: '#FFFFFF' }}>{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#147884' }}>
                    <Phone className="w-5 h-5" style={{ color: '#00FFFF' }} />
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>Phone</p>
                    <p style={{ color: '#FFFFFF' }}>{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#147884' }}>
                    <MapPin className="w-5 h-5" style={{ color: '#00FFFF' }} />
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>Location</p>
                    <p style={{ color: '#FFFFFF' }}>{profile.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#147884' }}>
                    <span className="text-lg" style={{ color: '#00FFFF' }}>👤</span>
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: '#FFFFFF' }}>Age</p>
                    <p style={{ color: '#FFFFFF' }}>{profile.age} years old</p>
                  </div>
                </div>
              </div>
            </Card>

            <Link to="/resume">
              <Button
                className="w-full"
                style={{ backgroundColor: '#00FFFF', color: '#000000' }}
              >
                <Download className="mr-2 w-4 h-4" />
                View Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio Section */}
        <Card className="p-8 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Professional Background
          </h3>
          <div className="space-y-4" style={{ color: '#FFFFFF' }}>
            <p>
              As a passionate {profile.profession}, I specialize in creating modern, 
              responsive, and user-friendly web applications. With years of experience 
              in the industry, I've had the privilege of working on diverse projects 
              that have honed my skills in various technologies and frameworks.
            </p>
            <p>
              My approach to development is centered around understanding client needs 
              and delivering solutions that not only meet but exceed expectations. 
              I believe in writing clean, maintainable code and following best practices 
              to ensure the longevity and scalability of every project.
            </p>
            <p>
              Beyond web development, I offer comprehensive digital services including 
              graphic design, video editing, and document research. This diverse skill 
              set allows me to provide end-to-end solutions for clients, making me a 
              one-stop resource for all your digital needs.
            </p>
          </div>
        </Card>

        {/* Skills Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#00FFFF' }}>
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'React & TypeScript',
              'HTML5 & CSS3',
              'Responsive Design',
              'UI/UX Design',
              'Video Editing',
              'Graphic Design',
              'API Integration',
              'Content Writing',
              'Project Management'
            ].map((skill, index) => (
              <Card
                key={index}
                className="p-4 text-center border-2"
                style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
              >
                <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                  {skill}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
