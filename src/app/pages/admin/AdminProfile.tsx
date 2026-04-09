import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminProfile() {
  const { isAuthenticated, profile, updateProfile } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    if (!formData.name || !formData.profession || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    updateProfile(formData);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#00FFFF' }}>
            Edit Profile
          </h1>
          <Button onClick={handleSave} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
            <Save className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <Card className="p-6 border-2 md:col-span-1" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#00FFFF' }}>
              Profile Picture
            </h3>
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-full aspect-square object-cover rounded-lg border-4 mb-4"
              style={{ borderColor: '#00FFFF' }}
            />
            <Label htmlFor="profilePicture" style={{ color: '#FFFFFF' }}>Picture URL</Label>
            <Input
              id="profilePicture"
              value={formData.profilePicture}
              onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
              placeholder="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/631448422_3342882395863214_7926838244559852201_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeG7HH4ILd_LHp1mPQR08RVYDo8EwBuzGCoOjwTAG7MYKv4RWwEYgpokvaEx39eEvBE88eGPz3nPJzJe2waHKu_M&_nc_ohc=O94gi4R_fkoQ7kNvwFyEJYd&_nc_oc=Adq5zkx7QsaJq0_AgXrL63EoK2u2bxk4o6luTWEcTjEXLXUW_SSeGNd407OfLJ9474c&_nc_zt=23&_nc_ht=scontent.fmnl9-2.fna&_nc_gid=T9i-tgihhO6gSN5R3FxKxA&_nc_ss=7a3a8&oh=00_Af2G7PGE0tYF5e1Nrr4n8cyOY2Qxbu2XdIIFI_vIz-5soA&oe=69DD555F"
              className="mt-2 border-2"
              style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
            />
          </Card>

          {/* Profile Information */}
          <Card className="p-6 border-2 md:col-span-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#00FFFF' }}>
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" style={{ color: '#FFFFFF' }}>Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="profession" style={{ color: '#FFFFFF' }}>Profession *</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder="e.g., Web Developer (Front-End Developer)"
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" style={{ color: '#FFFFFF' }}>Age</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Your age"
                    className="mt-1 border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  />
                </div>

                <div>
                  <Label htmlFor="address" style={{ color: '#FFFFFF' }}>Location</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="City, Country"
                    className="mt-1 border-2"
                    style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" style={{ color: '#FFFFFF' }}>Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" style={{ color: '#FFFFFF' }}>Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+63 912 345 6789"
                  className="mt-1 border-2"
                  style={{ backgroundColor: '#000000', borderColor: '#147884', color: '#FFFFFF' }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setFormData(profile)}
            style={{ borderColor: '#147884', color: '#FFFFFF' }}
          >
            Reset
          </Button>
          <Button onClick={handleSave} style={{ backgroundColor: '#00FFFF', color: '#000000' }}>
            <Save className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
