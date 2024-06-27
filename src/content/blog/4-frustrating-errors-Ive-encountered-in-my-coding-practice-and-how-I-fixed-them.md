---
title: '4 frustrating errors - fixed!'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jul 20 2022'
heroImage: '/feature-frustration.png'
---

![Graphic of a frustrated woman](/images/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/feature-frustration.png)

For the past week, I have been grinding hard on my projects and creating this blog with the hugo framework. During that time, I have come across numerous of errors. These are the ones that have stuck out the most:

<h1> 1. No commands working in my terminal! </h1>

I was trying to download Python to start working, and then this started happening…
![Screenshot of Mac OS terminal](/images/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/Screenshot-3.png)

```
zsh:command not found: rm
```
```
zsh:command not found: ls
```
```
zsh:command not found: brew
```


(and I had Homebrew installed! It was all in my hidden files).

Every command I tried to use was not found. I could not use python and thought I recked my entire terminal. However, through google search and encountering a blog - the solution was actually quite simple.

Copy & paste this and watch the magic happen:

```zsh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
```

![Screenshot of Mac OS terminal](/images/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/Screenshot-4.png)

Abracadabra.

<h2> Wait…but python is still not working? </h2>

```
zsh: command not found: python
```

This is because when you download Python 3 in Homebrew, the command becomes:

```
python3 
```

Now you are using python.

<h2> 2. how do i make a python file through terminal? </h2>

I am following w3schools curriculum with python. However, following their guide did not show me how to make a file in terminal, and I thought it would be useful. I did:

```$ touch helloworld.py```

Then I opened up Visual Studio code and typed:

```python
print("Hello, World!")
```

Then I did: 

```
python3 helloworld.py
```

and it printed, <i>Hello, World!</i>

Yay!

<h1> 3.  My hugo static site will not deploy on render or netlify </h1>
Three things:

- Your website must be using a theme through a submodule
- Your config file must be free from spelling errors
- Your baseURL needs to equal the URL the hosting service provider gave you, NOT the domain you bought.
    - For example, my baseURL is as follows:

    ```python
    baseURL = "https://sharas-real-bubbles.onrender.com"
    ```
- As always, make sure your site is working on your local host before deploying

<h2> My static site deployed by my custom scss is not working when it worked on localhost </h2>

A few Things:

- The ONLY thing that officially worked for me was going to Github, forking the submodule of the theme I want, then cloning that instead. As long as your custom SCSS is in theme/assets/scss/custom/_custom.scss , your design should be showing.
- Another issue could be your settings on the deploying provider. I have seen many websites with different suggestions.
    1. I had to make sure there were no extra branches in my repository. 
    2. Having many errors where I had to delete my previous folder and copy/paste into a new folder did not always completely delete the repository in Github. If you have had to redownload the theme many times, I suggest deleting all previous repositories from your github. Copy and paste what you know is working into your freshly downloaded theme and give the folder a completely different name. 
    3. I only have ONE branch and it is called “master”. It makes everything easier.

Branch:

```
master
```

Build command:

```
hugo --gc --minify
```

Publish directory:

```
public
```

Auto Deploy: Yes

<h2> My markdown images are not showing on my website. </h2>

For some reason, in my particular theme, the About Me page (_index.md) works differently than the posts (Iwriteanythinghere.md).

 In the About Me, I could put my image in the same folder and it would work on my pages. However, I still currently have the problem of my selfie loading slowly.

Code:

```html 
<img src="Shara-selfie.png" alt="Picture of Shara" width="400" class="author_avatar"/> 
```

Folder Structure:

<img src="/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/Folder%20Structure.png" alt="VSCode blog folder structure" width="400"/>

For posts, my image has to be under the static folder or it will not work. Static gets processed as the root of your project though, so you should not add /static/ into your link or it will STILL not work.

<b> Code </b>

```markdown
![Picture of a desk](/images/3-reasons-why-you-should-start-a-blog/start-blog.png)
```
<b> Folder Structure:</b>

<img src="/images/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/FolderStructure2.png" alt="VSCode Blog folder structure" width="400"/>

<h1> 4. I need to remove index.html and .html from my static site! how??? </h1>

During my internet research I have seen so many ways of doing this. However, I never understood exactly how to do it because I did not know the WHY.

1. Create a file called .htaccess. You can do this in Visual Studio Code.

<img src="/images/4-frustrating-errors-Ive-encountered-in-my-coding-practice-and-how-I-fixed-them/htaccess.png" alt=".htaccess folder in VS Code" width="400"/>

Here is the copy and paste code with mini explanations: 

```shell
# mod_rewrite starts here

RewriteEngine on

# does not apply to existing directories, meaning that if the folder exists on the server then don't change anything and don't run the Rule!

RewriteCond % {REQUEST_FILENAME} !- d

# Check for file in directory with .html extension

RewriteCond % {REQUEST_FILENAME}\.html - f

# Here we actually show the page that has the .html extension

RewriteRule ^ (.*)$ $1.html[NC, L]
```

> htaccess files are written in the Apache Directives variant of the Perl Compatible Regular Expressions (PCRE) language. However, there is no specific name for the syntax as a whole, but they are called [Directives](https://httpd.apache.org/docs/2.2/mod/directives.html).

<h2> Okay, but .html and index.html is still there??? </h2>

That is because for all of the links in your website referring to another page on your website, you must delete the html in the href. 

Here is an example:

<h3 class="red-text">change</h3>

```html
<li class="nav-item">
                        <a class="nav-link" href="/about-me.html">About Me</a>
                    </li>
```
<h3 class="red-text">to</h3>

```html
<li class="nav-item">
                        <a class="nav-link" href="/about-me">About Me</a>
                    </li>
```
<span class="red-text">This must be done on EVERY html page for EVERY internal link.</span> If you want the link to look different, change the name of the html file. 

> Something I do not know yet: How do I make this work if I put all my html files in one folder or in different folders? What if I do not want that folder to be in my URL? (If you know, answer below in the comment section, thank you!)

<h2> What about index.html ??? </h2>
Every internal link pointing to your index.html will be replaced with a “ / ”.

```html
<a class="navbar-brand" href="/"><img
                    src="https://www.dropbox.com/s/logo-image"
                    alt="Shara, the Designer & Developer" width="60" height="auto"></a>
```

That is all for today folks!