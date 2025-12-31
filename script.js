// 점 생성 함수
function createDots(containerId, countA, countB) {
    const box = document.getElementById(containerId);
    box.innerHTML = '';
    
    let dots = [];
    for(let i=0; i<countA; i++) dots.push('group-a');
    for(let i=0; i<countB; i++) dots.push('group-b');

    // 셔플 후 배치
    dots.sort(() => Math.random() - 0.5);

    dots.forEach((type, index) => {
        setTimeout(() => {
            const dot = document.createElement('div');
            dot.className = 'dot ' + type;
            dot.style.left = Math.random() * 92 + '%';
            dot.style.top = Math.random() * 85 + '%';
            box.appendChild(dot);
        }, index * 20);
    });
}

// 단순 랜덤 샘플링 (n=20)
function runSRS() {
    let extractedB = 0;
    const n = 20;
    // 매 시행마다 운에 따라 결과가 달라짐 (확률 10%)
    for(let i=0; i<n; i++) {
        if(Math.random() < 0.1) extractedB++;
    }
    
    createDots('viz-srs', n - extractedB, extractedB);
    document.getElementById('srs-count').innerText = extractedB;
    
    const errEl = document.getElementById('srs-error');
    // 2개(10%)가 아니면 편향이 발생한 것으로 간주
    if(extractedB !== 2) {
        errEl.innerText = "편향(Bias) 발생";
        errEl.style.color = "#ef4444";
    } else {
        errEl.innerText = "비율 일치";
        errEl.style.color = "#10b981";
    }
}

// 층화 샘플링 (n=20)
function runStratified() {
    // 모집단 비율을 알고 있으므로 20개 중 2개를 정확히 환자로 할당
    createDots('viz-strat', 18, 2);
    document.getElementById('strat-count').innerText = "2";
}

// 초기 로딩 시 실행
window.onload = () => {
    runSRS();
    runStratified();
};
