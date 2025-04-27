export class CreateCarDto {
  registrationNumber: string;
  brandId: number;
  modelId: number;
  year: number;
  color: string;
  notes?: string;
  price: number;
}
