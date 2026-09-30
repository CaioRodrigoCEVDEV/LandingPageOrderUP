import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  labelledBy,
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const rootRef = useRef(null);
  const optionRefs = useRef([]);
  const generatedId = useId();
  const selectId = id || generatedId;
  const listId = `${selectId}-listbox`;

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && highlighted >= 0 && optionRefs.current[highlighted]) {
      optionRefs.current[highlighted].scrollIntoView({ block: "nearest" });
    }
  }, [open, highlighted]);

  const openList = () => {
    const currentIndex = options.indexOf(value);
    setHighlighted(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
  };

  const toggleList = () => {
    if (open) {
      setOpen(false);
    } else {
      openList();
    }
  };

  const selectOption = (option) => {
    onChange(option);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) {
          if (highlighted >= 0) selectOption(options[highlighted]);
        } else {
          openList();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (open) {
          setHighlighted((index) => Math.min(index + 1, options.length - 1));
        } else {
          openList();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) {
          setHighlighted((index) => Math.max(index - 1, 0));
        } else {
          openList();
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const hasValue = value !== "" && value != null;

  return (
    <div className="custom-select" ref={rootRef}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={() => {}}
        required={required}
        tabIndex={-1}
        aria-label={placeholder}
        onFocus={openList}
        className="custom-select__native"
      />
      <button
        type="button"
        id={selectId}
        className={`custom-select__trigger ${open ? "is-open" : ""}`}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-labelledby={labelledBy}
        aria-required={required}
        aria-disabled="false"
        aria-activedescendant={
          open && highlighted >= 0 ? `${selectId}-option-${highlighted}` : undefined
        }
        onClick={toggleList}
        onKeyDown={handleKeyDown}
      >
        <span className={`custom-select__value ${hasValue ? "" : "is-placeholder"}`}>
          {hasValue ? value : placeholder}
        </span>
        <span className="custom-select__chevron">
          <Icon name="chevron" size={18} />
        </span>
      </button>
      {open ? (
        <ul className="custom-select__list" id={listId} role="listbox" aria-labelledby={labelledBy}>
          {options.map((option, index) => {
            const selected = option === value;
            const isHighlighted = index === highlighted;
            return (
              <li
                key={option}
                id={`${selectId}-option-${index}`}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                role="option"
                aria-selected={selected}
                className={`custom-select__option ${isHighlighted ? "is-highlighted" : ""} ${
                  selected ? "is-selected" : ""
                }`}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => selectOption(option)}
              >
                <span>{option}</span>
                {selected ? (
                  <span className="custom-select__check">
                    <Icon name="check" size={16} />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
