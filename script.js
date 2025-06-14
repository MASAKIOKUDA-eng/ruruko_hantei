// 質問のリスト
const questions = [
    "あなたは正義感が強く、ルールを守ることを大切にする",
    "あなたは明るく元気で、周囲を楽しい雰囲気にできる",
    "あなたは責任感があり、任された仕事はきちんとこなす",
    "あなたは好奇心旺盛で、新しいことに興味を持ちやすい",
    "あなたは論理的に考え、冷静に判断できる",
    "あなたは感情表現が豊かで、素直に気持ちを表す",
    "あなたは困っている人を見ると放っておけない",
    "あなたは計画的に物事を進めるのが得意だ",
    "あなたは友情を大切にし、仲間のために尽くす",
    "あなたは臨機応変に対応し、状況に合わせて行動できる"
];

// キャラクターデータ
const characters = [
    {
        name: "ルル子",
        image: "images/placeholder.jpg",
        description: "宇宙パトロール本部に配属された新人宇宙人。明るく元気な性格で、正義感が強い。地球に住む高校生として暮らしながら、宇宙人の不法侵入者を取り締まる任務に励んでいる。",
        traits: [4, 5, 4, 5, 3, 5, 5, 3, 4, 4]
    },
    {
        name: "ミドリ",
        image: "images/placeholder.jpg",
        description: "ルル子のクラスメイトで親友。好奇心旺盛で、オカルトや宇宙人に強い興味を持っている。ルル子の正体を知った後も変わらず友情を育んでいる。",
        traits: [3, 4, 3, 4, 5, 5, 3, 2, 5, 4]
    },
    {
        name: "アルフォンス",
        image: "images/placeholder.jpg",
        description: "宇宙パトロール本部からルル子に送られた監視役の猫型ロボット。冷静沈着で論理的な思考の持ち主。時にツッコミ役として機能する。",
        traits: [5, 2, 3, 3, 5, 2, 4, 5, 3, 3]
    },
    {
        name: "A・O",
        image: "images/placeholder.jpg",
        description: "宇宙パトロール本部の上官。クールな性格だが、部下思いの一面も。ルル子に任務を与え、時に厳しく指導する。",
        traits: [5, 2, 4, 3, 4, 2, 5, 5, 4, 3]
    },
    {
        name: "ノヴァ",
        image: "images/placeholder.jpg",
        description: "宇宙パトロール本部の優秀な宇宙人。美しい容姿と高い能力を持ち、ルル子の憧れの存在。冷静な判断力と行動力を兼ね備えている。",
        traits: [5, 3, 5, 4, 4, 3, 5, 4, 3, 4]
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
