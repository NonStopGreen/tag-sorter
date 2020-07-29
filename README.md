# tag-sorter

Tag sorter is a small library (109 lines of code) for searching documents by tags.

## Features
Tag sorter can:

1. Search for documents with the tags that you want.
2. Sort them by how many tags are equal to initial tags.
3. Ignore tags that you dont want to see.

## Examples

```Javascript
// Data taken from stackoverflow.com
var documents = [
  {
    title: "How can I remove a specific item from an array?",
    tags: ["javascript", "arrays"]
  }, {
    title: 'How do I check if an element is hidden in jQuery?',
    tags: ['javascript', 'jquery', 'dom', "visibility"]
  }, {
    title: 'How do I redirect to another webpage?',
    tags: ['javascript', 'jquery', 'redirect']
  }, {
    title: 'How do JavaScript closures work?',
    tags: ['javascript', 'function', 'variables', 'scope', 'closures']
  }, {
    title: 'What does “use strict” do in JavaScript, and what is the reasoning behind it?',
    tags: ['javascript', "syntax", "jslint", "use-strict"]
  }, {
    title: 'How to check whether a string contains a substring in JavaScript?',
    tags: ["javascript", "string", "substring", "string-matching"]
  }, {
    title: "var functionName = function() {} vs function functionName() {}",
    tags: ['javascript', 'function', "syntax", "idioms"]
  }, {
    title: 'How do I remove a property from a JavaScript object?',
    tags: ["javascript", "javascript-objects"]
  }, {
    title: "Which equals operator (== vs ===) should be used in JavaScript comparisons?",
    tags: ["javascript", "operators", "equality", "equality-operator", "identity-operator"]
  }, {
    title: "How do I return the response from an asynchronous call?",
    tags: ["javascript", "jquery", "ajax", "asynchronous"]
  }, {
    title: "Why does HTML think “chucknorris” is a color?",
    tags: ["html", "browser", "background-color"]
  }, {
    title: "How do I check whether a checkbox is checked in jQuery?",
    tags: ["javascript", "jquery", "html", "checkbox"]
  }, {
    title: "How to horizontally center a <div>",
    tags: ["html", "css", "alignment", "centering"]
  }
];

// Followed tags
var noobie = ["html", "css"];
var fullStack = ["html", "css", "javascript", "node.js", "mongoose"];
var jqueryFan = ["jquery"];

// Ignored Tags
var frontendHater = ["html", "css"];
var backendHater = ["node.js", "php"];
var jqueryHater = ["jquery"];

var tag = new Tag({
  documents: documents
});

tag.find({ watchedTags: fullStack }).exec().documents // find all tags in fullStack array

tag.find({}).limit(1).exec().documents // limit to 1 result

tag.find({}).sort(-1).exec().documents // Sort them by descending order or ascending order. Arguments: "descending" or "ascending" or -1 or 1
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
