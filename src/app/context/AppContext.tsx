import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileData {
  name: string;
  profession: string;
  age: string;
  address: string;
  email: string;
  phone: string;
  profilePicture: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Inquiry {
  id: string;
  name: string;
  service: string;
  description: string;
  document?: string;
  date: string;
  status: string;
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface Feedback {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

interface Contact {
  id: string;
  type: string;
  value: string;
  icon: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: string) => void;
  deleteInquiry: (id: string) => void;
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  feedbacks: Feedback[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date'>) => void;
  updateFeedback: (id: string, feedback: Partial<Feedback>) => void;
  deleteFeedback: (id: string) => void;
  portfolioImages: PortfolioImage[];
  addPortfolioImage: (image: Omit<PortfolioImage, 'id'>) => void;
  deletePortfolioImage: (id: string) => void;
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  resume: string;
  updateResume: (content: string) => void;
  agreement: string;
  updateAgreement: (content: string) => void;
  rulesRegulations: string;
  updateRulesRegulations: (content: string) => void;
  password: string;
  updatePassword: (newPassword: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: ProfileData = {
  name: 'Edmar Miralpes',
  profession: 'Web Developer (Front-End Developer)',
  age: '28',
  address: 'Philippines',
  email: 'edmar.miralpes@email.com',
  phone: '+63 912 345 6789',
  profilePicture: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2ODg1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom responsive websites and web applications using modern technologies.',
    image: 'https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzU2Mjk2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'Digital Editing',
    description: 'Professional photo editing and graphic design services for your brand.',
    image: 'https://images.unsplash.com/photo-1740174459713-26c0438cf391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzc1NzMyMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Video Editing',
    description: 'High-quality video editing for promotional content and social media.',
    image: 'https://images.unsplash.com/photo-1614963326505-843868e1d83a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NzU2NTI4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    title: 'Document Research & Writing',
    description: 'Comprehensive research and documentation services for academic and business needs.',
    image: 'https://images.unsplash.com/photo-1761558794306-466448dab4bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHJlc2VhcmNoJTIwd3JpdGluZ3xlbnwxfHx8fDE3NzU2NjY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    category: 'Developer',
    question: 'What technologies do you work with?',
    answer: 'I specialize in React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, and various modern frontend frameworks.'
  },
  {
    id: '2',
    category: 'Services',
    question: 'How long does a typical web development project take?',
    answer: 'Project timelines vary based on complexity. A simple website takes 1-2 weeks, while complex applications may take 4-8 weeks or more.'
  },
  {
    id: '3',
    category: 'Freelance',
    question: 'Do you offer hourly or project-based pricing?',
    answer: 'I offer both options depending on your needs. We can discuss the best pricing structure during our initial consultation.'
  }
];

const defaultFeedbacks: Feedback[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Web Development',
    rating: 5,
    comment: 'Excellent work! The website exceeded my expectations. Very professional and responsive.',
    date: '2026-03-15'
  },
  {
    id: '2',
    clientName: 'Mike Chen',
    service: 'Video Editing',
    rating: 5,
    comment: 'Amazing video editing skills. Delivered on time and the quality was outstanding!',
    date: '2026-03-20'
  }
];

const defaultContacts: Contact[] = [
  { id: '1', type: 'Email', value: 'edmar.miralpes@email.com', icon: 'Mail' },
  { id: '2', type: 'Phone', value: '+63 912 345 6789', icon: 'Phone' },
  { id: '3', type: 'LinkedIn', value: 'linkedin.com/in/edmarmiralpes', icon: 'Linkedin' },
  { id: '4', type: 'GitHub', value: 'github.com/edmarmiralpes', icon: 'Github' }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('admin123');
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>(defaultFAQs);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(defaultFeedbacks);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [resume, setResume] = useState('');
  const [agreement, setAgreement] = useState('');
  const [rulesRegulations, setRulesRegulations] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('portfolioData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfile(data.profile || defaultProfile);
      setServices(data.services || defaultServices);
      setInquiries(data.inquiries || []);
      setFAQs(data.faqs || defaultFAQs);
      setFeedbacks(data.feedbacks || defaultFeedbacks);
      setPortfolioImages(data.portfolioImages || []);
      setContacts(data.contacts || defaultContacts);
      setResume(data.resume || '');
      setAgreement(data.agreement || '');
      setRulesRegulations(data.rulesRegulations || '');
      setPassword(data.password || 'admin123');
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      profile,
      services,
      inquiries,
      faqs,
      feedbacks,
      portfolioImages,
      contacts,
      resume,
      agreement,
      rulesRegulations,
      password
    };
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [profile, services, inquiries, faqs, feedbacks, portfolioImages, contacts, resume, agreement, rulesRegulations, password]);

  const login = (inputPassword: string) => {
    if (inputPassword === password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...service, id: Date.now().toString() }]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    setInquiries(prev => [...prev, {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending'
    }]);
  };

  const updateInquiryStatus = (id: string, status: string) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const addFAQ = (faq: Omit<FAQ, 'id'>) => {
    setFAQs(prev => [...prev, { ...faq, id: Date.now().toString() }]);
  };

  const updateFAQ = (id: string, faq: Partial<FAQ>) => {
    setFAQs(prev => prev.map(f => f.id === id ? { ...f, ...faq } : f));
  };

  const deleteFAQ = (id: string) => {
    setFAQs(prev => prev.filter(f => f.id !== id));
  };

  const addFeedback = (feedback: Omit<Feedback, 'id' | 'date'>) => {
    setFeedbacks(prev => [...prev, {
      ...feedback,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    }]);
  };

  const updateFeedback = (id: string, feedback: Partial<Feedback>) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, ...feedback } : f));
  };

  const deleteFeedback = (id: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  const addPortfolioImage = (image: Omit<PortfolioImage, 'id'>) => {
    setPortfolioImages(prev => [...prev, { ...image, id: Date.now().toString() }]);
  };

  const deletePortfolioImage = (id: string) => {
    setPortfolioImages(prev => prev.filter(i => i.id !== id));
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    setContacts(prev => [...prev, { ...contact, id: Date.now().toString() }]);
  };

  const updateContact = (id: string, contact: Partial<Contact>) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...contact } : c));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const updateResume = (content: string) => {
    setResume(content);
  };

  const updateAgreement = (content: string) => {
    setAgreement(content);
  };

  const updateRulesRegulations = (content: string) => {
    setRulesRegulations(content);
  };

  const updatePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      profile,
      updateProfile,
      services,
      addService,
      updateService,
      deleteService,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      faqs,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      feedbacks,
      addFeedback,
      updateFeedback,
      deleteFeedback,
      portfolioImages,
      addPortfolioImage,
      deletePortfolioImage,
      contacts,
      addContact,
      updateContact,
      deleteContact,
      resume,
      updateResume,
      agreement,
      updateAgreement,
      rulesRegulations,
      updateRulesRegulations,
      password,
      updatePassword
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
