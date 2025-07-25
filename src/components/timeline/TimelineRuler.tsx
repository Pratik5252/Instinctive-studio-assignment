

export default function TimeRuler() {
  const hourWidth = 72; 
  const totalHours = 24;
  const totalWidth = hourWidth * totalHours;
  const height = 28;

  const majorTickHeight = 12;
  const minorTickHeight = 6;
  const tickInterval = 5;
  const ticksPerHour = 60 / tickInterval;

  const ticks = [];

  for (let hour = 0; hour < totalHours; hour++) {
    const hourX = hour * hourWidth;

    
    ticks.push(
      <line
        key={`hour-${hour}`}
        x1={hourX}
        y1={height}
        x2={hourX}
        y2={height - majorTickHeight}
        stroke="#ccc"
        strokeWidth={1}
      />,
      <text
        key={`label-${hour}`}
        x={hourX}
        y={height - majorTickHeight - 4}
        textAnchor="left"
        fontSize="8"
        fill="#ccc"
        fontFamily="monospace"
        className="font-mono font-semibold"
      >
        {hour.toString().padStart(2, "0")}:00
      </text>
    );

   
    for (let i = 1; i < ticksPerHour; i++) {
      const x = hourX + (i * hourWidth) / ticksPerHour;
      ticks.push(
        <line
          key={`minor-${hour}-${i}`}
          x1={x}
          y1={height}
          x2={x}
          y2={height - minorTickHeight}
          stroke="#888"
          strokeWidth={1}
        />
      );
    }
  }

  return (
    <svg width={totalWidth} height={height}>
      <rect width={totalWidth} height={height} fill="#131313" style={{paddingTop: "14px", paddingBottom: "14px"}}/>
      {ticks}
    </svg>
  );
}
