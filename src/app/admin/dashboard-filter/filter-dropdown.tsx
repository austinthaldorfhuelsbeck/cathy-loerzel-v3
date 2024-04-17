import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type Category, type Tag } from "@prisma/client";
import {
  BetweenHorizontalStartIcon,
  CheckCircleIcon,
  ListFilterIcon,
  TagIcon,
} from "lucide-react";
import { type useFilter } from "../_hooks/useFilter";

export function FilterDropdown({
  categories,
  tags,
  filterProvider,
}: {
  categories: Category[];
  tags: Tag[];
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <ListFilterIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Filter posts</TooltipContent>
        </Tooltip>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <BetweenHorizontalStartIcon className="h-4 w-4" />
              <span>Filter by category</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => filterProvider.onCategorySelect(category)}
                    className={cn(
                      filterProvider.selectedCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "",
                      "flex items-center justify-between",
                    )}
                  >
                    {category.name}
                    <CheckCircleIcon
                      className={cn(
                        filterProvider.selectedCategory === category
                          ? ""
                          : "hidden",
                        "h-3 w-3 text-accent-foreground",
                      )}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TagIcon className="h-4 w-4" />
              <span>Filter by tag</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {tags.map((tag) => (
                  <DropdownMenuItem
                    key={tag.id}
                    onClick={() => filterProvider.setSelectedTag(tag)}
                    className={cn(
                      filterProvider.selectedTag === tag
                        ? "bg-accent text-accent-foreground"
                        : "",
                      "flex items-center justify-between",
                    )}
                  >
                    {tag.name}
                    <CheckCircleIcon
                      className={cn(
                        filterProvider.selectedTag == tag ? "" : "hidden",
                        "h-3 w-3 text-accent-foreground",
                      )}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
