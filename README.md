# Personal Website (Jekyll + Compass)

This is the source code for my personal website, built with [Jekyll](https://jekyllrb.com/) and [Compass](http://compass-style.org/) for Sass/CSS management.

## Getting Started

### Prerequisites
- Ruby (macOS usually has it pre-installed)
- [Bundler](https://bundler.io/) (optional, but recommended)
- Jekyll
- Compass

### Install dependencies

1. Install Bundler (if not already):
   ```sh
   gem install bundler
   ```
2. Install Jekyll and Compass:
   ```sh
   gem install jekyll compass
   ```

### Running the site locally

1. **Start Jekyll with live reload:**
   ```sh
   jekyll serve --livereload
   ```
   - Visit [http://localhost:4000](http://localhost:4000) to view the site.
   - Jekyll will watch for changes in your content and rebuild automatically.

2. **Compile Sass with Compass in watch mode:**
   In a separate terminal, run:
   ```sh
   compass watch
   ```
   - This will watch the `sass/` folder and compile changes to `css/`.

## Project Structure
- `_posts/`, `_drafts/`: Blog posts and drafts (Markdown)
- `_layouts/`, `_includes/`: Jekyll templates and partials
- `sass/`: Source Sass files
- `css/`: Compiled CSS output
- `config.rb`: Compass configuration
- `_config.yml`: Jekyll configuration

## Notes
- Edit your styles in `sass/`, not `css/`.
- If you want to change Compass settings, edit `config.rb`.
- For more info, see [Jekyll docs](https://jekyllrb.com/docs/) and [Compass docs](http://compass-style.org/help/).
