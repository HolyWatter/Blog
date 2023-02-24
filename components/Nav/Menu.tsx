import { useRouter } from "next/router";
import { moveBtnFunction } from "../../src/function/moveBtnFunction";

interface Props {
  logout: () => Promise<void>;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu = ({ logout, setIsMenu }: Props) => {
  const router = useRouter();
  return (
    <div className="fixed top-[64px] right-[20px] z-10 flex w-[170px] flex-col items-start space-y-4 rounded-md bg-origin py-5 pl-3 text-gray-200">
      <button
        value="/mypage"
        onClick={(e) => {
          moveBtnFunction(e, router.push);
          setIsMenu((prev) => !prev);
        }}
      >
        내활동
      </button>
      <button className="" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};
