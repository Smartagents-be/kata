import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ProgressBar } from "../components/ProgressBar";
import { Watermark } from "../components/Watermark";
import { colors } from "../theme";
import { Backend } from "./scenes/Backend";
import { Exercises } from "./scenes/Exercises";
import { Figures } from "./scenes/Figures";
import { Indicators } from "./scenes/Indicators";
import { Lesson } from "./scenes/Lesson";
import { Outcome } from "./scenes/Outcome";
import { Outro } from "./scenes/Outro";
import { Overview } from "./scenes/Overview";
import { Steps } from "./scenes/Steps";
import { Title } from "./scenes/Title";
import { Training } from "./scenes/Training";

/**
 * The course tour: what the repository is, what a unit reads like, what it draws, what it asks,
 * what it builds against, and the whole path through it. Nine scenes, in the order somebody would
 * walk a newcomer around the thing.
 *
 * This is the longer, explanatory piece. `Promo.tsx` is the short one that has to sell rather than
 * explain, which is why the two share a design system and almost no decisions: this one crossfades
 * and holds a scene long enough to be read, and the promo does neither.
 */

export const FPS = 30;

/** Half a second, which is a crossfade you notice without waiting for it. */
export const COURSE_TRANSITION_FRAMES = 15;

/**
 * Each scene's length, fifteen frames longer than its span on screen for every cut it takes part
 * in, because a crossfade plays both scenes at once.
 */
export const COURSE_SCENES = [
  { id: "Title", component: Title, durationInFrames: 153 },
  { id: "Overview", component: Overview, durationInFrames: 243 },
  { id: "Lesson", component: Lesson, durationInFrames: 264 },
  { id: "Training", component: Training, durationInFrames: 216 },
  { id: "Figures", component: Figures, durationInFrames: 261 },
  { id: "Indicators", component: Indicators, durationInFrames: 216 },
  { id: "Exercises", component: Exercises, durationInFrames: 270 },
  { id: "Backend", component: Backend, durationInFrames: 246 },
  { id: "Steps", component: Steps, durationInFrames: 261 },
  { id: "Outcome", component: Outcome, durationInFrames: 216 },
  { id: "Outro", component: Outro, durationInFrames: 189 },
] as const;

/** 2385 frames, which is a shade under 80 seconds at 30fps. */
export const COURSE_TOTAL_FRAMES =
  COURSE_SCENES.reduce((sum, scene) => sum + scene.durationInFrames, 0) -
  COURSE_TRANSITION_FRAMES * (COURSE_SCENES.length - 1);

const timing = linearTiming({ durationInFrames: COURSE_TRANSITION_FRAMES });

export const Course: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TransitionSeries>
        {COURSE_SCENES.map((scene, i) => (
          <React.Fragment key={scene.id}>
            {i > 0 ? (
              <TransitionSeries.Transition presentation={fade()} timing={timing} />
            ) : null}
            <TransitionSeries.Sequence durationInFrames={scene.durationInFrames} name={scene.id}>
              <scene.component />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>

      <Watermark gradientId="course-watermark" />
      <ProgressBar total={COURSE_TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
