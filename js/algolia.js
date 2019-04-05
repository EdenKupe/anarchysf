var client = algoliasearch("3A13LF0NQN", "2066d124b58e7b6d9aabc19d2a38fc40");
var anarchyIndex = client.initIndex("anarchy");
var search = document.getElementById("aa-search-input");

const searchInstance = autocomplete(
  "#aa-search-input",
  {
    debug: false
  },
  [
    {
      source: autocomplete.sources.hits(anarchyIndex, { hitsPerPage: 7 }),
      displayKey: "",
      name: "anarchy" /* class aa-dataset-anarchy */,
      templates: {
        suggestion: function(suggestion) {
          console.log(suggestion);
          let value = suggestion.pagename;
          let content = suggestion.content;
          let link = suggestion.permalink;
          let title = $("title");
          let titletext = title.text();
          if (suggestion._highlightResult.author) {
            value = suggestion._highlightResult.author.value;
          }
          if (suggestion._snippetResult.content) {
            content = suggestion._snippetResult.content.value;
          }
          let initialText = suggestion.author + "-" + suggestion.title;
          let linkText = slugify(initialText);
          suggestion.permalink = linkText;
          return (
            '<span class="searchtitlecontainer">' +
            '<a href="#' + linkText + '" + class="searchtitle" href="' +
            link +
            '">' +
            value +
            "</a> </span>" +
            "<br />" +
            '<a class="searchlinktext" href="#' +
            linkText +
            '">' +
            '<span class="searchcontentcontainer">' +
            content +
            "</span> </a> "
          );
        }
      },
      empty: '<div class="aa-empty">No results found!</div>'
    }
  ]
);

searchInstance.on({
  "autocomplete:shown": function() {
    var content = document.getElementById("pagecontent");
    var sidebar = document.getElementById("sidebar");
    var footer = document.getElementById("homefooter");
    var diamond = document.querySelector("pre");
    content.classList.add("overlayvisible");
    sidebar.classList.add("overlayvisible");
    footer.classList.add("overlayvisible");
    $(diamond).css("visibility", "visible")
  },
  "autocomplete:closed": function() {
    var content = document.getElementById("pagecontent");
    var sidebar = document.getElementById("sidebar");
    var footer = document.getElementById("homefooter");
    var diamond = document.querySelector("pre");
    content.classList.remove("overlayvisible");
    sidebar.classList.remove("overlayvisible");
    footer.classList.remove("overlayvisible");
    $(diamond).css("visibility", "hidden");
  },
  "autocomplete:empty": function() {
    var content = document.getElementById("pagecontent");
    var sidebar = document.getElementById("sidebar");
    var footer = document.getElementById("homefooter");
    var diamond = document.querySelector("pre");
    content.classList.add("overlayvisible");
    sidebar.classList.add("overlayvisible");
    footer.classList.add("overlayvisible");
    $(diamond).css("visibility", "hidden");
  },
  "autocomplete:selected": function(event, suggestion, dataset, context) {
    var updatedLink = suggestion.permalink
    window.location = "#" + updatedLink;
    console.log(updatedLink);
  },
  "autocomplete:updated": function() {
    if (this.value != "") {
      var input = document.getElementById("aa-search-input");
      var filter = input.value.toUpperCase();
      localStorage.setItem("filter", filter);
    } else {
      var content = document.getElementById("pagecontent");
      var sidebar = document.getElementById("sidebar");
      var footer = document.getElementById("homefooter");
      var diamond = document.querySelector("pre");
      content.classList.remove("overlayvisible");
      sidebar.classList.remove("overlayvisible");
      footer.classList.remove("overlayvisible");
      $(diamond).css("visibility", "hidden");
    }
  }
});

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/'s/g, 's')
    .replace(/[^\u0100-\uFFFF\w\-]/g,'-') // Remove all non-word chars ( fix for UTF-8 chars )
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
