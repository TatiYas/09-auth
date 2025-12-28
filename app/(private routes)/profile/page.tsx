import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  if (!user) {
    return {
      title: 'Profile - NoteHub',
      description: 'User profile page for NoteHub',
    };
  }

  const title = `${user.username} - NoteHub`;
  const description = `Profile page of ${user.username}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://notehub.example.com/profile', /*
        Для робочого проекту — краще буде використати домен из env. */
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username}'s avatar`,
        },
      ],
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <header className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link
            href="/profile/edit"
            className={css.editProfileButton}
          >
            Edit Profile
          </Link>
        </header>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
