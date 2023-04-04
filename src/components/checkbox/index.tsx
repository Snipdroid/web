import './checkbox.less'

import { Component, createSignal } from 'solid-js'

interface CheckBoxProps {
  id: string
  onCheck?: (checked: boolean) => void
}

const CheckBox: Component<CheckBoxProps> = (props) => {
  const [check, setCheck] = createSignal(false)

  return (
    <>
      <input
        onClick={(e) => e.stopPropagation()}
        class="check-box"
        ref={(checkbox) => {
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              props.onCheck?.(true)
            } else {
              props.onCheck?.(false)
            }
            setCheck(checkbox.checked)
          })
        }}
        type="checkbox"
        id={`check-${props.id}`}
      />
      <label
        onClick={(e) => e.stopPropagation()}
        for={`check-${props.id}`}
        classList={{
          'i-material-symbols-check-box-outline-blank': !check(),
          'i-material-symbols-check-box-outline': check(),
        }}
      />
    </>
  )
}

export { CheckBox }
