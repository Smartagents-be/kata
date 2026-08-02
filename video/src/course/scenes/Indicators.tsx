import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Stage } from "../../components/Chrome";
import { CoinIcon, GemIcon, PatternIcon } from "../../components/Icons";
import { Label, SpringIn } from "../../components/Motion";
import { colors, fonts, radius } from "../../theme";

/**
 * The three markers the prose drops inline. They are worth a scene of their own because a reader
 * meets them mid-sentence with no legend in front of them, and has to know them on sight.
 */

const MARKERS = [
  {
    Icon: GemIcon,
    color: colors.gem,
    title: "Hidden gem",
    body: "Something extremely useful in day-to-day work that is easy to miss.",
    example: "Point the agent at a diff and ask what it got wrong.",
  },
  {
    Icon: CoinIcon,
    color: colors.coin,
    title: "Cost saver",
    body: "A cost-saving measure: the same result for fewer tokens.",
    example: "Run the mechanical pass on the small model.",
  },
  {
    Icon: PatternIcon,
    color: colors.pattern,
    title: "AI design pattern",
    body: "A deliberate, repeatable way of working with an agent.",
    example: "Plan first, approve the plan, then let it run.",
  },
] as const;

export const Indicators: React.FC = () => {
  return (
    <Stage>
      <AbsoluteFill style={{ padding: "88px 90px" }}>
        <Label>Indicators</Label>

        <SpringIn delay={8} rise={20} style={{ marginTop: 22 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Markers you learn on sight
          </div>
        </SpringIn>

        <SpringIn delay={18} rise={14} from={1} style={{ marginTop: 16 }}>
          <div style={{ fontSize: 32, color: colors.mutedFg }}>
            They turn up inline, mid-sentence, wherever the point is worth flagging.
          </div>
        </SpringIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 25, marginTop: 46 }}>
          {MARKERS.map((marker, i) => (
            <SpringIn key={marker.title} delay={20 + i * 14} rise={26}>
              <Card
                style={{
                  height: 200,
                  padding: "0 44px",
                  display: "flex",
                  alignItems: "center",
                  gap: 40,
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    flexShrink: 0,
                    borderRadius: radius.lg,
                    backgroundColor: colors.muted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <marker.Icon size={64} color={marker.color} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 40, fontWeight: 700 }}>{marker.title}</div>
                  <div style={{ fontSize: 30, color: colors.mutedFg, marginTop: 14 }}>
                    {marker.body}
                  </div>
                </div>

                {/* What one actually looks like in a sentence, arriving after the marker itself. */}
                <SpringIn delay={40 + i * 22} rise={0} from={1} style={{ width: 470 }}>
                  <div
                    style={{
                      borderLeft: `2px solid ${colors.border}`,
                      paddingLeft: 30,
                      fontFamily: fonts.mono,
                      fontSize: 28,
                      lineHeight: 1.5,
                      color: colors.foreground,
                    }}
                  >
                    {marker.example}
                  </div>
                </SpringIn>
              </Card>
            </SpringIn>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
