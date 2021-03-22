//Pure JS. В pug повесить is-open на js-accordion-toggle вместо item
const accordion = function () {
  const accordionItemsHeaders = document.getElementsByClassName('js-accordion-toggle');

  accordionItemsHeaders.forEach(accordionItemHeader => {
  	accordionItemHeader.addEventListener("click", event => {
  		const currentActiveAccordionHeader = document.querySelector(".js-accordion-toggle.is-open");
  		if(currentActiveAccordionHeader && currentActiveAccordionHeader !== accordionItemHeader) {
  			currentActiveAccordionHeader.classList.toggle("is-open");
  			currentActiveAccordionHeader.nextElementSibling.style.maxHeight = 0;
  		}
  		accordionItemHeader.classList.toggle("is-open");
  		const accordionItemBody = accordionItemHeader.nextElementSibling;
  		if(accordionItemHeader.classList.contains("is-open")) {
  			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
  		} else {
  			accordionItemBody.style.maxHeight = 0;
  		}
  	});
  });
}
accordion();


//jQuery
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find('.js-accordion-toggle');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
        $this = $(this),
        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('is-open');

        if (!e.data.multiple) {
            $el.find('.js-accordion-inner').not($next).slideUp().parent().removeClass('is-open');
        }
    }

    var accordion = new Accordion($('.accordion'), false);
});