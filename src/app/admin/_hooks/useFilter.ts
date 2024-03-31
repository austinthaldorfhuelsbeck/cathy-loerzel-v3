import { type EventWithData, type PostWithData } from "@/types";
import { type Category, type Tag } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";

export function useFilter(items?: (PostWithData | EventWithData)[]) {
  // State
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showOnlyPublished, setShowOnlyPublished] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  // Handlers
  const onToggleSortOrder = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  const onToggleShowOnlyPublished = useCallback(() => {
    setShowOnlyPublished((prev) => !prev);
  }, []);

  const onCategorySelect = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const onClearFilters = useCallback(() => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery("");
    setSortOrder("desc");
    setShowOnlyPublished(false);
  }, []);

  // Filtering and Sorting Logic
  const filteredItems = useMemo(() => {
    let tempItems = items ?? [];
    if (showOnlyPublished) {
      tempItems = tempItems.filter((item) => item.published);
    }
    if (selectedCategory) {
      tempItems = tempItems.filter(
        (item) => item.category.id === selectedCategory.id,
      );
    }
    if (selectedTag) {
      tempItems = tempItems.filter((item) =>
        item.tags.some((tag) => tag.id === selectedTag.id),
      );
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tempItems = tempItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery),
      );
    }
    if (sortOrder === "asc") {
      tempItems = [...tempItems].sort((a, b) =>
        a.date.getTime() > b.date.getTime() ? 1 : -1,
      );
    } else {
      tempItems = [...tempItems].sort((a, b) =>
        a.date.getTime() < b.date.getTime() ? 1 : -1,
      );
    }
    return tempItems;
  }, [
    items,
    showOnlyPublished,
    selectedCategory,
    selectedTag,
    searchQuery,
    sortOrder,
  ]);

  return {
    filteredItems,
    selectedCategory,
    onCategorySelect,
    selectedTag,
    setSelectedTag: useCallback(setSelectedTag, [setSelectedTag]),
    searchQuery,
    setSearchQuery: useCallback(setSearchQuery, [setSearchQuery]),
    sortOrder,
    onToggleSortOrder,
    showOnlyPublished,
    onToggleShowOnlyPublished,
    onClearFilters,
  };
}
