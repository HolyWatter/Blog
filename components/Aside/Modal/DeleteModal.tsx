import { useEffect } from "react";

interface Props {
  clickClose: () => void;
  clickConfirm: any;
  message: string;
}

export const DeleteModal = ({ message, clickClose, clickConfirm }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 right-0 z-20 h-screen w-full bg-black/70">
      <div className="absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white text-center">
        <p className="py-2">{message} 삭제</p>
        <div className="border-b" />
        <div className="pt-5 pb-7 text-gray-500">
          <p className="whitespace-nowrap px-[50px]">
            정말로 {message}을 삭제하시겠습니까?
          </p>
          <p className="whitespace-nowrap px-5">
            삭제 한 뒤에는 복구할 수 없습니다.
          </p>
        </div>
        <div className="border-b" />
        <div className="flex justify-center space-x-5 py-3">
          <button
            className="rounded-md border bg-gray-600 px-7 py-2 text-white"
            onClick={clickClose}
          >
            닫기
          </button>
          <button
            onClick={clickConfirm}
            className="rounded-md border bg-origin px-7 py-2 text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
