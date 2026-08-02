import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Card, Stage } from "../../components/Chrome";
import { CheckIcon } from "../../components/Icons";
import { Label, SpringIn } from "../../components/Motion";
import { colors, fonts, hairline, radius } from "../../theme";

/**
 * One question, answered on screen, by a pointer that picks an option and presses the button. The
 * distractors are the real ones from the step 1 quiz, and all four arrive unanswered: a viewer gets
 * long enough with them to choose for themselves before the pointer commits.
 *
 * The footer is the claim that matters to somebody deciding whether to buy: none of this needs the
 * service to be up.
 */

const OPTIONS = [
  { text: "The model learned during the day and overwrote the old instruction.", right: false },
  {
    text: "Everything from 08:00 is still there, but the model decided it was not relevant.",
    right: false,
  },
  {
    text: "The model looks your history up in a database, and this morning is another partition.",
    right: false,
  },
  {
    text: "The window filled up. The morning was compacted or pushed out of the context, so it is no longer in front of the model.",
    right: true,
  },
] as const;

/** The two beats of the interaction, and where on the frame each one happens. */
const PICK = 112;
const CHECK = 152;
const PICK_AT = { x: 700, y: 762 };
const CHECK_AT = { x: 1645, y: 862 };
/** Off the bottom right corner, which is where a pointer that has not arrived yet waits. */
const OFF = { x: 1560, y: 1120 };

const ease = Easing.bezier(0.4, 0, 0.2, 1);

const between = (frame: number, from: number, to: number, a: number, b: number) =>
  interpolate(frame, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

/**
 * The pointer, drawn rather than borrowed, with a ring that fires on each press. It is the only
 * thing in either piece that stands in for a person.
 */
const Pointer: React.FC<{ frame: number }> = ({ frame }) => {
  const x =
    frame < 126
      ? between(frame, 88, 108, OFF.x, PICK_AT.x)
      : between(frame, 126, 148, PICK_AT.x, CHECK_AT.x);
  const y =
    frame < 126
      ? between(frame, 88, 108, OFF.y, PICK_AT.y)
      : between(frame, 126, 148, PICK_AT.y, CHECK_AT.y);

  /** Both presses push the pointer a little into the surface, then let it back out. */
  const press = Math.min(
    interpolate(frame, [PICK, PICK + 3, PICK + 8], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) +
      interpolate(frame, [CHECK, CHECK + 3, CHECK + 8], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    1,
  );

  const ring = (at: number) =>
    interpolate(frame, [at, at + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: interpolate(frame, [84, 92, 172, 186], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {[PICK, CHECK].map((at) => (
        <div
          key={at}
          style={{
            position: "absolute",
            left: -34,
            top: -34,
            width: 68,
            height: 68,
            borderRadius: 999,
            border: `3px solid ${colors.primary}`,
            scale: `${0.2 + ring(at) * 0.8}`,
            opacity: frame < at ? 0 : 1 - ring(at),
          }}
        />
      ))}

      <svg width={30} height={40} viewBox="0 0 24 32" style={{ scale: `${1 - press * 0.14}` }}>
        <path
          d="M2 1.5 L2 24 L7.6 18.6 L11.4 27.6 L15.2 26 L11.5 17.4 L19 17.2 Z"
          fill={colors.card}
          stroke={colors.foreground}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const Option: React.FC<{
  children: React.ReactNode;
  delay: number;
  state: "idle" | "picked" | "right";
}> = ({ children, delay, state }) => (
  <SpringIn delay={delay} rise={16} from={1}>
    <div
      style={{
        border:
          state === "idle"
            ? hairline
            : `2px solid ${state === "right" ? colors.success : colors.primary}`,
        borderRadius: radius.md,
        backgroundColor: state === "right" ? "oklch(0.95 0.04 163)" : colors.card,
        padding: state === "idle" ? "13px 26px" : "12px 25px",
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          width: state === "idle" ? 26 : 30,
          height: state === "idle" ? 26 : 30,
          flexShrink: 0,
          borderRadius: 999,
          border: state === "idle" ? `2px solid ${colors.border}` : "none",
          backgroundColor:
            state === "right" ? colors.success : state === "picked" ? colors.primary : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {state === "right" ? <CheckIcon size={19} color={colors.primaryFg} /> : null}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: state === "right" ? 600 : 400,
          color: state === "right" ? colors.successFg : colors.foreground,
        }}
      >
        {children}
      </div>
    </div>
  </SpringIn>
);

export const Exercises: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage>
      <AbsoluteFill style={{ padding: "44px 110px" }}>
        <Label>Exercises</Label>

        <SpringIn delay={8} rise={20} style={{ marginTop: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Every unit asks you to prove it
          </div>
        </SpringIn>

        <SpringIn delay={20} rise={30} style={{ marginTop: 34 }}>
          <Card style={{ padding: 36 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 28, color: colors.mutedFg }}>
              QUESTION 1 OF 3
            </div>

            <SpringIn delay={32} rise={14} from={1} style={{ marginTop: 16 }}>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.4 }}>
                You have been working on the same project all morning. At 14:00 you ask the agent
                something you already told it at 08:00, and it does not remember. What happened?
              </div>
            </SpringIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 34 }}>
              {OPTIONS.map((option, i) => (
                <Option
                  key={option.text}
                  delay={45 + i * 9}
                  state={
                    !option.right || frame < PICK ? "idle" : frame < CHECK ? "picked" : "right"
                  }
                >
                  {option.text}
                </Option>
              ))}
            </div>

            <div
              style={{
                marginTop: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 34,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: colors.successFg,
                  opacity: interpolate(frame, [CHECK + 4, CHECK + 12], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                Correct. The context filled up.
              </div>
              <SpringIn delay={38} rise={12} from={1}>
                <div
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.primaryFg,
                    borderRadius: radius.md,
                    padding: "16px 30px",
                    fontSize: 28,
                    fontWeight: 600,
                    /* The button takes the press rather than only the pointer, so the click has
                       somewhere to land. */
                    scale: `${1 - interpolate(frame, [CHECK, CHECK + 3, CHECK + 9], [0, 1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }) * 0.04}`,
                  }}
                >
                  Check answers
                </div>
              </SpringIn>
            </div>
          </Card>
        </SpringIn>

        <SpringIn delay={200} rise={14} from={1} style={{ marginTop: 30, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: colors.mutedFg }}>
            Graded in the browser, against a salted hash. It still works with the service down.
          </div>
        </SpringIn>
      </AbsoluteFill>

      <Pointer frame={frame} />
    </Stage>
  );
};
