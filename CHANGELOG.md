# Change log
Record every meaningful change (headline, CTA wording, layout, campaign launches) with the date, so results before and after can be compared.

## 2026-10-07 - v1.1 (pre-launch)
- Real Precision logo and route graphic added
- Video moved to the top, directly under Apply to Drive; "Your Success is Our Success" added
- Location picker moved directly under the hero; every Apply button scrolls to it
- Real application links added for 12 locations; Brandon, Portage la Prairie and Laval pending
- Driver match request and LinkedIn link added
- Background-check provider recommendation removed

## 2026-10-14 - v1.2 (pre-launch)
- Location list matched to the Figma design: Manitoba now Winnipeg, Brandon, Morden, Portage la Prairie; Quebec now Montreal, Laval, Quebec City
- Morden added (no application link yet)

## 2026-10-14 - v1.3 (pre-launch)
- Game replaced: "What kind of driver are you?" is now "Build your road trip playlist" (4 picks: genre, audio format, listening moment, driving mood)
- New events: game_answer (question, answer), game_complete (genre, audio_format, listen_time, mood), game_share
- Privacy wording updated to say game picks are counted anonymously

## 2026-10-14 - v1.4 (pre-launch)
- Game section: rainbow "LED strip" glowing outlines on game buttons, option tiles and result card; moving colour-cycling equalizer bars; LED strip divider under the heading
- Animations run only while the game is on screen and are switched off for visitors who prefer reduced motion

## 2026-10-14 - v1.5 (pre-launch)
- Colour pass across the page: rainbow accent bars, tinted section backgrounds, colour-coded steps, province tiles and FAQ rows, gradient hero and final call to action, rainbow-framed video, glow behind the hero Apply button
- Colour is used on shapes and backgrounds only; body text colours unchanged for readability. Apply buttons remain solid.

## 2026-10-14 - v1.6 (pre-launch)
- Hero trimmed: headline shortened to "Drive your own vehicle. Deliver with us."; eyebrow and detail sentence removed; three tags added (Independent contractors, Paid by the piece, Ontario - Manitoba - Quebec)
- Baseline for future headline tests. Change one hero variable at a time from here and log it.

## 2026-10-14 - v1.7 (pre-launch)
- Mobile layout centered (screens under 720px): headings, hero, tags, cards, steps, province tiles, city rows, game, FAQ and footer. Requirements checklist and privacy paragraph stay left-aligned.

## 2026-10-14 - v1.8 (pre-launch)
- Game music added (assets/audio/road-trip-loop.mp3). Starts only when the visitor presses play, loops softly, has a Music on/off button, and stops when the game scrolls off screen or the tab is hidden. Does not load until pressed.
- New event: music_toggle (state)

## 2026-10-14 - v1.9 (pre-launch)
- Peak banner is now a large scrolling ticker (still shown only Oct 6 to Jan 12). Whole strip taps through to the locations and counts as apply_click (cta_location peak_banner). Pause button added; static centered text for visitors who prefer reduced motion.

## 2026-10-14 - v1.10 (pre-launch)
- How it works, step 1 heading changed from "Apply online" to "Click the Apply to Drive button" (artifact comment)

## 2026-10-14 - v1.11 (pre-launch)
- How it works, step 1 body changed to "Choose your location to start the conversation. It's not a commitment." (artifact comment)

## 2026-10-14 - v1.12 (pre-launch)
- How it works, step 2 body changed to list the documents (licence, abstract, background check, a few more) and state that the contractor runs their own business and is not an employee (artifact comment)

## 2026-10-14 - v1.13 (pre-launch)
- How it works, step 2 body simplified and made lighter: "Gather a few business documents. You're running your own show, not clocking in." Full document list stays in "What you need to get started" (artifact comment)

## 2026-10-14 - v1.14 (pre-launch)
- How it works, steps 3 and 4 body text lightened to match step 2's tone: "Get road-ready. Every driver goes through the same onboarding." and "Hit the road in your own vehicle. Your business, your wheels." (artifact comment)

## 2026-10-14 - v1.15 (pre-launch)
- How it works cards: text always centered, number badges now true circles (they were stretching into ovals when stacked), 2 columns on tablet widths so text no longer squeezes, balanced line breaks (artifact comment)

## 2026-10-14 - v1.16 (pre-launch)
- Vehicles card: three illustrated white vehicles added (cargo van, minivan, SUV) with captions (artifact comment). Illustrations, not photos; swap for real photos when available.

## 2026-10-14 - v1.17 (pre-launch)
- Background check requirement now says it must be from the last 90 days (requirements list and FAQ) (artifact comment)

## 2026-10-14 - v1.18 (pre-launch)
- Pay wording: "paid by the piece" changed to "paid for each piece delivered" in the pay section and the FAQ (artifact comment). Hero tag and search description still say "by the piece" pending a decision.

## 2026-10-14 - v1.19 (pre-launch)
- Game heading changed from "Build your road trip playlist" to "What's your delivery playlist?"; intro line now "Four picks. One driver persona. Dare you to find out?"; share text updated to match (artifact comment)

## 2026-10-14 - v1.20 (pre-launch)
- Final call-to-action graphic: left edge now fades out instead of looking cut off (artifact comment)

## 2026-10-14 - v1.21 (pre-launch)
- Top and footer accent strips changed from rainbow to a glowing white-to-teal-to-navy strip (artifact comment). Rainbow remains in the game and other accents pending a decision.

## 2026-10-14 - v1.22 (pre-launch)
- Peak banner: arrow removed; "Apply to Drive" is now a white pill button with a teal glow so it stands out in the scrolling text (artifact comment)

## 2026-10-14 - v1.23 (pre-launch)
- Accent strips restyled as an LED strip (dotted bulbs) fading from white to dark blue with a blue glow; teal removed because it read as green. Banner button glow changed from teal to light blue (artifact comment)

## 2026-10-14 - v1.24 (pre-launch)
- Accent strips: dotted LED bulbs removed; back to the smooth glowing strip, now in the white to light blue to royal blue to navy palette (artifact comment)

## 2026-10-14 - v1.25 (pre-launch)
- Hero background changed from a blue-to-pink gradient to the solid light blue used at its top-left corner (artifact comment)

## 2026-10-14 - v1.26 (pre-launch)
- Video frame outline changed from rainbow to the same glowing white-to-dark-blue strip as the banner strip (artifact comment)

## 2026-10-14 - v1.27 (pre-launch)
- Driver match card reworded: heading "Consider our Driver Match Program", button "Request a team here"; FAQ and unavailable-city message updated to match (artifact comment)

## 2026-10-14 - v1.28 (pre-launch)
- "Request a team here" now opens the Driver Match Program panel in place: a short plain-language outline (3 steps, onboarding requirements still apply) plus the same province and city list. Each city link goes to the driver match request with the city added as a location parameter. New events: driver_match_click (opens panel), driver_match_start (province, city). Cities without an application link now open this panel too (artifact comment)

## 2026-10-14 - v1.29 (pre-launch)
- Earnings wording: pay section now says earnings are performance based, no two drivers are the same, and earnings are never forecasted or guaranteed; FAQ answer matched (artifact comment)

## 2026-10-14 - v1.30 (pre-launch)
- "What you need to get started" section background changed from yellow to light blue (artifact comment)

## 2026-10-14 - v1.31 (pre-launch)
- Vehicles card changed to dark blue with white text; vehicle drawings' ground shadows lightened to suit (artifact comment)

## 2026-10-15 - v1.32 (pre-launch)
- Hero tag and search-result description changed from "Paid by the piece" to "Paid for each piece delivered" so pay wording matches everywhere (artifact comment). "By the piece" no longer appears on the page.

## 2026-10-15 - v1.33 (pre-launch)
- Driver Match Program card (and the panel that opens under it) changed from lavender to light blue (artifact comment)

## 2026-10-15 - v1.34 (pre-launch)
- Hero blue now fades smoothly to white down through the Locations and How it works sections (one continuous gradient; the sections no longer have separate background colours) (artifact comment)

## 2026-10-15 - v1.35 (pre-launch)
- Light blue of "What you need to get started" now fades to white through "How contractor pay works" (one continuous gradient; the pink wash on the pay section is gone) (artifact comment)

## 2026-10-15 - v1.36 (pre-launch)
- Game intro rebuilt as five speech bubbles that pop in with a small bounce when scrolled into view (Four picks / One driver persona / Dare you to find out! / Just for fun / No wrong answers). "It isn't an application or an eligibility check" moved under the Press play button (artifact comment)

## 2026-10-15 - v1.37 (pre-launch)
- Game note under Press play shortened to "Not an application or an eligibility check." (artifact comment)

## 2026-10-15 - v1.38 (pre-launch)
- Game: "Focus mode" renamed "Career mode" (answer value now career); result renamed "The Empire Builder" with copy about building your own business (artifact comment)

## 2026-10-15 - v1.39 (pre-launch)
- Game question 1 renamed "Pick your road trip with friends soundtrack"; new "+ Add your own genre" tile lets a player type a genre (max 24 characters). The typed text is shown only in their own result tag; analytics records the answer as "other" and never the text (privacy). Option to capture sanitized text later after privacy sign-off. (artifact comment)

## 2026-10-15 - v1.40 (pre-launch)
- Share: "Share my playlist" now opens a panel with Facebook, WhatsApp, LinkedIn, Instagram, TikTok, Copy link and (on phones) the device share menu. Message uses the player's persona ("I'm The Empire Builder. What's your delivery playlist?"). Links are tagged utm_source=game_share with utm_content per network and open at the game. Instagram and TikTok have no web share link, so they copy the message and open the site. New events: game_share_open, game_share (method) (artifact comment)

## 2026-10-15 - v1.41 (pre-launch)
- Custom genres now recorded: game_answer carries custom_genre (cleaned: lowercase letters, spaces, hyphens, ampersands, max 24 characters; skipped if it looks like an email, web address or number). Input hint says "Just a music genre, please. No names or personal details." Privacy wording updated. Switch: CONFIG.captureCustomGenre. TO DO before launch: privacy sign-off and register custom_genre as a GA4 custom dimension (artifact comment)

## 2026-10-15 - v2.0 (pre-launch)
- Styles moved into assets/css/styles.css and shared scripts into assets/js/common.js and assets/js/config.js so every page uses the same look and analytics. Put the GA4 ID in assets/js/config.js (one place).
- New header menu: burger on phones, links in the header on larger screens (Home, Requirements, Where we operate, Driver Match Program, Play the game, Apply to Drive). New events: menu_open, nav_click.
- New page: /requirements/ (driver, vehicle, documents, business, how to start, FAQ). Orange dashed "To confirm before launch" boxes mark details that still need verified wording; remove them or add class hide-confirm to <body>.

## 2026-10-15 - v2.1 (pre-launch)
- Game section moved up: it now sits between "How it works" and "What you need to get started" (was after the pay section)

## 2026-10-15 - v2.2 (pre-launch)
- Game bubbles: first view pops in with a bounce (unchanged); each later scroll back they softly fade and glow instead of bouncing (artifact comment)

## 2026-10-15 - v2.3 (pre-launch)
- Header tidied (artifact comment): phones and tablets get one row (burger left, logo centered, Francais right); links sit in a single row only on wide screens (1000px and up). Link labels shortened: Locations, Driver Match.

## 2026-10-15 - v2.4 (pre-launch)
- Requirements page: Apply to Drive moved into the top row of the header (visible without opening the menu) and removed from the menu and from the page header; sticky bar now follows the page header (artifact comment). Home page unchanged.

## 2026-10-15 - v2.5 (pre-launch)
- Requirements page: top-row Apply to Drive button gets the same soft rainbow glow the page-header button had (artifact comment)

## 2026-10-15 - v2.6 (pre-launch)
- Apply to Drive buttons centered and evenly spaced: full-width buttons on phones/small tablets are capped (420px) and centered; Requirements header uses three equal columns so the logo is exactly centered; short "Apply" label below 560px.

## 2026-10-15 - v2.7 (pre-launch)
- Home page header now matches the Requirements header: burger, centred logo and a glowing Apply to Drive button in the top row, directly under the scrolling banner. Francais moved into the menu on both pages; language handler moved to the shared script (artifact comment)

## 2026-10-15 - v2.8 (pre-launch)
- Home page: big Apply to Drive button under the hero headline removed; the glowing top-row button and the bottom bar remain. Bottom bar now appears once the hero has scrolled out of view (artifact comment)

## 2026-10-15 - v2.9 (pre-launch)
- Hero cleaned up (artifact comment): "Watch on YouTube" text link removed (the video plays on the page), the three tags stack as equal-width pills on phones, video slightly narrower, spacing evened out.

## 2026-10-15 - v2.10 (pre-launch)
- Hero restacked (artifact comment): bigger headline and tags on top, wide 16:9 video tile below. Because the YouTube Short is vertical, pressing play opens the tile into a tall player so the picture isn't tiny.

## 2026-10-15 - v2.11 (pre-launch)
- Game result now pops open like a balloon with a colourful burst, on a white card that keeps the rainbow outline, glow and colours. Share my playlist is now a large button with a prompt ("Think your friends will match?") right under Apply to Drive; Build another moved to the bottom. Reduced-motion visitors see the card without animation.

## 2026-10-15 - v2.12 (pre-launch)
- Cache-busting: styles and scripts are linked with ?v=2.12 so browsers and GitHub Pages pick up new versions straight away. Bump this number (in both HTML files) with every release.

## 2026-10-15 - v2.13 (pre-launch)
- Share picture added (assets/img/share-card.png, 1200x630) and wired in with og:image and twitter:card tags, so links shared from the game show a picture on Facebook, LinkedIn, WhatsApp and others. BEFORE LAUNCH: replace REPLACE-WITH-LIVE-ADDRESS in the og:image tag of both pages with the real web address (platforms need the full address).
- GitHub repository card (1280x640) made separately: upload it under Settings > General > Social preview (optional).

## 2026-10-15 - v2.14 (pre-launch)
- Share picture: slogan removed; centred "Hiring Now" badge added in the bottom block (artifact/chat request). Repository card matches.

## 2026-10-15 - v2.15 (pre-launch)
- Favicon added: white P on royal blue (browser tab, iPhone/Android home screen, web manifest). Files: favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png, site.webmanifest. Made from the logo's P mark; swap in a vector version if the brand team has one.

## 2026-10-15 - v2.16 (pre-launch)
- Favicon links now carry ?v=2.16 so browsers fetch the icon fresh instead of showing an old cached (blank) one.

## 2026-10-20 - v2.18 (pre-launch)
- ANALYTICS FIX: assets/js/config.js had an empty Google Analytics ID, so custom events (apply_click, application_link_click, location_select, game_*, etc.) were logged to the browser console but never sent to GA4. The ID is now set. Only automatic events (page_view, session_start, first_visit, scroll, user_engagement, outbound click) were being recorded before this date, so custom-event data starts 2026-10-20.
- game_complete and game_share now include a persona parameter (the result title, e.g. "The Empire Builder"). Heads-up: with analytics now live, the cleaned-up custom genre a visitor types is sent as custom_genre on game_answer, because captureCustomGenre is true in index.html (its code comment says it needs privacy sign-off before launch). Set it to false to stop.
- Cache-busting version bumped to ?v=2.18 in both pages.

## 2026-10-21 - v2.19 (pre-launch)
- New second game: "Sort Run", a 45-second parcel sorting game (match each parcel to its route, oversize parcels go to the shelf). It is a pop-up, not a page section: it opens once per visit when a visitor scrolls past "What you need to get started", or from the "Sort Run" menu link or a shared challenge link. Close with X, Esc or a tap outside. The playlist game is unchanged. Same LED outlines, pop-open result with burst, Apply to Drive button and share options (phone share menu, Facebook, WhatsApp, LinkedIn, Instagram, TikTok, copy link).
- Players get a drawn score card image ("I scored N! Can you keep up?") they can share as a picture or save. It is made in their browser and never uploaded or stored.
- Friends who open a shared link (?beat=N) see "A friend scored N points. Can you beat it?".
- Standalone page for emails and posts: /sort-run/. Both use the same code: assets/js/sortrun.js and assets/css/sortrun.css.
- After the Sort Run pop-up is closed it zooms to a "Play Sort Run" tab on the right edge of the screen, which bounces and glows until clicked (calm once clicked or after a run is finished, and a small x hides it for the visit). New events: sort_tab_click, sort_tab_hide.
- Start button: the old bouncing bars are replaced by little packages dropping in from the top of the tile.
- New events: sort_popup_open (trigger: scroll, menu, shared_link), sort_popup_close, sort_start, sort_complete (parcels, accuracy, score, rank, challenge), sort_share_open, sort_share (method, score). Share links use utm_campaign=sort_run.
- New file: assets/img/sort-run-share-card.png (link preview picture for /sort-run/). Privacy text updated to mention Sort Run.

## 2026-10-21 - v2.20 (pre-launch)
- Sort Run pop-up: the scroll trigger now checks the scroll position directly, so a fast flick or jump past "What you need to get started" can no longer skip it. It still waits for a real scroll, tap or key press so it never opens on page load.
- Cache-busting version for assets/css/sortrun.css and assets/js/sortrun.js bumped to ?v=2.20 so browsers fetch the new files instead of an older saved copy.

