import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Card, Stage } from "../../components/Chrome";
import { Label, SpringIn } from "../../components/Motion";
import { colors, hairline } from "../../theme";

/**
 * The figures the units are built around, four of them at once. They are real captures rather
 * than redrawings, so what a viewer sees here is exactly what they will meet in the material.
 */

const FIGURES = [
  { shot: "fig-evolution.png", caption: "Project evolution", delay: 12 },
  { shot: "fig-context.png", caption: "What context is made of", delay: 24 },
  { shot: "fig-workflows.png", caption: "Where the work sits", delay: 60 },
  { shot: "fig-parallel.png", caption: "Parallel workflows", delay: 72 },
] as const;

export const Figures: React.FC = () => {
  return (
    <Stage>
      <Label style={{ position: "absolute", left: 80, top: 68 }}>Visualisations</Label>

      <AbsoluteFill
        style={{
          padding: "138px 80px 65px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          /* minmax(0, …) rather than 1fr: a row's auto minimum is its image's intrinsic height,
             which would push the bottom row off the frame. */
          gridTemplateRows: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 30,
        }}
      >
        {FIGURES.map((figure) => (
          <SpringIn
            key={figure.shot}
            delay={figure.delay}
            rise={28}
            style={{ display: "flex", minHeight: 0 }}
          >
            <Card
              style={{
                flex: 1,
                padding: 28,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 0,
                }}
              >
                <Img
                  src={staticFile(`shots/${figure.shot}`)}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ borderTop: hairline, marginTop: 22, paddingTop: 20 }}>
                <div style={{ fontSize: 30, color: colors.mutedFg }}>{figure.caption}</div>
              </div>
            </Card>
          </SpringIn>
        ))}
      </AbsoluteFill>
    </Stage>
  );
};
