import React, { useEffect, useMemo, useRef, useState } from "react";
import apiClient from "../api/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchUserBar({
  onUserSelect,
  onClear, // to update parent, when input is cleared
  minQueryLength = 2, // min length for search to start
  debounceMs = 300, // optional
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // ✅ keyboard nav

  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const abortRef = useRef(null);

  const debouncedValue = useDebouncedValue(searchInput, debounceMs);
  const query = debouncedValue.trim();

  // Escape-RegEx für Highlighting
  const escapedQuery = useMemo(() => escapeRegExp(query), [query]);

  // Click outside + ESC
  useEffect(() => {
    const onMouseDown = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setIsOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Fetch
  useEffect(() => {
    const fetchUsers = async () => {
      // ✅ min length
      if (!query || query.length < minQueryLength) {
        setSearchResponse([]);
        setIsOpen(false);
        setActiveIndex(-1);
        return;
      }

      // laufenden Request abbrechen
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setIsLoading(true);
        const response = await apiClient.get(
          `admin/user/${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );

        const data = Array.isArray(response.data) ? response.data : [];
        setSearchResponse(data);
        setIsOpen(true);
        setActiveIndex(data.length ? 0 : -1); // ✅ start auf erstem Ergebnis
      } catch (error) {
        if (error?.name === "CanceledError" || error?.name === "AbortError")
          return;
        console.error("Fehler beim Laden:", error);
        setSearchResponse([]);
        setIsOpen(true);
        setActiveIndex(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [query, minQueryLength]);

  // ✅ Active Item in View scrollen
  useEffect(() => {
    const el = itemRefs.current?.[activeIndex];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const hasResults = searchResponse?.length > 0;

  const handleSelect = (user) => {
    setSearchInput(user.userName ?? "");
    setIsOpen(false);
    setActiveIndex(-1);

    onUserSelect?.({
      userName: user.userName,
      userId: user.userId,
      comments: user.comments,
    });
  };

  // ✅ Keyboard Handling
  const onInputKeyDown = (e) => {
    if (!isOpen) {
      // Wenn geschlossen und man navigiert: öffnen
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && hasResults) {
        setIsOpen(true);
        setActiveIndex((prev) => (prev === -1 ? 0 : prev));
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next >= searchResponse.length ? prev : next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? 0 : next;
      });
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < searchResponse.length) {
        e.preventDefault();
        handleSelect(searchResponse[activeIndex]);
      }
    } else if (e.key === "Tab") {
      // UX: beim Tab schließen
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center"
    >
      <label
        htmlFor="userSearch"
        className="block text-lg font-semibold text-primary dark:text-light mb-2"
      >
        Search User
      </label>

      <div className="relative">
        <div className="flex items-center gap-2 border rounded-md bg-white dark:bg-gray-600 transition border-primary dark:border-light focus-within:ring focus-within:ring-dark dark:focus-within:ring-lighter px-3">
          <FontAwesomeIcon
            icon={faSearch}
            className="h-4 text-primary dark:text-light shrink-0"
          />

          <input
            id="userSearch"
            className="flex-1 py-2 bg-transparent focus:outline-none text-gray-800 dark:text-lighter placeholder-gray-400 dark:placeholder-gray-300 min-w-0"
            placeholder={`Search… (min ${minQueryLength})`}
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value;
              setSearchInput(value);

              //Wenn Input geleert wird → Parent informieren
              if (value.trim() === "") {
                onClear?.();
              }
            }}
            onFocus={() => {
              if (query.length >= minQueryLength) setIsOpen(true);
            }}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
            aria-expanded={isOpen}
            aria-controls="userSearchDropdown"
            aria-autocomplete="list"
          />
        </div>

        {isOpen && (
          <div
            id="userSearchDropdown"
            className="
              absolute left-0 right-0 mt-2
              z-50
              rounded-md border border-primary/30 dark:border-light/30
              bg-white dark:bg-gray-700
              shadow-lg
              overflow-hidden
              text-left
            "
          >
            <div ref={listRef} className="max-h-64 overflow-y-auto">
              {isLoading && (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-200">
                  Loading…
                </div>
              )}

              {!isLoading && !hasResults && (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-200">
                  {query.length < minQueryLength
                    ? `Type at least ${minQueryLength} characters.`
                    : "No users found."}
                </div>
              )}

              {!isLoading &&
                hasResults &&
                searchResponse.map((u, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={u.userId}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)} // ✅ hover sync
                      onClick={() => handleSelect(u)}
                      className={[
                        "w-full px-4 py-3 text-left",
                        "hover:bg-gray-100 dark:hover:bg-gray-600",
                        "focus:outline-none",
                        "border-b last:border-b-0 border-gray-100 dark:border-gray-600",
                        isActive ? "bg-gray-100 dark:bg-gray-600" : "",
                      ].join(" ")}
                      role="option"
                      aria-selected={isActive}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 dark:text-lighter truncate">
                          {/* ✅ Highlighting userName */}
                          <HighlightedText
                            text={u.userName ?? ""}
                            query={escapedQuery}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Debounce Hook */
function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}

/** Escape RegExp */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** ✅ Highlight Komponente (ohne dangerouslySetInnerHTML) */
function HighlightedText({ text, query }) {
  if (!query) return text;

  try {
    const re = new RegExp(`(${query})`, "ig");
    const parts = String(text).split(re);

    return parts.map((part, i) => {
      const isMatch = re.test(part);
      // re.test ist stateful bei /g, deswegen neu bauen:
      const isHit = part.toLowerCase() === query.toLowerCase();
      return isHit ? (
        <mark
          key={i}
          className="px-0.5 rounded bg-yellow-200/70 dark:bg-yellow-400/30 text-inherit"
        >
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  } catch {
    return text;
  }
}
