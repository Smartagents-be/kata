import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../../components/Chrome";
import { Logo } from "../../components/Logo";
import { WordReveal } from "../../components/Motion";
import { colors } from "../../theme";

/**
 * The closing card. One sentence and the mark, on the same teal the piece opened on, so the last
 * frame answers the first one.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = interpolate(frame, [50, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage dark>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.33 0.07 183), transparent 70%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 54 }}>
        <WordReveal
          text="Learn it by building"
          stagger={4}
          style={{
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: colors.headerFg,
          }}
        />

        <Logo size={48} progress={logo} gradientId="outro-logo" color={colors.headerFg} />
      </AbsoluteFill>
    </Stage>
  );
};
