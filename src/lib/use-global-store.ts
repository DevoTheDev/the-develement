import { createStore } from "@/lib/createStore";
// Import custom store creator (likely a Zustand wrapper)

type AlertConfig = {
    title?: string;           // Optional alert title
    description?: string;     // Optional alert description
    confirmLabel?: string;    // Text for confirm button
    cancelLabel?: string;     // Text for cancel button
    onConfirm?: () => void;   // Callback when confirmed
    onCancel?: () => void;    // Callback when canceled
};

type State = {
    alertOpen: boolean;               // Whether the alert is visible
    alertConfig: AlertConfig | null;  // Current alert configuration
};

type Actions = {
    updateAlertOpen: (is: State["alertOpen"]) => void; // Toggle alert visibility
    showAlert: (config: AlertConfig) => void;           // Open alert with given config
};

type Store = State & Actions; // Combine state and actions into one type

const useGlobalStore = createStore<Store>(
    (set) => ({
        alertOpen: false,    // Default: alert closed
        alertConfig: null,   // No alert loaded

        updateAlertOpen: (is) =>
            set((state) => {
                state.alertOpen = is;       // Update open/close state
                if (!is) state.alertConfig = null; // Reset config when closing
            }),

        showAlert: (config) =>
            set((state) => {
                state.alertOpen = true;     // Open alert
                state.alertConfig = config; // Apply passed-in config
            }),
    }),
    {
        name: "global-store",                 // Key name for persistence
        excludeFromPersist: ["alertOpen"],    // Don't persist open/close state
    },
);

const alert = (config: AlertConfig) => {
    useGlobalStore.getState().showAlert(config); // Shortcut to open alert externally
};

export { useGlobalStore, alert }; // Export hook + helper
