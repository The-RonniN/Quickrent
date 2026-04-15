import { useState, createContext, useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import RentPage from "./pages/RentPage";
import ListPage from "./pages/ListPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiePage from "./pages/CookiePage";
import AuthModal from "./components/AuthModal";
import ProfilePage from "./pages/ProfilePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import BookingForm from "./components/BookingForm";
import Footer from "./components/footer";
import ForgotPassword from "./components/ForgotPassword";


export const AuthContext = createContext(null);
export const AppContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const useApp = () => useContext(AppContext);

function getDemoItems() {
  return [
    { id: 1, title: "Sony A7III Camera", category: "Electronics", price: 800, deposit: 5000, city: "Pune", condition: "Excellent", description: "Full frame mirrorless camera with 28-70mm kit lens. Perfect for events and travel.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Rahul Sharma", ownerPhone: "9876543210", createdAt: new Date().toISOString(), rentCount: 24, rating: "4.8" },
    { id: 2, title: "Royal Enfield Bullet 350", category: "Vehicles", price: 600, deposit: 3000, city: "Mumbai", condition: "Good", description: "Classic bullet in great condition. Fuel not included. Helmet provided.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Priya Nair", ownerPhone: "9876543211", createdAt: new Date().toISOString(), rentCount: 18, rating: "4.6" },
    { id: 3, title: "DJ Sound System", category: "Party & Events", price: 1500, deposit: 8000, city: "Pune", condition: "Excellent", description: "Complete DJ setup with 2 speakers, mixer, mic and lights. Ideal for parties.", isAvailable: false, rentedTill: "2026-04-10", ownerId: 0, ownerName: "Aryan Mehta", ownerPhone: "9876543212", createdAt: new Date().toISOString(), rentCount: 31, rating: "4.9" },
    { id: 4, title: "Camping Tent (6 Person)", category: "Sports & Outdoor", price: 400, deposit: 2000, city: "Nashik", condition: "Good", description: "Waterproof 6-person tent perfect for weekend getaways and treks.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Sneha Patil", ownerPhone: "9876543213", createdAt: new Date().toISOString(), rentCount: 15, rating: "4.5" },
    { id: 5, title: "Power Drill Set", category: "Tools & Equipment", price: 200, deposit: 1000, city: "Pune", condition: "Good", description: "18V cordless drill with complete bit set. Ideal for home repairs.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Vikram Singh", ownerPhone: "9876543214", createdAt: new Date().toISOString(), rentCount: 9, rating: "4.3" },
    { id: 6, title: "MacBook Pro 14\"", category: "Electronics", price: 1200, deposit: 10000, city: "Bangalore", condition: "Excellent", description: "M3 Pro chip, 18GB RAM, 512GB SSD. For developers and designers.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Ananya Rao", ownerPhone: "9876543215", createdAt: new Date().toISOString(), rentCount: 20, rating: "4.7" },
    { id: 7, title: "Sofa Set (3+1+1)", category: "Furniture & Appliances", price: 500, deposit: 4000, city: "Pune", condition: "Good", description: "5-seater sofa set in good condition. Good for short-term furnished homes.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Rahul Sharma", ownerPhone: "9876543210", createdAt: new Date().toISOString(), rentCount: 7, rating: "4.2" },
    { id: 8, title: "GoPro Hero 12", category: "Electronics", price: 500, deposit: 3000, city: "Goa", condition: "Excellent", description: "Waterproof action camera with all mounts and accessories included.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Priya Nair", ownerPhone: "9876543211", createdAt: new Date().toISOString(), rentCount: 28, rating: "4.9" },
  ];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [authModal, setAuthModal] = useState(null);

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_user")) || null; }
    catch { return null; }
  });

  const [items, setItems] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("qr_items"));
      return s && s.length > 0 ? s : getDemoItems();
    } catch { return getDemoItems(); }
  });

  const [rentals, setRentals] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_rentals")) || []; }
    catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_wishlist")) || []; }
    catch { return []; }
  });

  useEffect(() => { localStorage.setItem("qr_items", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("qr_rentals", JSON.stringify(rentals)); }, [rentals]);
  useEffect(() => { localStorage.setItem("qr_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  // Auto-release items when rent is over
  useEffect(() => {
    const checkExpiry = () => {
      const todayString = new Date().toISOString().split("T")[0];
      setItems(prev => {
        let hasChanges = false;
        const updated = prev.map(it => {
          if (!it.isAvailable && it.rentedTill && it.rentedTill < todayString) {
            hasChanges = true;
            return { ...it, isAvailable: true, rentedTill: null };
          }
          return it;
        });
        return hasChanges ? updated : prev;
      });
    };
    checkExpiry();
    const timer = setInterval(checkExpiry, 60000 * 5); // check every 5 mins
    return () => clearInterval(timer);
  }, []);

  const handleSignup = (userData) => {
    const newUser = { ...userData, id: Date.now(), joinedDate: new Date().toLocaleDateString("en-IN") };
    setUser(newUser);
    localStorage.setItem("qr_user", JSON.stringify(newUser));
    setAuthModal(null);
  };

  const handleLogin = (userData) => {
    const u = { ...userData, id: userData.id || Date.now() };
    setUser(u);
    localStorage.setItem("qr_user", JSON.stringify(u));
    setAuthModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("qr_user");
    setCurrentPage("home");
  };

  const updateUserRole = (newRole) => {
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem("qr_user", JSON.stringify(updated));
  };

  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now(),
      ownerId: user?.id,
      ownerName: user?.name,
      ownerPhone: user?.phone,
      createdAt: new Date().toISOString(),
      isAvailable: true,
      rentedTill: null,
      rentCount: 0,
      rating: "New",
    };
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const rentItem = (rentalData) => {
    const newRental = {
      ...rentalData,
      id: Date.now(),
      renterId: user?.id,
      renterName: user?.name,
      renterEmail: user?.email,
      renterPhone: user?.phone,
      status: "active",
      createdAt: new Date().toISOString(),
      receiptId: "QR" + Date.now().toString().slice(-8),
    };
    setRentals(prev => [newRental, ...prev]);
    setItems(prev => prev.map(it =>
      it.id === rentalData.itemId
        ? { ...it, isAvailable: false, rentedTill: rentalData.endDate, rentCount: (it.rentCount || 0) + 1 }
        : it
    ));
    return newRental;
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const navigate = (page, item = null) => {
    setSelectedItem(item);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout, updateUserRole }}>
      <AppContext.Provider value={{ items, rentals, wishlist, addItem, rentItem, toggleWishlist, selectedItem }}>
        <div style={{ fontFamily: "'Syne', sans-serif", minHeight: "100vh", background: "#fafafa" }}>
          <Navbar currentPage={currentPage} navigate={navigate} openAuth={setAuthModal} />
          {currentPage === "home"    && <Hero navigate={navigate} />}
          {currentPage === "rent"    && <RentPage navigate={navigate} openAuth={setAuthModal} />}
          {currentPage === "list"    && <ListPage navigate={navigate} openAuth={setAuthModal} />}
          {currentPage === "about"   && <AboutPage navigate={navigate} />}
          {currentPage === "privacy" && <PrivacyPage />}
          {currentPage === "terms"   && <TermsPage />}
          {currentPage === "cookie"  && <CookiePage />}
          {currentPage === "profile" && <ProfilePage navigate={navigate} />}
          {authModal === "forgot" && <ForgotPassword onBack={() => setAuthModal("login")} />}
          {(authModal === "login" || authModal === "signup") && (
            <AuthModal mode={authModal} onClose={() => setAuthModal(null)} switchMode={setAuthModal} />
          )}
          <Footer navigate={navigate} />
        </div>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}