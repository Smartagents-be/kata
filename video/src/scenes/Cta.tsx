import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Chrome";
import { DotGrid, WordReveal } from "../components/Motion";
import { SPRING_HEAVY, MARGIN } from "../layout";
import { colors, fonts } from "../theme";
import { Logo } from "../components/Logo";

/**
 * The close. The mark draws itself, the course says its own name, and the last line is the one
 * worth leaving on screen.
 *
 * The bar along the bottom reaches the end under this card, so the video finishes the way the
 * agent in it did.
 */

export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Stage>
      <DotGrid opacity={0.5} />

      <div
        style={{
          position: "absolute",
          inset: `0 ${MARGIN}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 46,
        }}
      >
        <Logo
          size={104}
          progress={interpolate(frame, [4, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          gradientId="cta-mark"
          color={colors.foreground}
          gap={26}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <WordReveal
            text="Agentic Engineering."
            delay={40}
            stagger={4}
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: colors.foreground,
              justifyContent: "center",
            }}
          />
          <WordReveal
            text="Build agents that build."
            delay={56}
            stagger={3}
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: colors.primary,
              justifyContent: "center",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 38,
            letterSpacing: "0.02em",
            color: colors.mutedFg,
            opacity: Math.min(1, spring({ frame: frame - 78, fps, config: SPRING_HEAVY })),
            translate: `0px ${
              (1 - Math.min(1, spring({ frame: frame - 78, fps, config: SPRING_HEAVY }))) * 18
            }px`,
          }}
        >
          smartagents.be
        </div>
      </div>
    </Stage>
  );
};
