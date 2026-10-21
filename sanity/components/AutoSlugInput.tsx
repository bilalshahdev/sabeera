"use client";

import { useEffect } from "react";
import { set, type SlugInputProps, useClient, useFormValue } from "sanity";
import { apiVersion } from "../env";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function AutoSlugInput(props: SlugInputProps) {
  const client = useClient({ apiVersion });
  const title = useFormValue(["title"]);
  const documentId = useFormValue(["_id"]);
  const current = props.value?.current;

  useEffect(() => {
    if (current || typeof title !== "string" || !title.trim()) return;
    let cancelled = false;

    const generate = async () => {
      const base = slugify(title);
      if (!base) return;
      const rawId = typeof documentId === "string" ? documentId.replace(/^drafts\./, "") : "";
      let candidate = base;
      let suffix = 2;
      while (await client.fetch<number>(`count(*[_type == "project" && slug.current == $slug && !(_id in [$publishedId, $draftId])])`, {
        slug: candidate,
        publishedId: rawId,
        draftId: rawId ? `drafts.${rawId}` : "",
      })) {
        candidate = `${base.slice(0, 75)}-${suffix++}`;
      }
      if (!cancelled) props.onChange(set({ _type: "slug", current: candidate }));
    };

    const timer = window.setTimeout(() => void generate(), 350);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [client, current, documentId, props.onChange, title]);

  return props.renderDefault(props);
}
