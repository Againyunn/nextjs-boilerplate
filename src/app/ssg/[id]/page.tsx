import { notFound } from "next/navigation";
import testApi from "api/testApi";

export async function generateStaticParams() {
  // Generate two pages at build time and the rest (3-100) on-demand
  return [{ id: "1" }, { id: "2" }];
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (Number(params.id) >= 100) {
    notFound();
  }

  // const res = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${params.id}`
  // );
  const res = await testApi.getTestById(params.id);
  const data = res as { title: string; body: string };

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {data.title}
        </h1>
        <p className="line-clamp-3 font-medium text-gray-500">{data.body}</p>
      </div>
    </div>
  );
}
