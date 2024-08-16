export interface MessageInputContext {
    insertText(text: string): void
    addMention(uid: string, name: string): void
    text():string|undefined
}


export type OnInsertFnc = (text: string) => void
export type OnAddMentionFnc = (uid: string, name: string) => void


