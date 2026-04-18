const handler = async (m, { conn }) => {

    const user = m.sender;

    const text = `
👤 *PROFILO UTENTE*

📌 Numero: ${user.split('@')[0]}
💬 Messaggio: attivo
⭐ Status: online

━━━━━━━━━━━━━━
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^(profilo|profile)$/i;
export default handler;
