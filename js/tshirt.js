
function simplifybreeds(breedpairs) {
    return _.map(breedpairs, function(pair) {
        var bname = pair[0];
        var bcount = pair[1];

        return [BREEDS[bname].singular, bcount];

    });

}
function simplifyBreed(breed) {
    return breed.replace(/\//g, "-").replace(/ $/, "").replace(/^ /,"").replace(/ /g, '-').toLowerCase();
}

function zazzle(breed, text) {
    url = 'http://www.zazzle.com/api/create/at-238385873751224385?rf=238385873751224385&ax=Linkover&pd=235423052951318945&fwd=ProductPage&ed=true&tc=&ic=' + simplifyBreed(breed)+'&t_breed_iid=http%3A%2F%2Fproject.wnyc.org%2Fdog-map%2Fimg%2Fshirts%2F' + simplifyBreed(breed) + '.jpg&t_data_txt=' + encodeURIComponent(text);
    window.open(url, '_blank');
    

}

function ordinal(n) {
    // http://davidchambersdesign.com/converting-integers-to-ordinals/
    if (10 < n && n < 14) return n + 'th';
    switch (n % 10) {
        case 1: return n + 'st';
        case 2: return n + 'nd';
        case 3: return n + 'rd';
        default: return n + 'th';
    }
}


$(document).ready(function(){
    $('#breedselect').select2({
        allowClear: true,
        width: '300px'

    });
    
    
    $('#maketshirtbutton').click(function(){
        var breed = $("#breedselect :selected").text();

        var dogname = $('#nameinput').val();
        if (!dogname) {
            dogname = "Max";
        }
        $.when($.ajax({
          url: 'data/breeds-nyc.json',
          async: false,
          dataType: "json",
          data : {}}),
        $.ajax({
          url: 'data/names-nyc.json', 
          async: false,
          dataType: "json",
          data : {}}))
          .then(function(breeddata, namedata)
          {

            var citynames = _.pluck(_.sortBy(_.pairs(namedata[0]), function(pair) {return -1 * pair[1];}), 0);
            var breeds = _.pluck(_.sortBy(simplifybreeds(_.pairs(breeddata[0])), function (pair) {return -1 * pair[1];}), 0);
            
            dogname = dogname.charAt(0).toUpperCase() + dogname.substr(1).toLowerCase();

            var nameplace = _.indexOf(citynames, dogname);
            var breedplace = _.indexOf(breeds, breed);

            if (nameplace == -1)
            {
                
                tshirtstr = dogname + "—a unique name for a unique dog. There's not another registered in New York City.";
                zazzle(breed, tshirtstr);
                return;
            }
            if (nameplace <= 100)
            {
                if (nameplace == 1)
                {
                    tshirtstr = dogname + " is the most popular dog name in New York City.";
                }
                else if (nameplace == 2)
                {
                    tshirtstr = dogname + " is the second most popular dog name in New York City.";
                }
                else if (nameplace == 3)
                {
                    tshirtstr = dogname + " is the third most popular dog name in New York City.";
                }

                else 
                {
                    tshirtstr = dogname + " is the " + ordinal(nameplace) + " most popular dog name in New York City.";
                }

                zazzle(breed, tshirtstr);
                return;
            }

            if (breed == "Mixed/Other")
            {
                tshirtstr = dogname + " is a mixed-breed dog, like the 23,185 registered in New York City.";
                zazzle(breed, tshirtstr);

                return;
            }

            if (breedplace == -1)
            {
                tshirtstr = dogname + "is a " + breed.toLowerCase() + '.';
            }


            else if (breedplace == 1)
            {
                tshirtstr = dogname + " is a " + breed.toLowerCase() +", the most common breed in New York City.";
            }
            else if (breedplace == 2)
            {
                tshirtstr = dogname + " is a " + breed.toLowerCase() +", the second most common breed in New York City.";
            }
            else if (breedplace == 3)
            {
                tshirtstr = dogname + " is a " + breed.toLowerCase() +", the third most common breed in New York City.";
            }



            else tshirtstr = dogname + " is a " + breed.toLowerCase() +", the " + ordinal(breedplace) +" most common breed in New York City.";

            var firstletter = breed.charAt(0);

            if (firstletter == 'A' || firstletter == 'E' || firstletter == 'I' || firstletter == 'O' || firstletter == 'U')
            {
                tshirtstr = tshirtstr.replace(" is a ", " is an ");
            }
            zazzle(breed, tshirtstr);









        





    });
  });

    function rand_splash() {
        var splashcaptions = {
       1: "welsh corgi and great dane",
       2: "old english sheepdog, coton de tulear, and pekingese",
       3: "irish wolfhound, irish setter, and irish terrier",
       4: "greyhound, italian greyhound, and whippet",
       5: "doberman pinscher and mini pinscher",
       6: "tibetan mastiff, lhasa apso, tibetan spaniel, and shih tzu",
       7: "japanese chin, shiba inu, and akita",
       8: "labrador retriever, labradoodle, and standard poodle",
       9: "afghan hound, borzoi, and saluki",
       10: "french bulldog and english bulldog"

        };

        var splashfiles = ['url("http://www.wnyc.org/i/raw/photologue/images/b0/nj_flood.jpg")'];

        var whichsplash = Math.floor(Math.random() * splashfiles.length);

        $('#carousel').css('background-image', splashfiles[whichsplash]);
        $('#carousel-caption').text(splashcaptions[whichsplash+1]);

        $('#leftarrow').click(function(e) {
            whichsplash++;

            if (whichsplash > splashfiles.length -1)
            {
                whichsplash = 0;
            }
            $('#carousel').css('background-image', splashfiles[whichsplash]);
            $('#carousel-caption').text(splashcaptions[whichsplash+1]);
            e.stopPropagation();

        });
        $('#rightarrow, #carousel').click(function(e) {
            whichsplash--;

            if (whichsplash < 0)
            {
                whichsplash = splashfiles.length -1;
            }
            $('#carousel').css('background-image', splashfiles[whichsplash]);
            $('#carousel-caption').text(splashcaptions[whichsplash+1]);
            e.stopPropagation();

        });








    }
    rand_splash();
    $(window).scroll(function(){
        var scrolltop = $(window).scrollTop();

        if (scrolltop <= 500)
        {
            $('#carousel').css('height', 500 - scrolltop);
        }
        else
        {
            $('#carousel').css('height', 0);
        }
        if (scrolltop >= 450)
        {
            $('#carousel-caption, #leftarrow, #rightarrow').hide();
        }
        else
        {
            $('#carousel-caption, #leftarrow, #rightarrow').show();
        }


        

    });
    $(window).trigger("scroll");


    

});
