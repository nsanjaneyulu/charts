import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, arc as d3Arc, line as d3Line, scaleLinear, easeElastic, curveLinear } from 'd3';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-individual-post-chart',
  standalone: true,
  imports: [CardModule],
  templateUrl: './individual-post-chart.component.html',
  styleUrl: './individual-post-chart.component.scss'
})
export class IndividualPostChartComponent implements OnInit, OnDestroy {
  private gaugemap: { [key: string]: any } = {};
  private svg: any;
  private pointer: any;

  constructor() { }

  ngOnInit() {
    this.draw();
  }

  ngOnDestroy() {
    if (this.svg) {
      this.svg.remove();
    }
  }

  private draw() {
    const self = this;

    const gauge = (container: string, configuration: any) => {
      const defaultConfig = {
        size: 300,
        clipWidth: 300,
        clipHeight: 300,
        ringInset: 30,
        ringWidth: 30,
        pointerWidth: 12,
        pointerTailLength: 3,
        pointerHeadLengthPercent: 0.2,
        minValue: 0,
        maxValue: 100,
        minAngle: -90,
        maxAngle: 90,
        transitionMs: 250,
        arcColors: ["#FF4500", "#FFA500", "#32CD32"],
        separatorWidth: 2, // Width of the separator in degrees
      };

      const config = { ...defaultConfig, ...configuration };
      const range = config.maxAngle - config.minAngle;
      const r = config.size / 2;
      const pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

      const scale = scaleLinear().range([0, 1]).domain([config.minValue, config.maxValue]);

      const deg2rad = (deg: number) => (deg * Math.PI) / 180;

    

        const arcGenerator = d3Arc()
        .innerRadius(r - config.ringWidth - config.ringInset)
        .outerRadius(r - config.ringInset)
        .startAngle((d: any, i: number) => {
          const angleOffset = 2 * Math.PI / 360; // 2px gap converted to radians
          return deg2rad(config.minAngle + i * (d * range)) + angleOffset; // Add offset only at the start of each segment
        })
        .endAngle((d: any, i: number) => {
          const angleOffset = 1 * Math.PI / 360; // 2px gap converted to radians
          return deg2rad(config.minAngle + (i + 1) * (d * range)) - angleOffset; // Add offset only at the end of each segment
        });


      const centerTranslation = () => `translate(${r},${r})`;
      const render = (newValue: number) => {
        this.svg = select(container)
          .append('svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);
        const centerTx = centerTranslation();
        // Draw arcs with gaps
        const arcs = this.svg.append('g').attr('class', 'arc').attr('transform', centerTx);

        // Draw arcs with a gap between each segment
        arcs.selectAll('path')
          .data([1 / 3, 1 / 3, 1 / 3]) // Adjust this array if you have a different distribution
          .enter()
          .append('path')
          .attr('fill', (d: number, i: number) => config.arcColors[i])
          .attr('d', arcGenerator);

        const scoreText = this.svg.append('text')
          .attr('class', 'score-text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em') // Center the text vertically
          .attr('x', r) // Position at center horizontally
          .attr('y', r - 50) // Adjust `y` to position between arc and needle
          .attr('font-size', '24px') // Set desired font size
          .attr('font-weight', 'bold') // Make the text bold
          .attr('fill', '#333') // Set color as needed
          .text(configuration.maxValue / 2); // Initial score display

        // Store the text element in the gauge map for updating
        self.gaugemap['scoreText'] = scoreText;

        // Define pointer
        const pointerLineData: Array<[number, number]> = [
          [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0]
        ];

        const pointerLine = d3Line()
          .curve(curveLinear)
          .x((d: [number, number]) => d[0]) // Explicitly type `d`
          .y((d: [number, number]) => d[1]); // Explicitly type `d`
        // Draw pointer
        const pg = this.svg.append('g').attr('class', 'pointer').attr('transform', centerTx);



        pg.append('line')
          .attr('x1', -132)
          .attr('x2', 132)
          .attr('y1', config.pointerTailLength + 2)
          .attr('y2', config.pointerTailLength + 2)
          .attr('stroke', '#DADADA')
          .attr('stroke-width', 5);

        pg.append('circle')
          .attr('cx', 0)
          .attr('cy', config.pointerTailLength)
          .attr('r', 25)
          .attr('fill', "white")
          .attr('stroke', '#DADADA')
          .attr('stroke-width', 3);

        pg.append('circle')
          .attr('cx', 0)
          .attr('cy', config.pointerTailLength)
          .attr('r', 16)
          .attr('fill', '#000000');

        pg.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 5)
          .attr('fill', "#FFA500")
          .attr('stroke', '#FFA500')
          .attr('stroke-width', 3);

        this.pointer = pg.append('path')
          .datum(pointerLineData)
          .attr('d', pointerLine)
          .attr('fill', '#FFA500')
          .attr('transform', `rotate(${config.minAngle})`);

        update(newValue || 0);
      };

      const update = (newValue: number, newConfiguration?: any) => {
        if (newConfiguration !== undefined) {
          Object.assign(config, newConfiguration);
        }
        const ratio = scale(newValue);
        const newAngle = config.minAngle + ratio * range;

        this.pointer.transition()
          .duration(config.transitionMs)
          .ease(easeElastic)
          .attr('transform', `rotate(${newAngle})`);

        // Update score text
        this.gaugemap['scoreText'].text(Math.round(newValue)); // Round the score if necessary
      };


      render(configuration.maxValue / 2);

      self.gaugemap['render'] = render;
      self.gaugemap['update'] = update;

      return self.gaugemap;
    };

    const powerGauge = gauge('#power-gauge-individual', {
      size: 300,
      clipWidth: 300,
      clipHeight: 300,
      ringWidth: 30,
      maxValue: 100,
      transitionMs: 2000
    });

    powerGauge['update'](45);
  }
}
