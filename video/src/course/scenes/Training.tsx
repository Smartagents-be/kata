import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Card, Stage } from "../../components/Chrome";
import { Label, SpringIn } from "../../components/Motion";
import { colors, fonts, hairline, radius, shadow } from "../../theme";

/**
 * How the material is delivered: a trainer in front of it, presenting the deck the units generate.
 * The slide on screen is drawn rather than captured, because the deck renders from the same units
 * the previous scene just scrolled through, and a capture of it would only say that twice.
 *
 * The slide advances once, mid-scene. That single beat is what makes this read as somebody
 * presenting rather than as a screenshot of a slide.
 */

const ADVANCE = 120;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const SLIDES = [
  {
    title: "Solving repeating patterns",
    lines: [
      "The third time you type the same instruction, stop typing it.",
      "A correction you repeat is a piece of knowledge with no home yet.",
    ],
    figure: true,
    number: "05",
  },
  {
    title: "Workflows",
    lines: [
      "A workflow is the plan you would have written anyway.",
      "Written down, it runs the same way twice.",
      "The agent stops working the steps out again.",
    ],
    figure: false,
    number: "06",
  },
] as const;

/** A trainer, drawn as plainly as possible: this is a marker for a person, not a portrait. */
const Presenter: React.FC<{ opacity: number; dashed?: boolean }> = ({ opacity, dashed }) => (
  <div
    style={{
      width: 66,
      height: 66,
      borderRadius: 999,
      border: dashed ? `2px dashed ${colors.border}` : hairline,
      backgroundColor: colors.card,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity,
    }}
  >
    <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" strokeLinecap="round" />
    </svg>
  </div>
);

/** One slide's worth of deck, in the same type the units are set in. */
const Slide: React.FC<{ index: number; frame: number }> = ({ index, frame }) => {
  const slide = SLIDES[index];
  const shown = index === 0 ? frame < ADVANCE + 9 : frame >= ADVANCE;
  const shift =
    index === 0
      ? interpolate(frame, [ADVANCE, ADVANCE + 9], [0, -70], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })
      : interpolate(frame, [ADVANCE, ADVANCE + 9], [70, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
  const fade =
    index === 0
      ? interpolate(frame, [ADVANCE, ADVANCE + 7], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [ADVANCE + 2, ADVANCE + 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  if (!shown) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 58,
        opacity: fade,
        translate: `${shift}px 0px`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.primary,
        }}
      >
        Agentic engineering
      </div>

      <div style={{ fontSize: 52, fontWeight: 700, marginTop: 20, letterSpacing: "-0.02em" }}>
        {slide.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 34 }}>
        {slide.lines.map((line) => (
          <div key={line} style={{ fontSize: 30, lineHeight: 1.4, color: colors.mutedFg }}>
            {line}
          </div>
        ))}
      </div>

      {slide.figure ? (
        <svg width={620} height={130} style={{ marginTop: 34 }}>
          <line x1={40} y1={65} x2={250} y2={65} stroke={colors.primary} strokeWidth={3} />
          <line x1={310} y1={65} x2={520} y2={30} stroke={colors.border} strokeWidth={3} />
          <line x1={310} y1={65} x2={520} y2={100} stroke={colors.border} strokeWidth={3} />
          {[
            [40, 65],
            [280, 65],
            [550, 30],
            [550, 100],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={14}
              fill={colors.card}
              stroke={colors.primary}
              strokeWidth={3}
            />
          ))}
        </svg>
      ) : null}

      <div
        style={{
          position: "absolute",
          right: 58,
          bottom: 46,
          fontFamily: fonts.mono,
          fontSize: 24,
          color: colors.mutedFg,
        }}
      >
        {slide.number} / 10
      </div>
    </div>
  );
};

export const Training: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage>
      <AbsoluteFill style={{ padding: "56px 80px" }}>
        <Label>In the room</Label>

        <SpringIn delay={8} rise={20} style={{ marginTop: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Taught live, from the same material
          </div>
        </SpringIn>

        <SpringIn delay={18} rise={14} from={1} style={{ marginTop: 14 }}>
          <div style={{ fontSize: 32, color: colors.mutedFg }}>
            One trainer, or several when a group splits.
          </div>
        </SpringIn>

        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          <div>
            <SpringIn delay={28} rise={34} from={0.97}>
              <div
                style={{
                  position: "relative",
                  width: 1080,
                  height: 570,
                  borderRadius: radius.lg,
                  backgroundColor: colors.card,
                  boxShadow: shadow.float,
                  overflow: "hidden",
                }}
              >
                <Slide index={0} frame={frame} />
                <Slide index={1} frame={frame} />
              </div>
            </SpringIn>

            <SpringIn delay={95} rise={16} style={{ marginTop: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Presenter opacity={1} />
                <Presenter
                  opacity={interpolate(frame, [130, 145], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                  dashed
                />
                <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.mutedFg }}>
                  one trainer, or more
                </div>
              </div>
            </SpringIn>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 26 }}>
            <SpringIn delay={60} rise={26}>
              <Card style={{ padding: "30px 34px" }}>
                <div style={{ fontSize: 32, fontWeight: 700 }}>The deck is the material</div>
                <div
                  style={{ fontSize: 28, lineHeight: 1.5, color: colors.mutedFg, marginTop: 12 }}
                >
                  The slides render from the units themselves, so what is on the wall is what is in
                  the repository.
                </div>
              </Card>
            </SpringIn>

            <SpringIn delay={78} rise={26}>
              <Card style={{ padding: "30px 34px" }}>
                <div style={{ fontSize: 32, fontWeight: 700 }}>Live, not a recording</div>
                <div
                  style={{ fontSize: 28, lineHeight: 1.5, color: colors.mutedFg, marginTop: 12 }}
                >
                  Questions get answered in the room, and the pace follows the group rather than the
                  running order.
                </div>
              </Card>
            </SpringIn>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
