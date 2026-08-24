const links = [
  {
    name: "GitHub",
    className: "github",
    url: "https://github.com/openasteria",
    icon: `
      <svg viewBox="0 0 24 24">
        <path d="M12 .6a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .6Z"/>
      </svg>
    `
  },
  {
    name: "Telegram",
    className: "telegram",
    url: "https://t.me/opxero",
    icon: `
      <svg viewBox="0 0 24 24">
        <path d="M21.5 3.5 18.2 20c-.25 1.17-.9 1.46-1.83.91l-5.03-3.7-2.43 2.34c-.27.27-.5.5-1.03.5l.37-5.12 9.32-8.42c.4-.37-.09-.57-.62-.2L5.43 13.52.47 11.97c-1.08-.34-1.1-1.08.23-1.58L20.07 2.9c.9-.33 1.7.2 1.43.6Z"/>
      </svg>
    `
  },
  {
    name: "Discord",
    className: "discord",
    url: "https://discord.com/users/1401088127921033257",
    icon: `
      <svg viewBox="0 0 24 24">
        <path d="M19.54 4.48A16.7 16.7 0 0 0 15.4 3.2l-.52 1.05a15.6 15.6 0 0 0-5.76 0L8.6 3.2a16.7 16.7 0 0 0-4.14 1.28C1.84 8.4 1.13 12.83 1.48 17.2a16.8 16.8 0 0 0 5.06 2.57l1.22-1.66c-.67-.25-1.31-.56-1.92-.93l.47-.36c3.7 1.7 8.61 1.7 12.27 0l.47.36c-.61.37-1.25.68-1.92.93l1.22 1.66a16.8 16.8 0 0 0 5.06-2.57c.41-5.06-.7-9.45-3.87-12.72ZM8.5 15.2c-1.1 0-2-1-2-2.2s.88-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm7 0c-1.1 0-2-1-2-2.2s.88-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z"/>
      </svg>
    `
  }
];

const linksContainer = document.getElementById("links");
const socialsContainer = document.getElementById("socials");

links.forEach(item => {
  const element = document.createElement("a");

  element.className = `link ${item.className}`;
  element.href = item.url;
  element.target = "_blank";
  element.rel = "noopener noreferrer";

  element.innerHTML = `
    <span class="link-icon">${item.icon}</span>
    <span class="link-title">${item.name}</span>
    <span class="link-arrow">→</span>
  `;

  linksContainer.appendChild(element);
});

links.forEach(item => {
  const element = document.createElement("a");

  element.className = "social";
  element.href = item.url;
  element.target = "_blank";
  element.rel = "noopener noreferrer";
  element.title = item.name;
  element.setAttribute("aria-label", item.name);
  element.innerHTML = item.icon;

  socialsContainer.appendChild(element);
});

const canvas = document.getElementById("ambient");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];

const mouse = {
  x: -1000,
  y: -1000,
  active: false
};

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const amount = Math.min(
    55,
    Math.max(24, Math.floor((width * height) / 24000))
  );

  particles = Array.from({ length: amount }, () => createParticle());
}

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    size: Math.random() * 1.5 + 0.4,
    alpha: Math.random() * 0.32 + 0.08,
    phase: Math.random() * Math.PI * 2
  };
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const particle of particles) {
    particle.phase += 0.008;

    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    let dx = mouse.x - particle.x;
    let dy = mouse.y - particle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (mouse.active && distance < 180) {
      const force = (180 - distance) / 180;
      particle.x -= (dx / distance) * force * 0.22;
      particle.y -= (dy / distance) * force * 0.22;
    }

    const alpha =
      particle.alpha +
      Math.sin(particle.phase) * 0.04;

    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(194, 224, 199, ${Math.max(0.03, alpha)})`;
    ctx.fill();
  }

  if (mouse.active) {
    const glow = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      190
    );

    glow.addColorStop(0, "rgba(182, 220, 188, 0.075)");
    glow.addColorStop(0.45, "rgba(182, 220, 188, 0.025)");
    glow.addColorStop(1, "rgba(182, 220, 188, 0)");

    ctx.fillStyle = glow;
    ctx.fillRect(
      mouse.x - 190,
      mouse.y - 190,
      380,
      380
    );
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);

window.addEventListener("pointermove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.active = true;

  const card = document.getElementById("profileCard");
  const rect = card.getBoundingClientRect();

  if (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom &&
    window.innerWidth > 800
  ) {
    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      perspective(1200px)
      rotateX(${(-y * 1.2).toFixed(2)}deg)
      rotateY(${(x * 1.2).toFixed(2)}deg)
      translateY(-2px)
    `;

    card.style.setProperty(
      "--mouse-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--mouse-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  }
});

document
  .getElementById("profileCard")
  .addEventListener("mouseleave", () => {
    document.getElementById("profileCard").style.transform = "";
  });

window.addEventListener("pointerleave", () => {
  mouse.active = false;
});

resize();
draw();
