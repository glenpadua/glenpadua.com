# Sunrise, sunset and moonrise verification

Local follow-up checked on 27 September 2026 at `/preview/diorama`, using the development server on port 3102.

## What changed

The sun begins partially hidden behind the lake's right-hand ridge. A scene-owned silhouette mask retains the approved landscape and pine artwork while exposing the shared sky. Its painting-relative sunrise anchor is projected into the viewport on initialization and resize.

Scrolling immediately raises the sun and gently brightens the lake. The sun travels right to left through noon and sunset. The moon rises from the opposite horizon during sunset, and stars emerge progressively before full night. The entire progression follows native scroll in both directions; ambient animation retains the shared pause policy.

## Observed in the browser

- At 1280 × 800, the sun peeks over the ridge beside the pull-up bar, rises and moves left during the opening scroll. The lake's dawn tint decreases from 0.12 to approximately 0.074 after the first partial scroll.
- At 390 × 844, sunrise stays inside the viewport, clear of the introductory copy. The sun moves from the right ridge toward the centre at noon, then down toward the left horizon.
- During the beach-to-city transition, the setting sun and rising moon are both visible. At sky time 0.765, stars have approximately 0.20 opacity; further scrolling visibly raises the moon and brightens the stars.
- Scrolling back from twilight restores the noon palette and sun position. Keyboard activation of the pause control pauses the clouds, birds and sun's ambient glow. Resuming restores running animation.
- Desktop and portrait compositions were inspected; no horizontal overflow was observed. These observations included live scrolling and changes over time, not only still screenshots.

## Automated checks

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build -- --webpack`: passed, coordinated with the other scene threads.
- `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/beach-football.test.mjs scripts/sky-time.test.mjs`: all 17 tests passed.
- The sky tests cover immediate morning progression, projected sunrise origins, continuous east-to-west travel, overlapping sunset/moonrise, gradual stars, reverse travel and scene configuration changes.

## Evidence and limits

- [Desktop sunrise](sunrise-desktop.png)
- [Portrait sunrise](sunrise-phone.png)
- [Portrait twilight](twilight-phone.png)

The layer mask is also applied to the existing failed-image and no-JavaScript static fallback. Built HTML fallback contracts passed. Reduced-motion rules and fallback paths were source-reviewed; this follow-up did not newly emulate disabled JavaScript or reduced motion in the browser. No physical-phone, full screen-reader or field-performance claim is made. Work and Stories continue to be refined independently.
