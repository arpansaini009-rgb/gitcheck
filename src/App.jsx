import { useTheme } from './theme.js';
import { useRoute } from './route.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ContactPage from './pages/ContactPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';

const PAGES = { contact: ContactPage, gallery: GalleryPage };

export default function App() {
  const { theme, toggle, colors } = useTheme();
  const route = useRoute();
  const Page = PAGES[route];

  return (
    <>
      <Header route={route} theme={theme} onToggleTheme={toggle} />
      {Page ? <Page /> : <Dashboard colors={colors} />}
      <Footer />
    </>
  );
}
