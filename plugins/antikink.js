const handler = async (m, { conn }) => {

    const chat = m.chat;
    const isGroup = chat.endsWith('@g.us');

    // inizializza db chat
    if (!global.db.data.chats[chat]) global.db.data.chats[chat] = {};
    const chatData = global.db.data.chats[chat];

    const text = (m.text || '').toLowerCase();

    // attiva antilink
    if (text === '!attiva antilink') {

        if (!isGroup) return conn.sendMessage(chat, { text: '❌ Solo nei gruppi' }, { quoted: m });

        const groupMetadata = await conn.groupMetadata(chat);
        const participants = groupMetadata.participants;

        const user = participants.find(p => p.id === m.sender);
        const isAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';

        if (!isAdmin) {
            return conn.sendMessage(chat, { text: '🚫 Solo gli admin possono attivarlo' }, { quoted: m });
        }

        chatData.antilink = true;

        return conn.sendMessage(chat, { text: '🛡️ AntiLink ATTIVATO (solo admin possono mandare link)' }, { quoted: m });
    }

    // disattiva antilink
    if (text === '!disattiva antilink') {

        if (!isGroup) return conn.sendMessage(chat, { text: '❌ Solo nei gruppi' }, { quoted: m });

        const groupMetadata = await conn.groupMetadata(chat);
        const participants = groupMetadata.participants;

        const user = participants.find(p => p.id === m.sender);
        const isAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';

        if (!isAdmin) {
            return conn.sendMessage(chat, { text: '🚫 Solo gli admin possono disattivarlo' }, { quoted: m });
        }

        chatData.antilink = false;

        return conn.sendMessage(chat, { text: '❌ AntiLink DISATTIVATO' }, { quoted: m });
    }

    // se non attivo → stop
    if (!chatData.antilink) return;

    const linkRegex = /(https?:\/\/|wa.me|chat.whatsapp.com)/gi;

    if (linkRegex.test(m.text)) {

        if (!isGroup) return;

        const groupMetadata = await conn.groupMetadata(chat);
        const participants = groupMetadata.participants;

        const user = participants.find(p => p.id === m.sender);
        const isAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';

        // admin possono mandare link
        if (isAdmin) return;

        await conn.sendMessage(chat, {
            text: '🚫 Link bloccato! Solo gli admin possono inviare link.'
        }, { quoted: m });

        try {
            await conn.sendMessage(chat, { delete: m.key });
        } catch (e) {}
    }
};

handler.all = true;
export default handler;
