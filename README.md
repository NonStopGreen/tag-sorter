# tag-sorter

Tag sorter is a small library (109 lines of code) for searching documents by tags.

## Features
Tag sorter can:

1. Search for documents with the tags that you want.
2. Sort them by how many tags are equal to initial tags.
3. Ignore tags that you dont want to see.

## Examples

```Javascript
var tagSorter = require("tag-sorter");

var documents = [
  {
    title:"Full guide to HTML5, CSS3 and Javascript",
    tags:["html", "css", "js"]
  }, {
    title:"Full guide to HTML5 and CSS3",
    tags:["html", "css"]
  }, {
    title:"Full guide to HTML5 new tags",
    tags:["html"]
  }
];

tagSorter({
  documents: documents, // Array
  tags: ["html", "css"], // Array
  ignoredTags: ["js"], // Array - Default: []
  max: 3, // Number - Default: Infinity
  sort: true // Boolean - Default: true
});

// The function tagSorter will return:

/*
[
  // { title: 'Full guide to HTML5, CSS3 and Javascript', tags: [ 'html', 'css', 'js' ]} This one is ignored 
  { title: 'Full guide to HTML5 and CSS3', tags: [ 'html', 'css' ] },
  { title: 'Full guide to HTML5 new tags', tags: [ 'html' ] }
]
*/
```

## NPM Package - Soon!

## Contributions
Contributions, issues and feature requests are very welcome.

## Disclaimers
This is our first proper open source project. It's kinda neat, and it works, but it's probably not finished.

Let us know if you have ideas about how to make this library more advanced.

## Support NonStopGreen
NonStopGreen is an organization working to make the environment cleaner.

If you like our projects on Github or [here](https://www.nonstopgreen.com/projects), feel free to donate to one of our projects or support us on patreon: [Patreon page](https://www.patreon.com/nonstopgreen)
