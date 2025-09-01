import CheckboxTree from "./CheckboxTree";

const initialTree = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "broccoli", label: "Broccoli" },
    ],
  },
];

export default function CheckboxDemo() {
  return (
    <section
      id="checkboxes"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Nested Checkbox Component
        </h2>
        <p className="mt-3 text-gray-600">
          Parent selects children. Select All toggles everything.
        </p>
      </div>

      <div className="mt-8">
        <CheckboxTree tree={initialTree} />
      </div>
    </section>
  );
}