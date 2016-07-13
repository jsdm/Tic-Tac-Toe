$( Document ).ready( function() {
//   // $( "#ex1" ).dialog({
//   //   modal: open
//   // });
//   $( "#ex1" ).dialog("open");
// });
$(function() {
  $( "#dialogwindow" ).dialog({
      height: 140,
      width: 400,
      zIndex: 999,
      modal: true
  });

  $( ".loginbtn" ).click(function() {
    $("#dialogwindow").dialog("open");
    return false;
    });
  });
})