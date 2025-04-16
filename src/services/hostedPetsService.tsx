import caotrolinApi from "@/services/caotrolinnApi";

export interface Pet {
  _id: string;
  petName: string;
  petOwner: string;
  contact: string;
  species: string;
  breed: string;
  inputDate: Date;
  estimatedDeparture: Date;
  dailyRate: number;
  totalExpectedDaily: number;
}

export async function getAllPets(): Promise<Pet[]> {
  const response = await caotrolinApi.get("/hostedPets");
  return response.data;
}

export async function getPetById(id: string): Promise<Pet> {
  const response = await caotrolinApi.get(`/hostedPet/${id}`);
  return response.data;
}

export async function editPet(id: string, pet: Pet): Promise<Pet> {
  const response = await caotrolinApi.put(`/hostedPet/${id}`, pet);
  return response.data;
}

export async function createPet(pet: Pet): Promise<Pet> {
  const response = await caotrolinApi.post("/hostedPet", pet);
  return response.data;
}

export async function deletePet(id: string): Promise<void> {
  await caotrolinApi.delete(`/hostedPet/${id}`);
}