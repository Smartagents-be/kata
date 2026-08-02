import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/**
 * The bar along the bottom edge, filling once across a whole piece. It is the agent's own task
 * bar: it reaches the end as the closing card lands, and flashes once when it gets there.
 *
 * It belongs to a piece rather than to any scene, so a scene previewed on its own does not have
 * one. Both compositions use it, which is why it lives here rather than in either of them.
 */
export const ProgressBar: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const done = total - 12;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 6, width: "100%", backgroundColor: colors.border }}>
        <div
          style={{
            height: "100%",
            backgroundColor: colors.primary,
            width: `${interpolate(frame, [0, done], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 6,
          backgroundColor: colors.primary,
          opacity: interpolate(frame, [done, done + 5, done + 16], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "blur(6px)",
          scale: "1 3",
        }}
      />
    </AbsoluteFill>
  );
};
