import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'wrap',
  },
});

const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);

const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class Graph extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Paper>
        <Chart
          data={data.results}
        >
          <ArgumentAxis />
          <ValueAxis
            max={2400}
            rotationAngle={45}
            overlappingBehavior="rotate"
          />
          {data.media.map((medium, i) => {
            return (
              <BarSeries
                name={medium.name}
                valueField={medium.id}
                argumentField="timestamp"
                key={i}
              />
            )
          })}
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Results" />
          <Stack
            stacks={[
              { series: data.media.map(a => a.name) },
            ]}
          />
        </Chart>
      </Paper>
    );
  }
}
