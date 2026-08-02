import React from "react";
import { Composition, Folder } from "remotion";
import "./index.css";
import { FPS, Promo, SCENES, TOTAL_FRAMES } from "./Promo";
import { COURSE_SCENES, COURSE_TOTAL_FRAMES, Course } from "./course/Course";
import { FRAME_HEIGHT, FRAME_WIDTH } from "./layout";

/**
 * Two pieces. `Promo` is the 45-second one that has to sell the course, `KataAgenticJava` the
 * 66-second tour that explains it. Every scene of both is also registered on its own under a
 * folder, so a scene can be previewed and timed in isolation, and double-clicking a sequence in
 * a main timeline jumps straight to it. A scene previewed on its own has no progress bar, because
 * the bar belongs to the whole video rather than to any one scene.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
      />

      <Composition
        id="KataAgenticJava"
        component={Course}
        durationInFrames={COURSE_TOTAL_FRAMES}
        fps={FPS}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
      />

      <Folder name="Scenes">
        {SCENES.map((scene) => (
          <Composition
            key={scene.id}
            id={scene.id}
            component={scene.component}
            durationInFrames={scene.durationInFrames}
            fps={FPS}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
          />
        ))}
      </Folder>

      <Folder name="Course">
        {COURSE_SCENES.map((scene) => (
          <Composition
            key={scene.id}
            id={scene.id}
            component={scene.component}
            durationInFrames={scene.durationInFrames}
            fps={FPS}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
          />
        ))}
      </Folder>
    </>
  );
};
