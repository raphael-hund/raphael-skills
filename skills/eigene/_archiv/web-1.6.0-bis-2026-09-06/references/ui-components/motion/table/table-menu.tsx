"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TableMenuItem = {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  destructive?: boolean;
};

const MENU_WIDTH = 188;

export function TableMenu({
  items,
  ariaLabel,
  trigger,
  triggerClassName,
}: {
  items: TableMenuItem[];
  ariaLabel: string;
  trigger: ReactNode;
  triggerClassName?: string;
}) {
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  // Roving tabindex: exactly one item is tabbable, the arrows move which one.
  // -1 means "menu open, nothing focused yet" (pointer users never leave it).
  const [aktiv, setAktiv] = useState(-1);
  const open = coords !== null;

  // Close and hand focus back to the trigger. Without the second half, keyboard
  // users land at the top of the document after every menu use.
  const close = (fokusZurueck = false) => {
    setCoords(null);
    setAktiv(-1);
    if (fokusZurueck) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const wegKlicken = () => close();
    // A `role="menu"` promises the WAI-ARIA menu pattern: arrows move between
    // items, Home/End jump, Escape closes. This component kept the promise only
    // for Escape until 29.07.2026 — the roles were correct, so axe stayed green
    // and nothing flagged it. A role is a promise to screen-reader users; giving
    // it without the keys is worse than a plain button list, because the user now
    // knows what it should be and still cannot get through.
    const onKey = (e: KeyboardEvent) => {
      const n = items.length;
      if (n === 0) return;
      switch (e.key) {
        case "Escape":
          close(true);
          return;
        case "ArrowDown":
          e.preventDefault();
          setAktiv((i) => (i + 1) % n);
          return;
        case "ArrowUp":
          e.preventDefault();
          setAktiv((i) => (i <= 0 ? n - 1 : i - 1));
          return;
        case "Home":
          e.preventDefault();
          setAktiv(0);
          return;
        case "End":
          e.preventDefault();
          setAktiv(n - 1);
          return;
        case "Tab":
          // Tab out of a menu closes it — that is the pattern, not a shortcut.
          close();
          return;
        default:
          return;
      }
    };
    // Close on any scroll (the trigger moves) or resize; fixed coords go stale.
    window.addEventListener("scroll", wegKlicken, true);
    window.addEventListener("resize", wegKlicken);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", wegKlicken, true);
      window.removeEventListener("resize", wegKlicken);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  // Move real DOM focus to the active item. The visible focus ring has to follow
  // the arrows, otherwise the user is navigating blind.
  useEffect(() => {
    if (open && aktiv >= 0) itemRefs.current[aktiv]?.focus();
  }, [open, aktiv]);

  const toggle = () => {
    if (open) {
      setCoords(null);
      return;
    }
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({
      top: r.bottom + 4,
      left: Math.max(8, r.right - MENU_WIDTH),
    });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        // ArrowDown on the trigger opens the menu AND lands on the first item —
        // the pattern's standard entry. Without it a keyboard user opens the
        // menu with Enter and then has to guess that arrows now work.
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) toggle();
            setAktiv(e.key === "ArrowDown" ? 0 : items.length - 1);
          }
        }}
        className={triggerClassName}
      >
        {trigger}
      </button>
      {open && typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-40"
                onPointerDown={() => setCoords(null)}
              />
              <motion.div
                role="menu"
                className="fixed z-50 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl"
                style={{ top: coords.top, left: coords.left, width: MENU_WIDTH }}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }
                }
                animate={
                  reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
                }
                transition={reduce ? { duration: 0 } : SPRING_PANEL}
              >
                {items.map((item, i) => (
                  <button
                    key={item.label}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitem"
                    // Roving tabindex: only the active item is reachable by Tab,
                    // so Tab leaves the menu instead of walking through it.
                    tabIndex={i === aktiv || (aktiv === -1 && i === 0) ? 0 : -1}
                    onClick={() => {
                      close(true);
                      item.onSelect();
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors [&_svg]:h-4 [&_svg]:w-4",
                      item.destructive
                        ? "text-rose-500 hover:bg-rose-500/10"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </motion.div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
