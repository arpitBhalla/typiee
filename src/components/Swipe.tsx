import { useRef } from "react";

import { Lethargy } from "@/lib/Lethargy";

let acc = 0,
  disableTimeout: NodeJS.Timeout | null = null,
  disabledSwipe: number | boolean = false,
  timeout: NodeJS.Timeout | null = null;

interface SwipeProps {
  onSwipe: (direction: "up" | "down") => void;
}

export const Swipe = ({
  children,
  onSwipe,
}: React.PropsWithChildren<SwipeProps>) => {
  const LethargyRef = useRef(new Lethargy());

  const handleWheelScroll: React.WheelEventHandler<HTMLDivElement> = (ev) => {
    const { upHandler: r, downHandler: i } = {
      downHandler: onSwipe.bind(null, "down"),
      upHandler: onSwipe.bind(null, "up"),
    };
    const shouldSwipe = LethargyRef.current.check(ev);
    const deltaY = ev.deltaY;
    if (!disabledSwipe && shouldSwipe) {
      acc += deltaY;
      SetTimeout(() => {
        acc = 0;
      });
      acc < -300 && (r(), (acc = 0), disableSwipe(500));
      acc > 300 && (i(), (acc = 0), disableSwipe(500));
    }
  };

  return <div onWheel={handleWheelScroll}>{children}</div>;
};

function SetTimeout(t: () => void) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(t, 500);
}

function disableSwipe(t: number) {
  if (disableTimeout) {
    clearTimeout(disableTimeout);
  }
  disabledSwipe = true;
  disableTimeout = setTimeout(() => {
    disabledSwipe = !1;
  }, t);
}
