import { create } from "zustand";

type user = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
};

type photodata = {
  id: number;
  author: string;
  title: string;
  peso: string;
  idade: string;
  src: string;
  acessos: string;
};
type feedphoto = {
  data: photodata[];
  loading: boolean;
  page: number;
  request: () => void;
  dataClean: () => void;
};

type userData = {
  loading: boolean;
  user: null | object;
  error: string | null;
  token: string | null;
  logged: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  tokenRequest: (arg: Partial<user>) => any;
  userRequest: (arg: string) => void;
  setLogout: (arg: boolean) => void;
};

export const useFormDataStore = create<user>((set) => ({
  username: "",
  password: "",
  setUsername: (value) => set({ username: value }),

  setPassword: (value) => set({ password: value }),
}));

export const useAsyncUserData = create<userData>((set) => ({
  loading: false,
  user: null,
  error: null,
  token: null,
  logged: false,

  setLogout: (value: boolean) => set({ logged: value }),

  tokenRequest: async (user: Partial<user>) => {
    set({ loading: true });
    try {
      const response = await fetch(
        "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const { token } = await response.json();
      set({ token: token });
      return token;
    } catch (err) {
      set({ error: "failed to fetch" });
    }
  },
  userRequest: async (token: string) => {
    try {
      const response = await fetch(
        "https://dogsapi.origamid.dev/json/api/user",
        {
          method: "GET",
          headers: {
            // biome-ignore lint/style/useTemplate: <explanation>
            Authorization: "Bearer " + token,
          },
        }
      );

      const json = await response.json();

      set({ user: json, logged: true, loading: false });
    } catch (err) {
      set({ error: "failed to fetch" });
    }
  },
}));

export const dogFetch = create<feedphoto>((set, get) => ({
  data: [],
  loading: false,
  page: 0,

  dataClean: () => set({ data: [], page: 0 }),

  request: async () => {
    set((state) => ({ loading: true, page: state.page + 1 }));
    const { page } = get();
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=2&_user=0`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const json = await response.json();
    set((state) => ({
      data: [...state.data, ...json],
      loading: false,
    }));
  },
}));
