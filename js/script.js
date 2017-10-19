/* DATA */
var menu = [
  {
    "name":"Super cheesy burger",
    "description":"Discover our great cheesy burger with mozzarella, gorgonzola and pecorino",
    "price":8.5,
    "veggie":true,
    "quantity":0},
  {
    "name":"Bad beef burger",
    "description":"Full of angry beef, jalapeno peppers, fried onions and our special BBQ sauce",
    "price":12,
    "veggie":false,
    "quantity":0},
  {
    "name":"Spicy chili burger",
    "description":"HOT HOT HOT HOT HOT HOT",
    "price":10,
    "veggie":false,
    "quantity":0}
];

$(document).ready(function() {
  menu.forEach(function(e) {
      var name = e.name;
      var description = e.description;
      var price = e.price;
      var veggie = e.veggie;
      var quantity = e.quantity;

      var vegOrNot = '';
      if (veggie) {
        vegOrNot = '&nbsp;<img src="img/vege-icon.png">';
      }

      var meal =
      '<tr data-price="' + price + '" data-quantity="' + quantity + '">' +
        '<td>' +
          '<strong>' + name + '</strong>' +
            vegOrNot +
          '<p>' + description + '</p>' +
        '</td>' +
        '<td>' +
          '<span class="price"><strong>'+ price + ' €</strong></span>' +
        '</td>' +
        '<td class="quantity">' + quantity + '</td>' +
        '<td>' +
            '<button class="btn btn-primary more">+</button> ' +
            '<button class="btn btn-primary less disabled">-</button>' +
        '</td>' +
      '<tr>';

      $('table').find('tr:first-of-type').after(meal);

  });

  $('.overlay').fadeOut();
  console.log($('.more'));

  $('.more').click(function(){
    var $row = $(this).closest('tr');
    var q = $row.data('quantity')+1;
    $row.find('.less').removeClass('disabled');
    $row.data('quantity', q );
    $row.find('.quantity').text( q );
    calcTotal();
  });

  $('.less').click(function(){
    var $row = $(this).closest('tr');
    console.log($row.data('quantity'));
    var q = $row.data('quantity')-1;
    if (q <= 0) {
      q = 0;
      $(this).addClass('disabled');
    }
    $row.data('quantity', q );
    $row.find('.quantity').text( q );
    calcTotal();
  });

  function calcTotal(){
    var total = 0;
    var qt = 0;
    $('tr[data-price]:not(.info)').each(function() {
      total = total + ($(this).data('price') * $(this).data('quantity'));
      qt = qt + $(this).data('quantity');
      console.log(total);
    });
    $('tr.info .price strong').text( total + ' €' );
    $('tr.info .quantity').text( qt );
  }
});
