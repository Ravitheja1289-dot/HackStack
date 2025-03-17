import React from 'react';
import './Home.css'; // Assuming you have a CSS file for additional styles

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            <header className="flex justify-between items-center p-6">
                <div className="flex items-center space-x-2">
                    <img
                        alt="Chatbot UI logo"
                        className="w-10 h-10"
                        src="https://storage.googleapis.com/a1aa/image/Xc48qzPX4zfF_JAyB48oeobHRViI_fF5RQ1qNBWEGMY.jpg"
                    />
                    <span className="text-xl font-bold">Chatbot UI</span>
                </div>
                <nav className="flex items-center space-x-4">
                    <a className="text-white" href="#">About</a>
                    <a className="text-white" href="#">Demo</a>
                    <a className="text-white" href="#">Contact</a>
                    <button className="flex items-center space-x-1 border border-white px-3 py-1 rounded">
                        <i className="fab fa-github"></i>
                        <span>30.5k</span>
                    </button>
                    <button className="bg-white text-black px-4 py-2 rounded">Login</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign up</button>
                </nav>
            </header>
            <main className="flex flex-col items-center justify-center flex-grow text-center">
                <h1 className="text-5xl font-bold mb-4">Quantum-Fin</h1>
                <p className="text-xl mb-6 animate-fadeIn">Your Personalized AI Finance.</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded text-lg">
                    Start Chatting <i className="fas fa-arrow-right"></i>
                </button>
            </main>
            <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400">
                Built by Takeoff AI
            </footer>
            <div className="absolute bottom-4 left-4">
                <i className="fas fa-moon text-white"></i>
            </div>
            <div className="absolute bottom-4 right-4">
                <i className="fas fa-times text-white"></i>
            </div>
        </div>
    );
};

export default Home;