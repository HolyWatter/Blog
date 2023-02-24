import { gql, useMutation, useQuery } from "@apollo/client";
import GuestBookItem from "../../components/GuestBook/GuestBookItem";
import { GuestBookType } from "../../src/interface";
import React, { useState } from "react";

const ALLGUESHBOOK = gql`
  query allGuestBook {
    allGuestBook {
      id
      text
      created
      writer {
        id
        nickname
        thumbnail_url
      }
    }
  }
`;

const WRITEGUESTBOOK = gql`
  mutation writeGuestBook($text: String!) {
    writeGuestBook(text: $text) {
      id
      text
    }
  }
`;

export default function Guestbook() {
  const [text, setText] = useState<string>("");
  const { data, refetch } = useQuery(ALLGUESHBOOK);
  const [writeMutation] = useMutation(WRITEGUESTBOOK);

  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const submitGuestBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await writeMutation({
      variables: {
        text,
      },
    });
    setText("");
    refetch();
  };

  return (
    <div className="mx-auto max-w-[700px]">
      <form
        className="mt-10 flex w-full items-center"
        onSubmit={submitGuestBook}
      >
        <textarea
          onChange={inputText}
          value={text}
          placeholder="방명록을 작성해주세요"
          className="h-16 w-[85%] resize-none rounded-md border bg-bg py-3 pl-3 focus:border-[2px] focus:border-origin focus:outline-none "
        />
        <button className="h-16 rounded-md bg-origin px-3 text-white">
          작성
        </button>
      </form>
      <div className="my-10 w-[95%]">
        {data?.allGuestBook.map((item: GuestBookType) => (
          <GuestBookItem key={item.id} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
