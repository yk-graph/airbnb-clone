/*
  [Tips] モーダルの実装
  - モーダルの表示・非表示を管理するstateはこのコンポーネントで管理する
  - 表示する内容はpropsで受け取る
*/

'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '@/components/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement // [Tips] JSX,TSXのコンポーネントを受け取る時の指定方法
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)

    return () => {}
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return

    setShowModal(false)
    setTimeout(() => onClose(), 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return

    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return

    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* [Tips] モーダルのバックグラウンド背景とコンテンツのtailwindでのスタイル方法 */}
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*content*/}
          <div
            // [Tips] 動的なtailwindのスタイルの適用方法（ふわっとモーダルの表示・非表示をするアニメーション）
            className={`translate duration-300 h-full ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            } ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
