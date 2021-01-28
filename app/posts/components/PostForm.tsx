import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextAreaField from 'app/core/components/TextAreaField'
import { useMutation } from 'blitz'
import React from 'react'
import createPost from '../mutations/createPost'
import { CreatePostInput } from '../validations'

type PostFormProps = {
  onSuccess?: () => void
}

const PostForm = (props: PostFormProps) => {
  const [createPostMutation] = useMutation(createPost)

  return (
    <Form
      className="max-w-2xl mt-4"
      submitText="Post"
      schema={CreatePostInput}
      initialValues={{ body: '' }}
      onSubmit={async (values) => {
        try {
          await createPostMutation(values)
          props.onSuccess?.()
        } catch (error) {
          return {
            [FORM_ERROR]:
              'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
          }
        }
      }}
    >
      <LabeledTextAreaField
        name="body"
        label="Write a post"
        placeholder="What is on your mind?"
        rows={3}
      />
    </Form>
  )
}

export default PostForm
