import keyMirror from 'keymirror';

export const ChatFooterProperButtonTypes = keyMirror({
    SEND: null,
    CALL: null,
});

export const PrimaryUtilityTypes = keyMirror({
    CHAT: null,
    VOICE: null,
    VIDEO: null,
});

export const MessageTypes = keyMirror({
    TEXT: null,
    MDS: null,
    FILE: null,
    END_VOICE_CALL: null,
    END_VIDEO_CALL: null,
    PHOTO: null,
    SVOICE: null,
    SVIDEO: null,
    TYPING: null,
    STOP_TYPING: null,
    READ: null,
    REQUEST_VOICE_CALL: null,
    REQUEST_VIDEO_CALL: null,
    SYSTEM: null,
});


