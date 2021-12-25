import keyMirror from 'keymirror';



export const MessageTypes = {
    MESSAGE:"message",
    IMAGE : 'image',
    VIDEO : 'video',
    AUDIO : 'audio',
    PDF : 'pdf',
    WORD : 'word',
    ZIP : 'zip',
    TXT : 'txt',
    CALL : 'call',
    MISSCALL : 'missCall',
    INFO:'info',
}

export const FileTypes = keyMirror({
    VIDEO: null,
    IMAGE: null,
})
