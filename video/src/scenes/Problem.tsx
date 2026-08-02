import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Chrome";
import { DotGrid, DrawnPath, Label, SpringIn, WordReveal } from "../components/Motion";
import { SPRING, at, span } from "../layout";
import { colors, fonts, hairline, radius } from "../theme";

/**
 * The distinction the whole course rests on, drawn twice. On the left something talks and then
 * stops. On the right something reaches for three tools and comes back with them lit.
 *
 * The left panel dims once the right one starts working, so the eye is told where to be without a
 * word on screen saying so.
 */

const PANEL_HEIGHT = 430;
const PANEL_TOP = 500;

/** The right panel's drawing area, and everything inside it in that coordinate space. */
const DIAGRAM_WIDTH = 655;
const DIAGRAM_HEIGHT = 300;
const AGENT = { x: 227, y: 0, w: 200, h: 66 };
const TOOLS = [
  { name: "browser", x: 12, at: 62 },
  { name: "database", x: 242, at: 84 },
  { name: "api", x: 472, at: 106 },
] as const;
const TOOL_Y = 234;
const TOOL_W = 170;
const TOOL_H = 66;
const CONNECTOR_LENGTH = 292;

const Panel: React.FC<{
  x: number;
  delay: number;
  dim?: number;
  children: React.ReactNode;
}> = ({ x, delay, dim = 1, children }) => (
  <SpringIn
    delay={delay}
    style={{
      position: "absolute",
      left: x,
      top: PANEL_TOP,
      width: span(5),
      height: PANEL_HEIGHT,
      padding: 32,
      borderRadius: radius.lg,
      border: hairline,
      backgroundColor: colors.card,
      opacity: dim,
    }}
  >
    {children}
  </SpringIn>
);

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Stage>
      <DotGrid opacity={0.4} />

      <div style={{ position: "absolute", left: at(1), top: 150, width: span(10) }}>
        <WordReveal
          text="AI that answers is everywhere."
          delay={0}
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: colors.foreground,
          }}
        />
        <WordReveal
          text="AI that does is rare."
          delay={18}
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: colors.primary,
          }}
        />
        <WordReveal
          text="The difference is whether anything changed when it finished."
          delay={46}
          stagger={2}
          style={{
            marginTop: 22,
            fontSize: 38,
            fontWeight: 400,
            color: colors.mutedFg,
          }}
        />
      </div>

      {/* Left: a bubble that talks itself out and then has nothing further to offer. */}
      <Panel
        x={at(1)}
        delay={30}
        dim={interpolate(frame, [96, 128], [1, 0.38], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        <Label color={colors.mutedFg}>Answers</Label>

        <div
          style={{
            marginTop: 34,
            width: DIAGRAM_WIDTH,
            padding: "30px 34px",
            borderRadius: radius.lg,
            borderBottomLeftRadius: radius.sm,
            backgroundColor: colors.muted,
            border: hairline,
          }}
        >
          {/* Three dots while it thinks, then four rules of something to read. */}
          <div style={{ display: "flex", gap: 12, height: 20, alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  backgroundColor: colors.mutedFg,
                  opacity: interpolate(
                    Math.sin((frame - 40 - i * 5) / 4),
                    [-1, 1],
                    [0.2, 0.85],
                  ),
                  scale: String(
                    interpolate(frame, [86, 96], [1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  ),
                }}
              />
            ))}
          </div>

          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 22 }}>
            {[1, 0.92, 0.97, 0.88, 0.55].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 16,
                  borderRadius: 999,
                  backgroundColor: colors.border,
                  width: `${w * 100}%`,
                  scale: `${interpolate(frame, [88 + i * 7, 100 + i * 7], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })} 1`,
                  transformOrigin: "left center",
                }}
              />
            ))}
          </div>
        </div>
      </Panel>

      {/* Right: one agent, three tools, and the lines lighting up one after another. */}
      <Panel x={at(8)} delay={38}>
        <Label>Acts</Label>

        <div
          style={{
            position: "relative",
            marginTop: 30,
            width: DIAGRAM_WIDTH,
            height: DIAGRAM_HEIGHT,
          }}
        >
          <svg
            width={DIAGRAM_WIDTH}
            height={DIAGRAM_HEIGHT}
            style={{ position: "absolute", inset: 0 }}
          >
            {TOOLS.map((tool, i) => (
              <DrawnPath
                key={tool.name}
                d={`M ${AGENT.x + AGENT.w / 2} ${AGENT.h} L ${tool.x + TOOL_W / 2} ${TOOL_Y}`}
                length={CONNECTOR_LENGTH}
                from={tool.at}
                to={tool.at + 24}
                stroke={colors.primary}
                opacity={interpolate(
                  Math.sin((frame - tool.at - i * 3) / 7),
                  [-1, 1],
                  [0.45, 1],
                )}
              />
            ))}
          </svg>

          <div
            style={{
              position: "absolute",
              left: AGENT.x,
              top: AGENT.y,
              width: AGENT.w,
              height: AGENT.h,
              borderRadius: radius.md,
              backgroundColor: colors.header,
              color: colors.headerFg,
              fontFamily: fonts.mono,
              fontSize: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: String(
                Math.min(1, spring({ frame: frame - 48, fps, config: SPRING })),
              ),
            }}
          >
            agent
          </div>

          {TOOLS.map((tool) => {
            const done = interpolate(frame, [tool.at + 24, tool.at + 38], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={tool.name}
                style={{
                  position: "absolute",
                  left: tool.x,
                  top: TOOL_Y,
                  width: TOOL_W,
                  height: TOOL_H,
                  borderRadius: radius.md,
                  border: `1.5px solid ${done > 0.5 ? colors.primary : colors.border}`,
                  backgroundColor: done > 0.5 ? "oklch(0.95 0.03 185)" : colors.card,
                  fontFamily: fonts.mono,
                  fontSize: 28,
                  color: done > 0.5 ? colors.primary : colors.mutedFg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  scale: String(
                    Math.min(1, spring({ frame: frame - tool.at + 12, fps, config: SPRING })),
                  ),
                }}
              >
                {tool.name}
                <svg width={22} height={22} viewBox="0 0 22 22" style={{ opacity: done }}>
                  <DrawnPath
                    d="M 4 11.5 L 9 16.5 L 18 6"
                    length={26}
                    from={tool.at + 24}
                    to={tool.at + 38}
                    stroke={colors.primary}
                    strokeWidth={3}
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </Panel>
    </Stage>
  );
};
