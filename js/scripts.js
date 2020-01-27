$(document).ready(function() {
  let randomUsed;
  sideBarClick();
  hideSidebar();
  anchors.options = {
    truncate: "600"
  };
  anchors.add("h3");
  linkload();
  celestialToggle();
  mobileHamburger();
  var scroll = new SmoothScroll('a[href*="#"]', { offset: 170 });
  //fixing a scroll bug in chrome with some ugly code
  var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (window.location.hash && isChrome) {
    setTimeout(function() {
      var hash = window.location.hash;
      var target = $('a[href*="' + hash + '"]');
      var secondTarget = $(target[1]);
      if (secondTarget && !randomUsed) {
        var targetLocation = secondTarget.offset().top - 170;
        window.scrollTo(0, targetLocation);
      }
    }, 300);
  }
});

//a function to simulate an SPA on a static site
function navigateContent(url) {
  //call ajax with the target url
  $.ajax(url)
    .done(function(content) {
      //grab the various parts of the target page
      var $newData = $(content);
      var $content = $("#pagecontent");
      var $title = $("#maintitle");
      //exchange the content of those parts with the new parts loaded via ajax
      $content.html($newData.find("#pagecontent").html());
      $title.html($newData.find("#maintitle").html());
      //add anchor links to all h3 titles. See respective functions below for what they do.
      anchors.options = {
        truncate: "400"
      };
      anchors.add("h3");
      //call smoothscrolling on all anchors
      var scroll = new SmoothScroll('a[href*="#"]');
      //jump to top when page loads
      window.scrollTo(0, 0);
      var titletext = $("#maintitle").text();
      hideSidebar();
      })
    .fail(function() {
      url = "/404.html";
      navigateContent(url);
    });
}

//a function to control a click on internal links
function linkclick(event, that) {
  //prevent the link from actually navigating to the url
  event.preventDefault();
  //grab the url to which the link is pointing
  var url = $(that).attr("href");
  // call the navigateContent function and pass that url to it
  navigateContent(url);
  //make sure the window recognizes this and adds it to the history queue for back and refresh actions
  window.history.pushState(
    {
      url: url
    },
    "",
    url
  );
}
//handle back/forward and refresh events
$(window).on("popstate", function(e) {
  var state = e.originalEvent.state;
  if (state && state.url) {
    navigateContent(state.url);
  }
});

function linkload() {
  //grab the url for the page
  var url = window.location.href;
  //make sure the window recognizes this and adds it to the history queue for back and refresh actions
  window.history.pushState(
    {
      url: url
    },
    "",
    url
  );
}
//handle back/forward and refresh events
$(window).on("popstate", function(e) {
  var state = e.originalEvent.state;
  if (state && state.url) {
    navigateContent(state.url);
  }
});

//a function to control sidebar clicks and collapses
function sideBarClick() {
  //whenever the class is clicked in the sidebar
  $("#sidebar").on("click", ".canOpen", function() {
    //define situational vars
    var hasExpanded = $(this).data("expanded") == "true";
    var nextGetsOpened = $(this).next(".getsOpened");
    var childCanOpen = nextGetsOpened.find(".canOpen");
    //if the clicked object has been expanded before
    if (hasExpanded) {
      //collapse it and relevant children
      $(this).removeClass("openitem");
      childCanOpen.removeClass("activeitem");
      $(this).data("expanded", "false");
      nextGetsOpened.slideUp(500);
      nextGetsOpened.find(".getsOpened").slideUp(500);
      childCanOpen.data("expanded", "false");
      //if the clicked object hasn't been expanded before
    } else {
      //open it and relevant children
      $(".itemdetails").removeClass("activeitem");
      $(this).addClass("openitem");
      $(this).data("expanded", "true");
      $(this)
        .next(".getsOpened")
        .slideDown(500);
    }
    return false;
  });
}

function celestialToggle() {
  //simple code for removing and adding the lighten class + localStorage to remember the user's choice. No longer in use thus hasn't been refactored in a while, please don't judge me, I was young and clueless.
  var selectedCelestialMode = localStorage.getItem("selectedMode");
  if (selectedCelestialMode == "light") {
    $("#homewrapper").addClass("lighten");
    $(".fa-moon").removeClass("fas");
    $(".fa-moon").addClass("far");
    $("#celestialbuttons i").css("color", "black");
    $(".fa-sun").addClass("shining");
  } else if (selectedCelestialMode == "dark" || selectedCelestialMode == null) {
    $("#homewrapper").removeClass("lighten");
    $(".fa-moon").removeClass("far");
    $(".fa-moon").addClass("fas");
    $("#celestialbuttons i").css("color", "#fff");
    $(".fa-moon").addClass("shining");
  }
  $(".fa-sun").click(function() {
    $(".fa-moon").removeClass("fas");
    $(".fa-moon").addClass("far");
    $("#homewrapper").addClass("lighten");
    $("#celestialbuttons i").css("color", "black");
    $("i").removeClass("shining");
    $(this).addClass("shining");
    localStorage.setItem("selectedMode", "light");
  });
  $(".fa-moon").click(function() {
    $(".fa-moon").removeClass("far");
    $(".fa-moon").addClass("fas");
    $("#homewrapper").removeClass("lighten");
    $("#celestialbuttons i").css("color", "#fff");
    $("i").removeClass("shining");
    $(this).addClass("shining");
    localStorage.setItem("selectedMode", "dark");
  });
}

function randomLink (event) {
  event.preventDefault();
  var pageLinks = document.getElementsByTagName("h3");
  // get a random number between 0 and the number of links
    var randIdx = Math.random() * pageLinks.length;
    // round it, so it can be used as array index
    randIdx = parseInt(randIdx, 10);
    //get that object from the array
    chosenLink = pageLinks[randIdx];
    //get its ID
    linkName = $(chosenLink).attr('id');
    //that ID appears twice so we actually the second target
    var target = $('a[href*="' + linkName + '"]');
    var secondTarget = $(target[1]);
    //got a second target? scroll to it
    if (secondTarget) {
      var targetLocation = secondTarget.offset().top - 210;
      window.scrollTo(0, targetLocation);
      $('h3').removeClass('randomlySelected');
      $(secondTarget).parent().addClass('randomlySelected');
    }
    //track that this function has been used for Reasons
    randomUsed = true;
}

//a function to control a click on the mobile hamburger button
function mobileHamburger() {
  var $hamburger = $(".hamburger");
  var sidebar = $("#sidebar");
  //on click, set data to control the toggle behavior.
  $hamburger.on("click", function(e) {
    $hamburger.toggleClass("is-active");
    var hasExpanded = $(sidebar).data("expanded") == "true";
    if (hasExpanded) {
      //if clicked, slide up and set data to unclicked.
      $(sidebar).slideUp(400);
      $(sidebar).data("expanded", "false");
    } else {
      //if unclicked, slide down and set data to clicked.
      $(sidebar).slideDown(400);
      $(sidebar).data("expanded", "true");
    }
  });
}


//a function to hide and display the sidebar according to title + padding for the rest of the page
function hideSidebar() {
  var $titleText = $("#maintitle").text();
  if ($titleText.indexOf("Welcome to anarchySF!") != -1) {
    console.log("Welcome to anarchySF!");
  } else {
    $("#sidebar").css("display", "none");
    $("#pagecontent").addClass('padded');
  }
};
