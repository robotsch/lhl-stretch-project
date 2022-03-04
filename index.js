// Author: Christian Humble
// Description: A rudimentary bar chart library which can generate a semi-customizable bar chart, called with 
//              drawBarChart(data, parent element, options) where data is an object containing values to be charted, 
//              element is the parent element to render the barchart in, and options is an object containing customization choices.
// Disclaimer: This is my first attempt at something like this, and DEFINITELY has bugs/nonfunctional features, use at your own severe risk!

function drawBarChart(d, e, o) {
  // Container
  const scaffold = {
    display: "grid",
    width: "700px",
    height: "400px",
    "background-color": "lightgrey",
    "grid-template-columns": "8% 78% 14%",
    "grid-template-rows": "13% 2% 75% 3% 7%",
    "grid-template-areas":
      '"header header ." "sidebar . multibarLabel" "sidebar chart multibarLabel" "sidebar . multibarLabel" "bottomleft labels ."',
  };
  const titleCSS = {
    "grid-area": "header",
    "place-self": "center stretch",
    display: "flex",
    "justify-content": "center",
    "font-size": "30px",
    "padding-left": "14%", // Match with sidebar %
  };

  // Sidebar Y axis
  const sidebarCSS = {
    "grid-area": "sidebar",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "align-items": "center",
  };
  const sidebarItemCSS = {
    display: "flex",
    "align-items": "flex-end",
  };

  // Label bar X axis
  const labelBarCSS = {
    "grid-area": "labels",
    display: "flex",
    "flex-direction": "row",
  };
  const labelBarItemCSS = {
    display: "flex",
    "flex-grow": "1",
    "flex-basis": "0",
    "justify-content": "center",
  };

  // Multibar layout CSS
  const multibarLabelCSS = {
    "grid-area": "multibarLabel",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "padding-left": "2.5%",
  };
  const multibarLabelItemCSS = {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "flex-start",
  };
  const multibarBoxCSS = {
    display: "flex",
    height: "10px",
    width: "10px",
  };

  // Singular bar layout CSS
  const dataBarContainerCSS = {
    "grid-area": "chart",
    display: "flex",
    "border-bottom": "1px solid black",
    "flex-direction": "row",
    "align-items": "flex-end",
  };
  const dataBarCSS = {
    display: "flex",
    "flex-grow": "1",
    "align-items": "flex-end",
    height: "100%",
  };

  // Calculate highest chart value for single/multibar setup
  let ceiling = Math.max(...Object.values(d.data).flat());

  // Setup initial containers
  let barchart = $("<div>").css(scaffold);
  let title = $("<div>").text(d.title).css(titleCSS);
  let sidebar = $("<div>").css(sidebarCSS);
  let labelBar = $("<div>").css(labelBarCSS);
  let multibarLabel = $("<div>").css(multibarLabelCSS);
  let dataBarContainer = $("<div>").css(dataBarContainerCSS);

  // Create sidebar and labelbar, these will always exist in a valid configuration
  sidebar.append(generateSidebar(ceiling, sidebarItemCSS));
  labelBar.append(generateLabels(Object.keys(d.data), labelBarItemCSS));

  // If multibar options exist, set up multibars and override bar spacing CSS
  if (o.multibar) {
    multibarLabel.append(
      generateMultibarLabels(multibarLabelItemCSS, multibarBoxCSS, o)
    );
  }

  // Create data bars
  dataBarContainer.append(
    generateBars(ceiling, Object.values(d.data), o, dataBarCSS)
  );

  // Apply title customization, if present
  if (o.title) {
    title.css({
      "font-size": `${o.title.size}`,
      color: `${o.title.color}`,
    });
  }

  // Put everything together by appending to container
  barchart.append(title, sidebar, dataBarContainer, labelBar, multibarLabel);
  barchart.appendTo(e);
}

function generateBars(ceiling, values, options, barCSS) {
  let bars = [];

  if (options.multibar) {
    let multibar;

    // Loop through 2d data for multibar, set up parent/child divs and format
    for (let i = 0; i < values.length; i += 1) {
      multibar = $("<div>")
        .css(barCSS)
        .css({
          "padding-left": `${2 * options.bar.left}%`,
          "padding-right": `${2 * options.bar.right}%`,
        });
      for (let j = 0; j < values[i].length; j += 1) {
        multibar.append(
          $("<div>")
            .css(barCSS)
            .css({
              border: "1px solid black",
              height: `${(values[i][j] / ceiling) * 100}%`,
              "background-color": `${options.multibar.colors[j]}`,
            })
        );
      }
      // Push completed bar to array
      bars.push(multibar);
    }
  } else {
    // Loop through flat data for single bar setup, set up parent/child divs and format
    for (let i = 0; i < values.length; i += 1) {
      bar = $("<div>").css(barCSS);
      bar.append(
        $("<div>")
          .css(barCSS)
          .css({
            border: "1px solid black",
            "background-color": `${options.bar.color}`,
            "padding-left": "2%",
            "padding-right": "2%",
            height: `${(values[i] / ceiling) * 100}%`,
          })
      );
      // Return completed bar array, no further modifications to bars should happen after this
      bars.push(bar);
    }
  }
  return bars;
}

// Generate Y axis labels
function generateSidebar(ceiling, barCSS) {
  let sidebarItems = [];
  // Generate 5 sidebar items based on data values
  for (let i = 0; i < 5; i += 1) {
    sidebarItems.push(
      $("<div>")
        .css(barCSS)
        .text(Math.floor(ceiling - (i * ceiling) / 5))
    );
  }
  // Add 0 for baseline
  sidebarItems.push($("<div>").text("0").css(barCSS));
  
  return sidebarItems;
}

// Generate multibar color/labels
function generateMultibarLabels(item, box, options) {
  let multibarLabelItems = [];
  let multibarLabelItem;

  // Generate one box/label per multibar value, set up parent/child divs and format
  for (let i = 0; i < options.multibar.values.length; i += 1) {
    multibarLabelItem = $("<div>")
      .css(item)
      .append(
        $("<div>")
          .css(box)
          .css({ "background-color": `${options.multibar.colors[i]}` })
      )
      .append(
        $("<div>")
          .text(options.multibar.values[i])
          .css({ "padding-left": "10px" })
      );
    multibarLabelItems.push(multibarLabelItem);
  }
  return multibarLabelItems;
}

// Generate X axis labels based on # of provided values
function generateLabels(labels, css) {
  let labelItems = [];

  for (let i = 0; i < labels.length; i += 1) {
    labelItems.push($("<div>").text(labels[i]).css(css));
  }

  return labelItems;
}
