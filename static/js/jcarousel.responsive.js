(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();
                var items = carousel.jcarousel('items')
                if (width >= 600) {
                    width = width;
                } else if (width >= 350) {
                    width = width / 2;
                }

                var wrapperWidth = $('.jcarousel-wrapper')
                if (items.length == 2) {
                  wrapperWidth.css('width', '640px')
                  items.css('width', '600px')
                  $(items[0]).find('img').css('opacity', '1')
                  var j;
                  for (j = 0; j < items.length; j++) {
                    $(items[j]).find('img').css('opacity', '1')
                  }
                }
                else {
                  wrapperWidth.css('width', '100%')
                  items.css('width', + (width - 120 ) / 3 + 'px')
                  $(items[1]).find('img').css('opacity', '1')
                }

            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel')
            .on('jcarousel:animateend jcarousel:reload', function(event, carousel) {
              var items = $(this).jcarousel('visible');
              var i;
              for (i = 0; i < items.length; i++) {
                if (items.length > 2) {
                  if (i !== 1) {
                    $(items[i]).find('img').css('opacity', '0.25')
                  }
                  else {
                    $(items[i]).find('img').css('opacity', '1')
                  }
                }
              }
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
})(jQuery);
