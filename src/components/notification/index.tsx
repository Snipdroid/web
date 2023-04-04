import './notification.less'

import { Component, createSignal } from 'solid-js'
import { render } from 'solid-js/web'

interface NotificationData {
  content: string
}

const notification = (content: string) => {
  const notificationItem = () => NotificationItem({ content })
  const notification = document.getElementById('notification')

  if (notification) {
    render(notificationItem, notification)

    setTimeout(() => {
      notification.removeChild(notification.firstChild as Node)
    }, 3000)
  }
}

const Notification: Component = () => {
  return (
    <>
      <div id="notification" />
    </>
  )
}

const NotificationItem: Component<NotificationData> = (props) => {
  const [out, setOut] = createSignal(false)

  setTimeout(() => {
    setOut(true)
  }, 2500)

  return (
    <>
      <div class="notification-item" classList={{ out: out() }}>
        <span class="i-material-symbols-notifications-outline" />
        <span>{props.content}</span>
      </div>
    </>
  )
}

export { Notification, notification }
