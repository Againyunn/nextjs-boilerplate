"use client";

import { useEffect, useState } from "react";

import FileDragDropArea from "components/atom/FileDragDropUpload";
// import FileUpload from "components/atom/FileUpload";
import Popup from "components/molecules/Popup";
import testApi from "api/testApi";
import { useSearchParams } from "next/navigation";
import { useToast } from "utils/toast/ToastContext";

const Page = () => {
  const params = useSearchParams();
  const [res, setRes] = useState<{ id: string; title: string; body: string }>();
  const id = params.get("id");
  // const categoryId = params.get("categoryId");
  // const postId = params.get("postId");

  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // console.log(categoryId, postId);

  const handleSubmitFiles = async (): Promise<void> => {
    const formData = new FormData();
    uploadFiles.forEach((file) => {
      formData.append("file", file);
    });

    console.log(formData);

    const response = await fetch(
      "http://localhost:3050/apis/admin2/upload/img",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log(response);
  };

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
    <div className="bg-red-500">
      Page
      {res && (
        <>
          {res.id}
          {res.title}
          {res.body}
        </>
      )}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <button onClick={() => toast.toastMsg("test", "test", "error")}>
        toast
      </button>
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
            {/* <FileUpload onChange={setUploadFiles} /> */}
            <FileDragDropArea onChange={setUploadFiles}></FileDragDropArea>
            <button onClick={handleSubmitFiles}>Submit</button>
          </>
        </div>
      </Popup>
    </div>
  );
};

export default Page;
