// Content collections. Facts live in src/content; pages read them from here.
// Anything Ross has not supplied yet is an entry with `placeholder: true` and
// copy that says it is a placeholder. Real entries (`placeholder: false`) must
// carry the facts the pages need, so a half-filled entry fails the build.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// "2025" or "2025-09".
const monthOrYear = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "Use YYYY or YYYY-MM");

// A path under public/ ("/resume.pdf") or a full URL.
const href = z.union([z.url(), z.string().startsWith("/")]);

const profile = defineCollection({
  loader: file("src/content/profile.yaml"),
  schema: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    bio: z.string().min(1),
    note: z.string().min(1),
    resume: z.object({
      label: z.string().min(1),
      // Unset until the PDF is in public/.
      href: href.optional(),
    }),
  }),
});

const links = defineCollection({
  loader: file("src/content/links.yaml"),
  schema: z
    .object({
      label: z.string().min(1),
      // Text shown for the link, e.g. the address or handle.
      text: z.string().min(1),
      href: z.union([z.url(), z.string().startsWith("mailto:")]).optional(),
      order: z.number().int(),
      placeholder: z.boolean().default(false),
    })
    .refine((l) => l.placeholder || l.href, {
      message: "A link that is not a placeholder needs an href",
      path: ["href"],
    }),
});

const projects = defineCollection({
  // The file name is the slug: src/content/projects/<slug>.md -> /projects/<slug>.
  // The Markdown body is "what was built".
  loader: glob({ pattern: "**/*.md", base: "src/content/projects" }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().min(1),
      kind: z.enum(["school", "personal"]).optional(),
      problem: z.string().min(1),
      role: z.string().optional(),
      stack: z.array(z.string().min(1)).default([]),
      start: monthOrYear.optional(),
      // Omit while the project is ongoing.
      end: monthOrYear.optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      featured: z.boolean().default(false),
      // Lower numbers sort first where order matters (e.g. featured on home).
      order: z.number().int().default(0),
      // Image files go in public/; `src` is their path, e.g. "/images/foo.png".
      image: z.object({ src: z.string().startsWith("/"), alt: z.string().min(1) }).optional(),
      commentary: z.string().optional(),
      placeholder: z.boolean().default(false),
    })
    .refine((p) => p.placeholder || (p.kind && p.role && p.start && p.stack.length > 0), {
      message: "A project that is not a placeholder needs kind, role, start, and stack",
    }),
});

const experience = defineCollection({
  // Education, roles, and life achievements that are not jobs.
  // The Markdown body is optional extra detail.
  loader: glob({ pattern: "**/*.md", base: "src/content/experience" }),
  schema: z
    .object({
      kind: z.enum(["education", "role", "achievement"]),
      // The role, degree, or what the achievement was.
      title: z.string().min(1),
      // Organization or context.
      org: z.string().optional(),
      start: monthOrYear.optional(),
      // Omit while ongoing. For education this can be the expected graduation.
      end: monthOrYear.optional(),
      bullets: z.array(z.string().min(1)).default([]),
      order: z.number().int().default(0),
      commentary: z.string().optional(),
      placeholder: z.boolean().default(false),
    })
    .refine((e) => e.placeholder || (e.org && e.start), {
      message: "An entry that is not a placeholder needs org and start",
    }),
});

export const collections = { profile, links, projects, experience };
