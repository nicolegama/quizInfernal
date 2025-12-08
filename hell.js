let isHellMode = CookieStorage.get('hell') ?? true;

if (!isHellMode) {
  removeHellElements();
}

function hell(cb) {
  if (isHellMode) {
    cb?.();
  }
}

function bless() {
  isHellMode = false;
  CookieStorage.store('hell', false);
  removeHellElements();
}

function removeHellElements() {
  document.querySelectorAll('[data-hell]').forEach((hellNode) => {
    hellNode.remove();
  });
}
