import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Card, Stage, Terminal } from "../../components/Chrome";
import { Label, SpringIn } from "../../components/Motion";
import { colors, fonts, radius } from "../../theme";

/**
 * The graded profile, failing and then passing. The gates are the scene rather than three lines of
 * terminal output, because "the build decides quality" is a thing to watch happen and not a thing
 * to read: each gate starts red and short of its mark, and clears one at a time.
 *
 * Two of the three want a bigger number and one wants a smaller one, so one bar has to come back
 * under its mark while the others grow past theirs. That asymmetry is the point of showing them.
 *
 * The numbers are step 2's real gates. The flags print as `{........}` because what they say is the
 * student's to find: nothing in this video shows a flag's contents, and nothing in it should.
 */

const GATES = [
  {
    name: "coverage floor",
    target: "≥ 90,0%",
    /** Where the bar's mark sits, and what the two ends of its travel are, in bar units. */
    scale: 100,
    mark: 90,
    from: 38.2,
    to: 91.4,
    unit: "%",
    decimals: 1,
  },
  {
    name: "complexity ceiling",
    target: "≤ 10",
    scale: 30,
    mark: 10,
    from: 21,
    to: 8,
    unit: "",
    decimals: 0,
  },
  {
    name: "honest coverage",
    target: "≥ 80,0%",
    scale: 100,
    mark: 80,
    from: 42.4,
    to: 82.7,
    unit: "%",
    decimals: 1,
  },
] as const;

/** When each card lands, when each gate clears, and when the build agrees. */
const LAND = [30, 42, 54] as const;
const CLEAR = [130, 150, 170] as const;
const SUCCESS = 194;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** The comma is the decimal separator Maven prints here, so the video prints it too. */
const format = (value: number, decimals: number, unit: string) =>
  `${value.toFixed(decimals).replace(".", ",")}${unit}`;

const term = {
  dim: "oklch(0.6 0.015 200)",
  text: "oklch(0.9 0.01 200)",
  teal: "oklch(0.8 0.13 185)",
  green: "oklch(0.82 0.17 155)",
  red: "oklch(0.7 0.2 25)",
} as const;

const Gate: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const gate = GATES[index];
  const clear = CLEAR[index];

  const progress = interpolate(frame, [clear, clear + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const value = gate.from + (gate.to - gate.from) * progress;
  const cleared = progress > 0.5;
  const tone = cleared ? colors.success : colors.destructive;

  return (
    <SpringIn delay={LAND[index]} rise={30} style={{ flex: 1, display: "flex" }}>
      <Card style={{ flex: 1, padding: 34, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.mutedFg }}>
          {gate.name}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: tone, letterSpacing: "-0.02em" }}>
            {format(value, gate.decimals, gate.unit)}
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.mutedFg }}>
            {gate.target}
          </div>
        </div>

        {/* The bar and its mark. Past the mark is good on two of these and bad on the other, which
            is what the comparator above it is there to say. */}
        <div
          style={{
            position: "relative",
            height: 18,
            marginTop: 26,
            borderRadius: 999,
            backgroundColor: colors.muted,
            overflow: "visible",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(value / gate.scale) * 100}%`,
              borderRadius: 999,
              backgroundColor: tone,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -9,
              bottom: -9,
              left: `${(gate.mark / gate.scale) * 100}%`,
              width: 3,
              backgroundColor: colors.foreground,
            }}
          />
        </div>

        <div style={{ marginTop: 30, display: "flex", alignItems: "center", height: 52 }}>
          <div
            style={{
              position: "absolute",
              fontFamily: fonts.mono,
              fontSize: 26,
              color: colors.mutedFg,
              opacity: 1 - progress,
            }}
          >
            locked
          </div>
          <SpringIn delay={clear + 14} rise={12} from={0.9}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 26,
                color: colors.successFg,
                backgroundColor: "oklch(0.95 0.04 163)",
                borderRadius: radius.sm,
                padding: "10px 18px",
              }}
            >
              {`{${"•".repeat(8)}}`}
            </div>
          </SpringIn>
        </div>
      </Card>
    </SpringIn>
  );
};

export const Backend: React.FC = () => {
  const frame = useCurrentFrame();
  const green = frame >= SUCCESS;

  return (
    <Stage>
      <AbsoluteFill style={{ padding: "56px 80px" }}>
        <Label>The service</Label>

        <SpringIn delay={8} rise={20} style={{ marginTop: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em" }}>
            A real project to test your skills on
          </div>
        </SpringIn>

        <SpringIn delay={18} rise={14} from={1} style={{ marginTop: 14 }}>
          <div style={{ fontSize: 32, color: colors.mutedFg }}>
            On a fresh checkout the graded profile fails. Making it pass is the exercise, not a
            build to fix.
          </div>
        </SpringIn>

        <div style={{ display: "flex", gap: 30, marginTop: 44 }}>
          {GATES.map((gate, i) => (
            <Gate key={gate.name} index={i} />
          ))}
        </div>

        {/* The build that produced those three numbers, kept on screen so none of this reads as an
            infographic somebody drew. */}
        <SpringIn delay={70} rise={26} from={0.98} style={{ marginTop: 40 }}>
          <Terminal title="kata/step2/java" width={1760} height={180}>
            <div style={{ fontSize: 26, lineHeight: 1.75 }}>
              <div style={{ color: term.teal }}>
                $ <span style={{ color: term.text }}>mvn verify -Pgraded</span>
                <span style={{ color: term.dim }}>{frame % 30 < 17 ? " ▌" : ""}</span>
              </div>
              <div style={{ color: green ? term.green : term.red }}>
                {green
                  ? "BUILD SUCCESS     3 of 3 flags earned"
                  : "BUILD FAILURE     There are test failures."}
              </div>
            </div>
          </Terminal>
        </SpringIn>
      </AbsoluteFill>
    </Stage>
  );
};
