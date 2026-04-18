const handler = async (m, { conn }) => {

    const user = m.sender;

    // inizializza database utenti se non esiste
    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[user]) {
        global.db.data.users[user] = {
            money: 0,
            xp: 0,
            level: 1,
            messages: 0
        };
    }

    const data = global.db.data.users[user];

    // aumenta messaggi
    data.messages += 1;

    const text = `
👤 *PROFILO UTENTE*

📌 Numero: ${user.split('@')[0]}
💰 Soldi: ${data.money}
⭐ XP: ${data.xp}
📊 Livello: ${data.level}
💬 Messaggi: ${data.messages}

━━━━━━━━━━━━━━
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^(profilo|profile)$/i;

export default handler;
