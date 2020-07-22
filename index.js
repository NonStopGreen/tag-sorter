
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';
    return function searchDocumentsByTags({documents = [], tags = [], ignoredTags = [], max = Infinity, sort = true})  {
      function sortDocumentsByTagsLength({object1, object2, tags}) {
          var object1TotalTags = 0;
          var object2TotalTags = 0;
          var i;

          for(i = 0; i < tags.length; i++) {
            if (object1.tags.includes(tags[i])) object1TotalTags += 1;
            if (object2.tags.includes(tags[i])) object2TotalTags += 1;
          }

          if (object1TotalTags < object2TotalTags) return 1;
          else if (object1TotalTags > object2TotalTags) return -1;
          return 0;
      }

      function filterOutDocumentsByIgnoredTags({object, index, max, ignoredTags}) {
        var i;
        for (i = 0; i < ignoredTags.length; i++) {
          if (object.tags.includes(ignoredTags[i]))
            return true;
        }
        return false;
      }

      function filterDocumentsByFollowedTags({object, index, max, tags}) {
        var i;
        for (i = 0; i < tags.length; i++) {
          if (object.tags.includes(tags[i]))
            return true;
        }
        return false;
      }

      function filterDocumentsByTags({object, index, max, tags, ignoredTags}) {
        var found = false, targetMap = {}, i, j, cur;

        // Check for ignored tags in object.tags
        found = filterOutDocumentsByIgnoredTags({
          object:object,
          index:index,
          max:max,
          ignoredTags:ignoredTags
        });

        if (found) return;

        // Check for followed tags in object.tags
        found = filterDocumentsByFollowedTags({
          object:object,
          index:index,
          max:max,
          tags:tags
        });

        if (found) return object && index < max;
      }

      if (!Array.isArray(documents) || documents.length == 0 || !documents.every(d => (typeof d === "object")))
        throw new TypeError('Parameter documents is not an array filled with objects')

      if (!Array.isArray(tags) || tags.length == 0 || !tags.every(t => (typeof t === "string")))
        throw new TypeError("Parameter tags is not an array filled with strings");

      if (max && isNaN(max))
        throw new TypeError("Parameter max is not a number");

      if (sort !== true && sort !== false)
        throw new TypeError("Parameter sort is not a boolean");

      var filteredDocuments = documents.filter((documents, index) => {
        return filterDocumentsByTags({
          object:documents,
          index:index,
          max:max,
          tags:tags,
          ignoredTags:ignoredTags
        })
      })

      if (sort) {
        filteredDocuments = filteredDocuments.sort((object1, object2) => {
          return sortDocumentsByTagsLength({
            object1:object1,
            object2:object2,
            tags:tags
          })
        })
      }

      return filteredDocuments;
    }
}));
