import dittoJoin from "@/assets/case-studies/ditto-join.jpg";
import dittoLobby from "@/assets/case-studies/ditto-lobby.jpg";
import dittoRound from "@/assets/case-studies/ditto-round.jpg";
import dittoResults from "@/assets/case-studies/ditto-results.jpg";
import fsfHero from "@/assets/case-studies/fsf-hero.jpg";
import fsfIntake from "@/assets/case-studies/fsf-intake.jpg";
import fsfVerdict from "@/assets/case-studies/fsf-verdict.jpg";

export type Shot = { src: string; alt: string; caption: string };

export type InlineLink = { leading: string; label: string; href: string; trailing: string };
export type BodyEntry = string | InlineLink;

export type Stage = {
  key: string;
  label: string;
  heading: string;
  body: BodyEntry[];
  points?: { title: string; body: string }[];
  media?: { kind: "phones" | "screens"; shots: Shot[] };
};

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  teaser: string;
  hue: string;
  link?: { label: string; href: string };
  stages: Stage[];
};


export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ai-household-retention",
    title: "First product manager in an AI household app, mid launch",
    kicker: "Early stage AI household management startup, iOS and Android",
    teaser:
      "Signup spikes were being read as success. I brought in tracking, a live feedback loop and sprint governance, and moved the team onto retention.",
    hue: "150",
    stages: [
      {
        key: "context",
        label: "Context",
        heading: "I walked in mid launch, with no roadmap to inherit",
        body: [
          "I joined an early stage AI household management startup as its first dedicated product manager, in the middle of a launch. Product direction was fragmented, the roadmap was unwritten, and performance was being judged on signup spikes rather than usage that lasts.",
          "The mobile app shipped on iOS and Android, and reliability bugs plus onboarding friction were quietly costing us trust. Marketing and growth were pushing hard on a funnel with no retention foundation under it.",
        ],
      },
      {
        key: "discovery",
        label: "Discovery",
        heading: "I went after the ambiguity from both sides",
        body: [
          "All metrics came from backend admin dashboards. I brought in PostHog from scratch, audited event logs, fixed corrupted metrics and set up behavioural tracking so we could see the full activation funnel instead of totals.",
          "The numbers then said something uncomfortable. Onboarding completion sat around 90 percent, yet over 70 percent of household accounts stayed single user, which meant the multi member retention loop the product depends on was never starting.",
          "For the qualitative side I revived the dormant community expert program: sourced domain experts globally, worked with marketing on monthly themes, and sat in every session to hear users unfiltered. That is where the real insight came from. Mental load is not one big problem. It is layered, so we could cut real friction with targeted micro redesigns inside workflows we already shipped, instead of waiting on complex unreleased builds.",
        ],
      },
      {
        key: "decisions",
        label: "Key decisions",
        heading: "What I changed, and what I defended",
        points: [
          {
            title: "A North Star metric the team could argue about",
            body: "I drove the conversation around the North Star metric and moved focus from top of funnel acquisition to retention: multi member household activation within seven days. Core actions counted as usage. Opening the app did not.",
          },
          {
            title: "A feedback loop where there was no CX team",
            body: "I built a central user feedback tracker, mapped incoming qualitative signals against strategic priorities, and recorded explicitly what we chose to build and what we pushed back on.",
          },
          {
            title: "Engineering in the room early",
            body: "Engineers joined sprint planning and roadmapping, and we prioritised with value versus effort. Notification delivery, capture reliability and onboarding walkthroughs came before new surface area.",
          },
          {
            title: "Governance that survived launch pressure",
            body: "Structured Jira workflow with explicit PostHog event tracking specs on tickets, and developer capacity mapped against technical debt so delivery stayed predictable.",
          },
        ],
        body: [],
      },
      {
        key: "takeaway",
        label: "Takeaway",
        heading: "The job is steering outcomes in ambiguity, not shipping output",
        body: [
          "Building the analytics from scratch, opening a direct line to users, defending foundational reliability and keeping founders, engineering and marketing aligned all pointed at the same thing: the high impact work is turning messy user and operational signals into focused, build ready execution.",
          "The most reusable artefact was a written definition of every term we used, so two people saying the same word finally meant the same thing.",
        ],
      },
    ],
  },

  {
    slug: "first-sale-finder",
    title: "First Sale Finder, an AI product allowed to say no",
    kicker: "Pre launch, sole PM and builder",
    teaser:
      "A generative research product whose differentiator is that it will disappoint you, plus the evaluation system that keeps it honest.",
    hue: "195",
    link: { label: "Read the full case study", href: "https://medium.com/@sukatfavour" },
    stages: [
      {
        key: "context",
        label: "Context",
        heading: "Every tool in this category is paid to say yes",
        body: [
          "There is a large, continuously refreshed group of people who bought an e-commerce course, finished it, and stopped. They know Shopify, suppliers and ads, and still cannot answer the question the course skipped: what should I actually sell.",
          "Courses sell optimism. Winning product tools sell scraped trend lists with confidence bars. Both are incentivised to approve whatever you type in, because a no ends the relationship. The unoccupied position was the honest one: a tool that tells you the idea is weak, why, and what evidence would change its mind.",
          "It is commercially uncomfortable, because you are choosing to disappoint a share of your users on purpose. It is also defensible, because no incumbent can copy it without undermining their own funnel. This is a working prototype, not a live product yet, built to test the thesis that an AI tool is more useful when it is allowed to say no.",
        ],
        media: {
          kind: "screens",
          shots: [
            {
              src: fsfHero,
              alt: "First Sale Finder landing page reading Watched the course but still don't know what to sell",
              caption: "The promise is honesty in three minutes, not encouragement.",
            },
          ],
        },

      },
      {
        key: "discovery",
        label: "Discovery",
        heading: "One question I forgot to ask was poisoning every report",
        body: [
          "There is a huge population of course-stuck beginners out there. They paid hundreds for a course, learned how to build a store, and then froze on the one question the guru skipped: what do I actually sell? That is the wedge, and every existing tool sells them cheap optimism, because a no ends the business model.",
          "Then I built the prototype and found out I had the users wrong. I assumed everyone arrives with one product in mind. They do not. They arrive in four completely different mental states: one idea and they want a verdict, two ideas and they are paralysed, a niche with no product yet, or a dead product that already cost them money. My intake asked all four of them the same fixed questions.",
          "So someone who told me they had no product idea was still being asked what type of product it is and who buys it. In a normal app that is a mildly annoying form field. In a generative product it is poison. Those invented answers went straight into web search and the platform rules lookup, so the system did real grounded research on a product that did not exist and handed back a confident, beautiful, completely wrong report.",
          "Fixing it meant rebuilding the intake as a branching engine. The niche path now runs a fast pre-pass that generates candidate products first, then researches candidate one. The failed-attempt path flips entirely: the dead product becomes an avoid-list, and I ask what they want to try next instead. Intake design was not a UI tweak here. It was my main quality lever.",
        ],

        media: {
          kind: "screens",
          shots: [
            {
              src: fsfIntake,
              alt: "First Sale Finder intake asking which of five situations the user is in",
              caption: "One question decides which of five paths the whole report is built on.",
            },
          ],
        },

      },
      {
        key: "decisions",
        label: "Key decisions",
        heading: "Building an AI product people can actually trust",
        body: [
          "Honesty was the constraint I designed around. The system prompt bans guaranteed profit claims, forbids the phrase winning product, and forces the system to admit when it has no data instead of inventing a number. These three calls are what keep it honest.",
        ],
        points: [
          {
            title: "A one-page PDF, so the limits live in the prompt",
            body: "I chose a fixed one-page report over a web dashboard, which meant an unbounded model output pointing at a bounded page. That ends in broken layout every time unless you deal with it. So the prompt itself carries hard per-field character limits, and the renderer drops whole sentences rather than clipping mid-word. The constraint made the writing sharper too.",
          },
          {
            title: "Verified rules outrank the model's memory",
            body: "An early report hedged on whether an individual can open a TikTok Shop in the UK. That is a knowable fact and the model was guessing from stale training data. So I built a curated knowledge base of seller rules by platform and country, and ranked it above live search, which ranks above the model's own reasoning. Verified first, live search for volatile market stuff, model memory last.",
          },
          {
            title: "Admin telemetry for AI health, not vanity metrics",
            body: "Watching conversion before the system is reliable is a trap when every single run costs you money. My admin dashboard tracks schema-parse failure rate, grounded-claim ratio, latency and token cost per report, split by intake branch. That is how I catch a prompt regression early and know whether the paid product still has a margin.",
          },
        ],
      },

      {
        key: "takeaway",
        label: "Takeaway",
        heading: "When satisfaction and correctness disagree, the rubric wins",
        body: [
          "A report that says avoid this, with three good reasons, will be rated poorly by the person who wanted a yes, and that is the product doing its single most valuable job. Any metric design that punishes that outcome turns the tool into the hype machine it was built to replace.",
          "So satisfaction sits on three layers and none of them is a star rating: behavioural proxies including whether someone ran a second idea, one direct question asking whether the report was honest and useful rather than whether they liked it, and a hand-scored set of canonical intakes run against every prompt version and graded on honesty, specificity, groundedness and actionability.",
          "Bug also splits into three things here. A blank page is broken code. A wrong platform fee is a retrieval failure. A report that is accurate but bland is a quality failure with no stack trace at all. Conflating them is how teams spend a week tuning a prompt to fix a database problem.",
          "The metric in the product's name, whether someone made a first sale, is slow, self reported and mostly outside my control. I ask for it and treat it as directional evidence, because optimising a proxy and calling it impact is the real failure mode.",
        ],
        media: {
          kind: "screens",
          shots: [
            {
              src: fsfVerdict,
              alt: "A First Sale Finder verdict scoring an idea 50 out of 100 and labelling it risky for a beginner",
              caption: "Fifty out of a hundred, risky for a beginner, with the reasons broken out. This is the feature.",
            },
          ],
        },

      },
    ],
  },
  {
    slug: "ditto-social-game",
    title: "Ditto!, a sixty second two player game",
    kicker: "Live, real time PWA",
    teaser:
      "Shipped a real time web game, then switched finished features off at launch to protect the one synchronous moment the product is about.",
    hue: "175",
    link: { label: "Play Ditto!", href: "https://project-unfold-build.lovable.app" },
    stages: [
      {
        key: "context",
        label: "Context",
        heading: "It started as a would you rather call with a friend",
        body: [
          "A friend and I were on a call throwing impossible would you rather questions at each other. Chew a paracetamol tablet or gulp a raw egg. We were laughing, and then the product manager in me started taking notes on why it worked so well.",
          "The magic was in three things. An absurd dilemma, zero real world risk, and that little jolt when you find out where you perfectly sync with someone and where you completely split.",
          "That call became a weekend build. ",
          {
            leading: "",
            label: "Ditto!",
            href: "https://project-unfold-build.lovable.app",
            trailing:
              " is a live two player game. The host creates a room, sets the questions, both players answer each card on a shared timer, and at the end the app shows exactly where your minds met and where they went separate ways. No right answers, just preferences.",
          },
        ],

        media: {
          kind: "phones",
          shots: [
            {
              src: dittoJoin,
              alt: "Ditto! start screen offering create a room or join with a code",
              caption: "Two taps from a link to a game. No account, nothing to install.",
            },
          ],
        },

      },
      {
        key: "discovery",
        label: "Discovery",
        heading: "My friend was my first tester and my QA",
        body: [
          "We played it over and over, and I watched where attention broke instead of asking what he thought of it. Fairness turned out to be the thing that breaks the moment, not the content. When the timer drifts between two phones, the shared card feels rigged.",
          "Our wish list got long fast, and almost all of it would have made the game slower to start. So I held a hard MVP line. That was the reminder that you do not always have to reinvent the wheel. Sometimes product thinking is productising something that already exists and catching one specific human emotion.",
          "When friends tried it, the feedback was what I hoped for. Simple, fun, that quick thrill of racing a clock, then the surprise of learning something new about someone you thought you knew. Content did run dry after one sitting, so deck generation from any topic went in as the one real addition.",
        ],

        media: {
          kind: "phones",
          shots: [
            {
              src: dittoLobby,
              alt: "Ditto! lobby with a four character room code and two players joined",
              caption: "A code to get into the room, no signup needed to play.",
            },
            {
              src: dittoRound,
              alt: "A Ditto! dilemma card with the shared sixty second timer running",
              caption: "One card, one clock, both phones agreeing.",
            },
          ],
        },

      },
      {
        key: "decisions",
        label: "Key decisions",
        heading: "Three calls that decided whether anyone would ever play",
        body: [
          "Every one of these came out of watching my friends play, not from a strategy doc.",
        ],
        points: [
          {
            title: "I killed signups so people could just play",
            body: "The first build had accounts so you could save and manage your own decks. I loved that feature. Then I watched friends hit the signup screen and stall. Nobody creates an account and verifies an email to try a game once. So I cut it, and built a four digit room code instead: open the app, type the code, you are playing in seconds. Losing saved decks hurt, but instant play is what carried the game to its first 100 players.",
          },
          {
            title: "Ditto and Miss had to go",
            body: "I named the match state Ditto because it matched the app name and felt clever to me. It was not clever to anyone else. New players hesitated because they did not know what Ditto meant, and Miss made a simple difference in taste sound like a failure. Testers said it plainly, so the game now says Match, Split and Skip. The recap puts both answers side by side, and that is where people stop to laugh and argue about why they picked what they picked.",
          },
          {
            title: "Designed for buses, bad signal and real life",
            body: "Mobile play gets interrupted, so I built for it. The turn timer caps between 5 and 20 seconds and defaults to 10: under 5 people panic and mis-tap, over 20 the whole thing drags. When the host pauses, the card hides itself so nobody can pause to think their way to a match. And when a guest's connection drops, the round pauses instead of dying, and they come back in on the same code with the score intact.",
          },
        ],
      },

      {
        key: "takeaway",
        label: "Takeaway",
        heading: "Every feature exists to protect one synchronous moment",
        body: [
          "Pause and resume, the host timer, the last-chance recycle of skipped cards and the result recap are not features in their own right. They exist so the shared sixty seconds feels fair to both people.",
          "The metrics I watch reflect that. Rooms created organically, invite conversion from a shared code, play-again rate within a session, and sync latency from host start to guest screen change. Reports generated and cards answered are ops telemetry, not product health.",
          "The mid-term questions are honest ones: an asynchronous mode for people not online together, three and four player rooms, and whether monetisation belongs here at all, given return visits are the metric I am still earning rather than assuming.",
        ],
        media: {
          kind: "phones",
          shots: [
            {
              src: dittoResults,
              alt: "Ditto! results screen showing a Sync between two players",
              caption: "The whole product is this screen. Everything else protects it.",
            },
          ],
        },

      },
    ],
  },
  {
    slug: "flo-health-teardown",
    title: "Scale versus sentiment, a teardown of Flo Health",
    kicker: "Product teardown, 1,442 reviews",
    teaser:
      "A category leader with 77 million users is outrunning its own user trust. I read the reviews, tested the onboarding, and priced the fix.",
    hue: "210",
    link: {
      label: "Read the full teardown",
      href: "https://florentine-carob-c8a.notion.site/Scale-vs-Sentiment-A-2026-Strategic-Teardown-of-Flo-Health-3303f51528b2803c9e0ce3cb5f4ebc63",
    },
    stages: [
      {
        key: "context",
        label: "Context",
        heading: "The question is not whether it works. It is what the strategy costs",
        body: [
          "Flo Health is not a failing product. Ten years in it has roughly 77 million monthly active users, around 5 million paying subscribers, a billion dollar valuation and the top rank in its category. A data moat feeds better predictions, better predictions build trust, and trust produces more data.",
          "The tension I wanted to examine is what happens when a company mid-pivot from personal utility to enterprise health benefit keeps pushing the intake-to-paywall journey harder to protect a conversion rate. Enterprise buyers need visible certifications and medical credentials, so those trust assets moved in front of the user before they reach any value.",
          "The question the teardown asks is whether the strategy being executed matches the platform the company says it is becoming.",
        ],
      },
      {
        key: "discovery",
        label: "Discovery",
        heading: "Three evidence sources, one consistent story",
        body: [
          "I pulled the 500 most recent reviews from four datasets covering the US and UK app stores and Google Play, then merged and deduplicated to 1,442 unique reviews. Those were classified with a zero-shot text classifier so the complaint categories came out of the data rather than out of my assumptions.",
          "Alongside that I ran a live day-zero audit of the onboarding as a new user, and read the public financial disclosures for the revenue and user numbers.",
          "The classification was blunt. Core tracking is stable and well liked. Paywall and subscription friction is the primary driver of brand erosion and of almost every rating under two stars.",
        ],
        points: [
          {
            title: "Twelve minutes before value",
            body: "The day-zero audit put onboarding at around twelve minutes of high intensity questioning covering medical history and intimate patterns, all before the product does anything for you.",
          },
          {
            title: "Loyalty treated as a fresh data point",
            body: "Returning users are pushed back through the same interrogation with no obvious login path, so years of personal history reads as lost. That trades sentiment for database volume.",
          },
          {
            title: "Gates in the middle of a life stage",
            body: "Lifecycle transitions such as moving from cycle tracking into pregnancy are gated as separate financial commitments, which creates a perceived value gap against the subscription already being paid for.",
          },
        ],
      },
      {
        key: "decisions",
        label: "Key decisions",
        heading: "What I would put on the 2026 roadmap, in this order",
        body: [
          "Sequencing matters more than the list. Easy wins first buys the political capital with the user base to then attempt the expensive bets.",
        ],
        points: [
          {
            title: "Identity-first onboarding",
            body: "A new user versus existing user prompt on the first screen after install, with existing users sent straight to a secure data handshake instead of a fresh questionnaire. It cuts time to value and makes the user's history feel like an asset the product protects.",
          },
          {
            title: "A context-aware content filter",
            body: "A comfort check at lifecycle transitions so the insights feed respects personal and cultural boundaries instead of a single universal standard. It replaces clinical rigidity with user agency and prevents avoidable churn in diverse markets.",
          },
          {
            title: "Visible premium markers before the click",
            body: "One consistent signifier on gated content so nobody explores three screens deep and hits a wall. People who understand the boundary upgrade out of desire rather than irritation.",
          },
        ],
      },
      {
        key: "takeaway",
        label: "Takeaway",
        heading: "A data engine can outrun the trust that feeds it",
        body: [
          "Flo has done the hard part. Scale and profitability are handled. What it has not yet proved is that an enterprise grade data operation can still feel like a private companion, and the reviews are where that gap shows up first.",
          "The pattern generalises well past femtech. When acquisition and monetisation both get optimised against the same intake screen, the intake stops serving the person filling it in, and the churn it causes never appears on the conversion dashboard that justified it.",
          "Everything here is built from public disclosures, public reviews and my own testing of the live app. The full write-up includes the sentiment breakdown and the value against effort matrix.",
        ],
      },
    ],
  },
];

export type Pillar = {
  n: string;
  title: string;
  body: string;
};

export const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Product strategy and strategic reframing",
    body: "I check whether a product is positioned around the value people actually come back for. Instead of treating it as a list of features, I reframe the direction around real human outcomes, moving from a passive tool to a system that reduces daily effort.",
  },
  {
    n: "02",
    title: "Analytics architecture and North Star frameworks",
    body: "When tracking is broken or the data is misleading, I establish baseline clarity. I audit event logs, build tracking blueprints and set metric frameworks that separate vanity numbers from recurring value delivery.",
  },
  {
    n: "03",
    title: "Portfolio and experience architecture",
    body: "I strip away clutter by looking at where people already spend their time. If a feature is buried in a tab nobody opens, I bring it into the screens they use every day so they get value without changing their habits.",
  },
  {
    n: "04",
    title: "Qualitative discovery and the customer engine",
    body: "I treat feedback channels as active research. User interviews, support signals and community conversations tell me the real friction behind a drop-off, and that is what team priorities get aligned to.",
  },
  {
    n: "05",
    title: "Delivery governance and engineering partnership",
    body: "I bring engineering, design, marketing and leadership onto the same page. In tight launch windows I map capacity against developer skillsets, technical debt and delivery risk, so stakeholders can see the trade-offs and releases stay reliable.",
  },
  {
    n: "06",
    title: "Growth, activation and retention loops",
    body: "I look at the whole journey rather than stopping at the sign-up screen. That means fixing onboarding drop-offs with growth and marketing, timing in-app prompts properly, and building loops that keep accounts active over time.",
  },
];

export type Article = {
  title: string;
  desc: string;
  href: string;
  meta: string;
};

export const FALLBACK_ARTICLES: Article[] = [
  {
    title: "How to think about product analytics without drowning in numbers",
    desc: "A value first framework for metrics, using a household app as the case study for how early teams end up measuring whatever is easiest to count.",
    href: "https://medium.com/@sukatfavour/how-to-think-about-product-analytics-without-drowning-in-numbers-part-1-c16946dcfb5f",
    meta: "Medium",
  },
  {
    title: "Scale vs sentiment: a strategic teardown of Flo Health",
    desc: "The tension between aggressive monetisation and consumer trust, read through 1,442 app store reviews and a zero shot text classifier.",
    href: "https://florentine-carob-c8a.notion.site/Scale-vs-Sentiment-A-2026-Strategic-Teardown-of-Flo-Health-3303f51528b2803c9e0ce3cb5f4ebc63",
    meta: "Notion",
  },
];

export const MEDIUM_PROFILE = "https://medium.com/@sukatfavour";

export type Milestone = {
  date: string;
  role: string;
  org: string;
  desc: string;
  kind: "work" | "study" | "honour";
};

export const MILESTONES: Milestone[] = [
  {
    date: "Apr 2026 to now",
    role: "Product Manager, contract",
    org: "Pre-seed startup",
    desc: "Brought a data first perspective into a launch sprint. Centralised how the team tracked its product, rewrote the measurement definitions from the raw events up, and set up the first structured beta feedback pipeline.",
    kind: "work",
  },
  {
    date: "2026 to now",
    role: "Product practice and writing",
    org: "Independent",
    desc: "Building product craft in public: teardowns, feature audits and honest notes on working through a career change.",
    kind: "work",
  },
  {
    date: "Mar 2025 to Aug 2025",
    role: "Data Science Intern",
    org: "Voyage Companion, Edinburgh",
    desc: "Analysed cloud cost and usage data for engineering and finance, built dashboards that caught anomalies early, and turned technical metrics into plain language quarterly reporting.",
    kind: "work",
  },
  {
    date: "2024 to 2025",
    role: "MSc Data Science, Distinction",
    org: "Heriot-Watt University",
    desc: "Machine learning, statistical modelling, visualisation, big data and research methods, end to end.",
    kind: "study",
  },
  {
    date: "Oct 2023 to Apr 2024",
    role: "Trainee Salesforce Developer and Data Analyst",
    org: "FeatureMind",
    desc: "Found the bottlenecks in customer service data and built automations that cut case resolution time by a quarter across high volume queues.",
    kind: "work",
  },
  {
    date: "2022",
    role: "Best Graduating Student and Stallion Award",
    org: "American University of Nigeria",
    desc: "Top of Computer Science, plus the Stallion Award for community excellence.",
    kind: "honour",
  },
  {
    date: "2018 to 2022",
    role: "BSc Computer Science",
    org: "American University of Nigeria",
    desc: "Software engineering, algorithms and systems thinking, with a minor in English Literature that turned into a habit of writing precisely.",
    kind: "study",
  },
];

export const CERTIFICATIONS = [
  { org: "PMhelp", title: "Product Management Foundations", date: "Feb 2026" },
  { org: "Electronic Arts and Forage", title: "Product Management Job Simulation", date: "Feb 2026" },
  { org: "Udemy", title: "Become a Product Manager", date: "In progress, 2026" },
];

export const CONTACT = {
  email: "sukatfavour@gmail.com",
  linkedin: "https://www.linkedin.com/in/favour-sukat-7077051b0/",
  github: "https://github.com/Suki-design",
};
