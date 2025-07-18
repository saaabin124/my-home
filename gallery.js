document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const detailView = document.getElementById('detailView');
  const detailImage = document.getElementById('detailImage');
  const detailCaption = document.getElementById('detailCaption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      detailImage.src = img.src;
      detailImage.alt = img.alt;

      // 줄바꿈 포함 캡션 처리
      detailCaption.innerHTML = item.getAttribute('data-caption');

      // 자동 스크롤
      detailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
