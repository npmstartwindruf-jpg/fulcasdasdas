const commands = [
  { name: ',antinuke', description: 'Configure anti-nuke protection for this server.', category: 'anti-nuke' },
  { name: ',scan', description: 'Run a quick anti-nuke health check for this server.', category: 'anti-nuke' },
  { name: ',panic', description: 'Immediately enable anti-nuke protection and lock dangerous roles down.', category: 'anti-nuke' },
  { name: ',server', description: 'Hide or restore a server’s channels in an emergency shutdown.', category: 'server' },
  { name: ',lockdown', description: 'Strip dangerous permissions from roles during an anti-nuke emergency.', category: 'server' },
  { name: ',unlock', description: 'Restore role permissions after a lockdown.', category: 'server' },
  { name: ',strip', description: 'Remove dangerous roles from a user without touching harmless ones.', category: 'anti-nuke' },
  { name: ',stripall', description: 'Remove dangerous roles from every member in the server.', category: 'anti-nuke' },
  { name: ',restoreroles', description: 'Restore the roles removed by the strip command.', category: 'anti-nuke' },
  { name: ',restoreall', description: 'Restore all roles previously removed by the strip commands.', category: 'anti-nuke' },
  { name: ',ping', description: 'Check bot latency and API ping.', category: 'utility' },
  { name: ',help', description: 'List the available commands and their usage.', category: 'utility' },
];

const grid = document.getElementById('commandGrid');
const searchInput = document.getElementById('commandSearch');
const chips = [...document.querySelectorAll('.chip')];

let currentFilter = 'all';

function renderCommands() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = commands.filter((command) => {
    const matchesFilter = currentFilter === 'all' || command.category === currentFilter;
    const matchesQuery =
      command.name.toLowerCase().includes(query) ||
      command.description.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = filtered
    .map(
      (command) => `
        <article class="command-card">
          <div class="command-top">
            <div class="command-name">${command.name}</div>
            <div class="command-meta">${command.category}</div>
          </div>
          <p>${command.description}</p>
          <div class="command-arrow">›</div>
        </article>
      `,
    )
    .join('');
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    currentFilter = chip.dataset.filter;
    chips.forEach((button) => button.classList.toggle('active', button === chip));
    renderCommands();
  });
});

searchInput.addEventListener('input', renderCommands);
renderCommands();
