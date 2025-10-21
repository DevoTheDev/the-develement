// Zustand: lightweight state management library
import { create } from "zustand";
// Middleware for persistence (localStorage/sessionStorage) and JSON serialization
import { persist, createJSONStorage } from "zustand/middleware";
// Immer middleware for safe immutable state updates
import { immer } from "zustand/middleware/immer";
// Type helper for defining the store’s structure
import { StateCreator } from "zustand/vanilla";

// Type for optional configuration when creating a store
type ConfigType<T> = {
    name?: string;                // custom name for persisted storage key
    storage?: Storage;            // allows swapping localStorage/sessionStorage
    skipPersist?: boolean;        // disables persistence when true
    excludeFromPersist?: Array<keyof T>; // fields to exclude from persistence
};

// Generic store factory to create a Zustand store with Immer + optional persistence
const createStore = <T extends object>(
    storeCreator: StateCreator<T, [["zustand/immer", never]], []>, // defines store logic
    config?: ConfigType<T>,                                       // optional config
) => {
    const {
        name,
        storage,
        skipPersist = false,
        excludeFromPersist = [],
    } = config || {};

    // Wrap the store creator with Immer to allow direct, mutable-like state updates
    const immerStore = immer(storeCreator);

    // If persistence is disabled, create a plain in-memory store
    if (skipPersist) {
        return create<T>()(immerStore);
    }

    // Otherwise, create a persistent store with selective field exclusion
    return create<T>()(
        persist(immerStore, {
            name: name || "zustand-store",                        // storage key
            storage: createJSONStorage(() => storage || localStorage), // storage medium
            partialize: (state) =>
                // Remove excluded keys from persisted data
                Object.fromEntries(
                    Object.entries(state).filter(
                        ([key]) => !excludeFromPersist.includes(key as keyof T),
                    ),
                ),
        }),
    );
};

// Exported factory for building Zustand stores with consistent defaults
export { createStore };
