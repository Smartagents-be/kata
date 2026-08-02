import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Eyebrow, Stage } from "../../components/Chrome";
import { SpringIn } from "../../components/Motion";
import { colors, fonts, hairline, radius } from "../../theme";

/**
 * What the repository actually is: a curriculum on one side, a service on the other. The two
 * cards are the same size on purpose, because neither half is the supporting act.
 */

const PANES = [
  {
    eyebrow: "front/",
    title: "The curriculum",
    body: "Web-based course material with exercises, capture the flag, questions and figures.",
    bullets: ["English and Dutch", "guided or solo"],
    delay: 12,
  },
  {
    eyebrow: "kata/stepN/java/",
    title: "The service",
    body: "Spring Boot, one standalone project per step. Not a grader: it is the subject. You instrument it, harden it, and read back what it produced.",
    bullets: ["one project per step"],
    delay: 20,
  },
] as const;

const Bullet: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
  <SpringIn delay={delay} rise={10} from={1}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 8, height: 8, backgroundColor: colors.primary }} />
      <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.foreground }}>
        {children}
      </div>
    </div>
  </SpringIn>
);

export const Overview: React.FC = () => {
  return (
    <Stage>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 196 }}>
        <SpringIn rise={20}>
          <div style={{ fontSize: 62, fontWeight: 700, letterSpacing: "-0.02em" }}>
            The curriculum and the service
          </div>
        </SpringIn>

        <div style={{ display: "flex", gap: 40, marginTop: 62 }}>
          {PANES.map((pane) => (
            <SpringIn key={pane.title} delay={pane.delay} rise={30}>
              <Card style={{ width: 700, minHeight: 445, padding: 42 }}>
                <Eyebrow>{pane.eyebrow}</Eyebrow>
                <div style={{ fontSize: 44, fontWeight: 700, marginTop: 22 }}>{pane.title}</div>
                <div
                  style={{
                    fontSize: 30,
                    lineHeight: 1.45,
                    color: colors.mutedFg,
                    marginTop: 20,
                  }}
                >
                  {pane.body}
                </div>
                <div style={{ borderTop: hairline, margin: "28px 0 24px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {pane.bullets.map((bullet, i) => (
                    <Bullet key={bullet} delay={pane.delay + 18 + i * 6}>
                      {bullet}
                    </Bullet>
                  ))}
                </div>
              </Card>
            </SpringIn>
          ))}
        </div>

        {/* The line the whole video is arguing for, so it arrives last and on its own. */}
        <SpringIn delay={105} rise={22} style={{ marginTop: 66 }}>
          <div
            style={{
              backgroundColor: colors.muted,
              border: hairline,
              borderRadius: radius.md,
              padding: "18px 40px",
              fontSize: 34,
            }}
          >
            The codebase <strong style={{ color: colors.primary }}>is</strong> the curriculum.
          </div>
        </SpringIn>
      </AbsoluteFill>
    </Stage>
  );
};
