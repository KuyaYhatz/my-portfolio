import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export function ServicesPage() {
  const { services } = useApp();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Services & Offerings
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Professional services designed to help you achieve your digital goals. 
            From development to design, I've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border-2 hover:shadow-xl transition-all"
              style={{ backgroundColor: '#000000', borderColor: '#147884' }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
                  {service.title}
                </h3>
                <p className="mb-4" style={{ color: '#FFFFFF' }}>
                  {service.description}
                </p>
                <Link to="/contact">
                  <Button
                    className="w-full"
                    style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                  >
                    Request This Service
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#00FFFF' }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Contact', desc: 'Reach out with your project details' },
              { step: '02', title: 'Discuss', desc: 'We discuss your requirements and goals' },
              { step: '03', title: 'Create', desc: 'I work on bringing your vision to life' },
              { step: '04', title: 'Deliver', desc: 'Receive your completed project' }
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              >
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ color: '#00FFFF' }}
                >
                  {item.step}
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00FFFF' }}>
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: '#FFFFFF' }}>
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card
            className="p-10 border-2"
            style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>
              Ready to Get Started?
            </h3>
            <p className="mb-6" style={{ color: '#FFFFFF' }}>
              Let's discuss your project and make it happen
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                style={{ backgroundColor: '#00FFFF', color: '#000000' }}
              >
                Contact Me Today
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
