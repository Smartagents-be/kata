/**
 * The grid every scene lays out against, and the one spring the whole piece moves on.
 *
 * Twelve columns inside 80px margins. A scene asks for a width in columns rather than in pixels,
 * so two scenes that both say `span(5)` line up exactly, and the gutters never have to be counted
 * by hand.
 */

export const FRAME_WIDTH = 1920;
export const FRAME_HEIGHT = 1080;

export const MARGIN = 80;
export const GUTTER = 24;
export const CONTENT_WIDTH = FRAME_WIDTH - MARGIN * 2;
export const COLUMN = (CONTENT_WIDTH - GUTTER * 11) / 12;

/** The width of `n` columns with the gutters between them. */
export const span = (n: number) => n * COLUMN + (n - 1) * GUTTER;

/** The x of column `n`, counting from 1 at the left margin. */
export const at = (n: number) => MARGIN + (n - 1) * (COLUMN + GUTTER);

/**
 * Every entrance in this video is this spring. Light damping so things overshoot a little and
 * settle, which is what makes a spring read as a spring rather than as an ease.
 */
export const SPRING = { damping: 13, mass: 0.6, stiffness: 110 } as const;

/** A slower, heavier one for the things that carry weight: a pane arriving, a logo landing. */
export const SPRING_HEAVY = { damping: 15, mass: 1.1, stiffness: 90 } as const;

/** How long a cut between scenes takes. Fast enough to read as a cut with a direction. */
export const TRANSITION_FRAMES = 9;
