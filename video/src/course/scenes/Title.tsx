import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../../components/Chrome";
import { Logo } from "../../components/Logo";
import { SpringIn, WordReveal } from "../../components/Motion";
import { colors, fonts } from "../../theme";

/**
 * The opening card. Deep teal, the mark drawing itself, the course's name, and one line saying
 * what the course is for. Nothing else: whoever is watching has not agreed to anything yet.
 */
export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage dark>
      {/* The one light source in the piece, behind the name. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 58% 46% at 50% 44%, oklch(0.35 0.075 183), transparent 70%)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          paddingBottom: 12,
        }}
      >
        <Logo size={56} progress={logo} gradientId="title-logo" color={colors.headerFg} />

        <WordReveal
          text="Agentic engineering course and kata"
          delay={4}
          stagger={4}
          style={{
            width: 1240,
            justifyContent: "center",
            textAlign: "center",
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: colors.headerFg,
          }}
        />

        <SpringIn delay={54} rise={14} from={0.96} style={{ width: 340 }}>
          <div style={{ height: 2, backgroundColor: "oklch(0.62 0.08 185)" }} />
        </SpringIn>

        <SpringIn delay={60} rise={18}>
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 34,
              color: "oklch(0.84 0.03 185)",
            }}
          >
            Learn to direct a coding agent, on a codebase.
          </div>
        </SpringIn>
      </AbsoluteFill>
    </Stage>
  );
};
