const prku = "https://telegra.ph/file/e363a9cf657f63fe8d548.png"

let handler = async (m, { conn, usedPrefix }) => conn.sendButtonImg(m.chat, prku, `
1. Bahasa Indonesia [ Uji Kompetensi Hal 27-28 1-10, Romawi II & Soal Remidi Hal 29, Soal Pengayaan Hal 30 ]

Data - Data Yang Disebutkan Telah Diambil Langsung Dari website *MAN 1 Inhil* dan sudah bersertifikat resmi.
`.trim(), wm, 'kembali ke menu', usedPrefix + 'menu', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = ['prku']
handler.owner = true

module.exports = handler
