'use client';

import {
  CloseButton,
  Drawer,
  Portal,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerCloseTrigger,
  Image,
  VStack,
  Separator,
} from "@chakra-ui/react";
import type { MediaItem } from "@/types/anime";

interface AniDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: MediaItem | null;
  placement?: "top" | "bottom" | "start" | "end";
}

const AniDetailsDrawer = ({
  isOpen,
  onClose,
  item,
  placement = "bottom",
}: AniDetailsDrawerProps) => {
  return (
    <Drawer.Root 
      open={isOpen} 
      onOpenChange={(openStatus) => {
        if (!openStatus) {
          onClose();
        }
      }} 
      placement={placement}
    >
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent
            roundedTop={placement === "bottom" ? "l3" : undefined}
            roundedBottom={placement === "top" ? "l3" : undefined}
            roundedStart={placement === "end" ? "l3" : undefined}
            roundedEnd={placement === "start" ? "l3" : undefined}
          >
            <DrawerHeader>
              <DrawerTitle>
                {item ? item.title.userPreferred : "Details"}
              </DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <VStack alignItems='start'>
                <Image src={item?.bannerImage}/>
                <p>ID: {item?.id}</p>
                <p>Type: {item?.type}</p>
                <p>Average Score: {item?.averageScore !== null ? item?.averageScore : 'N/A'}</p>
                <p>Genres: {item?.genres.join(", ")}</p>
                <p>Tags: {item?.tags.map(tag => tag.name).join(", ")}</p>
                <Separator/>
                <p>{item?.description}</p>
              </VStack>
            </DrawerBody>
            <DrawerCloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose}/>
            </DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AniDetailsDrawer;
