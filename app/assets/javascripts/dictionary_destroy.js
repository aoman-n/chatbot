$(function(){
  $('a[data-remote]').on("ajax:success", function(){
    $(this).parents('tr').fadeOut(400);
  });
});
