# Link Robins Post Numbers

Adds a `#1`, `#2`, `#3`... number to each post in a discussion. Helpful for referring to specific posts ("see #4 above") and giving readers a sense of where they are in a long thread.

Ported to Flarum 2.0 from [`ziven/flarum-post-number`](https://github.com/Ziiven/flarum-post-number) (MIT).

## What it does

Extends `CommentPost.headerItems` to append a small `#N` label to each post's header, where N is the post's sequence number within its discussion. Hidden posts are skipped, matching the original extension's behavior.

## Requirements

- Flarum **2.0** or later
- PHP **8.3** or later

## Installation

```
composer require linkrobins/post-num
php flarum cache:clear
```

In Flarum admin → **Extensions**, find **Link Robins Post Numbers** and enable it. No configuration needed.

## What changed from the 1.x original

The original extension targeted Flarum 1.x and relied on a webpack/JSX build pipeline. This 2.0 port:

- Targets `flarum/core ^2.0`
- Uses the runtime `extend()` helper from the export registry with string-path lazy module resolution, so no JSX/build step is required
- Uses the canonical 2.0 model accessors (`post.number()`, `post.isHidden()`) with fallback to raw attribute access for resilience
- Renames the CSS class to `LinkRobinsPostNum` to avoid colliding with the original if both are ever installed side-by-side
- Adds tabular-numeric digit alignment so post numbers stay column-aligned in lists

Translation strings follow the same shape — the only difference is the namespace key.

## License

MIT. Credit to the original author for the design.
