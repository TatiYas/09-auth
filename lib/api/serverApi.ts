import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";

import { nextServer } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NoteResponse } from "./clientApi";

const buildCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const checkServerSession = async (): Promise<AxiosResponse> => {
  const cookieHeader = await buildCookieHeader();

  return nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};


export const getServerMe = async (): Promise<User | null> => {
  const cookieHeader = await buildCookieHeader();

  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data ?? null;
};


export const fetchServerNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> => {
  const cookieHeader = await buildCookieHeader();

  const res = await nextServer.get<NoteResponse>("/notes", {
    params: {
      search: query,
      tag,
      page,
      perPage: 12,
    },
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  return res.data;
};


export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await buildCookieHeader();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  return res.data;
};


//import { cookies } from "next/headers";
//import { nextServer } from "./api"
//import type{ Note } from '@/types/note';
//import type { User } from "@/types/user";
//import type { NoteResponse } from "./clientApi";
//import type { AxiosResponse } from "axios";
 

//export const checkServerSession = async (): Promise<AxiosResponse> => {
  //const cookieStore = await cookies();
  //const response = await nextServer.get('/auth/session', {
    //headers: {
      //Cookie: cookieStore.toString(),},});
  //return response;
//};

//export const getServerMe = async (): Promise<User | null> => {
  //const cookieStore = await cookies();
  //const {data} = await nextServer.get('/users/me', {
    //headers: {
      //Cookie: cookieStore.toString(),
    //},
  //});
    //return data;
//}

//export const fetchServerNotes = async (page: number, query: string, tag?: string): Promise<NoteResponse> => {
  //const cookieStore = await cookies();
    //const params = {
      //  params: {
        //    search: query,
          //  tag: tag,
            //page: page,
            //perPage: 12,
        //},
        //headers: {
          //  'Content-Type': 'application/json',
            //Cookie: cookieStore.toString(),
        //}
    //}
    //const response = await nextServer.get<NoteResponse>('/notes', params);
    //return response.data;
//}

//export const fetchServerNoteById = async (id: string): Promise<Note> => {
//  const cookieStore = await cookies();
  //  const res = await nextServer.get<Note>(`/notes/${id}`, {headers: {
    //    'Content-Type': 'application/json',
      //  Cookie: cookieStore.toString(),
    //}});
    //return res.data;
//}