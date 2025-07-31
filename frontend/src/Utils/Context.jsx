import { createContext, useState } from 'react'
export const resourcesContext = createContext();

const Context = ({children}) => {
    const [resources, setResources] = useState([
        {
            resourceTitle: "YouTube Tutorials",
            resourceDescription: "YouTube offers free, high-quality coding tutorials from experienced instructors who explain concepts with practical examples.",
            reference: "/resourceDetails/yt",
            resourceLinks: [
                { name: "Traversy Media", url: "https://www.youtube.com/c/TraversyMedia", desc: "Traversy Media - Full stack dev tutorials & crash courses." },
                { name: "Academind", url: "https://www.youtube.com/c/Academind", desc: "Academind - Modern JS, React, and Node courses." },
                { name: "CodeWithHarry", url: "https://www.youtube.com/c/CodeWithHarry", desc: "CodeWithHarry - Hindi tutorials on web dev and Python." },
                { name: "The Net Ninja", url: "https://www.youtube.com/c/TheNetNinja", desc: "The Net Ninja - Structured courses on various dev topics." },
                { name: "Sheryians", url: "https://www.youtube.com/@sheryians", desc: "Sheryians - Hindi-based development bootcamps." },
                { name: "JavaScript Mastery", url: "https://www.youtube.com/@javascriptmastery", desc: "JavaScript Mastery - Full-stack project tutorials." },
                { name: "Chai aur Code", url: "https://www.youtube.com/@chaiaurcode", desc: "Chai aur Code - Chill Hindi coding tutorials." },
                { name: "Roadside Coder", url: "https://www.youtube.com/@RoadsideCoder", desc: "Roadside Coder - DSA and frontend with real-world context." },
                { name: "Rahul Mishra", url: "https://www.youtube.com/@rahuulmiishra", desc: "Rahul Mishra - Deep React, system design & careers." },
            ],
        },
        {
            resourceTitle: "Interactive Coding Platforms",
            resourceDescription: "Hands-on platforms with exercises and real-time feedback.",
            reference: "/resourceDetails/codingPlatforms",
            resourceLinks: [
                { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", desc: "freeCodeCamp - Learn to code with free certifications." },
                { name: "LeetCode", url: "https://leetcode.com/", desc: "LeetCode - Practice DSA and coding interview problems." },
                { name: "CodeChef", url: "https://www.codechef.com/", desc: "CodeChef - Competitive coding challenges and contests." },
                { name: "HackerRank", url: "https://www.hackerrank.com/", desc: "HackerRank - Practice coding across domains." },
                { name: "Codecademy", url: "https://www.codecademy.com/", desc: "Codecademy - Interactive coding lessons with quizzes." },
            ],
        },
        {
            resourceTitle: "Online Courses (Free/Paid)",
            resourceDescription: "Structured and self-paced coding courses from popular platforms.",
            reference: "/resourceDetails/coursesPlatform",
            resourceLinks: [
                { name: "DataFlair", url: "https://data-flair.training/", desc: "DataFlair - Training in Python, ML, and more." },
                { name: "Udemy", url: "https://www.udemy.com/", desc: "Udemy - Affordable courses in every coding topic." },
                { name: "Coursera", url: "https://www.coursera.org/", desc: "Coursera - University-grade certifications." },
                { name: "edX", url: "https://www.edx.org/", desc: "edX - Academic-level tech courses." },
                { name: "CS50", url: "https://www.edx.org/cs50", desc: "CS50 - Free Harvard intro to Computer Science." },
                { name: "Sheryians", url: "https://www.sheryians.com/courses", desc: "Sheryians - Hindi project-based bootcamps." },
            ],
        },
        {
            resourceTitle: "Project-Based Learning",
            resourceDescription: "Work on real-world projects to strengthen your portfolio.",
            reference: "/resourceDetails/projectBased",
            resourceLinks: [
                { name: "Frontend Mentor", url: "https://www.frontendmentor.io/", desc: "Frontend Mentor - Frontend UI challenges." },
                { name: "GitHub", url: "https://github.com/", desc: "GitHub - Contribute to open-source codebases." },
                { name: "Kaggle", url: "https://www.kaggle.com/", desc: "Kaggle - Data science projects and competitions." },
                { name: "Awesome Lists", url: "https://github.com/sindresorhus/awesome", desc: "Awesome Lists - Curated dev resources." },
            ],
        },
        {
            resourceTitle: "Practice with Problem-Solving",
            resourceDescription: "Boost logical thinking and prep for interviews.",
            reference: "/resourceDetails/practicePlatforms",
            resourceLinks: [
                { name: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/", desc: "GeeksForGeeks - Articles, quizzes, and challenges." },
                { name: "Codeforces", url: "https://codeforces.com/", desc: "Codeforces - Competitive programming battles." },
                { name: "Codewars", url: "https://www.codewars.com/", desc: "Codewars - Gamified problem-solving." },
                { name: "Topcoder", url: "https://www.topcoder.com/", desc: "Topcoder - High-level competitive coding." },
            ],
        },
        {
            resourceTitle: "Join Online Communities",
            resourceDescription: "Collaborate with developers and get help online.",
            reference: "/resourceDetails/communities",
            resourceLinks: [
                { name: "Stack Overflow", url: "https://stackoverflow.com/questions", desc: "Stack Overflow - Ask and answer programming questions." },
                { name: "r/learnprogramming", url: "https://www.reddit.com/r/learnprogramming/?rdt=46080", desc: "r/learnprogramming - Beginner-friendly Reddit community." },
                { name: "DEV.to", url: "https://dev.to/", desc: "DEV.to - Blog and share insights with devs." },
                { name: "Hashnode", url: "https://hashnode.com/", desc: "Hashnode - Blog on your own domain, for devs." },
            ],
        },
        {
            resourceTitle: "Bootcamps & Mentorship",
            resourceDescription: "Guided programs with mentorship and career support.",
            reference: "/resourceDetails/bootcamps",
            resourceLinks: [
                { name: "The Odin Project", url: "https://www.theodinproject.com/", desc: "The Odin Project - Free full-stack bootcamp." },
                { name: "Coding Ninjas", url: "https://www.codingninjas.com/", desc: "Coding Ninjas - Mentor-led courses and job support." },
                { name: "Scaler Academy", url: "https://www.scaler.com/", desc: "Scaler Academy - Industry-ready bootcamp programs." },
            ],
        },
        {
            resourceTitle: "Read Documentation & Blogs",
            resourceDescription: "Master languages through official docs and expert blogs.",
            reference: "/resourceDetails/documentations",
            resourceLinks: [
                { name: "MDN", url: "https://developer.mozilla.org/en-US/", desc: "MDN - In-depth documentation for web technologies." },
                { name: "JavaScript.info", url: "https://javascript.info/", desc: "JavaScript.info - Visual JS explanations." },
                { name: "Python Docs", url: "http://docs.python.org/3/", desc: "Python Docs - Core reference for Python 3." },
                { name: "Smashing Magazine", url: "https://www.smashingmagazine.com/", desc: "Smashing Magazine - Design, frontend, and UX tips." },
                { name: "CSS-Tricks", url: "https://css-tricks.com/", desc: "CSS-Tricks - Frontend best practices and guides." },
            ],
        },
        {
            resourceTitle: "AI-Powered Learning",
            resourceDescription: "Use AI tools to debug, generate code, and learn faster.",
            reference: "/resourceDetails/aiAssist",
            resourceLinks: [
                { name: "Codeium Chat", url: "https://codeium.com/chat", desc: "Codeium Chat - Free AI coding assistant." },
                { name: "GitHub Copilot", url: "https://github.com/features/copilot", desc: "GitHub Copilot - AI pair programming assistant." },
                { name: "ChatGPT", url: "https://chatgpt.com/", desc: "ChatGPT - Learn and build with conversational AI." },
            ],
        },
        {
            resourceTitle: "Gamified Learning",
            resourceDescription: "Make coding fun and engaging with these games.",
            reference: "/resourceDetails/gamified",
            resourceLinks: [
                { name: "CodeCombat", url: "https://codecombat.com/", desc: "CodeCombat - Learn JavaScript & Python through gameplay." },
                { name: "CSSBattle", url: "https://cssbattle.dev/", desc: "CSSBattle - Play CSS code golf challenges." },
                { name: "Flexbox Froggy", url: "https://flexboxfroggy.com/", desc: "Flexbox Froggy - Learn CSS flexbox through a game." },
                { name: "CheckiO", url: "https://checkio.org/", desc: "CheckiO - Solve Python problems in a gamified way." },
            ],
        },
        {
            resourceTitle: "Newsletters & Weekly Digests",
            resourceDescription: "Get weekly tech tips, project ideas, and news in your inbox.",
            reference: "/resourceDetails/newsletters",
            resourceLinks: [
                { name: "JavaScript Weekly", url: "https://javascriptweekly.com/", desc: "JavaScript Weekly - Weekly JS news and tutorials." },
                { name: "Frontend Focus", url: "https://frontendfoc.us/", desc: "Frontend Focus - UI and frontend development news." },
                { name: "CSS Weekly", url: "https://css-weekly.com/", desc: "CSS Weekly - Weekly CSS and design newsletter." },
                { name: "React Status", url: "https://react.statuscode.com/", desc: "React Status - Weekly React ecosystem updates." },
                { name: "Devs Weekly", url: "https://devsweekly.substack.com/", desc: "Devs Weekly - Curated tips and resources for developers." },
            ],
        },
        {
            resourceTitle: "Design Inspiration & UI/UX Tools",
            resourceDescription: "Improve your UI/UX skills and design thinking.",
            reference: "/resourceDetails/designTools",
            resourceLinks: [
                { name: "Dribbble", url: "https://dribbble.com/", desc: "Dribbble - Showcase of UI/UX designs and concepts." },
                { name: "Behance", url: "https://www.behance.net/", desc: "Behance - Creative portfolios and design projects." },
                { name: "UIverse", url: "https://uiverse.io/", desc: "UIverse - Ready-to-use animated UI components." },
                { name: "Coolors", url: "https://coolors.co/", desc: "Coolors - Generate perfect color palettes." },
                { name: "Figma Community", url: "https://www.figma.com/community", desc: "Figma Community - UI kits, icons, and design tools." },
            ],
        },
        {
            resourceTitle: "Self-Hosting & Deployment Platforms",
            resourceDescription: "Host and deploy your projects for free or low cost.",
            reference: "/resourceDetails/deployment",
            resourceLinks: [
                { name: "Vercel", url: "https://vercel.com/", desc: "Vercel - One-click deploy for React/Next.js apps." },
                { name: "Netlify", url: "https://netlify.com/", desc: "Netlify - Static site hosting and CI/CD." },
                { name: "Render", url: "https://render.com/", desc: "Render - Cloud hosting for full-stack apps." },
                { name: "Railway", url: "https://railway.app/", desc: "Railway - Full-stack deployment with Postgres support." },
                { name: "Replit", url: "https://replit.com/", desc: "Replit - In-browser coding and hosting." },
            ],
        },
        {
            resourceTitle: "Tech Career Guidance & Job Boards",
            resourceDescription: "Get hired with guidance, roadmaps, and job boards.",
            reference: "/resourceDetails/careerGuidance",
            resourceLinks: [
                { name: "roadmap.sh", url: "https://roadmap.sh/", desc: "roadmap.sh - Visual learning paths for developers." },
                { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", desc: "LinkedIn Jobs - Tech jobs and internships worldwide." },
                { name: "Wellfound", url: "https://wellfound.com/", desc: "Wellfound (AngelList) - Startup jobs and early-stage companies." },
                { name: "Himalayas", url: "https://himalayas.app/", desc: "Himalayas - Remote developer jobs." },
                { name: "Interviewing.io", url: "https://interviewing.io/", desc: "Interviewing.io - Practice real interviews anonymously." },
            ],
        }
    ]);
    
    return (
        <resourcesContext.Provider value={{ resources, setResources }} >{children}</resourcesContext.Provider>
    )
}

export default Context