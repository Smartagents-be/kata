import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { ProgressBar } from "./components/ProgressBar";
import { Watermark } from "./components/Watermark";
import { scalePush } from "./components/ScalePush";
import { TRANSITION_FRAMES } from "./layout";
import { colors } from "./theme";
import { Cta } from "./scenes/Cta";
import { Hook } from "./scenes/Hook";
import { Learn } from "./scenes/Learn";
import { Problem } from "./scenes/Problem";
import { Proof } from "./scenes/Proof";
import { Session } from "./scenes/Session";

export const FPS = 30;

/**
 * The whole piece, in the order an argument is made: a claim, the gap it names, what the course
 * does about it, what that looks like from the inside, what it leaves you with, and where to go.
 *
 * Durations are inlined so each one can be dragged in the Studio timeline. `SCENES` below is the
 * same list again, and `Root.tsx` reads it to register every scene on its own.
 */

/**
 * Each scene's length, which is nine frames longer than its span on screen for every cut it takes
 * part in. A transition plays both scenes at once, so the total is the sum minus the overlaps.
 */
export const SCENES = [
  { id: "Hook", component: Hook, durationInFrames: 189 },
  { id: "Problem", component: Problem, durationInFrames: 219 },
  { id: "Learn", component: Learn, durationInFrames: 339 },
  { id: "Session", component: Session, durationInFrames: 249 },
  { id: "Proof", component: Proof, durationInFrames: 219 },
  { id: "Cta", component: Cta, durationInFrames: 180 },
] as const;

/** 1350 frames, which is 45 seconds at 30fps. */
export const TOTAL_FRAMES =
  SCENES.reduce((sum, scene) => sum + scene.durationInFrames, 0) -
  TRANSITION_FRAMES * (SCENES.length - 1);

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={189} name="Hook">
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={219} name="Problem">
          <Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={scalePush()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={339} name="Learn">
          <Learn />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={scalePush()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={249} name="Session">
          <Session />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={219} name="Proof">
          <Proof />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={scalePush()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={180} name="Cta">
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Watermark gradientId="promo-watermark" />
      <ProgressBar total={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
