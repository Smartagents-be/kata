import React from "react";
import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Chrome";
import { DotGrid, DrawnPath, Label, SpringIn, WordReveal } from "../components/Motion";
import { MARGIN } from "../layout";
import { colors, fonts, hairline, radius } from "../theme";

/**
 * What a student is at the end of it. The line springs in whole, then the three chips arrive one
 * after another, close enough together to read as one row landing.
 *
 * There are no figures on this card on purpose. A promise with a number in it is a promise about
 * a course that is still being written.
 */

const CHIPS = ["Hands-on projects", "Production patterns", "Portfolio-ready capstone"] as const;

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage>
      <DotGrid opacity={0.45} />

      <div
        style={{
          position: "absolute",
          inset: `0 ${MARGIN}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 76,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Label style={{ marginBottom: 30 }}>The outcome</Label>

          <WordReveal
            text="From student to agent engineer."
            delay={8}
            stagger={3}
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: colors.foreground,
              justifyContent: "center",
              textAlign: "center",
            }}
          />

          <svg width={520} height={12} style={{ marginTop: 10 }}>
            <DrawnPath
              d="M 6 6 L 514 6"
              length={508}
              from={38}
              to={66}
              stroke={colors.primary}
              strokeWidth={5}
            />
          </svg>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {CHIPS.map((chip, i) => (
            <SpringIn key={chip} delay={54 + i * 6} rise={30} from={0.9}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "28px 40px",
                  borderRadius: radius.lg,
                  border: hairline,
                  backgroundColor: colors.card,
                  fontFamily: fonts.sans,
                  fontSize: 38,
                  fontWeight: 500,
                  color: colors.foreground,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    backgroundColor: colors.primary,
                    opacity: 0.6 + 0.4 * Math.sin((frame - i * 9) / 9),
                  }}
                />
                {chip}
              </div>
            </SpringIn>
          ))}
        </div>
      </div>
    </Stage>
  );
};
