// Utility to convert various error types into readable messages
import { getErrorMessage } from "@/lib/getErrorMessage";
// Helper from Next.js to detect redirect-related errors
import { isRedirectError } from "next/dist/client/components/redirect-error";
// Generic type for async actions, ensuring type safety
type Options<T> = {
    actionFn: () => Promise<T>;
};

// Wrapper function that safely executes async server/client actions
const executeAction = async <T>({ actionFn }: Options<T>): Promise<T> => {
    try {
        // Attempt to run the provided asynchronous action
        return await actionFn();
    } catch (error) {
        // Allow Next.js redirect errors to propagate normally
        if (isRedirectError(error)) {
            throw error;
        }
        // For all other errors, format and rethrow with a friendly message
        throw new Error(getErrorMessage(error));
    }
};

// Exported helper for consistent error handling in async operations
export { executeAction };
