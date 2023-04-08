import { defineType, defineField, defineArrayMember } from "sanity";

export const meal = defineType({
  title: "Meal",
  name: "meal",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      description: "Name of the dish, e.g. 'Butter Chicken'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Photo",
      name: "photo",
      type: "image",
      description: "A photo of the dish",
    }),
    defineField({
      title: "Carbohydrate",
      name: "carb",
      type: "array",
      description: "List of the possible carbohydrate options",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          type: "string",
          name: "carb",
          options: {
            list: ["rice", "pasta", "bread", "potato", "pastry"],
          },
        }),
      ],
    }),
    defineField({
      title: "Protein",
      name: "protein",
      type: "array",
      description: "List of the possible protein options",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          type: "string",
          name: "carb",
          options: {
            list: ["chicken", "beef", "pork", "lamb", "fish"],
          },
        }),
      ],
    }),
    defineField({
      title: "Difficulty",
      name: "difficulty",
      type: "string",
      description: "Easy = 0-20m, Med = 20-40m, Hard = <40m",
      validation: (Rule) => Rule.required(),
      options: {
        list: ["easy", "medium", "hard"],
      },
    }),
  ],
});
