import { useState, useRef, useEffect } from "react";

export default function CreatableSelect({ initialCategories, setCategory }) {
  const [categories, setCategories] = useState(initialCategories ?? []);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filtered = categories.filter(({ categoryName }) =>
    categoryName.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showCreate =
    inputValue.trim() !== "" &&
    !categories.some(({ categoryName }) => categoryName.toLowerCase() === inputValue.trim().toLowerCase());

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setInputValue(selected?.categoryName ?? "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  useEffect(() => {
    if (initialCategories) setCategories(initialCategories);
  }, [initialCategories]);

  function handleSelect(value) {
    setSelected(value);
    setInputValue(value.categoryName);
    setIsOpen(false);
    setCategory(value)
  }

  function handleCreate() {
    const newCategory = { categoryId: null, categoryName: inputValue.trim() };
    setCategories((prev) => [...prev, newCategory]);
    handleSelect(newCategory);
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
    setIsOpen(true);
    if (e.target.value === "") setSelected(null);
  }

  function handleClear() {
    setSelected(null);
    setInputValue("");
    setIsOpen(false);
  }

  return (
    <div>
      <div ref={containerRef} style={styles.container}>
        <div style={styles.inputWrapper}>
          <input
            style={styles.input}
            type="text"
            placeholder="Search or create a category..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
          />
          {inputValue && (
            <button style={styles.clearBtn} onClick={handleClear} aria-label="Clear">
              ✕
            </button>
          )}
          <button
            style={styles.chevron}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle dropdown"
          >
            {isOpen ? "▲" : "▼"}
          </button>
        </div>

        {isOpen && (
          <ul style={styles.dropdown}>
            {filtered.length === 0 && !showCreate && (
              <li style={styles.noResults}>No results found</li>
            )}
            {filtered.map((cat) => (
              <li
                key={cat.categoryId}
                style={{
                  ...styles.option,
                  ...(cat.categoryId === selected?.categoryId ? styles.selectedOption : {}),
                }}
                onMouseDown={() => handleSelect(cat)}
              >
                {cat.categoryName}
                {cat.categoryId === selected?.categoryId && <span style={styles.checkmark}>✓</span>}
              </li>
            ))}
            {showCreate && (
              <li style={styles.createOption} onMouseDown={handleCreate}>
                + Create "<strong>{inputValue.trim()}</strong>"
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: "24px",
    color: "#333",
  },
  container: {
    position: "relative",
    width: "340px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 12px",
    fontSize: "15px",
    background: "transparent",
  },
  clearBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "13px",
    padding: "0 6px",
  },
  chevron: {
    background: "none",
    border: "none",
    borderLeft: "1px solid #eee",
    cursor: "pointer",
    color: "#666",
    fontSize: "11px",
    padding: "0 12px",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    listStyle: "none",
    margin: 0,
    padding: "4px 0",
    zIndex: 100,
    maxHeight: "220px",
    overflowY: "auto",
  },
  option: {
    padding: "10px 14px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#333",
    transition: "background 0.1s",
  },
  selectedOption: {
    background: "#eef4ff",
    color: "#2563eb",
    fontWeight: "600",
  },
  checkmark: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  createOption: {
    padding: "10px 14px",
    cursor: "pointer",
    color: "#16a34a",
    fontSize: "14px",
    borderTop: "1px solid #f0f0f0",
  },
  noResults: {
    padding: "10px 14px",
    color: "#aaa",
    fontSize: "14px",
  },
  result: {
    marginTop: "20px",
    color: "#555",
    fontSize: "15px",
  },
};
