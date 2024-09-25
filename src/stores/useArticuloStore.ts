import { create } from "zustand";
import { firebaseApp } from "@app/firebaseConfig";
import { doc, getFirestore } from "firebase/firestore";
import { persist, PersistStorage } from "zustand/middleware";
import useArticuloService from "@services/useArticuloService";
import { Articulo } from "@features/articulos/models/Articulo";

const articuloService = useArticuloService();

interface ArticuloStore {
    articulos: Articulo[];
    totalRecords: number;
    loading: boolean;
    error: string | null;
    fetchArticulos: () => Promise<void>;
    getArticulo: (id: string) => Articulo | undefined;
    createArticulo: (articulo: Articulo, imageFiles: FileList | null) => Promise<void>;
    updateArticulo: (articulo: Articulo, imageFiles: FileList | null) => Promise<void>;
    deleteArticulo: (id: string) => Promise<void>;
    getTotalRecords: () => Promise<void>;
}

const firestore = getFirestore(firebaseApp);

// Funciones para serializar y deserializar los datos de Firebase
const serialize = (articulo: Articulo): any => {
    return {
        ...articulo,
        barrioRef: articulo.barrioRef?.path || null,
    };
};

const deserialize = (articulo: any): Articulo => {
    return {
        ...articulo,
        barrioRef: articulo.barrioRef ? doc(firestore, articulo.barrioRef) : null,
    };
};

const storage: PersistStorage<ArticuloStore> = {
    getItem: (name) => {
        const item = sessionStorage.getItem(name);
        if (item) {
            const parsed = JSON.parse(item);
            return {
                ...parsed,
                state: {
                    ...parsed.state,
                    articulos: parsed.state.articulos.map(deserialize),
                },
            };
        }
        return null;
    },
    setItem: (name, value) => {
        const serializedState = JSON.stringify({
            ...value,
            state: {
                ...value.state,
                articulos: value.state.articulos.map(serialize),
            },
        });
        sessionStorage.setItem(name, serializedState);
    },
    removeItem: (name) => sessionStorage.removeItem(name),
};

const useArticuloStore = create<ArticuloStore>()(
    persist(
        (set, get) => ({
            articulos: [],
            totalRecords: 0,
            loading: false,
            error: null,

            fetchArticulos: async () => {
                set({ loading: true, error: null });
                try {
                    const articulos = await articuloService.getAllArticulos();
                    set({ articulos, loading: false });
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        set({ error: error.message, loading: false });
                    } else {
                        set({ error: String(error), loading: false });
                    }
                }
            },

            getArticulo: (id: string) => {
                const { articulos } = get();
                return articulos.find(articulo => articulo.id === id);
            },

            createArticulo: async (articulo: Articulo, imageFiles: FileList | null) => {
                set({ loading: true, error: null });
                try {
                    await articuloService.createArticulo(articulo, imageFiles);
                    await get().fetchArticulos();
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        set({ error: error.message, loading: false });
                    } else {
                        set({ error: String(error), loading: false });
                    }
                }
            },

            updateArticulo: async (articulo: Articulo, imageFiles: FileList | null) => {
                set({ loading: true, error: null });
                try {
                    await articuloService.updateArticulo(articulo, imageFiles);
                    await get().fetchArticulos();
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        set({ error: error.message, loading: false });
                    } else {
                        set({ error: String(error), loading: false });
                    }
                }
            },

            deleteArticulo: async (id: string) => {
                set({ loading: true, error: null });
                try {
                    await articuloService.deleteArticulo(id);
                    await get().fetchArticulos();
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        set({ error: error.message, loading: false });
                    } else {
                        set({ error: String(error), loading: false });
                    }
                }
            },

            getTotalRecords: async () => {
                try {
                    set({ loading: true, error: null });
                    const totalRecords = await articuloService.getTotalRecords();
                    set({ totalRecords, loading: false });
                } catch (error) {
                    set({ loading: false, error: 'Error al obtener el total de articulos' });
                    console.error(error);
                }
            },
        }),
        {
            name: "articulos-store",
            storage,
        }
    )
);

export default useArticuloStore;
