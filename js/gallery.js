const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.gallery');

  const galleryMarkup = images
    .map(
      ({ preview, original, description }, index) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          data-index="${index}"
          alt="${description}"
        />
      </a>
    </li>
  `
    )
    .join('');

  galleryContainer.innerHTML = galleryMarkup;

  let currentIndex = 0;
  let instance = null;

  function openLightbox(index) {
    currentIndex = index;

    instance = basicLightbox.create(
      `
    <div class="lightbox-container">
      <span class="lightbox-counter">${currentIndex + 1} / ${
        images.length
      }</span>
      <button class="lightbox-close">x</button>
      <img src="${images[currentIndex].original}" alt="${
        images[currentIndex].description
      }" class="lightbox-image">
      <button class="lightbox-prev"><</button>
      <button class="lightbox-next">></button>
    </div>
  `,
      {
        onShow: (instance) => {
          document.addEventListener('keydown', handleKeyPress);
          setButtonListeners(instance);
        },
        onClose: () => document.removeEventListener('keydown', handleKeyPress),
      }
    );

    instance.show();

    setTimeout(() => setButtonListeners(instance), 100);
  }

  function setButtonListeners(instance) {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const closeBtn = document.querySelector('.lightbox-close');

    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (closeBtn) closeBtn.addEventListener('click', () => instance.close());
  }

  galleryContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const imgElement = event.target.closest('.gallery-image');
    if (!imgElement) return;
    const index = Number(imgElement.dataset.index);
    openLightbox(index);
  });

  function handleKeyPress(event) {
    if (event.key === 'ArrowRight') nextImage();
    else if (event.key === 'ArrowLeft') prevImage();
    else if (event.key === 'Escape') instance.close();
  }

  function nextImage() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateLightbox();
    }
  }

  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightbox();
    }
  }

  function updateLightbox() {
    if (!instance) return;
    const { original, description } = images[currentIndex];

    const img = document.querySelector('.lightbox-image');
    const counter = document.querySelector('.lightbox-counter');

    if (img) {
      img.src = original;
      img.alt = description;
    }

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }
});
