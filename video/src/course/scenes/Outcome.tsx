import React from "react";
import { Stage } from "../../components/Chrome";
import { DotGrid, DrawnPath, Label, SpringIn, WordReveal } from "../../components/Motion";
import { MARGIN } from "../../layout";
import { colors, fonts, hairline, radius } from "../../theme";

/**
 * What the course leaves you with, one card before the end. It is the promo's `Proof` scene in the
 * same shape, and deliberately not the same words: the promo talks to somebody deciding whether to
 * start, this talks to a working engineer who has already been doing the job for years. So the line
 * is about how they work rather than about what they become, and nothing here calls them a student.
 *
 * There are no figures on this card on purpose. A promise with a number in it is a promise about a
 * course that is still being written.
 */

const CHIPS = [
  "Hands-on experience",
  "Production patterns",
  "Reference material you keep",
] as const;

export const Outcome: React.FC = () => {
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
            text="From writing the code to directing the work."
            delay={8}
            stagger={3}
            style={{
              width: 1500,
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: colors.foreground,
              justifyContent: "center",
              textAlign: "center",
            }}
          />

          {/* Clear of the descenders: this line wraps, where the promo's version does not. */}
          <svg width={520} height={12} style={{ marginTop: 30 }}>
            <DrawnPath
              d="M 6 6 L 514 6"
              length={508}
              from={44}
              to={72}
              stroke={colors.primary}
              strokeWidth={5}
            />
          </svg>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {CHIPS.map((chip, i) => (
            <SpringIn key={chip} delay={60 + i * 6} rise={30} from={0.9}>
              <div
                style={{
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
                {chip}
              </div>
            </SpringIn>
          ))}
        </div>
      </div>
    </Stage>
  );
};
