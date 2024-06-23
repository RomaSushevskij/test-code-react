import {useCallback, useState} from "react";
import {User} from "./types";
import {API_URL} from "../constants.ts";
import {useCache} from "../hooks/useCache.ts";

const useUserCache = () => useCache<number, User>()

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const {getCache, setCache} = useUserCache()

    const receiveRandomUser = useCallback(async () => {
        try {
            const id = Math.floor(Math.random() * (10 - 1)) + 1;
            const cachedUser = getCache(id);

            if (cachedUser) {
                setUser(cachedUser);

                return;
            }

            const response = await fetch(`${API_URL}/${id}`);
            const _user = (await response.json()) as User;
            setCache(id, _user);
            setUser(_user);
        } catch (error) {
            console.log(error)
        }

    }, [getCache, setCache]);

    return {user, receiveRandomUser}
}
