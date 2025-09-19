# Nicolas Schneider — Portfolio & Blog

A polished personal site built with Jekyll and GitHub Pages to showcase my
programming projects, blog posts, and CV. The site combines lightweight animations,
a dark/light theme toggle, and modular content collections to keep the portfolio easy to
maintain and extend.

## Features
- Responsive layout using Bootstrap 5 with a hero section, project grid, and blog cards
- Dark/light theme toggle with animated particle background on the homepage
- Scroll-triggered animations and smooth page transitions powered by vanilla JavaScript
- Structured project collection (`_projects/`) with individual detail pages
- Blog section sourced from Markdown posts in `_posts/`
- SEO-ready configuration (`jekyll-seo-tag`, Open Graph metadata, social previews)

## Quick Start
1. **Install prerequisites**
   - Ruby (>= 3.0 recommended)
   - Bundler (`gem install bundler`)
2. **Install dependencies**
   ```bash
   bundle install
   ```
3. **Run the site locally**
   ```bash
   bundle exec jekyll serve --livereload
   ```
4. Open http://127.0.0.1:4000 in your browser. Changes to Markdown, HTML, CSS, and JS files are picked up automatically.

## Project Structure
```
_config.yml            # Global site metadata, URLs, plugins
_layouts/              # Base templates (default, project, etc.)
_includes/             # Reusable components (head, navbar, footer)
_posts/                # Blog posts (Markdown, dated filenames)
_projects/             # Project metadata & content (Markdown, front matter)
blog/index.html        # Blog listing page
projects/index.html    # Project grid overview
css/                   # Custom styles (global + particle animation)
js/                    # Scroll animations and page transition scripts
images/                # Profile photo and other assets
_site/                 # Generated output (ignored by Git)
Gemfile                # Ruby dependencies for GitHub Pages
```

## Customization Guide
- **Site metadata:** Update titles, descriptions, and social links in `_config.yml`.
- **Homepage content:** Edit `index.html` for hero text, highlights, and call-to-action links.
- **Projects:** Add new Markdown files in `_projects/` with front matter (`title`, `summary`, `github_repo`, etc.). Each file becomes a dedicated project page.
- **Blog posts:** Create new Markdown files under `_posts/` using the `YYYY-MM-DD-title.md` naming convention.
- **Styling:** Adjust global styles in `css/style.css` and animation-specific rules in `css/dots_animation.css`.
- **Scripts:** Tweak scroll effects in `js/scroll-animations.js` and navigation transitions in `js/page-transitions.js`.

## Deployment
This repository is ready for GitHub Pages. Push changes to the default branch and GitHub Pages will build and publish the site automatically. To produce a static build locally run:
```bash
bundle exec jekyll build
```
The generated HTML lives in `_site/`.

## Troubleshooting
- Clear the `_site/` directory if you notice stale content after switching branches.
- Run `bundle update` when GitHub Pages upgrades its dependency set (see the [pages-gem changelog](https://github.com/github/pages-gem/releases)).
- Use `JEKYLL_ENV=production bundle exec jekyll build` to replicate the production build locally with minified assets.

## License
- **Code**: Licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code with attribution.
- **Content (text, images, personal materials)**: © Nicolas Schneider. These may not be reused or redistributed without permission.
For inquiries regarding content reuse, please [contact me](mailto:schneidernicolas90@gmail.com).
