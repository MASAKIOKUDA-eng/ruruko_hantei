// 質問のリスト
const questions = [
    "あなたは責任感が強く、周囲をまとめるのが得意だ",
    "あなたは好奇心旺盛で、新しい発見を求める冒険家だ",
    "あなたは人を助けることに喜びを感じる",
    "あなたは困難な状況でも前向きに立ち向かう",
    "あなたは計画を立てて物事を進めるのが好きだ",
    "あなたは感情表現が豊かで、周囲を明るくする",
    "あなたは正義のために戦う勇気がある",
    "あなたは論理的に考え、冷静に判断できる",
    "あなたは仲間思いで、チームワークを大切にする",
    "あなたは変化を恐れず、新しい環境に適応できる"
];

// キャラクターデータ
const characters = [
    {
        name: "ルル子",
        image: "images/placeholder.jpg",
        description: "正義感が強く、責任感のある頼れるリーダー。困っている人を見ると放っておけない優しさを持っています。宇宙パトロール隊のエースパイロットとして活躍中。",
        traits: [5, 3, 5, 4, 4, 3, 5, 4, 5, 3]
    },
    {
        name: "ミドリ",
        image: "images/placeholder.jpg",
        description: "好奇心旺盛で、新しいことに挑戦するのが大好き。明るく元気な性格で、周りを楽しい雰囲気にします。宇宙生物学の専門家として珍しい生物の研究に情熱を注いでいます。",
        traits: [3, 5, 4, 5, 2, 5, 3, 4, 4, 5]
    },
    {
        name: "アオイ",
        image: "images/placeholder.jpg",
        description: "冷静沈着で計画的。論理的な思考の持ち主で、チームの参謀役。頭脳明晰なエンジニアとして、最新技術の開発に取り組んでいます。",
        traits: [4, 4, 3, 2, 5, 2, 4, 3, 3, 3]
    },
    {
        name: "ノヴァ",
        image: "images/placeholder.jpg",
        description: "優しく思いやりがあり、チームの癒し役。人の気持ちに敏感で、サポート役に徹することが多い。宇宙船の医療担当として、仲間の健康を守っています。",
        traits: [3, 3, 5, 2, 3, 4, 3, 2, 5, 2]
    },
    {
        name: "ガイア",
        image: "images/placeholder.jpg",
        description: "勇敢で行動力があり、困難に立ち向かう勇気を持っています。正義のためなら危険も顧みない熱い心の持ち主。宇宙パトロール隊の戦闘スペシャリストとして活躍中。",
        traits: [4, 3, 4, 5, 2, 3, 5, 5, 4, 4]
    }
];

// 変数の初期化
let currentQuestion = 0;
let userAnswers = [];

// DOM要素の取得
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const characterName = document.getElementById('character-name');
const characterDescription = document.getElementById('character-description');
const restartButton = document.getElementById('restart-button');
const twitterShare = document.getElementById('twitter-share');

// 質問を表示する関数
function showQuestion() {
    questionText.textContent = `質問 ${currentQuestion + 1}: ${questions[currentQuestion]}`;
    progressBar.style.width = `${(currentQuestion + 1) * 10}%`;
    progressText.textContent = `${currentQuestion + 1} / 10`;
    
    // 選択状態をリセット
    options.forEach(option => {
        option.classList.remove('selected');
    });
}

// 選択肢のクリックイベント
options.forEach(option => {
    option.addEventListener('click', () => {
        // 選択状態の更新
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // 回答を記録
        const value = parseInt(option.getAttribute('data-value'));
        userAnswers[currentQuestion] = value;
        
        // 少し待ってから次の質問へ
        setTimeout(() => {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 500);
    });
});

// 結果を表示する関数
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // 最も近いキャラクターを計算
    const characterScores = characters.map(character => {
        let score = 0;
        for (let i = 0; i < 10; i++) {
            // 各質問の回答とキャラクターの特性の差の二乗を計算
            score += Math.pow(userAnswers[i] - character.traits[i], 2);
        }
        // ユークリッド距離の平方根を返す（値が小さいほど近い）
        return Math.sqrt(score);
    });
    
    // 最小スコア（最も近い）のキャラクターを見つける
    const closestCharacterIndex = characterScores.indexOf(Math.min(...characterScores));
    const closestCharacter = characters[closestCharacterIndex];
    
    // 結果を表示
    characterName.textContent = closestCharacter.name;
    characterDescription.textContent = closestCharacter.description;
    
    // Twitterシェアボタンの設定
    twitterShare.addEventListener('click', () => {
        const text = `宇宙パトロールルル子キャラクター診断の結果：私は「${closestCharacter.name}」タイプでした！`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    });
}

// 再診断ボタンのクリックイベント
restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion();
});

// 初期表示
showQuestion();
