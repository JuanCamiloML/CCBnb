jQuery(document).ready(function ($) {
  //Set the carousel options
  $("#quote-carousel").carousel({
    pause: true,
    interval: 4000,
  });
  if ($(".isotopeWrapper").length) {
    var $container = $(".isotopeWrapper");
    var $resize = $(".isotopeWrapper").attr("id");
    // initialize isotope
    $container.isotope({
      itemSelector: ".isotopeItem",
      resizable: false, // disable normal resizing
      masonry: {
        columnWidth: $container.width() / $resize,
      },
    });
    $("a[href='#top']").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        "slow"
      );
      return false;
    });
    $(".navbar-inverse").on("click", "li a", function () {
      $(".navbar-inverse .in")
        .addClass("collapse")
        .removeClass("in")
        .css("height", "1px");
    });
    $("#filter a").click(function () {
      $("#filter a").removeClass("current");
      $(this).addClass("current");
      var selector = $(this).attr("data-filter");
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 1000,
          easing: "easeOutQuart",
          queue: false,
        },
      });
      return false;
    });
    $(window).smartresize(function () {
      $container.isotope({
        // update columnWidth to a percentage of container width
        masonry: {
          columnWidth: $container.width() / $resize,
        },
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var listForm = document.getElementById("listInfo");
  var houseListDiv = document.getElementById("houseList");

  if (listForm && houseListDiv) {
    // Check if propertyData array is stored in localStorage
    var storedPropertyData = localStorage.getItem("propertyData");
    var propertyDataArray = storedPropertyData
      ? JSON.parse(storedPropertyData)
      : [];

    // If the stored data is an object, convert it to an array
    if (!Array.isArray(propertyDataArray)) {
      propertyDataArray = [propertyDataArray];
    }

    // Render all stored property data
    renderAllPropertyData(propertyDataArray, houseListDiv);

    listForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var propertyNameInput = document.getElementById("propertyName");
      var emailInput = document.getElementById("email");
      var phoneInput = document.getElementById("phone");
      var propertyTypeSelect = document.getElementById("propertyType");
      var descriptionTextarea = document.getElementById("propertyDescription");

      var propertyName = propertyNameInput ? propertyNameInput.value : "";
      var email = emailInput ? emailInput.value : "";
      var phone = phoneInput ? phoneInput.value : "";
      var propertyType = propertyTypeSelect ? propertyTypeSelect.value : "";
      var description = descriptionTextarea ? descriptionTextarea.value : "";

      var propertyData = {
        propertyName: propertyName,
        email: email,
        phone: phone,
        propertyType: propertyType,
        description: description,
      };

      // Add new property data to the array
      propertyDataArray.push(propertyData);

      // Render all property data
      renderAllPropertyData(propertyDataArray, houseListDiv);

      // Store the updated array in localStorage
      localStorage.setItem("propertyData", JSON.stringify(propertyDataArray));
    });
  }
});

function renderAllPropertyData(dataArray, targetElement) {
  targetElement.innerHTML = "";

  dataArray.forEach(function (data, index) {
    var propertyList = document.createElement("ul");

    for (var key in data) {
      var listItem = document.createElement("li");
      listItem.textContent = key + ": " + data[key];
      propertyList.appendChild(listItem);
    }

    // Add a delete button for each set of data
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      // Remove the data from the array
      dataArray.splice(index, 1);
      // Render the updated property data
      renderAllPropertyData(dataArray, targetElement);
      // Store the updated array in localStorage
      localStorage.setItem("propertyData", JSON.stringify(dataArray));
    });

    propertyList.appendChild(deleteButton);
    targetElement.appendChild(propertyList);
    targetElement.appendChild(document.createElement("hr")); // Add a separator between sets of data
  });
}
