const handler = async (m, { conn }) => {

    const chat = m.chat;

    const groupMetadata = await conn.groupMetadata(chat);
    const participants = groupMetadata.participants;

    const sender = participants.find(p => p.id === m.sender);
    const isAdmin = sender?.admin === 'admin' || sender?.admin === 'superadmin';

    if (!isAdmin) {
        return conn.sendMessage(chat, { text: '🚫 Solo admin possono usare il kick' }, { quoted: m });
    }

    const user = m.mentionedJid?.[0];
    if (!user) {
        return conn.sendMessage(chat, { text: '⚠️ Usa: !kick @utente' }, { quoted: m });
    }

    await conn.groupParticipantsUpdate(chat, [user], 'remove');

    await conn.sendMessage(chat, { text: '👢 Utente espulso' }, { quoted: m });
};

handler.command = /^kick$/i;
export default handler;
