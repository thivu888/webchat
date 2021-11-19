import keyMirror from 'keymirror';



export const MessageTypes = keyMirror({
    TEXT: null,
    FILE: null,
    TYPING: null,
    READ: null,
});

export const FileTypes = keyMirror({
    VIDEO: null,
    IMAGE: null,
})
