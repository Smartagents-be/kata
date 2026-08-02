import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING } from "../layout";
import { colors, fonts } from "../theme";

/**
 * The motion vocabulary. Four things move in this video and they all live here: words arriving,
 * a block landing, a cursor blinking, and the grid drifting behind everything.
 *
 * Every entrance is a spring. Nothing fades linearly, and nothing eases in and out, because both
 * of those read as a slide deck.
 */

/**
 * Text that reveals a word at a time: each word rises into place and resolves from blurred to
 * sharp. The stagger is small on purpose, so a headline still lands as one phrase.
 */
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", ...style }}>
      {text.split(" ").map((word, i) => {
        const progress = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: SPRING,
        });

        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              marginRight: "0.3em",
              opacity: Math.min(1, Math.max(0, progress)),
              translate: `0px ${Math.max(0, 1 - progress) * 26}px`,
              filter: `blur(${Math.max(0, 1 - progress) * 9}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * A block that springs in: up from below, slightly under size, settling past its mark. Anything
 * that is not text uses this, so a chip and a diagram arrive the same way.
 */
export const SpringIn: React.FC<{
  delay?: number;
  rise?: number;
  from?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, rise = 24, from = 0.92, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: SPRING });

  return (
    <div
      style={{
        opacity: Math.min(1, Math.max(0, progress)),
        translate: `0px ${(1 - progress) * rise}px`,
        scale: from + (1 - from) * progress,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** The block cursor. It never stops, which is what keeps a quiet scene from sitting still. */
export const Caret: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ width = 16, height = 34, color = colors.primary, style }) => {
  const frame = useCurrentFrame();

  return (
    <span
      style={{
        display: "inline-block",
        width,
        height,
        backgroundColor: color,
        verticalAlign: "text-bottom",
        opacity: frame % 30 < 17 ? 1 : 0.15,
        ...style,
      }}
    />
  );
};

/**
 * The dot grid behind every scene, drifting a pixel a second. It is the secondary motion of last
 * resort: whatever else a scene is doing, the frame is never completely still.
 */
export const DotGrid: React.FC<{ opacity?: number; dark?: boolean }> = ({
  opacity = 1,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.35;

  return (
    <div
      style={{
        position: "absolute",
        inset: -60,
        opacity,
        backgroundImage: `radial-gradient(${
          dark ? "oklch(0.5 0.03 195 / 0.5)" : "oklch(0.72 0.03 195 / 0.55)"
        } 1.5px, transparent 1.5px)`,
        backgroundSize: "48px 48px",
        backgroundPosition: `${drift}px ${drift * 0.6}px`,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 78%)",
      }}
    />
  );
};

/** A machine-set label above a heading. Uppercase, tracked out, monospace, never below 28px. */
export const Label: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = colors.primary, style }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 28,
      fontWeight: 500,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * A line that draws itself. Connectors, checks and arcs are all one path with the dash pulled off
 * it, so they share a timing curve and read as one hand drawing them.
 */
export const DrawnPath: React.FC<{
  d: string;
  length: number;
  from: number;
  to: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}> = ({ d, length, from, to, stroke = colors.primary, strokeWidth = 2.5, opacity = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={opacity}
      strokeDasharray={length}
      strokeDashoffset={interpolate(frame, [from, to], [length, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      })}
    />
  );
};
