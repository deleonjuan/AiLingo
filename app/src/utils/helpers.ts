/**
 * due to the incopatibility of react-native-vercel-ai useChat with vercel SDK v3
 * the history must be fixed so the SDK can read it correctly
 * @param messages history of messages
 * @returns Array with the fixed history
 */
export const fixMessagesHistory = (messages: any[]) => {
  const newArr = Array.from(messages);
  newArr.pop();

  const lastMsg = messages[messages.length - 1];

  lastMsg.content.map((e: any, k: number) => {
    newArr.push({
      ...e,
      createdAt: lastMsg.createdAt,
      id: `${lastMsg.id}${k}`,
    });
  });

  return newArr;
};
