import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Browser, Stage } from "../../components/Chrome";
import { Label, SpringIn } from "../../components/Motion";
import { colors, radius } from "../../theme";

/**
 * A real unit, scrolling. This is the one scene that shows the product rather than describing it,
 * so the capture is a real one (`public/shots/patterns-full.png`, the whole page in one image) and
 * nothing about it is dressed up. The cards on the right say what to notice while it goes past.
 */

const SHOT_WIDTH = 2880;
const SHOT_HEIGHT = 4458;

const BROWSER_WIDTH = 1340;
const BROWSER_HEIGHT = 870;
/** The browser chrome eats the top of the frame, so the page is shorter than the window. */
const VIEWPORT_HEIGHT = BROWSER_HEIGHT - 52;
const PAGE_HEIGHT = (SHOT_HEIGHT * BROWSER_WIDTH) / SHOT_WIDTH;

const NOTES = [
  {
    title: "Written like someone talking",
    body: "A unit sounds like a colleague at a whiteboard, not like documentation.",
    delay: 40,
  },
  {
    title: "Guided or on your own",
    body: "A classroom and a solo learner read the same unit.",
    delay: 90,
  },
  {
    title: "English and Dutch",
    body: "Both languages ship.",
    delay: 160,
  },
] as const;

export const Lesson: React.FC = () => {
  const frame = useCurrentFrame();

  const scroll = interpolate(frame, [25, 255], [0, PAGE_HEIGHT - VIEWPORT_HEIGHT], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.35, 1),
  });

  return (
    <Stage>
      <Label style={{ position: "absolute", left: 42, top: 48 }}>Guiding text</Label>

      <AbsoluteFill>
        <SpringIn rise={40} from={0.97} style={{ position: "absolute", left: 42, top: 105 }}>
          <Browser url="localhost:5173/steps/step2/patterns" width={BROWSER_WIDTH} height={BROWSER_HEIGHT}>
            <Img
              src={staticFile("shots/patterns-full.png")}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: BROWSER_WIDTH,
                translate: `0px ${-scroll}px`,
              }}
            />
          </Browser>
        </SpringIn>

        <div
          style={{
            position: "absolute",
            left: 1405,
            top: 105,
            width: 470,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {NOTES.map((note) => (
            <SpringIn key={note.title} delay={note.delay} rise={26}>
              <div
                style={{
                  backgroundColor: colors.card,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: radius.lg,
                  padding: "26px 30px",
                }}
              >
                <div style={{ fontSize: 30, fontWeight: 700, color: colors.primary }}>
                  {note.title}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    lineHeight: 1.5,
                    color: colors.mutedFg,
                    marginTop: 14,
                  }}
                >
                  {note.body}
                </div>
              </div>
            </SpringIn>
          ))}
        </div>

      </AbsoluteFill>
    </Stage>
  );
};
