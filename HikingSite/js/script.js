/* Use this file as a start - comment all lines and functions to show your understanding */
/* My comments are minimal - you are required to write more */

/* Check your browsers console for messages */
/* Use console.log() as many times as you need to */

/*****************************  For the contact form submission ****************************************************************/
$.ajax({
  method: "POST",
  dataType: "JSON",
  //url: "inc/call-me.php",
  url: "http://dj3dw.com/des223-2017-assessment03/inc/call-me.php",
  data: {
    type: "contact"
  }
}).done(function (jsonObject) {
  validateEmailSubmission(jsonObject)
})

function validateEmailSubmission(jsonObject) {
  // The JSON object constain 3 keys, with more keys within the messages parameter, this returns an array of messages
  var jsonMessages = jsonObject.messages;

  // position 5 of messages constains the mail status messages and a success key within there
  // this result will either be true or false
  var resultStatus = jsonMessages[5].mail_message.success;

  // infrom user as to the result of the form submission
  if (resultStatus === "true") {
    console.log("Success: Email Sent")
  } else {
    console.log("Email was not sent - something went wrong")
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

  console.log('Blog count ' + blogCount);
  console.log('Blog items length ' + items.length);

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
      //console.log("Shaun " + content);

      //console.log(items[i])
      html += '<div class="col-md-6" data-id="' + id + '">';
      html += '<p>' + id + '</p>';
      html += '<div class="col-md-3"><img src="' + thumbnail + '" alt="" class="img-responsive"></div>';
      html += '<div class="col-md-9">';
      html += '<p>Date: ' + date + '</p>';
      html += '<p>Title: ' + title + '</p>';
      html += '<p class="getTitle">Author: ' + author + '</p>';
      html += '<p>' + excerpt + '</p>';
      //html += '<p>' + content + '</p>';
      html += '</div>';
      html += '</div>';


      $blogWrap.append(html);
    }
  }

    /* show lightbox when clicking image | copied from https://codepen.io/webcane/pen/bNEOXZ
    $('img.img-responsive').click(function(event) {
    	event.preventDefault();
    	var content = $('.modal-body');
    	content.empty();
      //var title = $(this).attr("title");
      var title = $('.getTitle');
      $('.modal-title').html(title);
      content.html($(this).html());
      $(".modal-profile").modal({show:true});
    });

    $('img.img-responsive').click(function(event) {
      var t = $('.getTitle');
      alert(t);
      console.log(t);
    });*/

}
