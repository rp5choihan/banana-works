export const chartData = {
    datasets: [{
        label: 'Strategic Priorities',
        data: [
            { x: 9, y: 9.5, r: 25, label: 'Smart Prompt Refiner', category: 'UX' }, // High Feasibility, High Impact
            { x: 6, y: 9, r: 20, label: 'Hybrid Pricing', category: 'BM' },         // Mid Feasibility, High Impact
            { x: 7, y: 7.5, r: 18, label: 'Recipe Gallery', category: 'Community' }, // Good Feasibility, Good Impact
            { x: 4, y: 6.5, r: 15, label: 'Figma Plugin', category: 'Extension' },    // Low Feasibility, Mid Impact
            { x: 8, y: 6.0, r: 15, label: 'One-Stop Packs', category: 'Content' }     // High Feasibility, Mid Impact
        ],
        backgroundColor: (context) => {
            const cat = context.raw?.category;
            switch(cat) {
                case 'BM': return 'rgba(59, 130, 246, 0.85)'; // Blue
                case 'UX': return 'rgba(234, 179, 8, 0.9)';   // Yellow (Banana Brand)
                case 'Community': return 'rgba(16, 185, 129, 0.85)'; // Green (Teal-ish)
                case 'Extension': return 'rgba(139, 92, 246, 0.85)'; // Purple
                default: return 'rgba(107, 114, 128, 0.6)';
            }
        },
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBackgroundColor: '#111827',
        hoverBorderColor: '#FDE047',
        hoverBorderWidth: 3
    }]
};


export const proposals = [
    {
        id: 1,
        icon: 'wand-2',
        category: 'UX Innovation',
        title: '스마트 프롬프트 리파이너',
        short: '단순 단어 입력을 전문가급 프롬프트로 자동 변환',
        description: '사용자가 "파란 로봇"이라고만 입력해도 내장된 LLM이 템플릿의 맥락(Context)을 파악하여 "사이버펑크 스타일, 시네마틱 조명, 언리얼 엔진 5 렌더링, 8k 해상도" 등의 상세 프롬프트로 확장해주는 기능입니다. 프롬프트 엔지니어링 학습 없이도 최상의 결과물을 보장합니다.',
        market_trend: 'Copilot 방식의 AI 보조 기능 표준화',
        effect: '초보자 생성 실패율 감소로 인한 Retention 30% 증가 예상',
        difficulty: '낮음 (LLM Chaining API 연동)',
        risk: 'API 호출 비용 증가 (캐싱 전략 필요)',
        steps: [
            '카테고리별 시스템 프롬프트 최적화',
            'Gemini Flash 등 경량/고속 모델 연동',
            'Before/After 비교 UI 개발 및 적용'
        ]
    },
    {
        id: 2,
        icon: 'share-2',
        category: 'Community',
        title: '바나나 레시피 갤러리 & Remix',
        short: '결과물 공유 및 설정값 원클릭 복제(Remix)',
        description: 'Midjourney의 성공 요인인 "탐색과 복제"를 벤치마킹합니다. 사용자가 만든 이미지와 그 생성 설정(메타데이터)을 공유하고, 타인이 "Remix" 버튼을 눌러 해당 설정을 즉시 내 작업창으로 불러올 수 있습니다.',
        market_trend: 'Civitai, Artstation 등 커뮤니티 주도형 플랫폼 성장',
        effect: '체류 시간 2배 증대 및 자발적 콘텐츠 확산 (Viral)',
        difficulty: '중간 (DB 스키마 설계 및 이미지 호스팅)',
        risk: '부적절한 이미지(NSFW) 유통 리스크 (AI 필터링 필수)',
        steps: [
            '이미지+메타데이터 JSON 저장 구조 설계',
            '갤러리 피드 UI 및 필터링 시스템 구현',
            'State Injection(설정 불러오기) 로직 구현'
        ]
    },
    {
        id: 3,
        icon: 'credit-card',
        category: 'Biz Model',
        title: '하이브리드 요금제 (Hybrid Pricing)',
        short: 'API Key가 필요 없는 구독형 모델 추가',
        description: '기존 BYOK(Bring Your Own Key) 모델은 유지하되, "편의성"을 구매할 수 있는 월 구독 모델을 신설합니다. 자체 서버가 API 호출을 대행하여 사용자는 복잡한 키 발급 없이 즉시 서비스를 이용할 수 있습니다.',
        market_trend: 'SaaS의 PLG(Product-Led Growth) 전환 가속화',
        effect: '초기 사용자 전환율(Conversion) 300% 상승 기대',
        difficulty: '중간 (결제 연동 및 토큰 카운팅 백엔드)',
        risk: '서버 운영 비용 및 어뷰징 방어 로직 필요',
        steps: [
            '로그인 시스템 (Auth) 도입',
            'API Proxy 서버 및 토큰 관리 로직 구축',
            'Free/Starter/Pro 티어 구분 UI 적용'
        ]
    },
    {
        id: 4,
        icon: 'figma',
        category: 'Extension',
        title: 'Figma & Notion 플러그인',
        short: '워크플로우 통합: 툴을 벗어나지 않는 작업 환경',
        description: '디자이너와 기획자가 작업 도중 웹 브라우저로 이동하지 않고, Figma나 Notion 내부에서 BananaWorks 템플릿을 호출하여 이미지를 즉시 삽입할 수 있는 플러그인을 제공합니다.',
        market_trend: '생성형 AI의 워크플로우 내재화 (In-App AI)',
        effect: '전문가 그룹 Lock-in 효과 및 B2B 도입 유도',
        difficulty: '높음 (플랫폼별 플러그인 생태계 학습)',
        risk: '플랫폼별 정책 종속성 및 유지보수 부담',
        steps: [
            'BananaWorks 기능 API Gateway화',
            'Figma Plugin API 프로토타입 개발',
            'iframe 기반 경량 UI 구현'
        ]
    }
];
