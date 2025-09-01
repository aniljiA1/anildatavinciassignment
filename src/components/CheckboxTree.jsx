import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Polished, card-style nested checkbox UI with tri-state logic.
 * Filename kept as: src/components/CheckboxTree.jsx
 *
 * Behavior:
 * - Uses a tree structure (Fruits / Vegetables -> leaves)
 * - Stores only leaf selections (Set of leaf ids)
 * - Parent states derived from children: checked / unchecked / indeterminate
 * - 'Select All' at top controls everything
 */

const TREE = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      { id: "orange", label: "Orange" },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "potato", label: "Potato" },
      { id: "tomato", label: "Tomato" },
    ],
  },
];

/* Helpers to build quick lookup maps */
function buildIndex(tree) {
  const childrenById = new Map();
  const parentById = new Map();

  const walk = (node, parent = null) => {
    if (parent) parentById.set(node.id, parent.id);
    if (!node.children || node.children.length === 0) {
      childrenById.set(node.id, []);
    } else {
      childrenById.set(node.id, node.children.map((c) => c.id));
      node.children.forEach((c) => walk(c, node));
    }
  };

  tree.forEach((n) => walk(n));
  return { childrenById, parentById };
}

/* Get all leaf ids under a node id */
function getLeafIds(nodeId, childrenById) {
  const leaves = [];
  const dfs = (id) => {
    const kids = childrenById.get(id) || [];
    if (kids.length === 0) {
      leaves.push(id);
      return;
    }
    kids.forEach(dfs);
  };
  dfs(nodeId);
  return leaves;
}

/* Determine node state (checked / unchecked / indeterminate) by looking at leaf selections */
function getNodeState(nodeId, childrenById, checkedLeaves) {
  const leafIds = getLeafIds(nodeId, childrenById);
  if (leafIds.length === 0) {
    // node itself is a leaf
    return checkedLeaves.has(nodeId) ? "checked" : "unchecked";
  }
  let count = 0;
  for (const id of leafIds) if (checkedLeaves.has(id)) count++;
  if (count === 0) return "unchecked";
  if (count === leafIds.length) return "checked";
  return "indeterminate";
}

/* Tri-state checkbox component that sets indeterminate via ref */
function TriStateCheckbox({ id, label, state, onChange, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === "indeterminate";
  }, [state]);

  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={state === "checked"}
        aria-checked={state === "checked" ? "true" : state === "indeterminate" ? "mixed" : "false"}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 accent-indigo-600"
      />
      <span className="text-sm md:text-base text-gray-800">{label}</span>
    </label>
  );
}

export default function CheckboxTree() {
  const { childrenById } = useMemo(() => buildIndex(TREE), []);
  const allLeaves = useMemo(() => {
    // collect all leaf ids across roots
    return TREE.flatMap((root) => getLeafIds(root.id, childrenById));
  }, [childrenById]);

  // store only leaf selections
  const [checkedLeaves, setCheckedLeaves] = useState(() => new Set());

  const setLeaves = (leafIds, checked) =>
    setCheckedLeaves((prev) => {
      const next = new Set(prev);
      leafIds.forEach((id) => {
        if (checked) next.add(id);
        else next.delete(id);
      });
      return next;
    });

  const toggleLeaf = (leafId) =>
    setCheckedLeaves((prev) => {
      const next = new Set(prev);
      if (next.has(leafId)) next.delete(leafId);
      else next.add(leafId);
      return next;
    });

  const toggleBranch = (nodeId) => {
    const leaves = getLeafIds(nodeId, childrenById);
    const currentState = getNodeState(nodeId, childrenById, checkedLeaves);
    const shouldCheck = currentState !== "checked"; // if not fully checked, check all; else uncheck all
    setLeaves(leaves, shouldCheck);
  };

  const selectAllState = useMemo(() => {
    let count = 0;
    allLeaves.forEach((l) => checkedLeaves.has(l) && count++);
    if (count === 0) return "unchecked";
    if (count === allLeaves.length) return "checked";
    return "indeterminate";
  }, [allLeaves, checkedLeaves]);

  const setSelectAll = (checked) => setLeaves(allLeaves, checked);

  /* Render recursion */
  const renderNode = (node, depth = 0) => {
    const isLeaf = (childrenById.get(node.id) || []).length === 0;
    const state = getNodeState(node.id, childrenById, checkedLeaves);

    return (
      <div key={node.id} className="space-y-2">
        <div style={{ paddingLeft: depth * 12 }}>
          <TriStateCheckbox
            id={node.id}
            label={node.label}
            state={state}
            onChange={() => (isLeaf ? toggleLeaf(node.id) : toggleBranch(node.id))}
          />
        </div>

        {!isLeaf && (
          <div className="pl-6 ml-2 border-l border-gray-100">
            {node.children.map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  /* Collect selected labels to show as chips */
  const selectedLabels = useMemo(() => {
    const labels = [];
    const leafToLabel = new Map();
    TREE.forEach((root) => {
      const walk = (n) => {
        if (!n.children || n.children.length === 0) {
          leafToLabel.set(n.id, n.label);
        } else n.children.forEach(walk);
      };
      walk(root);
    });
    checkedLeaves.forEach((id) => {
      if (leafToLabel.has(id)) labels.push(leafToLabel.get(id));
    });
    return labels;
  }, [checkedLeaves]);

  return (
    <section id="checkbox" className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Nested Checkbox</h3>
            <p className="mt-1 text-sm text-gray-600">
              Parent checkboxes control their children. Partial selections show an indeterminate state.
            </p>
          </div>

          <div className="flex-shrink-0">
            <TriStateCheckbox
              id="select-all"
              label="Select All"
              state={selectAllState}
              onChange={(checked) => setSelectAll(checked)}
              className="font-medium"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {TREE.map((root) => renderNode(root))}
        </div>

        {/* Selected chips */}
        <div className="mt-6">
          <h4 className="text-sm text-gray-700 mb-2">Selected</h4>
          <div className="flex flex-wrap gap-2">
            {selectedLabels.length === 0 ? (
              <span className="text-sm text-gray-400">No items selected</span>
            ) : (
              selectedLabels.map((l) => (
                <span
                  key={l}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm"
                >
                  {l}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}