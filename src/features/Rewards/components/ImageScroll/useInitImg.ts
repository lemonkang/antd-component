import { useDebounceFn, useEventListener, useMount } from "ahooks";

export type ImgContainerType = {
  Container: React.RefObject<HTMLDivElement>;
  imgArr: string[];
  imgWidth: number;
};

const useInitImgContainer = (props: ImgContainerType) => {
  const handleResize = useDebounceFn(
    () => {
      setPositions(props);
    },
    { wait: 500 }
  );
  useMount(() => {
    createImgList(props);
  });
  useEventListener("resize", handleResize.run);
};

export default useInitImgContainer;

const createImgList = (props: ImgContainerType) => {
  const { imgArr, imgWidth, Container } = props;
  for (const i of imgArr) {
    const img = document.createElement("img");
    img.src = i;
    img.width = imgWidth;
    img.onload = () => {
      setPositions({ imgArr, imgWidth, Container });
    };
    Container.current?.appendChild(img);
  }
};

const cal = ({ imgWidth, Container }: ImgContainerType) => {
  if (!Container.current) return;
  const containerWidth = Container.current.clientWidth;
  const column = Math.floor(containerWidth / imgWidth);
  const spaceNumber = column + 1;
  const leftSpace = containerWidth - column * imgWidth;
  const space = leftSpace / spaceNumber;
  return {
    space,
    column,
  };
};

const setPositions = (props: ImgContainerType) => {
  const { imgWidth, Container } = props;
  const info = cal(props);
  if (!info || !Container.current) return;
  const nextTops = new Array<number>(info.column);
  const childrenLength = Container.current.children.length;
  nextTops.fill(0);
  for (let i = 0; i < childrenLength; i++) {
    const img = Container.current.children[i] as HTMLImageElement;
    const minTop = Math.min.apply(null, nextTops);
    img.style.top = `${minTop}px`;
    const index = nextTops.indexOf(minTop);
    nextTops[index] += img.height + info.space;
    const left = (index + 1) * info.space + index * imgWidth;
    img.style.left = `${left}px`;
  }
  const max = Math.max.apply(null, nextTops);
  Container.current.style.height = `${max}px`;
};
