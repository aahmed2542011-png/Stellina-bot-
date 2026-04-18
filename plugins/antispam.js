const spamMap = new Map();

const handler = async (m, { conn }) => {

    const user = m.sender;
    const now = Date.now();

    const limitTime = 3000; // 3 secondi tra messaggi

    if (!spamMap.has(user)) {
        spamMap.set(user, now);
        return;
    }

    const lastTime = spamMap.get(user);

    if (now - lastTime < limitTime) {
        await conn.sendMessage(m.chat, {
            text: '⚠️ Stai spammando! Aspetta un attimo.'
        }, { quoted: m });

        return;
    }

    spamMap.set(user, now);
};

handler.all = true; // controlla tutti i messaggi
export default handler;
