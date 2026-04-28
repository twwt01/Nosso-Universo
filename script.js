// Canvas for particles - Professional version
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: 0, y: 0 };
let time = 0;
const MAX_PARTICLES = 300;

class HeartParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = Math.random() * -2;
        this.vr = (Math.random() - 0.5) * 0.1;
        this.size = Math.random() * 8 + 4;
        this.life = 1;
        this.decay = 0.008;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08;
        this.vr *= 0.99;
        this.life -= this.decay;
        this.size *= 0.995;
        this.vx *= 0.98;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate(time * this.vr);
        ctx.font = `${Math.max(2, this.size)}px Arial`;
        ctx.fillText('💖', 0, 0);
        ctx.restore();
    }
}

class ConfettiParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = Math.random() * -8 - 4;
        this.size = Math.random() * 8 + 3;
        this.rotation = Math.random() * Math.PI * 2;
        this.vr = (Math.random() - 0.5) * 0.3;
        this.life = 1;
        this.decay = 0.012;
        this.color = ['#FF6B9D', '#DC143C', '#FFB6C1', '#FF1493', '#FF69B4'][Math.floor(Math.random() * 5)];
    }
    update() {
        this.x += this.vx;
        this.vy += 0.12;
        this.vx *= 0.98;
        this.rotation += this.vr;
        this.life -= this.decay;
        this.size *= 0.99;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size * 0.3);
        ctx.fillStyle = '#fff';
        ctx.fillRect(-this.size/4, -this.size/4, this.size/2, this.size/2 * 0.3);
        ctx.restore();
    }
}

// ─────────────────────────────────────────────
// OVERLAY SYSTEM
// ─────────────────────────────────────────────
function createOverlay(contentHTML, onMounted) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        z-index:9999;display:flex;align-items:center;justify-content:center;
        opacity:0;transition:opacity 0.5s ease;
    `;
    overlay.innerHTML = contentHTML;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    overlay.querySelector('.close-overlay-btn')?.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    });

    if (onMounted) onMounted(overlay);
    return overlay;
}

// ─────────────────────────────────────────────
// 1. MOTIVOS PARA AMAR
// ─────────────────────────────────────────────
const motivos = [
    { text: 'Seu sorriso contagiante que ilumina qualquer ambiente' },
    { text: 'O carinho que você dá que me derrete por completo' },
    { text: 'Sua beleza única, por dentro e por fora' },
    { text: 'Sua inteligência incrível que me encanta todo dia' },
    { text: 'Sua risada perfeita que é o melhor som do mundo' },
    { text: 'O seu olhar é mais brilhante que qualquer estrela no céu' },
    { text: 'Sua força e determinação que me inspiram continuar todos os dias' },
    { text: 'Seu coração gigante cheio de amor e bondade' },
    { text: 'Seus abraços que me conforta' },
    { text: 'Porque você é simplesmente TUDO pra mim!' },
    { text: 'Seu gosto musical' },
    { text: 'Cada pequeno momento ao seu lado é um presente' },
    { text: 'As borboletas que você me causa só de pensar em você' },
    { text: 'As nossas conversas e a forma como você me entende' },
    { text: 'Com você, qualquer lugar se transforma em lar' },
];

function openMotivosScreen() {
    const items = motivos.map((m, i) => `
        <div class="motivo-item" style="animation-delay:${i * 0.07}s">
            <span class="motivo-text">${m.text}</span>
        </div>
    `).join('');

    const html = `
        <div style="
            width:100%;height:100%;
            background:linear-gradient(135deg,#1a0010 0%,#3d0030 40%,#6b0050 100%);
            overflow-y:auto;position:relative;
        ">
            <style>
                .motivos-inner{max-width:700px;margin:0 auto;padding:60px 24px 100px;}
                .motivos-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,6vw,3.2rem);
                    color:#FFB6C1;text-align:center;margin-bottom:12px;
                    text-shadow:0 0 30px rgba(255,105,180,0.7);}
                .motivos-sub{text-align:center;color:#FF69B4;font-size:1rem;
                    margin-bottom:40px;font-family:'Poppins',sans-serif;opacity:0.8;}
                .motivo-item{
                    display:flex;align-items:center;gap:18px;
                    background:rgba(255,255,255,0.06);
                    border:1px solid rgba(255,105,180,0.2);
                    border-radius:16px;padding:18px 22px;margin-bottom:14px;
                    animation:slideIn 0.5s ease both;
                    transition:transform 0.3s,box-shadow 0.3s,background 0.3s;
                    cursor:default;
                }
                .motivo-item:hover{
                    transform:translateX(8px);
                    background:rgba(255,105,180,0.12);
                    box-shadow:0 8px 25px rgba(220,20,60,0.25);
                }
                .motivo-emoji{font-size:2rem;min-width:44px;text-align:center;}
                .motivo-text{font-family:'Poppins',sans-serif;color:#FFE4E1;font-size:1rem;line-height:1.5;}
                @keyframes slideIn{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
                .close-overlay-btn{
                    position:fixed;top:20px;right:24px;
                    background:rgba(255,105,180,0.2);
                    border:1px solid rgba(255,105,180,0.4);
                    color:#FFB6C1;font-size:1.5rem;
                    width:48px;height:48px;border-radius:50%;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.3s;z-index:10;
                }
                .close-overlay-btn:hover{background:rgba(220,20,60,0.4);transform:scale(1.1);}
                .heart-deco{text-align:center;font-size:3rem;margin-bottom:8px;animation:pulse 1.5s infinite;}
                @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}
            </style>
            <button class="close-overlay-btn">✕</button>
            <div class="motivos-inner">
                <div class="heart-deco">💖</div>
                <h2 class="motivos-title">Motivos Para Te Amar</h2>
                <p class="motivos-sub">E ainda assim a lista nunca vai acabar...</p>
                ${items}
            </div>
        </div>
    `;
    createOverlay(html);
}

// ─────────────────────────────────────────────
// 2. NOITES PERFEITAS — CÉU ESTRELADO
// ─────────────────────────────────────────────
function openStarryNightScreen() {
    const html = `
        <div style="width:100%;height:100%;background:#000;position:relative;overflow:hidden;">
            <canvas id="star-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;"></canvas>
            <style>
                .night-content{
                    position:relative;z-index:2;
                    display:flex;flex-direction:column;
                    align-items:center;justify-content:center;
                    height:100%;text-align:center;padding:24px;
                    pointer-events:none;
                }
                .night-title{
                    font-family:'Playfair Display',serif;
                    font-size:clamp(2rem,6vw,3.5rem);
                    color:#fff;
                    text-shadow:0 0 40px rgba(180,160,255,0.8);
                    margin-bottom:16px;animation:fadeUp 1s ease both;
                }
                .night-poem{
                    font-family:'Poppins',sans-serif;
                    color:rgba(220,210,255,0.9);font-size:1.1rem;
                    line-height:2;max-width:520px;
                    animation:fadeUp 1s 0.3s ease both;opacity:0;
                }
                .night-moon{font-size:5rem;margin-bottom:24px;
                    animation:moonFloat 4s ease-in-out infinite;}
                @keyframes moonFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);}}
                @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
                .shooting-star{
                    position:absolute;height:2px;
                    background:linear-gradient(90deg,rgba(255,255,255,0),#fff);
                    border-radius:2px;animation:shoot linear forwards;
                }
                @keyframes shoot{0%{opacity:1;}100%{opacity:0;transform:translateX(300px) translateY(100px);}}
                .close-overlay-btn{
                    position:fixed;top:20px;right:24px;
                    background:rgba(255,255,255,0.1);
                    border:1px solid rgba(255,255,255,0.3);
                    color:#fff;font-size:1.5rem;
                    width:48px;height:48px;border-radius:50%;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.3s;z-index:10;pointer-events:all;
                }
                .close-overlay-btn:hover{background:rgba(255,255,255,0.2);transform:scale(1.1);}
            </style>
            <button class="close-overlay-btn">✕</button>
            <div class="night-content">
                <div class="night-moon">🌙</div>
                <h2 class="night-title">Nossas Noites Perfeitas</h2>
                <p class="night-poem">
                    Cada estrela no céu é um momento<br>
                    que já passamos juntas<br><br>
                    Suas risadas no dia a dia,<br>
                    seus olhos cheios de amor,<br>
                    o silêncio gostoso que só existe entre nós.<br><br>
                    ✨ Cada noite ao seu lado<br>
                    é a melhor da minha vida ✨
                </p>
            </div>
        </div>
    `;

    createOverlay(html, (overlay) => {
        const starCanvas = overlay.querySelector('#star-canvas');
        const sc = starCanvas.getContext('2d');
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;

        // Generate stars
        const stars = Array.from({ length: 250 }, () => ({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            r: Math.random() * 1.8 + 0.2,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.03 + 0.005,
            twinkleDir: Math.random() > 0.5 ? 1 : -1,
        }));

        // Shooting stars
        function spawnShootingStar() {
            const el = document.createElement('div');
            el.className = 'shooting-star';
            const w = 80 + Math.random() * 120;
            el.style.cssText = `
                width:${w}px;
                top:${Math.random() * 60}%;
                left:${Math.random() * 60}%;
                transform:rotate(${25 + Math.random()*20}deg);
                animation-duration:${0.6 + Math.random()*0.6}s;
            `;
            overlay.appendChild(el);
            setTimeout(() => el.remove(), 1200);
        }
        const shootInterval = setInterval(spawnShootingStar, 2000);
        overlay.addEventListener('remove', () => clearInterval(shootInterval));

        // Observe removal to clean up
        const mo = new MutationObserver(() => {
            if (!document.body.contains(overlay)) {
                clearInterval(shootInterval);
                cancelAnimationFrame(starRaf);
                mo.disconnect();
            }
        });
        mo.observe(document.body, { childList: true });

        // Draw stars
        let starRaf;
        function drawStars() {
            sc.clearRect(0, 0, starCanvas.width, starCanvas.height);
            // Gradient sky
            const grad = sc.createLinearGradient(0, 0, 0, starCanvas.height);
            grad.addColorStop(0, '#000010');
            grad.addColorStop(0.5, '#0a001a');
            grad.addColorStop(1, '#050020');
            sc.fillStyle = grad;
            sc.fillRect(0, 0, starCanvas.width, starCanvas.height);

            stars.forEach(s => {
                s.alpha += s.twinkleSpeed * s.twinkleDir;
                if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
                sc.beginPath();
                sc.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                sc.fillStyle = `rgba(255,255,245,${s.alpha})`;
                sc.fill();
                // Glow for bigger stars
                if (s.r > 1.2) {
                    sc.beginPath();
                    sc.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
                    sc.fillStyle = `rgba(200,180,255,${s.alpha * 0.15})`;
                    sc.fill();
                }
            });
            starRaf = requestAnimationFrame(drawStars);
        }
        drawStars();
        setTimeout(spawnShootingStar, 500);
    });
}

// ─────────────────────────────────────────────
// 3. BATIMENTOS DO CORAÇÃO PULSANDO
// ─────────────────────────────────────────────
function openHeartbeatScreen() {
    const html = `
        <div style="
            width:100%;height:100%;
            background:radial-gradient(ellipse at center,#2d0010 0%,#0d0005 70%,#000 100%);
            position:relative;overflow:hidden;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
        ">
            <canvas id="ecg-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;"></canvas>
            <style>
                .heart-big{
                    position:relative;z-index:2;
                    font-size:clamp(8rem,20vw,14rem);
                    line-height:1;
                    filter:drop-shadow(0 0 40px #DC143C);
                    animation:heartbeat 0.8s ease-in-out infinite;
                    cursor:default;user-select:none;
                }
                @keyframes heartbeat{
                    0%{transform:scale(1);}
                    14%{transform:scale(1.3);}
                    28%{transform:scale(1);}
                    42%{transform:scale(1.15);}
                    70%{transform:scale(1);}
                    100%{transform:scale(1);}
                }
                .heart-bpm{
                    position:relative;z-index:2;
                    font-family:'Poppins',sans-serif;
                    color:#FF69B4;font-size:1.1rem;
                    letter-spacing:3px;text-transform:uppercase;
                    margin-top:20px;animation:fadeUp 1s ease both;
                }
                .heart-msg{
                    position:relative;z-index:2;
                    font-family:'Playfair Display',serif;
                    font-size:clamp(1.2rem,4vw,1.8rem);
                    color:#FFE4E1;text-align:center;
                    max-width:480px;margin-top:20px;
                    text-shadow:0 0 20px rgba(255,105,180,0.5);
                    animation:fadeUp 1s 0.4s ease both;opacity:0;
                    padding:0 20px;
                }
                .bpm-counter{
                    position:relative;z-index:2;
                    font-family:'Poppins',sans-serif;
                    font-size:clamp(3rem,8vw,5rem);
                    color:#DC143C;font-weight:700;
                    text-shadow:0 0 30px rgba(220,20,60,0.8);
                    margin-top:8px;
                    animation:fadeUp 1s 0.2s ease both;opacity:0;
                }
                @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
                .close-overlay-btn{
                    position:fixed;top:20px;right:24px;
                    background:rgba(220,20,60,0.15);
                    border:1px solid rgba(220,20,60,0.4);
                    color:#FF69B4;font-size:1.5rem;
                    width:48px;height:48px;border-radius:50%;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.3s;z-index:10;
                }
                .close-overlay-btn:hover{background:rgba(220,20,60,0.3);transform:scale(1.1);}
                .pulse-ring{
                    position:absolute;z-index:1;
                    border-radius:50%;border:2px solid rgba(220,20,60,0.4);
                    animation:ripple 1.6s ease-out infinite;
                }
                @keyframes ripple{
                    0%{width:80px;height:80px;opacity:0.8;margin:-40px;}
                    100%{width:400px;height:400px;opacity:0;margin:-200px;}
                }
            </style>
            <button class="close-overlay-btn">✕</button>
            <div class="pulse-ring" style="top:50%;left:50%;animation-delay:0s;"></div>
            <div class="pulse-ring" style="top:50%;left:50%;animation-delay:0.5s;"></div>
            <div class="pulse-ring" style="top:50%;left:50%;animation-delay:1s;"></div>
            <div class="heart-big">❤️</div>
            <div class="bpm-counter" id="bpm-display">72 BPM</div>
            <div class="heart-bpm">Batimentos por você</div>
            <p class="heart-msg">Meu coração acelera só de pensar em você, meu bebê grande💖</p>
        </div>
    `;

    createOverlay(html, (overlay) => {
        const ecgCanvas = overlay.querySelector('#ecg-canvas');
        const ec = ecgCanvas.getContext('2d');
        ecgCanvas.width = window.innerWidth;
        ecgCanvas.height = window.innerHeight;

        // BPM oscillation
        const bpmDisplay = overlay.querySelector('#bpm-display');
        let currentBPM = 72;
        let targetBPM = 72;
        const bpmInterval = setInterval(() => {
            targetBPM = 68 + Math.floor(Math.random() * 30);
        }, 3000);

        // ECG line
        let ecgPoints = [];
        let ecgX = 0;
        let ecgPhase = 0;
        const ecgSpeed = 3;

        function getECGValue(phase) {
            const p = phase % (Math.PI * 2);
            // Simulate P wave, QRS complex, T wave
            if (p < 0.3) return Math.sin(p / 0.3 * Math.PI) * 8;
            if (p < 0.5) return -Math.sin((p - 0.3) / 0.2 * Math.PI) * 5;
            if (p < 0.55) return -40;
            if (p < 0.65) return 80;
            if (p < 0.72) return -20;
            if (p < 0.78) return 0;
            if (p < 1.2) return Math.sin((p - 0.78) / 0.42 * Math.PI) * 15;
            return 0;
        }

        const trailLength = Math.min(window.innerWidth * 0.7, 700);
        const midY = window.innerHeight / 2;

        let ecgRaf;
        function drawECG() {
            ec.fillStyle = 'rgba(0,0,0,0.12)';
            ec.fillRect(0, 0, ecgCanvas.width, ecgCanvas.height);

            // Speed tied to BPM
            const speed = (currentBPM / 72) * ecgSpeed;
            currentBPM += (targetBPM - currentBPM) * 0.02;
            ecgPhase += speed * 0.025;

            const val = getECGValue(ecgPhase);
            ecgPoints.push({ x: ecgX, y: midY - val });
            ecgX += speed;

            if (ecgPoints.length > trailLength / speed * 2) ecgPoints.shift();
            if (ecgX > ecgCanvas.width + 100) {
                ecgX = 0;
                ecgPoints = [];
            }

            // Draw ECG trail
            if (ecgPoints.length > 2) {
                for (let i = 1; i < ecgPoints.length; i++) {
                    const alpha = i / ecgPoints.length;
                    const grd = ec.createLinearGradient(ecgPoints[i-1].x, 0, ecgPoints[i].x, 0);
                    grd.addColorStop(0, `rgba(220,20,60,${alpha * 0.8})`);
                    grd.addColorStop(1, `rgba(255,105,180,${alpha})`);
                    ec.beginPath();
                    ec.moveTo(ecgPoints[i-1].x, ecgPoints[i-1].y);
                    ec.lineTo(ecgPoints[i].x, ecgPoints[i].y);
                    ec.strokeStyle = grd;
                    ec.lineWidth = alpha * 2.5 + 0.5;
                    ec.stroke();
                }
                // Glow on the latest point
                const last = ecgPoints[ecgPoints.length - 1];
                ec.beginPath();
                ec.arc(last.x, last.y, 4, 0, Math.PI * 2);
                ec.fillStyle = '#fff';
                ec.fill();
                ec.beginPath();
                ec.arc(last.x, last.y, 8, 0, Math.PI * 2);
                ec.fillStyle = 'rgba(255,105,180,0.5)';
                ec.fill();
            }

            // Update BPM display
            if (bpmDisplay) bpmDisplay.textContent = `${Math.round(currentBPM)} BPM`;

            ecgRaf = requestAnimationFrame(drawECG);
        }
        drawECG();

        // Cleanup
        const mo = new MutationObserver(() => {
            if (!document.body.contains(overlay)) {
                clearInterval(bpmInterval);
                cancelAnimationFrame(ecgRaf);
                mo.disconnect();
            }
        });
        mo.observe(document.body, { childList: true });
    });
}

// ─────────────────────────────────────────────
// STAT CARD CLICK HANDLERS
// ─────────────────────────────────────────────
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const label = card.querySelector('div')?.textContent?.trim() || '';
        if (label.includes('Motivos')) {
            openMotivosScreen();
        } else if (label.includes('Noites')) {
            openStarryNightScreen();
        } else if (label.includes('Batimentos')) {
            openHeartbeatScreen();
        }
    });
});

// Mouse parallax
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (Math.random() < 0.3) {
        particles.push(new HeartParticle(mouse.x + (Math.random()-0.5)*100, mouse.y));
    }
});

// Story cards (non-stat) - apenas cursor pointer, sem ação de clique
document.querySelectorAll('.story-card:not(.full):not(#playlist-card):not(#playlist-link-card)').forEach(card => {
    card.style.cursor = 'default';
});

// Playlist
const playlistCard = document.getElementById('playlist-card');
const playlistItems = document.querySelectorAll('.playlist-item');
const playBtns = document.querySelectorAll('.play-btn');
const youtubeIds = ['oG4OGcjUrck','8KY7Mg9UU-k','ESTsuMawqvk','ERhBb8pIvkw'];

if (playlistCard) {
    playlistCard.addEventListener('click', (e) => {
        if (!e.target.matches('.play-btn')) playlistCard.classList.toggle('expanded');
    });
}
playBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    });
});

// Motivos full card toggle
const motivosCard = document.querySelector('.story-card.full');
if (motivosCard) {
    motivosCard.addEventListener('click', () => {
        const ul = motivosCard.querySelector('ul');
        ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
    });
}

// ─────────────────────────────────────────────
// FOGOS DE AMOR — TELA COM FOGOS QUE FORMAM CORAÇÃO
// ─────────────────────────────────────────────
function openFireworksScreen() {
    const html = `
        <div style="width:100%;height:100%;background:#000;position:relative;overflow:hidden;">
            <canvas id="fw-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;"></canvas>
            <style>
                .fw-title {
                    position:absolute;z-index:2;
                    top:50%;left:50%;transform:translate(-50%,-50%);
                    font-family:'Playfair Display',serif;
                    font-size:clamp(2rem,6vw,4rem);
                    color:#fff;text-align:center;
                    text-shadow:0 0 40px rgba(255,100,150,0.9);
                    pointer-events:none;white-space:nowrap;
                    animation:fw-fade 1s 0.5s ease both;opacity:0;
                }
                .fw-sub {
                    position:absolute;z-index:2;
                    top:calc(50% + clamp(50px,8vw,80px));
                    left:50%;transform:translateX(-50%);
                    font-family:'Poppins',sans-serif;
                    font-size:clamp(0.9rem,2.5vw,1.2rem);
                    color:rgba(255,200,220,0.85);text-align:center;
                    pointer-events:none;letter-spacing:2px;
                    animation:fw-fade 1s 1s ease both;opacity:0;
                }
                @keyframes fw-fade{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
                .fw-title-only{animation:fw-fade 1s 0.5s ease both;opacity:0;}
                .close-overlay-btn{
                    position:fixed;top:20px;right:24px;
                    background:rgba(255,100,150,0.15);
                    border:1px solid rgba(255,100,150,0.4);
                    color:#FFB6C1;font-size:1.5rem;
                    width:48px;height:48px;border-radius:50%;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.3s;z-index:10;
                }
                .close-overlay-btn:hover{background:rgba(220,20,60,0.3);transform:scale(1.1);}
            </style>
            <button class="close-overlay-btn">✕</button>
            <div class="fw-title">Fogos de Amor 💕</div>
            <div class="fw-sub">Para a pessoa mais especial do meu mundo ❤️</div>
        </div>
    `;

    createOverlay(html, (overlay) => {
        const fwCanvas = overlay.querySelector('#fw-canvas');
        const fc = fwCanvas.getContext('2d');
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;

        const W = fwCanvas.width;
        const H = fwCanvas.height;

        // Heart shape points generator
        function getHeartPoints(cx, cy, scale, count) {
            const pts = [];
            for (let i = 0; i < count; i++) {
                const t = (i / count) * Math.PI * 2;
                const x = cx + scale * 16 * Math.pow(Math.sin(t), 3);
                const y = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                pts.push({ x, y });
            }
            return pts;
        }

        // Firework particle
        class FWParticle {
            constructor(x, y, tx, ty, color, delay) {
                this.sx = x; this.sy = y;
                this.tx = tx; this.ty = ty;
                this.x = x; this.y = y;
                this.color = color;
                this.delay = delay;
                this.progress = 0;
                this.life = 1;
                this.phase = 'rocket'; // rocket -> explode -> heart -> fade
                this.size = Math.random() * 2 + 1.5;
                this.trail = [];
                this.explodeX = x;
                this.explodeY = y + (Math.random() * -H * 0.25 - H * 0.1);
                this.sparkVx = (Math.random() - 0.5) * 6;
                this.sparkVy = (Math.random() - 0.5) * 6;
                this.heartProgress = 0;
                this.active = false;
            }

            update(dt) {
                if (!this.active) return;
                if (this.phase === 'rocket') {
                    this.progress = Math.min(1, this.progress + dt * 1.5);
                    const ease = 1 - Math.pow(1 - this.progress, 3);
                    this.x = this.sx + (this.explodeX - this.sx) * ease;
                    this.y = this.sy + (this.explodeY - this.sy) * ease;
                    this.trail.push({ x: this.x, y: this.y, life: 1 });
                    if (this.trail.length > 12) this.trail.shift();
                    this.trail.forEach(t => t.life -= 0.1);
                    if (this.progress >= 1) {
                        this.phase = 'explode';
                        this.progress = 0;
                        this.explodeX = this.x;
                        this.explodeY = this.y;
                    }
                } else if (this.phase === 'explode') {
                    this.progress = Math.min(1, this.progress + dt * 2.5);
                    this.x = this.explodeX + this.sparkVx * this.progress * 30;
                    this.y = this.explodeY + this.sparkVy * this.progress * 30 + 50 * this.progress * this.progress;
                    this.life = 1 - this.progress;
                    if (this.progress >= 1) {
                        this.phase = 'heart';
                        this.progress = 0;
                        this.x = this.explodeX;
                        this.y = this.explodeY;
                        this.life = 0;
                    }
                } else if (this.phase === 'heart') {
                    this.heartProgress = Math.min(1, this.heartProgress + dt * 0.8);
                    const ease = 1 - Math.pow(1 - this.heartProgress, 4);
                    this.x = this.explodeX + (this.tx - this.explodeX) * ease;
                    this.y = this.explodeY + (this.ty - this.explodeY) * ease;
                    this.life = this.heartProgress;
                    if (this.heartProgress >= 0.4) this.phase = 'hold';
                } else if (this.phase === 'hold') {
                    this.x = this.tx;
                    this.y = this.ty;
                    this.life = 1;
                    // small jitter
                    this.x += Math.sin(Date.now() * 0.005 + this.tx) * 0.8;
                    this.y += Math.cos(Date.now() * 0.005 + this.ty) * 0.8;
                } else if (this.phase === 'fade') {
                    this.life = Math.max(0, this.life - dt * 0.8);
                }
            }

            draw() {
                if (!this.active) return;
                if (this.phase === 'rocket') {
                    this.trail.forEach((t, i) => {
                        fc.beginPath();
                        fc.arc(t.x, t.y, this.size * (i / this.trail.length), 0, Math.PI * 2);
                        fc.fillStyle = `rgba(255,255,200,${t.life * 0.6})`;
                        fc.fill();
                    });
                    fc.beginPath();
                    fc.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
                    fc.fillStyle = '#fff';
                    fc.fill();
                } else if (this.phase === 'explode') {
                    if (this.life > 0) {
                        fc.beginPath();
                        fc.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                        fc.fillStyle = `${this.color.replace(')', `,${this.life})`).replace('rgb','rgba')}`;
                        fc.fill();
                    }
                } else if (this.phase === 'heart' || this.phase === 'hold') {
                    if (this.life > 0) {
                        fc.save();
                        fc.globalAlpha = Math.min(1, this.life);
                        fc.beginPath();
                        fc.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        fc.fillStyle = this.color;
                        fc.fill();
                        // glow
                        fc.beginPath();
                        fc.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                        const g = fc.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size*3);
                        g.addColorStop(0, `${this.color.replace(')', `,0.3)`).replace('rgb','rgba')}`);
                        g.addColorStop(1, 'transparent');
                        fc.fillStyle = g;
                        fc.fill();
                        fc.restore();
                    }
                } else if (this.phase === 'fade') {
                    if (this.life > 0) {
                        fc.save();
                        fc.globalAlpha = this.life;
                        fc.beginPath();
                        fc.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        fc.fillStyle = this.color;
                        fc.fill();
                        fc.restore();
                    }
                }
            }
        }

        // Random firework spark (background)
        class Spark {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W;
                this.y = H;
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = -(Math.random() * 8 + 5);
                this.life = 1;
                this.color = [`rgb(255,${Math.floor(Math.random()*100+100)},${Math.floor(Math.random()*80)})`,
                    `rgb(255,200,${Math.floor(Math.random()*100)})`,
                    `rgb(${Math.floor(Math.random()*100+155)},50,255)`][Math.floor(Math.random()*3)];
                this.children = [];
                this.exploded = false;
                this.explodeY = H * (0.15 + Math.random() * 0.45);
            }
            update() {
                if (!this.exploded) {
                    this.x += this.vx; this.y += this.vy; this.vy += 0.15;
                    if (this.y <= this.explodeY) {
                        this.exploded = true;
                        for (let i = 0; i < 60; i++) {
                            const angle = (i / 60) * Math.PI * 2;
                            const speed = Math.random() * 4 + 2;
                            this.children.push({
                                x: this.x, y: this.y,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                life: 1, color: this.color
                            });
                        }
                    }
                }
                this.children.forEach(c => {
                    c.x += c.vx; c.y += c.vy;
                    c.vy += 0.08; c.vx *= 0.97;
                    c.life -= 0.018;
                });
                this.children = this.children.filter(c => c.life > 0);
                if (this.exploded && this.children.length === 0) this.reset();
            }
            draw() {
                if (!this.exploded) {
                    fc.beginPath(); fc.arc(this.x, this.y, 2, 0, Math.PI*2);
                    fc.fillStyle = '#fff'; fc.fill();
                }
                this.children.forEach(c => {
                    fc.save(); fc.globalAlpha = c.life * 0.7;
                    fc.beginPath(); fc.arc(c.x, c.y, 1.5, 0, Math.PI*2);
                    fc.fillStyle = c.color; fc.fill(); fc.restore();
                });
            }
        }

        // Build heart firework
        const heartCX = W / 2;
        const heartCY = H / 2 - 20;
        const heartScale = Math.min(W, H) / 100 * 3.5;
        const heartPts = getHeartPoints(heartCX, heartCY, heartScale, 180);

        const COLORS = [
            'rgb(255,50,100)', 'rgb(255,100,150)', 'rgb(255,180,200)',
            'rgb(220,20,60)',  'rgb(255,20,147)',  'rgb(255,105,180)',
            'rgb(255,215,0)',  'rgb(255,255,255)',
        ];

        const fwParticles = heartPts.map((pt, i) => {
            const launchX = Math.random() * W * 0.8 + W * 0.1;
            const color = COLORS[i % COLORS.length];
            const delay = (i / heartPts.length) * 3.5 + Math.random() * 0.5;
            return new FWParticle(launchX, H + 20, pt.x, pt.y, color, delay);
        });

        // Background sparks
        const bgSparks = Array.from({ length: 6 }, () => {
            const s = new Spark();
            s.y = Math.random() * H; // stagger initial positions
            s.exploded = false;
            return s;
        });

        let elapsed = 0;
        let lastTime = performance.now();
        let allHolding = false;
        let fadeTimer = 0;
        let fwRaf;

        function drawFireworks(now) {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;
            elapsed += dt;

            fc.fillStyle = 'rgba(0,0,0,0.18)';
            fc.fillRect(0, 0, W, H);

            // Activate particles based on delay
            fwParticles.forEach(p => {
                if (!p.active && elapsed >= p.delay) p.active = true;
            });

            // Background sparks
            bgSparks.forEach(s => { s.update(); s.draw(); });

            // Heart particles
            fwParticles.forEach(p => { p.update(dt); p.draw(); });

            // Check if all in hold phase → start fade after 3s
            const holding = fwParticles.filter(p => p.phase === 'hold').length;
            if (holding === fwParticles.length && !allHolding) {
                allHolding = true;
                setTimeout(() => {
                    fwParticles.forEach(p => p.phase = 'fade');
                    // Relaunch after fade
                    setTimeout(() => {
                        elapsed = 0; allHolding = false;
                        fwParticles.forEach((p, i) => {
                            p.x = Math.random() * W * 0.8 + W * 0.1;
                            p.y = H + 20;
                            p.sx = p.x; p.sy = p.y;
                            p.explodeX = p.x; p.explodeY = p.y;
                            p.progress = 0; p.heartProgress = 0;
                            p.life = 1; p.phase = 'rocket';
                            p.active = false;
                            p.delay = (i / fwParticles.length) * 3.5 + Math.random() * 0.5;
                            p.trail = [];
                        });
                    }, 2000);
                }, 3000);
            }

            fwRaf = requestAnimationFrame(drawFireworks);
        }
        fwRaf = requestAnimationFrame(drawFireworks);

        // Cleanup
        const mo = new MutationObserver(() => {
            if (!document.body.contains(overlay)) {
                cancelAnimationFrame(fwRaf);
                mo.disconnect();
            }
        });
        mo.observe(document.body, { childList: true });
    });
}

// Confetti button → agora abre tela de fogos
document.getElementById('confetti-btn')?.addEventListener('click', () => {
    openFireworksScreen();
});

// ─────────────────────────────────────────────
// BOTÃO MÚSICA — PLAYER REAL (AUDIO)
// ─────────────────────────────────────────────

// 🎵 PLAYER PRINCIPAL (SÓ MUSICA 1)
let audio = new Audio();
let isPlaying = false;
let player = null;
let visualizerInterval = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function openPlayer() {
    if (player) return;

    audio.src = "./assets/musica1.mp3";
    audio.play().catch(() => {});
    isPlaying = true;

    const div = document.createElement("div");
    div.innerHTML = `
        <div id="mini-player" style="
            position:fixed;
            bottom:24px;
            right:24px;
            width:320px;
            background:rgba(45, 0, 53, 0.85);
            backdrop-filter:blur(20px);
            -webkit-backdrop-filter:blur(20px);
            border:1px solid rgba(255, 105, 180, 0.35);
            border-radius:24px;
            padding:24px;
            color:#FFE4E1;
            box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(220,20,60,0.2);
            font-family:'Poppins', sans-serif;
            z-index:9999;
            animation:slideUp 0.5s cubic-bezier(0.4,0,0.2,1) both;
            overflow:hidden;
        ">
            <style>
                @keyframes slideUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
                @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
                @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(255,105,180,0.6);}70%{box-shadow:0 0 0 12px rgba(255,105,180,0);}100%{box-shadow:0 0 0 0 rgba(255,105,180,0);}}
            </style>
            <!-- Shimmer top line -->
            <div style="
                position:absolute;
                top:0;left:0;right:0;height:4px;
                background:linear-gradient(90deg,#DC143C,#FF69B4,#FFB6C1,#FF69B4,#DC143C);
                background-size:200% 100%;
                animation:shimmer 3s linear infinite;
            "></div>
            <style>@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}</style>

            <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
                <div id="mp-disc" style="
                    width:56px;height:56px;border-radius:50%;
                    background:linear-gradient(135deg,#DC143C,#FF69B4);
                    display:flex;align-items:center;justify-content:center;
                    font-size:1.8rem;flex-shrink:0;
                    box-shadow:0 8px 25px rgba(220,20,60,0.5);
                    animation:spin 8s linear infinite;
                    position:relative;
                ">
                    <div style="position:absolute;width:16px;height:16px;border-radius:50%;background:rgba(45,0,53,0.9);"></div>
                    <span style="position:relative;z-index:1;">🎵</span>
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-family:'Playfair Display',serif;font-size:1.15rem;color:#FFB6C1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Dilemas da Vida Moderna</div>
                    <div style="font-size:0.85rem;color:#FF69B4;opacity:0.85;margin-top:2px;">Carol Biazin 💖</div>
                </div>
                <div id="mp-visualizer" style="display:flex;align-items:flex-end;gap:3px;height:24px;">
                    <div class="mp-bar" style="width:3px;background:linear-gradient(to top,#DC143C,#FF69B4);border-radius:3px;height:4px;transition:height 0.15s ease;"></div>
                    <div class="mp-bar" style="width:3px;background:linear-gradient(to top,#DC143C,#FF69B4);border-radius:3px;height:12px;transition:height 0.15s ease;"></div>
                    <div class="mp-bar" style="width:3px;background:linear-gradient(to top,#DC143C,#FF69B4);border-radius:3px;height:8px;transition:height 0.15s ease;"></div>
                    <div class="mp-bar" style="width:3px;background:linear-gradient(to top,#DC143C,#FF69B4);border-radius:3px;height:16px;transition:height 0.15s ease;"></div>
                    <div class="mp-bar" style="width:3px;background:linear-gradient(to top,#DC143C,#FF69B4);border-radius:3px;height:6px;transition:height 0.15s ease;"></div>
                </div>
            </div>

            <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
                <button id="mp-play" style="
                    width:52px;height:52px;border-radius:50%;border:none;
                    background:linear-gradient(45deg,#FF69B4,#DC143C);
                    color:white;font-size:1.3rem;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    box-shadow:0 8px 25px rgba(220,20,60,0.4);
                    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
                    flex-shrink:0;
                " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1.15)'">⏸</button>
                <button id="mp-close" style="
                    width:40px;height:40px;border-radius:50%;
                    background:rgba(255,105,180,0.15);
                    border:2px solid rgba(255,105,180,0.35);
                    color:#FFB6C1;font-size:1.2rem;cursor:pointer;
                    display:flex;align-items:center;justify-content:center;
                    transition:all 0.35s cubic-bezier(0.4,0,0.2,1);
                    backdrop-filter:blur(6px);
                    flex-shrink:0;
                " onmouseover="this.style.transform='scale(1.15) rotate(90deg)';this.style.background='rgba(220,20,60,0.4)';this.style.borderColor='rgba(255,105,180,0.8)';this.style.color='#fff';this.style.boxShadow='0 0 25px rgba(220,20,60,0.4)';"
                onmouseout="this.style.transform='scale(1) rotate(0deg)';this.style.background='rgba(255,105,180,0.15)';this.style.borderColor='rgba(255,105,180,0.35)';this.style.color='#FFB6C1';this.style.boxShadow='none';">✕</button>
                <div style="flex:1;text-align:right;font-size:0.8rem;color:rgba(255,179,193,0.7);letter-spacing:0.5px;">
                    <span id="mp-curr">0:00</span> / <span id="mp-dur">0:00</span>
                </div>
            </div>

            <div id="mp-progress-wrap" style="
                width:100%;height:6px;
                background:rgba(255,255,255,0.1);
                border-radius:10px;overflow:hidden;
                cursor:pointer;position:relative;
            ">
                <div id="mp-progress" style="
                    height:100%;width:0%;
                    background:linear-gradient(90deg,#DC143C,#FF69B4);
                    border-radius:10px;
                    transition:width 0.1s linear;
                    position:relative;
                ">
                    <div style="
                        position:absolute;right:-5px;top:50%;
                        transform:translateY(-50%);
                        width:10px;height:10px;border-radius:50%;
                        background:#FFB6C1;
                        box-shadow:0 0 8px rgba(255,105,180,0.9);
                        opacity:0;transition:opacity 0.3s;
                    " id="mp-progress-knob"></div>
                </div>
            </div>
        </div>
    `;

    player = div.firstElementChild;
    document.body.appendChild(player);

    const disc = document.getElementById("mp-disc");
    const playBtn = document.getElementById("mp-play");
    const closeBtn = document.getElementById("mp-close");
    const progressBar = document.getElementById("mp-progress");
    const progressWrap = document.getElementById("mp-progress-wrap");
    const currEl = document.getElementById("mp-curr");
    const durEl = document.getElementById("mp-dur");
    const knob = document.getElementById("mp-progress-knob");
    const bars = document.querySelectorAll(".mp-bar");

    function startVisualizer() {
        visualizerInterval = setInterval(() => {
            bars.forEach(bar => {
                bar.style.height = (Math.random() * 20 + 4) + "px";
            });
        }, 120);
    }
    function stopVisualizer() {
        clearInterval(visualizerInterval);
        bars.forEach(bar => { bar.style.height = "4px"; });
    }

    function updateProgress() {
        if (audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = pct + "%";
            currEl.textContent = formatTime(audio.currentTime);
            durEl.textContent = formatTime(audio.duration);
        }
    }

    progressWrap.addEventListener("mouseenter", () => { knob.style.opacity = "1"; });
    progressWrap.addEventListener("mouseleave", () => { knob.style.opacity = "0"; });
    progressWrap.addEventListener("click", (e) => {
        const rect = progressWrap.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = pct * audio.duration;
    });

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => { durEl.textContent = formatTime(audio.duration); });
    audio.addEventListener("ended", () => {
        isPlaying = false;
        playBtn.innerText = "▶";
        disc.style.animationPlayState = "paused";
        stopVisualizer();
    });

    startVisualizer();

    playBtn.onclick = () => {
        if (isPlaying) {
            audio.pause();
            playBtn.innerText = "▶";
            disc.style.animationPlayState = "paused";
            stopVisualizer();
        } else {
            audio.play();
            playBtn.innerText = "⏸";
            disc.style.animationPlayState = "running";
            startVisualizer();
        }
        isPlaying = !isPlaying;
    };

    closeBtn.onclick = () => {
        audio.pause();
        audio.currentTime = 0;
        stopVisualizer();
        player.style.opacity = "0";
        player.style.transform = "translateY(40px)";
        player.style.transition = "all 0.4s cubic-bezier(0.4,0,0.2,1)";
        setTimeout(() => {
            player.remove();
            player = null;
        }, 400);
    };
}

// BOTÃO PRINCIPAL
document.getElementById("music-toggle").onclick = () => {
    if (player) {
        audio.pause();
        audio.currentTime = 0;
        if (visualizerInterval) clearInterval(visualizerInterval);
        player.remove();
        player = null;
    } else {
        openPlayer();
    }
};



// Playlist navigation is now handled by direct link in index.html

// Typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) { element.innerHTML += text.charAt(i); i++; setTimeout(type, speed); }
    }
    type();
}

window.addEventListener('load', () => {
    const typingEl = document.querySelector('.typing-effect');
    if (typingEl) { const t = typingEl.textContent; typingEl.textContent = ''; typeWriter(typingEl, t, 120); }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
});

function animate() {
    time += 0.02;
    while (particles.length > MAX_PARTICLES) particles.shift();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.08) particles.push(new HeartParticle(Math.random() * canvas.width, canvas.height));
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});