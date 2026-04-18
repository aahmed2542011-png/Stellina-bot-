const handler = async (message, { conn, usedPrefix = '!' }) => {

    const userId = message.sender;
    const uptimeMs = process.uptime() * 1000;

    const uptimeStr = clockString(uptimeMs);

    const menuBody = `
『 MENU BOT 』
╼━━━━━━━━━━━━━━╾
◈ Utente: @${userId.split('@')[0]}
◈ Uptime: ${uptimeStr}
╼━━━━━━━━━━━━━━╾
`.trim();

    const buttons = [
        { buttonId: `${usedPrefix}admin`, buttonText: { displayText: '🛡️ ADMIN' }, type: 1 },
        { buttonId: `${usedPrefix}funzioni`, buttonText: { displayText: '⚙️ FUNZIONI' }, type: 1 },
        { buttonId: `${usedPrefix}giochi`, buttonText: { displayText: '🎮 GIOCHI' }, type: 1 }
    ];

    await conn.sendMessage(message.chat, {
        text: menuBody,
        footer: 'scegli un’opzione',
        buttons: buttons,
        headerType: 1,
        mentions: [userId]
    }, { quoted: message });
};

function clockString(ms) {
    const d = Math.floor(ms / 86400000);
    const h = Math.floor(ms / 3600000) % 24;
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
}

handler.command = /^(menu|comandi)$/i;

export default handler;
