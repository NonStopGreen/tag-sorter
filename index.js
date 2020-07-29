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

    class Tag {
      constructor({ documents = []}) {
        this.isArrayFilledWithObjects(documents);


        this._documents = documents;
        this.documents = documents;
        this.limitCount = Infinity;
      }

      // Is array filled with X
      isArrayFilledWithStrings(arr) {
        if (!Array.isArray(arr) || arr.length === 0 || arr.some(item => (typeof item !== "string")))
          throw new TypeError("Array is not filled with strings");
      }

      isArrayFilledWithObjects(arr) {
        if (!Array.isArray(arr) || arr.length == 0 || arr.some(item => (typeof item !== "object")))
          throw new TypeError('Array is not filled with objects');
      }

      find(query = {}) {
        var i;

        var { watchedTags, ignoredTags } = query;

        this.watchedTags = watchedTags;
        this.ignoredTags = ignoredTags;

        if (watchedTags) this.isArrayFilledWithStrings(watchedTags);
        if (ignoredTags) this.isArrayFilledWithStrings(ignoredTags);

        this.documents = this._documents.filter(doc => {
          if (ignoredTags)
            for (i = 0; i < ignoredTags.length; i++) {
              if (doc.tags.includes(ignoredTags[i])) return;
            }

          if (watchedTags)
            for (i = 0; i < watchedTags.length; i++) {
              if (doc.tags.includes(watchedTags[i]))
                return doc
            }

        });

        if (!watchedTags && !ignoredTags) this.documents = this._documents;

        return this;
      }

      limit(number = Infinity) {
        if (isNaN(number) || number <= 0) throw new TypeError("Parameter number in limit() is not a positive number larger than 0");

        this.limitCount = number;

        return this;
      }

      sort(sortMethod = -1) {
        var self = this;
        var sortMethod = sortMethod;

        this.documents = this.documents.sort((object1, object2) => {
          var object1TotalTags = 0;
          var object2TotalTags = 0;
          var i;

          for(i = 0; i < self.watchedTags.length; i++) {
            if (object1.tags.includes(self.watchedTags[i])) object1TotalTags += 1;
            if (object2.tags.includes(self.watchedTags[i])) object2TotalTags += 1;
          }

          if (sortMethod === "descending" || sortMethod === -1) {

            if (object1TotalTags < object2TotalTags) return 1;
            else if (object1TotalTags > object2TotalTags) return -1;

          } else if (sortMethod === "ascending" || sortMethod === 1) {

            if (object1TotalTags > object2TotalTags) return 1;
            else if (object1TotalTags < object2TotalTags) return -1;

          } else {
            throw new TypeError('Parameter for sort() should be: "descending" or "ascending" or -1 or 1');
          }
          return 0;
        })

        return this;
      }

      exec(fn) {
        var allTags = this.documents.flatMap(d => d.tags);

        var result = {};

        // Set result objects
        result.documents = this.documents.slice(0, this.limitCount);

        result.tagsCounted = allTags.reduce((prev, cur) => {
          prev[cur] = (prev[cur] || 0) + 1;
          return prev;
        }, {});

        result.uniqueTags = [...new Set(allTags)];

        // Reset all values
        this.watchedTags = [];
        this.ignoredTags = [];
        this.limitCount = Infinity;
        this.documents = this._documents;

        return (typeof(fn) === "function") ? fn(result) : result;
      }
    }

    return Tag;
}));
