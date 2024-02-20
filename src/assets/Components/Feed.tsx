import React, { useEffect } from "react";
import { dogFetch, useAsyncUserData } from "./stores";
import Loading from "./Loading";

const Feed = () => {
  const { user, logged } = useAsyncUserData();
  const { data, request, loading } = dogFetch();

  useEffect(() => {
    if (logged && user) request();
  }, [logged, request, user]);

  return (
    <>
      <div className="feedContainer">
        {data?.map((item) => (
          <div key={item.id} className="feedGrid slide">
            <img src={item.src} alt="" />
            <p>{item.title}</p>
            <span>{item.acessos}</span>
          </div>
        ))}
        {loading ? (
          <Loading />
        ) : (
          <button onMouseUp={request} type="submit">
            +
          </button>
        )}
      </div>
    </>
  );
};

export default Feed;
