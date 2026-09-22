/**
 * Pitch Questions Definition
 *
 * Grouped questions for product clarity and MVP scoping.
 * Each question has a stable ID that won't change between versions.
 */

export interface PitchQuestion {
  id: string // Stable ID for migration tracking
  question: string
  placeholder?: string
  hint?: string
}

export interface PitchSection {
  id: string
  title: string
  description?: string
  questions: PitchQuestion[]
}

export const PITCH_SECTIONS: PitchSection[] = [
  {
    id: 'mvp-questions',
    title: 'MVP Questions',
    description: 'What\'s the idea, the problem, and why it matters',
    questions: [
      {
        id: 'mvp-whats-the-idea',
        question: 'What\'s the idea?',
        placeholder: 'Describe your product in 1-2 sentences...',
      },
      {
        id: 'mvp-problem',
        question: 'What problem does it solve?',
        placeholder: 'What pain point are you addressing?',
      },
      {
        id: 'mvp-who-has-problem',
        question: 'Who has this problem?',
        placeholder: 'Who experiences this pain point?',
      },
      {
        id: 'mvp-key-outcome',
        question: 'What\'s the key outcome?',
        placeholder: 'What changes for the better when someone uses this?',
      },
      {
        id: 'mvp-current-solution',
        question: 'How do they solve it today?',
        placeholder: 'Workarounds, existing solutions, or just living with it...',
      },
      {
        id: 'mvp-different',
        question: 'What makes your approach better or different?',
        placeholder: 'Your unique angle or advantage...',
      },
      {
        id: 'mvp-needs-to-be-true',
        question: 'What needs to be true for this idea to work?',
        placeholder: 'Assumptions, dependencies, required behaviours...',
      },
      {
        id: 'mvp-simplest-test',
        question: 'What\'s the simplest experience that could test that?',
        placeholder: 'Minimum viable experiment to validate key assumptions...',
      },
      {
        id: 'mvp-how-would-we-know',
        question: 'How would we know if it worked?',
        placeholder: 'Success metrics, signals, or evidence...',
      },
    ],
  },
  {
    id: 'user-experience',
    title: 'User Experience',
    description: 'Outcomes, feelings, and anti-patterns',
    questions: [
      {
        id: 'ux-top-outcomes',
        question: 'What are the top outcomes we must achieve?',
        placeholder: 'The 3-5 things that must work for this to succeed...',
      },
      {
        id: 'ux-could-do-before',
        question: 'What should the user be able to do that they couldn\'t easily do before?',
        placeholder: 'New capabilities unlocked...',
      },
      {
        id: 'ux-amazing-moment',
        question: 'What is the moment where the user thinks, "This is amazing"?',
        placeholder: 'The delight point, the aha moment...',
      },
      {
        id: 'ux-product-feel-like',
        question: 'What should using this product feel like?',
        placeholder: 'Fast? Magical? Simple? Powerful? Trustworthy?',
      },
      {
        id: 'x-effortless',
        question: 'What should feel effortless?',
        placeholder: 'Friction points to eliminate...',
      },
      {
        id: 'ux-fast-or-immediate',
        question: 'What should feel fast or immediate?',
        placeholder: 'Speed expectations to set...',
      },
      {
        id: 'ux-want-to-come-back',
        question: 'What would make someone want to come back?',
        placeholder: 'Habits, value loops, reasons to return...',
      },
      {
        id: 'ux-tell-another-person',
        question: 'What would make someone tell another person about it?',
        placeholder: 'Shareable moments, talkable features...',
      },
      {
        id: 'ux-not-required',
        question: 'What is not required in this product?',
        placeholder: 'Things we\'re deliberately excluding...',
      },
      {
        id: 'ux-poor-experience',
        question: 'What is a poor experience?',
        placeholder: 'What "done badly" looks like (so we avoid it)...',
      },
      {
        id: 'ux-never-feel-like',
        question: 'What must this product never feel like?',
        placeholder: 'Anti-patterns to avoid at all costs...',
      },
      {
        id: 'ux-friction-ruin-it',
        question: 'What friction would ruin it?',
        placeholder: 'Deal-breakers, frustration points...',
      },
      {
        id: 'ux-never-have-to-do',
        question: 'What should the user never have to do?',
        placeholder: 'Things we should handle for them...',
      },
      {
        id: 'ux-deliberately-leave-out',
        question: 'What should we deliberately leave out?',
        placeholder: 'Feature boundaries, scope limits...',
      },
    ],
  },
  {
    id: 'features-scope',
    title: 'Features & Scope',
    description: 'Signature features and what to build when',
    questions: [
      {
        id: 'fs-unique',
        question: 'What makes this product unique?',
        placeholder: 'Your secret sauce...',
      },
      {
        id: 'fs-describe-to-others',
        question: 'What feature or experience would people describe when telling someone else about it?',
        placeholder: 'The one thing they\'d mention...',
      },
      {
        id: 'fs-stops-feeling-special',
        question: 'If we removed one thing and the product stopped feeling special, what would it be?',
        placeholder: 'The essence, the core differentiator...',
      },
      {
        id: 'fs-pre-launch-must-exist',
        question: 'What must exist for the core experience to work?',
        placeholder: 'Non-negotiable features for V1...',
      },
      {
        id: 'fs-comfortable-putting-in-hands',
        question: 'What must exist before we\'re comfortable putting this in someone\'s hands?',
        placeholder: 'Quality bar, polish, reliability...',
      },
      {
        id: 'fs-post-launch-add',
        question: 'What do we want to add once people are using it?',
        placeholder: 'V1.1, V1.2 features informed by real usage...',
      },
      {
        id: 'fs-valuable-with-real-users',
        question: 'What becomes valuable once we have real users, data or feedback?',
        placeholder: 'Network effects, learning loops...',
      },
      {
        id: 'fs-if-this-succeeds',
        question: 'If this succeeds, where could we take it?',
        placeholder: 'V2, V3 vision...',
      },
      {
        id: 'fs-exciting-but-distract',
        question: 'What ideas are exciting but shouldn\'t distract V1?',
        placeholder: 'Backlog, later phase ideas...',
      },
      {
        id: 'fs-eventually-become',
        question: 'What could this product eventually become?',
        placeholder: 'North star vision...',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Customer, value, revenue, and growth',
    questions: [
      {
        id: 'biz-who-pays',
        question: 'Who actually pays for this?',
        placeholder: 'The economic buyer...',
      },
      {
        id: 'biz-payer-vs-user',
        question: 'Is the person paying the same person using it?',
        placeholder: 'Market dynamics, stakeholders...',
      },
      {
        id: 'biz-paying-for',
        question: 'What are they actually paying for?',
        placeholder: 'The value unit, the delivered outcome...',
      },
      {
        id: 'biz-currently-paying',
        question: 'How is the customer currently paying to solve this problem?',
        placeholder: 'Current spend, alternatives, workarounds...',
      },
      {
        id: 'biz-why-pay-instead',
        question: 'Why would they pay instead of continuing with their current solution?',
        placeholder: 'ROI justification, switching motivation...',
      },
      {
        id: 'biz-more-valuable-over-time',
        question: 'What becomes more valuable as they keep using the product?',
        placeholder: 'Value accumulation, retention drivers...',
      },
      {
        id: 'biz-how-make-money',
        question: 'How does this product make money?',
        placeholder: 'Revenue model...',
      },
      {
        id: 'biz-when-pay',
        question: 'When does the customer pay?',
        placeholder: 'Timing in the lifecycle...',
      },
      {
        id: 'biz-revenue-model',
        question: 'Is it subscription, one-off, usage, transaction, advertising, licensing or something else?',
        placeholder: 'Revenue structure...',
      },
      {
        id: 'biz-multiple-revenue-streams',
        question: 'Could there be multiple revenue streams?',
        placeholder: 'Additional monetization opportunities...',
      },
      {
        id: 'biz-natural-way-charge',
        question: 'What feels like a natural way to charge for it?',
        placeholder: 'Pricing that fits the value proposition...',
      },
      {
        id: 'biz-what-would-be-free',
        question: 'What would be free?',
        placeholder: 'Free tier, trial, freemium...',
      },
      {
        id: 'biz-upgrade-or-pay-more',
        question: 'What would make someone upgrade or pay more?',
        placeholder: 'Upgrade drivers, pricing tiers...',
      },
      {
        id: 'biz-pricing-models-to-test',
        question: 'What pricing models do we need to test?',
        placeholder: 'Experiments to run...',
      },
      {
        id: 'biz-economically-true',
        question: 'What needs to be economically true for this product to be profitable?',
        placeholder: 'Unit economics, margins, break-even...',
      },
      {
        id: 'biz-better-as-more-people-use',
        question: 'What gets better as more people use this?',
        placeholder: 'Network effects, data advantages, scale...',
      },
      {
        id: 'biz-difficult-to-copy',
        question: 'What would make this difficult to copy?',
        placeholder: 'Moats, barriers to entry...',
      },
      {
        id: 'biz-invites-non-users',
        question: 'What features invite non-users into the app?',
        placeholder: 'Viral loops, sharing mechanisms...',
      },
    ],
  },
]

// Map question IDs to their section for easy lookup
export const QUESTION_ID_TO_SECTION: Record<string, string> = {}
for (const section of PITCH_SECTIONS) {
  for (const question of section.questions) {
    QUESTION_ID_TO_SECTION[question.id] = section.id
  }
}
