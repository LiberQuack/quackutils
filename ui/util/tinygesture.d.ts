declare module "tinygesture" {

    type EVENT_NAME = "panstart" | "panmove" | "panend" | "swiperight" | "swipeleft" | "swipeup" | "swipedown" | "tap" | "doubletap" | "longpress"

    type Options = {
        threshold: (type: EVENT_NAME, self: TinyGesture) => number,
        // Minimum velocity the gesture must be moving when the gesture ends to be
        // considered a swipe.
        velocityThreshold: number,
        // Used to calculate the distance threshold to ignore the gestures velocity
        // and always consider it a swipe.
        disregardVelocityThreshold: (type: EVENT_NAME, self: TinyGesture) => number,
        // Point at which the pointer moved too much to consider it a tap or longpress
        // gesture.
        pressThreshold: number,
        // If true, swiping in a diagonal direction will fire both a horizontal and a
        // vertical swipe.
        // If false, whichever direction the pointer moved more will be the only swipe
        // fired.
        diagonalSwipes: boolean,
        // The degree limit to consider a swipe when diagonalSwipes is true.
        diagonalLimit: number,
        // Listen to mouse events in addition to touch events. (For desktop support.)
        mouseSupport: boolean,
    };


    class TinyGesture {

        constructor(target: HTMLElement, options?: Partial<Options>) {}

        on(type: EVENT_NAME, cb: (originalEvent: MouseEvent | TouchEvent) => void)

        /**
         * The (screen) x coordinate of the start of the gesture.
         */
        public touchStartX: number;

        /**
         * The (screen) y coordinate of the start of the gesture.
         */
        public touchStartY: number;

        public touchEndX: number;
        public touchEndY: number;

        /** The amount the gesture has moved in the x direction. */
        public touchMoveX: number;

        /** The amount the gesture has moved in the y direction. */
        public touchMoveY: number;

        /** The instantaneous velocity in the x direction. */
        public velocityX: number;

        /** The instantaneous velocity in the y direction. */
        public velocityY: number;

        /** Boolean, whether the gesture has passed the swiping threshold in the x
         direction. */
        public swipingHorizontal: boolean;

        /** Boolean, whether the gesture has passed the swiping threshold in the y
         direction. */
        public swipingVertical: boolean;

        public swipedHorizontal: boolean;
        public swipedVertical: boolean;

        /** Which direction the gesture has moved most. Prefixed with 'pre-' if the
         gesture hasn't passed the corresponding threshold.
         One of: ['horizontal', 'vertical', 'pre-horizontal', 'pre-vertical'] */
        public swipingDirection: 'horizontal' | 'vertical' | 'pre-horizontal' | 'pre-vertical';
    }

    export default TinyGesture
}