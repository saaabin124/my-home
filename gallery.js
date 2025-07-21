

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

  function getRandomGray() {
  const shade = Math.floor(Math.random() * 156) + 100; // 100~255
  return `rgb(${shade},${shade},${shade})`;
}

function getRandomPosition(container) {
  const maxX = container.clientWidth - 20;
  const maxY = container.clientHeight - 20;
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY)
  };
}

// 이 스크립트는 letters.html의 .letters-list 안에서만 실행되어야 함
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("letters.");

  if (!container) return; // 다른 페이지면 실행 안 함

  for (let i = 0; i < 5; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    const color = getRandomGray();
    const { x, y } = getRandomPosition(container);

    circle.style.backgroundColor = color;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    const iframe = document.createElement("iframe");
    iframe.src = "letters1.html";

    circle.appendChild(iframe);
    container.appendChild(circle);
  }
});
  });
});

function createInteractiveCircles() {
  const container = document.querySelector('.letters-list');
  if (!container) return;

  const baseDiameter = 30;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
const expandedSize = Math.min(window.innerWidth, window.innerHeight) * 0.7;


  const positions = [];
  const hoveredStates = [];

  function getRandomGray() {
    const shade = Math.floor(Math.random() * 156) + 270;
    return `rgb(${shade}, ${shade}, ${shade})`;
  }

  function getNonOverlappingPosition() {
    let maxAttempts = 1000;
    while (maxAttempts > 0) {
      const x = Math.random() * (containerWidth - baseDiameter - expandedSize / 2) + expandedSize / 2;
      const y = Math.random() * (containerHeight - baseDiameter);
      const isOverlapping = positions.some(pos => {
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) < baseDiameter;
      });
      if (!isOverlapping) return { x, y };
      maxAttempts--;
    }
    return {
      x: Math.random() * (containerWidth - baseDiameter - expandedSize / 2) + expandedSize / 2,
      y: Math.random() * (containerHeight - baseDiameter)
    };
  }

  for (let i = 0; i < 5; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.backgroundColor = getRandomGray();

    const { x, y } = getNonOverlappingPosition();
    positions.push({ x, y });

    circle.style.position = 'absolute';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${baseDiameter}px`;
    circle.style.height = `${baseDiameter}px`;
    circle.style.borderRadius = '50%';
    circle.style.transition = 'all 0.6s ease';
    circle.style.cursor = 'pointer';
    circle.style.zIndex = '1';
    circle.style.overflow = 'hidden';

    // 숫자 라벨 추가
    const label = document.createElement('span');
    label.textContent = `${i + 1}`;
    label.classList.add('circle-label');
    circle.appendChild(label);

    // iframe 삽입
    const iframe = document.createElement('iframe');
    iframe.src = `letters${i + 1}.html`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'none';
    circle.appendChild(iframe);

    hoveredStates[i] = false;

    circle.addEventListener('mouseenter', () => {
      const containerRect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const centerX = x + baseDiameter / 2;
      const centerY = y + baseDiameter / 2;

      let newLeft = centerX - expandedSize / 2;
      let newTop = centerY - expandedSize / 2;

      if (containerRect.left + newLeft + expandedSize > viewportWidth) {
        newLeft = viewportWidth - containerRect.left - expandedSize - 10;
        if (newLeft < 0) newLeft = 0;
      }

      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;

      const absoluteTop = containerRect.top + newTop;
      const expandedBottom = absoluteTop + expandedSize;
      if (expandedBottom > viewportHeight) {
        const scrollAmount = expandedBottom - viewportHeight + 20;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }

      circle.style.zIndex = '1000';
      circle.style.width = `${expandedSize}px`;
      circle.style.height = `${expandedSize}px`;
      circle.style.left = `${newLeft}px`;
      circle.style.top = `${newTop}px`;
      circle.style.borderRadius = '30px';

      iframe.style.display = 'block';

      // 원 색상 변경 (예: 연한 라임색)
      circle.style.backgroundColor = '#adff2f';

      // 숫자 숨김을 위해 클래스 토글
      circle.classList.add('expanded');

      if (!hoveredStates[i]) {
        label.style.color = '#4fd411'; // 짙은 라임색으로 변경 (한번 호버한 경우)
        hoveredStates[i] = true;
      }
    });

    circle.addEventListener('mouseleave', () => {
      circle.style.zIndex = '1';
      circle.style.width = `${baseDiameter}px`;
      circle.style.height = `${baseDiameter}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.borderRadius = '50%';

      iframe.style.display = 'none';

      // 원 색상 원복
      circle.style.backgroundColor = getRandomGray();

      // 숫자 보이도록 클래스 제거
      circle.classList.remove('expanded');
    });

    container.appendChild(circle);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  let currentImages = [];  // 현재 열려있는 행의 이미지 리스트
  let currentIndex = 0;
  let isLocked = false;    // 클릭 고정 여부

  // 이미지 클릭 이벤트 등록
  document.querySelectorAll(".scrollable-image-row img").forEach(img => {
    img.addEventListener("click", (e) => {
      const clickedImg = e.target;

      // 클릭한 이미지가 속한 scrollable-image-row 찾기
      const container = clickedImg.closest(".scrollable-image-row");
      if (!container) return;

      currentImages = Array.from(container.querySelectorAll("img"));
      currentIndex = currentImages.indexOf(clickedImg);

      openModal(currentImages[currentIndex].src);
      isLocked = true;  // 클릭하면 고정 모달

      e.stopPropagation();
    });
  });

  // 모달 이미지 설정 및 표시
  function openModal(src) {
    modalImg.src = src;
    modal.classList.add("active");
  }

  // 모달 닫기
  function closeModal() {
    modal.classList.remove("active");
    modalImg.src = "";
    isLocked = false;
  }

  // 모달 배경 클릭하면 닫기 (단, 이미지 클릭 시 고정, 다시 배경 클릭 시 닫힘)
  modal.addEventListener("click", (e) => {
    if (e.target === modal && isLocked) {
      closeModal();
    }
  });

  // 좌우 이동 함수
  function showImageAt(index) {
    if (index < 0) index = currentImages.length - 1;
    else if (index >= currentImages.length) index = 0;
    currentIndex = index;
    modalImg.src = currentImages[currentIndex].src;
  }

  // 이전 버튼
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isLocked) return;
    showImageAt(currentIndex - 1);
  });

  // 다음 버튼
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isLocked) return;
    showImageAt(currentIndex + 1);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const modalCaption = document.getElementById("modalCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const images = document.querySelectorAll(".scrollable-image-row img");

  let currentIndex = 0;

  const openModal = (index) => {
    const img = images[index];
    modalImg.src = img.src;
    modalTitle.textContent = img.dataset.title || "";
    modalDetails.textContent = img.dataset.details || "";
    modalCaption.textContent = img.dataset.caption || "";
    modal.classList.add("active");
    currentIndex = index;
  };

  const closeModal = () => {
    modal.classList.remove("active");
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openModal(currentIndex);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    openModal(currentIndex);
  };

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

