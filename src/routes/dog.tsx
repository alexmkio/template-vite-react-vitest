import { useLoaderData } from "react-router-dom";
import { data } from "../assets/dataset";
import { ParamsTyping, DogTyping } from "../types";

export async function loader({ params }: ParamsTyping) {
  let dog = data.find((e) => e.id === Number(params.dogId));
  return dog;
}

function Dog() {
  const dog = useLoaderData() as DogTyping;

  return (
    <>
      <h1>ID: {dog.id}</h1>
      <p>Breed: {dog.breed}</p>
    </>
  );
}

export default Dog;
