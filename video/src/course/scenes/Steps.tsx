import React from "react";
import { AbsoluteFill } from "remotion";
import { Card, Stage } from "../../components/Chrome";
import { Label, SpringIn } from "../../components/Motion";
import { colors, fonts, hairline } from "../../theme";

/**
 * The whole syllabus on one card each, units and all. It is the longest-held scene in the piece
 * because it is the one a viewer pauses on, and the footer says out loud that the list moves:
 * the course is still being written and a promo should not pretend otherwise.
 */

const STEPS = [
  {
    id: "step0",
    title: "Start here",
    body: "How the kata works, and how to run the service.",
    units: ["How this kata works", "The backend"],
  },
  {
    id: "step1",
    title: "Context, model, mechanisms",
    body: "What an agent knows, and the machinery around the window it shares with you.",
    units: [
      "Tokens",
      "Your prompt",
      "Tools",
      "Context",
      "The session",
      "The harness",
      "The model",
      "Truth",
      "Workshop",
    ],
  },
  {
    id: "step2",
    title: "Agentic engineering",
    body: "How you work with an agent, as opposed to what it knows.",
    units: [
      "Project evolution",
      "Project setup",
      "Engineering",
      "Steering",
      "Solving repeating patterns",
      "Workflows",
      "Enablement",
      "Parallel workflows",
      "Goal-oriented",
      "Workshop",
    ],
  },
  {
    id: "step3",
    title: "Soft skills",
    body: "What happens around the work rather than in it.",
    units: ["Change management", "Expectation management", "Impostor syndrome"],
  },
] as const;

export const Steps: React.FC = () => {
  return (
    <Stage>
      <AbsoluteFill style={{ padding: "56px 68px 36px" }}>
        <Label>The path</Label>

        <div style={{ display: "flex", gap: 20, marginTop: 34, flex: 1, minHeight: 0 }}>
          {STEPS.map((step, i) => (
            <SpringIn
              key={step.id}
              delay={22 + i * 12}
              rise={30}
              style={{ flex: 1, display: "flex" }}
            >
              <Card style={{ flex: 1, padding: 30 }}>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 24,
                    color: colors.primary,
                  }}
                >
                  {step.id}
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, marginTop: 12, lineHeight: 1.15 }}>
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    lineHeight: 1.45,
                    color: colors.mutedFg,
                    marginTop: 16,
                  }}
                >
                  {step.body}
                </div>
                <div style={{ borderTop: hairline, margin: "20px 0 16px" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {step.units.map((unit, u) => (
                    <SpringIn
                      key={unit}
                      delay={30 + i * 12 + u * 4}
                      rise={8}
                      from={1}
                      style={{ display: "flex", gap: 18, alignItems: "baseline" }}
                    >
                      <div
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 22,
                          color: colors.mutedFg,
                        }}
                      >
                        {String(u + 1).padStart(2, "0")}
                      </div>
                      <div style={{ fontSize: 26 }}>{unit}</div>
                    </SpringIn>
                  ))}
                </div>
              </Card>
            </SpringIn>
          ))}
        </div>

        <SpringIn delay={95} rise={12} from={1} style={{ marginTop: 22, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: colors.mutedFg }}>
            Steps, units and exercises are subject to change.
          </div>
        </SpringIn>
      </AbsoluteFill>
    </Stage>
  );
};
