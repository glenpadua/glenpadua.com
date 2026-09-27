# Glen’s world — storyboard v0.6

> Current implementation: [architecture and edit guide](../website-architecture.md). Current design decisions: [creative direction](../website-direction.md). This document retains the earlier study/checkpoint; its old file paths and technology limits are historical.

26 September 2026 · **Discussion artifact. No application implementation or new published copy.**

[Visual discussion board](index.html) · [Founding manifesto](../../MANIFESTO.md) · [Current scene study](../diorama-pattern.md)

Open the HTML in a browser, rather than a source editor. In this session the rendered board is served locally at `http://127.0.0.1:55199/storyboard/`. That address lasts only while the preview server is running. The board contains rough compositions, draft copy, and scripted interactions, not finished artwork, a live AI guide, or an Instagram video integration.

## Current static page mock

The [first Home / Work / Stories mock](../mock/README.md) now follows the refined image studies. It uses real editable text, scene link indicators, and separate desktop/phone compositions. Use that folder for the next layout and copy iterations; the discussion board and copy deck below preserve earlier exploration. The writing setting is now the overhead desk, and the city is a coffee moment with Millusha.

The latest mock revision makes Work and Stories full-view scenes with progressive disclosure from the laptop and monitor. The beach switches to football, the desk includes an Arsenal scarf, and city copy leaves the couple’s presence to the image.

Current art constraint: retain the original simple, video-game-like illustration style. The more detailed lake/beach repaint direction was rejected. Home now experiments with short whole-scene dissolves in a stationary viewport instead of ground-to-sky edge gradients.

## Image-first art direction

Glen’s next step is to establish the full scene family as static generated illustrations before refining the HTML mock. The existing lake and beach remain the visual anchors. New studies cover a city night skyline, a bedroom workstation with Glen working, and an overhead writing table. Review the [art-direction studies](art-direction/README.md) before changing the layout prototype. These are reference images, not final responsive assets; animation and micro-interactions come later.

## The correction that shapes this version

Glen’s latest direction replaces the earlier portfolio-style homepage proposal:

- **Home is a scrollable scenic story about Glen.** Lake and mountains, beach, city: a continuous world with colour and atmosphere blending between places. No work examples, project carousel, case-study blocks, or “Things to Try” section on the landing page.
- **Work is a separate place.** A bedroom workstation: Glen typing, laptop and main monitor, AI alongside the work, a screen that browses projects, and a representation of his work at Remote.com.
- **Writing has its own place to explore.** Its exact setting is still open. Individual essays have distinct creative forms inside a shared editorial style.
- **Objects are part of the interface.** Indicators, responsive props, small animations, and discoveries lead to videos, pages, external sites, or a small joke. Personality is in the words as well as the pictures.

The balanced audience remains: personal world, strong work, quiet invitation to collaborate. Those roles now live across the site rather than being compressed into a conventional landing-page sequence.

## Voice: read Glen before writing Glen

Read live on 26 September 2026:

- [The Lottery of Birth](https://glenpadua.com/blog/lottery-of-birth) (2020): a grand entrance immediately undercut by a joke at his own expense; vivid everyday details; short punchline paragraphs; real reflection without maintaining a solemn register throughout.
- [Bone to be Wild](https://glenpadua.com/blog/bone-to-be-wild) (2020): episodic framing, puns, absurd questions, pop-culture detours, and a sincere reconsideration of earlier anger. The reflection has space; humour does not erase it.
- [Do you have an ideal dream job?](https://glenpadua.com/blog/do-you-have-an-ideal-dream-job) (2022): direct opinions, conversational questions, a joke about the company name, concrete life context, and plain discussion of business value. It proves the same voice can handle work seriously.
- [My Deck of Skills](https://glenpadua.com/skills), also inspected through the local card components: the fan of cards is the browsing mechanism, and selecting a card reveals its description. Carry forward that principle of showing capability through the interface itself.
- Glen’s supplied Instagram bio: **“Skipping leg day since 2008.”** This is his wording, not generated draft copy.

### What to carry forward

Talk to one reader. Use specific things, natural contractions, the odd aside, and a sentence that knows when to stop. Let a joke puncture a grand claim. State a real opinion. Be frank about money, mistakes, and what matters. Allow a serious paragraph to stay serious.

The tone is self-aware, cheeky, candid, occasionally sweary, and capable of warmth. It is not a collection of interchangeable inspirational headlines. Do not manufacture a pun for every prop or make the prosthesis the punchline of the entire website. His own joke is permission to use that line, not permission to invent a catalogue of disability jokes.

Retire “Engineer by trade. Curious by nature.”, “A little room to explore.”, “thoughtful software”, “turn difficult problems into useful things”, and similar interchangeable portfolio copy. Short professional facts can stay plain. UI labels should explain actions; they do not all need jokes.

### Starter copy deck — for Glen to edit

These are new proposals informed by the writing above, **not quotations or approved claims** except the identified bio line. This is a starting register, not an attempt to impersonate Glen perfectly.

| Place               | Proposed copy                                                                                                                     | Role                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Lake                | **Skipping leg day since 2008.**                                                                                                  | Glen’s exact bio; the sprite supplies the context                              |
| Lake, supporting    | “I’m Glen. That’s me on the bar. The tiny version, anyway.”                                                                       | Straight introduction with a small aside; let the visitor notice the video cue |
| Coast               | **Same guy. Different background.**                                                                                               | Connect the recurring character and changing setting                           |
| Coast, supporting   | “I like having a job. I also like having a life. Working remotely helps with both.”                                               | Reflect the point of the 2022 essay without presenting its location as current |
| City                | **Yes, I do actually work.**                                                                                                      | Turn from the personal journey towards an optional separate room               |
| City, supporting    | “Senior engineer at Remote.com. Over ten years of building software. This website is what happens when I give myself a brief.”    | Concrete context with a personal aside; no project examples on Home            |
| Work room           | **This is where I open too many tabs.**                                                                                           | Proposed room introduction; a joke Glen can replace, not a factual habit claim |
| Work, supporting    | “Work, side projects, and ideas that got far enough to need a name.”                                                              | Room scope; every displayed project still needs an honest status               |
| Writing room        | **Some of this made sense in my head.**                                                                                           | Proposed index voice, not a new name forced on every essay                     |
| Writing, supporting | “Stories, opinions, and the occasional change of mind. The leg has had enough screen time. There are other things to talk about.” | Broaden the writing while keeping the old stories welcome                      |
| Human contact       | “Got something you’re trying to figure out?”                                                                                      | A quiet, direct invitation once a contact method is chosen                     |

The board uses these as short fragments in scenes. We are not adding a paragraph explaining each interest. Outfit changes, calisthenics, a football, travel objects, and the accurate left prosthesis do that work visually.

## Homepage storyboard: one continuous personal world

**Sequence proposed for composition:** lake/mountains → coast → city at dusk. Glen requested these kinds of places and seamless scroll; the exact city, season, geography, outfits, and order remain open. This is an expressive montage, not a claim that three real locations are adjacent.

| Beat             | Scenery and character                                                                                                           | Story                                                               | Main discovery                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Lake / mountains | Open sky, pine silhouettes, pull-up bar, small Glen in exercise clothes                                                         | Introduce the person and his sense of humour                        | Character’s video indicator opens a real calisthenics clip when one is selected         |
| Coast            | Turquoise water, warm sand, gentle incoming waves; Glen in a different casual outfit, perhaps pausing beside a bag and football | Travel, remote life, interests outside the screen                   | A personal object can reveal a short anecdote; football can trigger a small animation   |
| City / evening   | Muted skyline, a warm window or doorway, Glen in evening clothes                                                                | A life that includes work and curiosity; brief professional context | Lit work-room window leads to `/work`; a separate notebook/stories cue leads to `/blog` |

Coast activity is not final. Avoid two exercise scenes by default in this story proposal; the existing push-up artwork remains an available study, not a requirement. The city should feel lived in rather than a generic cyberpunk “AI” backdrop. Specific places require Glen’s selection.

### City refinement: an evening with Millusha

Glen asked to include his wife Millusha sitting with him, sharing coffee or wine. The [city v2 study](art-direction/city-night-v2.png) uses coffee and her supplied photos as likeness references. Keep this as a personal shared-life moment; revisit the earlier city headline rather than letting the professional copy dominate the couple scene.

Reserve the upper-left sky for editable heading and short text. The notebook on a separate side table can lead to Stories; the satchel can lead to Work with a discoverable labelled cue; the lantern can offer an optional lighting interaction. These are proposed mappings. Keep each object legible and the couple’s space uncluttered; actual hotspot controls, accessible labels, focus states, direct navigation, and phone composition come in the later HTML mock. No public link to Millusha or particular personal anecdote has been chosen.

### Scroll and transitions

No hard panel borders, empty editorial strips, or abrupt background swaps between homepage scenes. Let the outgoing palette and atmospheric layers carry into the next scene:

1. **Lake → coast:** mist and pale reflected sky provide a shared light band; sage greens soften towards sea-glass turquoise; foreground grass gives way to warm sand. Feather painted edges over an underlying colour gradient.
2. **Coast → city:** sand warms towards peach, the sky cools towards lavender/blue dusk, and distant shapes resolve into a skyline. Ocean haze can conceal the change in horizon.
3. **City → Work route:** deliberately opening the window may use a short approach/fade into the bedroom. It remains a real page navigation with a shareable URL and browser Back support, not an endless scroll into the work portfolio.

Use scroll position to blend opacity, atmosphere, and restrained depth with native vertical scrolling. No wheel hijacking, forced snapping, or waiting for animations before moving. Compose overlapping transition zones rather than stretching a single image across the page. Do not crossfade two full-contrast people into a double-headed sprite; use an occlusion or quiet exit/entrance and a model sheet for outfit changes. Reduced motion keeps the continuous colour treatment and removes travel/parallax; content remains in normal reading order.

The HTML board demonstrates palette continuity and scene order at rough fidelity. Its reference images already contain characters in old outfits; they do not demonstrate final clothing or the finished transition art.

## Objects as interfaces

Glen wrote “CTAs should be blatant” and immediately described subtle blinking indicators without “click here” labels. **Working interpretation:** the opportunity to interact should be noticeable, while the invitation belongs to the object rather than advertising copy. This interpretation is recorded explicitly for correction.

A small, slow pulse or glint marks an interactive object. Hover or keyboard focus brings up a short action name. Activation does one predictable thing. A distinct outward-arrow cue marks an external destination; a play cue marks video; a speech cue marks conversation. Use a shared visual language without turning the scene into a field of flashing dots.

| Object                  | Notice / hover / focus                                         | Activation                                                     | Result / exit                                                                                    |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Exercising Glen         | Slow play indicator; “Calisthenics video” label on focus/hover | Open an in-site clip viewer if a real chosen clip can be shown | Playback only after activation; close returns to the scene; clear link to full Instagram profile |
| Football                | Small glint, then an action cue                                | A brief kick/roll or playful reaction                          | Returns to idle; no secret navigation                                                            |
| Travel bag or postcard  | Small cue; “A note from the road”                              | Short personal note or chosen story preview                    | Close to resume; exact memory must come from Glen                                                |
| City’s lit work window  | Window light and focus label “Work”                            | Navigate to the workstation room                               | `/work`, ordinary browser navigation                                                             |
| Notebook / story object | Bookmark cue and “Stories” label                               | Navigate to the writing room                                   | `/blog`; existing article URLs preserved                                                         |
| Work monitor            | Current project, previous/next controls, a clear focus state   | Browse items; select one for readable details                  | Deliberate link opens that project, tool, or case study                                          |
| AI speech indicator     | Speech cue distinct from the video play cue                    | Open optional AI guide                                         | Typed conversation, clear AI identity, close/back to room                                        |

**Resolve the earlier click conflict:** the exercising sprite now prioritises the real calisthenics video. Do not make the same click sometimes open Instagram and sometimes start chat. The AI guide gets a separate speech indicator, likely in Work initially. Placement remains open.

Keep a compact persistent route menu (Home / Work / Stories, with contact available) as a direct path. Scene discovery rewards exploration; it is never required to reach essential content. All hotspots are labelled semantic controls/links, keyboard reachable, with generous touch areas. Mobile taps reveal the same information as desktop focus/hover. Essential details cannot be hover-only. Reduced motion makes indicators steady; there is a motion pause. Maintain contrast and avoid fast flashing.

An Easter egg can be genuinely hidden because it is optional. Navigation, a video close action, a project link, and contact are not Easter eggs. Audio never starts on hover. Third-party media should load on deliberate use, not download a feed while the visitor scrolls.

### Instagram content

The existing site links to [Glen’s Instagram profile](https://www.instagram.com/glen.padua/). A particular calisthenics video has **not** been selected or fetched. The board therefore opens an explicit clip placeholder with the real profile link. It must not use unrelated footage, imply an embed is working, or guess a reel URL. Later decide between an appropriate supplied video asset and a permitted embed based on the chosen clip and playback constraints.

## Work: the bedroom workstation

The separate `/work` page is another scenic composition in the same painted world. A full workstation gives the content a physical place: main display, laptop, AI panel, keyboard, chair, bed, window, personal objects, and Glen typing. It is a proposed room, not a claim to reproduce his actual bedroom.

**Camera direction, refined by Glen:** view him from directly behind, slightly above: back of head and torso in the foreground, typing towards the monitor in front of him. The desktop and screen dominate; the laptop and small personal objects sit to the side, with only partial bedroom context around the edges. The [version 3 image study](art-direction/workstation-bedroom-v3.png) records this direction. The older side-facing room and HTML schematic are superseded as camera references.

**Latest review:** Glen says the core rear-view composition is right. Further bedroom art refinement can wait, but the main monitor must support substantial usable interface content, with adequate unobstructed space, and Glen’s workstation clothes should differ from the earlier scene. The specific outfit is still open.

**Main monitor:** a manually controlled project carousel. The monitor is the browsing surface, not decoration behind conventional cards. It shows a real project name, honest status, and a useful glimpse. Selecting it reveals a readable detail view without forcing long descriptions into tiny pixels. A clear next action takes the visitor to an external product, an internal mini-app, or a case study as appropriate. Previous/next controls and a position indicator must be available without swiping; no automatic advancement while someone reads.

**Laptop / second screen:** an illustrative Slack/work surface representing Remote.com. Hover or focus can preview the name; activation opens a short account of Glen’s role and an explicit external link to Remote.com. Use public-safe representations, not fabricated private messages, real colleague avatars, internal code, or company performance metrics. A staged code/AI screen can express how work happens, clearly separated from evidence of any particular shipped contribution.

**Character and room:** restrained typing, an occasional thinking pause, monitor glow, a slow change in window light. Clothing suits working at home; the prosthesis and likeness remain accurate wherever visible. Personal props can connect back to travel, football, and calisthenics. A small deck on the desk could nod to the original skill cards; this is optional, not a tech-logo wall.

**Mobile:** recompose the room around the desk. Bring the selected monitor content into a readable panel below or in front of it. Do not shrink an entire bedroom until the project title becomes illegible. Keep a compact project list as an alternative for direct browsing and search. The carousel is an enhancement over meaningful linked content.

The board’s workstation is a schematic with selectable screens and sample carousel slots. Remote.com is a user-confirmed employment fact. “This website” is a real current experiment. Staypal is a user-supplied project idea whose readiness is unverified; no live-product link is implied. Final content selection is open.

## Writing: a separate place, and rooms within it

**Glen’s updated direction:** a straight-overhead view of a writing table, related in atmosphere to the workstation. Pages are spread casually across it, each carrying an actual blog title; selecting a page leads to that article. This replaces the earlier reading-corner/bookshelf proposal. The current HTML board still illustrates that older proposal and is intentionally held until the artwork direction is refined.

Use actual existing titles: The Lottery of Birth, Bone to be Wild, The Russian Connection, and Do you have an ideal dream job? For scale, the first study uses four featured pages and a tidy stack/archive folder for the rest. The total page count in the artwork stays bounded as the blog grows. In the later HTML mock, page titles become real text and content slots can change without regenerating the table. An archive provides title/topic/date browsing; no visitor must sift through an ever-growing pile. Mobile can show fewer pages in a deliberate arrangement plus the same archive, rather than shrinking the full table.

**Writing presence and later interactions:** Glen confirmed the overhead perspective and wants a glimpse of himself writing on a separate note. The [version 3 table study](art-direction/writing-table-v3.png) adds his hair, shoulders, and hands at the lower edge without covering article titles. A small paper-tray shuffle cue can later redeal a fresh set of featured articles; the archive remains a distinct route to all posts. An occasional gentle lamp-light variation and a short writing loop are later possibilities. Keep the paper illumination readable, provide static/reduced-motion states, and do not autoplay changes to the article selection. This phase remains static imagery only.

Individual articles can leave the small room and use the full page. Their art direction follows their subject, with common typography, spacing, navigation, and control conventions. The existing amputee stories stay part of the collection alongside AI, worldview, failures, work, and travel.

## The AI guide and useful tools still belong

These ideas survive the homepage correction. Give them useful roles in Work, an article, or dedicated routes rather than a compulsory demonstration block interrupting the scenic biography.

The optional guide can help people find a project, ask about an essay, or discuss the shape of a problem. Clearly identify it as AI, use approved material, accept typed follow-ups, and distinguish a conversation with software from contacting Glen. Preserve one conversation across scene changes; close returns focus to its trigger. A phone needs a readable panel, not a tiny speech bubble. Voice and character reactions remain later options; no unsolicited microphone, audio, or promise of Glen’s availability.

The draft greeting can be plain: “I’m the AI one. What would you like to know?” It needs Glen’s review along with the rest of the copy. A useful grounded reply matters more than a constant stream of jokes. The board is scripted only.

### Useful tools as routes into the world

A tool should be useful even to someone who has no interest in the portfolio. It can serve four purposes together: solve a small problem, demonstrate craft, help Glen learn a domain, and attract relevant conversations.

**Proposed visitor path:** a search result, recommendation, or niche community → a focused tool page → an immediate useful result → an optional explanation or related next step → a product or a conversation about the visitor's actual workflow.

This also works in reverse: a visitor exploring the scenic homepage can find the tool through the character guide or the separate Work room. A scenic homepage is not a required entrance or a detour after a search click.

- Put lightweight demonstrations in the scene; give substantial tools their own normal, bookmarkable pages.
- Keep a family resemblance through palette, typography, a small character cue, and a relevant setting. A host tool might use a small guesthouse terrace vignette; the working interface gets the space and contrast it needs.
- Give the result before asking for contact details. A lead-generation purpose does not require gating the tool behind an email field.
- Offer a contextual next step after value is delivered: try a product, see a related example, or discuss a task the tool does not cover. Contacting Glen is deliberate; typing to the guide does not silently become a sales enquiry.
- Domain knowledge and genuine usefulness should determine which tool gets built. No need to launch a broad catalogue or claim expertise in every niche.

### Staypal: an illustrative branch, not a selected niche

Glen described Staypal as something he has been trying to build for hosts. Its current product status, adoption, revenue, and integration capabilities are not established here. Hosting is an example of how this site could support an evolving opportunity, not a claim of established hosting expertise or an affiliation with Airbnb.

**Three candidate entry tools to discuss:**

| Candidate                      | Useful result                                                                                   | What it could help Glen learn                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Hosting income-and-cost sketch | A transparent breakdown from the host's own inputs, showing what is included and excluded       | Which numbers hosts find hard to understand or gather           |
| Repetitive-task inventory      | A short ranked view of recurring guest/admin work and where software might help                 | Which tasks actually cost hosts time and how they do them today |
| Guest-message workflow demo    | A clearly labelled example of how common questions could be handled, with an easy human handoff | Where automation helps and where a host needs control           |

These are alternatives, not a promised feature list. The calculator is illustrative; no financial model, data source, or earnings claim has been selected. If chosen, define the result carefully—gross income is different from operating surplus or take-home earnings—and show assumptions. Start with a narrow useful question rather than a speculative “AI dashboard.”

**A possible host journey:**

1. A host finds a focused tool and uses it with their own inputs or a labelled example.
2. The result is understandable and useful on its own; an optional AI explanation may help, but does not replace the calculation or hide its assumptions.
3. The host notices a relevant next step: “Want less manual work around your hosting?”
4. The site offers an honest route based on what actually exists at the time:
   - **Product path:** try Staypal if a suitable usable product is ready.
   - **Consulting path:** discuss the host's existing systems and what a custom assistant, integration, or automation might help with.
5. Glen learns from real needs. Repeated needs could inform a product; diverse systems could favour bespoke work. Both paths can coexist if there is a clear reason, without pretending the decision is already made.

A future consulting invitation could read: “Every hosting setup is a little different. If the tools you use don’t quite work together, tell me how you run things.” This is draft niche copy, not a current promise to integrate with particular services.

### What to prototype next, before implementation

1. **Conversation shape:** how the character invites a question, where the cloud opens, a follow-up exchange, closing, and returning to the scene. Use labelled scripted responses first to judge the experience.
2. **One useful job:** select a visitor task for the guide and one candidate niche tool. Keep the niche open until Glen wants to test it.
3. **Tool-to-conversation handoff:** sketch the result and the optional next action. Make the contact route relevant without making the whole experience feel like a sales funnel.
4. **Only then choose AI and tool implementation:** grounded content, response behaviour, latency, usage cost, failure states, data handling, and any integrations. The story does not prescribe a model or stack.

## Writing as a creative experience

**Direction supplied by Glen:** existing writing is primarily text-based and, in his description, currently centred on his amputee life. Future work could span lived experience, past events, learnings, AI, how he sees the world, ideas that failed, and his thought process. Some posts may also help readers understand his capabilities and lead naturally to relevant offerings. Interactive writing should share a recognisable style while giving each piece a form that suits its idea.

### Reference: AI 2027

[AI 2027](https://ai-2027.com/), reviewed 26 September 2026, combines dated narrative chapters, supporting visuals, expandable explanations, source notes, alternative endings, and reading/listening options. The transferable idea is to let readers move between the story, its supporting detail, and different possibilities. This is an editorial reference, not an endorsement of its forecasts or a request to reproduce its subject matter, artwork, or exact layout. Its specific scroll behaviour has not been audited here.

For Glen, the ambition is **authored experiences that help people feel, understand, or question something**. Interaction earns its place when it reveals something prose alone would make harder to grasp. A personal essay might need pacing, photographs, and a carefully placed reveal; an AI argument might benefit from a model the reader can interrogate.

### A shared style, with room for distinct forms

Keep a common editorial frame: recognisable typography, warm paper-like reading surfaces, restrained accents drawn from the scenic world, comfortable line lengths, clear section navigation, dates and update notes, consistent figure/source treatments, and familiar controls. The recurring character can introduce a chapter or answer an optional article-specific question; it need not sit beside every paragraph.

Let each piece choose its cover illustration, mood, composition, diagrams, and meaningful interactions. A travel essay can feel spacious; a failed experiment can feel like a working notebook; a systems explainer can make relationships visible. They should feel like different rooms in the same home.

**The author remains Glen.** The published narrative and point of view are authored and reviewed. An optional AI guide answering questions about an article is a separate, clearly labelled layer, grounded in that article and cited supporting material. It should not silently rewrite the essay for each visitor or invent memories, opinions, or experiences on Glen's behalf.

### Forms worth exploring

All titles below are working concepts, not published pieces or assertions that a particular event happened.

| Kind of piece                           | Possible form                                                             | What a reader can do                                                 | What stays intact without interaction                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| A lived experience / amputee-life essay | Illustrated chapters, selected photos, moments of reflection              | Open contextual notes, move between moments at their own pace        | The complete personal account in Glen's own words; no mandatory emotional gamification                       |
| Travel and remote life                  | A place-based journal with a simple route or scene changes                | Explore a location or compare what was expected with what was found  | A readable journey with descriptions for meaningful images; only actual places and memories supplied by Glen |
| An AI or worldview essay                | A concrete scenario, competing assumptions, optional alternative branches | Change an assumption or examine another interpretation               | The argument, assumptions, sources, and uncertainty; no simulated result presented as a prediction           |
| A failed idea / changed mind            | Decision points and an annotated sequence of attempts                     | Reveal “what I expected” and “what happened”; inspect another option | A candid account grounded in the real story; do not label Staypal a failure or pivot without Glen saying so  |
| A lesson from building                  | A before/after comparison, working example, or frame scrubber             | Try the difference and inspect the tradeoff                          | The explanation plus representative still states and results                                                 |
| A practical niche essay                 | A specific operational problem followed by a useful small tool            | Try a scenario or apply a checklist to their own work                | Useful guidance and limitations; an optional relevant product/contact path afterwards                        |

### One article storyboard to explore first

**Working concept:** “A demo that talks back.” This would tell the story of building the character guide once there is real work to describe. For now it is a structure for a future article, not a retrospective claiming it has already been built.

1. **A moment:** introduce the desire to click the character and ask a question. A quiet illustration and a short authored opening establish the idea.
2. **The first impression:** a small, clearly labelled demo lets the reader try a sample exchange.
3. **The useful question:** compare an impressive-sounding answer with an answer that actually helps someone find a relevant tool or understand a limit. Use authored examples first; do not fake live AI.
4. **The decision:** let readers inspect a choice such as open-ended character chat versus a guide grounded in a small set of approved site content. Explain the benefits and compromises of each.
5. **The hard parts:** show what happened during real development—latency, uncertain answers, conversation continuity, mobile reading space—once those observations exist.
6. **The current result:** link to the functioning guide when available, describe its limits, and explain what Glen would refine next.
7. **An optional next step:** for a reader with a relevant business need, a quiet “Thinking about something like this for your own workflow?” link. Readers can also simply finish the essay or read another one.

“Making this little world” is another viable first piece because the repo already contains real animation iterations. It could use a frame scrubber, annotated before/after views, and a mobile/desktop composition comparison. The subject should be chosen by the story Glen wants to tell, not solely by which interactive widget is easiest to build.

### How writing supports trust and useful enquiries

A niche post can be useful in its own right and connect to a tool. For example, a future host-focused article might examine repeated guest questions, let readers explore an example workflow, and link to a relevant host tool or a conversation about their setup. Hosting remains illustrative; the article should follow genuine learning in that niche.

The path is **a specific question → a useful explanation or experience → a relevant next step**. Some readers arrive at the essay from search; others from a tool or the guide. None needs to traverse the scenic homepage first. Make the practical benefit clear in the title and opening, retain stable article URLs, and keep the actual article content accessible to search and sharing.

Personal essays can build connection without a consulting CTA. Failed ideas can show honesty and judgment without being reframed as business successes. Trust should accumulate through a recognisable point of view, useful work, and candour.

### Make the ambition sustainable

Use three levels of production effort, chosen per story:

- **Crafted essay:** strong typography, art direction, meaningful images, captions, and pacing. Suitable for regular personal writing; still a deliberate design rather than an unstyled text dump.
- **Chaptered experience:** a distinctive visual rhythm with one purposeful interaction, such as a timeline, comparison, or expandable annotated scene.
- **Signature interactive essay:** a bespoke simulation, branching argument, working example, or multi-part narrative. Reserve this effort for ideas where it materially improves understanding.

These are effort levels, not quality tiers. Shared editorial building blocks make it feasible to keep publishing while allowing occasional ambitious pieces. Do not require a new application or a new landscape for every post.

### Editorial acceptance questions

- What should the reader feel, understand, or be able to do afterwards?
- Which interaction advances that purpose, and can the reader skip it without losing the point?
- Are lived experience, interpretation, sourced facts, hypothetical scenarios, and AI-generated replies clearly distinguishable?
- Is the complete argument or story readable with keyboard navigation, reduced motion, larger text, or a failed enhancement?
- Does the phone layout suit reading rather than squeeze a desktop diagram into the column?
- Can someone link to a section, inspect sources, return later, and read the page without chat or an account?
- Is any invitation relevant to this particular piece, rather than an automatic sales ending?

Keep the current articles and their URLs while designing the new forms. Select an existing piece with Glen before remastering it; preserve his account and point of view rather than adding invented narrative detail. No existing post is rewritten or published by this planning revision.

## Page map

| Place           | Role                                                                                          | Route                      |
| --------------- | --------------------------------------------------------------------------------------------- | -------------------------- |
| Scenic home     | About Glen through a continuous landscape story; discoveries lead elsewhere; no work examples | `/`                        |
| Work room       | Scene-integrated project browsing, Remote.com context, optional AI guide, tools               | `/work`                    |
| Writing room    | Scenic browse plus readable index                                                             | `/blog` retained           |
| Article         | Story-specific authored experience in common editorial style                                  | `/blog/[uid]` preserved    |
| Useful tool     | Direct, useful experience with a relevant optional next step                                  | `/tools/[slug]` proposed   |
| Project story   | Details worth reading beyond the screen preview                                               | `/work/[slug]` proposed    |
| Contact         | A direct human contact path, location/channel to choose                                       | Route or small panel open  |
| Existing skills | Keep the existing URL working; later decide how the deck becomes part of Work                 | `/skills`, no redirect now |

A separate About page is no longer a necessary primary destination: Home now performs that job. Existing URLs are not changed by this document. Search visitors can land directly in an article or tool without taking the scenic route first.

## Quality is part of the idea

- The anatomical left prosthesis never swaps sides. Build outfit variants from a consistent character sheet; do not mirror art to change facing direction.
- Full scenic artwork remains consistent in texture, lighting, perspective, and sprite scale across routes. Room scenes can be denser than the open landscapes without becoming a different website.
- Native scroll, stable reading order, real text, links, keyboard focus, reduced motion, pause, and deliberately composed phone layouts are foundational.
- Load heavy room/essay interactions when needed; stop offscreen loops; defer video and AI until requested. Final performance claims require actual measurements.
- No invented career outcomes, private employer content, product readiness, places lived, or biographical anecdotes. Glen supplied 10+ years, senior role at Remote.com, startup co-founder, business-value focus, and his interests.
- Marketing/SEO friends and family are a possible collaboration network, not an already staffed agency. Hosting remains illustrative. No compulsory lead capture or sales ending on personal essays.

## Decisions and next discussion

| Decision                                                                      | Status                                                                        |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Balanced personal / work / collaboration audience                             | User direction retained                                                       |
| Home as scenic personal story, no work examples                               | User direction; supersedes v0.4 work-on-home proposal                         |
| Seamless colour/atmosphere transitions via scroll                             | User direction; detailed compositions proposed                                |
| Separate scene-based bedroom workstation Work page                            | User direction; exact room design and carousel content open                   |
| Objects as interactions; game-like cues                                       | User direction; “blatant” interpreted from the subtle-indicator examples      |
| Exercise sprite opens real calisthenics video / Instagram path                | User example adopted in storyboard; exact clip needed later                   |
| Outfits change with setting; identity and prosthesis consistent               | User direction                                                                |
| Writing index as its own scene                                                | User direction updated: overhead table with titled pages and scalable archive |
| Blog voice informs all starter copy                                           | User request; v0.5 samples remain drafts                                      |
| Original skills deck as conceptual precedent                                  | User direction and inspected live interaction                                 |
| Useful AI guide / niche tools / interactive essays                            | Retained, rehomed across appropriate routes                                   |
| Exact city, scene activities, clothing, copy, project roster, contact channel | Open; do not manufacture details                                              |

Next design work should settle (1) the personal story in three or four scenic beats, (2) the hotspot language and return behaviour, (3) the Work room composition with actual selected projects, and (4) the overhead writing-table composition and one article treatment. Copy should be read aloud with Glen before it is treated as final. No new production scene, model service, route, or media integration is authorised merely by appearing in this board.
