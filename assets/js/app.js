// // @TODO: YOUR CODE HERE!
// # D3 Homework - Data Journalism and D3

// ![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

// ## Background

// Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

// The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

// The data set included with the assignment is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), but you are free to investigate a different data set. The current data set incldes data on rates of income, obesity, smokes, etc. by state. MOE stands for "margin of error."

// ![4-scatter](Images/4-scatter.jpg)

// You need to create a scatter plot between two of the data variables such as `Healthcare vs. smokes` or `Smokers vs. Age`.

// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.


// function makeChart() {

var svgWidth = 825
var svgHeight = 500

var chartMargin = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
}

var chartWidth = svgWidth - chartMargin.left - chartMargin.right
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom

var svg = d3
    .select('#scatter')
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// var data = d3.csv("assets/data/data.csv")

d3.csv("assets/data/data.csv").then((function(healthData) {
    console.log(healthData)
    healthData.forEach(function(data) {
        data.obesity = +data.obesity
        data.smokes = +data.smokes
    })

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([chartHeight, 0])

    var xScale = d3.scaleBand()
        .domain([20, d3.max(healthData, d => d.obesity)])
        .range([0, chartWidth])


    var xAxis = d3.axisLeft(yScale)
    var yAxis = d3.axisBottom(xScale)

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)

    chartGroup.append("g")
        .call(yAxis)

    var circles = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        // .classed('stateCircle', true)
        .attr("cx", d => xScale(d.obesity))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", "15")
        .attr("opacity", ".75")

    var text = chartGroup.selectAll("stateText")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .classed("stateText", true)
        .attr("x", d => xScale(d.obesity))
        .attr("y", d => yScale(d.smokes))
        .attr('font-size', "8px")

    // var toolTip = d3.tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function(d) {
    //         return (`Obesity: ${d.obesity}<br>smokes: ${d.smokes}`)
    //     })

    // chartGroup.call(toolTip)

    // circles.on("click", function(data) {
    //         toolTip.show(data, this)
    //     })
    //     .on("mouseout", function(data, index) {
    //         toolTip.hide(data)
    //     })

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("smokes")

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
        .attr("class", "axisText")
        .text("smokes")
}))


// }

// makeChart()

// re-define variables for switches based on event handlers to accompany different data selections

// function demographics(data) {
//     switch (data) {
//         case "Income":
//             return data.income = +data.income
//             break;
//         case "Age":
//             return data.age = +data.age
//             break;
//         case "Health Care":
//             return data.healthcare = +data.healthcare
//             break
//         default:
//             return data.income
//     }

// }

// function risks(data) {
//     switch (data) {
//         case "Obesity":
//             return data.obsesity = +data.obesity
//             break;
//         case "smokes":
//             return data.smokes = +data.smokes
//             break;
//         case "Smokes":
//             return data.smokes = +data.smokes
//             break;
//         default:
//             return data.obesity
//     }
// }

// * Include state abbreviations in the circles.

// * Create and situate your axes and labels to the left and bottom of the chart.

// * Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

// - - -

// ### Bonus: Impress the Boss (Optional Assignment)

// Why make a static graphic when D3 lets you interact with your data?

// ![7-animated-scatter](Images/7-animated-scatter.gif)

// #### 1. More Data, More Dynamics

// You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

// * Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.

// #### 2. Incorporate d3-tip

// While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

// ![8-tooltip](Images/8-tooltip.gif)

// * Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

// - - -

// ### Assessment

// Your final product will be assessed on the following metrics:

// * Creation of a **new** repository on GitHub called `D3-Challenge` (note the kebab-case). Do not add to an already existing repo.

// * Completion of all steps in the core assignment

// * Coherency of scatter plot (labels, ticks)

// * Visual attraction

// * Professionalism