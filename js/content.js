/* ============================================================
   PromptForge — Content Data & Dynamic Rendering
   js/content.js
============================================================ */

/**
 * Topic definitions — all educational content lives here.
 * Each topic renders into a <section> via renderTopics().
 */
const TOPICS = [
  /* ────────────────────────────────────────────────────────
     01 — Introduction
  ──────────────────────────────────────────────────────── */
  {
    id: 'intro',
    num: '01',
    icon: '🧠',
    title: 'Introduction to Prompt Engineering',
    badge: { text: 'Beginner', cls: 'badge-green' },
    intro: `Prompt Engineering is the art and science of crafting precise, structured instructions (called <strong>prompts</strong>) to guide AI language models toward producing the exact output you need. Think of it as learning to communicate fluently with AI — the quality of your input directly determines the quality of the output.`,
    analogy: {
      title: '💡 Real-World Analogy',
      text: 'Giving a vague task to an intern vs. giving a detailed brief to a senior consultant. The AI is equally capable in both cases — but the detailed instruction produces vastly superior results.'
    },
    concepts: [
      { icon: '🎯', title: 'What is a Prompt?', text: 'Any text input sent to an LLM. It can be a question, instruction, example, or a combination of all three.' },
      { icon: '⚙️', title: 'Why PE Matters', text: 'The same model can give wildly different results from a slight change in wording. PE gives you control over that variance.' },
      { icon: '📈', title: 'Use Cases', text: 'Code generation, summarization, creative writing, data extraction, classification, customer support, and more.' },
      { icon: '🔬', title: 'Research Field', text: 'PE is now a dedicated research discipline with papers, certifications, and full-time engineering roles at AI companies.' },
    ],
    examples: [
      {
        label: 'Bad Prompt → Better Prompt',
        chat: [
          { role: 'user', text: '❌  Write something about climate.' },
          { role: 'ai',   text: 'Climate refers to the long-term patterns of temperature... [generic 3-line response]' },
          { role: 'user', text: '✅  You are an environmental journalist. Write a 150-word, punchy intro paragraph for a magazine article targeting millennials about the economic cost of climate inaction. Use an alarming statistic in the first sentence.' },
          { role: 'ai',   text: 'Inaction on climate change will cost the global economy $178 trillion by 2070 — roughly twice today\'s world GDP. For millennials, this isn\'t a distant number: it\'s the mortgage they\'ll never pay off, the pension fund that\'ll evaporate, and the coastal city that\'ll be underwater before retirement...' },
        ]
      }
    ],
    codeBlock: {
      lang: 'Prompt Template',
      code: `[ROLE]     You are a {role} with expertise in {domain}.
[CONTEXT]  The user is {context_about_user}.
[TASK]     {clear, specific instruction}
[FORMAT]   Respond in {format} with a max of {length}.
[TONE]     Use a {tone} tone.`
    }
  },

  /* ────────────────────────────────────────────────────────
     02 — Core Techniques
  ──────────────────────────────────────────────────────── */
  {
    id: 'core-techniques',
    num: '02',
    icon: '⚡',
    title: 'Core Prompting Techniques',
    badge: { text: 'Foundational', cls: 'badge-blue' },
    intro: `Before diving into advanced methods, mastering the fundamentals is essential. Great prompts share four key qualities: <strong>Clarity, Context, Constraints, and Completeness</strong> — the 4 Cs of effective prompting.`,
    concepts: [
      { icon: '🔍', title: 'Clarity', text: 'Use unambiguous language. Avoid pronouns with unclear referents and double-check your grammar.' },
      { icon: '📝', title: 'Context', text: 'Tell the model who it is, what the situation is, and who the audience is to dramatically focus its output.' },
      { icon: '📏', title: 'Constraints', text: 'Specify format (bullet list, JSON, markdown), length (words/sentences), and any exclusions.' },
      { icon: '✅', title: 'Completeness', text: 'Include all information needed to complete the task. Never assume the model "just knows" your situation.' },
    ],
    examples: [
      {
        label: 'Structured Prompt with All 4 Cs',
        chat: [
          { role: 'user', text: `ROLE: You are a senior product manager at a SaaS startup.
CONTEXT: Our B2B analytics tool just launched a new dashboard feature.
TASK: Write 3 LinkedIn post options announcing this launch to existing customers.
FORMAT: Each post must be under 200 words, use 2-3 emojis, end with a CTA.
TONE: Professional but excited, avoid buzzwords like "synergy" or "leverage".` },
          { role: 'ai', text: `Option 1 🚀📊
Your data just got a serious upgrade. Introducing SmartDash 2.0 — real-time KPI tracking, one-click reports, and a completely redesigned UI that cuts your weekly reporting time in half...

Option 2 📈✨
We heard your #1 request. Today we ship it. [...]

Option 3 💡🎯
Stop drowning in spreadsheets. Our new dashboard [...]` },
        ]
      }
    ],
    codeBlock: {
      lang: 'Python — Prompt Builder',
      code: `def build_prompt(role, context, task, fmt, tone):
    return f"""
ROLE: {role}
CONTEXT: {context}
TASK: {task}
FORMAT: {fmt}
TONE: {tone}
""".strip()

prompt = build_prompt(
    role="senior copywriter",
    context="user wants a product description for noise-cancelling headphones",
    task="write a 60-word product description",
    fmt="plain prose, no bullets",
    tone="sophisticated, premium"
)`
    }
  },

  /* ────────────────────────────────────────────────────────
     03 — Zero-Shot & Few-Shot
  ──────────────────────────────────────────────────────── */
  {
    id: 'few-shot',
    num: '03',
    icon: '🎯',
    title: 'Zero-Shot & Few-Shot Prompting',
    badge: { text: 'Intermediate', cls: 'badge-purple' },
    intro: `Two of the most powerful prompting paradigms differ only in whether you provide examples. <strong>Zero-shot</strong> gives the model a task with no examples, relying on its pre-trained knowledge. <strong>Few-shot</strong> provides 2–5 demonstrations before your actual request, teaching the pattern by example.`,
    table: {
      headers: ['Aspect', 'Zero-Shot', 'Few-Shot'],
      rows: [
        ['Examples provided', '❌ None', '✅ 2–5 examples'],
        ['Prompt length', 'Short', 'Medium–Long'],
        ['Best for', 'Common, well-defined tasks', 'Custom formats, niche tasks'],
        ['Consistency', 'Variable', 'High — model learns pattern'],
        ['Token cost', 'Low', 'Higher'],
        ['Recommended LLM', 'GPT-4 / Gemini Pro', 'Any capable model'],
      ]
    },
    examples: [
      {
        label: 'Zero-Shot: Sentiment Classification',
        chat: [
          { role: 'user', text: 'Classify the sentiment of this review as Positive, Negative, or Neutral:\n\n"The battery life is amazing but the camera is underwhelming."' },
          { role: 'ai',   text: 'Mixed (partially Positive, partially Negative)' },
        ]
      },
      {
        label: 'Few-Shot: Teaching a Custom Output Format',
        chat: [
          { role: 'user', text: `Extract the product name and price. Follow the exact format shown:

Review: "I bought the AeroGlide Pro last week for $129 and love it."
→ Product: AeroGlide Pro | Price: $129

Review: "Picked up the SoundWave Mini at just $49.99, great deal!"
→ Product: SoundWave Mini | Price: $49.99

Review: "Finally got the LumiDesk Standing Desk for $349 — worth every penny."
→` },
          { role: 'ai',   text: 'Product: LumiDesk Standing Desk | Price: $349' },
        ]
      }
    ]
  },

  /* ────────────────────────────────────────────────────────
     04 — Chain-of-Thought
  ──────────────────────────────────────────────────────── */
  {
    id: 'cot',
    num: '04',
    icon: '🔗',
    title: 'Chain-of-Thought Prompting',
    badge: { text: 'Intermediate', cls: 'badge-purple' },
    intro: `Chain-of-Thought (CoT) prompting instructs the model to <strong>reason step-by-step</strong> before giving a final answer. By showing its "thinking", the model dramatically reduces errors on tasks requiring logic, math, or multi-step reasoning. Simply adding <em>"Let's think step by step"</em> can boost accuracy by 40%+ on complex benchmarks.`,
    concepts: [
      { icon: '🧩', title: 'Standard CoT', text: 'Instruct the model to break down its reasoning. "Think step by step" is the minimal trigger phrase.' },
      { icon: '🎓', title: 'CoT Few-Shot', text: 'Provide 1-2 fully worked examples with reasoning chains before your target question.' },
      { icon: '🔄', title: 'Self-Consistency', text: 'Generate multiple CoT paths, then select the most common final answer to reduce hallucination.' },
      { icon: '✏️', title: 'Zero-Shot CoT', text: 'Just append "Let\'s think step by step." to any prompt — fast, zero examples needed.' },
    ],
    examples: [
      {
        label: 'CoT — Multi-Step Math Problem',
        chat: [
          { role: 'user', text: `A train travels from City A to City B at 80 km/h. The return journey is at 120 km/h. What is the average speed for the entire round trip? Think step by step.` },
          { role: 'ai',   text: `Step 1: Let the distance from A to B = D km.

Step 2: Time for A→B journey: t₁ = D/80 hours.

Step 3: Time for B→A journey: t₂ = D/120 hours.

Step 4: Total distance = 2D. Total time = D/80 + D/120.

Step 5: Find common denominator: D/80 + D/120 = 3D/240 + 2D/240 = 5D/240.

Step 6: Average speed = 2D ÷ (5D/240) = 2D × 240/(5D) = 480/5 = 96 km/h.

✅ Answer: The average speed is 96 km/h.` },
        ]
      }
    ],
    codeBlock: {
      lang: 'CoT Prompt Template',
      code: `# Pattern 1 — Zero-Shot CoT
"{Your complex question}. Let's think step by step."

# Pattern 2 — Few-Shot CoT
Q: If I have 3 apples and buy 2 bags of 4 each, how many total?
A: I start with 3 apples. Each bag has 4, so 2 bags = 8 apples.
   Total = 3 + 8 = 11 apples.

Q: {your target question}
A: Let's work through this carefully.`
    }
  },

  /* ────────────────────────────────────────────────────────
     05 — Role Prompting
  ──────────────────────────────────────────────────────── */
  {
    id: 'role-prompting',
    num: '05',
    icon: '🎭',
    title: 'Role Prompting & Persona Engineering',
    badge: { text: 'Intermediate', cls: 'badge-cyan' },
    intro: `Role prompting assigns the model a specific identity, profession, or personality, dramatically shifting the style, depth, and framing of its responses. When combined with detailed persona attributes, you can create consistent AI assistants that maintain a voice across an entire conversation.`,
    concepts: [
      { icon: '👔', title: 'Professional Persona', text: 'Assign expert roles: "You are a Harvard-trained cardiologist" focuses medical advice at the right depth.' },
      { icon: '🌍', title: 'Cultural / Audience Persona', text: 'Match the voice to the audience: "Write as a Gen-Z social media manager" changes tone, slang, and format.' },
      { icon: '⚙️', title: 'System Prompts', text: 'In API/chat settings, the system message is the ideal place for persistent persona instructions.' },
      { icon: '🎮', title: 'Character Simulation', text: 'For creative writing or education, roleplay as historical figures, fictional characters, or custom agents.' },
    ],
    examples: [
      {
        label: 'Before & After: Role Assignment',
        chat: [
          { role: 'user', text: '❌ Without role: Explain recursion.' },
          { role: 'ai',   text: 'Recursion is a programming technique where a function calls itself...' },
          { role: 'user', text: '✅ With role: You are a patient, enthusiastic coding mentor known for using brilliant real-world analogies. Explain recursion to a 12-year-old who loves Lego.' },
          { role: 'ai',   text: 'Imagine you\'re building a massive Lego castle, but it\'s too big to see all at once. So you break it into towers. Each tower is too big, so you break it into floors. Each floor into rooms. Each room into walls. Each wall into individual bricks. That\'s recursion! You solve a big problem by solving smaller and smaller versions of the same problem, until you hit the smallest piece — the single brick — that you can handle directly. 🧱' },
        ]
      }
    ],
    codeBlock: {
      lang: 'System Prompt — API (OpenAI / Gemini format)',
      code: `{
  "system": "You are ARIA, an empathetic AI career coach specializing
  in tech industry job transitions. You have 15 years of experience at
  FAANG companies. You ask clarifying questions before giving advice,
  use bullet points for action items, and always end responses with
  one encouraging sentence. Never give generic advice.",

  "user": "I'm a 5-year backend developer who wants to move into ML.
  Where do I start?"
}`
    }
  },

  /* ────────────────────────────────────────────────────────
     06 — Advanced Strategies
  ──────────────────────────────────────────────────────── */
  {
    id: 'advanced',
    num: '06',
    icon: '🚀',
    title: 'Advanced Prompting Strategies',
    badge: { text: 'Advanced', cls: 'badge-pink' },
    intro: `Beyond basic prompting, several powerful frameworks have emerged from research labs. These strategies tackle complex, multi-step problems by adding <strong>deliberate structure</strong> to the model's reasoning process.`,
    concepts: [
      { icon: '🌳', title: 'Tree of Thought (ToT)', text: 'The model explores multiple reasoning branches simultaneously, backtracking from dead ends — like a chess player considering multiple moves.' },
      { icon: '⚛️', title: 'ReAct Framework', text: 'Combines Reasoning and Acting — the model interleaves thinking steps with tool calls (search, code execution) to solve real-world tasks.' },
      { icon: '📊', title: 'Least-to-Most Prompting', text: 'Decompose complex problems into ordered sub-problems, solving the simplest first and building up to the final answer.' },
      { icon: '🔁', title: 'Self-Refine', text: 'Ask the model to generate an answer, then critique its own output, then revise — producing dramatically better results with no human in the loop.' },
      { icon: '🗂️', title: 'Directional Stimulus', text: 'Provide a "hint" or keyword to steer the model in the direction you want without fully constraining it.' },
      { icon: '🤖', title: 'Meta-Prompting', text: 'Ask the model to write or improve its own prompt — "Given this task, write the optimal prompt to accomplish it."' },
    ],
    examples: [
      {
        label: 'ReAct Framework — Step-by-step',
        chat: [
          { role: 'user', text: 'Using the ReAct pattern, help me research and summarize recent breakthroughs in quantum computing.' },
          { role: 'ai',   text: `Thought: I need to find recent quantum computing breakthroughs. I'll search for news from the last 6 months.
Action: search("quantum computing breakthroughs 2024 2025")
Observation: Found results about IBM Condor 1000-qubit processor, Google's error correction milestone, Microsoft's topological qubits...

Thought: I have enough data. Let me synthesize the top 3 breakthroughs.
Action: synthesize(findings)
Observation: Three distinct breakthroughs identified in hardware, error-correction, and software layers.

Final Answer: The three biggest quantum computing breakthroughs are: (1) IBM's 1000+ qubit Condor processor reaching a new scale milestone, (2) Google demonstrating below-threshold quantum error correction, and (3) Microsoft's topological qubit design achieving stability improvements...` },
        ]
      }
    ],
    codeBlock: {
      lang: 'Tree of Thought — Prompt Template',
      code: `Imagine three different experts are answering this question.
All experts will write down one step of their thinking, then
share it with the group. Then all experts continue to the next step.
If any expert realises they are wrong at any point, they leave.

The question is: {your complex question}

Begin with the first step from each expert.`
    }
  },

  /* ────────────────────────────────────────────────────────
     07 — Optimization Tips
  ──────────────────────────────────────────────────────── */
  {
    id: 'optimization',
    num: '07',
    icon: '🔧',
    title: 'Prompt Optimization & Best Practices',
    badge: { text: 'Pro Tips', cls: 'badge-green' },
    intro: `Writing effective prompts is an iterative process. These battle-tested best practices will help you refine your prompts faster, reduce token waste, and get consistently high-quality outputs from any model.`,
    checklist: [
      'Start with a clear **action verb** — summarize, classify, generate, translate, extract.',
      'Be **specific about format** — JSON, markdown table, numbered list, prose paragraph.',
      'Use **delimiters** (triple backticks, XML tags) to separate data from instructions.',
      'State what you **don\'t want** explicitly — "Do not include personal opinions."',
      'Ask the model to **explain its reasoning** when correctness matters.',
      'Use **temperature = 0** for deterministic, factual tasks; higher for creative ones.',
      'Test with **at least 5 different inputs** before finalizing a prompt for production.',
      'Break long, multi-step tasks into a **prompt chain** — smaller sequential prompts.',
    ],
    dodonts: {
      dos: [
        'Provide examples of the exact output format you want',
        'Specify the target audience ("for a 10-year-old", "for a CTO")',
        'Tell the model what to do when it\'s uncertain',
        'Iterate — treat prompts like code: write, test, refine',
        'Use structured data formats (JSON, XML) for complex inputs',
      ],
      donts: [
        'Use vague quantifiers ("write a lot about", "explain briefly")',
        'Stack contradictory instructions in the same prompt',
        'Assume the model knows your private context or jargon',
        'Ignore model output warnings and hallucination signals',
        'Use the same prompt for very different models without adapting',
      ]
    }
  },
];

/* ============================================================
   Renderer
============================================================ */
function renderTopics() {
  const container = document.getElementById('topics-container');
  if (!container) return;

  TOPICS.forEach((topic) => {
    const section = document.createElement('section');
    section.id = topic.id;
    section.className = 'topic-section';
    section.setAttribute('data-topic', topic.num);

    let html = `
      <div class="topic-header reveal">
        <div class="section-label">${topic.num} — ${topic.badge ? `<span class="badge ${topic.badge.cls}">${topic.badge.text}</span>` : ''}</div>
        <h2>${topic.icon} ${topic.title}</h2>
        <p>${topic.intro}</p>
      </div>
    `;

    /* Analogy box */
    if (topic.analogy) {
      html += `
        <div class="info-box note reveal">
          <div class="icon-box">💬</div>
          <div class="box-content">
            <h4>${topic.analogy.title}</h4>
            <p>${topic.analogy.text}</p>
          </div>
        </div>`;
    }

    /* Concept grid */
    if (topic.concepts) {
      html += `
        <div class="subsection">
          <h3><span class="icon">⚡</span> Core Concepts</h3>
          <div class="concept-grid stagger reveal">
            ${topic.concepts.map(c => `
              <div class="concept-card">
                <span class="card-icon">${c.icon}</span>
                <h4>${c.title}</h4>
                <p>${c.text}</p>
              </div>
            `).join('')}
          </div>
        </div>`;
    }

    /* Comparison table */
    if (topic.table) {
      html += `
        <div class="subsection reveal">
          <h3><span class="icon">📊</span> Comparison</h3>
          <div class="glass-card" style="overflow:auto;">
            <table class="cmp-table">
              <thead><tr>${topic.table.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
              <tbody>
                ${topic.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    }

    /* Chat examples */
    if (topic.examples) {
      html += `<div class="subsection"><h3><span class="icon">💬</span> Interactive Examples</h3>`;
      topic.examples.forEach(ex => {
        html += `
          <p class="section-label" style="margin-top:12px;">${ex.label}</p>
          <div class="chat-container reveal">
            ${ex.chat.map(msg => `
              <div class="bubble ${msg.role}">
                <span class="role-tag">${msg.role === 'user' ? '👤 Prompt' : '🤖 AI Response'}</span>
                <div class="bubble-content">${msg.text.replace(/\n/g, '<br>')}</div>
              </div>
            `).join('')}
          </div>`;
      });
      html += `</div>`;
    }

    /* Code block */
    if (topic.codeBlock) {
      html += `
        <div class="subsection reveal">
          <h3><span class="icon">📟</span> Template / Code</h3>
          <div class="code-block">
            <div class="code-header">
              <div class="dots"><span></span><span></span><span></span></div>
              <span class="lang-tag">${topic.codeBlock.lang}</span>
            </div>
            <pre>${escapeHtml(topic.codeBlock.code)}</pre>
          </div>
        </div>`;
    }

    /* Do / Don't */
    if (topic.dodonts) {
      html += `
        <div class="subsection reveal">
          <h3><span class="icon">⚖️</span> Do's & Don'ts</h3>
          <div class="do-dont-grid">
            <div class="do-card">
              <h4>✅ Do</h4>
              <ul>${topic.dodonts.dos.map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
            <div class="dont-card">
              <h4>❌ Don't</h4>
              <ul>${topic.dodonts.donts.map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
          </div>
        </div>`;
    }

    /* Checklist */
    if (topic.checklist) {
      html += `
        <div class="subsection reveal">
          <h3><span class="icon">📋</span> Optimization Checklist</h3>
          <ul class="checklist">
            ${topic.checklist.map(item => `
              <li>
                <span class="chk">✓</span>
                <span>${item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</span>
              </li>
            `).join('')}
          </ul>
        </div>`;
    }

    section.innerHTML = html;
    container.appendChild(section);
  });
}

/* Helper: escape HTML entities for code blocks */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* Run on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', renderTopics);
