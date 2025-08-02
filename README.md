## anarchySF

AnarchySF is an online archive of the intersection between anarchy and science fiction. This archive is an open-source repository of anarchist or anarchy-adjacent science fiction. Featured on the site are books, movies, and other media which are either anarchist in their politics or of interest to anarchists.

This archive was first collected and organized by [Ben Beck](http://benbeck.co.uk), who gathered and maintained it for the better part of four decades (!) As of 2019, it was redesigned and re-built by Eden Kupermintz and Yanai Sened as a collaborative effort.

## Contributing

We welcome any and all contributions to the site and especially appreciate fixes to existing entries or additions of new entries.

* For mistakes like typos, dead links, bad images and the such, please **Open an Issue for this repository**.

* For substantial fixes to the content (re-writes, corrections beyond one word, rephrasing), please open a Pull Request directly to master editing the relevant Markdown file. Please leave a summary in the PR of what you changed; we're doing this in our free time and every little bit helps!

* For new additions, please also submit detailed PRs. The sidebar and homepage will automatically update once you've added your Markdown file, no additional code is needed. **Note: this will only work properly if your front-matter is correct. See below for specifications**.

## Running the Site Locally

If you want to build a local copy of the site, you have two approaches avaiable to you:

0) Run both `bundle install` and `yarn install` (you can use `npm install` as well, if needed)
1) Clone the repo and simply use Jekyll's built in `server` capabilities with `bundle exec jekyll serve --incremental`
2) Clone the repo and install prerequisites with `npm install`. You can then use `gulp default` to build the site with gulpJS, which gives you hot reloading.

## A Note on CSS

AnarchySF uses the brilliant Tailwind CSS. If you'd like to make changes to the site's design, please make all changes to the `site.css` file. This gets compiled alongside Tailwind's default classes, so you can use their utilities.

## Site Structure

The site is a relatively simple Jekyll website. While all entries are displayed on the homepage, they are each "grabbed" from a Markdown file. Simply navigate to the `pages` folder, find the letter under which the entry you'd like to edit would be found and then search for the file. As it stands today, file names are non-intuitive; we plan on improving this. For now, use a search tool to find the correct file (or cross-reference its position with the sidebar; it progresses linear within each folder) and make your edits there.

The rest of the pages on the site (like the about page) are found in the same folder, under no specific sub-folder. **At this time, we are not accepting contributions of new pages, only new entries to the archive**.

## Front-matter

The Liquid code which generates the homepage and the main sidebar relies on the accuracy of the front-matter of each file. The parameters and specifications are as follows:

* `format:` accepts either "film" or "book" as its value. There are slight differences between how each format is rendered on the homepage (like whether the title or the author name is displayed in the sidebar) so selecting the correct format is important.

* `yearReleased:` the format for this is: "1979-92". You might find some deviations in the site but these will eventually be fixed.

* `category:` the letter under which the article falls. For books, **use the first letter of the author's last name**. For films, **use the first letter of the film's name**.

* `title:` the name of the entry you are entering. Title casing should be used.

* `author:` the name of the author, first name and then last name.



## Code of Conduct

**Please note** that anarchySF operates under the Contributor Covenant Code of Conduct. By participating in this project you agree to abide by its terms. You can find the Code of Conduct <a href="codeofconduct.html">here</a>. All violations should be reported to [Eden Kupermintz](mailto:eden@heavyblogisheavy.com).
