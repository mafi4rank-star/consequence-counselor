let currentSession = {
    clientName: '',
    clientAge: 0,
    clientGrade: '',
    scenario: '',
    currentQuestion: 0,
    wellbeing: 100,
    choices: []
};

const scenarios = {
    substance: {
        title: 'Substance Use',
        emoji: '🚭',
        questions: [
            {
                scenario: "Your friends are offering you something at a party. Everyone seems to be trying it. They're saying 'just this once won't hurt'.",
                choices: [
                    { text: 'Politely decline and suggest doing something else', type: 'good', emoji: '👍', consequence: 'You feel proud of yourself for making your own decision. Your friends respect your choice.' },
                    { text: 'Try it to fit in with the group', type: 'bad', emoji: '⚠️', consequence: 'You feel dizzy and regret it immediately. Your decisions become clouded.' }
                ]
            },
            {
                scenario: "A week later, the same friends ask again. This time they're being more pushy.",
                choices: [
                    { text: 'Stay firm in your decision and find different friends if needed', type: 'good', emoji: '💪', consequence: 'You feel stronger and more confident. Real friends respect your boundaries.' },
                    { text: 'Give in because you already tried it once', type: 'bad', emoji: '⚠️', consequence: 'You start a pattern that becomes harder to break. Your grades begin to slip.' }
                ]
            }
        ]
    },
    bullying: {
        title: 'Bullying & Peer Pressure',
        emoji: '🤝',
        questions: [
            {
                scenario: "You see someone being bullied by the popular group. They're making fun of their appearance. You could join in, laugh, or help.",
                choices: [
                    { text: 'Stand up for the person being bullied', type: 'good', emoji: '🛡️', consequence: 'The person feels supported and grateful. You feel good about doing the right thing.' },
                    { text: 'Join in with the bullying to stay popular', type: 'bad', emoji: '⚠️', consequence: 'You fit in temporarily but feel guilty inside. The victim feels worse.' }
                ]
            },
            {
                scenario: "The person you helped approaches you later to say thank you and asks to sit with you at lunch.",
                choices: [
                    { text: 'Welcome them and build a genuine friendship', type: 'good', emoji: '😊', consequence: 'You make a true friend and realize popularity isn\'t everything. You feel genuinely happy.' },
                    { text: 'Pretend you didn\'t help them to avoid looking uncool', type: 'bad', emoji: '⚠️', consequence: 'They feel betrayed and hurt. You realize you\'re still trapped by peer pressure.' }
                ]
            }
        ]
    },
    academic: {
        title: 'Academic Dishonesty',
        emoji: '📚',
        questions: [
            {
                scenario: "You have a big test tomorrow that you haven't studied for. A friend offers to let you copy their homework.",
                choices: [
                    { text: 'Decline and study what you can tonight', type: 'good', emoji: '📖', consequence: 'You do okay on the test and feel honest. You ask for tutoring help.' },
                    { text: 'Copy the homework and hope the teacher doesn\'t notice', type: 'bad', emoji: '⚠️', consequence: 'The teacher catches you. You get a zero and face consequences.' }
                ]
            },
            {
                scenario: "After getting caught, you have a meeting with your counselor about your grade.",
                choices: [
                    { text: 'Take responsibility and create a study plan', type: 'good', emoji: '✅', consequence: 'Your teacher sees you\'re serious about improvement. They offer extra credit.' },
                    { text: 'Blame your friend and make excuses', type: 'bad', emoji: '⚠️', consequence: 'Nobody believes you. Your reputation is damaged. Your parents are disappointed.' }
                ]
            }
        ]
    },
    relationships: {
        title: 'Unhealthy Relationships',
        emoji: '💔',
        questions: [
            {
                scenario: "Your partner constantly checks where you are and gets angry when you spend time with friends. They say it's because they love you.",
                choices: [
                    { text: 'Talk to them about healthy boundaries and get support', type: 'good', emoji: '🗣️', consequence: 'Either they improve and respect your independence, or you realize this isn\'t healthy and leave.' },
                    { text: 'Accept this as normal and isolate from friends', type: 'bad', emoji: '⚠️', consequence: 'You become isolated and lose your support system. Your mental health suffers.' }
                ]
            },
            {
                scenario: "You realize this relationship is making you unhappy and anxious all the time.",
                choices: [
                    { text: 'End the relationship and focus on yourself', type: 'good', emoji: '💪', consequence: 'You feel free and start healing. You reconnect with friends and family.' },
                    { text: 'Stay because you don\'t want to be alone', type: 'bad', emoji: '⚠️', consequence: 'Your mental health worsens. The cycle continues and becomes harder to break.' }
                ]
            }
        ]
    },
    'social-media': {
        title: 'Social Media Misuse',
        emoji: '📱',
        questions: [
            {
                scenario: "Your post didn't get many likes. You see someone else with way more engagement and feel bad about yourself.",
                choices: [
                    { text: 'Remember that likes don\'t define your worth', type: 'good', emoji: '💭', consequence: 'You feel at peace and spend less time checking notifications. Your real self-esteem grows.' },
                    { text: 'Delete the post and obsess over what\'s trending', type: 'bad', emoji: '⚠️', consequence: 'You become addicted to validation. Your self-worth depends on strangers\' opinions.' }
                ]
            },
            {
                scenario: "Someone posts something hurtful about you online. Others are commenting and it's spreading.",
                choices: [
                    { text: 'Don\'t engage, talk to someone you trust, and report if needed', type: 'good', emoji: '🤐', consequence: 'You handle it maturely. The drama dies down and you feel empowered.' },
                    { text: 'Respond angrily and fight back on social media', type: 'bad', emoji: '⚠️', consequence: 'It escalates. More people get involved. The situation gets worse.' }
                ]
            }
        ]
    }
};

function showCounselorDashboard() {
    document.getElementById('counselor-dashboard').classList.add('active');
    document.getElementById('client-game').classList.remove('active');
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    document.querySelectorAll('.nav-btn')[1].classList.remove('active');
}

function showClientGame() {
    document.getElementById('counselor-dashboard').classList.remove('active');
    document.getElementById('client-game').classList.add('active');
    document.querySelectorAll('.nav-btn')[0].classList.remove('active');
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('counselor-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('client-name').value;
        const clientAge = document.getElementById('client-age').value;
        const clientGrade = document.getElementById('client-grade').value;
        const scenarioType = document.getElementById('scenario-type').value;

        currentSession = {
            clientName,
            clientAge,
            clientGrade,
            scenario: scenarioType,
            currentQuestion: 0,
            wellbeing: 100,
            choices: []
        };

        document.getElementById('session-client-name').textContent = clientName;
        document.getElementById('session-scenario').textContent = scenarios[scenarioType].title;
        document.getElementById('session-info').classList.remove('hidden');
    });
});

function startGame() {
    currentSession.currentQuestion = 0;
    currentSession.wellbeing = 100;
    currentSession.choices = [];

    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('welcome-name').textContent = currentSession.clientName;

    displayQuestion();
}

function displayQuestion() {
    const scenarioData = scenarios[currentSession.scenario];
    const currentQ = scenarioData.questions[currentSession.currentQuestion];

    document.getElementById('scenario-text').textContent = currentQ.scenario;
    document.getElementById('question-counter-text').textContent = `Question ${currentSession.currentQuestion + 1} of ${scenarioData.questions.length}`;

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    currentQ.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = `choice-btn ${choice.type}`;
        button.innerHTML = `<span class="choice-emoji">${choice.emoji}</span><span class="choice-text">${choice.text}</span>`;
        button.onclick = () => handleChoice(index, choice);
        choicesContainer.appendChild(button);
    });

    updateWellbeingMeter();
}

function handleChoice(choiceIndex, choice) {
    const scenarioData = scenarios[currentSession.scenario];
    
    currentSession.choices.push({
        question: currentSession.currentQuestion,
        choice: choiceIndex,
        type: choice.type
    });

    if (choice.type !== 'good') {
        currentSession.wellbeing = Math.max(0, currentSession.wellbeing - 20);
    }

    showHeartAnimation(choice.type);
    setTimeout(() => showConsequence(choice, scenarioData), 1200);
}

function showHeartAnimation(type) {
    const container = document.getElementById('animation-container');
    const heart = container.querySelector('.heart-animation');
    heart.textContent = type === 'good' ? '💚' : '💔';
    container.classList.remove('hidden');
    
    heart.style.animation = 'none';
    setTimeout(() => { heart.style.animation = ''; }, 10);
    setTimeout(() => { container.classList.add('hidden'); }, 1500);
}

function showConsequence(choice, scenarioData) {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    const title = choice.type === 'good' ? '✨ Great Choice!' : '⚠️ Think About This';
    const personalizationText = generatePersonalizedMessage(choice.type);

    document.getElementById('result-title').textContent = title;
    document.getElementById('consequence-text').textContent = choice.consequence;
    document.getElementById('personal-text').textContent = personalizationText;
}

function generatePersonalizedMessage(choiceType) {
    const name = currentSession.clientName;
    const goodMessages = [
        `${name}, that decision shows real maturity. You're thinking about long-term consequences, not just the moment.`,
        `${name}, I'm impressed by your choice. It takes courage to do the right thing under pressure.`,
        `The choice you made will help keep you safe and healthy. ${name}, you're building good habits.`,
        `${name}, choices like this help build the person you want to become.`
    ];

    const badMessages = [
        `${name}, I can see why that seemed appealing. But look at how it affects you. What could you do differently?`,
        `${name}, this consequence feels temporary, but choices like this can have lasting impacts.`,
        `${name}, are you making decisions based on pressure? What would be different if you thought ahead?`,
        `${name}, this path leads somewhere you probably don't want to go. But you can make a different choice next time.`
    ];

    const messages = choiceType === 'good' ? goodMessages : badMessages;
    return messages[Math.floor(Math.random() * messages.length)];
}

function updateWellbeingMeter() {
    const percentage = currentSession.wellbeing;
    document.getElementById('wellbeing-fill').style.width = percentage + '%';
    document.getElementById('wellbeing-text').textContent = percentage + '%';

    const fill = document.getElementById('wellbeing-fill');
    if (percentage >= 60) {
        fill.style.background = 'linear-gradient(90deg, #10b981 0%, #10b981 100%)';
    } else if (percentage >= 30) {
        fill.style.background = 'linear-gradient(90deg, #f59e0b 0%, #f59e0b 100%)';
    } else {
        fill.style.background = 'linear-gradient(90deg, #ef4444 0%, #ef4444 100%)';
    }
}

function handleNextQuestion() {
    const scenarioData = scenarios[currentSession.scenario];
    if (currentSession.currentQuestion < scenarioData.questions.length - 1) {
        currentSession.currentQuestion++;
        document.getElementById('result-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        displayQuestion();
    } else {
        showGameComplete();
    }
}

function showGameComplete() {
    document.getElementById('result-screen').classList.remove('active');
    const finalContent = `
        <div class="result-content">
            <h2>🎉 Journey Complete!</h2>
            <div class="consequence-box">
                <p><strong>${currentSession.clientName}</strong>, you've completed this decision-making journey.</p>
                <p style="margin-top: 15px;">You've seen how choices ripple out and affect your future. The real power is this: <strong>You get to make these choices every single day.</strong></p>
            </div>
            <div class="personalized-message">
                <p><strong>From your counselor:</strong> Let's talk about what you learned today and how you can use these insights in your real life.</p>
            </div>
            <button class="btn btn-primary" onclick="showCounselorDashboard()">Create Another Session</button>
        </div>
    `;
    document.getElementById('result-screen').innerHTML = finalContent;
    document.getElementById('result-screen').classList.add('active');
}