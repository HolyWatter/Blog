import { useEffect } from "react";

interface Props {
  clickClose: () => void;
}

export const PostingModal = ({ clickClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-30 h-screen w-full bg-black/70">
      <div className="absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white text-center">
        <div className="flex min-w-[350px] flex-col space-y-5 py-5">
          <button>게시글 삭제하기</button>
          <button>게시글 수정하기</button>
          <button onClick={clickClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};
