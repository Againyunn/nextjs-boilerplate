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
    <div className="flex flex-col justify-start item-start gap-y-4 ">
      Page
      {res && (
        <>
          {res.id}
          {res.title}
          {res.body}
        </>
      )}
      <button
        className="w-40 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>
      <button
        className="w-40 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
        onClick={() => toast.toastMsg("test", "test", "error")}
      >
        토스트
      </button>
      <Popup
        title="Modal"
        footer={
          <button
            className="w-20 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
            onClick={() => setIsModalOpen(false)}
          >
            닫기
          </button>
        }
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
            <button
              className={`w-20 bg-blue-500 opacity-50 rounded-md text-white cursor-not-allowed ${
                uploadFiles.length > 0
                  ? "cursor-pointer opacity-100 hover:bg-blue-600"
                  : ""
              }`}
              onClick={handleSubmitFiles}
              disabled={uploadFiles.length === 0}
            >
              Submit
            </button>
          </>
        </div>
      </Popup>
    </div>
  );
};

export default Page;
