import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] ?? 'all';

  const title = `Notes filtered by: ${tag}`;
  const description = `Review of notes filtered by "${tag}".`;
  const url = `https://09-auth-six-zeta.vercel.app/notes/filter/${tag}`;

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
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub preview',
        },
      ],
      type: 'website',
    },
  };
}
