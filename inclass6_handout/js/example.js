// ADD NEW ITEM TO END OF LIST
var newClass = document.getElementById('page').getElementsByTagName('ul')[0];
var el = document.createElement('li');
var text = document.createTextNode("cream");
el.appendChild(text);
newClass.appendChild(el);

// ADD NEW ITEM START OF LIST
var el = document.createElement('li');
var text = document.createTextNode('kale');
el.appendChild(text);
newClass.prepend(el);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var i = document.querySelectorAll('li');
var j;
for(j = 0; j < i.length; j++)
{
  i[j].className = 'cool';
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var head = document.querySelector('h2');
var textL = head.firstChild.nodeValue;
var total = i.length;
var newHead = textL + '<span>' + total + '</span>';
head.innerHTML = newHead;
