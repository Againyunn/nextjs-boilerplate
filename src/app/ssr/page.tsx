export default async function Page() {
  const ids = [{ id: "1" }, { id: "2" }];

  const res = await Promise.all(
    ids.map(async (cur) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${cur.id}`
      );
      const data = (await res.json()) as { title: string; body: string };
      return { id: cur.id, ...data };
    })
  );

  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Dynamic Data</h1>
      <ul>
        <li>
          Dynamic, or server-rendered data, is fetched fresh on each request.
        </li>
        <li>In this example, the post responses are explicitly not cached.</li>
        <li>
          Try navigating to each post and noting the timestamp of when the page
          was rendered.
        </li>
      </ul>
      <div className="flex gap-2">
        <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching">
          Docs
        </a>
        <a href="https://github.com/vercel/app-playground/tree/main/app/ssr">
          Code
        </a>
      </div>
      <br />
      <div>렌더링 결과</div>
      {res.map((item) => (
        <div key={item.id}>
          <h3> {item.id} </h3>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
