import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Chrome";
import { Caret, DotGrid, DrawnPath, Label } from "../components/Motion";
import { SPRING, SPRING_HEAVY } from "../layout";
import { colors, fonts, radius, shadow } from "../theme";

/**
 * An agent working, watched over its shoulder. The list is the point: a caret walks down it, each
 * line goes from waiting to running to struck through, and the bar underneath fills as it goes.
 *
 * Nothing here is a screenshot. The pane is drawn, so the timing of the ticks is ours to set, and
 * it is set to land just before the scene ends.
 */

/** The pane is the one dark surface in the video, so its tones live here rather than in the theme. */
const PANE = {
  surface: colors.header,
  bar: "oklch(0.24 0.05 185)",
  rail: "oklch(0.25 0.05 185)",
  rule: "oklch(0.36 0.045 185)",
  text: "oklch(0.93 0.015 190)",
  muted: "oklch(0.68 0.03 190)",
  accent: "oklch(0.8 0.1 185)",
} as const;

const PANE_WIDTH = 1440;
const PANE_HEIGHT = 616;
const PANE_LEFT = (1920 - PANE_WIDTH) / 2;
const PANE_TOP = 254;

const ROW_HEIGHT = 74;
const FIRST_TASK = 26;
const TASK_STEP = 34;
const TASK_TICK = 26;

const TASKS = [
  "read the failing test",
  "find the broken method",
  "write the fix",
  "run the suite",
  "open the pull request",
] as const;

const LAST_TICK = FIRST_TASK + (TASKS.length - 1) * TASK_STEP + TASK_TICK;

const FILES = ["agent.ts", "tools.ts", "memory.ts", "run.ts"] as const;

export const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const paneIn = Math.min(1, spring({ frame, fps, config: SPRING_HEAVY }));
  const activeRow = Math.min(
    TASKS.length - 1,
    Math.max(0, Math.floor((frame - FIRST_TASK) / TASK_STEP)),
  );

  return (
    <Stage>
      <DotGrid opacity={0.35} />

      <Label style={{ position: "absolute", left: PANE_LEFT, top: 168 }}>
        One session, start to finish
      </Label>

      <div
        style={{
          position: "absolute",
          left: PANE_LEFT,
          top: PANE_TOP,
          width: PANE_WIDTH,
          height: PANE_HEIGHT,
          borderRadius: radius.lg,
          backgroundColor: PANE.surface,
          boxShadow: shadow.float,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          opacity: paneIn,
          scale: String(0.94 + paneIn * 0.06),
        }}
      >
        <div
          style={{
            height: 64,
            flexShrink: 0,
            backgroundColor: PANE.bar,
            display: "flex",
            alignItems: "center",
            paddingLeft: 26,
            gap: 12,
            fontFamily: fonts.mono,
            fontSize: 28,
            color: PANE.muted,
          }}
        >
          {["oklch(0.72 0.16 25)", "oklch(0.82 0.15 85)", "oklch(0.75 0.15 150)"].map((dot) => (
            <div key={dot} style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: dot }} />
          ))}
          <span style={{ marginLeft: 22 }}>agent session</span>
        </div>

        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          {/* The file rail. It never changes, and it is there so the pane reads as a workspace. */}
          <div
            style={{
              width: 306,
              flexShrink: 0,
              backgroundColor: PANE.rail,
              borderRight: `1px solid ${PANE.rule}`,
              padding: "34px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              fontFamily: fonts.mono,
              fontSize: 28,
              color: PANE.muted,
            }}
          >
            {FILES.map((file, i) => (
              <div
                key={file}
                style={{
                  color: i === 0 ? PANE.accent : PANE.muted,
                  opacity: interpolate(frame, [8 + i * 4, 20 + i * 4], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {file}
              </div>
            ))}
          </div>

          {/* The task list, and the caret walking down it. */}
          <div
            style={{
              flex: 1,
              position: "relative",
              padding: "30px 40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 30 + activeRow * ROW_HEIGHT + 18,
                width: 5,
                height: 38,
                borderRadius: 999,
                backgroundColor: PANE.accent,
                opacity:
                  frame < FIRST_TASK - 6 || frame > LAST_TICK + 6
                    ? 0
                    : interpolate(Math.sin(frame / 5), [-1, 1], [0.45, 1]),
                translate: `0px ${
                  (1 -
                    Math.min(
                      1,
                      spring({
                        frame: frame - FIRST_TASK - activeRow * TASK_STEP,
                        fps,
                        config: SPRING,
                      }),
                    )) *
                  -ROW_HEIGHT
                }px`,
              }}
            />

            {TASKS.map((task, i) => {
              const startAt = FIRST_TASK + i * TASK_STEP;
              const tickAt = startAt + TASK_TICK;
              const done = frame >= tickAt;
              const running = frame >= startAt && !done;

              return (
                <div
                  key={task}
                  style={{
                    height: ROW_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    fontFamily: fonts.mono,
                    fontSize: 32,
                    color: done ? PANE.muted : running ? PANE.text : "oklch(0.5 0.03 190)",
                    opacity: interpolate(frame, [6 + i * 5, 18 + i * 5], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <svg width={34} height={34} viewBox="0 0 34 34" style={{ flexShrink: 0 }}>
                    <rect
                      x={1.5}
                      y={1.5}
                      width={31}
                      height={31}
                      rx={8}
                      fill="none"
                      stroke={done || running ? PANE.accent : PANE.rule}
                      strokeWidth={2}
                    />
                    <DrawnPath
                      d="M 8 17.5 L 14 23.5 L 25 10.5"
                      length={32}
                      from={tickAt}
                      to={tickAt + 8}
                      stroke={PANE.accent}
                      strokeWidth={3.5}
                    />
                  </svg>

                  <span
                    style={{
                      textDecoration: done ? "line-through" : "none",
                      textDecorationColor: PANE.rule,
                    }}
                  >
                    {task}
                  </span>

                  {running ? <Caret width={14} height={30} color={PANE.accent} /> : null}
                </div>
              );
            })}

            {/* The session's own progress, and the state it earns. Both sit on the closing line. */}
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: PANE.rule,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: PANE.accent,
                    width: `${interpolate(frame, [FIRST_TASK, LAST_TICK], [0, 100], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}%`,
                  }}
                />
              </div>

              {/* The one green thing in the video, and only once the list is empty. */}
              <div
                style={{
                  flexShrink: 0,
                  padding: "16px 30px",
                  borderRadius: radius.md,
                  backgroundColor: colors.success,
                  color: colors.primaryFg,
                  fontFamily: fonts.mono,
                  fontSize: 30,
                  opacity: Math.min(
                    1,
                    spring({ frame: frame - LAST_TICK - 4, fps, config: SPRING }),
                  ),
                  scale: String(
                    Math.min(1, spring({ frame: frame - LAST_TICK - 4, fps, config: SPRING })) *
                      interpolate(
                        frame,
                        [LAST_TICK + 16, LAST_TICK + 26, LAST_TICK + 38],
                        [1, 1.07, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                      ),
                  ),
                }}
              >
                task complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
};
