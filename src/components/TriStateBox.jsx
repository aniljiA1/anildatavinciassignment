import { useEffect, useRef } from "react";

export default function TriStateBox({ id, label, state, onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === "indeterminate";
  }, [state]);

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        aria-checked={state}
        checked={state === "checked"}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
      />
      <span className="text-sm text-gray-900">{label}</span>
    </label>
  );
}