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

// Константа для заголовков JSON
const headersJson = {
  headers: { "Content-Type": "application/json" }
};

// --- Пользователь ---
export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get("/auth/session");
    return res.data ?? false;
  } catch (error) {
    console.error("Error checking session:", error);
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const res = await nextServer.get<User>("users/me");
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateMe = async (payload: UpdateMeRequest): Promise<User> => {
  try {
    const res = await nextServer.patch<User>("users/me", payload, headersJson);
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  try {
    const res = await nextServer.post<User>("auth/register", payload, headersJson);
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (payload: LoginRequest): Promise<User> => {
  try {
    const res = await nextServer.post<User>("auth/login", payload, headersJson);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post("auth/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// --- Заметки ---
export const fetchNotes = async (
  page: number,
  query: string,
  tag?: CreateNoteParams["tag"]
): Promise<NoteResponse> => {
  try {
    const res = await nextServer.get<NoteResponse>("/notes", {
      params: { search: query, tag, page, perPage: 12 },
      ...headersJson
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await nextServer.get<Note>(`/notes/${id}`, headersJson);
    return res.data;
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);
    throw error;
  }
};

export const createNote = async (payload: CreateNoteParams): Promise<Note> => {
  try {
    const res = await nextServer.post<Note>("/notes", payload, headersJson);
    return res.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const res = await nextServer.delete<Note>(`/notes/${id}`, headersJson);
    return res.data;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};
