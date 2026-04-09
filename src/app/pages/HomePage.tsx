import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

export function HomePage() {
  const { profile, services, feedbacks } = useApp();

  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={profile.profilePicture}
            alt={profile.name}
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4"
            style={{ borderColor: '#00FFFF' }}
          />
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            {profile.name}
          </h1>
          <p className="text-2xl mb-6" style={{ color: '#FFFFFF' }}>
            {profile.profession}
          </p>
          <p className="text-lg mb-8 opacity-90" style={{ color: '#FFFFFF' }}>
            Crafting digital experiences with passion and precision. 
            Let's bring your ideas to life with modern web solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/services">
              <Button
                size="lg"
                style={{ backgroundColor: '#00FFFF', color: '#000000' }}
                className="hover:opacity-90"
              >
                View Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: '#00FFFF', color: '#00FFFF' }}
                className="hover:bg-opacity-10"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#00FFFF' }}>
            What I Offer
          </h2>
          <p style={{ color: '#FFFFFF' }}>
            Professional services tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-6 border-2 transition-transform hover:scale-105"
              style={{ 
                backgroundColor: '#000000',
                borderColor: '#147884'
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2" style={{ color: '#00FFFF' }}>
                {service.title}
              </h3>
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Feedbacks */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#00FFFF' }}>
            Client Testimonials
          </h2>
          <p style={{ color: '#FFFFFF' }}>
            What my clients say about my work
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {feedbacks.slice(0, 2).map((feedback) => (
            <Card
              key={feedback.id}
              className="p-6 border-2"
              style={{ 
                backgroundColor: '#000000',
                borderColor: '#147884'
              }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#00FFFF' }} />
                ))}
              </div>
              <p className="mb-4 italic" style={{ color: '#FFFFFF' }}>
                "{feedback.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#147884' }}>
                  <span style={{ color: '#00FFFF' }}>{feedback.clientName[0]}</span>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#00FFFF' }}>
                    {feedback.clientName}
                  </p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>
                    {feedback.service}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/feedbacks">
            <Button
              variant="outline"
              style={{ borderColor: '#00FFFF', color: '#00FFFF' }}
            >
              View All Feedbacks
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card
          className="p-12 text-center border-2"
          style={{ 
            backgroundColor: '#147884',
            borderColor: '#00FFFF'
          }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-lg mb-6" style={{ color: '#FFFFFF' }}>
            Let's collaborate and create something amazing together
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              style={{ backgroundColor: '#00FFFF', color: '#000000' }}
              className="hover:opacity-90"
            >
              Contact Me Now
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
