import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      {/* <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resourceDetails" element={<ResourceDetails />} />
      </Routes> */}
      <AppRoutes />
    </>
  );
}

export default App;
