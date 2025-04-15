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
