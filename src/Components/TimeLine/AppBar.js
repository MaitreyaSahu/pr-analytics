import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AppBar() {
  const [selectedProject, setSelectedProject] = useState("Project A");
  const projects = ["Project A", "Project B", "Project C"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white text-gray-900 shadow-md">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <span className="text-lg font-semibold">PR Analytics</span>
      </div>

      {/* Project Dropdown and Avatar */}
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedProject} <ChevronDown size={16} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg border border-gray-200">
              {projects.map((project) => (
                <div
                  key={project}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsOpen(false);
                  }}
                >
                  {project}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 text-lg">
          U
        </div>
      </div>
    </header>
  );
}
