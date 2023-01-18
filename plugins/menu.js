let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌─〔 %me 〕
├ Hai, *%name!*
├ Uptime *%uptime*
├ Database *%totalreg*
└────
%readmore`.trim(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'grup', 'premium', 'internet', 'anonymous', 'anime', 'nulis', 'downloader', 'tools', 'fun', 'database', 'islamic', 'audio', 'nsfw', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'anime': 'Anime',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'nsfw': 'Nsfw',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'islamic') tags = {
    'islamic': 'Islamic'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
     let judul = `${global.ucapan}, ${name}`.trim()
      const sections = [
      {
        title: 'List Menu ' + namabot,       
        rows: [
          { title: `Pemilik Bot[👨‍💻]`, 
           "description": "Nomor Pemilik Bot (owner)",
           rowId: `${_p} creator` },

          { title: `Syarat Ketentuan dan Peraturan[📜]`, 
           "description": "Harap membaca Peraturan demi kenyamanan kita bersama",
           rowId: `${_p} rules` },

          { title: `Group Official AuraBot[🎊] `, 
           "description": "Gabung untuk mendapatkan informasi mengenai bot atau sekedar meramaikan",
           rowId: `${_p} auragc` },

          { title: 'Semua Perintah', 
           "description": "Menu Semua Perintah",
           rowId: `${_p}? all` },
          
          { title: 'Game',
           "description": "Menu untuk Game",
           rowId: `${_p}? game` },
          
          { title: 'XP', 
           "description": "Menu untuk XP",
           rowId: `${_p}? xp` },
          
          { title: 'Stiker',
           "description": "Menu untuk Sticker",
           rowId: `${_p}? stiker` },
          
          { title: 'Kerang Ajaib',
           "description": "Puja kerang ajaib...",
           rowId: `${_p}? kerangajaib` },
          
          { title: 'Quotes', 
           "description": "Menu untuk Quotes",
           rowId: `${_p}? quotes` },
          
          { title: 'Grup', 
           "description": "Menu untuk Group",
           rowId: `${_p}? grup` },
          
          { title: 'Premium',
           "description": "Menu untuk Premium Users",
           rowId: `${_p}? premium` },
          
          { title: 'Internet',
           "description": "Menu untuk menjelajahi Internet...",
           rowId: `${_p}? internet` },
          
          { title: 'Anonymous',
           "description": "Menu untuk Anonymous Chat",
           rowId: `${_p}? anonymous` },

          { title: 'Menu Anime',
           "description": "Menu untuk Wibu",
           rowId: `${_p}? anime` },

          { title: 'Menu NSFW',
           "description": "Menu 18+",
           rowId: `${_p}? nsfw` },
          
          { title: 'Nulis & Logo',
           "description": "Menu untuk Nulis & Logo",
           rowId: `${_p}? nulis` },
          
          { title: 'Downloader',
           "description": "Menu Downloader",
           rowId: `${_p}? downloader` },
          
          { title: 'Tools',
           "description": "Menu untuk Tools",
           rowId: `${_p}? tools` },
          
          { title: 'Fun',
           "description": "Menu Hiburan",
           rowId: `${_p}? fun`},
          
          { title: 'Database',
           "description": "Menu untuk Database",
           rowId: `${_p}? database` },
          
          { title: 'Vote & Absen',
           "description": "Menu untuk Vote & Absen",
           rowId: `${_p}? vote` },
          
          { title: "Islami",
            "description": "Menu Islami",
           rowId: `${_p}? quran` },
          
          { title: 'Pengubah Suara',
           "description": "Menu Pengubah Suara",
           rowId: `${_p}? audio` },

          { title: 'Info',
           "description": "Menu untuk Info",
           rowId: `${_p}? info` },
          
          { title: 'Tanpa Kategori',
           "description": "Menu Tanpa Kategori",
           rowId: `${_p}? tanpakategori` },
          
          { title: 'Owner',
           "description": "Menu Khusus Owner",
           rowId: `${_p}? owner` },
        ]
      }
    ]
      const listMessage = {
      text: '
⊱━━━ %me ━━━⊰

⌬ User information ⌬
 ⁃ Nama : *%name!*
 ⁃ Id : #GRKVTnh
 ⁃ Premium : Tidak

⌬ Bot information ⌬
 ⁃ Terdaftar : 662
 ⁃ Room Chat : 0
 ⁃ Total Fitur : 734+
 ⁃ 18 Jan 2023 | 16:33:51 WIB
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

*MAIN MENU*
   ╟ menu
   ╟ nsfw
   ╟ iklan
   ╟ rules
   ╟ owner
   ╟ script
   ╟ infobot
   ╟ donasi
   ╟ donate
   ╟ jadibot
   ╟ listjadibot
   ╟ sewabot
   ╟ groupbot
   ╟ ownerinfo
   ╙ infoowner

*USER MENU*
   ╟ verify
   ╟ report
   ╟ request
   ╟ transfer
   ╟ menfess
   ╟ buatroom
   ╟ secretchat
   ╟ cekprem
   ╟ premium
   ╙ changename

*OWNER MENU*
   ╟ error
   ╟ clearerr
   ╟ siaran
   ╟ session
   ╟ db
   ╟ send
   ╟ sendconn
   ╟ sendmain
   ╟ sendmenu
   ╟ sendnsfw
   ╟ senddblist
   ╟ resetdb
   ╟ runtime
   ╟ setexif
   ╟ setwm
   ╟ setfooter
   ╟ setppbot
   ╟ addprem
   ╟ delprem
   ╟ bc
   ╟ bctext
   ╟ bcvideo
   ╟ bcaudio
   ╟ bcimage
   ╙ broadcast
   

*STORE MENU* 
   ╟ kali 1 2
   ╟ bagi 1 2
   ╟ kurang 1 2
   ╟ tambah 1 2
   ╟ dellist key
   ╟ addlist key@response
   ╟ update key@response
   ╟ done <reply orderan>
   ╟ proses <reply orderan>
   ╟ list <only group>
   ╙ shop <only group>
 
*GROUP MENU*
   ╟ fitnah
   ╟ delete
   ╟ revoke
   ╟ tagall
   ╟ hidetag
   ╟ setdesc
   ╟ linkgrup
   ╟ infogroup
   ╟ setppgrup
   ╟ setnamegrup
   ╟ group open
   ╟ group close
   ╟ antilink on
   ╟ antilink off
   ╟ welcome on
   ╟ welcome off
   ╟ tiktokauto on
   ╟ tiktokauto off
   ╟ ytauto on
   ╟ ytauto off
   ╟ kick @tag
   ╟ demote @tag
   ╙ promote @tag
 
*AUTODECT MENU*
   ╟ sadcat
   ╟ translate
   ╟ stalkff
   ╟ stalknpm
   ╟ stalkgithub
   ╟ balikhuruf
   ╟ balikangka
   ╟ besarkecil
   ╙ bilangangka

*INTERNET MENU*
   ╟ tiktok
   ╟ play
   ╟ ytmp3
   ╟ ytmp4 (deleted command)
   ╟ pinterest
   ╟ fb
   ╟ lirik
   ╟ steam
   ╟ itunes
   ╟ playmp3
   ╟ playmp4
   ╟ gitclone
   ╟ mediafire
   ╟ wikimedia
   ╟ wikipedia
   ╟ soundcloud
   ╙ infogempa

*CONVERT MENU*
   ╟ tts
   ╟ ttp
   ╟ ttp2
   ╟ attp
   ╟ attp2
   ╟ tourl
   ╟ upload
   ╟ toimg
   ╟ toimage
   ╟ tomp3
   ╟ toaudio
   ╟ tomp4
   ╟ tovideo
   ╟ emojimix (api error)
   ╟ emojmix (api error)
   ╟ emojinua (api error)
   ╟ mixemoji (api error)
   ╟ stiker (error)
   ╟ sticker(error)
   ╟ sgif (api error)
   ╟ stikergif (api error)
   ╟ stickergif( api error)
   ╟ swm ( api error)
   ╟ stikerwm (api error)
   ╟ stickerwm (api error)
   ╟ smeme (api error)
   ╟ memestiker (api error)
   ╟ stikermeme (api error)
   ╟ stickermeme (api error)
   ╟ takesticker (api error)
   ╟ emojinua2 (error)
   ╟ mixemoji2(error)
   ╟ emojmix2 (error)
   ╙ emojimix2 (error)

*TOOLS MENU*
   ╟ spamcall
   ╟ qrcode
   ╟ mcskin
   ╟ morse
   ╟ binary
   ╟ binary-translate
   ╟ translate
   ╟ ssweb
   ╟ bitly_short
   ╟ cuttly_short
   ╟ tinyurl_short
   ╟ base32
   ╟ base64
   ╟ debase32
   ╙ debase64

*VIRUS MENU*
   ╟ sendbug 628xxx
   ╟ philips 628xxx
   ╟ philips2 628xxx
   ╟ philips3 628xxx
   ╟ santet @tag
   ╟ santet2 @tag
   ╟ santet3 @tag
   ╟ virtex 628xxx
   ╟ virtex2 628xxx
   ╟ virtex3 628xxx
   ╟ bug1 628xxx
   ╟ bug2 628xxx
   ╟ bug3 628xxx
   ╟ bug4 628xxx
   ╙ bug5 628xxx
 
*CEKRANDOM MENU* 
   ╟ cekjelek
   ╟ cekcantik
   ╟ cekganteng
   ╟ ceksad
   ╟ cekharam
   ╟ cekhalal
   ╟ cekbego
   ╟ cekanjing
   ╟ cekbiadab
   ╟ cekramah
   ╟ ceksatir
   ╟ cekmanis
   ╟ cekpahit
   ╟ cekhitam
   ╟ cekrasis
   ╟ cekbaik
   ╟ cekjahat
   ╟ cekkaya
   ╟ cekmiskin
   ╟ cekpintar
   ╟ cekbodoh
   ╟ cekimut
   ╟ cekkocak
   ╙ cekkadang

*SERTIFIKAT MENU*
   ╟ toloserti <nama>
   ╟ badgirlserti <nama>
   ╟ goodgirlserti <nama>
   ╟ fuckgirlserti <nama>
   ╙ bucinserti <nama>
 
*LOGO MENU*
   ╟ joker ( error server )
   ╟ digital ( error server )
   ╟ nulis ( error server )
   ╟ nulis2 ( error server )
   ╟ quoteser ( error server )
   ╟ quobucin ( error server )
   ╟ rem ( error server )
   ╟ girlneko ( error server )
   ╟ sadboy ( error server )
   ╟ kaneki ( error server )
   ╙ lolimaker ( error server )

*ANONYMOUS MENU*
   ╟ buatroom 628xxx
   ╟ room <only owner>
   ╟ stopchat <only room>
   ╙ menfess 628xx|bot|hai

*SOSMED MENU*
   ╟ pricelist <layanan>
   ╟ order <cara order>
   ╟ like jumlah|target
   ╟ view jumlah|target
   ╟ follower jumlah|username
   ╟ cekstatus <idtrx>
   ╟ komisi <owner only>
   ╙ tarikkomisi <owner only>
 
*VOKAL MENU* 
   ╟ hilih <text>
   ╟ halah <text>
   ╟ huluh <text>
   ╟ heleh <text>
   ╙ holoh <text>
 
*RANDOM MENU* 
   ╟ nenen
   ╟ genjot
   ╟ wangy
   ╟ curhat
   ╟ perkosa
   ╟ cecan
   ╟ cogan
   ╟ mobil
   ╟ islamic
   ╟ darkjokes
   ╟ boneka
   ╟ wallhp
   ╟ tatasurya
   ╙ programing

*PRIMBON MENU* 
   ╟ ramaljodoh
   ╟ ramalanjodoh
   ╟ nomorhoki
   ╟ artimimpi
   ╟ artinama
   ╟ sifatusaha
   ╟ tafsirmimpi
   ╟ pasangan
   ╟ suamiistri
   ╟ ramalcinta
   ╟ ramalancinta
   ╟ ramaljodohbali
   ╟ ramalanjodohbali
   ╟ cocoknama
   ╟ kecocokannama
   ╟ cocokpasangan
   ╙ kecocokanpasangan

*GACHA MENU*
   ╟ rika
   ╟ bocil
   ╟ ukhty
   ╟ santuy
   ╙ hijaber

*AUDIO CHANGER MENU*
   ╟ fat
   ╟ fast
   ╟ slow
   ╟ bass
   ╟ deep
   ╟ tupai
   ╟ robot
   ╟ blown
   ╟ smooth
   ╟ earrape
   ╟ reverse
   ╙ nightcore

*INFOMATION MENU* 
   ╟ gempa
   ╟ jadwaltv
   ╟ gempanow
   ╟ bioskopnow
   ╟ latintoaksara
   ╙ aksaratolatin

*STICKER RANDOM MENU* 
   ╟ dadu
   ╟ anjing
   ╟ patrick
   ╟ bucinstick
   ╟ gawrgura
   ╙ amongus

*AUDIO MENU* 
   ╟ audio1
   ╟ audio2
   ╟ audio3
   ╟ audio4
   ╟ audio5
   ╟ audio6
   ╟ audio7
   ╟ audio8
   ╟ audio9
   ╟ audio10
   ╟ audio11
   ╟ audio12
   ╟ audio13
   ╟ audio14
   ╟ audio15
   ╟ audio16
   ╟ audio17
   ╟ audio18
   ╟ audio19
   ╙ audio20
 
*CEK MENU* 
   ╟ goblokcek 
   ╟ jelekcek 
   ╟ gaycek
   ╟ lesbicek
   ╟ gantengcek 
   ╟ cantikcek
   ╟ begocek 
   ╟ suhucek
   ╟ pintercek
   ╟ jagocek
   ╟ nolepcek
   ╟ babicek
   ╟ bebancek
   ╟ baikcek
   ╟ jahatcek
   ╟ anjingcek
   ╟ haramcek
   ╟ pakboycek
   ╟ pakgirlcek
   ╟ sangecek 
   ╟ bapercek
   ╟ fakboycek
   ╟ alimcek
   ╟ suhucek
   ╟ fakgirlcek
   ╟ kerencek
   ╙ wibucek

*WALLPAPER MENU* 
   ╟ milf
   ╟ loli
   ╟ wallml
   ╟ waifu
   ╟ husbu
   ╟ cosplay
   ╟ ppcouple
   ╟ wallpaperislami
   ╟ wallpaperinori
   ╟ wallpaperanime
   ╟ wallpapergamer
   ╟ wallpapermeme
   ╟ wallpaperprogamer
   ╟ wallpaperteknologi
   ╙ wallpapercyber

*ANIME MENU* 
   ╟ akira 
   ╟ akiyama
   ╟ anna 
   ╟ asuna 
   ╟ ayuzawa 
   ╟ boruto 
   ╟ chiho 
   ╟ chitoge   
   ╟ deidara 
   ╟ eba 
   ╟ elaina    
   ╟ emilia 
   ╟ erza 
   ╟ gremory 
   ╟ hestia 
   ╟ hinata 
   ╟ inori  
   ╟ isuzu  
   ╟ itachi    
   ╟ itori  
   ╟ kaga   
   ╟ kagura  
   ╟ kaori   
   ╟ kaneki   
   ╟ kotori  
   ╟ kurumi  
   ╟ madara 
   ╟ megumin    
   ╟ mikasa 
   ╟ miku 
   ╟ minato 
   ╟ naruto  
   ╟ nezuko  
   ╟ onepiece 
   ╟ rize   
   ╟ sagiri     
   ╟ sakura    
   ╟ sasuke     
   ╟ shina   
   ╟ shinka    
   ╟ shinomia   
   ╟ shizuka 
   ╟ tejina   
   ╟ toukachan  
   ╟ tsunade  
   ╟ yotsuba 
   ╟ yuki    
   ╟ yumeko 
   ╟ manga
   ╟ characters
   ╟ anime 
   ╟ genres
   ╟ genshin
   ╟ cry
   ╟ hug
   ╟ pat
   ╟ bully
   ╟ lick
   ╟ kiss
   ╟ awoo
   ╟ waifu
   ╟ shinobu
   ╟ cuddle
   ╟ megumin
   ╟ slap
   ╟ neko
   ╟ wink
   ╟ dance
   ╟ poke
   ╟ glomp
   ╟ bite
   ╟ nom
   ╟ handhold
   ╟ highfive
   ╟ wave
   ╟ smug
   ╟ smile
   ╙ bonk

*CERPEN MENU* 
   ╟ cerpen-sejarah
   ╟ cerpen-sedih
   ╟ cerpen-sastra
   ╟ cerpen-romantis
   ╟ cerpen-rohani
   ╟ cerpen-rindu
   ╟ cerpen-remaja
   ╟ cerpen-ramadhan
   ╟ cerpen-petualangan
   ╟ cerpen-persahabatan
   ╟ cerpen-perpisahan
   ╟ cerpen-perjuangan
   ╟ cerpen-penyesalan
   ╟ cerpen-pengorbanan
   ╟ cerpen-pengalaman
   ╟ cerpen-pendidikan
   ╟ cerpen-penantian
   ╟ cerpen-patahhati
   ╟ cerpen-olahraga
   ╟ cerpen-nasionalisme
   ╟ cerpen-nasihat
   ╟ cerpen-motivasi
   ╟ cerpen-misteri
   ╟ cerpen-mengharukan
   ╟ cerpen-malaysia
   ╟ cerpen-liburan
   ╟ cerpen-kristen
   ╟ cerpen-korea
   ╟ cerpen-kisahnyata
   ╟ cerpen-keluarga
   ╟ cerpen-kehidupan
   ╟ cerpen-jepang
   ╟ cerpen-inspiratif
   ╟ cerpen-gokil
   ╟ cerpen-galau
   ╟ cerpen-cintasejati
   ╟ cerpen-cintasegitiga
   ╟ cerpen-cintasedih
   ╟ cerpen-cintaromantis
   ╟ cerpen-cintapertama
   ╟ cerpen-cintaislami
   ╟ cerpen-cinta
   ╟ cerpen-budaya
   ╟ cerpen-bahasasunda
   ╟ cerpen-bahasajawa
   ╟ cerpen-bahasainggris
   ╟ cerpen-bahasadaerah
   ╙ cerpen-anak

*SOUND MENU* 
   ╟ sound1
   ╟ sound2
   ╟ sound3
   ╟ sound4
   ╟ sound5
   ╟ sound6
   ╟ sound7
   ╟ sound8
   ╟ sound9
   ╟ sound10
   ╟ sound11
   ╟ sound12
   ╟ sound13
   ╟ sound14
   ╟ sound15
   ╟ sound16
   ╟ sound17
   ╟ sound18
   ╟ sound19
   ╟ sound20
   ╟ sound21
   ╟ sound22
   ╟ sound23
   ╟ sound24
   ╟ sound25
   ╟ sound26
   ╟ sound27
   ╟ sound28
   ╟ sound29
   ╟ sound30
   ╟ sound31
   ╟ sound32
   ╟ sound33
   ╟ sound34
   ╟ sound35
   ╟ sound36
   ╟ sound37
   ╟ sound38
   ╟ sound39
   ╟ sound40
   ╟ sound41
   ╟ sound42
   ╟ sound43
   ╟ sound44
   ╟ sound45
   ╟ sound46
   ╟ sound47
   ╟ sound48
   ╟ sound49
   ╟ sound50
   ╟ sound51
   ╟ sound52
   ╟ sound53
   ╟ sound54
   ╟ sound55
   ╟ sound56
   ╟ sound57
   ╟ sound58
   ╟ sound59
   ╟ sound60
   ╟ sound61
   ╟ sound62
   ╟ sound63
   ╟ sound64
   ╟ sound65
   ╟ sound66
   ╟ sound67
   ╟ sound68
   ╟ sound69
   ╟ sound70
   ╟ sound71
   ╟ sound72
   ╟ sound73
   ╙ sound74

*TEXTPRO MENU* 
   ╟ metallic text
   ╟ naruto text
   ╟ butterfly text
   ╟ flaming text
   ╟ shadow text
   ╟ cup text
   ╟ cup1 text
   ╟ romance text
   ╟ smoke text
   ╟ burnpaper text
   ╟ lovemessage text
   ╟ undergrass text
   ╟ love text
   ╟ coffe text
   ╟ woodheart text
   ╟ woodenboard text
   ╟ summer3d text
   ╟ wolfmetal text
   ╟ nature3d text
   ╟ underwater text
   ╟ goldenrose text
   ╟ summernature text
   ╟ letterleaves text
   ╟ glowingneon text
   ╟ fallleaves text
   ╟ flamming text
   ╟ harrypotter text
   ╟ carvedwood text
   ╟ tiktok text1 text2
   ╟ arcade8bit text1 text2
   ╟ battlefield4 text1 text2
   ╙ pubg text1 text2

*EPHOTO MENU* 
   ╟ wetglass text
   ╟ multicolor3d text
   ╟ watercolor text
   ╟ luxurygold text
   ╟ galaxywallpaper text
   ╟ lighttext text
   ╟ beautifulflower text
   ╟ puppycute text
   ╟ royaltext text
   ╟ heartshaped text
   ╟ birthdaycake text
   ╟ galaxystyle text
   ╟ hologram3d text
   ╟ greenneon text
   ╟ glossychrome text
   ╟ greenbush text
   ╟ metallogo text
   ╟ noeltext text
   ╟ glittergold text
   ╟ textcake text
   ╟ starsnight text
   ╟ wooden3d text
   ╟ textbyname text
   ╟ writegalacy text
   ╟ galaxybat text
   ╟ snow3d text
   ╟ birthdayday text
   ╟ goldplaybutton text
   ╟ silverplaybutton text
   ╙ freefire text

*NSFW MENU* 
   ╙ nsfw
 
Bot @⁨Ichika 💠⁩',
      footer: "Silahkan tekan tombol \"Click Here\" untuk melihat sub-menu AuraBot.\n\nJika menemukan bug, error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada owner.",
      mentions: await conn.parseMention(judul),
      title: judul,
      buttonText: "Click Here",
      sections
    }

    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3ButtonImg(m.chat, await (await fetch(thumbfoto)).buffer(), text.trim(), wm, `Owner`, `${_p}owner`, `Grup Official`, `${_p}auragc`, `Donasi`, `${_p}donasi`)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(m(enu)?|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}
