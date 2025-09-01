import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Polished accordion-style FAQ.
 * Filename kept as: src/components/FAQ.jsx
 */

const FAQ_ITEMS = [
  {
    q: "What does the nested checkbox do?",
    a:
      "It allows hierarchical selection: selecting a parent toggles all children. Partially selected children set the parent to an indeterminate state.",
  },
  {
    q: "How do I use Select All?",
    a:
      "Use the 'Select All' checkbox at the top of the checkbox card to select/deselect every leaf item in the tree.",
  },
  {
    q: "Can I add deeper nesting?",
    a:
      "Yes — the checkbox implementation is recursive/data-driven and supports arbitrary nesting levels.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <p className="text-sm text-gray-600 mb-6">
          Quick answers to common questions about the assignment implementation.
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const open = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl bg-white border shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-indigo-50 grid place-items-center text-indigo-600">
                      {/* simple icon circle */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20v-6" />
                        <path d="M12 4v6" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{item.q}</span>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 text-indigo-600 transform transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {open && (
                  <div className="px-4 pb-4 text-gray-700">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}