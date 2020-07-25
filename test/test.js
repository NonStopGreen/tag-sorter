var assert = require('assert');
var Tag = require('../index.js');
var TagUgly = require('../index.min.js');

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
  documents: documents,
  tags: fullStack
});

describe('tag.find().exec()', function () {
  it('should find documents', function () {
    assert.deepEqual(
      tag.find().exec().documents,
      tag._documents.filter(doc => {
        for (i = 0; i < tag.ignoredTags.length; i++) {
          if (doc.tags.includes(tag.ignoredTags[i])) return;
        }

        for (i = 0; i < tag.tags.length; i++) {
          if (doc.tags.includes(tag.tags[i]))
            return doc
        }
      })
    );
  });
});

describe('tag.find().limit(x).exec()', function () {
  it('should find documents and limit them', function () {
    assert.deepEqual(
      tag.find().limit(1).exec().documents,
      tag._documents.slice(0, 1));

    assert.deepEqual(
      tag.find().limit(5).exec().documents,
      tag._documents.slice(0, 5));
  });
});

describe('tag.find().sort(number).exec()', () => {
  it('should find documents and sort them', () => {

    assert.deepEqual(
      tag.find().sort(-1).exec().documents,
      tag._documents.filter(doc => {
        var i;
        for (i = 0; i < tag.ignoredTags.length; i++) {
          if (doc.tags.includes(tag.ignoredTags[i])) return;
        }

        for (i = 0; i < tag.tags.length; i++) {
          if (doc.tags.includes(tag.tags[i]))
            return doc
        }
      }).sort(function (object1, object2) {
        var object1TotalTags = 0;
        var object2TotalTags = 0;

        var i;

        for(i = 0; i < tag.tags.length; i++) {
          if (object1.tags.includes(tag.tags[i])) object1TotalTags += 1;
          if (object2.tags.includes(tag.tags[i])) object2TotalTags += 1;
        }

        if (object1TotalTags < object2TotalTags) return 1;
        else if (object1TotalTags > object2TotalTags) return -1;

        return 0;
      })
    );

    assert.deepEqual(
      tag.find().sort(1).exec().documents,
      tag._documents.filter(doc => {
        var i;
        for (i = 0; i < tag.ignoredTags.length; i++) {
          if (doc.tags.includes(tag.ignoredTags[i])) return;
        }

        for (i = 0; i < tag.tags.length; i++) {
          if (doc.tags.includes(tag.tags[i]))
            return doc
        }
      }).sort(function (object1, object2) {
        var object1TotalTags = 0;
        var object2TotalTags = 0;

        var i;

        for(i = 0; i < tag.tags.length; i++) {
          if (object1.tags.includes(tag.tags[i])) object1TotalTags += 1;
          if (object2.tags.includes(tag.tags[i])) object2TotalTags += 1;
        }

        if (object1TotalTags > object2TotalTags) return 1;
        else if (object1TotalTags < object2TotalTags) return -1;

        return 0;
      })
    );
  });
});
