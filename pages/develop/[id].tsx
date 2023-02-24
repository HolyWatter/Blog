import { gql, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Markdown } from "../../components/Aside/Markdown/Markdown";
import { CommentType } from "../../src/interface";
import SwiperComponents from "../../components/Public/SwiperComponents";
import DevelopCommentForm from "../../components/Develop/DevelopDetail/DevelopCommentForm";
import DevelopComment from "../../components/Develop/DevelopDetail/DevelopComments";
import { useEffect, useState } from "react";
import { DeleteModal } from "../../components/Aside/Modal/DeleteModal";

const DETAIL = gql`
  query markdownDetail($id: Int!) {
    markdownDetail(id: $id) {
      id
      text
      title
      created
      comments {
        id
        text
        writer {
          id
          nickname
        }
      }
      MarkdownTag {
        id
        tag
      }
      MarkdownImg {
        id
        location
      }
      author {
        id
        nickname
      }
    }
  }
`;

const DELETE = gql`
  mutation deleteMarkdown($id: Int!) {
    deleteMarkdown(id: $id) {
      id
    }
  }
`;

const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
      thumbnail_url
    }
  }
`
export default function DevelopDetail() {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [getData, { data, loading, refetch }] = useLazyQuery(DETAIL);
  const currentUser = useQuery(CURRENTUSER);

  const [deleteMutation, deleteRes] = useMutation(DELETE);

  useEffect(() => {
    getData({
      variables: {
        id: parseInt(router.query.id as string),
      },
    });
  }, [router.isReady]);

  const clickDelete = () => {
    setIsDeleteModal((prev) => !prev);
  };

  useEffect(() => {
    if (deleteRes.data) {
      alert("삭제되었습니다.");
      router.push("/develop");
    }
  }, [deleteRes]);

  const clickConfirm = async () => {
    await deleteMutation({
      variables: {
        id: data.markdownDetail.id,
      },
    });
  };

  return (
    <div className="py-16 md-m:px-3 md:px-[13%]">
      {!loading && data && (
        <div>
          <div className="flex items-end justify-between border-b-2 border-origin">
            <p className=" pb-4 text-5xl font-semibold sm-m:text-4xl">
              {data.markdownDetail.title}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4 py-3">
              <p className="text-xl">{data.markdownDetail.author.nickname}</p>
              <p className="text-sm text-gray-500">
                {new Intl.DateTimeFormat("KR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(data.markdownDetail.created))}
              </p>
            </div>
            {currentUser?.data?.currentUser?.nickname === data.markdownDetail.author.nickname && (
              <div className="space-x-3">
                <button onClick={clickDelete} className="underline">
                  삭제
                </button>
                <button onClick={() => {}} className="underline">
                  수정
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap space-x-3">
            {data.markdownDetail.MarkdownTag.map(
              (item: { id: number; tag: string }) => (
                <p
                  className="mb-4 rounded-full bg-origin px-3 py-1 text-white"
                  key={item.id}
                >
                  {item.tag}
                </p>
              )
            )}
          </div>
          <div className="z-0 px-5">
            {<SwiperComponents img={data.markdownDetail.MarkdownImg} />}
          </div>
          <div className="py-[20px]">
            <Markdown markdown={data.markdownDetail.text} />
          </div>
          <div className="space-y-3">
            <p>{data.markdownDetail.comments.length} 개의 댓글</p>
            <DevelopCommentForm refetch={refetch} />
          </div>
          <div>
            {data.markdownDetail.comments.map((comment: CommentType) => (
              <DevelopComment
                key={comment.id}
                comment={comment}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      )}
      {isDeleteModal && (
        <DeleteModal
          message="게시글"
          clickClose={clickDelete}
          clickConfirm={clickConfirm}
        />
      )}
    </div>
  );
}
