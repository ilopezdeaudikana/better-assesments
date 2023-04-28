import { Fragment } from 'react'
export const GroupButton = (props: {
  by: string
  group: string
  change: Function
}) => {
  return (
    <Fragment>
      <div>
        <input
          type='radio'
          name='option'
          id={props.by}
          className='peer hidden'
          onChange={(e) => props.change(e)}
          value={props.by}
          checked={props.group === props.by}
        />
        <label
          htmlFor={props.by}
          className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
        >
          By {props.by}
        </label>
      </div>
    </Fragment>
  )
}
