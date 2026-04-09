import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function FAQPage() {
  const { faqs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs based on selected category
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg" style={{ color: '#FFFFFF' }}>
            Find answers to common questions about my services and process
          </p>
        </div>

        {faqs.length === 0 ? (
          <Card
            className="p-12 text-center border-2"
            style={{ backgroundColor: '#000000', borderColor: '#147884' }}
          >
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              No FAQs available at the moment.
            </p>
          </Card>
        ) : (
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList 
              className="grid w-full mb-8 border-2" 
              style={{ 
                gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
                backgroundColor: '#000000',
                borderColor: '#147884'
              }}
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  style={{ 
                    color: selectedCategory === category ? '#00FFFF' : '#FFFFFF',
                  }}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <Card className="p-6 border-2" style={{ backgroundColor: '#000000', borderColor: '#147884' }}>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={`item-${index}`}
                        className="border-b"
                        style={{ borderColor: '#147884' }}
                      >
                        <AccordionTrigger 
                          className="text-left hover:no-underline"
                          style={{ color: '#00FFFF' }}
                        >
                          <div className="flex items-start gap-3 pr-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#147884', color: '#00FFFF' }}>
                              Q
                            </span>
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex items-start gap-3 pt-2 pl-9">
                            <p style={{ color: '#FFFFFF' }}>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredFAQs.length === 0 && (
                    <p className="text-center py-8" style={{ color: '#FFFFFF' }}>
                      No questions in this category yet.
                    </p>
                  )}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Still Have Questions */}
        <Card
          className="mt-12 p-8 text-center border-2"
          style={{ backgroundColor: '#147884', borderColor: '#00FFFF' }}
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#00FFFF' }}>
            Still Have Questions?
          </h3>
          <p className="mb-6" style={{ color: '#FFFFFF' }}>
            Can't find the answer you're looking for? Feel free to reach out!
          </p>
          <a href="/contact">
            <button
              className="px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#00FFFF', color: '#000000' }}
            >
              Contact Me
            </button>
          </a>
        </Card>
      </div>
    </div>
  );
}
