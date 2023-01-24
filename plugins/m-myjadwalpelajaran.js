const qrku = "https://telegra.ph/file/b9ffb3db567152de904e4.jpg"

let handler = async (m, { conn, usedPrefix }) => conn.sendButtonImg(m.chat, qrku, `
╭─「 Senin 」
│ • Upacara Bendera
│ • PPKN
│ • Bahasa Inggris
│ • IPS
│ • IPA
│ • Seni Budaya
╰────

╭─「 Selasa 」
│ • Bilingual / Tadarus
│ • Seni Budaya
│ • Matematika
│ • Qur'an Hadits
│ • SKI
│ • Bahasa Arab
╰────
╭─「 Rabu 」
│ • Bilingual / Tadarus
│ • Bahasa Indonesia
│ • IPA
│ • IPS
│ • Bahasa Arab
│ • Bahasa Inggris
╰────
╭─「 Kamis 」
│ • Bilingual / Tadarus
│ • IPA
│ • Informatika
│ • Penjas
│ • Bahasa Indonesia
╰────
╭─「 Jum'at 」
│ • Yasinan
│ • Fiqih
│ • Akidah Akhlak
╰────
╭─「 Sabtu 」
│ • Senam
│ • PPKN
│ • Bahasa Melayu Riau
│ • Matematika
│ • Bahasa Indonesia
╰────

PR :

1. Bahasa Indonesia [ Uji Kompetensi Hal 27-28 1-10, Romawi II & Soal Remidi Hal 29, Soal Pengayaan Hal 30 ]

Data - Data Yang Disebutkan Telah Diambil Langsung Dari website *MTsN 02 Inhil* dan sudah bersertifikat resmi.
`.trim(), wm, 'Menu', usedPrefix + 'menu', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = ['jadwalpelajaran']
handler.owner = true

module.exports = handler
