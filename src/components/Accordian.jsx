import { useState, useEffect } from "react";
import { api } from "../admin/AdminDashboard";

export default function VisitorAccordion() {
  const [visitors, setVisitors] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await api.get("/admin/visitors");
        setVisitors(res.data);
      } catch (err) {
        console.error("Failed to fetch visitors:", err);
      }
    };
    fetchVisitors();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-6 mt-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gray-600 bg-clip-text text-transparent">
          Visitor Activity Logs
        </h2>
        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {visitors.length} total
        </div>
      </div>

      {visitors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-3">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No visitors yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Visitor data will appear here once available
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visitors.map((visitor, index) => (
            <div
              key={visitor.visitorId}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300 bg-white"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full p-5 text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      Visitor ID:
                      <span className="font-mono bg-white text-gray-700 px-2 py-1 rounded-md text-sm border border-gray-400">
                        {visitor.visitorId}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Last active: {new Date(visitor.lastSeen).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {visitor.eventsCount} events
                  </div>
                  <span
                    className={`transform transition-transform duration-300 text-gray-400 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[400px] p-5" : "max-h-0 p-0"
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">
                          Events Count
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">
                          {visitor.eventsCount}
                        </span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-600 mb-1">
                          First Seen
                        </p>
                        <p className="text-gray-800 font-mono">
                          {new Date(visitor.firstSeen).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-600 mb-1">
                          Last Seen
                        </p>
                        <p className="text-gray-800 font-mono">
                          {new Date(visitor.lastSeen).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-600 mb-2">
                        User Agent
                      </p>
                      <p className="text-gray-800 text-xs font-mono break-all bg-gray-50 p-3 rounded border">
                        {visitor.userAgent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
