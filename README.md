# aha001-websites

Static website contents of the project Codename:Aha001.

## The empty site

`empty_site` is an empty placeholder for the unused websites.

## The SeedV site

Simple homepage of http://www.SeedV.com.

## The team site

`team_site` is a [hugo](https://gohugo.io/)-generated static blog site for the
Aha001 team to post random contents.

`team_site` is also a place for the Aha001 team to host static web applications
for prototyping or testing.

### How to write and publish a post?

[Install
hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo).

Create a new post with hugo:

```Bash
cd team_site
hugo new posts/your_post_name.md
```

Edit the content of `contents\posts\your_post_name.md`. Remember to set `draft:
false` in the file header. Then, test the site with:

```Bash
hugo server
```

And, generate the site's static contents with:

```Bash
hugo
```

The generated contents stay in the dir `team_site/public`. Notice that its
subdir `apps` is not generated by `hugo`. Be careful if you plan to do some
clean-up things in `team_site/public`.

Submit and push your change to github:

```Bash
git add .
git commit -m "Your commit description"
git push
```

That's it.

### How to publish a demo application?

Create a subdir under `team_site/public/apps` and copy all the static contents
of the web application into the subdir. Your demo application will be accessed
via a URL like:

```Bash
https://www.aha001.com/apps/your_demo_app/
```

Submit and push your change to github:

```Bash
git add .
git commit -m "Your commit description"
git push
```

Done.
