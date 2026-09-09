AOS.init({ duration: 900, once: false });

/* ================= EVENT DATA (rules modal) ================= */
const eventDetails = {
    paper: {
        tag: 'Technical', title: 'Paper Presentation',
        desc: 'Present innovative ideas, research findings, and emerging technologies in computer science before an expert panel.',
        team: '1 – 3 members', eligibility: 'Any UG / PG institution',
        rules: ['IEEE format is mandatory for the paper.', '6 minutes presentation + 2 minutes Q&A.', 'Abstract submission is optional but recommended.', 'Plagiarised content leads to disqualification.'],
        judging: 'Originality, technical depth, clarity of delivery, and handling of Q&A.',
        prize: 'Cash + Certificate'
    },
    auction: {
        tag: 'Technical', title: 'Auction Coding Contest',
        desc: 'Bid virtual credits to "buy" coding problems of varying difficulty, then solve them on the clock.',
        team: '2 members', eligibility: 'CSE / IT / allied branches',
        rules: ['Each team starts with a fixed credit pool.', 'Problems are locked once purchased by a team.', 'Only permitted compilers / judge tools may be used.', 'Partial marks are not awarded for incomplete solutions.'],
        judging: 'Problems solved, time taken, and bidding strategy.',
        prize: 'Cash + Certificate'
    },
    vibe: {
        tag: 'Technical', title: 'AI Vibe Coding',
        desc: 'Build a working micro-product or creative tool using AI coding assistants and prompt engineering.',
        team: '1 – 2 members', eligibility: 'Any UG / PG institution',
        rules: ['Any AI coding assistant or tool is allowed.', 'Theme is revealed on the spot.', '90-minute build window.', 'A short live walkthrough / demo is required at the end.'],
        judging: 'Creativity, functionality, effective use of AI tooling, and presentation.',
        prize: 'Cash + Certificate'
    },
    qr: {
        tag: 'Technical', title: 'QR Decrypt Hunt',
        desc: 'Follow a trail of QR codes hidden across campus, each decrypting into a clue for the next checkpoint.',
        team: '2 – 3 members', eligibility: 'Any UG / PG institution',
        rules: ['Only the provided scanner page may be used — no general internet access.', 'Skipped checkpoints carry a time penalty.', 'Tampering with codes leads to disqualification.', 'Final answer must be sealed at the finish desk.'],
        judging: 'Total time taken and number of checkpoints cleared.',
        prize: 'Cash + Certificate'
    },
    image: {
        tag: 'Non-technical', title: 'Image Finding',
        desc: 'Spot hidden objects, patterns and mismatches across a series of rapid-fire image rounds.',
        team: 'Individual or duo', eligibility: 'Open to all students',
        rules: ['3 rounds with decreasing time limits.', 'No zooming or external tools allowed.', 'Ties are broken by the fastest correct buzz.'],
        judging: 'Accuracy and response time.',
        prize: 'Prizes + Certificate'
    },
    charades: {
        tag: 'Non-technical', title: 'Dumb Charades',
        desc: 'Act it out — no words allowed. A fast, funny test of expression and teamwork.',
        team: '3 – 4 members', eligibility: 'Open to all students',
        rules: ['No sounds or lip-syncing permitted.', '60 seconds per word.', 'Category list is shared 24 hours before the event.', "The judge's call on gestures is final."],
        judging: 'Correct guesses, time remaining, and showmanship.',
        prize: 'Prizes + Certificate'
    },
    gaming: {
        tag: 'Non-technical', title: 'Gaming Arena',
        desc: 'Squad up and battle it out in a custom-room Free Fire knockout tournament.',
        team: '4 members per squad', eligibility: 'Own registered game ID required',
        rules: ['Custom room code is shared 15 minutes before the match.', 'Emulator use is not allowed.', 'Teaming or hacking leads to instant disqualification.', 'Participants must arrange their own device and internet.'],
        judging: 'Placement points plus kill points across matches.',
        prize: 'Prizes + Certificate'
    },
    ads: {
        tag: 'Non-technical', title: 'Ads On Spot',
        desc: 'Turn a surprise product into a punchy 60-second ad — on the spot, with no scripts prepared in advance.',
        team: '1 – 3 members', eligibility: 'Open to all students',
        rules: ['Product / theme is revealed 10 minutes before the performance.', 'Props are limited to what is provided at the venue.', 'No offensive or vulgar content.', 'Time limit is strictly enforced.'],
        judging: 'Creativity, persuasiveness, presentation, and adherence to time.',
        prize: 'Prizes + Certificate'
    }
};

function openModal(id) {
    const d = eventDetails[id];
    document.getElementById('modalTag').innerText = d.tag;
    document.getElementById('modalTitle').innerText = d.title;
    document.getElementById('modalDesc').innerText = d.desc;
    document.getElementById('modalTeam').innerText = d.team;
    document.getElementById('modalEligibility').innerText = d.eligibility;
    document.getElementById('modalJudging').innerText = d.judging;
    document.getElementById('modalPrize').innerText = d.prize;
    const rulesList = document.getElementById('modalRules');
    rulesList.innerHTML = '';
    d.rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerText = rule;
        rulesList.appendChild(li);
    });
    document.getElementById('modalOverlay').style.display = 'flex';
}
function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; }
document.getElementById('modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') closeModal(); });

/* ================= MOBILE NAV ================= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ================= PARTICLE BACKGROUND ================= */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null };

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    const glow = document.getElementById('cursorGlow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.size = 1.4;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}
const particleCount = window.innerWidth < 700 ? 40 : 80;
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function drawBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        ctx.fillStyle = 'rgba(0, 245, 212, 0.55)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 140) {
                const alpha = 1 - dist / 140;
                ctx.strokeStyle = `rgba(123, 44, 191, ${alpha * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        }
    });
    requestAnimationFrame(drawBg);
}
drawBg();

/* ================= SCROLL PROGRESS + BACK TO TOP ================= */
const progressBar = document.getElementById('scrollProgress');
const topBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
    topBtn.style.display = scrollTop > 500 ? 'flex' : 'none';
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ================= COUNTDOWN ================= */
// TODO: update to the confirmed inauguration date/time once finalised.
const EVENT_DATE = new Date('November 29, 2026 09:00:00').getTime();
const REGISTRATION_DEADLINE = new Date('November 29, 2026 08:00:00').getTime();

function updateAllCounters() {
    const now = new Date().getTime();
    const eventDistance = EVENT_DATE - now;

    if (eventDistance > 0) {
        const d = Math.floor(eventDistance / (1000 * 60 * 60 * 24));
        const h = Math.floor((eventDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((eventDistance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((eventDistance % (1000 * 60)) / 1000);
        document.getElementById('timer').innerHTML = `${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
    } else {
        document.getElementById('timer').innerHTML = 'EVENT LIVE';
    }

    const deadlineDistance = REGISTRATION_DEADLINE - now;
    const daysLeftDisplay = document.getElementById('daysLeft');
    if (daysLeftDisplay) {
        if (deadlineDistance > 0) {
            daysLeftDisplay.innerHTML = Math.floor(deadlineDistance / (1000 * 60 * 60 * 24));
        } else {
            daysLeftDisplay.innerHTML = '0';
            const badge = document.querySelector('.status-badge');
            if (badge) { badge.innerHTML = 'Closed'; badge.style.background = '#444'; }
        }
    }
}
setInterval(updateAllCounters, 1000);
updateAllCounters();

/* ================= REGISTRATION LINK ================= */
// TODO: replace with the live Google Form link.
function openReg() { window.open('PASTE_GOOGLE_FORM_LINK_HERE', '_blank'); }

/* ================= PRELOADER ================= */
window.addEventListener('load', () => {
    let count = 0;
    const duration = 1400;
    const intervalTime = duration / 100;
    const percentEl = document.getElementById('prePercent');
    const fill = document.getElementById('preFill');
    const textEl = document.getElementById('preText');
    const stages = ['Compiling', 'Linking modules', 'Loading assets', 'Almost there'];

    const timer = setInterval(() => {
        count++;
        percentEl.innerText = count;
        fill.style.width = count + '%';
        textEl.innerText = stages[Math.min(3, Math.floor(count / 26))];
        if (count >= 100) {
            clearInterval(timer);
            setTimeout(() => document.getElementById('preloader').classList.add('fade-out'), 400);
        }
    }, intervalTime);
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

/* ================= CURSOR RING + SPARKLE TRAIL (fine pointers only) ================= */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canHover) {
    const ring = document.getElementById('cursorRing');
    let lastSpark = 0;
    const sparkColors = ['#00F5D4', '#7B2CBF', '#FF4D8D'];

    window.addEventListener('mousemove', (e) => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';

        const now = performance.now();
        if (now - lastSpark > 45) {
            lastSpark = now;
            const spark = document.createElement('div');
            spark.className = 'sparkle';
            spark.style.left = (e.clientX + (Math.random() * 16 - 8)) + 'px';
            spark.style.top = (e.clientY + (Math.random() * 16 - 8)) + 'px';
            const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
            spark.style.background = color;
            spark.style.color = color;
            const size = 3 + Math.random() * 4;
            spark.style.width = size + 'px';
            spark.style.height = size + 'px';
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 950);
        }
    });

    document.querySelectorAll('a, button, .card, .faq-label, .ribbon-tab, .contact-dock a').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('ring-active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('ring-active'));
    });

    /* ---- 3D tilt on event cards ---- */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -10;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}
