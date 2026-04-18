const mainOwner = "393756972784@s.whatsapp.net";
"573227293560@s.whatsapp.net";


const owners = [
    mainOwner,
    "4915511279740@s.whatsapp.net",
    "85295442144@s.whatsapp.net",
    "447449205584@s.whatsapp.net"
];

const handler = async (m, { conn }) => {

    const isOwner = owners.includes(m.sender);
    const isMainOwner = m.sender === mainOwner;

    if (!isOwner) {
        return conn.sendMessage(m.chat, { text: '🚫 Solo owner' }, { quoted: m });
    }

    // SOLO MAIN OWNER (comando speciale)
    if (!isMainOwner) {
        return conn.sendMessage(m.chat, { text: '🛑 Solo owner principale' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { text: '👑 comando eseguito' }, { quoted: m });
};

handler.command = /^test$/i;
export default handler;
