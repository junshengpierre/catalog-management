import { Form, InputGroup, Alert } from 'react-bootstrap'
import { forwardRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ProductStatus } from '../types'
import { formatStoragePrice } from '../utils'
import { ImagePreview } from '.'

const schema = Yup.object({
  title: Yup.string().min(3).max(100).required().label('Title').trim(),
  description: Yup.string()
    .min(3)
    .max(500)
    .required()
    .label('Description')
    .trim(),
  file: Yup.mixed().nullable().label('File'),
  quantity: Yup.number()
    .integer()
    .min(0)
    .round('round')
    .label('Quantity')
    .required(),
  price: Yup.number()
    .min(0)
    .label('Price')
    .required()
    .transform((value) => {
      return formatStoragePrice(value)
    }),
})

export const ProductForm = forwardRef(
  (
    {
      onSubmit,
      isError,
      formValues,
    }: { onSubmit: (any) => void; isError: boolean; formValues?: any },
    ref: any
  ) => {
    const initialValues = {
      title: '',
      description: '',
      file: null,
      quantity: undefined,
      status: ProductStatus.Public,
      price: undefined,
    }
    return (
      <Formik
        innerRef={ref}
        validationSchema={schema}
        onSubmit={(values) => {
          const castValues = schema.cast(values)
          onSubmit(castValues)
        }}
        initialValues={formValues || initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <>
            {isError && (
              <Alert variant="danger">Oops! Something went wrong.</Alert>
            )}

            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="controlTitleInput">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={Boolean(touched.title && errors.title)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="controlDescriptionTextarea">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={Boolean(touched.description && errors.description)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.File
                  name="file"
                  label="Image file"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0])
                  }}
                  isInvalid={!!errors.file}
                  feedback={errors.file}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <ImagePreview file={values.file} />

              <Form.Group controlId="controlQuantityInput">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  isValid={touched.quantity && !errors.quantity}
                  isInvalid={Boolean(touched.quantity && errors.quantity)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="controlPriceInput">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    id="controlPriceInput"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                    isInvalid={Boolean(touched.price && errors.price)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  isValid={touched.status && !errors.status}
                  isInvalid={Boolean(touched.status && errors.status)}
                >
                  {Object.values(ProductStatus).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </>
        )}
      </Formik>
    )
  }
)
