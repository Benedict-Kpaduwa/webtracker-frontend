import React, { useEffect } from "react";
import { trackEvent } from "../utils/tracker";

export default function Home() {
  useEffect(() => {
    trackEvent({ page: "/", type: "pageview" });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome — Web Tracking Demo
      </h2>
      <p className="text-gray-600">
        This demo records page views for educational purposes only. No personal
        data is stored.
      </p>

      <div className="mt-6">
        <button
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          onClick={() =>
            trackEvent({
              page: "/clicked-button",
              type: "click",
              payload: { button: "demo" },
            })
          }
        >
          Click me (sends click event)
        </button>
      </div>
    </div>
  );
}
