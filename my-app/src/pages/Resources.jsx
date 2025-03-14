import React, { useState } from "react";
import { Search, Book, Video, FileText, Filter } from "lucide-react";
// import "./index.css";
// import "./App.css";
const resourcesData = [
  { id: 1, title: "Understanding Stock Markets", type: "Article", category: "Investing", link: "#" },
  { id: 2, title: "Top 10 Investment Strategies", type: "Article", category: "Investing", link: "#" },
  { id: 3, title: "Financial Planning for Beginners", type: "Course", category: "Personal Finance", link: "#" },
  { id: 4, title: "Cryptocurrency Explained", type: "Video", category: "Crypto", link: "#" },
  { id: 5, title: "Retirement Planning Guide", type: "Article", category: "Personal Finance", link: "#" },
  { id: 6, title: "Mutual Funds vs ETFs", type: "Video", category: "Investing", link: "#" },
  { id: 7, title: "AI in Finance: Future Trends", type: "Article", category: "Tech & Finance", link: "#" },
  { id: 8, title: "Understanding Credit Scores", type: "Course", category: "Personal Finance", link: "#" },
  { id: 9, title: "Beginner’s Guide to Trading", type: "Video", category: "Investing", link: "#" },
];

const categories = ["All", "Investing", "Personal Finance", "Crypto", "Tech & Finance"];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = resourcesData.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Book size={28} /> Financial Learning Resources
      </h1>
      <p className="text-gray-400 mb-6">Access a wide range of articles, courses, and videos to improve your financial knowledge.</p>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md border border-gray-600 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div key={resource.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {resource.type === "Article" && <FileText size={20} />}
                {resource.type === "Video" && <Video size={20} />}
                {resource.type === "Course" && <Book size={20} />}
                {resource.title}
              </h3>
              <p className="text-sm text-gray-400">{resource.category}</p>
              <a
                href={resource.link}
                className="text-blue-400 mt-2 inline-block hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more →
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;
