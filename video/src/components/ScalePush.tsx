import React from "react";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";

/**
 * The cut that is not a wipe. The outgoing scene is pushed back and away while the incoming one
 * comes forward from slightly under size, so the change of subject reads as depth rather than as
 * two pictures dissolving into each other.
 *
 * There is no crossfade anywhere in this video, and this is the transition that would have been
 * one.
 */

type ScalePushProps = Record<string, never>;

const ScalePushPresentation: React.FC<
  TransitionPresentationComponentProps<ScalePushProps>
> = ({ children, presentationDirection, presentationProgress }) => {
  const exiting = presentationDirection === "exiting";

  return (
    <AbsoluteFill
      style={{
        scale: exiting
          ? String(1 - presentationProgress * 0.06)
          : String(0.9 + presentationProgress * 0.1),
        // The incoming scene is opaque within three frames, so it covers the outgoing one instead
        // of dissolving through it. A dissolve is the one cut this video does not make.
        opacity: exiting ? 1 : Math.min(1, presentationProgress * 4),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const scalePush = (): TransitionPresentation<ScalePushProps> => ({
  component: ScalePushPresentation,
  props: {},
});
