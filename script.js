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
        description: "本作の主人公。銀河指定宇宙移民地区・OGIKUBOにて父親と二人暮らしをする女子中学生。普通でない街で誰よりも普通の人生を夢見ていたが、宇宙パトロールとして働くことになる。犯罪者を見付けるとジャッジメントガンモーフィンという能力を発動する。",
        traits: [4, 5, 4, 5, 3, 5, 5, 3, 4, 4]
    },
    {
        name: "AΩ・ノヴァ",
        image: "images/placeholder.jpg",
        description: "隕石に乗って宇宙の彼方からやってきた謎の転校生。金髪碧眼の美少年で、口癖は「どっちだっていいよ」。その正体は感情のないナッシング星人。ブラックホール星人の手先として、ルル子の恋心を育てていた。",
        traits: [3, 2, 3, 3, 5, 2, 3, 5, 2, 4]
    },
    {
        name: "ミドリ・セイブザワールド",
        image: "images/placeholder.jpg",
        description: "ルル子の友人で同じくOGIKUBO中学に通う女子中学生。異星人と地球人のハーフ。一人称は「あーし」でギャルのような口調で喋る。緑肌で頭部には目玉のついた触角がある。どちらかといえば常識人であり、ツッコミに回ることも多い。",
        traits: [3, 4, 3, 4, 5, 5, 3, 4, 5, 4]
    },
    {
        name: "オーバージャスティス本部長",
        image: "images/placeholder.jpg",
        description: "宇宙パトロールOGIKUBO支部の本部長で、ルル子を宇宙パトロールに任命した張本人。骸骨のような外見と炎が特徴で、ほぼ不死身に近い生命力を持つ。正義感の強い熱血漢だが、即決即断ないい加減で意外と頼りない一面がある。",
        traits: [5, 4, 4, 3, 2, 5, 5, 2, 4, 3]
    },
    {
        name: "ケイジ",
        image: "images/placeholder.jpg",
        description: "ルル子の父である宇宙パトロール隊員。第1話で宇宙タイムカプセルを誤飲しフリーズしてしまう。オーバージャスティス同様、滅茶苦茶な理論で物事を決める性格。最終話で宇宙パトロールの宇宙海賊取締課に配属となる。",
        traits: [4, 3, 3, 4, 2, 4, 4, 2, 5, 3]
    },
    {
        name: "ララ子・ゴッドスピード",
        image: "images/placeholder.jpg",
        description: "ルル子の母親である宇宙海賊船長。平々凡々な暮らしに耐え切れず、数年前にケイジと争い、家具を全部持って家を出て行った。戦闘力はかなり高く、生身で大気圏を突入したり、ルル子たちを無傷で一蹴して見せた。",
        traits: [2, 4, 2, 5, 3, 4, 3, 4, 2, 5]
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
        
        // 既に回答済みの場合、選択状態を復元
        if (userAnswers[currentQuestion] !== undefined && 
            parseInt(option.getAttribute('data-value')) === userAnswers[currentQuestion]) {
            option.classList.add('selected');
        }
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
        console.log(`Question ${currentQuestion + 1} answered: ${value}`);
        
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
    // 全ての質問に回答したか確認
    if (userAnswers.length < questions.length) {
        alert('すべての質問に回答してください。');
        currentQuestion = 0;
        showQuestion();
        return;
    }
    
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    console.log("User answers:", userAnswers);
    
    // 最も近いキャラクターを計算
    let minScore = Infinity;
    let closestCharacterIndex = 0;
    
    for (let i = 0; i < characters.length; i++) {
        let score = 0;
        for (let j = 0; j < 10; j++) {
            // 各質問の回答とキャラクターの特性の差の二乗を計算
            const diff = userAnswers[j] - characters[i].traits[j];
            score += diff * diff;
        }
        // ユークリッド距離の平方根
        const distance = Math.sqrt(score);
        console.log(`Character ${characters[i].name} score: ${distance}`);
        
        if (distance < minScore) {
            minScore = distance;
            closestCharacterIndex = i;
        }
    }
    
    const closestCharacter = characters[closestCharacterIndex];
    console.log("Closest character:", closestCharacter.name, "with score:", minScore);
    
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
document.addEventListener('DOMContentLoaded', function() {
    console.log("App initialized");
    showQuestion();
});
