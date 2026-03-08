console.log("Starting bot.js...");
const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// reactions
const birthdayReactions = ["🎂","🎉","🎈","🥳","🍰"];

// month names
const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// helper get ordinal for date
function getOrdinal(n){
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

// helper format
function formatDate(dateString){
  const d = new Date(dateString);
  return `${monthNames[d.getMonth()]} ${getOrdinal(d.getDate())}, ${d.getFullYear()}`;
}

// helper calculate age
function getAge(character){
  const today = new Date();
  const birth = new Date(character.birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// helper days until next birthday
function daysUntilBirthday(character){
  const today = new Date();
  const birth = new Date(character.birthDate);
  const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.ceil((next - today) / (1000 * 60 * 60 * 24));
}

// data
const characters = [
  { name:"Yuri",fullName:"Yuri Malkovich",birthDate:"2007-01-01"},
  { name:"Amor",fullName:"Amor Fati",birthDate:"2007-01-01"},
  { name:"Clementine",fullName:"Clementine Ixtal",birthDate:"2009-01-01"},
  { name:"Hexe",fullName:"Hexe Zugasti",birthDate:"2011-01-01"},
  { name:"Cecilia",fullName:"Cecilia Wispon",birthDate:"2007-01-07"},
  { name:"Lupe",fullName:"Lupe Del Bosque Solis",birthDate:"2002-01-09"},
  { name:"Merc",fullName:"Mercury Makri",birthDate:"2007-01-12"},
  { name:"Tristan",fullName:"Tristan Del Bosque Ixtal",birthDate:"2009-01-14"},
  { name:"Carlos",fullName:"Carlos Del Bosque Espinosa",birthDate:"1981-01-21"},
  { name:"Andreas",fullName:"Andreas Macado",birthDate:"2010-01-22"},
  { name:"Lex",fullName:"Lex Whitlock",birthDate:"2011-01-28"},
  { name:"Victor & Alexander",fullName:"Victor & Alexander Wispon",birthDate:"1980-01-30"},
  { name:"Maerwynn",fullName:"Maerwynn Wispon",birthDate:"2011-02-14"},
  { name:"Corentin",fullName:"Corentin Whitlock",birthDate:"1980-03-06"},
  { name:"Octivia & Leslie",fullName:"Octivia & Leslie D'Arques",birthDate:"1999-03-14"},
  { name:"Baubles",fullName:"Baubles",birthDate:"1989-03-16"},
  { name:"Kasper",fullName:"Kasper Vaughn",birthDate:"1999-04-05"},
  { name:"Gabriel",fullName:"Gabriel Maywood",birthDate:"1935-04-06"},
  { name:"Rosemary",fullName:"Rosemary Roseblade",birthDate:"2007-04-09"},
  { name:"Jett & Spencer",fullName:"Jett & Spencer Van Damme",birthDate:"2007-04-10"},
  { name:"Boris & Lanolin",fullName:"Boris & Lanolin Lambrych",birthDate:"2008-04-13"},
  { name:"The Large Scary Man",fullName:"The Large Scary Man",birthDate:"1959-04-18"},
  { name:"Kara",fullName:"Kara Kento",birthDate:"1999-04-30"},
  { name:"Lotus",fullName:"Lotus Redtail",birthDate:"2011-05-01"},
  { name:"Sapphire",fullName:"Sapphire Laroche",birthDate:"2007-05-04"},
  { name:"Jude",fullName:"Jude Whitlock",birthDate:"2008-05-08"},
  { name:"Cyrille",fullName:"Cyrille Visage",birthDate:"1974-05-13"},
  { name:"Gladys",fullName:"Gladys Dewberry",birthDate:"1952-05-22"},
  { name:"Eiro",fullName:"Eiro Audair",birthDate:"2010-05-28"},
  { name:"Lucian",fullName:"Lucian Ixtal",birthDate:"1986-06-01"},
  { name:"Ophelia",fullName:"Ophelia DiPietra",birthDate:"2007-06-09"},
  { name:"Matthias",fullName:"Matthias Moen",birthDate:"2008-06-13"},
  { name:"Lancel",fullName:"Lancel Alegria",birthDate:"2000-06-21"},
  { name:"Angela",fullName:"Angela Del Bosque Ixtal",birthDate:"2016-06-24"},
  { name:"CJ",fullName:"CJ Doe",birthDate:"1998-06-25"},
  { name:"Cinder & Sage",fullName:"Cinder & Sage Whitlock",birthDate:"2016-06-30"},
  { name:"Maribelle",fullName:"Maribelle Orpheus",birthDate:"1985-07-05"},
  { name:"Nova",fullName:"Nova Sonastar",birthDate:"2007-07-08"},
  { name:"Scythian",fullName:"Scythian Igenmorgenschweissenmann",birthDate:"1986-07-19"},
  { name:"Tora",fullName:"Tora Maestri",birthDate:"2009-07-31"},
  { name:"Isla",fullName:"Isla Wispon",birthDate:"1981-07-31"},
  { name:"Judis",fullName:"Judis Ixtal",birthDate:"1989-08-01"},
  { name:"Avongara",fullName:"Avongara Signoria",birthDate:"1971-08-08"},
  { name:"Sennett Reue",fullName:"Headmaster Sennett Reue",birthDate:"1940-08-13"},
  { name:"Astrillia Wispon",fullName:"Astrillia Wispon",birthDate:"1924-08-21"},
  { name:"Sorin",fullName:"Sorin Valdis",birthDate:"1993-08-30"},
  { name:"Cassie",fullName:"Cassiopeia Heliotrope",birthDate:"2008-08-30"},
  { name:"Graham",fullName:"Graham Wispon",birthDate:"2008-09-02"},
  { name:"Penny",fullName:"Penny Magus",birthDate:"2013-09-11"},
  { name:"Barley",fullName:"Barley Carley",birthDate:"2006-09-30"},
  { name:"Lucius & Yvaine",fullName:"Lucius Regens von Caelum-Alegria & Yvaine von Caelum",birthDate:"1984-10-14"},
  { name:"Calix",fullName:"Calix Luciano",birthDate:"1979-10-29"},
  { name:"Cassandra",fullName:"Cassandra Nephthys",birthDate:"1985-10-31"},
  { name:"Artemisia",fullName:"Artemisia Maywood",birthDate:"2003-10-31"},
  { name:"Saifuk",fullName:"Saifuk Jaziri",birthDate:"1949-10-31"},
  { name:"Brindley",fullName:"Brindley Alegria-Audair-Whitlock",birthDate:"2025-10-31"},
  { name:"Dave",fullName:"Dave Faggetter",birthDate:"2011-11-11"},
  { name:"Inessa",fullName:"Inessa Solovyov",birthDate:"1992-11-11"},
  { name:"Bastian",fullName:"Bastian Audair",birthDate:"2006-11-12"},
  { name:"Circe",fullName:"Circe Nazaretian",birthDate:"2001-11-12"},
  { name:"Layna",fullName:"Layna Wispon",birthDate:"2025-11-13"},
  { name:"Vendetta",fullName:"Vendetta Sekmeht Sabretooth Van Damme-Deathbringer-Johnson",birthDate:"1978-11-30"},
  { name:"Eden",fullName:"Eden Maywood",birthDate:"2008-12-01"},
  { name:"Florence & Laurence",fullName:"Florence & Laurence Ixtal",birthDate:"2007-12-04"},
  { name:"Angelina",fullName:"Angelina Malkovich",birthDate:"1983-12-05"},
  { name:"Bandit",fullName:"Bandit Van Damme",birthDate:"2010-12-08"},
  { name:"Viola",fullName:"Viola Whitlock",birthDate:"2008-12-11"},
  { name:"Avery",fullName:"Avery Whitlock",birthDate:"1979-12-14"},
  { name:"Tove",fullName:"Tovenaar Barlowe",birthDate:"1878-12-20"},
  { name:"Aisosa",fullName:"Aisosa Mokwena",birthDate:"1968-12-27"},
  { name:"Wisteria, Freyja & Vesper",fullName:"Wisteria, Freyja & Vesper Roseblade",birthDate:"1968-12-28"}
];

// dead
const deadCharacters = [
  { name:"Roxie Brindley",fullName:"Roxie Brindley",birthDate:"1947-01-20", deathDate:"0000-00-00"},
  { name:"Solara",fullName:"Solara Mercia-Angevin",birthDate:"1922-02-28", deathDate:"2013-06-16"},
  { name:"Belladonna",fullName:"Belladonna Alegria",birthDate:"1985-03-24", deathDate:"2013-06-14"},
  { name:"Hayes",fullName:"Hayes Octavius",birthDate:"1902-03-24", deathDate:"2001-07-09"},
  { name:"Callum",fullName:"Callum Faewulfe",birthDate:"1700-04-11", deathDate:"1736-12-15"},
  { name:"Sung-ki",fullName:"Mok Sung-ki",birthDate:"1854-05-21", deathDate:"1881-09-09"},
  { name:"Taraji",fullName:"Taraji",birthDate:"1856-07-29", deathDate:"1950-04-26"},
  { name:"Clement",fullName:"Clement Maywood",birthDate:"1582-08-02", deathDate:"1670-10-10"},
  { name:"Magni",fullName:"Magni Macado",birthDate:"1965-08-18", deathDate:"2013-06-14"},
  { name:"Atticus",fullName:"Atticus Wispon",birthDate:"1873-08-24", deathDate:"1991-12-31"},
  { name:"Judith",fullName:"Judith Maywood",birthDate:"1602-09-16", deathDate:"1618-09-14"},
  { name:"Althea",fullName:"Althea Rosgaard",birthDate:"1963-11-08", deathDate:"2018-12-28"},
  { name:"Aguri",fullName:"Aguri Swordsinger",birthDate:"1597-11-19", deathDate:"1693-06-10"},
  { name:"Euphemia",fullName:"Euphemia Roseblade",birthDate:"1608-12-10", deathDate:"1728-12-31"}
];

// NPC hell
const npcHellCharacters = [
  {name:"MINERVA",fullName:"Minerva Wispon",birthDate:"1853-08-24",deathDate:"1953-08-25"}
];

// message templates
const normalMessages = [
  "# HAPPY BIRTHDAY **{name}!!!!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Happy birthday, **{name}!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Guess what? It's **{name}**'s birthday!\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# AAAAAHH HAPPY BIRTHDAY **{name}!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# IT'S **{name}**'s BIRTHDAY IT REALLY IS FOR REAL AND FOR TRUE\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# The woke liberal media doesn't want you to know this, but it's **{name}**'s birthday today.\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Oh my god oh my god oh my god it's **{name}**'s birthday!!!\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# **{name}** birotday hap.y birdaey\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# It's **{name}**'s birthday. Anyone who does not buy them presents will be shot.\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# GUYS IT'S **{name}**'s BIRTHDAY NOT FAKE NEWS\n\n**{fullName}** was born {birthDate} and is turning {age} today!"
];

// old people
const oldMessages = [
  "Jesus fucking Christ, **{fullName}** is still alive?\n\n**{fullName}** was born {birthDate} and is turning {age} today. Goddamn."
];

// post-1916
const deadMessagesPost1916 = [
  "# Happy heavenly birthday, {fullName}.\n\n**{fullName}** was born {birthDate} and died {deathDate}. They would be {age} today.",
  "# Today would be {name}'s {ageOrdinal} birthday.\n\n**{fullName}** was born {birthDate} and died {deathDate}. They would be {age} today."
];

// pre-1916
const deadMessagesPre1916 = [
  "# Today is {fullName}'s {ageOrdinal} birthday!\n\n**{fullName}** was born {birthDate} and died {deathDate}."
];

// NPC hell msg
const npcHellMessages = [
  "# THEY DON'T CELEBRATE BIRTHDAYS IN NPC HELL, {fullName} 🔥🔥🔥🔥🔥🔥\n\n**{fullName}** was born {birthDate} and the world was rid of them on {deathDate}."
];

// helper reactions
function reactBirthday(message){
  birthdayReactions.forEach(e => message.react(e).catch(()=>{}));
}

// helper birthday msg
function sendBirthday(channel, text){
  channel.send(text).then(m => reactBirthday(m));
}

// - helpers -
function getAge(character) {
  const today = new Date();
  const birth = new Date(character.birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return `${monthNames[d.getMonth()]} ${getOrdinal(d.getDate())}, ${d.getFullYear()}`;
}

function daysUntilBirthday(character) {
  const today = new Date();
  const birth = new Date(character.birthDate);
  const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.ceil((next - today) / (1000 * 60 * 60 * 24));
}

function reactBirthday(message) {
  birthdayReactions.forEach(e => message.react(e).catch(() => {}));
}

function sendBirthday(channel, text) {
  channel.send(text).then(m => reactBirthday(m));
}

// - command handling -
client.on("messageCreate", message => {
  if (!message.guild) return; // ignore DMs
  const msg = message.content.toLowerCase();

  const allChars = [...characters, ...deadCharacters, ...npcHellCharacters];

  // ---- !commandsplease ----
  if (msg === "!commandsplease") {
    return message.reply(`
!birthday (character)
!age (character)
!countdown (character)
!checkbirthdays
!check(month)birthdays
!happybirthday (character)
!itsmybirthday
!funfact
`);
  }

  // ---- !age (character) ----
  if (msg.startsWith("!age")) {
    const name = message.content.slice(4).trim().toLowerCase();
    const char = allChars.find(c => c.fullName.toLowerCase() === name);
    if (!char) return message.reply(`⚠️ boy who the hell is "${name}"`);
    return message.reply(`${char.fullName} is ${getAge(char)} years old.`);
  }

  // ---- !countdown (character) ----
  if (msg.startsWith("!countdown")) {
    const name = message.content.slice(10).trim().toLowerCase();
    const char = allChars.find(c => c.fullName.toLowerCase() === name);
    if (!char) return message.reply(`⚠️ boy who the hell is "${name}"`);
    const ageNext = getAge(char) + 1;
    return message.reply(
      `There are ${daysUntilBirthday(char)} days until ${char.name}'s ${getOrdinal(ageNext)} birthday on ${formatDate(char.birthDate)}!`
    );
  }

  // ---- !birthday (character) ----
  if (msg.startsWith("!birthday")) {
    const name = message.content.slice(9).trim().toLowerCase();
    const char = allChars.find(c => c.fullName.toLowerCase() === name || c.name.toLowerCase() === name);
    if (!char) return message.reply(`⚠️ boy who the hell is "${name}"`);

    const age = getAge(char);
    const birthDateFormatted = formatDate(char.birthDate);
    const deathDateFormatted = char.deathDate ? formatDate(char.deathDate) : "???";

    let msgToSend = "";

    if (npcHellCharacters.includes(char)) {
      msgToSend = npcHellMessages[0]
        .replace(/{fullName}/g, char.fullName)
        .replace(/{birthDate}/g, birthDateFormatted)
        .replace(/{deathDate}/g, deathDateFormatted);
    } else if (deadCharacters.includes(char)) {
      msgToSend = deadMessagesPost1916[0]
        .replace(/{fullName}/g, char.fullName)
        .replace(/{birthDate}/g, birthDateFormatted)
        .replace(/{deathDate}/g, deathDateFormatted)
        .replace(/{age}/g, age)
        .replace(/{name}/g, char.name)
        .replace(/{ageOrdinal}/g, getOrdinal(age));
    } else {
      const template = normalMessages[Math.floor(Math.random() * normalMessages.length)];
      msgToSend = template
        .replace(/{fullName}/g, char.fullName)
        .replace(/{birthDate}/g, birthDateFormatted)
        .replace(/{age}/g, age)
        .replace(/{name}/g, char.name);
    }

    return sendBirthday(message.channel, msgToSend);
  }

  // ---- !happybirthday (character) ----
  if (msg.startsWith("!happybirthday")) {
    const name = message.content.slice(14).trim();
    if (!name) return message.reply(`⚠️ boy who the hell is "${name}"`);
    return sendBirthday(message.channel, `# 🎂 Happy birthday, ${name}!`);
  }

  // ---- !itsmybirthday ----
  if (msg === "!itsmybirthday") {
    return message.channel.send(`@everyone
# EVERYONE SHUT THE FUCK UP IT'S ${message.author}'S BIRTHDAY!!!! HAPPY BIRTHDAY!!!!!!!!`);
  }

  // ---- !funfact ----
  if (msg === "!funfact") {
    // average birthday
    let totalDay = 0;
    allChars.forEach(c => {
      const d = new Date(c.birthDate);
      totalDay += Math.floor((d - new Date(d.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    });
    const avgDay = Math.floor(totalDay / allChars.length);
    const avgDate = new Date(2020, 0);
    avgDate.setDate(avgDay);
    const averageBirthday = `The average birthday of these characters is ${monthNames[avgDate.getMonth()]} ${getOrdinal(avgDate.getDate())}.`;

    // average age
    let totalAge = 0;
    allChars.forEach(c => { totalAge += getAge(c); });
    const avgAge = Math.round(totalAge / allChars.length);
    const averageAge = `The average age of every character is ${avgAge}.`;

    const facts = [
      "Circe and Bastian are birthday twins! They were both born on November 12th. Sorry, Circe.",
      "Inessa and Dave are birthday twins! They were both born on November 11th.",
      "Belladonna and Hayes are birthday twins! They were both born on March 24th. This was definitely a coincidence, and not done retroactively because they were already one day apart and it was funny.",
      "Isla and Tora are birthday twins! They were both born on July 31st. Sorry, Tora.",
      "Sorin and Cassie are birthday twins! They were both born on August 30th.",
      "Cassandra, Artemisia, and Saifuk are birthday triplets! They were all born on October 31st. They are also all natives and have no idea the significance of this date, which I find very funny!",
      "Yuri, Amor, Clementine, and Hexe are birthday quadruplets! They were all born on January 1st.",
      averageBirthday,
      averageAge,
      "Turning either 10 or 25 years old on her next birthday depending on who you ask, Angela is either the youngest or oldest Academy graduate ever!",
      "This server's least favorite month is February. September is in second place, which is funny because Judith's birthday is in September.",
      "This server's favorite month is January. December and August are tied for second place.",
      "Bastian, Isla, Lucian, Minerva, and Brindley all have special birthday messages.",
      "It's been 3 years since I made a Discord bot before this one. My last bot was called \"Snail Facts with Avery Whitlock\" which recited snail facts before spiraling into grief fueled madness.",
      "My birthday is October 22nd :) It was 15 minutes away from being October 23rd though. Which pisses me off because I could've been birthday twins with Weird Al. Instead I am birthday twins with the gay guy from modern family though, which is also okay I guess.",
      "Birthbot's birthday is March 7th.",
      "Programming this bot took 7 hours of nonstop work and 2 red bulls. My back hurt very bad afterwards. Worth it though."
    ];

    return message.reply(facts[Math.floor(Math.random() * facts.length)]);
  }

  // ---- !checkbirthdays (today's birthdays) ----
  if (msg === "!checkbirthdays") {
    return sendTodaysBirthdays(message.channel);
  }

  // ---- !check(month)birthdays (specific month) ----
  if (msg.startsWith("!check") && msg.endsWith("birthdays")) {
    const monthName = msg.slice(6, -9).trim(); // extract month
    const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
    if (monthIndex === -1) return message.reply("⚠️ invalid month");
    return sendMonthlyBirthdays(monthIndex, message.channel);
  }

});

// - daily/monthly birthday functions -
function sendTodaysBirthdays(channel) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const messagesToSend = [];

  // normal characters
  characters.forEach(c => {
    const [y, m, d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) {
      const age = getAge(c);
      messagesToSend.push(`# HAPPY BIRTHDAY **${c.name}!!!!!!**\n\n**${c.fullName}** was born ${formatDate(c.birthDate)} and is turning ${age} today!`);
    }
  });

  // dead characters
  deadCharacters.forEach(c => {
    const [y, m, d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) {
      const age = today.getFullYear() - y;
      messagesToSend.push(`# Happy heavenly birthday, ${c.fullName}.\n\n**${c.fullName}** was born ${formatDate(c.birthDate)} and died ${formatDate(c.deathDate)}. They would be ${age} today.`);
    }
  });

  // NPC hell
  npcHellCharacters.forEach(c => {
    const [y, m, d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) {
      messagesToSend.push(`# THEY DON'T CELEBRATE BIRTHDAYS IN NPC HELL, ${c.fullName} 🔥🔥🔥🔥🔥🔥\n\n**${c.fullName}** was born ${formatDate(c.birthDate)} and died ${formatDate(c.deathDate)}.`);
    }
  });

  messagesToSend.forEach(msg => channel.send(msg).then(m => reactBirthday(m)));
}

function sendTodaysBirthdaysToAllGuilds() {
  client.guilds.cache.forEach(guild => {
    const channel = guild.channels.cache.find(
      c => c.isTextBased() && c.name.toLowerCase() === "⋆˚☾⭒˚・birthdays" &&
           c.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)
    );
    if (channel) sendTodaysBirthdays(channel);
  });
}

function sendMonthlyBirthdays(monthIndex = null, channel = null) {
  const month = monthIndex !== null ? monthIndex : (new Date()).getMonth();
  const allChars = [...characters, ...deadCharacters];

  const monthBirthdays = allChars
    .filter(c => {
      const [y, m, d] = c.birthDate.split("-").map(Number);
      return m === month + 1;
    })
    .map(c => `**${c.fullName}** (${formatDate(c.birthDate)})`);

  if (monthBirthdays.length === 0) return;

  const message = `# ${monthNames[month]} Birthdays!\n\n${monthBirthdays.join("\n")}`;

  if (channel) {
    channel.send(message);
  } else {
    client.guilds.cache.forEach(guild => {
      const ch = guild.channels.cache.find(
        c => c.isTextBased() && c.name.toLowerCase() === "⋆˚☾⭒˚・birthdays" &&
             c.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)
      );
      if (ch) ch.send(message);
    });
  }
}

// - scheduled tasks -
function scheduleDailyBirthdays() {
  const now = new Date();
  const next9am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
  if (now >= next9am) next9am.setDate(next9am.getDate() + 1);
  const delay = next9am - now;

  setTimeout(() => {
    sendTodaysBirthdaysToAllGuilds();
    setInterval(sendTodaysBirthdaysToAllGuilds, 24 * 60 * 60 * 1000);
  }, delay);
}

function scheduleMonthlySummary() {
  const now = new Date();
  const next9am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
  if (now >= next9am) next9am.setDate(next9am.getDate() + 1);
  const delay = next9am - now;

  setTimeout(() => {
    if ((new Date()).getDate() === 1) sendMonthlyBirthdays();
    setInterval(() => { if ((new Date()).getDate() === 1) sendMonthlyBirthdays(); }, 24 * 60 * 60 * 1000);
  }, delay);
}

// - ready event and login -
client.once("ready", () => {
  console.log("ok i pull up");
  sendTodaysBirthdaysToAllGuilds();
  scheduleDailyBirthdays();
  scheduleMonthlySummary();
});

client.login(process.env.BOT_TOKEN);