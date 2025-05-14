import Joi from "joi";

//Logga in validering
  const signInSchema = Joi.object({
  username: Joi.string()
  .min(5)
  .required()
  .pattern(/^[a-zA-ZåäöÅÄÖ\s,.-]*$/)
  .messages({
    "string.empty": "Användarnamn krävs",
    "string.min": "Användarnamn ej korrekt",
  }),
  password: Joi.string()
  .min(8)
  .required()
  .pattern(/^[a-zA-ZåäöÅÄÖ\s,.-]*$/)
  .messages({
    "string.empty": "Lösenord krävs",
    "string.min": "Lösenordet måste bestå av minst 8 tecken",
  }),
});


//Används för redigering & tillägg av produkter
  const productSchema = Joi.object({
  img: Joi.string()
    .uri({ scheme: ["https"] })
    .required()
    .messages({
      "string.empty": "Bildlänk krävs",
      "string.uri": "Bildlänken måste börja med https://",
    }),

  namn: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Namn krävs",
      "string.min": "Namn måste ha minst 3 bokstäver",
    }),

  info: Joi.string()
    .min(15)
    .required()
    .messages({
      "string.empty": "Beskrivning krävs",
      "string.min": "Beskrivningen måste vara minst 15 tecken",
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Pris måste vara ett nummer",
      "number.positive": "Pris måste vara ett positivt tal",
    }),

  kategori: Joi.string()
    .valid("kubb", "racketspel", "bollspel", "övrigt")
    .required()
    .messages({
      "any.only": "Välj en giltig kategori",
      "string.empty": "Kategori krävs",
    }),
});

export { signInSchema, productSchema };