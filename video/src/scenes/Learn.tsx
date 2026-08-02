import React from "react";
import { Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Chrome";
import { DotGrid, DrawnPath, Label, WordReveal } from "../components/Motion";
import { SPRING, at, span } from "../layout";
import { colors, fonts, hairline, radius } from "../theme";

/**
 * The three things a student walks out with, one at a time, each one pushing the last off screen.
 *
 * Every beat is a claim on the left and a drawing on the right, and the drawing is doing the work
 * a stock icon would otherwise pretend to do: a loop that runs, calls that return, a list that
 * finishes.
 */

const BEAT = 110;
const LAST_BEAT_EXTRA = 9;

const DIAGRAM_TOP = 344;
const TEXT_TOP = 408;

/** A beat holds for its whole length and then pushes back and away. The last one is cut instead. */
const Beat: React.FC<{
  index: number;
  last?: boolean;
  children: React.ReactNode;
}> = ({ index, last = false, children }) => (
  <Sequence
    from={index * BEAT}
    durationInFrames={BEAT + (last ? LAST_BEAT_EXTRA : 0)}
    layout="none"
    name={`Beat ${index + 1}`}
  >
    <BeatBody last={last}>{children}</BeatBody>
  </Sequence>
);

const BeatBody: React.FC<{ last: boolean; children: React.ReactNode }> = ({ last, children }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: last
          ? 1
          : interpolate(frame, [BEAT - 9, BEAT - 1], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
        scale: last
          ? "1"
          : String(
              interpolate(frame, [BEAT - 9, BEAT - 1], [1, 1.05], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            ),
      }}
    >
      {children}
    </div>
  );
};

const Copy: React.FC<{ heading: string; support: string }> = ({ heading, support }) => (
  <div style={{ position: "absolute", left: at(1), top: TEXT_TOP, width: span(6) }}>
    <WordReveal
      text={heading}
      delay={4}
      stagger={3}
      style={{
        fontSize: 68,
        fontWeight: 600,
        letterSpacing: "-0.025em",
        lineHeight: 1.12,
        color: colors.foreground,
      }}
    />
    <WordReveal
      text={support}
      delay={16}
      stagger={1.6}
      style={{
        marginTop: 24,
        fontSize: 38,
        fontWeight: 400,
        lineHeight: 1.4,
        color: colors.mutedFg,
      }}
    />
  </div>
);

/** The diagram column, so all three drawings hang off the same edge and the same top. */
const Figure: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: at(8),
      top: DIAGRAM_TOP,
      width: span(5),
      height: 470,
    }}
  >
    {children}
  </div>
);

/** Beat one: plan, act, observe, and a light going round it twice. */
const PlanLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 350;
  const cy = 232;
  const r = 176;
  const nodes = [
    { name: "plan", angle: -90 },
    { name: "act", angle: 30 },
    { name: "observe", angle: 150 },
  ];

  const travel = interpolate(frame, [26, 104], [0, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const angle = (travel * 360 - 90) * (Math.PI / 180);

  return (
    <Figure>
      <svg width={700} height={470} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.border} strokeWidth={2} />
        <DrawnPath
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`}
          length={2 * Math.PI * r}
          from={12}
          to={44}
          stroke="oklch(0.85 0.05 185)"
          strokeWidth={3}
        />
        <circle
          cx={cx + Math.cos(angle) * r}
          cy={cy + Math.sin(angle) * r}
          r={11}
          fill={colors.primary}
          opacity={interpolate(frame, [24, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>

      {nodes.map((node, i) => {
        const rad = node.angle * (Math.PI / 180);
        const progress = Math.min(1, spring({ frame: frame - 10 - i * 6, fps, config: SPRING }));

        return (
          <div
            key={node.name}
            style={{
              position: "absolute",
              left: cx + Math.cos(rad) * r - 108,
              top: cy + Math.sin(rad) * r - 37,
              width: 216,
              height: 74,
              borderRadius: radius.md,
              backgroundColor: colors.card,
              border: `1.5px solid ${colors.primary}`,
              fontFamily: fonts.mono,
              fontSize: 32,
              color: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: String(progress),
              opacity: progress,
            }}
          >
            {node.name}
          </div>
        );
      })}
    </Figure>
  );
};

const CALLS = [
  { call: 'read("spec.md")', result: "ok" },
  { call: 'search("tests")', result: "14 hits" },
  { call: 'write("patch")', result: "done" },
] as const;

/** Beat two: three calls that go out and come back, and a memory filling up as they do. */
const ToolCalls: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Figure>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {CALLS.map((entry, i) => {
          const startAt = 14 + i * 20;
          const progress = Math.min(1, spring({ frame: frame - startAt, fps, config: SPRING }));

          return (
            <div
              key={entry.call}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 32px",
                borderRadius: radius.md,
                border: hairline,
                backgroundColor: colors.card,
                fontFamily: fonts.mono,
                fontSize: 32,
                color: colors.foreground,
                opacity: progress,
                translate: `${(1 - progress) * 28}px 0px`,
              }}
            >
              <span>{entry.call}</span>
              <span
                style={{
                  color: colors.primary,
                  opacity: interpolate(frame, [startAt + 12, startAt + 20], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {entry.result}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 44 }}>
        <Label color={colors.mutedFg} style={{ fontSize: 28 }}>
          Memory
        </Label>
        <div
          style={{
            marginTop: 16,
            height: 20,
            borderRadius: 999,
            backgroundColor: colors.muted,
            border: hairline,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: colors.primary,
              width: `${interpolate(frame, [26, 92], [6, 78], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}%`,
            }}
          />
        </div>
      </div>
    </Figure>
  );
};

const TASKS = ["read the spec", "write the code", "run the tests", "open the pull request"];

/** Beat three: a list that ticks itself off, which is the only proof that matters. */
const Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Figure>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {TASKS.map((task, i) => {
          const startAt = 12 + i * 18;
          const progress = Math.min(1, spring({ frame: frame - startAt, fps, config: SPRING }));
          const checked = frame > startAt + 10;

          return (
            <div
              key={task}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "28px 32px",
                borderRadius: radius.md,
                border: hairline,
                backgroundColor: colors.card,
                fontFamily: fonts.sans,
                fontSize: 36,
                color: checked ? colors.mutedFg : colors.foreground,
                opacity: progress,
                translate: `${(1 - progress) * 28}px 0px`,
              }}
            >
              <svg width={36} height={36} viewBox="0 0 36 36">
                <rect
                  x={1.5}
                  y={1.5}
                  width={33}
                  height={33}
                  rx={8}
                  fill={checked ? "oklch(0.95 0.03 185)" : "transparent"}
                  stroke={checked ? colors.primary : colors.border}
                  strokeWidth={2}
                />
                <DrawnPath
                  d="M 9 18.5 L 15.5 25 L 27 11"
                  length={34}
                  from={startAt + 10}
                  to={startAt + 20}
                  stroke={colors.primary}
                  strokeWidth={3.5}
                />
              </svg>
              {task}
            </div>
          );
        })}
      </div>
    </Figure>
  );
};

export const Learn: React.FC = () => (
  <Stage>
    <DotGrid opacity={0.4} />

    <Label style={{ position: "absolute", left: at(1), top: 186 }}>What you learn</Label>

    <Beat index={0}>
      <Copy
        heading="Design agent architectures"
        support="Decide what the agent plans, what it remembers, and what it is allowed to touch."
      />
      <PlanLoop />
    </Beat>

    <Beat index={1}>
      <Copy
        heading="Orchestrate tools and memory"
        support="Give it real tools and a memory, then decide what it keeps."
      />
      <ToolCalls />
    </Beat>

    <Beat index={2} last>
      <Copy
        heading="Ship agents that finish real tasks."
        support="Take an agent past the demo and into work someone depends on."
      />
      <Checklist />
    </Beat>
  </Stage>
);
