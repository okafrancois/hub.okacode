'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'

type TagsInputProps = {
  onTagAdded?: (tag: string) => void
  onTagDeleted?: (tag: string) => void
}
export default function TagsInput({
  onTagAdded,
  onTagDeleted,
}: Readonly<TagsInputProps>) {
  const [tags, setTags] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  })

  function addTag() {
    const value = inputRef.current?.value

    if (!value) {
      inputRef.current?.focus()
      return
    }
    if (tags.includes(value)) {
      inputRef.current.value = ''
      inputRef.current?.focus()
      return
    }

    setTags([...tags, value])

    inputRef.current.value = ''
    inputRef.current?.focus()
    onTagAdded?.(value)
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag()
    }
  }

  function deleteTag(tag: string) {
    setTags(tags.filter((t) => t !== tag))
    onTagDeleted?.(tag)
  }

  return (
    <div className={'space-y-2 flex flex-col'}>
      <Label className={'flex gap-x-2'}>
        <Input
          name={'tags'}
          onKeyDown={onInputKeyDown}
          ref={inputRef}
          type={'text'}
        />
        <Button
          onClick={() => {
            addTag()
          }}
          type={'button'}
        >
          Add
        </Button>
      </Label>
      <div className="tags flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag.toLowerCase()}
            className="tag flex gap-x-2 items-center px-2 bg-primary text-primary-foreground rounded-md"
          >
            <span>{tag}</span>
            <Button
              onClick={() => {
                deleteTag(tag)
              }}
              type={'button'}
              variant={'ghost'}
              className={'px-2 py-2 h-8'}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}