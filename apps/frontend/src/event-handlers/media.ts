import type { ClientRegisterEventHandlerFn } from '.'

import { useMessageStore } from '../store/useMessage'

export function registerMediaEventHandlers(
  registerEventHandler: ClientRegisterEventHandlerFn,
) {
  registerEventHandler('media:data', ({ message, media }) => {
    useMessageStore().pushMessages([message])
  })
}
