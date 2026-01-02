import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const slug = params?.slug || []; // защита от undefined
 const tag = Array.isArray(slug) ? slug[0] : undefined;

 const displayTag = tag === "ALL" || !tag ? "all" : tag;

 const title = `Notes filtered by: ${displayTag}`;
 const description = `Review of notes "${displayTag}".`;

 const url = `https://09-auth-ten-tan.vercel.app/notes/filter/${tag || 'all'}`;

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
 alt: "NoteHub Logo",
 },
 ],
 locale: "en_US",
 type: "website",
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
}




/*31.12import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const slug = params?.slug || []; 
 const tag = Array.isArray(slug) ? slug[0] : undefined;

 const displayTag = tag === "ALL" || !tag ? "all" : tag;

 const title = `Notes filtered by: ${displayTag}`;
 const description = `Review of notes "${displayTag}".`;

 const url = `https://09-auth-ten-tan.vercel.app/notes/filter/${tag || 'all'}`;

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
 alt: "NoteHub Logo",
 },
 ],
 locale: "en_US",
 type: "website",
 },
 };
}


export default async function App({ params }: Props) {
  const queryClient = new QueryClient();

const { slug } = await params;
const rawTag = Array.isArray(slug) ? slug[0] : undefined;
const tag = rawTag === 'ALL' || !rawTag ? undefined : rawTag;

await queryClient.prefetchQuery({
 queryKey: ['notes', { search: '', page: 1, tag }],
 queryFn: () => fetchServerNotes(
 1, 
 '', 
 tag 
 ),
});






  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag}   />
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






