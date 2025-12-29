'use client'

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css"; 

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p className={css.text}>Loading, please wait...</p>;
  if (error || !note)
    return (
      <p className={css.text}>
        Could not fetch note. {error instanceof Error ? error.message : ""}
      </p>
    );

  return (
    <Modal onClose={onClose}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={css.body}>
        <b>{note.tag}</b>
        <p>{note.content}</p>
        <p className={css.date}>
          {note.updatedAt ?? note.createdAt}
        </p>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;

