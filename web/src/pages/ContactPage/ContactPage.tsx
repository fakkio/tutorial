import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from "@redwoodjs/forms";
import {MetaTags, useMutation} from "@redwoodjs/web";
import {toast, Toaster} from "@redwoodjs/web/toast";
import {CreateContactInput} from "types/graphql";

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`;

const ContactPage = () => {
  const [create, {loading, error}] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success("Thank you for your message!");
      formMethods.reset();
    },
  });

  const formMethods = useForm();

  const onSubmit = (data: CreateContactInput) => {
    console.log(data);
    create({variables: {input: data}});
  };

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <FormError error={error} wrapperClassName="form-error" />
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{required: true}}
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: {value: /^[^@]+@[^.]+\..+$/, message: "Invalid format"},
          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{required: true}}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Send message</Submit>
      </Form>
    </>
  );
};

export default ContactPage;
