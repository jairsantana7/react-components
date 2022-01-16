import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PromotionList from "../List/List";
import "./Serach.css";
import useApi from "../utils/useApi";
import { useRef } from "react";
import UIInfiniteScroll from "components/UI/InfiniteScroll.js/InfiniteScroll";

const baseParams = {
  _embed: "comments",
  _order: "desc",
  _sort: "id",

  _limit: 4,
  _page: 1
};

const PromotionSearch = () => {
  const [page, setPage] = useState(1);
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    debounceDelay: 500,
    url: "/promotions",
    method: "get"

    // onCompleted: response => {
    //   setPromotions(response.data);
    // }
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined
      }
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function fetchMore() {
    const newPage = page + 1;
    load({
      isfetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [...prevRequestInfo.data, ...newRequestInfo.data]
      })
    });
    setPage(newPage);
  }

  return (
    <div className="promotion-search">
      <header className="promotions-search__header">
        <h1>Promo Show</h1>
        <Link to="/create">New Promotion</Link>
      </header>

      <label htmlFor="title">Título</label>

      <input
        id="title"
        className="promotions-search__input"
        placeholder="Buscar"
        value={search}
        onChange={event => {
          setSearch(event.target.value);
        }}
        type="search"
      />

      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
      {loadInfo.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total && (
          <UIInfiniteScroll fetchMore={fetchMore} />
        )}
    </div>
  );
};

export default PromotionSearch;
