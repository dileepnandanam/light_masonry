masonry = function(config){ 
  var surface = [[0, parseInt($(this).css('width')), 0]]
  var i
  push = function(e, where) {
    surface.push(e)
  }
  brick = $(config['itemSelector'].split(' ').join(','))
  for(i = 0; i < brick.length; i++) {
    width = parseInt($(brick[i]).css('width'))
    height = parseInt($(brick[i]).css('height'))
    surface = surface.sort(function(a,b) {
      if(a[2]==b[2]) {
        if(a[0] == b[0])
          return(0)
        else if(a[0] < b[0])
          return(-1)
        else
          return(1)
      }
      else if(a[2]<b[2]) return(-1)
      else return(1)
    })

    var j

    for(j = 0; j < surface.length; j++) {
      if(surface[j][1]-surface[j][0] >= width) {
        var removed = surface[j]
        $(brick[i]).css('top', removed[2])
        $(brick[i]).css('left', removed[0])
        
        new_l = removed[0]
        new_r = removed[0] + width
        new_h = removed[2] + height

        length = surface.length
        for(k = 0; k < length; k++) {
          
          if(cond = new_l == surface[k][0] && new_r <= surface[k][1] && new_h > surface[k][2]) {
            push([new_r + 1, surface[k][1], surface[k][2]], 1)
            push([surface[k][0], surface[k][1], new_h + 1], 1)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(cond1 = new_l > surface[k][0] && new_r == surface[k][1] && new_h > surface[k][2]) {
            push([surface[k][0], new_l - 1, surface[k][2]], 2)
            push([surface[k][0], surface[k][1], new_h + 1], 2)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(cond2 = new_l == surface[k][0] && new_r >= surface[k][1] && new_h > surface[k][2]) {
            //push([surface[k][1] + 1, new_r, surface[k][2]], 3)
            push([surface[k][0], new_r, new_h + 1], 3)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(cond3 = new_l < surface[k][0] && new_r == surface[k][1] && new_h > surface[k][2]) {
            //push([new_l, surface[k][0] - 1, surface[k][2]], 4)
            push([new_l, surface[k][1], new_h + 1], 4)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(cond4 = new_l < surface[k][0] && new_r > surface[k][1] && new_h > surface[k][2]) {
            push([new_l, new_r, new_h + 1])
            surface.splice(k, 1)
            k = k - 1
          }
          else if(cond5 = new_l > surface[k][0] && new_r < surface[k][1] && new_h > surface[k][2]) {
            push([new_l, surface[k][0] - 1, surface[k][2]], 5)
            push([surface[k][1] + 1, new_r, surface[k][2]], 5)
            push([surface[k][0], surface[k][1], new_h + 1], 5)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(new_l == surface[k][0] && new_r == surface[k][1] && new_h > surface[k][2])  {
            push([new_l, new_r, new_h + 1], 6)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(new_l < surface[k][0] && new_r < surface[k][1] && new_r > surface[k][0] && new_h > surface[k][2]) {
            push([new_r + 1, surface[k][1], surface[k][2]], 6)
            surface.splice(k, 1)
            k = k - 1
          }
          else if(new_l > surface[k][0] && new_l < surface[k][1] && new_r > surface[k][1] && new_h > surface[k][2]) {
            push([surface[k][1], new_r, surface[k][2]], 7)
            surface.splice(k, 1)
            k = k - 1
          }
        }

        
        break
      }
    }
  }
  $(this).css('height', surface.sort(function(a,b){if(a<b) return(1);else if(a==b) return(0); else return(-1)})[surface.length - 1][2])
}
$.fn.extend({masonry: masonry})