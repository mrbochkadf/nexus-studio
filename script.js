document.addEventListener('DOMContentLoaded', () => {

  const bgGlow = document.getElementById('bgGlow');
  if (bgGlow && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      bgGlow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(60, 60, 60, 0.18) 0%, rgba(3, 3, 3, 0) 65%)`;
    });
  }

  const searchBtn = document.getElementById('searchBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchBarContainer = document.getElementById('searchBarContainer');

  if (searchBtn && searchBarContainer) {
    searchBtn.addEventListener('click', () => {
      searchBarContainer.classList.toggle('active');
      if (searchBarContainer.classList.contains('active')) {
        const input = document.getElementById('searchInput');
        if (input) input.focus();
      }
    });
  }

  if (closeSearchBtn && searchBarContainer) {
    closeSearchBtn.addEventListener('click', () => {
      searchBarContainer.classList.remove('active');
    });
  }

  let cartCountValue = 0;
  const cartCount = document.getElementById('cartCount');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCountValue++;
      if (cartCount) {
        cartCount.textContent = cartCountValue;
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartCount.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  const heroBtn = document.getElementById('heroBtn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const target = document.getElementById('collections');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const shirtsOverlay = document.getElementById('shirts-overlay');
  const openShirtsBtn = document.getElementById('openShirtsBtn');
  const navShirtsBtn = document.getElementById('navShirtsBtn');
  const closeShirtsBtn = document.getElementById('closeShirtsBtn');

  const adjustShirtImages = () => {
    const shirtBoxes = document.querySelectorAll('.shirt-img-box');
    
    shirtBoxes.forEach(box => {
      const bgImageStyle = window.getComputedStyle(box).backgroundImage;
      if (!bgImageStyle || bgImageStyle === 'none') return;

      const imageUrl = bgImageStyle.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      const img = new Image();
      
      img.onload = function() {
        if (this.width > this.height) {
          box.style.backgroundSize = 'contain';
          box.style.backgroundPosition = 'center';
        } else {
          box.style.backgroundSize = 'cover';
        }
      };
      
      img.src = imageUrl;
    });
  };

  const openPanel = () => {
    if (shirtsOverlay) {
      shirtsOverlay.classList.add('open');
      document.body.classList.add('no-scroll');
      setTimeout(adjustShirtImages, 50);
    }
  };

  const closePanel = () => {
    if (shirtsOverlay) {
      shirtsOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  };

  if (openShirtsBtn) openShirtsBtn.addEventListener('click', openPanel);
  if (navShirtsBtn) navShirtsBtn.addEventListener('click', openPanel);
  if (closeShirtsBtn) closeShirtsBtn.addEventListener('click', closePanel);

  const revealElements = document.querySelectorAll('.hidden-reveal');
  
  const obsOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px"
  };

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        observer.unobserve(entry.target);
      }
    });
  }, obsOptions);

  revealElements.forEach(el => obs.observe(el));
});
