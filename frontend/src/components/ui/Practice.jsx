import { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Loader, Check, X, ChevronDown } from 'lucide-react';
// Assuming cn utility is available at '../../lib/utils'
import { cn } from '../../lib/utils'; 

// --- Language Configuration for Judge0 ---
const languageOptions = [
    { id: 71, name: 'Python (3.8.1)' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)' },
    { id: 54, name: 'C++ (GCC 9.2.0)' },
    { id: 50, name: 'C (GCC 9.2.0)' },
    { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
];

const defaultCode = {
    71: `# Python 3\n# Write your Python code here`,
    62: `// Java\n// Write your Java code here\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
    54: `// C++\n// Write your C++ code here\n#include <iostream>\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,
    50: `// C\n// Write your C code here\n#include <stdio.h>\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}`,
    63: `// JavaScript (Node.js)\n// Write your JavaScript code here\nconsole.log("Hello, JavaScript!");`,
};

export default function Practice() {
    const [code, setCode] = useState(defaultCode[71]);
    const [language, setLanguage] = useState(languageOptions[0]);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    
    const [customInput, setCustomInput] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null); // To store detailed submission result
    const [status, setStatus] = useState('idle'); // 'idle', 'running', 'success', 'error'
    const [activeOutputTab, setActiveOutputTab] = useState('output'); // 'output', 'input'

    // Replace with your actual RapidAPI Key and Host from environment variables
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY; 
    console.log("RapidAPI Key:", RAPIDAPI_KEY);
    const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

    useEffect(() => {
        // Set default code when language changes
        setCode(defaultCode[language.id]);
        setSubmissionStatus(null); // Clear previous output when language changes
        setStatus('idle');
    }, [language]);

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setIsLanguageDropdownOpen(false);
    };

    const pollForResult = async (token) => {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };

        try {
            let response = await axios.request(options);
            let submissionStatusId = response.data.status.id;

            // Poll every 2 seconds until the submission is processed.
            while (submissionStatusId === 1 || submissionStatusId === 2) { // In Queue or Processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                response = await axios.request(options);
                submissionStatusId = response.data.status.id;
            }
            
            return response.data;

        } catch (error) {
            console.error("Error polling for result:", error);
            setStatus('error');
            setSubmissionStatus({
                stderr: btoa("Error polling for submission result."),
                status: { description: "Error" }
            });
            return null;
        }
    };

    const handleRunCode = async () => {
        if (!code) return;
        setStatus('running');
        setSubmissionStatus(null); // Clear previous submission status
        setActiveOutputTab('output'); // Switch to output tab when running

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: { base64_encoded: 'true', wait: 'false' },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            },
            data: {
                language_id: language.id,
                source_code: btoa(code),
                stdin: btoa(customInput)
            }
        };

        try {
            const response = await axios.request(options);
            const token = response.data.token;
            const result = await pollForResult(token);

            if(result) {
                setSubmissionStatus(result);
                if (result.status.id === 3) { // Accepted (Success)
                    setStatus('success');
                } else {
                    setStatus('error'); // Any other status is considered an error for display
                }
            }

        } catch (error) {
            console.error("Error running code:", error);
            setStatus('error');
            setSubmissionStatus({
                stderr: btoa(error.message || "An unknown error occurred."),
                status: { description: "Client-side Error" }
            });
        }
    };
    
    const renderOutputContent = () => {
        if (status === 'running') {
            return (
                <div className="flex items-center space-x-2 text-gray-400">
                    <Loader className="animate-spin h-5 w-5" />
                    <span>Running...</span>
                </div>
            );
        }

        if (!submissionStatus) {
            return <div className="text-gray-400">Run code to see the output here.</div>;
        }

        const { status: resultStatus, stdout, stderr, compile_output, message } = submissionStatus;

        const decodedStdout = stdout ? atob(stdout) : null;
        const decodedStderr = stderr ? atob(stderr) : null;
        const decodedCompileOutput = compile_output ? atob(compile_output) : null;
        const decodedMessage = message ? atob(message) : null;

        return (
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <h3 className={cn("text-lg font-semibold", {
                        'text-green-500': resultStatus.id === 3,
                        'text-red-500': resultStatus.id !== 3,
                    })}>
                        {resultStatus.description}
                    </h3>
                    {resultStatus.id === 3 ? <Check className="h-6 w-6 text-green-500" /> : <X className="h-6 w-6 text-red-500" />}
                </div>

                {decodedStdout && (
                    <div>
                        <h4 className="font-semibold text-gray-200">Standard Output:</h4>
                        <pre className="bg-gray-900 rounded-md p-2 mt-1 text-white whitespace-pre-wrap break-all text-sm">{decodedStdout}</pre>
                    </div>
                )}
                {decodedStderr && (
                    <div>
                        <h4 className="font-semibold text-red-400">Standard Error:</h4>
                        <pre className="bg-gray-900 rounded-md p-2 mt-1 text-red-400 whitespace-pre-wrap break-all text-sm">{decodedStderr}</pre>
                    </div>
                )}
                {decodedCompileOutput && (
                    <div>
                        <h4 className="font-semibold text-yellow-400">Compiler Output:</h4>
                        <pre className="bg-gray-900 rounded-md p-2 mt-1 text-yellow-400 whitespace-pre-wrap break-all text-sm">{decodedCompileOutput}</pre>
                    </div>
                )}
                {decodedMessage && (
                    <div>
                        <h4 className="font-semibold text-gray-200">Message:</h4>
                        <pre className="bg-gray-900 rounded-md p-2 mt-1 text-white whitespace-pre-wrap break-all text-sm">{decodedMessage}</pre>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
            {/* Top Bar: Language Selector and Run Button */}
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                <div className="relative inline-block text-left z-10">
                    <div>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        >
                            {language.name}
                            <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                        </button>
                    </div>
                    {isLanguageDropdownOpen && (
                        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                {languageOptions.map(lang => (
                                    <button
                                        key={lang.id}
                                        onClick={() => handleLanguageChange(lang)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                                        role="menuitem"
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleRunCode}
                    disabled={status === 'running'}
                    className="flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'running' ? (
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                        <Play className="h-5 w-5 mr-2" />
                    )}
                    Run Code
                </button>
            </div>

            {/* Main Content: Code Editor and Output/Input Panels */}
            <div className="flex-grow flex flex-col md:flex-row">
                {/* Code Editor */}
                <div className="w-full md:w-2/3 p-4 flex flex-col">
                    <div className="flex-grow flex flex-col bg-gray-800 rounded-lg overflow-hidden">
                        <textarea
                            className="flex-grow p-4 bg-gray-800 text-white font-mono text-base outline-none resize-none"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Output/Input Section */}
                <div className="w-full md:w-1/3 p-4 flex flex-col">
                    <div className="flex-shrink-0 flex flex-col bg-gray-800 rounded-lg overflow-hidden">
                        <div className="flex border-b border-gray-700">
                            <button 
                                onClick={() => setActiveOutputTab('input')} 
                                className={cn("py-2 px-4 text-sm font-medium", activeOutputTab === 'input' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:bg-gray-700')}>
                                Input
                            </button>
                            <button 
                                onClick={() => setActiveOutputTab('output')} 
                                className={cn("py-2 px-4 text-sm font-medium", activeOutputTab === 'output' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:bg-gray-700')}>
                                Output
                            </button>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto">
                            {activeOutputTab === 'input' ? (
                                <div>
                                    <label htmlFor="customInput" className="block text-sm font-medium text-gray-300 mb-2">Custom Input (Stdin)</label>
                                    <textarea
                                        id="customInput"
                                        rows="8"
                                        className="w-full p-2 bg-gray-900 text-white font-mono text-sm rounded-md outline-none resize-none border border-gray-700 focus:border-cyan-500"
                                        value={customInput}
                                        onChange={(e) => setCustomInput(e.target.value)}
                                        placeholder="Enter your custom input here..."
                                        spellCheck="false"
                                    />
                                </div>
                            ) : (
                                renderOutputContent()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}