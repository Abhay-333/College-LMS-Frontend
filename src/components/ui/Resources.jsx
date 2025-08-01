import Cards from "./Cards";
import { Outlet } from "react-router-dom";

const Resources = () => {
  return (
    <div className="h-[90.3vh]">
      <Outlet></Outlet>
      {/* <h1>Learn From Youtube Tutorials</h1>
      <h1>Learn From Original Documentation</h1>
      <h1>Learn From Interactive Platforms</h1>
      <h1>Learn From Online Courses(Paid/Free)</h1>
      <h1>Learn From Project Based Learning</h1>
      <h1>Learn From Practice with Problem Solving</h1>
      <h1>Join Coding Communities</h1>
      <h1>BootCamps & Mentorship</h1>
      <h1>AI Powered Learning</h1>
      <h1>Gamified Learning</h1> */}

      <Cards></Cards>
    </div>
  );
};

export default Resources;
