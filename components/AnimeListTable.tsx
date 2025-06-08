import { Table } from "@chakra-ui/react";

// Define interfaces for props and media items for type safety
interface MediaTag {
  name: string;
}

interface MediaTitle {
  userPreferred: string;
}

interface MediaItem {
  id: number;
  title: MediaTitle;
  type: string;
  genres: string[];
  tags: MediaTag[];
  averageScore: number | null;
}

interface AnimeListTableProps {
  media: MediaItem[];
}

const AnimeListTable = ({ media }: AnimeListTableProps) => {
  if (!media || media.length === 0) {
    return <p>No anime data to display.</p>;
  }

  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader minW="200px">Title</Table.ColumnHeader>
            <Table.ColumnHeader minW="100px">Type</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px">Genres</Table.ColumnHeader>
            <Table.ColumnHeader minW="300px">Tags</Table.ColumnHeader>
            <Table.ColumnHeader minW="80px" textAlign="end">Score</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {media.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title.userPreferred}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.genres.join(", ")}</Table.Cell>
              <Table.Cell>{item.tags.map(tag => tag.name).join(", ")}</Table.Cell>
              <Table.Cell textAlign="end">{item.averageScore !== null ? item.averageScore : 'N/A'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default AnimeListTable;
