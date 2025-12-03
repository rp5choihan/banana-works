import { chartData, proposals } from './data.js';


document.addEventListener('DOMContentLoaded', () => {


    /* --- Icons --- */
    lucide.createIcons();


    /* --- Chart.js --- */
    const ctx = document.getElementById('strategyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: '실현 가능성 (Feasibility)', font: { weight: 'bold' } },
                    min: 2, max: 10,
                    grid: { color: '#f3f4f6', drawBorder: false },
                    ticks: { stepSize: 1 }
                },
                y: {
                    title: { display: true, text: '비즈니스 영향력 (Impact)', font: { weight: 'bold' } },
                    min: 4, max: 11,
                    grid: { color: '#f3f4f6', drawBorder: false },
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw.label}`,
                        footer: (context) => `Feasibility: ${context[0].raw.x} | Impact: ${context[0].raw.y}`
                    },
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 }
                },
                legend: { display: false }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });


    /* --- Proposal Grid & Filtering --- */
    const grid = document.getElementById('proposal-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');


    function renderProposals(filter = 'all') {
        grid.innerHTML = ''; // Clear current
        
        const filtered = filter === 'all' 
            ? proposals 
            : proposals.filter(p => p.category.includes(filter) || (filter === 'Biz Model' && p.category.includes('Biz')));


        const newCards = [];


        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer card-hover-effect group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-banana-400';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${item.title}`);


            let themeClass = 'text-gray-600 bg-gray-50 group-hover:bg-banana-50 group-hover:text-banana-600';
            let tagClass = 'bg-gray-100 text-gray-500';
            
            if(item.category.includes('UX')) { themeClass = 'text-banana-600 bg-banana-50'; tagClass='bg-banana-100 text-banana-700'; }
            if(item.category.includes('Biz')) { themeClass = 'text-blue-600 bg-blue-50'; tagClass='bg-blue-100 text-blue-700'; }
            if(item.category.includes('Community')) { themeClass = 'text-teal-600 bg-teal-50'; tagClass='bg-teal-100 text-teal-700'; }
            if(item.category.includes('Extension')) { themeClass = 'text-purple-600 bg-purple-50'; tagClass='bg-purple-100 text-purple-700'; }


            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 rounded-xl ${themeClass} transition-colors">
                        <i data-lucide="${item.icon}"></i>
                    </div>
                    <span class="px-2 py-1 text-[10px] uppercase font-bold rounded ${tagClass} tracking-wide">${item.category}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-banana-600 transition-colors">${item.title}</h3>
                <p class="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-grow">${item.short}</p>
                <div class="text-xs text-gray-400 font-medium flex items-center gap-1 mt-auto pt-4 border-t border-gray-50">
                    상세 보기 <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </div>
            `;
            
            const activate = () => openModal(item);
            card.addEventListener('click', activate);
            card.addEventListener('keydown', (e) => {
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                }
            });


            grid.appendChild(card);
            newCards.push(card);
        });


        lucide.createIcons();
        
        if(newCards.length > 0) {
            gsap.from(newCards, {
                y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out'
            });
        }
    }


    renderProposals();


    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            renderProposals(btn.dataset.filter);
        });
    });


    /* --- Detail Modal Logic --- */
    const detailModal = document.getElementById('detail-modal');
    const dBackdrop = detailModal.querySelector('.modal-backdrop');
    const dContent = detailModal.querySelector('.modal-content');
    const dCloseBtn = document.getElementById('modal-close');


    function openModal(item) {
        document.getElementById('modal-tag').innerText = item.category;
        document.getElementById('modal-title').innerText = item.title;
        document.getElementById('modal-short').innerText = item.short;
        document.getElementById('modal-desc').innerText = item.description;
        
        document.getElementById('modal-trend').innerText = item.market_trend;
        document.getElementById('modal-effect').innerText = item.effect;
        document.getElementById('modal-difficulty').innerText = item.difficulty;
        document.getElementById('modal-risk').innerText = item.risk;
        
        const stepsList = document.getElementById('modal-steps');
        stepsList.innerHTML = item.steps.map(step => `
            <li class="step-item text-sm text-gray-600 bg-gray-50/50 px-3 py-2 rounded-lg border border-gray-100">
                ${step}
            </li>
        `).join('');


        detailModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        dContent.scrollTo(0,0);
        
        setTimeout(() => {
            dBackdrop.classList.remove('opacity-0');
            dContent.classList.remove('opacity-0', 'scale-95');
            dContent.classList.add('scale-100');
            dCloseBtn.focus(); 
        }, 10);
    }


    function closeDetailModal() {
        dBackdrop.classList.add('opacity-0');
        dContent.classList.remove('scale-100');
        dContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            detailModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }, 300);
    }


    dCloseBtn.addEventListener('click', closeDetailModal);
    dBackdrop.addEventListener('click', closeDetailModal);


    /* --- Feedback Simulation Logic --- */
    const feedbackList = document.getElementById('feedback-list');
    const feedForm = document.getElementById('feedback-form');
    
    const initialFeedback = [
        { user: 'Product Owner', text: 'API Key 없는 구독 모델은 B2B 도입의 핵심입니다. 기대되네요.' },
        { user: 'Early Adopter', text: '프롬프트 리파이너 기능이 빨리 나왔으면 좋겠어요. 매번 작성이 귀찮았거든요.' }
    ];


    function createFeedbackCard(user, text) {
        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-xl border border-gray-100 shadow-sm feedback-item';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-banana-600 bg-banana-50 px-2 py-1 rounded">${user}</span>
                <span class="text-[10px] text-gray-400">Just now</span>
            </div>
            <p class="text-sm text-gray-700 leading-snug">${text}</p>
        `;
        return div;
    }


    initialFeedback.forEach(f => feedbackList.appendChild(createFeedbackCard(f.user, f.text)));


    feedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('fb-user').value;
        const text = document.getElementById('fb-content').value;
        
        const card = createFeedbackCard(user, text);
        feedbackList.prepend(card); // Add to top
        
        document.getElementById('fb-content').value = ''; // Reset
        
        if(feedbackList.children.length > 5) {
            feedbackList.lastElementChild.remove();
        }
    });




    /* --- Demo Simulator Modal --- */
    const demoModal = document.getElementById('demo-modal');
    const dmBackdrop = demoModal.querySelector('.demo-backdrop');
    const dmContent = demoModal.querySelector('.demo-content');
    const dmClose = document.getElementById('demo-close');
    const dmOpenBtn = document.getElementById('btn-open-demo');
    const dmGenerateBtn = document.getElementById('btn-generate');
    const dmResetBtn = document.getElementById('btn-reset-demo');


    const vInput = document.getElementById('demo-input-view');
    const vLoader = document.getElementById('demo-loader-view');
    const vResult = document.getElementById('demo-result-view');
    
    function openDemo() {
        demoModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        resetDemo();
        setTimeout(() => {
            dmBackdrop.classList.remove('opacity-0');
            dmContent.classList.remove('opacity-0', 'scale-95');
            dmContent.classList.add('scale-100');
        }, 10);
    }


    function closeDemo() {
        dmBackdrop.classList.add('opacity-0');
        dmContent.classList.remove('scale-100');
        dmContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            demoModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }, 300);
    }


    function resetDemo() {
        vInput.classList.remove('hidden');
        vLoader.classList.add('hidden');
        vResult.classList.add('hidden');
    }


    function runGeneration() {
        const simplePrompt = document.getElementById('demo-prompt').value;
        const style = document.getElementById('demo-style').value;
        
        vInput.classList.add('hidden');
        vLoader.classList.remove('hidden');


        const loaderText = document.getElementById('demo-loader-text');
        const steps = ["Parsing user intent...", "Applying style matrix...", "Optimizing token weights...", "Rendering final latents..."];
        
        let stepIdx = 0;
        const interval = setInterval(() => {
            if(stepIdx < steps.length) {
                loaderText.innerText = steps[stepIdx];
                stepIdx++;
            }
        }, 800);


        setTimeout(() => {
            clearInterval(interval);
            vLoader.classList.add('hidden');
            vResult.classList.remove('hidden');


            document.getElementById('demo-result-title').innerText = style.charAt(0).toUpperCase() + style.slice(1) + " Generation";
            document.getElementById('demo-final-prompt').innerText = 
                `> /imagine prompt: ${style} masterpiece, ${simplePrompt}, 8k resolution, cinematic lighting, octane render, detailed textures --v 6.0`;
        }, 3500);
    }


    dmOpenBtn.addEventListener('click', openDemo);
    dmClose.addEventListener('click', closeDemo);
    dmBackdrop.addEventListener('click', closeDemo);
    dmGenerateBtn.addEventListener('click', runGeneration);
    dmResetBtn.addEventListener('click', resetDemo);


    /* --- Keyboard Global (Escape) --- */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if(!detailModal.classList.contains('hidden')) closeDetailModal();
            if(!demoModal.classList.contains('hidden')) closeDemo();
        }
    });


    /* --- GSAP Animations --- */
    gsap.registerPlugin(ScrollTrigger);


    gsap.utils.toArray('.gs-fade-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });


    gsap.from('.gs-reveal-left', {
        scrollTrigger: { trigger: '.gs-reveal-left', start: 'top 80%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from('.gs-reveal-right', {
        scrollTrigger: { trigger: '.gs-reveal-right', start: 'top 80%' },
        x: 50, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out'
    });


    gsap.from('.gs-scale-up', {
        scrollTrigger: { trigger: '.gs-scale-up', start: 'top 85%' },
        scale: 0.9, opacity: 0, duration: 0.8, ease: 'power2.out'
    });
    
    gsap.utils.toArray('.roadmap-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, delay: i * 0.2, ease: 'power3.out'
        });
    });


    gsap.from('pre code', {
        scrollTrigger: { trigger: '#tech', start: 'top 70%' },
        opacity: 0, y: 20, duration: 1, ease: 'power2.out'
    });
});
