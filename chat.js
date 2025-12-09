const documentTitle = document.title;

let notificationsCounter =
  Number(localStorage.getItem('notifications-counter')) || 1;

showAnnoyingChat();

function showAnnoyingChat() {
  const chatWrapper = document.createElement('aside');
  chatWrapper.classList.add('chat');
  chatWrapper.setAttribute('aria-label', 'Chat de suporte');
  chatWrapper.style.setProperty(
    '--chat-notification-count',
    '"' + notificationsCounter + '"',
  );

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'white');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add(
    'lucide',
    'lucide-message-circle-icon',
    'lucide-message-circle',
  );

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
  );
  svg.appendChild(path);

  const span = document.createElement('span');
  span.classList.add('sr-only');
  span.textContent = 'Você possui uma notificação';

  chatWrapper.append(svg, span);
  document.body.append(chatWrapper);

  randomNotifications(chatWrapper);
}

function randomNotifications(chat, sound) {
  setTimeout(() => {
    notificationsCounter++;

    chat.style.setProperty(
      '--chat-notification-count',
      '"' + notificationsCounter + '"',
    );

    localStorage.setItem('notifications-counter', String(notificationsCounter));

    document.title = `❗🔴 Você possui ${notificationsCounter} notificações! | ${documentTitle}`;

    randomNotifications(chat, sound);
  }, getNextInterval());
}

function getNextInterval() {
  return Math.max(200, Math.random() * 5000);
}
