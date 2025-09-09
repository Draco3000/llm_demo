// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initializeAnimations();
    initializeCardInteractions();
    initializeResponsiveFeatures();
    initializeScrollEffects();
});

// 初始化动画效果
function initializeAnimations() {
    // 为语言卡片添加渐入动画
    const cards = document.querySelectorAll('.language-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 初始化卡片交互
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.language-card');
    
    cards.forEach(card => {
        // 鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        // 点击效果
        card.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 高亮当前卡片
            highlightCard(this);
        });
    });
}

// 高亮选中的卡片
function highlightCard(selectedCard) {
    const allCards = document.querySelectorAll('.language-card');
    
    allCards.forEach(card => {
        if (card === selectedCard) {
            card.style.border = '2px solid #667eea';
            card.style.background = 'rgba(102, 126, 234, 0.05)';
        } else {
            card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            card.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// 初始化响应式功能
function initializeResponsiveFeatures() {
    // 检测屏幕尺寸并调整字体大小
    function adjustFontSize() {
        const screenWidth = window.innerWidth;
        const cards = document.querySelectorAll('.language-card');
        
        cards.forEach(card => {
            const textContent = card.querySelector('.text-content');
            if (textContent) {
                if (screenWidth < 480) {
                    textContent.style.fontSize = '0.95rem';
                } else if (screenWidth < 768) {
                    textContent.style.fontSize = '1rem';
                } else {
                    textContent.style.fontSize = '1.1rem';
                }
            }
        });
    }
    
    // 初始调整和监听窗口变化
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
}

// 初始化滚动效果
function initializeScrollEffects() {
    // 平滑滚动
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // 滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header');
        
        if (parallax) {
            const speed = 0.5;
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
    
    // 滚动进度指示器
    createScrollProgressIndicator();
}

// 创建滚动进度指示器
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    const cards = document.querySelectorAll('.language-card');
    const currentHighlighted = document.querySelector('.language-card[style*="border: 2px solid #667eea"]');
    let currentIndex = Array.from(cards).indexOf(currentHighlighted);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % cards.length;
        highlightCard(cards[currentIndex]);
        cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1;
        highlightCard(cards[currentIndex]);
        cards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'Enter' && currentHighlighted) {
        e.preventDefault();
        currentHighlighted.click();
    }
});

// 添加打印功能
function addPrintFunctionality() {
    const printButton = document.createElement('button');
    printButton.textContent = '打印页面';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
}

// 添加主题切换功能
function addThemeToggle() {
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙';
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    let isDarkMode = false;
    
    themeButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            // Dark mode styles with better contrast
            document.body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
            
            // Header and cards with better contrast
            document.querySelectorAll('.header, .language-card, .ai-note').forEach(el => {
                el.style.background = 'rgba(25, 25, 35, 0.95)';
                el.style.color = '#e6e6ff';
                el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            });
            
            // Specific text elements
            document.querySelectorAll('.title').forEach(el => {
                el.style.color = '#ffffff';
                el.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
            });
            
            document.querySelectorAll('.subtitle, .intro p').forEach(el => {
                el.style.color = '#b8b8d9';
            });
            
            document.querySelectorAll('.text-content, .ai-note p').forEach(el => {
                el.style.color = '#d0d0ff';
            });
            
            document.querySelectorAll('.card-header h3').forEach(el => {
                el.style.color = '#ffffff';
            });
            
            // Code content in dark mode
            document.querySelectorAll('.code-content').forEach(el => {
                el.style.background = '#0d1117';
                el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            });
            
            // Link styling for dark mode
            document.querySelectorAll('a').forEach(el => {
                el.style.color = '#64b5f6';
            });
            
            themeButton.textContent = '☀️';
            themeButton.style.background = 'rgba(25, 25, 35, 0.9)';
            
        } else {
            // Light mode (original styles)
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            
            document.querySelectorAll('.header, .language-card, .ai-note').forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.95)';
                el.style.color = '';
                el.style.border = '';
            });
            
            document.querySelectorAll('.title').forEach(el => {
                el.style.color = '#2c3e50';
                el.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.1)';
            });
            
            document.querySelectorAll('.subtitle, .intro p').forEach(el => {
                el.style.color = '';
            });
            
            document.querySelectorAll('.text-content, .ai-note p').forEach(el => {
                el.style.color = '';
            });
            
            document.querySelectorAll('.card-header h3').forEach(el => {
                el.style.color = '';
            });
            
            document.querySelectorAll('.code-content').forEach(el => {
                el.style.background = '';
                el.style.border = '';
            });
            
            document.querySelectorAll('a').forEach(el => {
                el.style.color = '';
            });
            
            themeButton.textContent = '🌙';
            themeButton.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
    
    document.body.appendChild(themeButton);
}

// 页面加载完成后添加额外功能
window.addEventListener('load', function() {
    addPrintFunctionality();
    addThemeToggle();
    
    // 添加页面加载完成动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化滚动事件
const debouncedScrollHandler = debounce(function() {
    // 滚动相关的性能敏感操作
}, 16); // 约60fps

window.addEventListener('scroll', debouncedScrollHandler);