"use client";

import { motion, MotionConfig, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

type RadioCtx = {
  value: string;
  setValue: (value: string) => void;
  layoutId: string;
};

const RadioCtx = createContext<RadioCtx | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioCtx);
  if (!ctx) {
    throw new Error("RadioGroupItem must be used inside <RadioGroup>");
  }
  return ctx;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  value,
  defaultValue = "",
  onValueChange,
  children,
  className,
  orientation = "vertical",
}: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const layoutId = useId();
  const reduce = useReducedMotion();
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const setValue = useCallback(
    (next: string) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );
  const contextValue = useMemo(
    () => ({ value: current, setValue, layoutId }),
    [current, layoutId, setValue],
  );

  // Tastaturbedienung fuer das radiogroup-Pattern (WAI-ARIA). Bis 29.07.2026
  // fehlte sie: role="radio" war gesetzt, aria-checked stimmte, axe war gruen —
  // und mit der Tastatur liess sich nichts auswaehlen. Bei einer Radiogruppe
  // ist das besonders bitter, weil ein natives <input type="radio"> das seit
  // jeher kann; der Nachbau hat eine Faehigkeit weggenommen.
  //
  // Alle vier Pfeile, weil die Gruppe waagerecht ODER senkrecht steht. Die
  // Auswahl folgt dem Fokus (so schreibt es das Pattern fuer radiogroup vor,
  // anders als bei Tabs mit manueller Aktivierung).

  // Leere Gruppe erreichbar halten: ist nichts ausgewaehlt, steht jeder Knopf
  // auf tabIndex=-1 und die Gruppe fiele aus der Tab-Reihenfolge. Das Pattern
  // verlangt in diesem Fall den ERSTEN Knopf als Einstieg.
  const gruppeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const g = gruppeRef.current;
    if (!g) return;
    const knoepfe = [...g.querySelectorAll<HTMLButtonElement>('[data-roving]')];
    if (!knoepfe.length) return;
    if (knoepfe.some((b) => b.tabIndex === 0)) return;   // Auswahl vorhanden
    const ersterAktiver = knoepfe.find((b) => !b.disabled);
    if (ersterAktiver) ersterAktiver.tabIndex = 0;
  }, [current]);

  const aufTaste = (e: KeyboardEvent<HTMLDivElement>) => {
    const vor = ['ArrowDown', 'ArrowRight'];
    const zurueck = ['ArrowUp', 'ArrowLeft'];
    if (![...vor, ...zurueck].includes(e.key)) return;
    const gruppe = e.currentTarget;
    const knoepfe = [...gruppe.querySelectorAll<HTMLButtonElement>('[role="radio"]')]
      .filter((b) => !b.disabled);
    if (!knoepfe.length) return;
    const jetzt = knoepfe.indexOf(document.activeElement as HTMLButtonElement);
    if (jetzt < 0) return;

    const ziel = vor.includes(e.key)
      ? (jetzt + 1) % knoepfe.length
      : (jetzt - 1 + knoepfe.length) % knoepfe.length;

    e.preventDefault();          // sonst scrollt die Seite mit
    knoepfe[ziel].focus();
    knoepfe[ziel].click();       // Auswahl folgt dem Fokus
  };

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : SPRING_LAYOUT}>
      <RadioCtx.Provider value={contextValue}>
        <div
          ref={gruppeRef}
          role="radiogroup"
          onKeyDown={aufTaste}
          className={cn(
            "flex gap-3",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
            className,
          )}
        >
          {children}
        </div>
      </RadioCtx.Provider>
    </MotionConfig>
  );
}

export interface RadioGroupItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function RadioGroupItem({
  value,
  label,
  disabled,
  className,
  id: idProp,
}: RadioGroupItemProps) {
  const { value: groupValue, setValue, layoutId } = useRadioGroup();
  const autoId = useId();
  const id = idProp ?? autoId;
  const reduce = useReducedMotion();
  const selected = groupValue === value;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-3",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <motion.button
        id={id}
        type="button"
        role="radio"
        aria-checked={selected}
        // Roving Tabindex: die Gruppe ist EIN Halt in der Tab-Reihenfolge, nicht
        // fuenf. Innerhalb bewegt man sich mit den Pfeilen. Genauso verhaelt
        // sich ein natives <input type="radio">.
        //
        // `data-roving` markiert die Knoepfe fuer den Container: ist NICHTS
        // ausgewaehlt, haette sonst kein einziger tabIndex=0 und die Gruppe
        // waere per Tastatur gar nicht erreichbar — ein Fix, der schlimmer ist
        // als der Fehler. Der Container setzt dann den ersten auf 0.
        data-roving=""
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && setValue(value)}
        whileTap={reduce || disabled ? undefined : { scale: 0.92 }}
        transition={SPRING_PRESS}
        data-state={selected ? "checked" : "unchecked"}
        className={cn(
          "relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 outline-none transition-colors duration-200",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-60",
          selected
            ? "border-primary"
            : "border-muted-foreground/50 hover:border-muted-foreground",
        )}
      >
        {selected ? (
          <motion.span
            layoutId={layoutId}
            className="absolute inset-1 rounded-full bg-primary"
            transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          />
        ) : null}
      </motion.button>
      {label ? (
        <span className={cn("select-none text-sm text-foreground", disabled && "opacity-60")}>
          {label}
        </span>
      ) : null}
    </label>
  );
}
