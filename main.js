import './core/db.js';
import makeWASocket from '@whiskeysockets/baileys';
import fs from 'fs';

const sock = makeWASocket();

global.plugins = [];

// carica plugin
const files = fs.readdirSync('./plugins');
for (let file of files) {
    const plugin = await import(`./plugins/${file}`);
    global.plugins.push(plugin.default);
}

sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    for (let plugin of global.plugins) {
        if (plugin.command.test(text)) {
            plugin(msg, {
                conn: sock,
                usedPrefix: '!'
            });
        }
    }
});

console.log("Bot avviato 🚀");
