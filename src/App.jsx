import { useTheme } from './theme.js';
import { useRoute } from './route.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  const { theme, toggle, colors } = useTheme();
  const route = useRoute();

  return (
    <>
      <Header route={route} theme={theme} onToggleTheme={toggle} />
      {route === 'contact' ? <ContactPage /> : <Dashboard colors={colors} />}
      <Footer />
    </>
  );
}
