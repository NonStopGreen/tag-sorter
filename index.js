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
      constructor({ documents = [], tags = [], ignoredTags = []}) {
        if (!Array.isArray(documents) || documents.length == 0 || !documents.every(d => (typeof d === "object")))
          throw new TypeError('Parameter documents is not an array filled with objects');

        if (!Array.isArray(tags) || tags.length == 0 || !tags.every(t => (typeof t === "string")))
          throw new TypeError("Parameter tags is not an array filled with strings");

        this._documents = documents;
        this.documents = documents;
        this.tags = tags;
        this.ignoredTags = ignoredTags;
      }

      find() {
        var i;

        this.documents = this._documents.filter(doc => {
          for (i = 0; i < this.ignoredTags.length; i++) {
            if (doc.tags.includes(this.ignoredTags[i])) return;
          }

          for (i = 0; i < this.tags.length; i++) {
            if (doc.tags.includes(this.tags[i]))
              return doc
          }
        });

        return this;
      }

      limit(number = Infinity) {
        if (isNaN(number) || number < 0) throw new TypeError("Parameter number in limit() is not a positive number");

        if (this.documents.length >= number) this.documents = this.documents.slice(0, number);
        else throw new RangeError("Parameter number in limit() is bigger than documents length");

        return this;
      }

      sort(sortMethod = -1) {
        var self = this;
        var sortMethod = sortMethod;

        this.documents = this.documents.sort((object1, object2) => {
          var object1TotalTags = 0;
          var object2TotalTags = 0;
          var i;

          for(i = 0; i < self.tags.length; i++) {
            if (object1.tags.includes(self.tags[i])) object1TotalTags += 1;
            if (object2.tags.includes(self.tags[i])) object2TotalTags += 1;
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

        result.documents = this.documents;

        result.tagsCounted = allTags.reduce((prev, cur) => {
          prev[cur] = (prev[cur] || 0) + 1;
          return prev;
        }, {});

        result.uniqueTags = [...new Set(allTags)];

        return (typeof(result) === "function") ? fn([], result) : result;
      }
    }

    return Tag;
}));
