import React from "react";

export const useThrottle = (callback: (...args: any[]) => void, delay = 500) => {
    const throttleRef = React.useRef(false);

    return React.useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;

                setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
};
