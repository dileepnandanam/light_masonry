Light Masonry

Light scroll is a lite gem for masonry grid layout
To get started:

.. code:: bash

    #Gemfile
    gem 'light_masonry'
    
    #application.js
    //= require light_masonry/light_masonry
    
    #example view
    .parent
      .brick
      .brick
      .brick
    
    #css
    .brick {
      display: inline-block;
    }
    #javascript
    $(document).on('turbolinks:load', function(){initMasonry})
    var initMasonry = function() {
      $('.parent').masonry({itemSelector: '.brick'})
    }
