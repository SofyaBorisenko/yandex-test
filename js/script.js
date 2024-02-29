const marqueeContent = document.querySelector('.marquee-content');

marqueeContent.addEventListener('animationiteration', () => {
  const firstElement = marqueeContent.children[0];
  marqueeContent.appendChild(firstElement);
});
