"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scales a fixed-width child down to fit the available container width on
 * narrow screens (instead of forcing horizontal scroll). Never scales up
 * past 1 on wide screens.
 */
export default function ScaleToFit({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function update() {
      if (!outerRef.current || !innerRef.current) return;
      const outerWidth = outerRef.current.offsetWidth;
      const s = Math.min(1, outerWidth / width);
      setScale(s);
      setHeight(innerRef.current.scrollHeight * s);
    }

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [width]);

  return (
    <div ref={outerRef} style={{ height }}>
      <div
        ref={innerRef}
        style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
