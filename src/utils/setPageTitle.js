/**
 * 设置微信网页标题
 * @param {number | string } title 你要设置的标题
 */
const setPageTitle = (title) => {
  document.title = title;
  let i = document.createElement('iframe');
  i.src = 'public/favicon.ico';
  i.style.display = 'none';
  i.onload = () => {
    setTimeout(() => {
      i.remove();
    }, 0);
  };
  document.body.appendChild(i);
};

export { setPageTitle };
