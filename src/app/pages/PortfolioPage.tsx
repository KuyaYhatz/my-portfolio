import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';

export function PortfolioPage() {
  const { portfolioImages } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(portfolioImages.map(img => img.category)))];
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter images based on category
  const filteredImages = selectedCategory === 'all'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Portfolio Gallery
          </h1>
          <p className="text-lg" style={{ color: '#FFFFFF' }}>
            Browse through my recent work and projects
          </p>
        </div>

        {portfolioImages.length === 0 ? (
          <Card
            className="p-12 text-center border-2"
            style={{ backgroundColor: '#000000', borderColor: '#147884' }}
          >
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              No portfolio images available yet. Check back soon!
            </p>
          </Card>
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-2 rounded-full font-semibold transition-all capitalize border-2"
                  style={{
                    backgroundColor: selectedCategory === category ? '#00FFFF' : '#000000',
                    color: selectedCategory === category ? '#000000' : '#00FFFF',
                    borderColor: '#00FFFF'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="overflow-hidden border-2 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: '#000000', borderColor: '#147884' }}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold" style={{ color: '#00FFFF' }}>
                      {image.title}
                    </h3>
                    <p className="text-sm capitalize" style={{ color: '#FFFFFF' }}>
                      {image.category}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <Card
                className="p-12 text-center border-2"
                style={{ backgroundColor: '#000000', borderColor: '#147884' }}
              >
                <p className="text-lg" style={{ color: '#FFFFFF' }}>
                  No images in this category.
                </p>
              </Card>
            )}
          </>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Portfolio item"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
