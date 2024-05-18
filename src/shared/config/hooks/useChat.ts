import { useEffect, useState } from "react";
import { companyApi } from "../../../entities/chats/companyApi";
import useEcho from "./useEcho";
import { IChatMessages } from "../../../entities/types";

export const useChat = (chatId: string) => {

    const { data: responseMessages, isLoading: loading, isError: error } = companyApi.useChatsMessagesQuery(+(chatId ?? -1));

    const { echo } = useEcho();

    const [newMessages, setNewMessages] = useState<IChatMessages[]>([]);
    const [incommingMessages, setIncommingessages] = useState<IChatMessages[]>([]);
    const [newMess, setNewMess] = useState<IChatMessages>();

    // console.log(responseMessages?.data);

    const uniqueBy = (prop: string) => (list: IChatMessages[]) => {
        const uniques = {}
        return list.reduce(
            (result: IChatMessages[], item: IChatMessages) => {
                // @ts-ignore
                if (uniques[item[prop]]) return result
                // @ts-ignore
                uniques[item[prop]] = item
                return [...result, item]
            },
            [],
        )
    }

    const uniqueById = uniqueBy('id')


    echo.private(`chats.${chatId}`)
        .listen('.message.new', (message: IChatMessages) => {
            // console.log(responseMessages);

            const uniq = new Set([message, ...newMessages, ...responseMessages?.data ?? []].map(e => JSON.stringify(e)));

            const res = Array.from(uniq).map(e => JSON.parse(e));


            // setNewMessages(prev => [message, ...prev, ...responseMessages?.data ?? []])
            setIncommingessages(prev => [message, ...prev])
            // setNewMessages([message, ...incommingMessages, ...newMessages, ...responseMessages?.data ?? []])
            // console.log(newMessages);
            // setNewMessages(uniqueById([message, ...incommingMessages, ...newMessages, ...responseMessages?.data ?? []]))

            setNewMess(message)
        });

    useEffect(() => {
        setNewMessages(uniqueById([...incommingMessages, ...incommingMessages, ...newMessages, ...responseMessages?.data ?? []]))


    }, [incommingMessages, newMess])

    useEffect(() => {
        setNewMessages(responseMessages?.data ?? [])

    }, [responseMessages?.data])

    useEffect(() => {
        setNewMessages(responseMessages?.data ?? [])

        return () => {
            echo.leave(`chats.${chatId}`)
        }
    }, [])

    return { newMessages, setNewMessages, loading, error }
}