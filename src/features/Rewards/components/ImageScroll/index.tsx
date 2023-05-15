import { useRef } from "react";
import Styles from "./index.module.scss";
import useInitImgContainer from "./useInitImg";

function ImageScroll({
  imgArr,
  imgWidth = 220,
}: {
  imgArr: string[];
  imgWidth?: number;
}) {
  const Container = useRef<HTMLDivElement>(null);

  useInitImgContainer({ Container, imgArr, imgWidth });

  return <div className={Styles.container} ref={Container}></div>;
}

export default ImageScroll;
