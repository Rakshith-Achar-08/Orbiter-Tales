$(document).ready(function () {
  var body = $("body"),
      universe = $("#universe"),
      solarsys = $("#solar-system");

  // Fade-in effect on page load
  body.css("opacity", "1");

  // Fade-out effect when clicking external links (not internal planet links)
  $("a").click(function(e) {
    let link = $(this).attr("href");
    
    // Only apply fade-out to external links (not hash links like #sunspeed)
    if (link && !link.startsWith("#") && !link.startsWith("javascript:")) {
      e.preventDefault();                  // prevent immediate navigation

      // Fade out body first
      $("body").animate({opacity: 0}, 600, function() {
        window.location = link;            // navigate after fade-out
      });
    }
  });

  // --- Initialize Animation ---
  var init = function () {
    body.removeClass("view-2D opening")
      .addClass("view-3D")
      .delay(2000)
      .queue(function () {
        $(this).removeClass("hide-UI").addClass("set-speed");
        $(this).dequeue();
      });
  };

  var setView = function (view) {
    universe.removeClass().addClass(view);
  };

  // --- UI Toggles ---
  $("#toggle-data").click(function (e) {
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function (e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  // --- Planet Selection ---
  $("#data a").click(function (e) {
    var ref = $(this).attr("class").split(" ")[0]; // planet name
    solarsys.removeClass().addClass(ref);
    $(this).parent().find("a").removeClass("active");
    $(this).addClass("active");
    showPlanetInfo(ref);
    e.preventDefault();
  });

  // --- View Controls ---
  $("#view-toggle").change(function () {
    if ($(this).is(":checked")) {
      body.removeClass("view-2D").addClass("view-3D");
      $(".toggle-text").text("3D View");
    } else {
      body.removeClass("view-3D").addClass("view-2D");
      $(".toggle-text").text("2D View");
    }
  });

  $(".set-view").click(function () {
    $("#view-toggle")
      .prop("checked", !$("#view-toggle").is(":checked"))
      .trigger("change");
  });

  $(".set-zoom").click(function () {
    body.toggleClass("zoom-large zoom-close");
  });
  $(".set-speed").click(function () {
    setView("scale-stretched set-speed");
  });
  $(".set-size").click(function () {
    setView("scale-s set-size");
  });
  $(".set-distance").click(function () {
    setView("scale-d set-distance");
  });

  // --- Planet Data ---
  var planetData = {
    sun: {
      name: "Sun",
      distance: "0 miles (Center of Solar System)",
      period: "25-35 days (rotation varies by latitude)",
      diameter: "864,340 miles (1,392,700 km)",
      composition: "73% Hydrogen, 25% Helium, 2% other elements",
      moons: "0 (It's a star!)",
      fact: "Contains 99.86% of the Solar System's mass.",
    },
    mercury: {
      name: "Mercury",
      distance: "36 million miles (58 million km)",
      period: "88 Earth days",
      diameter: "3,032 miles (4,879 km)",
      composition: "Iron core, rocky mantle, thin atmosphere",
      moons: "0",
      fact: "Fastest planet in our solar system. The smallest planet and closest to the Sun. It has no atmosphere, resulting in extreme temperature swings.",
    },
    venus: {
      name: "Venus",
      distance: "67 million miles (108 million km)",
      period: "225 Earth days",
      diameter: "7,521 miles (12,104 km)",
      composition: "Rocky surface, thick CO2 atmosphere",
      moons: "0",
      fact: "The hottest planet due to a runaway greenhouse effect. It rotates backward (retrograde rotation).",
    },
    earth: {
      name: "Earth",
      distance: "93 million miles (150 million km)",
      period: "365.25 Earth days",
      diameter: "7,926 miles (12,756 km)",
      composition: "Iron core, rocky mantle, water, atmosphere",
      moons: "1 (The Moon)",
      fact: "The only known planet to harbor life and possess liquid surface water.",
    },
    mars: {
      name: "Mars",
      distance: "142 million miles (228 million km)",
      period: "687 Earth days",
      diameter: "4,222 miles (6,792 km)",
      composition: "Iron-rich soil, polar ice caps, thin atmosphere",
      moons: "2 (Phobos & Deimos)",
      fact: "Known as the 'Red Planet' due to iron oxide. It has the largest volcano in the solar system, Olympus Mons.",
    },
    jupiter: {
      name: "Jupiter",
      distance: "484 million miles (778 million km)",
      period: "12 Earth years",
      diameter: "88,695 miles (142,984 km)",
      composition: "Hydrogen, helium, metallic hydrogen core",
      moons: "95+",
      fact: "The largest planet. A gas giant with the Great Red Spot, a massive persistent storm larger than Earth.",
    },
    saturn: {
      name: "Saturn",
      distance: "886 million miles (1.4 billion km)",
      period: "29 Earth years",
      diameter: "74,898 miles (120,536 km)",
      composition: "Hydrogen, helium, rocky core",
      moons: "146+",
      fact: "Famous for its magnificent rings made of ice and rock.",
    },
    uranus: {
      name: "Uranus",
      distance: "1.8 billion miles (2.9 billion km)",
      period: "84 Earth years",
      diameter: "31,763 miles (51,118 km)",
      composition: "Water, methane, ammonia, hydrogen, helium",
      moons: "27+",
      fact: "Rotates on its side, likely due to a past collision.",
    },
    neptune: {
      name: "Neptune",
      distance: "2.8 billion miles (4.5 billion km)",
      period: "165 Earth years",
      diameter: "30,775 miles (49,528 km)",
      composition: "Water, methane, ammonia, hydrogen, helium",
      moons: "16+",
      fact: "Has the strongest sustained winds in the solar system.",
    },
  };

  // --- Show Planet Info ---
  function showPlanetInfo(planetName) {
    var data = planetData[planetName];
    if (!data) return;

    $("#planet-name").text(data.name);
    $("#planet-distance").text(data.distance);
    $("#planet-period").text(data.period);
    $("#planet-diameter").text(data.diameter);
    $("#planet-composition").text(data.composition);
    $("#planet-moons").text(data.moons);
    $("#planet-fact").text(data.fact);

    $("#planet-icon").removeClass().addClass("planet-icon " + planetName);

    if (planetName === "sun") {
      $("#more-info-btn")
        .show()
        .off("click")
        .on("click", function (e) {
          e.preventDefault();
          goToSunPage();
        });
    } else {
      $("#more-info-btn").hide();
    }

    $("#planet-info-card")
      .removeClass("planet-info-hidden")
      .addClass("planet-info-visible");
    body.addClass("planet-info-open");
  }

  // --- Hide Planet Info ---
  function hidePlanetInfo() {
    $("#planet-info-card")
      .removeClass("planet-info-visible")
      .addClass("planet-info-hidden");
    body.removeClass("planet-info-open");
  }

  $("#close-planet-info").click(hidePlanetInfo);

  $(document).keyup(function (e) {
    if (e.keyCode === 27) hidePlanetInfo();
  });

  $("#planet-info-card").click(function (e) {
    if (e.target === this) hidePlanetInfo();
  });

  // --- Sun Modal Functionality ---
  $("#more-info-btn").click(function(e) {
    e.preventDefault();
    $("#sun-modal").fadeIn(300);
  });

  $(".close-sun-modal").click(function() {
    $("#sun-modal").fadeOut(300);
  });

  $("#sun-modal").click(function(e) {
    if (e.target === this) {
      $(this).fadeOut(300);
    }
  });

  // --- Fade-out Transition to index.html ---
  function goToSunPage() {
    $("body").css({
      transition: "opacity 1s ease",
      opacity: "0",
    });

    setTimeout(() => {
      // 🔸 If your React app runs on localhost
      window.location.href = "http://localhost:3000";

      // 🔸 OR if index.html is in same folder:
      // window.location.href = "index.html";
    }, 1000);
  }

  init();
});
