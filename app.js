const { default: makeWASocket, useMultiFileAuthState, Browsers } = require("@whiskeysockets/baileys");

(async () => {
    const { state, saveCreds } = await useMultiFileAuthState("./session.json");

    const sock = makeWASocket({
        auth: state,
        browser: Browsers.macOS("MyApp")
    });

    // Save session updates
    sock.ev.on("creds.update", saveCreds);

    // Listen for incoming messages
    sock.ev.on("messages.upsert", m => {
        console.log("New message:", m);
    });

    // Load all contacts
    const allContacts = Object.values(sock.store.contacts);
    console.log("All contacts:", allContacts);

    console.log("WhatsApp account logged in successfully ✅");
})();
