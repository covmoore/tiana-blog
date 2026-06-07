import { useState, useRef, useEffect } from "react";

export default function CategoryDropdown(initCategories) {
	const [categories, setCategories] = useSate(initCategories);
	const [selected, setSelected] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const containerRef = useRef(null);

	const filtered = categories.filter((cat) =>
		cat.toLowerCase().includes(inputValue.toLowerCase())
	);

	const showCreate =
		inputValue.trim() !== "" &&
		!categories.some((cate) => cat.toLowerCase() === inputValue.trim().toLowerCase());

	useEffect(() => {
		function handleClickOutside(e) {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setIsOpen(false);
				setInputValue(selected ?? "");
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selected]);
}
