import { useEffect, useState } from "react";
import { Movie, TV } from "types";

const useImagePreload = (items: (Movie | TV)[]) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const number = () => {
    const width = window.innerWidth;
    if (width >= 2000) {
      return 7;
    }
    if (width >= 1600) {
      return 6;
    }
    if (width >= 1200) {
      return 5;
    }
    if (width >= 800) {
      return 4;
    }
    if (width >= 500) {
      return 3;
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      const preloadImages = async () => {
        const photoArr = items
          .slice(0, number())
          .map((item) => item.backdrop_path);

        const arr = await Promise.all(
          photoArr.map(async (photo, i) => {
            const img = new Image();
            img.src =
              `https://image.tmdb.org/t/p/w1280${photo}` || "/noImg.png";
            const index = await new Promise<number>((resolve) => {
              img.onload = () => {
                resolve(i);
              };
            });
            return index;
          })
        );
        if (arr.length === photoArr.length) {
          setImageLoaded(true);
        }
      };
      preloadImages();
    }
  }, [items]);

  return { imageLoaded };
};

export default useImagePreload;
