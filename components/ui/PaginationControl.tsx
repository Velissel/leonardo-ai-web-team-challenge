import {
  ButtonGroup,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationControlProps {
  /** Total number of items to paginate. */
  count: number;
  /** Number of items per page. */
  pageSize: number;
  /** The currently active page (1-indexed). */
  currentPage: number;
  /** Callback function triggered when the page changes. Receives the new page number. */
  onPageChange: (page: number) => void;
}

const PaginationControl = ({
  count,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationControlProps) => {
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={(details) => onPageChange(details.page)}
    >
      <ButtonGroup variant="ghost" size="sm" wrap="wrap">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Go to previous page">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              aria-label={`Go to page ${page.value}`}
              variant={{ base: "ghost", _selected: "outline" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Go to next page">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationControl;
