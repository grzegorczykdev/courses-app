import * as React from 'react'
const Placeholder = (props) => (
  <svg
    xmlns={'http://www.w3.org/2000/svg'}
    width={40}
    height={40}
    fill={'none'}
    {...props}
  >
    <rect
      width={40}
      height={40}
      fill={'#BDBDBD'}
      rx={20}
    />
    <path
      fill={'#fff'}
      d={'M20 20c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z'}
    />
  </svg>
)
export default Placeholder
