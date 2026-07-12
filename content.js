// The Daily Woo — content library.
// Voice contract: sassy, never mean. Career/money/growth only — no romance, ever.
// Templates may use {name}, {sign}, {trait}, {color}.

const WOO = {
  signs: [
    { name: "Aries", glyph: "♈", start: [3, 21], traits: ["bold", "impatient", "unstoppable"], vibe: "first-in-the-meeting energy" },
    { name: "Taurus", glyph: "♉", start: [4, 20], traits: ["grounded", "stubborn", "luxurious"], vibe: "quiet luxury, loud invoices" },
    { name: "Gemini", glyph: "♊", start: [5, 21], traits: ["quick", "curious", "multitasking"], vibe: "seventeen tabs, all of them thriving" },
    { name: "Cancer", glyph: "♋", start: [6, 21], traits: ["intuitive", "protective", "deep"], vibe: "emotional intelligence as a superpower" },
    { name: "Leo", glyph: "♌", start: [7, 23], traits: ["radiant", "dramatic", "generous"], vibe: "main character, obviously" },
    { name: "Virgo", glyph: "♍", start: [8, 23], traits: ["precise", "capable", "discerning"], vibe: "the spreadsheet has a spreadsheet" },
    { name: "Libra", glyph: "♎", start: [9, 23], traits: ["balanced", "charming", "diplomatic"], vibe: "negotiation is an art form" },
    { name: "Scorpio", glyph: "♏", start: [10, 23], traits: ["intense", "strategic", "magnetic"], vibe: "knows where the bodies (of work) are buried" },
    { name: "Sagittarius", glyph: "♐", start: [11, 22], traits: ["adventurous", "honest", "optimistic"], vibe: "big ideas, bigger frequent-flyer balance" },
    { name: "Capricorn", glyph: "♑", start: [12, 22], traits: ["ambitious", "disciplined", "dry-witted"], vibe: "CEO of getting it done" },
    { name: "Aquarius", glyph: "♒", start: [1, 20], traits: ["visionary", "unconventional", "electric"], vibe: "living in the future, billing in the present" },
    { name: "Pisces", glyph: "♓", start: [2, 19], traits: ["dreamy", "creative", "psychic-adjacent"], vibe: "manifesting counts as a productivity method" }
  ],

  openers: [
    "The stars have reviewed your calendar, {name}, and frankly they have notes.",
    "Mercury peeked at your inbox this morning and whispered: you've got this.",
    "The universe filed a memo overnight and you're the subject line, {name}.",
    "Today's cosmic forecast for {sign}: 90% chance of being {trait} in public.",
    "The planets held a stand-up meeting about you. Attendance was full.",
    "Venus is doing your PR today, and she's very good at her job.",
    "Somewhere in the cosmos, a star just aligned specifically for your to-do list.",
    "Astrologically speaking, {name}, this is a power-move kind of day.",
    "The moon saw what you accomplished yesterday and told everyone.",
    "Jupiter, planet of abundance, has entered the chat.",
    "Your chart is serving {trait} energy today, and honestly? Correct.",
    "The cosmos checked your five-year plan and added a zero.",
    "Saturn, the taskmaster planet, looked at your work ethic and took notes.",
    "Every {sign} gets a day like today eventually. Yours came early.",
    "The stars aren't saying you're the moment, {name}. But they're not not saying it.",
    "Today's alignment is rare: ambition in the first house, snacks in the second."
  ],

  cores: [
    "You're underpricing yourself. Say the number today — say it with your whole chest, then stop talking.",
    "That idea you keep sitting on? It has an expiration date and a fan club waiting. Pitch it.",
    "Someone's going to ask for your opinion today. Give the real one. Diplomacy is a garnish, not the meal.",
    "The task you're dreading takes twenty minutes. The dread has taken three days. Evict it before lunch.",
    "Check your subscriptions. One of them is quietly robbing you and it isn't even bringing you joy.",
    "Your future self left a note: she's rich, rested, and she says thank you for what you do today.",
    "Stop editing the email. Send the email. Perfection is procrastination in a nicer outfit.",
    "A door closes today. Do not stand there knocking — there's a better one down the hall with your name on it.",
    "Delegate one thing today. Yes, they'll do it differently. Different is not wrong, it's just not you.",
    "Money likes to be talked about. Look yours in the eye today — the account, the goal, the plan. Five minutes.",
    "You've been in 'almost ready' for a while now. Ready is a decision, not a feeling. Decide.",
    "Someone junior is watching how you carry yourself today. Give them something worth copying.",
    "The meeting that could be an email? Today you have cosmic permission to say so. Politely. Once.",
    "Negotiate something today — a deadline, a price, a better seat. The muscle only grows if you use it.",
    "Your energy is a budget, not a bottomless brunch. Spend it on the thing only you can do.",
    "That skill you're 'too old' or 'too late' to learn? The universe checked and there's no such rule on file.",
    "Write down the win before you forget it. Your performance review self will weep with gratitude.",
    "You don't need more research. You need one small, slightly scary action before 3pm.",
    "Someone will underestimate you today. This is a tactical advantage. Use it.",
    "The mess on your desk is a to-do list in 3D. Handle three items and watch your brain exhale.",
    "Ask the question everyone else is too polite to ask. It's the fastest route to being unforgettable.",
    "Your ambition is not 'too much'. It's exactly enough. The room will adjust.",
    "Today favors finishing over starting. Close three loops and the universe opens a better one.",
    "There is money on the table somewhere in your life — a rebate, a raise, a rate. Go find the table.",
    "Practice saying 'that doesn't work for me' in the mirror. You'll need it by Thursday.",
    "Your calendar is a values document. Today, make sure it isn't committing perjury.",
    "The person you're nervous to email puts their pants on one leg at a time. Send it.",
    "Rest is a strategy, not a reward. Schedule some like it's a board meeting, because it is.",
    "You already know the answer. You're just shopping for permission. Consider this your receipt.",
    "Small wins compound like interest. Bank one before noon and check your balance tonight.",
    "The version of you that intimidates people? That's just you, focused. Let her out today.",
    "Update the resume, the rate card, or the bio — whichever one still describes who you were last year.",
    "Today, be the person who follows up. Fortunes are made in the second email.",
    "Whatever you're calling 'networking dread', the stars call 'one coffee with a future ally'. Book it.",
    "Your instincts flagged something recently. They were right. Act accordingly.",
    "Turn the big scary goal into one stupid-small step. The stars love a checkbox.",
    "Someone owes you an answer. Chase it today — kindly, firmly, and in writing.",
    "You've outgrown something — a tool, a routine, maybe a whole title. Name it today. Naming is step one.",
    "Take the credit. Out loud. 'It was a team effort' can wait until you've said 'I built that' once.",
    "The universe is not subtle today: back up your files, back up your boundaries, back yourself."
  ],

  closers: [
    "That's the memo. Go be excellent.",
    "The stars said what they said.",
    "File this under: things you already knew, cosmically confirmed.",
    "Consider yourself professionally blessed.",
    "The universe signed off on this personally.",
    "Print it, frame it, live it.",
    "This forecast is legally binding in at least one dimension.",
    "Go forth and invoice accordingly.",
    "The cosmos rests its case.",
    "You may now return to being the moment.",
    "Reread this at 2pm when you forget. You will.",
    "The stars are rooting for you, loudly.",
    "That's not advice, that's prophecy. Act natural.",
    "Cosmic customer support is closed. You've got everything you need.",
    "The moon will be checking in on this later.",
    "Signed, sealed, celestially delivered.",
    "No refunds on destiny.",
    "The group chat will hear about how well this goes.",
    "Today's forecast brought to you by your own potential.",
    "Onward. The universe hates a slow walker."
  ],

  fashion: [
    "Wear the earrings that make you tilt your head in the mirror. Yes, on a Tuesday. Especially on a Tuesday.",
    "Today calls for {color}. Even a hint of it — the universe accepts accessories as full payment.",
    "The blazer. You know the one. It has never once lost a negotiation.",
    "Lip color that says 'I've read the contract twice.' Apply. Proceed.",
    "Whatever you wear today, steam it or de-lint it. Polish is a frequency and you're broadcasting.",
    "The shoes that make noise when you walk? Wear them. Announce yourself.",
    "A little {color} near your face today. Watch people suddenly agree with you in meetings.",
    "Dress for the job title you're manifesting. HR can't stop the universe.",
    "Your glasses/sunglasses situation today should say 'I know things.' Because you do.",
    "Tuck it in. Just — trust the stars on this one. Tucked in. Instant authority.",
    "Wear the watch, even though your phone tells time. Wrists that mean business change rooms.",
    "That one piece you 'save for special occasions'? Being alive is the occasion. Deploy it.",
    "Fragrance is a personality patch, and today yours should say 'expensive decisions'.",
    "Monochrome today. Head to toe. Let them think you have a stylist.",
    "The stars recommend a bold lip or a bold sock. Choose your fighter.",
    "Iron the collar. Kings and queens have been crowned in less.",
    "A touch of {color} today — it's your power color, and coincidences don't exist.",
    "Hair up says 'busy and important'. Hair down says 'effortless and important'. Either way: important.",
    "Wear something with pockets and put your hands in them mid-conversation. Devastating confidence move.",
    "Today's look: like you might casually own the building. Even if the building is your kitchen.",
    "The good jeans. Not the okay jeans. Life is too short and your standup meeting deserves better.",
    "Layer something today. Layers say depth. Depth says raise.",
    "If in doubt, add one gold thing. The stars are legally required to notice gold.",
    "Wear the color that strangers compliment. You know which one it is. ({color}, if you needed a hint.)",
    "Posture is the outfit under the outfit. Shoulders back — you just got taller and more promotable.",
    "Today, dress like the 'before' is over. You are deep into the 'after'.",
    "A crisp white anything. Blouse, tee, sneakers. Blinding competence, wearable form.",
    "Do the extra thing — the scarf, the pin, the ring stack. Details are how legends get described later.",
    "Match your energy to your outerwear: structured. The universe loves a defined shoulder.",
    "Whatever makes you walk faster, wear that. Velocity is a look.",
    "The stars have reviewed your closet remotely: the thing you almost wore? Wear it.",
    "One item of {color} and the confidence of someone whose calendar fears them.",
    "Skip the safe outfit today. Safe is for deposit boxes, not for you.",
    "Glow situation: moisturize like you're expensive to maintain. Because you are.",
    "Today's dress code is 'approachable, but clearly winning'.",
    "Put on the outfit that makes you take a mirror selfie you never post. That one. That's the one."
  ],

  gratitude: [
    "The first sip of coffee before anyone needs anything from you.",
    "A playlist that knows exactly what you're going through.",
    "The colleague who laughs at your jokes even on Mondays.",
    "Clean sheets night. Whenever it last was, it counted.",
    "The parking spot that appeared like a small miracle.",
    "Your hands, which have built literally everything you've ever done.",
    "The friend who texts back fast when it matters.",
    "A window with decent light and a sky doing something interesting.",
    "The meal you didn't have to cook.",
    "Autocorrect catching the typo in the important email. This time.",
    "Your past self, who handled things so today-you could exist.",
    "The stranger who held the door with excellent timing.",
    "Leftovers that were somehow better the second day.",
    "The exact right word arriving when you needed it.",
    "A pen that writes smoothly on the first try.",
    "The nap you took instead of powering through. Strategic genius.",
    "Whoever invented the snooze button, a true friend of the people.",
    "Your immune system, working nights and weekends, no complaints.",
    "The plant that's still alive. Against odds. Like you.",
    "A hot shower with water pressure that means it.",
    "The one drawer in your house that is fully, beautifully organized.",
    "Your sense of humor, which has carried more weight than any gym membership.",
    "The elevator that was already on your floor.",
    "A meeting that ended early. Rare. Sacred. Noted.",
    "Bread, generally. What an invention.",
    "The person who taught you the keyboard shortcut you now can't live without.",
    "Your ability to start over, which you've used more times than you give yourself credit for.",
    "Socks fresh out of the dryer.",
    "The quiet hour, whenever yours is.",
    "A green light streak on the way somewhere important.",
    "The app update that actually made things better.",
    "Whoever is patient with you when you're not at your best.",
    "The smell just before rain.",
    "A really good pillow arrangement, achieved by accident.",
    "Your curiosity — it's why you're better at this than you were last year.",
    "The unsubscribe button, humanity's finest boundary.",
    "A day where the weather matches your plans.",
    "The people who knew you 'back when' and stuck around for 'right now'.",
    "That one reliable pair of shoes that has never once betrayed you.",
    "Being someone who reads their horoscope with a wink. Self-awareness is wealth."
  ],

  tarot: [
    { name: "The Fool", icon: "\u{1F0CF}", up: "New-venture energy. Take the leap — the universe installed a trampoline while you weren't looking.", rev: "Look before leaping today. Enthusiasm is not a business plan, it's the cover page." },
    { name: "The Magician", icon: "✨", up: "You have every tool you need on the desk in front of you. Stop shopping for new ones and build.", rev: "Someone's overpromising in your orbit — possibly you. Scope it down, then over-deliver." },
    { name: "The High Priestess", icon: "\u{1F311}", up: "Your gut has been running analytics in the background. Trust the report.", rev: "You're sitting on information someone needs. Speak up before the deadline does." },
    { name: "The Empress", icon: "\u{1F451}", up: "Abundance card. Walk into that meeting like the budget reports to you.", rev: "You can't pour from an empty espresso cup. Refill yourself first, then conquer." },
    { name: "The Emperor", icon: "\u{1F3DB}", up: "Structure wins today. Make the plan, set the boundary, own the room.", rev: "Loosen the grip. Micromanaging the process is scaring away the results." },
    { name: "The Hierophant", icon: "\u{1F4DC}", up: "Learn from someone who's done it before. Mentorship is a cheat code, use it shamelessly.", rev: "The 'way it's always been done' is due for disruption. You're the disruption." },
    { name: "The Lovers", icon: "\u{1F91D}", up: "A choice between two good options. Pick the one aligned with your values, not your fears.", rev: "Misalignment on a team or deal. Name the mismatch out loud — clarity is kindness." },
    { name: "The Chariot", icon: "\u{1F3C6}", up: "Momentum card. You're driving today — hands on the wheel, foot on the gas, eyes on the prize.", rev: "Two priorities pulling opposite directions. Pick a lane before the lane picks you." },
    { name: "Strength", icon: "\u{1F98B}", up: "Soft power day. You'll win with patience and charm what force could never close.", rev: "Doubt is loud today. It's also wrong. Proceed anyway, gently." },
    { name: "The Hermit", icon: "\u{1F3EE}", up: "Block the calendar. Deep work in solitude produces your best move this week.", rev: "You've been in the cave long enough. Surface, share, and let people react." },
    { name: "Wheel of Fortune", icon: "\u{1F3A1}", up: "Luck is cycling your way. Buy the ticket, send the pitch, raise the hand.", rev: "A plot twist is coming. Flexible people land on their feet — stretch now." },
    { name: "Justice", icon: "⚖", up: "Fairness pays out today. Honor the deal, invoice the exact worth, keep receipts.", rev: "An imbalance needs correcting — you're doing more than you're credited for. Adjust it." },
    { name: "The Hanged Man", icon: "\u{1F919}", up: "A deliberate pause reveals the angle everyone else missed. Dangle strategically.", rev: "You're stalling and calling it patience. The stars see the difference." },
    { name: "Death", icon: "\u{1F98B}", up: "Not literal. Something ends so something better can start — a project, a habit, an era. Let it.", rev: "You're dragging a finished chapter into a new book. Release it, page one awaits." },
    { name: "Temperance", icon: "⚗", up: "Blend, don't binge. The sustainable pace wins the quarter, not the all-nighter.", rev: "Extremes are tempting today. The answer is almost certainly 'some, not all'." },
    { name: "The Devil", icon: "⛓", up: "Notice the golden handcuffs — the comfort that's quietly costing you. Awareness is the key.", rev: "A chain is breaking. That obligation, subscription, or bad habit is losing its grip on you." },
    { name: "The Tower", icon: "⚡", up: "A shaky structure falls so a solid one can be built. Rebuild on the good foundation.", rev: "You saw the crack early. Fix it quietly today and skip the dramatic collapse entirely." },
    { name: "The Star", icon: "⭐", up: "Hope with a business plan. Your vision is valid — and today someone influential agrees.", rev: "Reconnect to the reason you started. The 'why' pays better than the 'what'." },
    { name: "The Moon", icon: "\u{1F319}", up: "Not everything is as presented today. Read the fine print, trust the vibes, verify twice.", rev: "The fog is lifting. That confusing situation makes sudden, useful sense." },
    { name: "The Sun", icon: "☀", up: "Best card in the deck. Success, visibility, and warmth — accept compliments without deflecting.", rev: "The win is real, just delayed. Keep the receipts warm." },
    { name: "Judgement", icon: "\u{1F3BA}", up: "A calling gets louder. The pivot you keep whispering about is ready for its speaking voice.", rev: "You're grading yourself on last year's rubric. Update the criteria, then look how you're doing." },
    { name: "The World", icon: "\u{1F30D}", up: "Completion card. Finish the thing, take the bow, and let the next door find you.", rev: "You're 90% done and shopping for new projects. Close the loop first — the last 10% is where the credit lives." }
  ],

  colors: [
    { name: "Burnt sienna", hex: "#D85A30" },
    { name: "Midnight plum", hex: "#3C3489" },
    { name: "Champagne gold", hex: "#D4A94E" },
    { name: "Sage green", hex: "#7A9B6D" },
    { name: "Oxblood", hex: "#711F2E" },
    { name: "Cobalt blue", hex: "#2456C4" },
    { name: "Blush pink", hex: "#E8A0B4" },
    { name: "Emerald", hex: "#0F6E56" },
    { name: "Butter yellow", hex: "#EFD273" },
    { name: "Terracotta", hex: "#C46A4A" },
    { name: "Lavender haze", hex: "#AFA9EC" },
    { name: "Crimson", hex: "#B22234" },
    { name: "Forest green", hex: "#27500A" },
    { name: "Dusty rose", hex: "#C98B8B" },
    { name: "Electric teal", hex: "#1D9E75" },
    { name: "Warm camel", hex: "#B08D57" },
    { name: "Ink black", hex: "#1C1B22" },
    { name: "Cloud white", hex: "#F4F1E8" },
    { name: "Tangerine", hex: "#EF9F27" },
    { name: "Deep violet", hex: "#534AB7" },
    { name: "Rust", hex: "#993C1D" },
    { name: "Seafoam", hex: "#9FE1CB" },
    { name: "Cherry red", hex: "#D2374B" },
    { name: "Mocha", hex: "#6B4F3A" }
  ],

  moonPhases: ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"],

  moonLines: {
    "New moon": [
      "Blank-page energy. Plant the ambitious seed today and tell no one until it sprouts.",
      "The cosmic reset button has been pressed. Set one intention with a deadline attached.",
      "Low light, high potential. Draft the plan you'll brag about at the full moon."
    ],
    "Waxing crescent": [
      "Momentum is building — feed it small wins and it will feed you back.",
      "The universe is compounding your efforts. Keep making deposits.",
      "Early-stage energy: protect the new thing from critics, including the one in your head."
    ],
    "First quarter": [
      "Obstacle-clearing moon. Whatever's blocking you, today has the leverage to move it.",
      "Decision time. The moon is half lit and so is your patience — commit.",
      "Push day. The resistance you feel is just progress with bad manners."
    ],
    "Waxing gibbous": [
      "Refinement phase. Polish the thing — it's closer to ready than you think.",
      "Almost-there energy. Resist the urge to start something new; finish what's glowing.",
      "The moon is at 90% and honestly, so are you. Final push."
    ],
    "Full moon": [
      "Maximum visibility. Ship it, share it, take the credit under the big light.",
      "Harvest time — collect what you planted, including compliments.",
      "Full illumination means nothing hides today: review the books, the plan, the truth."
    ],
    "Waning gibbous": [
      "Gratitude-and-teach energy. Share what you learned; generosity compounds.",
      "Post-peak clarity. Write down what worked while it's still obvious.",
      "The moon is exhaling. You're allowed to as well — debrief, don't sprint."
    ],
    "Last quarter": [
      "Release the dead weight: the stale goal, the gray to-do, the tab open since March.",
      "Course-correct day. Cutting losses is a profit strategy.",
      "Half-dark moon, fully clear verdict: let go of what's not earning its keep."
    ],
    "Waning crescent": [
      "Rest is on the cosmic calendar. Recovery is part of the job description.",
      "Lowest-light phase: reflect, restore, and let ambition nap. It wakes up hungry.",
      "Quiet close of the cycle. Tie loose ends and go to bed proud."
    ]
  },

  moonFlavor: {
    "Aries": "your Aries moon wants results by lunch",
    "Taurus": "your Taurus moon insists on comfort while conquering",
    "Gemini": "your Gemini moon has three backup plans and a podcast idea",
    "Cancer": "your Cancer moon reads every room before entering",
    "Leo": "your Leo moon expects applause, and frankly deserves it",
    "Virgo": "your Virgo moon has already proofread this horoscope",
    "Libra": "your Libra moon negotiates even with itself",
    "Scorpio": "your Scorpio moon knows things it hasn't mentioned",
    "Sagittarius": "your Sagittarius moon is mentally already at the airport",
    "Capricorn": "your Capricorn moon budgets even its feelings",
    "Aquarius": "your Aquarius moon is five years ahead of the meeting",
    "Pisces": "your Pisces moon dreamed the solution last night"
  },

  risingFlavor: {
    "Aries": "Aries rising walks in like the agenda item",
    "Taurus": "Taurus rising makes patience look expensive",
    "Gemini": "Gemini rising charms the whole elevator by floor three",
    "Cancer": "Cancer rising remembers everyone's coffee order — power move",
    "Leo": "Leo rising doesn't enter rooms, it debuts",
    "Virgo": "Virgo rising looks organized even mid-chaos",
    "Libra": "Libra rising gets upgraded without asking",
    "Scorpio": "Scorpio rising says less and gets told more",
    "Sagittarius": "Sagittarius rising makes bold sound reasonable",
    "Capricorn": "Capricorn rising is mistaken for the boss, constantly",
    "Aquarius": "Aquarius rising is the reference the room quotes later",
    "Pisces": "Pisces rising softens rooms and sharpens ideas"
  },

  // What each placement says about you. Sun = the engine, Moon = the inner
  // operating system, Rising = the entrance you make.
  placements: {
    sun: {
      intro: "Your sun sign is the engine — what actually drives you when nobody's assigning the work.",
      "Aries": "You are powered by the word 'first'. Starting things is your love language, waiting is your villain origin story, and every finish line you cross was mostly a formality — you won it at the starting gun.",
      "Taurus": "You build slowly, beautifully, and permanently. People mistake your patience for passivity right up until they notice you own everything in the room. Comfort isn't your weakness; it's your business model.",
      "Gemini": "Your brain runs more open tabs than a browser should survive, and somehow they're all loading. You collect skills, people, and punchlines — and your superpower is connecting things nobody else realized were related.",
      "Cancer": "You read rooms like quarterly reports. Your intuition about people is functionally a professional credential, and everything you build — teams, homes, careers — is built to protect what you love.",
      "Leo": "You were born with stage presence and the audacity to use it. Generosity is your flex: you want everyone shining, as long as it's understood who installed the lighting.",
      "Virgo": "You see the flaw, the fix, and the five-step plan before anyone else has finished reading the brief. Excellence isn't your goal; it's your resting state. The world calls it perfectionism. You call it Tuesday.",
      "Libra": "You are the diplomatic weapon every negotiation wishes it had. Beauty, balance, and the perfectly-worded email are your natural habitat — and people say yes to you before realizing they were undecided.",
      "Scorpio": "You operate at a depth most people don't know exists. Total commitment or total absence — there is no middle setting. You'd be intimidating even if you weren't right so often.",
      "Sagittarius": "You aim at horizons other people haven't googled yet. Optimism plus honesty plus zero patience for small plans — your career is less a ladder, more a series of confident leaps that keep landing.",
      "Capricorn": "You were the CEO of something by age nine. The mountain isn't a metaphor to you; it's a to-do list. Your dry wit is the reward for anyone who keeps up.",
      "Aquarius": "You live about five years ahead of the meeting and have made peace with the commute. Rules are suggestions, conventions are drafts, and your weirdest idea is usually the one that ends up funded.",
      "Pisces": "You feel your way to answers other people need spreadsheets for. Imagination is your infrastructure — and when you finally show them what you've been quietly making, rooms go silent in the good way."
    },
    moon: {
      intro: "Your moon sign is the inner operating system — how you actually recharge, process, and feel your way through it all.",
      "Aries": "Inside, you process feelings at highway speed: flare, resolve, done. You recharge by winning at something — anything — including being first out of the parking lot.",
      "Taurus": "Your inner world demands good blankets, better snacks, and zero surprises. You metabolize stress through comfort and routine, and your loyalty, once given, has the structural integrity of a bank vault.",
      "Gemini": "You process emotions by narrating them — to a friend, a journal, a group chat, occasionally a stranger. Your inner life is a talk show, and honestly the ratings are great.",
      "Cancer": "You feel everything at full resolution and remember all of it. Home is your recharge station and your fortress; you don't have moods so much as tides, and you've learned to sail them.",
      "Leo": "Your inner world runs on appreciation the way engines run on fuel. When you're seen, you're unstoppable. When you're overlooked, you don't sulk — you just quietly relocate the sunshine.",
      "Virgo": "You self-soothe by organizing something. A drawer, a plan, a person's entire life trajectory. Anxiety doesn't stand a chance against your label maker.",
      "Libra": "Your inner peace is load-bearing on your outer aesthetics — when the room is beautiful and nobody's fighting, you are fully operational. You process by weighing, always weighing.",
      "Scorpio": "You feel things at a depth that would require other people to file paperwork. You process privately, completely, and emerge transformed — the emotional equivalent of a controlled burn.",
      "Sagittarius": "You metabolize bad days by planning escapes — trips, projects, entire new lives sketched on napkins. Your inner compass always points somewhere more interesting.",
      "Capricorn": "You handle feelings the way you handle everything: on schedule, with a plan, preferably alone with something ambitious. Your softness is real; it's just behind excellent security.",
      "Aquarius": "You process emotions by zooming out until they look like data, then quietly acting on what you found. Detached? No — you just run your feelings through peer review.",
      "Pisces": "Your inner world has better production design than most films. You absorb everyone's feelings within a mile radius, so your recharge time isn't a luxury — it's maintenance on the antenna."
    },
    rising: {
      intro: "Your rising sign is the entrance you make — the first-impression packaging the world meets before the rest of you arrives.",
      "Aries": "You read as direct, decisive, and slightly ahead of everyone else's walking pace. Rooms assume you're in charge of something, and honestly, by the end of the meeting you usually are.",
      "Taurus": "You arrive calm, composed, and somehow expensive-looking regardless of budget. People trust you on sight — you have the aura of someone whose word is a contract.",
      "Gemini": "You lead with wit and everyone notices. First impressions of you involve laughing within ninety seconds and later realizing they told you their whole life story.",
      "Cancer": "You read as warm and safe — people confide in you at the coffee machine on day one. Don't mistake it for softness on their part: being trusted instantly is a professional cheat code.",
      "Leo": "Your entrance has its own lighting design. People remember meeting you, often in more flattering detail than what actually happened, which is exactly the brand.",
      "Virgo": "You present as put-together and quietly competent — the person others double-check their work against. Your first impression is 'this one reads the footnotes', and it opens doors.",
      "Libra": "You arrive charming and symmetrical, and the room recalibrates its manners. People assume you're the reasonable one, which gives you astonishing leverage. Use it kindly.",
      "Scorpio": "Your first impression is magnetic and slightly unreadable — people either want to know your secrets or assume you already know theirs. Both are useful.",
      "Sagittarius": "You read as confident, candid, and slightly larger than the room. Strangers take your recommendations for restaurants and life choices within minutes.",
      "Capricorn": "You get mistaken for the most senior person present, constantly, including when you were the intern. The world hands authority to your entrance; the rest of your chart decides what to build with it.",
      "Aquarius": "You come across as the interesting one — original, a little unplaceable, quoted after the meeting ends. People can't categorize you fast, so they remember you instead.",
      "Pisces": "You arrive gentle and slightly dreamlike, and people relax without knowing why. It disarms rooms — which is precisely when your sharpest ideas land unopposed."
    }
  },

  elementOf: {
    "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
    "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
    "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
    "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
  },

  elementIntros: {
    "Fire": [
      "Fire sign fuel required: something with heat, char, or attitude.",
      "Your element runs hot today — feed the flame, don't smother it.",
      "Fire signs don't simmer. Tonight's plate shouldn't either."
    ],
    "Earth": [
      "Earth sign appetite: grounding, generous, worth setting the table for.",
      "Your element wants substance tonight — roots, grains, the good bowl.",
      "Earth signs eat like the harvest personally reported to them."
    ],
    "Air": [
      "Air sign menu: bright, fresh, assembled with opinions.",
      "Your element wants something light enough to eat mid-conversation.",
      "Air signs season with citrus and commentary."
    ],
    "Water": [
      "Water sign cooking: soothing, brothy, emotionally supportive.",
      "Your element wants comfort in a bowl tonight. Obey.",
      "Water signs know dinner is also therapy."
    ]
  },

  // diets: which eaters this meal suits — omni, pesc, veg, vegan.
  meals: [
    { name: "Charred lemon-pepper salmon with crispy potatoes", line: "Rich enough for a victory, fast enough for a Tuesday.", diets: ["omni", "pesc"] },
    { name: "Golden chickpea coconut curry", line: "Turmeric is basically bottled sunshine, and you deserve the whole ladle.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Brown butter mushroom risotto", line: "Stirring is a meditation. The parmesan is the reward for enlightenment.", diets: ["omni", "pesc", "veg"] },
    { name: "Fire-roasted tomato soup with a serious grilled cheese", line: "The power lunch of people who have nothing to prove.", diets: ["omni", "pesc", "veg"] },
    { name: "Citrus-chili shrimp tacos with quick-pickled onions", line: "Bright, fast, and a little dramatic — like your best decisions.", diets: ["omni", "pesc"] },
    { name: "Herby lemon roast chicken with whatever vegetables need using", line: "A classic, because you're building a legacy, not a fad.", diets: ["omni"] },
    { name: "Miso-glazed eggplant over sesame rice", line: "Umami is the universe's way of saying 'trust the process'.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Spicy peanut noodles with crunchy vegetables", line: "Fifteen minutes, one bowl, disproportionate joy.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "White bean and rosemary stew with garlic toast", line: "Peasant food, king energy.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Seared steak with chimichurri and blistered peppers", line: "For days when the calendar needed to be shown who's boss.", diets: ["omni"] },
    { name: "Lemony orzo with spinach, feta, and too much dill", line: "Tastes like a vacation you can expense to a weeknight.", diets: ["omni", "pesc", "veg"] },
    { name: "Crispy tofu banh-mi-style bowls", line: "Crunchy, tangy, assembled — the meal equivalent of a well-run meeting.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Sheet-pan sausage with roasted grapes and onions", line: "One pan. Zero dishes drama. Maximum plot twist (the grapes).", diets: ["omni"] },
    { name: "Coconut lime lentil soup", line: "Simmers itself while you finish being brilliant.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Garlic butter pasta with whatever herbs survived the week", line: "Simplicity executed perfectly — the most underrated flex in any kitchen.", diets: ["omni", "pesc", "veg"] },
    { name: "Blackened fish with mango salsa", line: "Sweet, hot, and impossible to eat while feeling pessimistic.", diets: ["omni", "pesc"] },
    { name: "Loaded sweet potatoes with black beans and lime crema", line: "Humble root vegetable, main-character styling.", diets: ["omni", "pesc", "veg"] },
    { name: "Mushroom and caramelized onion galette", line: "Rustic on purpose. Impressive by accident. Ideal ratio.", diets: ["omni", "pesc", "veg"] },
    { name: "Gochujang-glazed crispy cauliflower with rice", line: "Vegetables with a five-year plan and the confidence to match.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Slow-simmered bolognese over anything", line: "Patience you can taste. Leftovers you'll guard.", diets: ["omni"] },
    { name: "Smashed chickpea salad sandwiches on good bread", line: "Deceptively simple, like all the best power moves.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Harissa roasted carrots with whipped tahini", line: "A side dish that unionized and became the main.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Pesto white pizza with arugula thrown on like confetti", line: "Order it or make it — the stars only care that there's a celebratory element.", diets: ["omni", "pesc", "veg"] },
    { name: "Ginger-scallion poached chicken and rice", line: "Quietly perfect. The comfort food of people with excellent judgment.", diets: ["omni"] },
    { name: "Summer rolls with peanut sauce you'll want to drink", line: "Assembly, not cooking — delegation as a culinary philosophy.", diets: ["omni", "pesc", "veg", "vegan"] },
    { name: "Tuna melt on sourdough, no apologies", line: "Retro excellence. Some classics survived for a reason.", diets: ["omni", "pesc"] },
    { name: "Roasted vegetable grain bowl with a jammy egg", line: "Balanced, colorful, quietly superior — a personality goal in bowl form.", diets: ["omni", "pesc", "veg"] },
    { name: "Dark chocolate chili (yes, in the chili)", line: "Secret-ingredient energy for a secret-weapon kind of day.", diets: ["omni", "pesc", "veg", "vegan"] }
  ]
};
