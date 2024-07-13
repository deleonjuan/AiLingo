import { isArray } from "lodash";

/**
 * due to the incopatibility of react-native-vercel-ai useChat with vercel SDK v3
 * the history must be fixed so the SDK can read it correctly
 * @param messages history of messages
 * @returns Array with the fixed history
 */
export const fixMessagesHistory = (messages: any[]) => {
  return messages.reduce((newArr: any[], curr: any) => {
    if (!isArray(curr.content)) {
      newArr.push(curr);
    } else {
      curr.content.map((e: any, k: number) => {
        newArr.push({
          ...e,
          createdAt: curr.createdAt,
          id: `${curr.id}${k}`,
        });
      });
    }
    return newArr;
  }, []);
};
