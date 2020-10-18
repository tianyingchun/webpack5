import './index.less';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { useStore } from './use';
function Test() {
  const [, update] = useState({});
  const ref = useStore();
  const ref1 = useStore();
  console.log(ref.current);
  console.log(ref1.current);
  return (
    <div>
      <button
        onClick={() => {
          ref.current = 2;
          update({});
        }}
      >
        UseRef Testing
      </button>
    </div>
  );
}
render(<Test />, document.getElementById('app'));
