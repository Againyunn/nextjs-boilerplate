// const baseURL = process.env.NEXT_PUBLIC_API_URL;

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const data = (await res.json()) as { title: string; body: string };

  return !params.id ? (
    <div>
      <h1>
        {params.id} {data.title}
      </h1>
    </div>
  ) : (
    <div>no id</div>
  );
};

// export async function generateMetadata({
//   params,
// }: {
//   params: { categoryId: string; id?: string };
// }): Promise<Metadata> {
//   let searchParams = "";

//   console.log("Generated static params id:", params);

//   if (params.id) {
//     searchParams += `?postId=${params.id}`;
//     const post: PostDto[] = await fetch(`${baseURL}/post${searchParams}`).then(
//       (res) => res.json()
//     );

//     const idx = post.findIndex((info) => info.id.toString() === params.id) ?? 0;

//     console.log("current post idx : ", idx, params.id);

//     const images = await Promise.all(
//       post[idx].fileId.map(async (id: string) => {
//         const response = await fetch(`${baseURL}/file/download?fileId=${id}`);
//         const url = `${baseURL}/file/download?fileId=${id}`;
//         const contentDisposition = response.headers.get("content-disposition");
//         const fileName = contentDisposition
//           ? contentDisposition.split(";")[1].trim().split("=")[1]
//           : "image";

//         return {
//           title: fileName,
//           url: url,
//           width: 600,
//           height: 350,
//         };
//       })
//     );

//     const tags = post[idx].tag.map((tag) => tag.name);

//     return {
//       title: post[idx].title,
//       description: post[idx].summary,
//       keywords: tags,
//       openGraph: {
//         images: images.map((img) => ({
//           url: img.url,
//           alt: img.title,
//           width: img.width,
//           height: img.height,
//         })),
//       },
//     };
//   }

//   // 기본적인 메타데이터 반환 (게시글 목록 페이지 등)
//   return {
//     title: "게시판",
//     description: "게시글 목록 페이지",
//     keywords: ["게시글", "카테고리"],
//     openGraph: {
//       images: [],
//     },
//   };
// }

export async function generateStaticParams() {
  // const categories = await fetch(`${baseURL}/category/list`).then((res) =>
  //   res.json()
  // );

  // const staticParams = await Promise.all(
  //   categories.map(async (category: CategoryDto) => {
  //     const posts: PostDto[] = await fetch(
  //       `${baseURL}/post?categoryId=${category.id}`
  //     ).then((res) => res.json());

  //     return posts.map((post) => ({
  //       categoryId: category.id.toString(),
  //       id: post.id.toString(),
  //     }));
  //   })
  // );

  // const params = staticParams.flat();

  // const params = await props.params;

  // // 디버깅 로그 추가
  // console.log("Generated static params:", params);

  // return params;

  return [{ id: "1" }, { id: "2" }];
}

// ISR을 위한 revalidate 적용 (예: 60초마다 페이지 갱신)
export const revalidate = 60;

export default Page;
