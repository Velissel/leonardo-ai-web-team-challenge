"use client";

import { useRouter } from "next/navigation";
import PaginationControl from "@/components/ui/PaginationControl";

interface AniListPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const AniListPagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
}: AniListPaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/ani-list?page=${newPage}&offset=${itemsPerPage}`);
  };

  if (totalItems <= itemsPerPage) {
    return null;
  }

  return (
    <PaginationControl
      count={totalItems}
      pageSize={itemsPerPage}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export default AniListPagination;
