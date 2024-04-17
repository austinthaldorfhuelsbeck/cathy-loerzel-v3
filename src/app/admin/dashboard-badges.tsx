import { Badge } from "@/components/ui/badge";
import { pluralize } from "@/lib/utils";
import { type useFilter } from "./_hooks/useFilter";

export function DashboardBadges({
  type,
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
  type: "event" | "post" | "category" | "tag";
}) {
  const { filteredItems, selectedTag, selectedCategory } = filterProvider;

  return (
    <div className="flex gap-2">
      {selectedCategory && (
        <Badge>{`Showing ${filteredItems.length} posts in category: ${selectedCategory.name}`}</Badge>
      )}
      {selectedTag && (
        <Badge
          style={{
            backgroundColor: selectedTag.color,
          }}
        >{`Showing ${filteredItems.length} posts with tag: ${selectedTag.name}`}</Badge>
      )}
      {!selectedCategory && !selectedTag && (
        <Badge>{`Showing ${filteredItems.length} ${filteredItems.length !== 1 ? pluralize(type) : type}`}</Badge>
      )}
    </div>
  );
}
