import React from "react";

type CachedData<T> = { cachedData: T, cachedTime: number };
type Cache<K, T> = Map<K, CachedData<T>>

type SetCache<K, T> = (key: K, value: T) => void;
type GetCache<K, T> = (key: K) => T | undefined;
type DeleteCache = (key: any) => void;
type ClearCache = () => void;

export function useCache<K, T>(invalidateInterval: number = 60000) {
    const cacheRef = React.useRef<Cache<K, T>>(new Map());

    const setCache: SetCache<K, T> = React.useCallback((key, value) => {
        const cachedValue: CachedData<T> = {cachedData: value, cachedTime: new Date().getTime()};
        cacheRef.current.set(key, cachedValue);
    }, []);

    const getCache: GetCache<K, T> = React.useCallback((key) => {
        const cache = cacheRef.current.get(key);

        if (!cache) return;
        if (new Date().getTime() - cache.cachedTime > invalidateInterval) {
            return
        }

        return cacheRef.current.get(key)?.cachedData;
    }, [invalidateInterval]);

    const deleteCache: DeleteCache = React.useCallback((key) => {
        cacheRef.current.delete(key);
    }, []);

    const clearCache: ClearCache = React.useCallback(() => {
        cacheRef.current = new Map();
    }, []);

    return {setCache, getCache, deleteCache, clearCache};
}
