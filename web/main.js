function translateToIntertechnoTriState(housecode, devicecode, on) {
  var mapping = {
    'A' : '0000', 'B' : 'F000', 'C' : '0F00', 'D' : 'FF00', 
    'E' : '00F0', 'F' : 'F0F0', 'G' : '0FF0', 'H' : 'FFF0', 
    'I' : '000F', 'J' : 'F00F', 'K' : '0F0F', 'L' : 'FF0F',
    'M' : '00FF', 'N' : 'F0FF', 'O' : '0FFF', 'P' : 'FFFF',
    '1' : '0000', '2' : 'F000', '3' : '0F00', '4' : 'FF00', 
    '5' : '00F0', '6' : 'F0F0', '7' : '0FF0', '8' : 'FFF0', 
    '9' : '000F', '10' : 'F00F', '11' : '0F0F', '12' : 'FF0F',
    '13' : '00FF', '14' : 'F0FF', '15' : '0FFF', '16' : 'FFFF'};
  var code = '';
  if(!(housecode in mapping)) {
    throw 'Invalid house code: "' + housecode + '". Must be a char from A to P.';
  }
  if(!(devicecode in mapping)) {
    throw 'Invalid device code: "' + devicecode + '". Must be number from 1 to 16';
  }
  return mapping[housecode] + mapping[devicecode] + '0F' + (on ? 'FF' : 'F0');
}

$(function() {
  $(buttons).each(function (i, button){
    var html = '';
    if(button.title) {
      html += '<div class="title">' + button.title + '</div>';
    }
    if('oncode' in button && 'offcode' in button) {
      html += '<button code="' + button.oncode + '">On</button>';
      html += '<button code="' + button.offcode + '">Off</button>'
    } else if('housecode' in button && 'devicecode' in button) {
      html += '<button code="' + translateToIntertechnoTriState(button.housecode, button.devicecode, true) + '">On</button>';
      html += '<button code="' + translateToIntertechnoTriState(button.housecode, button.devicecode, false) + '">Off</button>'
    } else {
      throw 'The button is not properly defined.';
    }
    $('body').append(html);
  });
  $('button').click(function() {
    $(this).addClass('active');
    var code = $(this).attr('code');
    $.get('send',{code : code}).done(function() {
      $(this).removeClass('active');
    });
  });
});