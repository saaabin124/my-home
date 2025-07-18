document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const detailView = document.getElementById('detailView');
  const detailImage = document.getElementById('detailImage');
  const detailCaption = document.getElementById('detailCaption');
  const tagButtons = document.querySelectorAll('.tag');
  const selectedTags = new Set();

  // 이미지 클릭 시 디테일 뷰 표시
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      detailImage.src = img.src;
      detailImage.alt = img.alt;
      detailCaption.innerHTML = item.getAttribute('data-caption');
      detailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 태그 클릭 시 필터링
  tagButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.tag;

      // 스타일 토글
      button.classList.toggle('selected');
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }

      // 이미지 필터링
      galleryItems.forEach(item => {
        const itemTags = item.dataset.tags?.split(',') || [];
        const hasAllTags = [...selectedTags].every(tag => itemTags.includes(tag));
        item.style.display = hasAllTags || selectedTags.size === 0 ? 'block' : 'none';
      });
    });
  });
});

