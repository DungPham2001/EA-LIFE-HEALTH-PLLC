(function () {
  var TO = 'sirguerreiro@gmail.com';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var name = String(d.get('name') || '').trim();
    var email = String(d.get('email') || '').trim();
    var topic = String(d.get('topic') || '');
    var message = String(d.get('message') || '').trim();

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.name.classList.toggle('invalid', !name);
    form.email.classList.toggle('invalid', !emailOk);
    form.message.classList.toggle('invalid', !message);

    if (!name || !emailOk || !message) {
      note.className = 'form-note error';
      note.textContent = 'Please complete your name, a valid email and a message.';
      return;
    }

    var subject = 'Inquiry: ' + topic + ' - ' + name;
    var body = message + '\n\n--\n' + name + '\n' + email;
    note.className = 'form-note';
    note.textContent = 'Opening your email app... If nothing opens, write to ' + TO + ' directly.';
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
