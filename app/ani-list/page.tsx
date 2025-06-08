import queryAniList from "@/data/query-ani-list";
import AnimeListTable from "@/components/AnimeListTable";
import AniListPagination from "@/components/AniListPagination";
import { Box, Heading, Stack } from "@chakra-ui/react";

export default async function AniListPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const pageQuery = (await searchParams)?.page;
    const offsetQuery = (await searchParams)?.offset;

    let page = 1;
    if (pageQuery) {
      const parsedPage = parseInt(pageQuery, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        page = parsedPage;
      }
    }

    let offset = 10; // Default items per page
    if (offsetQuery) {
      const parsedOffset = parseInt(offsetQuery, 10);
      if (!isNaN(parsedOffset) && parsedOffset > 0) {
        offset = parsedOffset;
      }
    }

    const response = await queryAniList(page, offset);
    // The actual data is nested under response.data.Page.media
    const mediaData = response?.data?.Page?.media;
    const pageInfo = response?.data?.Page?.pageInfo;
    const totalItems = pageInfo?.total || 0;
    // Use the 'page' variable derived from searchParams as currentPage,
    // as it's the source of truth for the current view.
    // 'offset' is itemsPerPage.

    const showPagination = mediaData && mediaData.length > 0 && totalItems > offset;

    return (
      <Stack direction="column" align="stretch">
        <Box mb={6}>
          <Heading as="h1">
            Ani-List
          </Heading>
        </Box>
        {showPagination && (
          <Box mb={6}>
            <AniListPagination
              currentPage={page}
              itemsPerPage={offset}
              totalItems={totalItems}
            />
          </Box>
        )}
        {mediaData && mediaData.length > 0 ? (
          <Box mb={showPagination ? 6 : 0}> {/* Add margin only if bottom pagination will be shown */}
            <AnimeListTable media={mediaData} />
          </Box>
        ) : (
          <Box mb={showPagination ? 6 : 0}>
            <p>No data available for the current selection or failed to load.</p>
          </Box>
        )}
        {showPagination && (
          <Box> {/* No mb for the last element */}
            <AniListPagination
              currentPage={page}
              itemsPerPage={offset}
              totalItems={totalItems}
            />
          </Box>
        )}
      </Stack>
    );
  } catch (error) {
    console.error("Failed to fetch AniList data:", error);
    return (
      <Stack direction="column" align="stretch" p={4}>
        <Box mb={6}>
          <Heading as="h1">
            Ani-List Page (Protected)
          </Heading>
        </Box>
        <Box>
          <p>Error loading data. Please try again later.</p>
        </Box>
      </Stack>
    );
  }
}
