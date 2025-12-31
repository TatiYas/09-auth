
'use client';

import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
 params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const slug = params.slug ?? [];
 const tag = slug.length > 0 ? slug[0] : "all";

 const title = tag === "all" || tag === "All" ? "All Notes" : `Notes filtered by: ${tag}`;
 const description =
 tag === "all" || tag === "All" ? "All notes in NoteHub" : `Review of notes tagged "${tag}"`;

 return {
 title,
 description,
 openGraph: {
 title,
 description,
 url: `https://09-auth-1vfd.vercel.app/notes/filter/${tag}`,
 siteName: "NoteHub",
 images: [
 {
 url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
 width: 1200,
 height: 630,
 alt: "NoteHub",
 },
 ],
 type: "website",
 },
 };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function App({ params }: Props) {
 const queryClient = new QueryClient();

 const slug = params.slug ?? [];
 
 const tag = slug.length > 0 && slug[0] !== "All" ? slug[0] : undefined;

 await queryClient.prefetchQuery({
 queryKey: ["notes", { query: "", page: 1, tag }],
 queryFn: () => fetchServerNotes(1, "", tag),
 });

 return (
 <div>
 <HydrationBoundary state={dehydrate(queryClient)}>
 <NoteListClient tag={tag} />
 </HydrationBoundary>
 </div>
 );
}




/*import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await params.slug[0];

  const title = `Notes filtered by: ${tag}`;
  const description = `Review of notes  "${tag}".`;
  const url = `https://09-auth-1vfd.vercel.app/notes/filter/${params.slug[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Title",
        },
      ],
      type: 'website',
    },
  };
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient()
	const { slug } = await params
	const tag = slug[0] === "All" ? undefined : slug[0]


  await queryClient.prefetchQuery({
    queryKey: ['notes', { query: "", page: 1, tag: tag }],
    queryFn: () => fetchServerNotes(1, "", tag ),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag}   />
      </HydrationBoundary>
    </div>
  );
}*/













/*import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await params.slug[0];

  const title = `Notes filtered by: ${tag}`;
  const description = `Review of notes filtered by "${tag}".`;
  const url = `https://09-auth-1vfd.vercel.app//notes/filter/${params.slug[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Title",
        },
      ],
      type: 'website',
    },
  };
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient()
	const { slug } = await params
	const tag = slug[0] === "All" ? undefined : slug[0]


  await queryClient.prefetchQuery({
    queryKey: ['notes', { query: "", page: 1, tag: tag }],
    queryFn: () => fetchServerNotes(1, "", tag ),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag}   />
      </HydrationBoundary>
    </div>
  );
}*/






