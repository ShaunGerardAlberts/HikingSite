/* Use this file as a start - comment all lines and functions to show your understanding */
/* My comments are minimal - you are required to write more */

/* Check your browsers console for messages */
/* Use console.log() as many times as you need to */

// ****************   Move menu to top-fixed if scrolled down  ***************/
// apply a fixed menu bar for the desktop layout, if not desktop dont apply
var topPosition = 0;
var whenToChange = 100;
var desktopSize = 768;
var windowWidth = $(window).width();
// When width indicates this device is a dektop, add scroll listener
if (windowWidth >= desktopSize) {
  $(window).on('scroll', function() {
      var scrollFromTop = $(document).scrollTop() - topPosition;
      // When scrolled over 100px from top fix nav, else don't fix it
      if (scrollFromTop > whenToChange) {
        $('#collapsemenu').addClass('navbar-fixed-top');
        $('#collapsemenu').addClass('remove-margin');
      } else { // scrolled less than 100px from top, don't fix nav
        $('#collapsemenu').removeClass('navbar-fixed-top');
        $('#collapsemenu').removeClass('remove-margin');
      }
  });
}

/*****************************  For the contact form submission ****************************************************************/
// When the user click the contact form submission button, this is fired.
$('#contact-submission').on('click', function () {
  // Prevent the default action
  event.preventDefault();
  var userEmail = $('#exampleInputEmail').val();
  // Test that the email is valid
  var isValidEmail = validateEmail(userEmail);

  // If valid email, then send as ajax request to the server sending the email, then wait for a response
  if (isValidEmail) {
    $.ajax({
      method: "POST",
      dataType: "JSON",
      //url: "inc/call-me.php",
      url: "http://dj3dw.com/des223-2017-assessment03/inc/call-me.php",
      data: {
        type: "contact",
        mail_to: "sga006@student.usc.edu.au",
      }
    }).done(function (jsonObject) {
      // Send the respoonse to a function that will display the status of the request
      validateEmailSubmission(jsonObject)
    })
  }
});

// Test the json object to see if the email was delivered successfully
function validateEmailSubmission(jsonObject) {
  if (jsonObject.success) {
    alert("Submission Successful")
  } else {
    alert("Submission Unsuccessful")
  }
}

// This will check if the email is blank, invalid or valid
function validateEmail(email) {
  // no email text is entered
  if (email.length == 0) {
    $('#emailResponseTag').text('');
    $("#emailResponseTag").text('** Email is blank');
    return false;
  } else { // not blank
    // copied this regex from : http://www.jquerybyexample.net/2011/04/validate-email-address-using-jquery.html
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
      $('#emailResponseTag').text('');
      $('#emailResponseTag').text('**Email is required');
      //$("#er").removeClass(".emailResponseAdd");
      return true;
    } else {
        $('#emailResponseTag').text('');
        $("#emailResponseTag").text('** Invalid email entry');
        return false;
    }
  }
}
/*********************************************************************************************/

/* Set global variables */
var blogCount = 0;
var limit = 4;
var itemsGlobal = {};

/* Do the ajax call for the blog immediately */
$(document).ready(function () {
  $.ajax({
    method: "POST",
    dataType: "JSON",
    //url: "inc/call-me.php",
    url: "http://dj3dw.com/des223-2017-assessment03/inc/call-me.php",
    data: {
      type: "blog"
    }
  }).done(function (r) {
    createBlogList(r.blog.items);
  })

});

/* Listen for the click of the load more button */
$('#load-more').on('click', function () {
  createBlogList(itemsGlobal);
});

/* When the blog is loaded this function will be used */
function createBlogList(items) {
  var i = 1;
  $blogWrap = $('#blog');
  if (blogCount === 0) {
    itemsGlobal = items;
    $blogWrap.html('');
  }

  //console.log('Blog count ' + blogCount);
  //console.log('Blog items length ' + items.length);

  if (blogCount < items.length) {

    for (blogCount; blogCount < items.length; blogCount++) {

      if (i > limit) {
        break;
      }
      i++;

      html = ''; // HTML placeholder - build on this each time.

      id = items[blogCount].id;
      title = items[blogCount].title;
      date = items[blogCount].date;
      author = items[blogCount].author;
      thumbnail = items[blogCount].images.thumb;
      full = items[blogCount].images.full;
      excerpt = items[blogCount].excerpt;
      content = items[blogCount].content;

      html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 blog-item" data-id="' + id + '">';
      //html += '<h1 id="id">' + id + '</h1>';
      html += '<div class="col-md-4 col-lg-4"><img src="' + thumbnail + '" class="img-blog" alt="" id="' + content + '"></div>';
      html += '<div class="col-md-8 col-lg-8">';
      html += '<p><span class="bold">Date:</span> ' + date + '</p>';
      html += '<p id="' + title + '"><span class="bold">Title:</span> ' + title + '</p>';
      html += '<p class="getTitle"><span class="bold">Author:</span> ' + author + '</p>';
      html += '<p><span class="bold">Excerpt:</span> ' + excerpt + '</p>';
      html += '<p><button type="submit" class="col-xs-5 col-xs-offset-3 col-lg-3 col-lg-offset-3 btn btn-default read-responsive" data-title="' + title + '" data-content="' + content + '">Read Blog</button><p>';
      //<button type="submit" id="contact-submission" class="btn btn-default col-sm-2 col-sm-offset-5">Send</button>
      //html += '<p>' + content + '</p>';\
      html += '</div>';
      html += '</div>';

      $blogWrap.append(html);
    }
  }

    //show lightbox when clicking image | copied from https://codepen.io/webcane/pen/bNEOXZ
    $('.read-responsive').click(function(event) {
    	event.preventDefault();
    	var content = $('.modal-body');
      //get the blog title
      var clickedBlogTitle = $(this).attr('data-title');
      //get the content associated with the image that was clicked
      var clickedBlogContent = $(this).attr('data-content');
    	content.empty();
      //now that we have the info for the specific blog, add it to the modal
      $('.modal-title').html(clickedBlogTitle);
      content.html(clickedBlogContent);
      $(".modal-profile").modal({show:true});
    });

/****************************************    Scroll plugin  ****************/
// Plugin from : https://codepen.io/chriscoyier/pen/dpBMVP
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
/*******************    End of scroll    *************************************/
}
