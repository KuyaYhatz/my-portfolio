import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Star } from 'lucide-react';

export function FeedbacksPage() {
  const { feedbacks } = useApp();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Client Feedbacks & Testimonials
          </h1>
          <p className="text-lg" style={{ color: '#FFFFFF' }}>
            See what my clients have to say about their experience working with me
          </p>
        </div>

        {feedbacks.length === 0 ? (
          <Card
            className="p-12 text-center border-2"
            style={{ backgroundColor: '#000000', borderColor: '#147884' }}
          >
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              No feedbacks yet. Be the first to work with me!
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <Card
                key={feedback.id}
                className="p-6 border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold"
                    style={{ backgroundColor: '#147884', color: '#00FFFF' }}
                  >
                    {feedback.clientName[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: '#00FFFF' }}>
                          {feedback.clientName}
                        </h3>
                        <p className="text-sm" style={{ color: '#FFFFFF' }}>
                          {feedback.service}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#00FFFF' }} />
                        ))}
                      </div>
                    </div>

                    <p className="mb-3 italic" style={{ color: '#FFFFFF' }}>
                      "{feedback.comment}"
                    </p>

                    {feedback.image && (
                      <img
                        src={feedback.image}
                        alt="Transaction proof"
                        className="w-full max-w-md h-48 object-cover rounded-lg border-2"
                        style={{ borderColor: '#147884' }}
                      />
                    )}

                    <p className="text-sm mt-3 opacity-75" style={{ color: '#FFFFFF' }}>
                      {new Date(feedback.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {feedbacks.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card
              className="p-6 text-center border-2"
              style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#00FFFF' }}>
                {feedbacks.length}
              </div>
              <p style={{ color: '#FFFFFF' }}>Happy Clients</p>
            </Card>

            <Card
              className="p-6 text-center border-2"
              style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#00FFFF' }}>
                {(feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)}
              </div>
              <p style={{ color: '#FFFFFF' }}>Average Rating</p>
            </Card>

            <Card
              className="p-6 text-center border-2"
              style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: '#00FFFF' }}>
                {Math.round((feedbacks.filter(f => f.rating === 5).length / feedbacks.length) * 100)}%
              </div>
              <p style={{ color: '#FFFFFF' }}>5-Star Reviews</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
