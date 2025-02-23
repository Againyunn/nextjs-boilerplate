"use client";

import { useEffect, useState } from "react";

import Popup from "components/molecules/Popup";
import testApi from "api/testApi";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  const [res, setRes] = useState<{ id: string; title: string; body: string }>();
  const id = params.get("id");
  // const categoryId = params.get("categoryId");
  // const postId = params.get("postId");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(categoryId, postId);

  useEffect(() => {
    if (!id) {
      return;
    }

    // const fetchData = async () => {
    //   const res = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${id}`
    //   );
    //   const data = (await res.json()) as { title: string; body: string };

    //   setRes({ ...data, id: id });
    // };
    // fetchData();

    testApi.getTestById(id).then((resp) => {
      setRes({ ...resp, id: id });
    });
  }, [id]);

  return (
    <div>
      Page
      {res && (
        <>
          {res.id}
          {res.title}
          {res.body}
        </>
      )}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Popup
        title="Modal"
        footer={<button onClick={() => setIsModalOpen(false)}>Close</button>}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="500px"
      >
        <div>
          <>
            {res?.id}
            {res?.title}
            {res?.body}
          </>
        </div>
      </Popup>
    </div>
  );
};

export default Page;
