import { useEffect, useState } from "react";
import { companyApi } from "../../../entities/chats/companyApi";
import useEcho from "./useEcho";
import { IChatMessages, IMessagesResponse } from "../../../entities/types";

export const useChat = (chatId: string, responseMessages?: IMessagesResponse) => {

    // const { data: responseMessages, isLoading: loading, isError: error } = companyApi.useChatsMessagesQuery(+(chatId ?? -1));

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


    useEffect(() => {
        setNewMessages([]);

        const channel = echo.private(`chats.${chatId}`)
        // echo.channel(`chats.${chatId}`)
            .listen('.message.new', (message: IChatMessages) => {
                console.log(message);

                const uniq = new Set([message, ...newMessages, ...responseMessages?.data ?? []].map(e => JSON.stringify(e)));

                const res = Array.from(uniq).map(e => JSON.parse(e));

                setIncommingessages(prev => [message, ...prev])
                // setNewMessages([message, ...incommingMessages, ...newMessages, ...responseMessages?.data ?? []])
                // console.log(newMessages);
                // setNewMessages(uniqueById([message, ...incommingMessages, ...newMessages, ...responseMessages?.data ?? []]))

                setNewMess(message)
            });


            

        return () => {
            channel.stopListening('.message.new');
            echo.leave(`chats.${chatId}`)
            setNewMessages([]);
        }

    }, [chatId])

    useEffect(() => {
        setNewMessages(uniqueById([
            ...incommingMessages,
            ...newMessages,
            ...responseMessages?.data ?? []]))

    }, [incommingMessages, newMess, chatId])

    useEffect(() => {
        setNewMessages(responseMessages?.data ?? [])

    }, [responseMessages?.data, chatId])

    // useEffect(() => {
    //     setNewMessages(responseMessages?.data ?? [])

    //     return () => {
    //         echo.leave(`chats.${chatId}`)
    //     }
    // }, [])

    return { newMessages, setNewMessages, uniqueById}
}