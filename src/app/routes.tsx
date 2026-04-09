import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { FeedbacksPage } from "./pages/FeedbacksPage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminInquiries } from "./pages/admin/AdminInquiries";
import { AdminPortfolio } from "./pages/admin/AdminPortfolio";
import { AdminResume } from "./pages/admin/AdminResume";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminProfile } from "./pages/admin/AdminProfile";
import { AdminFAQ } from "./pages/admin/AdminFAQ";
import { AdminAgreement } from "./pages/admin/AdminAgreement";
import { AdminTransactions } from "./pages/admin/AdminTransactions";
import { AdminContacts } from "./pages/admin/AdminContacts";
import { AdminRules } from "./pages/admin/AdminRules";
import { AdminPassword } from "./pages/admin/AdminPassword";
import { ResumePage } from "./pages/ResumePage";
import { PortfolioPage } from "./pages/PortfolioPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "feedbacks", Component: FeedbacksPage },
      { path: "contact", Component: ContactPage },
      { path: "faq", Component: FAQPage },
      { path: "resume", Component: ResumePage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "login", Component: LoginPage },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/inquiries", Component: AdminInquiries },
      { path: "admin/portfolio", Component: AdminPortfolio },
      { path: "admin/resume", Component: AdminResume },
      { path: "admin/services", Component: AdminServices },
      { path: "admin/profile", Component: AdminProfile },
      { path: "admin/faq", Component: AdminFAQ },
      { path: "admin/agreement", Component: AdminAgreement },
      { path: "admin/transactions", Component: AdminTransactions },
      { path: "admin/contacts", Component: AdminContacts },
      { path: "admin/rules", Component: AdminRules },
      { path: "admin/password", Component: AdminPassword },
    ],
  },
]);
