"use client";
import { Meal } from "@/schemas/meal";
import { useState } from "react";

const proteinTypes = {
  chicken: false,
  beef: false,
  pork: false,
  lamb: false,
  fish: false,
  egg: false,
};
const carbTypes = {
  rice: false,
  pasta: false,
  bread: false,
  potato: false,
  pastry: false,
  noodles: false,
};

export function MenuList({ data }: { data: Meal[] }) {
  const [proteinFilters, setProteinFilters] = useState(proteinTypes);
  const [carbFilters, setCarbFilters] = useState(carbTypes);

  const noProteinsSelected = Object.values(proteinFilters).every(
    (v) => v === false
  );
  const noCarbsSelected = Object.values(carbFilters).every((v) => v === false);

  const toggleProteinFilter = (protein: keyof typeof proteinTypes) =>
    setProteinFilters((filters) => {
      return {
        ...filters,
        [protein]: !filters[protein],
      };
    });

  const toggleCarbFilter = (carb: keyof typeof carbTypes) =>
    setCarbFilters((filters) => {
      return {
        ...filters,
        [carb]: !filters[carb],
      };
    });

  return (
    <div>
      <div className="flex flex-col gap-3 pb-6">
        <div className="whitespace-nowrap overflow-auto">
          {(Object.keys(proteinTypes) as (keyof typeof proteinTypes)[]).map(
            (protein) => (
              <button
                key={protein}
                className={`border border-solid border-white p-2 mr-2 ${
                  proteinFilters[protein] ? "bg-white text-black" : ""
                }`}
                onClick={() => {
                  toggleProteinFilter(protein);
                }}
              >
                {protein}
              </button>
            )
          )}
        </div>
        <div className="whitespace-nowrap overflow-auto">
          {(Object.keys(carbTypes) as (keyof typeof carbTypes)[]).map(
            (carb) => (
              <button
                onClick={() => {
                  toggleCarbFilter(carb);
                }}
                key={carb}
                className={`border border-solid border-white p-2 mr-2 ${
                  carbFilters[carb] ? "bg-white text-black" : ""
                }`}
              >
                {carb}
              </button>
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {data
          .filter((meal) => {
            let showCarb = noCarbsSelected;
            if (meal.carb?.length && !showCarb) {
              for (const carbType of meal.carb) {
                if (carbFilters[carbType]) {
                  showCarb = true;
                  break;
                }
              }
            }

            let showProtein = noProteinsSelected;
            if (meal.protein?.length && !showProtein) {
              for (const proteinType of meal.protein) {
                if (proteinFilters[proteinType]) {
                  showProtein = true;
                  break;
                }
              }
            }

            return showProtein && showCarb;
          })
          .map((meal) => (
            <div
              className="p-6 border border-solid border-white flex flex-col gap-3"
              key={meal._id}
            >
              <h2 className="text-xl font-semibold">{meal.name}</h2>
              <p>{meal.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
