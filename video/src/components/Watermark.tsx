import React from "react";
import { AbsoluteFill } from "remotion";
import { LogoMark } from "./Logo";
import { fonts } from "../theme";

/**
 * The copyright, bottom right, on every frame of a finished piece. It sits at the composition
 * level rather than in a scene, so it survives every cut and a scene previewed on its own does
 * not carry one.
 *
 * The tone is deliberately mid-grey: this rides over the light scenes and the two deep teal ones
 * alike, so it cannot take a colour from either without disappearing into the other. The mark is
 * drawn at full progress, because a watermark does not animate.
 */
export const Watermark: React.FC<{
  /** Unique per instance: two gradients with the same id on one page resolve to the first. */
  gradientId: string;
}> = ({ gradientId }) => (
  <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 40px 24px 0",
        opacity: 0.75,
      }}
    >
      <LogoMark size={26} progress={1} gradientId={gradientId} />
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 22,
          fontWeight: 500,
          color: "oklch(0.63 0.02 195)",
        }}
      >
        © 2026 SmartAgents.be
      </div>
    </div>
  </AbsoluteFill>
);
