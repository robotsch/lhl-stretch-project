# lhl-stretch-project

This is a small semi-customizable bar chart library and example page designed to meet as many requirements as possible from the Lighthouse Labs pre-course work. 
It can be used to generate a single or multibar chart on a given web page.
This project uses jQuery.

# Single bar example
![image](https://user-images.githubusercontent.com/40985112/156846359-8d430e72-9a6d-4f55-b58d-9a319b2ad603.png)

# Multiple bar example
![image](https://user-images.githubusercontent.com/40985112/156846438-86de64fe-140e-413a-adac-bf47aa953141.png)

# Usage
drawBarChart(data, element, options)

The following will input will generate the multiple bar chart displayed in the above screenshot
 
  data = {
    title: 'Multibar',
    data: {
      Banana: [15, 25, 5],
      Apple: [40, 63, 3],
      Orange: [30, 12.5, 2],
      Pear: [21, 10, 1],
      Avocado: [10, 10, 30],
    }
  };
  options2 = {
    title: {
      size: "30px",
      color: "black"
    },
    bar: {
      color: "skyblue",
      left: 1,
      right: 1, 
    },
    multibar: {
      values: ["First", "Second", "Third"],
      colors: ["blue", "yellow", "white"]
    },
  };
  element = $('div.chartspace');
  
# Known issues
 - Padding does not currently work on the single bar configuration
 - Overly long names and strings can cause formatting to break
 - I don't even want to think about what negative data numbers will do
 - Likely many more

# Features that'd be nice to do one day
 - Stacked bar chart configuration
 - Horizontal bar chart configuration

Thank you Stack Overflow, as alway
