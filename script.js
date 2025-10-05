$(document).ready(function () {

    var body = $("body"),
        universe = $("#universe"),
        solarsys = $("#solar-system");
  
    var init = function() {
      body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
        $(this).removeClass('hide-UI').addClass("set-speed");
        $(this).dequeue();
      });
    };
  
    var setView = function(view) { universe.removeClass().addClass(view); };
  
    $("#toggle-data").click(function(e) {
      body.toggleClass("data-open data-close");
      e.preventDefault();
    });
  
    $("#toggle-controls").click(function(e) {
      body.toggleClass("controls-open controls-close");
      e.preventDefault();
    });
  
    $("#data a").click(function(e) {
      var ref = $(this).attr("class").split(' ')[0]; // Get first class only
      solarsys.removeClass().addClass(ref);
      $(this).parent().find('a').removeClass('active');
      $(this).addClass('active');
      
      // Show planet information
      showPlanetInfo(ref);
      
      e.preventDefault();
    });
  
    // Enhanced 3D/2D toggle functionality
    $("#view-toggle").change(function() {
      if ($(this).is(':checked')) {
        body.removeClass("view-2D").addClass("view-3D");
        $(".toggle-text").text("3D View");
      } else {
        body.removeClass("view-3D").addClass("view-2D");
        $(".toggle-text").text("2D View");
      }
    });
    
    $(".set-view").click(function() { 
      $("#view-toggle").prop('checked', !$("#view-toggle").is(':checked')).trigger('change');
    });
    
    $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
    $(".set-size").click(function() { setView("scale-s set-size"); });
    $(".set-distance").click(function() { setView("scale-d set-distance"); });
  
    // Planet information data
    var planetData = {
      sun: {
        name: "Sun",
        distance: "0 miles (Center of Solar System)",
        period: "25-35 days (rotation varies by latitude)",
        diameter: "864,340 miles (1,392,700 km)",
        composition: "73% Hydrogen, 25% Helium, 2% other elements",
        moons: "0 (It's a star!)",
        fact: "Contains 99.86% of the Solar System's mass. ",
        moreInfo: "The Sun is a G-type main-sequence star that formed approximately 4.6 billion years ago. It generates energy through nuclear fusion in its core, converting hydrogen into helium. The Sun's surface temperature is about 5,500°C (9,932°F), while its core reaches 15 million°C (27 million°F). It's so massive that it could fit 1.3 million Earths inside it!"
      },
      mercury: {
        name: "Mercury",
        distance: "36 million miles (58 million km)",
        period: "88 Earth days",
        diameter: "3,032 miles (4,879 km)",
        composition: "Iron core, rocky mantle, thin atmosphere",
        moons: "0",
        fact: "Fastest planet in our solar system. The smallest planet and closest to the Sun. It has no atmosphere, resulting in extreme temperature swings (scorching hot during the day, freezing cold at night). Its surface is heavily cratered."
      },
      venus: {
        name: "Venus",
        distance: "67 million miles (108 million km)",
        period: "225 Earth days",
        diameter: "7,521 miles (12,104 km)",
        composition: "Rocky surface, thick CO2 atmosphere",
        moons: "0",
        fact: "The hottest planet in the solar system, due to a runaway greenhouse effect from its thick atmosphere of carbon dioxide and sulfuric acid clouds. It rotates backward (retrograde rotation)."
      },
      earth: {
        name: "Earth",
        distance: "93 million miles (150 million km)",
        period: "365.25 Earth days",
        diameter: "7,926 miles (12,756 km)",
        composition: "Iron core, rocky mantle, water, atmosphere",
        moons: "1 (The Moon)",
        fact: "The only known planet to harbor life and possess liquid surface water. Its atmosphere is unique, composed largely of nitrogen and oxygen. It is the largest of the terrestrial planets."
      },
      mars: {
        name: "Mars",
        distance: "142 million miles (228 million km)",
        period: "687 Earth days",
        diameter: "4,222 miles (6,792 km)",
        composition: "Iron-rich soil, polar ice caps, thin atmosphere",
        moons: "2 (Phobos & Deimos)",
        fact: "Known as the 'Red Planet' due to iron oxide (rust) in its soil. It has the largest volcano in the solar system, Olympus Mons, and features evidence of ancient liquid water. It has two small moons, Phobos and Deimos."
      },
      jupiter: {
        name: "Jupiter",
        distance: "484 million miles (778 million km)",
        period: "12 Earth years",
        diameter: "88,695 miles (142,984 km)",
        composition: "Hydrogen, helium, metallic hydrogen core",
        moons: "95+ (Including Io, Europa, Ganymede, Callisto)",
        fact: "The largest planet in the solar system. A gas giant composed mainly of hydrogen and helium. It features the Great Red Spot, a massive, persistent storm larger than Earth."
      },
      saturn: {
        name: "Saturn",
        distance: "886 million miles (1.4 billion km)",
        period: "29 Earth years",
        diameter: "74,898 miles (120,536 km)",
        composition: "Hydrogen, helium, rocky core",
        moons: "146+ (Including Titan, Enceladus)",
        fact: "The second-largest planet, most famous for its magnificent and complex ring system made primarily of ice particles and rock. A gas giant like Jupiter, composed mostly of hydrogen and helium."
      },
      uranus: {
        name: "Uranus",
        distance: "1.8 billion miles (2.9 billion km)",
        period: "84 Earth years",
        diameter: "31,763 miles (51,118 km)",
        composition: "Water, methane, ammonia, hydrogen, helium",
        moons: "27+ (Including Miranda, Ariel, Umbriel)",
        fact: "An ice giant with a composition of water, methane, and ammonia ices over a small rocky core. It is unique for rotating on its side, likely due to a past collision."
      },
      neptune: {
        name: "Neptune",
        distance: "2.8 billion miles (4.5 billion km)",
        period: "165 Earth years",
        diameter: "30,775 miles (49,528 km)",
        composition: "Water, methane, ammonia, hydrogen, helium",
        moons: "16+ (Including Triton, Nereid)",
        fact: "The farthest planet from the Sun and an ice giant. It has the strongest sustained winds in the solar system and appears deep blue due to methane in its atmosphere."
      }
    };

    // Function to show planet information
    function showPlanetInfo(planetName) {
      console.log('showPlanetInfo called with:', planetName);
      var data = planetData[planetName];
      if (!data) {
        console.log('No data found for planet:', planetName);
        return;
      }

      // Update planet information
      $("#planet-name").text(data.name);
      $("#planet-distance").text(data.distance);
      $("#planet-period").text(data.period);
      $("#planet-diameter").text(data.diameter);
      $("#planet-composition").text(data.composition);
      $("#planet-moons").text(data.moons);
      $("#planet-fact").text(data.fact);

      // Update planet icon
      $("#planet-icon").removeClass().addClass("planet-icon " + planetName);

      // Show/hide more info button for Sun
      if (planetName === 'sun') {
        $("#more-info-btn").show().off('click').on('click', function(e) {
          e.preventDefault();
          showSunDetailsPage();
        });
      } else {
        $("#more-info-btn").hide();
      }

      // Show the card and shift the body
      $("#planet-info-card").removeClass("planet-info-hidden").addClass("planet-info-visible");
      body.addClass("planet-info-open");
    }

    // Function to hide planet information
    function hidePlanetInfo() {
      $("#planet-info-card").removeClass("planet-info-visible").addClass("planet-info-hidden");
      body.removeClass("planet-info-open");
    }

    // Close button functionality
    $("#close-planet-info").click(function() {
      hidePlanetInfo();
    });

    // Close on escape key
    $(document).keyup(function(e) {
      if (e.keyCode === 27) { // Escape key
        hidePlanetInfo();
      }
    });

    // Close when clicking outside the card
    $("#planet-info-card").click(function(e) {
      if (e.target === this) {
        hidePlanetInfo();
      }
    });

    // Function to navigate to React app Sun detail page with transition
    function showSunDetailsPage() {
      // Add fade-out transition
      $("body").css({
        transition: "opacity 0.8s ease",
        opacity: "0",
      });

      setTimeout(() => {
        // Navigate to React app Sun detail page
        // If React app runs on localhost:3000 (development)
        window.location.href = "http://localhost:3000/sun";
        
        // For production, use relative path:
        // window.location.href = "/sun";
      }, 800);
    }


    init();
  
  });
