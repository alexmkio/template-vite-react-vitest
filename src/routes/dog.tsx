import { useLoaderData, LoaderFunction } from "react-router-dom";
import { data } from "../assets/dataset";
import { DogTyping } from "../types";

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

export const loader = (async (args) => {
  let dog = data.find((e) => e.id === Number(args.params.dogId));
  return dog as DogTyping;
}) satisfies LoaderFunction;

function Dog() {
  const dog = useLoaderData() as LoaderData<typeof loader>;

  return (
    <>
      <h1>ID: {dog.id}</h1>
      <p>Breed: {dog.breed}</p>
    </>
  );
}

export default Dog;
