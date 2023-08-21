d3.select('title').text('D3 Section 4 ScatterPlot')

async function draw() {
  // get data

  const dataset = await d3.json('./data.json')

  console.log(dataset)

  // Dimensions
  const dimensions = {
    width: 800,
    height: 800,
    margins: {
      right: 50,
      left: 70,
      bottom: 50,
      top: 50,
    },
  }

  const ctrW = dimensions.width - dimensions.margins.left - dimensions.margins.right
  const ctrH = dimensions.height - dimensions.margins.top - dimensions.margins.bottom

  // Accessors
  const xAccessor = (d) => d.currently.humidity
  const yAccessor = (d) => d.currently.apparentTemperature

  // Scales
  const xScale = d3.scaleLinear().domain(d3.extent(dataset, xAccessor)).rangeRound([0, ctrW])
  const yScale = d3.scaleLinear().domain(d3.extent(dataset, yAccessor)).rangeRound([ctrH, 0]).nice()

  // Axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d) => d * 100 + '%')
  const yAxis = d3.axisLeft(yScale)
  //   console.log(`xscale: ${xScale(15)}`)
  //   console.log(`yscale: ${yScale(10)}`)

  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('height', dimensions.height)
    .attr('width', dimensions.width)
    .style('background-color', '#e0e0e0')

  // container with svg
  const ctr = svg.append('g').attr('transform', `translate(${dimensions.margins.left}, ${dimensions.margins.top})`)

  // create circles for scatter
  ctr
    .selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('r', 5)
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .style('fill', 'red')
    .attr('data-temp', yAccessor)

  // x-axis group
  const xAxisGroup = ctr.append('g').call(xAxis).style('transform', `translateY(${ctrH}px)`).classed('axis', true)
  xAxisGroup
    .append('text')
    .attr('x', ctrW / 2)
    .attr('y', dimensions.margins.bottom - 10)
    .text('Humidity')
    .style('fill', 'blueviolet')

  // y-axis group
  const yAxisGroup = ctr.append('g').call(yAxis).style('transform', `translateX(${0}px)`).classed('axis', true)
  yAxisGroup
    .append('text')
    .attr('x', -ctrH / 2)
    .attr('y', -dimensions.margins.left + 25)
    .html('Temperature &deg; F')
    .style('fill', 'blueviolet')
    .style('transform', 'rotate(270deg)')
    .style('text-anchor', 'middle')
}

draw()
