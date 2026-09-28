# Launch record

The illustrated site replaced the original website on 28 September 2026. This
records what the launch pass did and what still needs a person, a real device
or a decision. [Current direction](website-direction.md), [the manifesto](../MANIFESTO.md)
and [the shared art style](art-style.md) remain authoritative.

## Done for launch

- **Routes.** The site is mounted at `/`, `/work`, `/writing` and `/blog/<uid>`. Every article kept its URL. `/blog`, `/skills`, `/story/<uid>` and the old `/preview/*` URLs redirect permanently (`next.config.mjs`). The previous site is in `archive/legacy-site/`.
- **Search and sharing.** Titles, descriptions, canonical URLs, Open Graph and Twitter cards on every page; JPEG share cards for the home page and each article; `robots.txt` and a sitemap of the rooms and articles; `Person` and `BlogPosting` structured data. Not-found pages are `noindex`, with a themed page and ways back.
- **Performance.** The old global stylesheet loaded two external font stylesheets (Ubuntu and Zapfino) on every page; it is gone, along with Tailwind and eleven unused dependencies. Large paintings are served as visually lossless encodes (Work 1.46 MB → 0.66 MB; the full homepage journey 2.8 MB → 1.7 MB). Prismic's preview toolbar only loads under `/blog`. All pages are statically generated.
- **Responsive.** Checked at 320, 375, 390 and 430 px phones, 844×390 landscape, 768×1024 portrait tablet and 1024–1920 px desktops. Fixes: the phone Work desktop now fills the painted screen behind the laptop lid (generated mask), the globe stands on the desk, the header fits at 320 px, text is at least 10 px, Writing papers stay clear of the header on 16:9 screens and form a 2×2 on portrait tablets, and scene words clear the header on landscape phones.
- **Analytics.** The old Universal Analytics tracker (retired by Google in 2023) was removed and not replaced. Add a privacy-friendly analytics tool deliberately if wanted.

## Still to check by hand

- A real iPhone (Safari) and an Android phone: scrolling feel, view transitions, the water shaders, memory after moving between rooms.
- A screen reader pass (VoiceOver) across Home, both rooms and an article.
- After deploying: open each URL directly, share an article link in a messaging app to see its card, and submit the sitemap in Google Search Console.

## Can follow the first release

Scene transitions for lake → beach and beach → city in the style of the night fall; case-study pages for StayPal and Purrfect Plate; the terminal and other desktop delights; repo-owned MDX posts; more character routines. Prismic stays the source of article bodies for now.
