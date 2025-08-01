import SignIn from "../components/ui/SignIn";
import Home from "../components/ui/Home";
import Practice from "../components/ui/Practice";
import ResourceDetails from "../components/ui/ResourceDetails";
import Resources from "../components/ui/Resources";
import MainLayout from "../layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import SignUp from "../components/ui/SignUp";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resourceDetails/:type" element={<ResourceDetails />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUP" element={<SignUp />} />

        {/* Instead of making separate route for each category like /resourceDetails/yt, /resourceDetails/codingPlatforms, etc, i have made a single route and extracted the values using useParams Hook you can see it in ResourcesDetails Component, if you have any doubt please feel free to ask.

        <Route path="/resourceDetails/codingPlatforms" element={<ResourceDetails />} />
        <Route path="/resourceDetails/coursesPlatform" element={<ResourceDetails />} />
        <Route path="/resourceDetails/projectBased" element={<ResourceDetails />} />
        <Route path="/resourceDetails/practicePlatforms" element={<ResourceDetails />} />
        <Route path="/resourceDetails/communities" element={<ResourceDetails />} />
        <Route path="/resourceDetails/bootcamps" element={<ResourceDetails />} />
        <Route path="/resourceDetails/aiAssist" element={<ResourceDetails />} />
        <Route path="/resourceDetails/gamified" element={<ResourceDetails />} /> */}

      </Route>
    </Routes>
  );
}

export default AppRoutes;
