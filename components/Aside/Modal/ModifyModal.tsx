import { useEffect } from "react";

interface Props {
  value: string;
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  clickClose: () => void;
  clickConfirm: () => Promise<void>;
  message: string;
}

export const ModifyModal = ({
  value,
  message,
  clickClose,
  setFunction,
  clickConfirm,
}: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFunction(e.target.value);
  };

  return (
    <div className="fixed top-0 right-0 z-20 h-screen w-full bg-black/70">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md bg-white">
        <div>
          <p className="py-5 text-center">{message} 수정</p>
          <textarea
            onChange={inputText}
            value={value}
            className="min-w-[400px] resize-none py-1 pl-5 focus:outline-none"
            placeholder={`${message}을 수정하세요`}
          />
        </div>
        <div className="flex justify-center space-x-3 py-3">
          <button
            onClick={clickClose}
            className="rounded-md border bg-gray-500 px-5 py-1 text-white"
          >
            닫기
          </button>
          <button
            onClick={clickConfirm}
            className="rounded-md border bg-origin px-5 py-1 text-white"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
