import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Chrome";
import { Caret, DotGrid, WordReveal } from "../components/Motion";
import { MARGIN, span } from "../layout";
import { colors, fonts, radius, shadow } from "../theme";

/**
 * Six seconds, and almost all of it empty. A machine types one line, the cursor keeps blinking,
 * and the claim arrives underneath it.
 *
 * The line is the whole argument of the video in three words, so it types at reading speed rather
 * than at typing speed.
 */

const LINE = "agent: plan > build > ship";

const TYPE_START = 12;
const TYPE_END = 66;
const HEADLINE_AT = 96;

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const typed = LINE.slice(
    0,
    Math.floor(
      interpolate(frame, [TYPE_START, TYPE_END], [0, LINE.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  return (
    <Stage>
      <DotGrid opacity={0.5} />

      <div
        style={{
          position: "absolute",
          left: MARGIN,
          top: 366,
          width: span(9),
        }}
      >
        {/* The terminal strip, arriving before anything is typed into it. */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "22px 34px",
            borderRadius: radius.md,
            backgroundColor: colors.header,
            boxShadow: shadow.float,
            fontFamily: fonts.mono,
            fontSize: 38,
            color: colors.headerFg,
            opacity: interpolate(frame, [0, 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: String(
              interpolate(frame, [0, 14], [0.96, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            ),
          }}
        >
          <span style={{ color: "oklch(0.78 0.09 185)" }}>{typed}</span>
          <Caret width={17} height={40} color="oklch(0.78 0.09 185)" style={{ marginLeft: 6 }} />
        </div>

        <WordReveal
          text="Software is learning to work."
          delay={HEADLINE_AT}
          stagger={4}
          style={{
            marginTop: 56,
            fontSize: 116,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: colors.foreground,
          }}
        />
      </div>
    </Stage>
  );
};
