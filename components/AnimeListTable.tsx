'use client';

import { useState } from "react";
import { Table } from "@chakra-ui/react";
import type { MediaItem } from "@/types/anime";
import AniDetailsDrawer from "./AniDetailsDrawer";

interface AnimeListTableProps {
  media: MediaItem[];
}

const AnimeListTable = ({ media }: AnimeListTableProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  if (!media || media.length === 0) {
    return <p>No anime data to display.</p>;
  }

  const handleRowClick = (item: MediaItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Table.ScrollArea borderWidth="1px">
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader minW="200px">Title</Table.ColumnHeader>
              <Table.ColumnHeader minW="100px">Type</Table.ColumnHeader>
              <Table.ColumnHeader minW="80px">Score</Table.ColumnHeader>
              <Table.ColumnHeader minW="200px">Genres</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {media.map((item) => (
              <Table.Row 
                key={item.id} 
                onClick={() => handleRowClick(item)}
                cursor="pointer"
                _hover={{ backgroundColor: "gray.100", _dark: { backgroundColor: "gray.700" } }}
              >
                <Table.Cell>{item.title.userPreferred}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.averageScore !== null ? item.averageScore : 'N/A'}</Table.Cell>
                <Table.Cell>{item.genres.join(", ")}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <AniDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
        placement="bottom"
      />
    </>
  );
};

export default AnimeListTable;
