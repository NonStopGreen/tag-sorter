var assert = require('assert');
var searchDocumentsByTags = require('../index.js');
var searchDocumentsByTagsUglified = require('../index.min.js');

var documents = [
  {
    title:'Full guide to HTML5, CSS3 and Javascript',
    tags:['html', 'css', 'js']
  }, {
    title:'Full guide to HTML5 and CSS3',
    tags:['html', 'css']
  }, {
    title:'Full guide to HTML5 new tags',
    tags:['html']
  }
];

var tags = ['html', 'css', 'js']


describe('searchDocumentsByTags', function () {
  it('should search documents by tags (without ignoredTags)', function () {
    assert.deepEqual(
      searchDocumentsByTags({
        documents:documents,
        tags:tags
      }),
      [
        { title: 'Full guide to HTML5, CSS3 and Javascript', tags: [ 'html', 'css', 'js' ]},
        { title: 'Full guide to HTML5 and CSS3', tags: [ 'html', 'css' ] },
        { title: 'Full guide to HTML5 new tags', tags: [ 'html' ] }
      ]
    );
  });

  it('should search documents by tags (with ignoredTags)', function () {
    assert.deepEqual(
      searchDocumentsByTags({
        documents:documents,
        tags:tags,
        ignoredTags:["js"]
      }),
      [
        { title: 'Full guide to HTML5 and CSS3', tags: [ 'html', 'css' ] },
        { title: 'Full guide to HTML5 new tags', tags: [ 'html' ] }
      ]
    );
  });
});

describe('searchDocumentsByTagsUglified', function () {
  it('should search documents by tags (without ignoredTags)', function () {
    assert.deepEqual(
      searchDocumentsByTagsUglified({
        documents:documents,
        tags:tags
      }),
      [
        { title: 'Full guide to HTML5, CSS3 and Javascript', tags: [ 'html', 'css', 'js' ]},
        { title: 'Full guide to HTML5 and CSS3', tags: [ 'html', 'css' ] },
        { title: 'Full guide to HTML5 new tags', tags: [ 'html' ] }
      ]
    );
  });

  it('should search documents by tags (with ignoredTags)', function () {
    assert.deepEqual(
      searchDocumentsByTagsUglified({
        documents:documents,
        tags:tags,
        ignoredTags:["js"]
      }),
      [
        { title: 'Full guide to HTML5 and CSS3', tags: [ 'html', 'css' ] },
        { title: 'Full guide to HTML5 new tags', tags: [ 'html' ] }
      ]
    );
  });
});
