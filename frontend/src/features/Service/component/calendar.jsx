import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Alugold design tokens (mirrors Tailwind config) ──────────────────────────
const TOKEN = {
  primary: "#735c00",
  primaryContainer: "#d4af37",
  onPrimaryContainer: "#554300",
  primaryFixedDim: "#e9c349",
  surfaceContainerLow: "#f3f3f4",
  surfaceContainerHigh: "#e8e8e8",
  outlineVariant: "#d0c5af",
  outline: "#7f7663",
  secondary: "#5f5e5e",
  onSurface: "#1a1c1c",
  white: "#ffffff",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"]; // Mon-first

/** Returns the weekday index (Mon=0 … Sun=6) for the 1st of the given month. */
function firstWeekday(year, month) {
  const d = new Date(year, month, 1).getDay(); // Sun=0
  return (d + 6) % 7; // shift so Mon=0
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function daysInPrevMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * BookingCalendar
 *
 * Props:
 *   value        – Date | null   currently selected date
 *   onChange     – (Date) => void
 *   minDate      – Date          earliest selectable date (defaults to today)
 *   disabledDates – Date[]       explicit disabled dates
 */
export default function BookingCalendar({
  value = null,
  onChange,
  minDate,
  disabledDates = [],
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const floor = minDate ?? today;

  // Initialise view to the month of the selected value or today
  const [viewYear, setViewYear] = useState(
    value ? value.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    value ? value.getMonth() : today.getMonth()
  );

  // ── Navigation ──────────────────────────────────────────────────────────────
  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  // Block navigating before the floor month
  const canGoPrev =
    viewYear > floor.getFullYear() ||
    (viewYear === floor.getFullYear() && viewMonth > floor.getMonth());

  // ── Grid construction ───────────────────────────────────────────────────────
  const { cells } = useMemo(() => {
    const offset = firstWeekday(viewYear, viewMonth);
    const total  = daysInMonth(viewYear, viewMonth);
    const prevTotal = daysInPrevMonth(viewYear, viewMonth);

    const cells = [];

    // trailing days from previous month
    for (let i = offset - 1; i >= 0; i--) {
      cells.push({ day: prevTotal - i, type: "prev" });
    }
    // current month
    for (let d = 1; d <= total; d++) {
      cells.push({ day: d, type: "current" });
    }
    // leading days of next month to fill rows
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      for (let d = 1; d <= 7 - remainder; d++) {
        cells.push({ day: d, type: "next" });
      }
    }

    return { cells };
  }, [viewYear, viewMonth]);

  // ── Helpers for a cell ──────────────────────────────────────────────────────
  function cellDate(cell) {
    if (cell.type === "prev") {
      return new Date(viewYear, viewMonth - 1, cell.day);
    }
    if (cell.type === "next") {
      return new Date(viewYear, viewMonth + 1, cell.day);
    }
    return new Date(viewYear, viewMonth, cell.day);
  }

  function isDisabled(cell) {
    if (cell.type !== "current") return true;
    const d = cellDate(cell);
    if (d < floor) return true;
    return disabledDates.some(dd => isSameDay(dd, d));
  }

  function isSelected(cell) {
    if (!value || cell.type !== "current") return false;
    return isSameDay(cellDate(cell), value);
  }

  function isToday(cell) {
    if (cell.type !== "current") return false;
    return isSameDay(cellDate(cell), today);
  }

  function handleSelect(cell) {
    if (isDisabled(cell)) return;
    onChange?.(cellDate(cell));
  }

  // ── Styles (inline, no Tailwind dependency) ─────────────────────────────────
  const s = {
    wrapper: {
      background: TOKEN.surfaceContainerLow,
      border: `1px solid ${TOKEN.outlineVariant}`,
      padding: "16px",
      fontFamily: "Inter, sans-serif",
      userSelect: "none",
      minWidth: 260,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    monthLabel: {
      fontFamily: "Metropolis, sans-serif",
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.4,
      color: TOKEN.onSurface,
    },
    navGroup: { display: "flex", gap: 4 },
    navBtn: (disabled) => ({
      background: "none",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      padding: 4,
      color: disabled ? TOKEN.outlineVariant : TOKEN.onSurface,
      display: "flex",
      alignItems: "center",
      borderRadius: 2,
      transition: "color 0.15s",
    }),
    weekRow: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      textAlign: "center",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: TOKEN.secondary,
      marginBottom: 8,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 2,
      textAlign: "center",
    },
    cell: (cell) => {
      const disabled  = isDisabled(cell);
      const selected  = isSelected(cell);
      const todayFlag = isToday(cell);
      const overflow  = cell.type !== "current";

      let bg        = "transparent";
      let color     = TOKEN.onSurface;
      let border    = "1px solid transparent";
      let cursor    = "pointer";
      let opacity   = 1;
      let fontWeight = 400;

      if (overflow)  { color = TOKEN.outline; opacity = 0.35; cursor = "default"; }
      if (todayFlag) { border = `1px solid ${TOKEN.primaryContainer}`; fontWeight = 700; }
      if (disabled && !overflow) { color = TOKEN.outline; opacity = 0.4; cursor = "not-allowed"; }
      if (selected)  {
        bg = TOKEN.primaryContainer;
        color = TOKEN.white;
        border = "1px solid transparent";
        fontWeight = 700;
      }

      return {
        padding: "8px 4px",
        fontSize: 14,
        lineHeight: 1,
        background: bg,
        color,
        border,
        cursor,
        opacity,
        fontWeight,
        borderRadius: 2,
        transition: "background 0.15s, color 0.15s",
      };
    },
  };

  // ── Hover state via JS (no Tailwind) ────────────────────────────────────────
  const [hovered, setHovered] = useState(null);

  function cellStyle(cell, idx) {
    const base = s.cell(cell);
    const disabled = isDisabled(cell);
    const selected = isSelected(cell);
    if (!disabled && !selected && hovered === idx) {
      return {
        ...base,
        background: TOKEN.surfaceContainerHigh,
      };
    }
    return base;
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={s.wrapper}>
      {/* Header */}
      <div style={s.header}>
        <span style={s.monthLabel}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div style={s.navGroup}>
          <button
            style={s.navBtn(!canGoPrev)}
            onClick={canGoPrev ? prevMonth : undefined}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            style={s.navBtn(false)}
            onClick={nextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Day-of-week labels */}
      <div style={s.weekRow}>
        {DAYS_OF_WEEK.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div style={s.grid}>
        {cells.map((cell, idx) => (
          <div
            key={idx}
            style={cellStyle(cell, idx)}
            onClick={() => handleSelect(cell)}
            onMouseEnter={() => !isDisabled(cell) && setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            role={isDisabled(cell) ? undefined : "button"}
            aria-label={
              cell.type === "current"
                ? `${cell.day} ${MONTH_NAMES[viewMonth]} ${viewYear}`
                : undefined
            }
            aria-pressed={isSelected(cell) || undefined}
            aria-disabled={isDisabled(cell) || undefined}
          >
            {cell.day}
          </div>
        ))}
      </div>

      {/* Selected date readout */}
      {value && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${TOKEN.outlineVariant}`,
            fontSize: 10,
            letterSpacing: "0.1em",
            fontWeight: 700,
            color: TOKEN.primary,
            fontFamily: "Inter, sans-serif",
          }}
        >
          SELECTED:{" "}
          {value.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).toUpperCase()}
        </div>
      )}
    </div>
  );
}

// ─── Demo wrapper (remove in production) ─────────────────────────────────────
export function BookingCalendarDemo() {
  const [date, setDate] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 32,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Google Fonts for demo */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Metropolis:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div style={{ fontSize: 10, letterSpacing: "0.1em", fontWeight: 700, color: "#735c00" }}>
        02. PREFERRED DATE
      </div>

      <BookingCalendar value={date} onChange={setDate} />

      <div style={{ fontSize: 12, color: "#5f5e5e", marginTop: 8 }}>
        {date
          ? `onChange fired → ${date.toISOString().slice(0, 10)}`
          : "No date selected yet"}
      </div>
    </div>
  );
}

