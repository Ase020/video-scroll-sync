import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React from "react";

function App() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const images = React.useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i < 86; i++) {
      const img = new Image();
      img.src = `/assets/${i}.webp`;
      img.alt = `image-${i}`;
      loadedImages.push(img);
    }

    return loadedImages;
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "start start"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 86]);

  const render = React.useCallback(
    (index: number) => {
      if (images[index - 1]) {
        ref.current?.getContext("2d")?.drawImage(images[index - 1], 0, 0);
      }
    },
    [images]
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  return (
    <div
      style={{
        height: "6000px",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "1000px" }} />
      <canvas ref={ref} width={1000} height={1000}>
        ase
      </canvas>
    </div>
  );
}

export default App;
