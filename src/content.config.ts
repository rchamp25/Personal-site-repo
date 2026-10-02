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
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      role: z.string().min(1),
      bio: z.string().min(1),
      note: z.string().min(1),
      resume: z.object({
        label: z.string().min(1),
        // Unset until the PDF is in public/. Once set, the Experience page
        // shows a button that opens it in a new tab.
        href: href.optional(),
      }),
      // Optional portrait for Home. `src` is a path relative to profile.yaml,
      // e.g. "./images/ross-champlin.jpg"; Astro builds responsive AVIF and
      // WebP copies at build time. Unset means a type-only Home.
      photo: z.object({ src: image(), alt: z.string().min(1) }).optional(),
    }),
});

const links = defineCollection({
  loader: file("src/content/links.yaml"),
  schema: z
    .object({
      // Accessible name of the logo link, e.g. "LinkedIn".
      label: z.string().min(1),
      // The full address or URL. Not printed on the page; shown as the logo's
      // hover title.
      text: z.string().min(1),
      // Which logo the link shows (src/components/Icon.astro).
      icon: z.enum(["email", "github", "linkedin"]),
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
      // Roles and achievements: the role, or what the achievement was.
      // Education: the school.
      title: z.string().min(1),
      // Organization or context (roles and achievements).
      org: z.string().optional(),
      start: monthOrYear.optional(),
      // Omit while ongoing. For education, the graduation date.
      end: monthOrYear.optional(),
      // Education only. `expected: true` shows `end` as "Expected <date>".
      degree: z.string().min(1).optional(),
      major: z.string().min(1).optional(),
      expected: z.boolean().default(false),
      // As Ross wants it shown, e.g. "3.8" or "3.8 / 4.0".
      gpa: z.string().min(1).optional(),
      honors: z.array(z.string().min(1)).default([]),
      involvement: z.array(z.string().min(1)).default([]),
      bullets: z.array(z.string().min(1)).default([]),
      order: z.number().int().default(0),
      commentary: z.string().optional(),
      placeholder: z.boolean().default(false),
    })
    .refine(
      (e) =>
        e.placeholder ||
        (e.kind === "education" ? e.degree && e.end : e.org && e.start),
      {
        message:
          "An entry that is not a placeholder needs org and start (education: degree and end)",
      },
    ),
});

export const collections = { profile, links, projects, experience };
