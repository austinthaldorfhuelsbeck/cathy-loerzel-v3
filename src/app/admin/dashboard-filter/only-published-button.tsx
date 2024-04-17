import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookDashedIcon, BookMarkedIcon } from "lucide-react";
import { type useFilter } from "../_hooks/useFilter";

export function OnlyPublishedButton({
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <Toggle
          aria-label="Toggle show only published"
          onClick={filterProvider.onToggleShowOnlyPublished}
          className="hover:bg-primary/10"
        >
          <TooltipTrigger asChild>
            {filterProvider.showOnlyPublished ? (
              <BookMarkedIcon className="h-4 w-4" />
            ) : (
              <BookDashedIcon className="h-4 w-4" />
            )}
          </TooltipTrigger>
        </Toggle>
        <TooltipContent>
          {!filterProvider.showOnlyPublished
            ? "Show only published"
            : "Show unpublished"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
