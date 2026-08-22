const CONFIG = {
  name: "opend",

  links: [
    {
      title: "GitHub",
      url: "https://github.com/openasteria",
      icon: `
        <svg viewBox="0 0 24 24" width="21" height="21">
          <path fill="currentColor" d="M12 .6a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .6Z"/>
        </svg>
      `
    },
    {
      title: "Teleram",
      url: "https://t.me/xeroonion",
      icon: "✦"
    },
    {
      title: "Discord",
      url: "https://discord.com/users/1401088127921033257",
      icon: "↗"
    }
  ]
};

document.title = CONFIG.name;

document.getElementById("name").innerHTML = `
  ${CONFIG.name}
  <span class="verified">
    <svg viewBox="0 0 24 24">
      <path d="M5 12.5l4.2 4L19 7"/>
    </svg>
  </span>
`;

const linksContainer = document.getElementById("links");

CONFIG.links.forEach(item => {
  const link = document.createElement("a");

  link.className = "link";
  link.href = item.url;

  if (item.url !== "#") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  link.innerHTML = `
    <span class="link-icon">${item.icon}</span>
    <span class="link-title">${item.title}</span>
    <span class="link-arrow">→</span>
  `;

  linksContainer.appendChild(link);
});

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", event => {
  glow.animate(
    {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`
    },
    {
      duration: 500,
      fill: "forwards",
      easing: "ease-out"
    }
  );
});

document.querySelectorAll(".link").forEach(element => {
  element.addEventListener("click", () => {
    const toast = document.getElementById("toast");

    toast.textContent = "Opening…";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 850);
  });
});