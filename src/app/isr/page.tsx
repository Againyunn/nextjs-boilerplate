"use client";

import { useEffect, useState } from "react";

// BulletinBoard
const Page = () => {
  const [res, setRes] = useState<{ id: string; title: string; body: string }[]>(
    []
  );

  const ids = [{ id: "1" }, { id: "2" }];

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all(
        ids.map(async (cur) => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${cur.id}`
          );
          const data = (await res.json()) as { title: string; body: string };
          return { id: cur.id, ...data };
        })
      );
      setRes(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      {res.map((item) => (
        <div key={item.id}>
          <h3> {item.id} </h3>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
