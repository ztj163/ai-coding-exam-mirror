(() => {
  const menu = document.querySelector('.mirror-menu');
  const nav = document.querySelector('.mirror-nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });

  const blocked = /提交并评分|开始考试|退出登录/;
  document.querySelectorAll('button').forEach((button) => {
    if (blocked.test((button.textContent || '').trim())) {
      button.type = 'button';
      button.classList.add('mirror-disabled');
      button.setAttribute('aria-disabled', 'true');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const toast = document.createElement('div');
        toast.className = 'mirror-toast';
        toast.textContent = '这是只读镜像，未连接原站的开考、提交和评分服务。';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
      });
    }
  });
  document.querySelectorAll('input[type="file"], textarea').forEach((el) => {
    el.disabled = true;
    el.classList.add('mirror-disabled');
    el.title = '只读镜像中不可提交';
  });
})();
