import React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/upload-file";

import { motion } from "framer-motion";
import { useAddTributeMutation } from "@/hooks/useTributes";

export const TributeForm: React.FC = () => {
  const tributeMutation = useAddTributeMutation();
  const [imageUploadKey, setImageUploadKey] = React.useState(0);

  const form = useForm({
    defaultValues: {
      author: "",
      message: "",
      imageFile: null as File | null,
    },
    onSubmit: async ({ value, formApi }) => {
      tributeMutation.mutate(
        {
          author: value.author,
          message: value.message,
          imageFile: value.imageFile ?? undefined,
        },
        {
          onSuccess: () => {
            formApi.reset();
            formApi.setFieldValue("imageFile", null);
            setImageUploadKey((k) => k + 1);
          },
        }
      );
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 overflow-auto pb-42"
    >
      <h2 className="text-2xl font-serif font-medium mb-6">
        Comparte un Recuerdo
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6 pb-36"
      >
        <form.Field
          name="author"
          validators={{
            onChange: ({ value }) =>
              !value ? "Por favor ingresa tu nombre" : undefined,
          }}
        >
          {(field) => (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="author-input"
              >
                Tu Nombre
              </label>
              <Input
                id="author-input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingresa tu nombre"
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) =>
              !value ? "Por favor ingresa un mensaje" : undefined,
          }}
        >
          {(field) => (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message-input"
              >
                Tu Mensaje
              </label>
              <Textarea
                id="message-input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Comparte tu recuerdo o mensaje..."
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="imageFile">
          {(field) => (
            <ImageUpload
              key={imageUploadKey}
              label="Agregar una Foto (Opcional)"
              onImageSelected={(file) => field.handleChange(file)}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit]) => (
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={!canSubmit}>
                Compartir Tributo
              </Button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </motion.div>
  );
};
