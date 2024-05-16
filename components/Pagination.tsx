import React from "react";
import Link from "next/link";
import { API_URL, PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }: any) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link href={`/news?page=${page - 1}`}>
          <a className="btn btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/news?page=${page + 1}`}>
          <a className="btn btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
}
