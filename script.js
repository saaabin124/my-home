const toggles = document.querySelectorAll('#menu > .toggle-item');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggles.forEach(t => {
      if (t !== toggle) {
        t.classList.remove('active');
        const submenu = t.querySelector('.submenu');
        if (submenu) submenu.classList.remove('show');
      }
    });
    toggle.classList.toggle('active');
    const submenu = toggle.querySelector('.submenu');
    if (submenu) submenu.classList.toggle('show');
  });
});
