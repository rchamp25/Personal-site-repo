// The projects the site shows: every entry in src/content/projects except
// those marked `hidden: true`, sorted by `order` (then title). Every page that
// lists or builds projects goes through here, so a hidden project has no Home
// row, no /projects entry, and no page of its own.
import { getCollection, type CollectionEntry } from "astro:content";

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  return (await getCollection("projects", ({ data }) => !data.hidden)).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}
