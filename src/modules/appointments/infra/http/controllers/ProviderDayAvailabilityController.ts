import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listProviderDayAvailatility = container.resolve(
      ListProviderDayAvailability,
    );

    const availability = await listProviderDayAvailatility.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}
