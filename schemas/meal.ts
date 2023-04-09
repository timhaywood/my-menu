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
      description: "Name of the dish, e.g. 'Butter chicken' (sentence case)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "string",
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
      of: [
        defineArrayMember({
          type: "string",
          name: "carb",
          options: {
            list: ["rice", "pasta", "bread", "potato", "pastry", "noodles"],
          },
        }),
      ],
    }),
    defineField({
      title: "Protein",
      name: "protein",
      type: "array",
      description: "List of the possible protein options",
      of: [
        defineArrayMember({
          type: "string",
          name: "protein",
          options: {
            list: ["chicken", "beef", "pork", "lamb", "fish", "egg"],
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
    defineField({
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: ["main", "side", "entree"],
      },
    }),
    defineField({
      title: "Related recipes",
      name: "relatedRecipes",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "meal" }],
        }),
      ],
    }),
  ],
});

export type Meal = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "meal";
  _updatedAt: string;
  carb: ("rice" | "pasta" | "bread" | "potato" | "pastry" | "noodles")[];
  description: string;
  difficulty: "easy" | "medium" | "hard";
  name: string;
  protein: ("chicken" | "beef" | "pork" | "lamb" | "fish" | "egg")[];
  type: "main" | "side" | "entree";
};
