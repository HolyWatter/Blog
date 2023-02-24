import { useRouter } from "next/router";
import { moveBtnFunction } from "../../../src/function/moveBtnFunction";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="fixed md-m:hidden inline-block align-top mt-10 px-10">
      <div className="flex flex-col space-y-5 pl-3">
        <button
          onClick={(e) => {
            moveBtnFunction(e, router.push);
          }}
          value="/develop"
        >
          개발일지
        </button>
        <button
          onClick={(e) => {
            moveBtnFunction(e, router.push);
          }}
          value="/develop/post"
        >
          개발일지 작성
        </button>
        <button
          onClick={(e) => {
            moveBtnFunction(e, router.push);
          }}
          value="/guestbook"
        >
          방명록 작성
        </button>
      </div>
    </div>
  );
}
