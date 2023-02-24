import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import React, { useState } from "react";
import CropProfile from "../SignUp/CropProfile";

interface Props {
  setIsModifyImg: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const MODIFYIMG = gql`
  mutation modifyProfileImg($img: Upload) {
    modifyProfileImg(img: $img) {
      thumbnail_url
    }
  }
`;

export const ModifyProfileImg = ({ setIsModifyImg, refetch }: Props) => {
  const [img, setImg] = useState<string>();
  const [cropImg, setCropImg] = useState<string>();
  const clickClose = () => {
    setIsModifyImg((prev) => !prev);
  };

  const selectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget as any;
      setImg(result);
    };
  };

  const [imgMutation, data] = useMutation(MODIFYIMG, {
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  const submitMutation = async () => {
    await imgMutation({
      variables: {
        img: cropImg,
      },
    });
    alert("프로필 이미지가 변경되었습니다.");
    clickClose();
    refetch();
  };
  return (
    <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/70">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white">
        <p className="px-3 py-2">프로필 이미지 수정</p>
        <div className="border-b" />
        <input
          onChange={selectImg}
          className="px-3 py-5"
          type="file"
          multiple={false}
          accept="image/*"
        />
        <div className="max-w-[500px] px-3 pr-5">
          <CropProfile img={img} setProfileImg={setCropImg} />
        </div>
        <div className="flex justify-center space-x-4 py-3">
          <button
            className="rounded-md border bg-gray-600 px-5 py-1 text-white"
            onClick={clickClose}
          >
            닫기
          </button>
          <button
            className="rounded-md border bg-origin px-5 py-1 text-white"
            onClick={submitMutation}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
