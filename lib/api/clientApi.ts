import type { Note } from "@/types/note";
import { nextServer } from "./api";
import type { User } from "@/types/user";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateMeRequest = {
  username?: string;
};

export const checkSession = async () => {
  const res = await nextServer.get("/auth/session");
  return res.data;
};

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

export const register = async (userData: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", userData);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> => {
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      search: query,
      tag,
      page,
      perPage: 12,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};


/**import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { nextServer } from "./api";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateMeRequest = {
  username?: string;
};


export const checkSession = async () => {
  const res = await nextServer.get("/auth/session");
  return res.data;
};


export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};


export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};


export const register = async (userData: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", userData);
  return res.data;
};

// Логин
export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};


export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};


export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> => {
  const res = await nextServer.get<NoteResponse>("/notes", {
    params: { search: query, tag, page, perPage: 12 },
  });
  return res.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};


export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};*/
