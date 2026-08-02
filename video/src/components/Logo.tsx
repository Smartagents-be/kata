import React from "react";
import { Easing, interpolate } from "remotion";
import { fonts } from "../theme";

/**
 * The SmartAgents mark, from `smartagents.be/assets/logo.svg`, rebuilt inline so it can draw
 * itself: the connections stroke on, then the nodes land from the controller down to the output.
 * The gradient is the brand's own cyan to blue, untouched, because it is the one part of this
 * video that is not ours to restyle.
 *
 * `progress` runs 0 to 1 and the caller drives it, so a scene decides the timing and this file
 * only decides the order things arrive in.
 */

/** Where each node sits, in the mark's 48x48 coordinates, in the order they should land. */
const NODES = [
  { cx: 24, cy: 8, r: 4 },
  { cx: 12, cy: 20, r: 3 },
  { cx: 36, cy: 20, r: 3 },
  { cx: 24, cy: 24, r: 3.5 },
  { cx: 12, cy: 32, r: 2.5 },
  { cx: 36, cy: 32, r: 2.5 },
  { cx: 24, cy: 40, r: 3 },
] as const;

const EDGES = [
  [24, 8, 12, 20],
  [24, 8, 36, 20],
  [12, 20, 24, 24],
  [36, 20, 24, 24],
  [12, 20, 12, 32],
  [36, 20, 36, 32],
  [24, 24, 24, 40],
  [12, 32, 24, 40],
  [36, 32, 24, 40],
] as const;

/** Longer than any edge in the mark, so one dash covers a whole line and can be pulled off it. */
const DASH = 24;

export const LogoMark: React.FC<{
  size: number;
  progress: number;
  /** Unique per instance: two gradients with the same id on one page resolve to the first. */
  gradientId: string;
}> = ({ size, progress, gradientId }) => {
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d8ff" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#4f6cf7" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${gradientId})`} strokeWidth={1.5} fill="none" opacity={0.6}>
        {EDGES.map(([x1, y1, x2, y2], i) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeDasharray={DASH}
            strokeDashoffset={interpolate(
              progress,
              [0.05 + i * 0.035, 0.35 + i * 0.035],
              [DASH, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
            )}
          />
        ))}
      </g>

      <g fill={`url(#${gradientId})`}>
        {NODES.map((node, i) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={
              node.r *
              interpolate(progress, [0.25 + i * 0.045, 0.6 + i * 0.045], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1.5, 0.3, 1),
              })
            }
          />
        ))}
      </g>

      {/* The ring around the controller node, expanding into place last. */}
      <circle
        cx={24}
        cy={8}
        r={interpolate(progress, [0.55, 0.95], [3, 6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1}
        opacity={interpolate(progress, [0.55, 0.95], [0, 0.4], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </svg>
  );
};

/**
 * The mark and the wordmark together. The site sets "SmartAgents" as one compound word with both
 * capitals, so that is how it is written here.
 */
export const Logo: React.FC<{
  size: number;
  progress: number;
  gradientId: string;
  color: string;
  gap?: number;
}> = ({ size, progress, gradientId, color, gap = 20 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      <LogoMark size={size} progress={progress} gradientId={gradientId} />
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: size * 0.52,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          color,
          opacity: interpolate(progress, [0.5, 0.9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(progress, [0.5, 0.9], ["-10px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        SmartAgents
      </div>
    </div>
  );
};
