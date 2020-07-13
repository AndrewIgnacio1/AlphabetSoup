import React from 'react';

const ResultOutput = (props) => (
  <div>
    {
      props.outputs.map(out => (
        <p key={out.word}>
          {out.word} {out.start} {out.end}
        </p>
      ))
    }
  </div>
);

export default ResultOutput;