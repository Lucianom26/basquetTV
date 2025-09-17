 // =========================
    // Implementación mínima de Swiper
    // =========================
    if (document.querySelector('.swiper-container')) {
        class Swiper {
            constructor(selector) {
                this.container = document.querySelector(selector);
                this.slides = this.container.querySelectorAll('.swiper-slide');
                this.currentIndex = 0;
                this.init();
            }
            
            init() {
                // Navegación
                const nextBtn = this.container.querySelector('.swiper-button-next');
                const prevBtn = this.container.querySelector('.swiper-button-prev');
                
                if (nextBtn) nextBtn.addEventListener('click', () => this.next());
                if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
                
                // Autoplay
                this.interval = setInterval(() => this.next(), 3000);
                
                // Paginación
                this.setupPagination();
                this.update();
            }
            
            next() {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
                this.update();
            }
            
            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
                this.update();
            }
            
            update() {
                this.slides.forEach((slide, index) => {
                    slide.style.display = index === this.currentIndex ? 'block' : 'none';
                });
                
                // Actualizar paginación
                if (this.paginationEl) {
                    const bullets = this.paginationEl.querySelectorAll('.swiper-pagination-bullet');
                    bullets.forEach((bullet, index) => {
                        bullet.classList.toggle('active', index === this.currentIndex);
                    });
                }
            }
            
            setupPagination() {
                this.paginationEl = this.container.querySelector('.swiper-pagination');
                if (!this.paginationEl) return;
                
                this.slides.forEach((_, index) => {
                    const bullet = document.createElement('span');
                    bullet.className = `swiper-pagination-bullet ${index === 0 ? 'active' : ''}`;
                    bullet.addEventListener('click', () => {
                        this.currentIndex = index;
                        this.update();
                    });
                    this.paginationEl.appendChild(bullet);
                });
            }
        }
        
        // Inicializar
        new Swiper('.swiper-container');
    }
